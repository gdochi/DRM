---
title: PokéMart 제작과 런타임
slug: cobblemon-pokemart
order: 540
description: 포켓몬 판매, 교환, 경매 역할과 통화·재고·GUI 연결 방법입니다.
product: drm-cobblemon-editor
category: PokéMart
section: pokemart
status: Draft
version: 0.1.0
audience: 포켓몬 상점 제작자와 서버 운영자
tags:
  - pokemart
  - trade
  - auction
---

## 에디터와 플레이어 화면

`PokéMart Editor`는 제작자가 상점 문서를 만드는 DRM 애드온 에디터입니다. 저장한 문서를 CustomNPCs NPC에 적용하면, 플레이어가 양손을 비우고 NPC를 우클릭할 때 `PokeMartRuntimeScreen`이 열립니다.

에디터의 목록과 입력 필드는 제작용이며 플레이어에게 그대로 노출되지 않습니다. 플레이어 화면 배치는 연결된 GUI JSON이 결정하고, 가격·재고·보유 포켓몬·경매 상태는 서버가 보낸 런타임 데이터로 표시됩니다.

## NPC 역할은 하나만 선택

한 PokéMart 문서는 다음 역할 중 정확히 하나를 가집니다.

| 역할 | 플레이어 동작 | 통화 사용 |
| --- | --- | --- |
| `Sales` | 정해진 포켓몬 상품을 가격과 재고에 따라 구매 | 사용 |
| `Trade` | 플레이어가 조건에 맞는 포켓몬을 내고 제시된 포켓몬과 교환 | 직접 통화는 사용하지 않음 |
| `Auction` | 포켓몬 등록, 입찰, 즉시 구매, 정산·클레임 | 사용 |

역할을 바꾸면 기본 Runtime GUI도 `pokemart_sales_gui.json`, `pokemart_trade_gui.json`, `pokemart_auction_gui.json` 중 맞는 파일로 전환됩니다. 사용자 GUI를 이미 연결했다면 역할과 화면 구성 요소가 맞는지 직접 확인하세요.

## 첫 Sales 상점 만들기

1. `PokéMart Editor`에서 `Use Default`를 선택합니다.
2. General에서 ID와 Display Name을 정하고 Role을 `Sales`로 둡니다.
3. Currency Provider와 Currency ID를 선택합니다.
4. Products에서 포켓몬, 설명, 가격, 재고를 설정합니다.
5. `Save As`로 `custom/first_sales.json`을 저장합니다.
6. 대상 CustomNPCs NPC의 DRM 적용 흐름에서 `Cobblemon PokéMart`로 적용합니다.
7. 양손을 비우고 NPC를 우클릭해 구매 화면을 테스트합니다.

## 통화 공급자

| Provider | ID 예시 | 설명 |
| --- | --- | --- |
| `cobbledollars` | `balance` | CobbleDollars 잔액을 사용합니다. 해당 모드가 설치되어야 합니다. |
| `drm` | DRM 통화 ID | DRM Currency Editor에서 만든 서버 통화를 사용합니다. |
| `item` | `minecraft:emerald` | 지정 아이템과 선택형 NBT를 통화로 사용합니다. |

기본 PokéMart는 `cobbledollars:balance`를 사용합니다. CobbleDollars 없이 기본값을 그대로 두면 서버가 통화 공급자를 사용할 수 없다고 판단합니다. 배포 모드 구성에 맞는 공급자를 명시적으로 선택하세요.

## Sales 상품과 재고

Sales 문서는 최대 256개 상품을 가집니다. 상품에는 Product ID, 포켓몬 전체 스펙, 설명, 가격, 초기 재고, 최대 재고, 재입고 수량과 간격이 들어갑니다.

| 재고 값 | 의미 |
| --- | --- |
| Initial Stock `-1` | 무제한 재고 |
| Initial Stock `0` 이상 | 서버가 추적하는 유한 재고 |
| Restock Amount `0` | 자동 재입고 없음 |
| Restock Interval | 재입고 간격. 20틱은 약 1초 |

재고와 구매 처리는 서버 권한입니다. 구매 중 전달에 실패하면 결제 복구 경로가 동작하지만, 정식 서버에서는 통화 공급자와 포켓몬 전달을 함께 테스트해야 합니다.

## Trade 제안

Trade 문서는 최대 128개 교환 제안을 가집니다. 각 제안은 플레이어에게 줄 포켓몬과 플레이어에게 요구할 포켓몬 조건을 따로 가집니다.

요구 조건은 다음 값을 검사할 수 있습니다.

- Species와 선택형 Form
- 필요한 Aspects
- Shiny `Any / Required / Forbidden`
- 최소·최대 Level

플레이어는 자신의 보유 포켓몬 중 조건을 만족하는 대상을 명시적으로 선택해야 합니다. 교환 제안에도 무제한 또는 유한 재고와 재입고를 설정할 수 있습니다.

## Auction 정책

Auction 역할은 서버에 경매 상태를 저장합니다.

| 정책 | 의미 |
| --- | --- |
| House ID | 같은 경매장을 공유하는 문서의 그룹 ID |
| Max Listings | 플레이어별 최대 등록 수 |
| Duration | 등록 유지 시간 |
| Listing Fee | 등록할 때 먼저 내는 금액 |
| Sale Tax | 판매 성사 금액에서 차감할 비율 |
| Minimum Bid Increment | 다음 입찰의 최소 증가액 |
| Allow Buyout | 즉시 구매 허용 여부 |
| Allow Shiny / Legendary | 등록 가능한 포켓몬 정책 |

서버는 판매 포켓몬을 에스크로로 관리하고, 입찰·구매·취소·정산 결과를 상태에 반영합니다. 지급받지 못한 금액이나 포켓몬이 있으면 런타임의 Claim 흐름으로 회수합니다. 운영 서버를 열기 전에 재접속, 서버 재시작, 만료, 자기 입찰 차단, 즉시 구매를 테스트하세요.

## 이용 조건

Interaction Conditions를 켜면 플레이어가 상점 화면을 열기 전에 조건 그룹을 검사합니다. DRM 대화 조건과 같은 그룹 구조를 사용하므로 태그, 아이템, 발전 과제 등 서버에서 지원하는 조건을 조합할 수 있습니다.

조건을 통과하지 못한 플레이어에게는 상점 화면을 열지 않습니다. 상품별·제안별 조건이 필요한 샘플은 설치된 `samples/` 문서를 참고하되, 기본 샘플을 직접 덮어쓰지 말고 `Save As`로 복사하세요.

## Runtime GUI 연결

PokéMart 문서의 Runtime GUI는 DRM 공용 폴더의 GUI JSON을 참조합니다.

```text
config/dochi_rpg_maker/gui/
├─ pokemart_sales_gui.json
├─ pokemart_trade_gui.json
└─ pokemart_auction_gui.json
```

GUI Maker에서 화면 배치를 바꿀 때는 원본 기본 GUI를 `Save As`로 복제하고 새 경로를 PokéMart 문서에 연결하세요. Sales, Trade, Auction은 필요한 목록과 액션이 다르므로 다른 역할의 기본 GUI를 그대로 연결하지 않는 것이 안전합니다.

## 운영 점검표

- 상점 문서 저장 후 대상 NPC에 `Apply`했는지 확인합니다.
- 서버와 클라이언트에 필요한 통화 모드가 모두 있는지 확인합니다.
- 유한 재고가 구매·교환 후 감소하고 설정 간격에 맞춰 복구되는지 확인합니다.
- 동일 상품을 빠르게 연속 클릭해도 중복 지급되지 않는지 확인합니다.
- Auction의 등록 수수료, 세금, 최소 입찰 증가, Buyout, Claim을 실제 잔액으로 검증합니다.
- DRM 대화 또는 NPC Shop과 같은 NPC에 연결했을 때 의도한 우클릭 역할인지 확인합니다.

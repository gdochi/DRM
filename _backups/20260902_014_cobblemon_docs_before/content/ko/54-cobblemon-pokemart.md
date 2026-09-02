---
title: 포켓마트
slug: cobblemon-pokemart
order: 540
description: PokéMart Editor의 역할, 통화, 조건과 GUI 설정입니다.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Draft
version: 0.1.3
audience: 포켓몬 상점 제작자와 서버 운영자
tags:
  - pokemart
  - editor
  - runtime
---

## 제작 에디터와 플레이어 화면

`PokéMart Editor`는 상점 문서를 만드는 제작자 화면입니다. `PokeMartRuntimeScreen`은 저장한 문서를 NPC에 적용한 뒤 플레이어가 보는 런타임 화면입니다. 에디터의 입력칸 위치는 플레이어 화면 배치와 관계없으며, 플레이어 배치는 `Runtime GUI`의 GUI JSON이 결정합니다.

PokéMart 문서는 현재 스키마 7입니다. 문서는 상품과 정책을 저장하고, 실제 재고·활성 경매·입찰금·수령 대기 데이터는 월드 PersistentState가 별도로 저장합니다. JSON 파일만 백업해서는 운영 중 경매 상태까지 복구되지 않습니다.

## 상단 작업

| 작업 | 기능 |
| --- | --- |
| `Editors` | DRM 에디터 선택 또는 NPC 적용 흐름으로 돌아가기 |
| `Create New` | 기본 역할과 빈 목록으로 새 문서 시작 |
| `Load` | `cobblemon/pokemarts/`에서 기존 문서 불러오기 |
| `Save` | 현재 경로에 저장 |
| `Save As` | 새 상대 경로로 저장 |
| `Reset` | 기본 PokéMart 값으로 되돌리기 |
| `Close` | 저장·적용 없이 화면 닫기 |

기본 문서와 샘플은 `Save As`로 `custom/` 아래에 복사해 사용하세요.

## NPC 역할과 활성 카테고리

한 문서는 정확히 하나의 역할만 가집니다. 역할을 선택하면 해당 역할의 편집 카테고리와 런타임 탭만 활성화됩니다.

| Role | 에디터 카테고리 | 플레이어 런타임 |
| --- | --- | --- |
| `Sales` | `General`, `포켓몬 상품` | 상품 목록, 상세, 잔액, 구매 |
| `Trade` | `General`, `포켓몬 교환` | 교환 제안, 보유 포켓몬 선택, 교환 확정 |
| `Auction` | `General`, `경매` | 경매 목록, 옥션 등록, 정산/수령함 |

역할을 바꿔도 다른 역할의 상품이나 교환 데이터가 문서에서 즉시 삭제되지는 않지만, 현재 역할의 런타임에서는 사용하지 않습니다. 한 NPC에서 판매와 교환을 동시에 제공하려면 역할별 NPC를 따로 배치하세요.

## General의 값이 실제로 쓰이는 곳

| 설정 | 기능적 결과 |
| --- | --- |
| Mart ID | 문서 내부 식별자입니다. 최대 64자 토큰으로 정규화됩니다. |
| Display Name | 런타임 헤더에 표시되는 상점 이름입니다. 최대 96자입니다. |
| Role | 활성 에디터 카테고리, 기본 GUI, 서버 허용 액션을 결정합니다. |
| Currency Provider / ID | Sales 구매, Auction 등록 수수료·입찰·정산에 사용합니다. Trade는 통화를 사용하지 않습니다. |
| GUI JSON Path | `config/dochi_rpg_maker/gui/` 기준의 런타임 화면 파일입니다. |
| Interaction Conditions | 플레이어가 화면을 열기 전에 서버가 검사하는 DRM 공용 조건 그룹입니다. |

문서 제한:

| 항목 | 제한 |
| --- | ---: |
| Mart ID / House ID | 최대 64자 토큰 |
| Display Name | 최대 96자 |
| GUI Path | 정규화된 상대 경로 |
| Sales Products | 최대 256개 |
| Trade Offers | 최대 128개 |
| Item Currency NBT | 최대 32,768자 |
| 금액 | 0 이상의 임의 정밀도 정수, 내부 안전 상한 적용 |

## 통화 공급자

| Provider | Currency ID | 서버 동작 |
| --- | --- | --- |
| `cobbledollars` | 기본 `balance` | CobbleDollars API의 플레이어 잔액을 읽고 설정합니다. 모드가 없으면 사용할 수 없습니다. |
| `drm` | DRM Currency ID | DRM Currency Editor로 만든 잔액을 차감·지급합니다. |
| `item` | 예: `minecraft:emerald` | 인벤토리 아이템을 결제 수단으로 사용하며 선택형 Item NBT를 함께 비교합니다. |

에디터의 결제 선택 창은 DRM 화폐와 현재 인벤토리 아이템을 검색할 수 있습니다. 아이템 통화의 NBT를 지정하면 같은 아이템 ID라도 NBT가 일치하지 않는 스택은 결제에 사용되지 않습니다.

`cobbledollars` 공급자를 선택했는데 CobbleDollars가 설치되지 않았거나 API를 사용할 수 없으면 서버는 구매·입찰을 진행하지 않습니다. 통화 공급자 변경은 기존 경매 매물에 이미 저장된 통화 정보까지 자동 변환하지 않으므로 운영 중인 House의 통화를 바꾸지 않는 편이 안전합니다.

## 역할 변경과 Runtime GUI 경로

기본 GUI를 사용 중일 때 Role을 변경하면 경로도 자동으로 다음 값으로 전환됩니다.

```text
Sales   → pokemart_sales_gui.json
Trade   → pokemart_trade_gui.json
Auction → pokemart_auction_gui.json
```

이미 사용자 GUI 경로를 연결했다면 Role을 바꿔도 그 경로를 유지합니다. 이때 GUI 구성 요소가 새 역할에 맞지 않으면 목록이나 액션 버튼이 보이지 않을 수 있으므로 직접 바꾸거나 새 역할 기본 GUI에서 다시 시작하세요.

`UI 적용`과 `UI 편집`은 현재 GUI 경로를 DRM GUI Maker로 엽니다. GUI Maker에서 저장한 뒤 PokéMart Editor로 돌아오며, PokéMart 문서의 경로가 맞는지 확인한 다음 문서도 저장해야 합니다.

## 상호작용 조건

`조건 편집`은 DRM 공용 조건 편집기를 엽니다. 조건을 켜면 플레이어가 NPC를 우클릭할 때 서버가 조건을 검사하며 실패하면 런타임 화면 자체를 열지 않습니다.

조건은 `AND` 또는 `OR`로 묶이며 태그, 아이템, 발전 과제 등 DRM이 등록한 공용 조건을 사용합니다. 상품별 조건이 아니라 PokéMart 문서 전체의 입장 조건입니다. VIP 상품만 잠그고 일반 상품은 공개하는 구조가 필요하면 역할별 NPC나 별도 상점 문서를 분리하세요.

상호작용 조건은 화면을 열 때만 검사하고 끝나지 않습니다. 플레이어가 화면을 열어 둔 뒤 구매·교환·등록·입찰·취소·수령 요청을 보낼 때마다 서버가 현재 NPC 문서와 조건을 다시 확인합니다. 화면을 연 뒤 태그나 아이템 조건을 잃으면 다음 행동이 거부될 수 있습니다.

## 런타임 세션과 서버 검증

플레이어가 PokéMart NPC를 빈손으로 우클릭하면 서버가 NPC와 플레이어를 연결한 임시 화면 세션을 만듭니다. 이후 클라이언트 버튼은 NPC 엔티티 ID, 고유 요청 ID와 행동 데이터를 서버에 보냅니다.

서버가 매 행동에서 확인하는 항목:

- 현재 플레이어에게 허가된 NPC 세션인지
- NPC가 아직 존재하고 같은 문서를 가지고 있는지
- Interaction Conditions를 여전히 만족하는지
- 문서 Role이 요청 행동과 맞는지
- 상품·교환·매물 ID가 현재 서버 상태에 존재하는지
- 같은 요청 ID가 중복 처리되지 않았는지

`Refresh`는 최신 목록과 재고를 다시 받아오고 `Close`는 서버의 화면 추적을 해제합니다. 네트워크 재전송이나 더블 클릭으로 같은 요청이 들어와도 최근 요청 ID를 기억해 중복 결제와 중복 지급을 막습니다.

## 저장과 NPC 적용

1. `Save As`에 `towns/pewter_sales.json` 같은 상대 경로를 입력합니다.
2. 파일은 `config/dochi_rpg_maker/cobblemon/pokemarts/` 아래에 저장됩니다.
3. 대상 NPC를 지정해 에디터를 열었으면 `NPC에 적용`을 누릅니다.
4. 양손을 비우고 NPC를 우클릭해 역할에 맞는 런타임 탭이 열리는지 확인합니다.
5. 같은 원본 경로에 문서를 저장하면 다음 상점 요청에서 최신 문서를 사용합니다. 외부에서 파일을 수정했다면 `/drm reload` 후 확인합니다.

Apply는 원본 JSON 경로와 안전한 대체 스냅샷을 함께 저장합니다. 다른 파일 경로·역할로 바꿀 때는 다시 Apply해야 하지만, 같은 파일의 상품·가격·조건·GUI 경로를 수정할 때는 보통 재적용이 필요하지 않습니다.

`해제`는 대상 NPC의 PokéMart 바인딩을 제거합니다. 저장한 서버 JSON과 서버의 기존 경매·정산 데이터까지 삭제하는 기능은 아닙니다.

## 역할 변경 전 점검

1. 현재 Role의 판매·교환·경매 목록을 별도 사용자 파일로 저장합니다.
2. 새 Role에 맞는 Currency와 GUI Path를 설정합니다.
3. GUI Maker에서 역할에 필요한 Singleton 구성 요소가 있는지 확인합니다.
4. 같은 경로에 저장한 뒤 런타임을 새로 열어 확인합니다. Role이나 문서 경로를 바꿨다면 다시 Apply합니다.
5. 기존 Role의 재고·경매 PersistentState가 자동 삭제되지 않는다는 점을 운영 기록에 남깁니다.
6. 새 플레이어와 기존 이용 플레이어로 Interaction Conditions를 다시 시험합니다.

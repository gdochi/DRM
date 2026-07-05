---
title: 상점 시스템
slug: shop-system
order: 80
description: NPC Shop JSON, 구매/판매 모드, 재고, 화폐, 상점 GUI 연결 규칙입니다.
product: core
category: 핵심 시스템
section: npc-shop
status: 안정
version: 0.1.2
audience: 상점 제작자
tags:
  - shop
  - economy
---

## ShopDocument 구조

NPC 상점은 `type: "npc_shop"`과 `schemaVersion: 2`를 가진 JSON입니다. 런타임은 이 문서를 읽어 구매, 판매, 재고 차감, 화폐 결제를 서버에서 처리합니다.

| 필드 | 의미 |
| --- | --- |
| `id` | 상점 고유 ID입니다. 파일명과 맞추면 대화에서 찾기 쉽습니다. |
| `title` | 상점 표시 이름입니다. `titleTranslationKey`를 사용할 수 있습니다. |
| `currency` / `currencyItem` | 아이템 화폐 fallback입니다. 예: `minecraft:emerald` |
| `currencyType` / `currencyId` | DRM 화폐 정의를 사용할 때 `currency`와 화폐 ID를 지정합니다. |
| `tradeMode` | `buy_only`, `sell_only`, `buy_sell` 중 하나입니다. |
| `display` | 설명 패널, 검색 바, 목록 모드 같은 표시 옵션입니다. |
| `shopDefaultGui` | 기본 상점 GUI 연결입니다. |
| `shopGuis.buy` / `shopGuis.sell` | 구매와 판매 화면별 GUI 연결입니다. |
| `items` | NPC가 판매하는 상품 목록입니다. |
| `sellItems` | NPC가 매입하는 아이템 목록입니다. |

## 거래 모드

| tradeMode | 구매 | 판매 | 설명 |
| --- | --- | --- | --- |
| `buy_only` | 가능 | 불가 | NPC가 플레이어에게 아이템을 판매합니다. |
| `sell_only` | 불가 | 가능 | NPC가 플레이어 아이템을 매입합니다. |
| `buy_sell` | 가능 | 가능 | 구매와 판매 탭을 모두 사용합니다. |

기존의 `buyEnabled`, `sellEnabled`, `shopMode` 값은 로드 시 `tradeMode` 기준으로 정규화됩니다.

## 상품 필드

| 필드 | 구매 상품 `items` | 매입 상품 `sellItems` |
| --- | --- | --- |
| `productId` | 상품 행 고유 ID | 매입 행 고유 ID |
| `item` | 지급할 아이템 ID | 매입할 아이템 ID |
| `count` | 1회 구매 시 지급 수량 | 1회 판매 단위 수량 |
| `price` | 1회 구매 가격 | 1회 판매 보상 |
| `stock` | 재고입니다. `-1`은 무제한입니다. | 사용하지 않습니다. |
| `description` | 설명 패널에 표시할 문구 또는 번역 키 | 보통 사용하지 않습니다. |
| `action` | 구매 성공 후 실행할 명령형 문자열 | 사용하지 않습니다. |
| `nbt` | 선택 사항 | 특정 NBT 아이템만 매입할 때 사용합니다. |

상품 ID는 중복되면 로드 시 접미사가 붙어 보정됩니다. 아이템 ID가 비어 있으면 `minecraft:stone`으로 보정됩니다.

## 구매 처리

구매는 서버에서 다음 순서로 처리됩니다.

1. 상점 대상이 `bound`인지 파일 경로/ID인지 확인합니다.
2. `tradeMode`가 구매를 허용하는지 확인합니다.
3. 선택한 상품과 요청 수량을 검증합니다.
4. 재고가 있으면 요청 수량을 재고 안으로 제한합니다.
5. 플레이어 인벤토리 여유를 확인합니다.
6. 아이템 화폐 또는 DRM 화폐 잔액을 차감합니다.
7. 아이템을 지급하고, 유한 재고라면 상점 JSON을 갱신합니다.

`stock`이 `0`이면 품절이고, `-1`이면 무제한입니다. 가격 계산은 `price * quantity`이며 수량이 매우 커도 정수 오버플로를 피하도록 제한됩니다.

## 판매 처리

판매는 `sellItems`에 등록된 매입 행을 명시적으로 선택해야 실행됩니다. 같은 아이템을 서로 다른 가격으로 팔 수 있는 경우, 런타임은 선택된 매입 행과 인벤토리 슬롯이 일치하는지 다시 검증합니다.

| 체크 | 설명 |
| --- | --- |
| 아이템 ID | 인벤토리 아이템과 `sellItems[].item`이 같아야 합니다. |
| NBT | `sellItems[].nbt`가 있으면 NBT 문자열도 같아야 합니다. |
| 단위 수량 | 플레이어가 가진 수량을 `count` 단위로 잘라 판매합니다. |
| 가격 | `price`가 0 이하면 판매가 거부됩니다. |

## 상점 GUI 연결

상점 GUI는 `guiType: "npc_shop"`인 GUI JSON을 사용합니다. 기본 상점 GUI에는 검색 바, 페이지 선택, 액션 버튼, 거래 미리보기, 화폐 표시 같은 상점 전용 컴포넌트가 들어 있습니다.

```json
{
  "shopDefaultGui": {
    "guiSource": "default",
    "guiJsonFileName": "default_shop_gui.json",
    "guiJsonPath": "default_shop_gui.json"
  }
}
```

구매와 판매 화면을 다르게 만들고 싶으면 `shopGuis.buy`와 `shopGuis.sell`에 서로 다른 GUI 파일을 연결합니다.

## 대화에서 상점 열기

대화 액션 `go_shop`은 상점을 엽니다.

| 값 | 의미 |
| --- | --- |
| `bound` 또는 빈 값 | NPC에 직접 붙은 상점을 엽니다. |
| `blacksmith` | `npc_shops/blacksmith.json` 또는 ID가 `blacksmith`인 상점을 찾습니다. |
| `folder/blacksmith.json` | 하위 경로의 상점 파일을 직접 찾습니다. |

:::warning 파일 상점 관리
파일 기반 상점의 유한 재고는 거래 후 파일에 다시 저장될 수 있습니다. 운영 중인 상점 JSON을 수동 수정할 때는 서버가 열려 있는지, 캐시 정책이 어떤지 함께 확인하세요.
:::

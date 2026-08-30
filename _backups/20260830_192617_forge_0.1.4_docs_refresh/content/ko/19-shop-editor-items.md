---
title: 상품과 매입 목록
slug: shop-editor-items
order: 81
description: NPC Shop에서 구매 상품과 매입 상품을 구성하는 필드와 버튼 기준입니다.
product: core
category: NPC Shop
section: npc-shop
status: 안정
version: 0.1.3
audience: 상점 제작자
tags:
  - shop
  - items
---

## 구매 목록과 판매 목록

이 문서에서 설명하는 목록은 제작자가 NPC Shop 에디터에서 편집하는 상품 목록입니다. 플레이어가 인게임 상점 런타임에서 보는 상품 행은 이 에디터 목록을 바탕으로 표시되지만, 그 화면 배치는 GUI Maker의 `npc_shop` GUI가 담당합니다.

NPC Shop 에디터 화면에는 구매 목록과 판매 목록을 전환하는 `List: Buy` / `List: Sell` 버튼이 있습니다.

| 모드 | 편집하는 배열 | 의미 |
| --- | --- | --- |
| `List: Buy` | `items` | NPC가 플레이어에게 판매하는 상품입니다. |
| `List: Sell` | `sellItems` | NPC가 플레이어에게서 매입하는 아이템입니다. |

상점의 `tradeMode`가 `buy_only`이면 구매 목록만 의미가 있고, `sell_only`이면 매입 목록이 중심이 됩니다. `buy_sell`은 둘 다 사용합니다.

## 상품 행 버튼

| 버튼 | 기능 |
| --- | --- |
| `Add` | 현재 목록에 새 상품 행을 추가합니다. |
| `Delete` | 선택한 상품 행을 삭제합니다. |
| `Duplicate` | 선택한 상품 행을 복제합니다. |
| 위/아래 이동 | 목록 순서를 바꿉니다. |
| `Item` 선택 | Minecraft 아이템 ID를 고릅니다. |

구매 상품과 매입 상품은 비슷해 보이지만 저장 필드가 다릅니다. 구매 상품은 `stock`을 쓰고, 매입 상품은 `stock`을 쓰지 않습니다.

## 구매 상품 필드

| 필드 | 설명 |
| --- | --- |
| `productId` | 상품 행 고유 ID입니다. |
| `name` | 상품 표시 이름입니다. |
| `item` | 플레이어에게 지급할 아이템 ID입니다. |
| `count` | 한 번 구매할 때 받는 수량입니다. |
| `price` | 한 번 구매할 때 내는 가격입니다. |
| `stock` | 남은 재고입니다. `-1`은 무제한입니다. |
| `maxStock` | 재입고 후 도달할 최대 재고입니다. |
| `restock.enabled` | 자동 재입고 사용 여부입니다. 유한 재고에서만 사용합니다. |
| `restock.amount` | 한 번에 회복할 재고 수입니다. |
| `restock.intervalTicks` | 재입고 간격입니다. 24000틱은 게임 내 하루입니다. |
| `restock.nextGameTime` | 서버가 관리하는 다음 재입고 게임 시각입니다. |
| `currencyType` | `inherit`, `item`, `currency` 중 상품별 결제 모드입니다. |
| `currencyItem` / `currencyItemNbt` | 상품별 아이템 결제 ID와 정확한 NBT 조건입니다. |
| `currencyId` | 상품별 DRM 화폐 ID입니다. |
| `action` | 구매 성공 후 실행할 명령형 문자열입니다. |
| `nbt` | 지급 아이템에 붙일 NBT 문자열입니다. |
| `descriptionKey` / `description` | 설명 패널에 보여줄 내용입니다. |

## 매입 상품 필드

| 필드 | 설명 |
| --- | --- |
| `productId` | 매입 행 고유 ID입니다. |
| `name` | 매입 항목 표시 이름입니다. |
| `item` | 플레이어에게서 받을 아이템 ID입니다. |
| `count` | 한 번 판매할 때 필요한 단위 수량입니다. |
| `price` | 단위 판매 보상입니다. |
| `nbt` | 특정 NBT가 붙은 아이템만 받으려면 사용합니다. |

아이템 선택 기능으로 인벤토리 아이템을 고르면 아이템 ID와 NBT가 자동으로 채워질 수 있습니다. 자동 입력된 NBT를 그대로 사용하면 같은 커스텀 아이템을 기준으로 거래하고, 직접 고치면 더 좁거나 다른 조건으로 거래 대상을 조정할 수 있습니다.

매입 상품은 같은 아이템을 여러 가격으로 등록할 수 있습니다. 이 경우 런타임은 플레이어가 선택한 매입 행을 기준으로 처리합니다.

## 재고 값

| 값 | 의미 |
| --- | --- |
| `-1` | 무제한 재고 |
| `0` | 품절 |
| `1` 이상 | 남은 구매 가능 횟수 |

유한 재고 상품을 구매하면 상점 JSON의 재고 값이 줄어듭니다. 파일 기반 상점이면 서버 JSON 파일의 재고가 기준이 됩니다.

재입고를 켜려면 `stock`을 0 이상, `maxStock`·`amount`·`intervalTicks`를 양수로 둡니다. 재고가 최대치보다 낮아지면 타이머가 시작되고, 시간이 되면 `amount`만큼 `maxStock`까지 회복합니다. `nextGameTime`은 런타임이 저장하는 값이므로 보통 직접 계산하지 않습니다.

## 상품별 결제

| 에디터 모드 | 동작 |
| --- | --- |
| `Inherit Shop` | 상점 루트의 결제 수단을 그대로 씁니다. |
| `Override: Item` | 이 상품만 다른 아이템과 선택적 `Payment NBT`를 요구합니다. |
| `Override: Currency` | 이 상품만 다른 DRM 화폐 잔액을 사용합니다. |
| `Legacy: Item` / `Legacy: Currency` | 0.1.2 상점 필드를 읽었을 때 표시되는 호환 모드입니다. |

`Payment NBT`는 SNBT 문법이어야 합니다. 예를 들어 TACZ 9mm 탄약 결제를 구분하려면 `{AmmoId:"tacz:9mm"}`처럼 입력할 수 있습니다. `Invalid payment NBT` 또는 `Invalid currency override`가 보이면 저장·운영 전에 수정하세요.

## 제한

- `stock`은 구매 상품에만 의미가 있습니다.
- 매입 상품은 플레이어 인벤토리의 아이템과 `sellItems` 행이 맞아야 실행됩니다.
- `price`가 0 이하인 판매 보상은 실제 운영용 매입 상품으로 쓰기 적합하지 않습니다.
- 상품 이미지나 행 모양은 NPC Shop이 아니라 GUI Maker의 `npc_shop` GUI에서 조정합니다.

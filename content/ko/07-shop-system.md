---
title: NPC Shop
slug: shop-system
order: 80
description: NPC Shop의 구매/판매 구조, 상품 필드, 재고, 화폐, GUI 연결 규칙입니다.
product: core
category: NPC Shop
section: npc-shop
status: 안정
version: 0.1.2
audience: 상점 제작자
tags:
  - shop
  - economy
---

## 역할

NPC Shop은 NPC가 판매하거나 매입하는 상품 목록을 만드는 에디터입니다. 상점 문서는 `type: "npc_shop"`과 `schemaVersion: 2`를 가진 JSON이며, 런타임 거래는 서버에서 처리됩니다.

상점은 두 방식으로 연결할 수 있습니다. 파일 기반 상점은 `config/dochi_rpg_maker/npc_shops`에 저장하고 여러 NPC나 대화에서 참조합니다. NPC에 직접 붙은 상점은 해당 NPC의 PersistentData에 저장합니다.

## ShopDocument 주요 필드

| 필드 | 의미 |
| --- | --- |
| `id` | 상점 고유 ID입니다. 파일명과 맞추면 대화에서 찾기 쉽습니다. |
| `title` | 상점 표시 이름입니다. |
| `titleTranslationKey` | `title`을 번역 키로 볼지 정합니다. |
| `currency` / `currencyItem` | 아이템 화폐 fallback입니다. 예: `minecraft:emerald` |
| `currencyType` / `currencyId` | DRM 화폐 정의를 사용할 때의 타입과 ID입니다. |
| `tradeMode` | `buy_only`, `sell_only`, `buy_sell` 중 하나입니다. |
| `display` | 설명 패널, 검색 바, 목록 표시 옵션입니다. |
| `shopDefaultGui` | 기본 상점 GUI 연결입니다. |
| `shopGuis.buy` / `shopGuis.sell` | 구매/판매 화면별 GUI 연결입니다. |
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
| `name` | 표시 이름 | 표시 이름 |
| `nameTranslationKey` | 이름을 번역 키로 볼지 여부 | 이름을 번역 키로 볼지 여부 |
| `item` | 지급할 아이템 ID | 매입할 아이템 ID |
| `count` | 1회 구매 시 지급 수량 | 1회 판매 단위 수량 |
| `price` | 1회 구매 가격 | 1회 판매 보상 |
| `stock` | 재고입니다. `-1`은 무제한입니다. | 사용하지 않습니다. |
| `descriptionKey` / `description` | 설명 패널에 표시할 내용 | 보통 사용하지 않습니다. |
| `action` | 구매 성공 후 실행할 명령형 문자열 | 사용하지 않습니다. |
| `nbt` | 선택 사항 | 특정 NBT 아이템만 매입할 때 사용합니다. |

상품 ID가 비어 있으면 `item_1`, `sell_item_1` 같은 값으로 보정됩니다. 아이템 ID가 비어 있으면 기본값으로 `minecraft:stone`이 들어갑니다.

## 재고와 가격

`stock`은 구매 상품에만 적용됩니다. `0`은 품절이고, `-1`은 무제한입니다. 가격은 `price * quantity`로 계산됩니다.

판매 상품은 재고를 쓰지 않습니다. 플레이어가 가진 아이템 수량과 `sellItems[].count`를 기준으로 판매 가능한 단위가 정해집니다.

## 화폐 방식

| 방식 | 필드 | 설명 |
| --- | --- | --- |
| 아이템 화폐 | `currency`, `currencyItem` | 인벤토리의 아이템을 돈처럼 사용합니다. |
| DRM 화폐 | `currencyType: "currency"`, `currencyId` | Currency Editor에서 만든 잔액을 사용합니다. |

DRM 화폐를 사용할 때는 먼저 Currency Editor에서 화폐 정의를 만들고, 상점에서 같은 `currencyId`를 선택해야 합니다.

## GUI 연결

상점 GUI는 `guiType: "npc_shop"`인 GUI JSON을 사용합니다. 기본 상점 GUI에는 검색 바, 페이지 선택, 액션 버튼, 거래 미리보기, 화폐 표시 같은 상점 전용 컴포넌트가 들어 있습니다.

구매와 판매 화면을 다르게 만들고 싶으면 `shopGuis.buy`와 `shopGuis.sell`에 서로 다른 GUI 파일을 연결합니다.

## 대화에서 상점 열기

대화 액션 `go_shop`은 상점을 엽니다.

| 값 | 의미 |
| --- | --- |
| `bound` 또는 빈 값 | NPC에 직접 붙은 상점을 엽니다. |
| `blacksmith` | `npc_shops/blacksmith.json` 또는 ID가 `blacksmith`인 상점을 찾습니다. |
| `folder/blacksmith.json` | 하위 폴더의 상점 파일을 직접 가리킵니다. |

## 가능한 것

- 구매 전용, 판매 전용, 구매/판매 통합 상점을 만들 수 있습니다.
- 같은 아이템을 다른 가격과 설명으로 여러 행에 등록할 수 있습니다.
- DRM 화폐 또는 아이템 화폐를 결제 기준으로 사용할 수 있습니다.
- 구매 화면과 판매 화면의 GUI를 다르게 연결할 수 있습니다.
- 대화 선택지에서 `go_shop` 액션으로 상점을 열 수 있습니다.

## 제한

- NPC Shop은 거래 데이터를 만드는 도구입니다. 상점 화면의 세부 배치는 GUI Maker에서 바꿉니다.
- 판매 상품은 반드시 `sellItems`에 등록된 행을 기준으로 처리됩니다. 인벤토리에 있는 모든 아이템을 자동 매입하지 않습니다.
- 여러 화폐를 한 상품 가격에 동시에 섞어 쓰는 구조는 아닙니다. 상점 문서의 기준 화폐를 정해 사용합니다.
- 은행 기능이나 별도 계좌 기능은 이 문서 범위에 넣지 않습니다.

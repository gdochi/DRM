---
title: 화폐와 GUI 연결
slug: shop-currency-gui
order: 82
description: NPC Shop에서 아이템 화폐, DRM 화폐, 구매/판매 GUI를 연결하는 기준입니다.
product: core
category: NPC Shop
section: npc-shop
status: 안정
version: 0.1.2
audience: 상점 제작자
tags:
  - shop
  - currency
  - gui
---

## 화폐 선택

NPC Shop은 두 가지 결제 방식을 다룹니다.

| 방식 | 주요 필드 | 설명 |
| --- | --- | --- |
| 아이템 화폐 | `currency`, `currencyItem` | 에메랄드 같은 아이템을 가격으로 사용합니다. |
| DRM 화폐 | `currencyType`, `currencyId` | Currency Editor에서 만든 잔액을 가격으로 사용합니다. |

`currencyType`이 `currency`이면 `currencyId`를 기준으로 DRM 화폐 정의를 찾습니다. 그 외에는 `currencyItem`이 기준이 됩니다.

## Currency Picker

상점 에디터는 서버 또는 로컬 화폐 정의 목록을 읽어 Currency Picker에 표시합니다. 여기서 화폐를 고르면 상점 문서의 `currencyType`, `currencyId`, `currency`, `currencyItem` 값이 함께 정리됩니다.

| 선택 결과 | 저장되는 방향 |
| --- | --- |
| DRM 화폐 선택 | `currencyType: "currency"`, `currencyId: "<id>"` |
| 아이템 화폐 선택 | `currencyType`은 아이템 방식, `currencyItem`에 아이템 ID |

## GUI 연결 필드

| 필드 | 의미 |
| --- | --- |
| `shopDefaultGui` | 구매/판매 공통 기본 GUI입니다. |
| `shopGuis.buy` | 구매 화면 전용 GUI입니다. |
| `shopGuis.sell` | 판매 화면 전용 GUI입니다. |

구매와 판매 화면을 같은 구조로 쓰면 `shopDefaultGui`만으로 충분합니다. 두 화면의 목록, 버튼, 설명 패널 구성을 다르게 만들려면 `shopGuis.buy`와 `shopGuis.sell`을 나눕니다.

## 상점 GUI에 필요한 컴포넌트

| 컴포넌트 | 역할 |
| --- | --- |
| `item_slot` | 상품 목록 행입니다. |
| `shop_action_button` | 구매 또는 판매 실행 버튼입니다. |
| `shop_transaction_viewer` | 선택한 거래의 수량, 단가, 총액을 보여줍니다. |
| `currency_display` | 플레이어 잔액 또는 보유 화폐를 보여줍니다. |
| `shop_search_bar` | 상품 목록 필터 입력입니다. |
| `shop_page_selector` | 여러 페이지를 이동하는 UI입니다. |
| `player_inventory` | 판매 모드에서 플레이어 인벤토리를 보여줍니다. |
| `shop_item_description` | 선택한 상품 설명을 표시합니다. |

## GUI Maker와 역할 분리

NPC Shop은 상품 데이터와 거래 규칙을 저장합니다. GUI Maker는 그 상품을 화면에 어떤 모양으로 보여줄지 저장합니다.

따라서 상품이 보이지 않을 때 먼저 봐야 할 기준은 다음처럼 나뉩니다.

| 확인 대상 | 담당 에디터 |
| --- | --- |
| 상품 ID, 가격, 재고, 매입 목록 | NPC Shop |
| 상품 행 위치, 버튼 위치, 검색 바, 페이지 버튼 | GUI Maker |
| 화폐 ID와 HUD 표시 규칙 | Currency Editor / HUD Maker |

## 제한

- 상점 GUI 파일만 만들어서는 거래 상품이 생기지 않습니다.
- 상점 문서에 없는 컴포넌트 역할을 GUI에서 만들어도 서버 거래 규칙은 바뀌지 않습니다.
- 구매와 판매를 다른 GUI로 나눌 때도 두 GUI 모두 `guiType: "npc_shop"`이어야 합니다.

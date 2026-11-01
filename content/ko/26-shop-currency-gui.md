---
title: 화폐와 GUI 연결
slug: shop-currency-gui
order: 82
description: NPC Shop에서 아이템 화폐, DRM 화폐, 구매/판매 GUI를 연결하는 기준입니다.
product: core
category: NPC Shop
section: npc-shop
status: 안정
version: 0.3.1
audience: 상점 제작자
tags:
  - shop
  - currency
  - gui
---

## 에메랄드를 받을지, 마을 주화를 받을지

**NPC Shop → Shop settings → Shop currency**에서 상점의 기본 결제 수단을 정합니다. 에메랄드 아이템을 직접 받는 상점과, Currency Editor에서 만든 잔액을 받는 상점은 다른 방식입니다.

| 받을 돈 | 선택 | 준비 |
| --- | --- | --- |
| 인벤토리의 에메랄드 | Same required item → Payment item: minecraft:emerald | 별도 화폐 정의 없이 시작 가능 |
| 플레이어의 마을 주화 잔액 | DRM 화폐를 선택하고 저장한 town_coin 지정 | [Currency Editor](#core/currency-editor)에서 먼저 저장 |

![Shop settings의 Shop currency와 Payment item 설정.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. 현재 화면은 Same required item이며 에메랄드를 직접 받습니다. 상품마다 바꾸려면 Payment 탭에서 설정합니다.")

## 한 상품만 다른 돈 받기

왼쪽에서 상품을 고르고 **Payment**를 엽니다. **Inherit shop**이면 방금 정한 상점 기본 결제를 사용합니다. 상품 자체의 아이템/화폐 방식을 선택하면 그 상품만 다른 결제를 사용합니다.

예를 들어 빵은 에메랄드로 팔고 특별한 검은 마을 주화로 팔 수 있습니다. 가격 숫자만 바꾸어서는 결제 방식이 바뀌지 않습니다. 어떤 아이템이나 잔액을 받는지도 함께 선택합니다.

![Bread의 Payment 설정.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "DRM 0.3.1 / Forge 1.20.1. 상점 기본 결제를 상속하는지, 이 상품에 별도 결제를 지정했는지 확인합니다. Product의 Quantity는 지급할 상품 수량이고 Price는 한 묶음 가격입니다.")

## 상점 창 모양 바꾸기

1. **GUI Maker**에서 **npc_shop** 화면을 열고 기본 상점 화면을 불러옵니다.
2. 상품 행·가격·거래 버튼의 위치를 조정한 뒤 **Save As**로 저장합니다.
3. **NPC Shop → Shop settings → Shop interface**에서 내 화면을 사용하는 방식으로 바꿉니다.
4. **Interface JSON** 옆 돋보기로 저장한 상점 GUI를 선택합니다.
5. 상점도 **Save As / Save**하고 NPC에 적용한 뒤 실제 상점을 다시 엽니다.

구매·매입 화면을 따로 꾸미는 설정을 쓰는 경우 각각 같은 `npc_shop` 화면 종류로 만듭니다. 대화용 GUI를 골라 놓으면 상점 목록과 거래 버튼을 기대한 대로 표시할 수 없습니다.

## 화면에서 무엇을 확인하나요?

![Bread를 선택한 실제 NPC 상점의 결제 요약.](assets/media/guides/drm-031-forge1201/shop-bread-selected.png "DRM 0.3.1 / Forge 1.20.1. 이 실습은 빵 3개 한 묶음에 에메랄드 4개입니다. 체크한 상품과 아래 합계의 결제 수단을 확인하고 Buy Selected를 누릅니다.")

| 바꾸고 싶은 것 | 여는 곳 |
| --- | --- |
| 상품·묶음 수량·가격·재고 | NPC Shop → Product / Restock |
| 받을 아이템·화폐 | Shop settings 또는 상품의 Payment |
| 상품 행·합계·버튼의 배치 | GUI Maker의 npc_shop 화면 |
| 화폐 이름·아이콘·아이템 변환 | Currency Editor |
| 게임 화면에 계속 보이는 잔액 | HUD Maker |

상점의 잔액 요소는 플레이어가 가진 돈을 표시합니다. 아이콘과 글자를 그려 놓는 것으로 잔액이 지급되지는 않습니다. 돈을 만들고 잔액을 확인하는 순서는 [화폐와 HUD 연결](#core/currency-hud-shop), 실제 거래 예제는 [상점 만들기](#core/shop-system)를 따릅니다.

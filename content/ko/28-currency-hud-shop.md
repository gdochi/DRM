---
title: HUD와 상점 연동
slug: currency-hud-shop
order: 92
description: Currency Editor의 화폐 정의가 NPC Shop과 HUD Maker에 연결되는 방식을 설명합니다.
product: core
category: 커런시 에디터
section: currency-editor
status: 안정
version: 0.3.1
audience: 제작자 / 운영자
tags:
  - currency
  - hud
  - shop
---

## 같은 화폐를 상점과 HUD에서 고르기

[Currency Editor](#core/currency-editor)에서 `town_coin`을 저장해 둡니다. 화폐 파일은 돈의 종류를 만들고, 상점은 그 돈을 받으며, HUD는 플레이어의 잔액을 보여 줍니다. 세 곳에서 같은 ID를 선택합니다.

## 상점이 이 돈을 받게 하기

1. **NPC Shop → Shop settings**를 엽니다.
2. **Shop currency → Currency**로 바꾸고 저장한 화폐를 선택합니다.
3. 상품의 **Payment → Payment method**는 **Inherit Shop**으로 둡니다.
4. **Price**를 정하고 상점을 저장합니다.
5. NPC에 상점을 다시 적용한 뒤 해당 화폐 잔액을 가진 플레이어로 구매합니다.

![상점 공통 결제를 정하는 Shop settings.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. 이 사진은 Item 결제 예제입니다. DRM 잔액을 받으려면 Shop currency를 Currency로 바꾸고 화폐를 선택합니다. 상품의 Payment에서 별도 결제를 지정했다면 그 상품은 공통 설정을 따르지 않습니다.")

| 결제 방식 | 플레이어가 준비할 것 | 예 |
| --- | --- | --- |
| Item | 인벤토리의 실제 아이템 | 에메랄드 네 개 |
| Currency | 서버에 저장된 해당 ID의 잔액 | town_coin 잔액 4 |

화폐의 **Item Icon**에 에메랄드를 골랐다는 이유로 상점이 에메랄드 아이템을 받지는 않습니다. 아이콘과 결제 종류는 각각 정합니다. 상품 하나만 다른 돈을 받는 방법은 [상품과 매입 목록](#core/shop-editor-items)에서 이어집니다.

## HUD에서 잔액 표시 고르기

1. **HUD Maker**를 열고 **+ Currency**를 누릅니다.
2. **Apply Currency HUD**에서 `town_coin`을 검색합니다.
3. 표시 이름 아래 ID를 확인하고 이 창의 **Apply**를 누릅니다.
4. 추가된 **Currency**를 선택해 위치·크기·금액 표시를 정합니다.
5. HUD 세트를 **Save As**로 저장하고 상단 **Apply**로 활성화합니다.

![Apply Currency HUD에서 Town Coin / town_coin을 선택한 화면.](assets/media/guides/drm-031-forge1201/hud-currency-picker.png "DRM 0.3.1 / Forge 1.20.1. 이 창의 Apply는 화폐 구성 요소를 추가합니다. 창 뒤 상단의 Apply는 세트를 활성화하는 별도 버튼입니다.")

금액 서식과 언제 보일지는 HUD Maker에서 정합니다. 화폐 파일의 옛 HUD 필드를 직접 붙이는 방식으로 만들지 않습니다. 현재 Forge 0.3.1에서 활성화 저장이 요청 제한에 막히는 경우가 있으므로 [HUD Maker의 Apply 오류 안내](#core/hud-maker)를 확인하세요.

## 잔액을 준비해 거래 시험하기

관리 권한이 있는 플레이어는 실제 저장한 ID로 잔액을 지급·조회할 수 있습니다.

```mcfunction
/drm currency give @s town_coin 20
/drm currency get @s town_coin
```

가격 4짜리 상품을 한 번 구매했다면 지급 전후의 잔액과 상품 수를 비교합니다. 거래는 되는데 표시만 안 보이면 HUD 세트·화폐 ID·표시 조건을 확인합니다. 주운 아이템을 잔액으로 바꾸려면 [아이템 변환 가치](#core/currency-fields)를 설정합니다.

---
title: 상품과 매입 목록
slug: shop-editor-items
order: 81
description: 빵 세 개를 에메랄드 네 개에 파는 상품을 만들고 결제·재고·재입고를 맞춥니다.
product: core
category: NPC Shop
section: npc-shop
status: 안정
version: 0.3.1
audience: 상점 제작자
tags:
  - shop
  - items
---

## NPC가 팔 것과 사들일 것 나누기

**NPC Shop** 위쪽의 **Buy items**는 플레이어가 살 상품, **Sell items**는 플레이어가 NPC에게 팔 아이템입니다. 먼저 [상점 시작 안내](#core/shop-system)에서 기본 상점을 열어 두세요. 아래 화면은 DRM 0.3.1 / Forge 1.20.1입니다.

| 만들 거래 | 고를 목록 | 한 번 거래하면 |
| --- | --- | --- |
| NPC가 빵을 판매 | Buy items | 플레이어가 돈을 내고 빵을 받음 |
| NPC가 밀을 매입 | Sell items | 플레이어가 밀을 내고 보상을 받음 |

상점의 거래 모드에서도 구매·판매를 허용해야 해당 목록을 쓸 수 있습니다. 상품만 추가하고 상점 모드를 구매 전용으로 두면 매입 기능은 열리지 않습니다.

## 빵 세 개짜리 상품 만들기

![Buy items의 Bread를 선택한 Product 탭.](assets/media/guides/drm-031-forge1201/shop-bread-product.png "Item은 minecraft:bread, Quantity는 3, Stock과 Maximum stock은 12입니다. Quantity는 지급할 빵 개수이고 Stock은 이 묶음을 구매할 수 있는 횟수입니다.")

1. **Buy items**에서 **Add**로 행을 추가하거나 기본 **Bread**를 선택합니다.
2. **Product → Item**에서 빵을 고릅니다.
3. **Name**은 플레이어에게 보일 상품명으로 정합니다.
4. **Quantity**를 `3`으로 둡니다. 한 번 결제하면 빵 세 개를 받습니다.
5. **Stock**을 `12`, **Maximum stock**을 `12`로 두면 처음에는 열두 번 구매할 수 있습니다.
6. **Description**에 필요한 설명을 넣습니다. 지급 아이템 자체의 이름·효과와 상점 설명은 별개입니다.

같은 상품을 변형하려면 **Duplicate**, 필요 없는 행은 **Delete**를 사용합니다. 특수 아이템은 Item 선택과 NBT를 함께 확인하세요. 일반 빵을 만드는 예제에서는 NBT를 비워 둡니다.

## 한 묶음의 가격 정하기

![Bread의 Payment 탭과 에메랄드 결제 표시.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "Price 4는 Quantity 3 전체의 가격입니다. 아래 item:minecraft:emerald가 현재 결제 수단을 보여 줍니다.")

1. 같은 상품의 **Payment**를 엽니다.
2. **Price**를 `4`로 둡니다.
3. **Payment method → Inherit Shop**이면 **Shop settings**의 기본 결제를 따릅니다.
4. 에메랄드 네 개를 내고 빵 세 개를 받는 거래인지 **Preview**에서 읽어 봅니다.

이 상품만 다른 돈을 받으려면 **Override: Item** 또는 **Override: Currency**를 고릅니다. 아이템 결제는 인벤토리 수량을, DRM 화폐 결제는 저장된 잔액을 사용합니다. 여러 재료를 요구하는 거래는 **Required items**에서 구성합니다. [화폐와 상점 연결](#core/currency-hud-shop)에서 공통 결제와 상품별 결제를 구분하세요.

## 재고와 재입고 맞추기

![상품의 자동 재입고를 설정하는 Restock 탭.](assets/media/guides/drm-031-forge1201/shop-restock.png "Enable restock을 켠 뒤 Restock interval과 Restock amount를 정합니다. 재입고는 Maximum stock을 넘기지 않습니다.")

| 설정 | 예제 | 게임에서의 의미 |
| --- | --- | --- |
| Stock | 12 | 이 묶음을 열두 번 살 수 있음 |
| Stock | 0 | 품절 |
| Stock | -1 | 무제한 재고 |
| Maximum stock | 12 | 재입고로 채울 상한 |
| Restock amount | 2 | 재입고 한 번에 구매 가능 횟수 두 번 회복 |
| Restock interval | 24000틱 | 기본 20틱/초 기준 게임 내 하루 |

유한 재고에 **Enable restock**을 켜고 간격·수량·최대치를 양수로 둡니다. 상점 전체의 **Timer basis**는 잠으로 건너뛴 시간 처리에 영향을 줍니다. [상점 시작 안내](#core/shop-system)의 시간 기준 설명을 확인하세요.

운영 중 재고는 NPC별로 줄어듭니다. 같은 상점 파일을 다른 NPC에 적용했다고 두 NPC의 남은 재고가 하나로 합쳐지지는 않습니다. 상품 **Quantity 3**을 재고 3으로 오해하지 마세요.

## 매입 상품 만들기

**Sell items → Add**에서 받을 아이템과 **Quantity**, 보상을 정합니다. 예를 들어 밀 세 개를 한 단위로 정했다면 플레이어가 그 단위를 충족해야 판매할 수 있습니다. 상점의 결제·보상 수단도 함께 확인합니다.

매입 목록은 판매 재고를 쓰지 않습니다. 같은 아이템을 서로 다른 조건·가격으로 등록했다면 플레이어가 어떤 행을 선택했는지에 따라 거래를 확인하세요. 특정 커스텀 아이템만 받으려면 NBT 조건을 사용하되, 먼저 실제 그 아이템으로 시험합니다.

## 저장한 뒤 실제 거래 확인하기

1. 기본 상점을 편집했다면 **Save As**로 `village_shop` 같은 새 이름에 저장합니다.
2. DRM 코어로 NPC를 선택하고 **NPC Shop JSON → 저장한 상점 → Apply Shop**을 누릅니다.
3. 결제 수단을 준비한 플레이어가 빈손으로 NPC를 엽니다.
4. 상품을 체크하고 **Buy Selected**로 한 번 구매합니다.
5. 받은 아이템·남은 돈·남은 재고를 함께 확인합니다. 이 예제는 빵 세 개 지급, 에메랄드 네 개 차감, 구매 가능 횟수 한 번 차감입니다.

상품 행의 배치·글자·이미지를 바꾸려면 [GUI Maker](#core/gui-system)를 사용합니다. 상품·가격·재고는 계속 NPC Shop에서 편집합니다.

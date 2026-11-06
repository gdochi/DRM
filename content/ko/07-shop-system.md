---
title: NPC 상점 만들기
slug: shop-system
order: 80
description: 상품·가격·결제 수단을 정해 물건을 사고파는 NPC를 만듭니다.
product: core
category: NPC Shop
section: npc-shop
status: 안정
version: 0.3.1
audience: 상점 제작자
tags:
  - shop
  - economy
---

## 빵을 파는 상점 만들기

예제에서는 **빵 3개를 에메랄드 4개에** 팝니다. 정지 스크린샷은 **DRM 0.3.1 / Forge 1.20.1의 영문 화면**입니다.

### 1. 상품과 수량 정하기

에디터 선택 화면에서 **NPC Shop → Use Default**로 예제를 엽니다. 왼쪽 **Buy items** 목록에서 **Bread**를 고르고 오른쪽 **Product**를 엽니다. 새 상품은 **Add**로 추가합니다.

![NPC Shop의 Buy items 목록에서 Bread를 선택한 Product 탭. Item은 minecraft:bread, Quantity는 3입니다.](assets/media/guides/drm-031-forge1201/shop-bread-product.png "Product는 무엇을 몇 개 줄지 정하는 화면입니다. 이 예제의 Quantity 3은 한 번 결제할 때 받는 빵 세 개를 뜻합니다.")

**Item** 옆 돋보기로 아이템을 고르고, **Quantity**에 한 번 거래할 수량을 씁니다. **Stock**은 남은 판매 횟수입니다. 예제는 12회이며, 품절 없이 팔려면 **-1**로 바꿉니다. **Display name**과 **Description**은 상품의 이름과 설명입니다.

### 2. 가격과 결제 수단 정하기

같은 상품을 선택한 채 **Payment**를 엽니다. **Price**가 한 번 결제할 가격입니다. 예제의 **Quantity 3 + Price 4**로 구매하면 에메랄드 네 개를 내고 빵 세 개를 받습니다.

![Bread의 Payment 탭. Payment method는 Inherit Shop, Price는 4, 결제 아이템은 에메랄드입니다.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "Inherit Shop은 상점 기본 결제 수단을 사용합니다. 아래 item:minecraft:emerald로 현재 어떤 아이템을 받는지 확인합니다.")

상점 전체의 결제 수단은 **Shop settings**에서 정합니다. 예를 들어 **Shop currency → Item**, **Payment item → 에메랄드**로 고릅니다. DRM 화폐를 받으려면 [Currency Editor](#core/currency-editor)에서 화폐를 만든 뒤 선택합니다.

![Shop settings의 상점 화면 경로와 기본 결제 수단.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. 상점 공통 설정입니다. 상품별로 다른 결제를 받으려면 Payment에서 상속을 해제합니다.")

### 3. 미리 보고 저장하기

위쪽 **Preview**로 플레이어에게 보일 상점 배치를 확인합니다. 상품의 수량·가격·설명이 맞는지 보고, **Close**로 돌아와 **Save As**로 내 상점을 저장합니다.

![NPC Shop의 Preview로 연 플레이어용 상점. 상품 목록과 가격, 상품 설명, 구매 요약이 보입니다.](assets/media/guides/drm-031-forge1201/shop-player-preview.png "편집기 Preview로 확인한 화면입니다. 실제 구매 확인은 저장한 상점을 NPC에 적용한 뒤 결제 수단을 준비해서 진행합니다.")

코어로 NPC를 우클릭해 저장한 상점을 적용합니다. 양손을 비우고 다시 말을 걸어 상점을 연 뒤, 결제 아이템을 준비해 한 번 거래해 봅니다. 대화에서 상점을 열려면 이 페이지 아래의 **대화에서 상점 열기**를 따라갑니다.

### 실제 거래 결과 확인하기

DRM 코어로 NPC를 열고 **NPC Shop JSON → 저장한 상점 → Apply Shop**으로 연결합니다. 에메랄드 열 개를 준비한 뒤 양손을 비우고 NPC를 엽니다. Bread 왼쪽 체크박스를 켜고 **Buy Selected**를 누릅니다.

![실제 NPC 상점에서 Bread만 체크한 상태.](assets/media/guides/drm-031-forge1201/shop-bread-selected.png "DRM 0.3.1 / Forge 1.20.1. 아이콘의 3은 지급할 빵 개수, 가운데 1은 구매할 묶음 수입니다. 아래 요약에서 빵 세 개와 에메랄드 네 개를 확인합니다.")

![구매 후 Emerald 6과 Bread 재고 11/12를 보여 주는 실제 상점.](assets/media/guides/drm-031-forge1201/shop-bread-purchased.png "실제 서버 인벤토리에 빵 세 개가 들어오고 에메랄드는 10에서 6으로 줄었습니다. Bread의 구매 가능 횟수는 12에서 11로 줄고 재입고 타이머가 시작되었습니다. 아래 요약은 현재 선택한 랜턴이므로 이전 거래 영수증으로 읽지 않습니다.")

![빵을 골라 한 묶음을 구매하면 결제 금액과 재고가 갱신되는 과정.](assets/media/guides/extra-videos-20261106/shop-purchase.mp4 "DRM 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1, 영문 UI. 빵 3개 지급, 에메랄드 10→6, 구매 가능 재고 12→11을 확인했습니다.")

## 판매와 매입 구분하기

| 만들 상점 | 설정 |
| --- | --- |
| NPC가 플레이어에게 물건을 팜 | 구매 목록에 상품 추가 |
| NPC가 플레이어의 물건을 사들임 | 판매/매입 목록에 아이템 추가 |
| 양쪽 모두 사용 | 구매·판매 통합 모드 |

매입 목록에 없는 아이템은 사들이지 않습니다. 같은 아이템도 수량·가격이 다른 상품으로 여러 번 등록할 수 있습니다.

## 재고와 재입고

재고 **0**은 품절, **-1**은 무제한입니다. 한정 판매는 양수로 정하고, 자동으로 다시 채우려면 **Restock**을 설정합니다.

![랜턴 상품의 Restock 탭. 자동 재입고 스위치, Timer basis, Restock interval과 Restock quantity가 있습니다.](assets/media/guides/drm-031-forge1201/shop-restock.png "Product에서 Stock과 Maximum stock을 먼저 정합니다. Restock에서는 켤지, 언제, 몇 회분을 채울지 정합니다. 이 화면은 랜턴 예제입니다.")

**Maximum stock은 Product**, **Restock quantity와 간격은 Restock**에 있습니다. 예를 들어 최대 재고 8, 보충 수량 2는 재입고할 때마다 두 회분을 더해 최대 여덟 회분까지만 채운다는 뜻입니다.

**Timer basis**는 상점 전체의 시간 기준입니다.

| 선택 | 재입고 시간 |
| --- | --- |
| **Real ticks** | 실제로 진행한 게임 시간만 셈. 잠으로 건너뛴 시간 제외 |
| **World ticks** | 월드 시각을 사용. 잠으로 건너뛴 시간 포함 |

20틱은 정상 속도에서 1초, 24,000틱은 약 20분입니다. 서버가 꺼져 있던 시간은 Real ticks에 포함되지 않습니다. 무제한 상품과 매입 목록에는 재입고를 쓰지 않습니다.

같은 상품 파일을 여러 NPC에 붙여도 재고는 NPC마다 따로입니다. 같은 NPC를 방문하는 플레이어들은 그 재고를 함께 사용합니다.

## 상품마다 다른 돈 받기

상품의 결제 설정에서 **Inherit Shop**은 상점 기본 화폐를, **Override: Item**은 별도 아이템을, **Override: Currency**는 별도 DRM 화폐를 사용합니다.

이름·인챈트·종류가 중요한 커스텀 아이템은 인벤토리에서 해당 아이템을 골라 등록하세요.

## 대화에서 상점 열기

Dialogue Editor의 선택지에 **상점 열기 / go_shop**을 붙이고 저장한 상점을 고릅니다. NPC에 이미 적용한 상점을 열려면 **bound**를 사용합니다.

상점 창의 배치나 그림은 [GUI Maker](#core/gui-system)에서 바꿉니다. 상품과 가격은 NPC Shop에서 계속 편집합니다.

상품별 상세 설정은 [상품과 매입 목록](#core/shop-editor-items)의 Forge 화면 예시와 구분해 참고하거나, 이 페이지의 기본 설정부터 사용하세요.

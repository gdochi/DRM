---
title: 추천 작업 흐름
slug: workflows
order: 120
description: 대화 NPC, 상점 NPC, 화폐/HUD를 실제 저장 구조 기준으로 만드는 순서입니다.
product: core
category: 레퍼런스 / 운영
section: operations
status: 안정
version: 0.3.1
audience: 제작자
tags:
  - workflow
  - examples
---

## 대화 NPC 하나 완성하기

1. [Dialogue Editor](#core/dialogue-system)에서 기본 예제를 열고 **Text**에 인사말을 씁니다.
2. **Choices**에서 답변으로 가는 선택지와 닫기 선택지를 만듭니다.
3. **start → Routes**가 첫 인사말로 가리키는지 확인합니다.
4. **Save As**로 `village_guide`를 저장합니다.
5. 코어로 NPC를 우클릭해 **Dialogue JSON → village_guide → Apply Dialogue**를 누릅니다.
6. 양손을 비우고 대화를 열어 각 선택지를 눌러 봅니다.

![village_guide가 NPC의 Dialogue에 적용된 화면.](assets/media/guides/drm-031-forge1201/npc-apply-result.png "DRM 0.3.1 / Forge 1.20.1. 가운데 파일을 고른 뒤 Apply Dialogue를 눌러 오른쪽 이름까지 확인합니다.")

대화창을 꾸미지 않아도 기본 화면으로 먼저 완성할 수 있습니다. 모양을 바꿀 때만 [GUI Maker](#core/gui-system)에서 복사본을 만들어 대화의 **GUI** 설정에 연결합니다.

## 상점을 연결하기

[NPC Shop](#core/shop-system)에서 **Product → Payment → Restock** 순서로 상품·가격·재고를 정합니다. **Preview**로 배치를 본 뒤 Save As로 저장하고, NPC Apply에서 **NPC Shop JSON**에 연결합니다. 결제 아이템을 준비해 한 번 구매하고 인벤토리와 재고를 확인합니다.

![Bread의 가격 4와 Inherit Shop 결제 설정.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "DRM 0.3.1 / Forge 1.20.1. Quantity 3은 한 번 받을 빵 수량이고 Price 4는 한 번 낼 에메랄드 수량입니다.")

대화 선택지에서 상점으로 들어가게 하려면 **Choice actions → go_shop**에 저장한 상점을 선택합니다. NPC에 적용된 상점을 쓰면 **bound**로 연결합니다.

## 내 화폐와 잔액 표시 붙이기

1. [Currency Editor](#core/currency-editor)에서 화폐를 만들고 Save As로 저장합니다.
2. NPC Shop의 결제에 그 화폐를 선택합니다. 아이템 화폐와 DRM 잔액 중 실제로 쓸 방식을 맞춥니다.
3. [HUD Maker](#core/hud-maker)에서 Currency를 추가해 같은 화폐를 고릅니다.
4. 화폐 지급·구매·잔액 표시가 이어지는지 확인합니다. HUD를 추가하는 것만으로 돈이 지급되지는 않습니다.

파일을 옮길 때는 [저장 폴더](#core/paths)에서 연결된 GUI·상점·화폐도 함께 확인합니다.

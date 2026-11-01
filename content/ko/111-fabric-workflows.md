---
title: 추천 작업 흐름
slug: workflows
order: 120
description: 대화, 상점, 텔레포터, NPC Spawner, 화폐/HUD를 실제 저장 구조 기준으로 만드는 순서입니다.
product: core-fabric
category: 레퍼런스 / 운영
section: operations
status: 안정
version: 0.3.1
audience: 제작자
tags:
  - workflow
  - examples
---

## 마을 NPC를 만들 때의 순서

처음에는 **대화 한 장면 → 실제 상호작용 → 상점이나 이동 기능 추가 → 화면 꾸미기** 순서로 만듭니다. 기본 화면을 사용해도 대화와 거래를 시험할 수 있습니다.

## 안내 NPC: 인사말과 대답

1. [DNPC로 NPC를 배치](#dochi-npc-core/npc-core-setup)합니다.
2. Dialogue Editor에서 일반 노드에 인사말을 쓰고 Choices에 질문을 넣습니다.
3. 답변할 일반 노드를 만든 뒤 Goto로 연결합니다. start의 Routes는 첫 인사말을 가리키게 합니다.
4. Save As로 `village_guide`에 저장하고 NPC에 Apply Dialogue합니다.
5. 양손을 비우고 말을 걸어 질문 → 답변 → 닫기를 확인합니다.

![질문 선택지로 이동한 실제 NPC의 답변 장면.](assets/media/guides/drm-031-neo1211/dialogue-npc-reply.png "DRM 0.3.1 / NeoForge 1.21.1. 에디터에서 쓴 글과 플레이어가 선택한 뒤 보는 대사가 연결되는지 먼저 확인합니다.")

[대화 실습](#core-fabric/dialogue-system)에서 각 화면을 따라갈 수 있습니다. 한 번만 주는 선물은 [조건과 액션](#core-fabric/conditions-actions)의 수령 태그를 연결합니다.

## 상점 NPC: 빵 한 묶음 팔기

NPC Shop의 기본 상품에서 Bread를 고릅니다. Product에서 수량 `3`, 가격 `4`를 확인하고 Shop settings의 결제를 에메랄드로 둡니다. Save As로 저장한 뒤 NPC에 Apply NPC Shop합니다.

실제 상점에서 Bread만 체크하고 **Buy Selected**를 누릅니다. 이 예제는 사과 같은 다른 보상을 섞기 전에 **빵 3개 지급, 에메랄드 4개 차감, 재고 한 묶음 감소**부터 확인합니다.

![Bread 구매 뒤 에메랄드와 재고가 바뀐 실제 상점.](assets/media/guides/drm-031-neo1211/shop-bread-purchased.png "DRM 0.3.1 / NeoForge 1.21.1. 서버에서 빵 0→3, 에메랄드 10→6, Bread 재고 12→11을 확인했습니다. 아래 요약은 현재 선택한 상품을 따릅니다.")

[상점 실습](#core-fabric/shop-system)을 따른 뒤, 마을 주화가 필요할 때 [Currency Editor](#core-fabric/currency-editor)를 연결합니다. 대화에서 상점을 열려면 저장한 상점에 **Go Shop**을 연결합니다.

## 이동 안내 NPC: 목적지 저장 후 Travel

Teleporter Editor에서 목적지 이름과 같은 차원의 좌표를 정해 Save As합니다. NPC에 Apply Teleporter한 뒤 빈손으로 열고 목적지를 골라 **Travel**을 누릅니다.

![Travel로 저장한 목적지에 도착한 게임 화면.](assets/media/guides/drm-031-neo1211/teleporter-arrived.png "DRM 0.3.1 / NeoForge 1.21.1. 이 실습은 20.5 / -60 / 0.5 도착을 서버 좌표로 확인했습니다. 앞의 표식 건축물은 위치 확인용으로 미리 놓았습니다.")

[텔레포터 안내](#core-fabric/teleporter)에서 목적지 조건과 잠금 표시를 확인합니다. 대화 선택지로 열려면 Go Teleporter에 저장한 세트를 연결합니다.

## 완성한 뒤 확장하기

| 더 만들 것 | 이어갈 안내 |
| --- | --- |
| 대화·상점의 모양 | [GUI Maker](#core-fabric/gui-system) |
| 화면에 체력·돈 표시 | [HUD Maker](#core-fabric/hud-maker) |
| NPC를 저장해 여러 장소에 등장시키기 | [DNPC 템플릿과 Spawn Control](#dochi-spawn-control/spawn-control-npc-templates) |
| 구형 Core NPC Spawner | [해당 스포너 안내](#core-fabric/npc-spawner). CustomNPCs 기반 경로는 구형 지원 대상에만 사용 |
| 다른 서버로 작업 이동 | [저장 폴더](#core-fabric/paths)와 [반영 순서](#core-fabric/data-flow) |

새 파일로 Save As했다면 NPC도 새 파일을 선택해야 합니다. 그림·화폐·상점처럼 연결된 자료를 함께 옮기고, 월드의 NPC 배치와 진행 데이터도 별도로 보관합니다.

---
title: 추천 작업 흐름
slug: workflows
order: 120
description: 대화 NPC, 상점 NPC, 조건부 보상 제작 순서입니다.
tags:
  - workflow
  - examples
---

## 대화 NPC

1. GUI Maker에서 대화 GUI를 만들고 `dc_data/dc_gui`에 저장합니다.
2. Dialogue Editor에서 시작 노드와 선택지를 만듭니다.
3. 선택지마다 도착 노드를 연결합니다.
4. 필요한 조건과 액션을 추가합니다.
5. Export 후 테스트 NPC에서 호출합니다.

## 상점 NPC

1. GUI Maker에서 Shop GUI 타입 화면을 만듭니다.
2. NPC Shop에서 Shop ID와 화폐를 정합니다.
3. 카테고리와 상품을 추가합니다.
4. GUI JSON을 연결합니다.
5. 대화 선택지나 NPC 스크립트에서 상점을 엽니다.

## 조건부 보상

1. 보상을 줄 상황을 먼저 정합니다.
2. StoredData나 태그 조건을 만듭니다.
3. 보상 액션을 추가합니다.
4. 중복 수령 방지용 상태 값을 저장합니다.
5. 실패 케이스와 성공 케이스를 따로 테스트합니다.

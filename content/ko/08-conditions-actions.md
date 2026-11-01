---
title: 조건과 액션
slug: conditions-actions
order: 70
description: 선택지를 보여 줄 사람을 정하고, 누르면 아이템 지급이나 대사 이동이 일어나게 만듭니다.
product: core
category: 다이얼로그 에디터
section: dialogue-editor
status: 안내
version: 0.3.1
audience: 대화 제작자
tags:
  - condition
  - action
---

## 보여 줄 조건과 누르면 할 일

일반 대화 노드의 **Choices**에서 선택지 하나를 고릅니다. **Label**은 버튼 글자, **Condition list**는 버튼이 보일 조건, **Choice actions**는 눌렀을 때 실행할 동작입니다.

‘선물을 아직 안 받은 사람’은 조건이고, ‘사과를 주고 받은 것으로 기록하기’는 액션입니다. 조건만 만들면 사과가 지급되지 않고, 지급 액션만 만들면 다시 받을 수 있습니다.

## Forge에서 보상 예제 불러오기

검증한 **DRM 0.3.1 / Forge 1.20.1**에서는 Type 메뉴에서 Item을 골라도 Goto로 남는 현상이 있었습니다. 이 경우 [1회 보상 예제](#core/dialogue-rewards)를 내려받아 **Load**로 엽니다. 기존 Item·Tag 액션의 값은 불러올 수 있으며, 실제 NPC 적용·사과 지급·재방문 시 숨김까지 확인했습니다.

![Forge에서 불러온 Item과 Tag 보상 액션.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-actions.png "DRM 0.3.1 / Forge 1.20.1. Receive three apples를 고른 상태입니다. Choice actions의 첫 Item 행은 사과 3개 지급, 다음 Tag 행은 수령 기록입니다. 오른쪽을 아래로 스크롤하면 Count가 보입니다.")

예제의 **Item: give**, **ID: minecraft:apple**, **Count: 3**을 확인합니다. 다른 선물로 바꾸려면 기존 Item 행의 아이템과 수량을 수정하고 **Save As**로 자신의 세트를 만듭니다. 원본 예제를 먼저 그대로 적용해 지급을 확인한 뒤 수정하면 어느 설정에서 달라졌는지 찾기 쉽습니다.

## 받은 사람에게 버튼 숨기기

같은 선택지의 **Condition list**를 엽니다. 예제는 **Type: tag / Op: not / Tag: welcome_received**입니다. 플레이어에게 이 태그가 없을 때만 선택지가 보입니다.

선택지의 두 번째 **Tag** 액션은 **add / welcome_received**로 수령 기록을 남깁니다. 액션과 조건에서 태그 이름이 다르면 다시 받을 수 있으므로 둘을 함께 수정합니다. **has**를 쓰면 이미 받은 사람에게 보이는 반대 조건이 됩니다.

조건이 없으면 누구나 통과합니다. 여러 조건의 **and**는 전부 만족, **or**는 하나 이상 만족입니다. ‘허가 태그도 있고 에메랄드도 세 개 이상’은 and, ‘두 허가 태그 중 하나만 있어도 됨’은 or로 만듭니다.

## 조건은 어디에 붙이나요?

| 위치 | 만들고 싶은 변화 |
| --- | --- |
| Choices → Condition list | 같은 대사에서 특정 버튼만 표시하거나 숨김 |
| start → Routes | 말을 걸었을 때 처음 열릴 장면을 조건별로 선택 |
| 일반 노드의 조건 | 해당 장면에 들어갈 수 있는 사람을 제한 |

인사말 전체가 달라져야 하면 start의 Routes에서 다른 일반 노드로 연결합니다. 선물 버튼만 없어져야 하면 그 선택지에 조건을 붙입니다. [대화 만들기](#core/dialogue-system)에서 start와 일반 노드를 먼저 확인하세요.

## 자주 쓰는 액션

| 원하는 일 | 액션 | 함께 정할 값 |
| --- | --- | --- |
| 다음 대사 보기 | Goto | 이동할 일반 노드 |
| 대화 종료 | Close | 추가 값 없음 |
| NPC 상점 열기 | Go Shop | NPC에 적용한 상점 또는 저장한 상점 |
| 아이템 지급·회수 | Item | give / take / set, 아이템과 수량 |
| 수령·허가 기록 | Tag | add와 태그 이름 |
| 기록 지우기 | Tag | remove와 같은 태그 이름 |
| 서버 명령 실행 | Command | 앞의 /를 뺀 명령 |
| 퀘스트 연결 | 현재 퀘스트 액션 | [퀘스트 안내](#core/quest-system)에서 해당 작업 선택 |

보상은 **Item → Tag → Goto**처럼 지급·기록을 먼저, 화면 이동을 마지막에 둡니다. Item·Tag만 있는 제공 예제는 지급 후 창이 닫힙니다. 다음 대사를 보이려면 마지막에 Goto와 목적지 노드를 둡니다. 액션 종류를 바꾼 뒤에는 표시가 실제로 바뀌었는지 확인하세요.

**Command**는 플레이어 기준으로 실행합니다. 플레이어 이름은 `{player}`, UUID는 `{uuid}`로 넣을 수 있습니다. 아이템 하나 지급처럼 기본 액션으로 가능한 작업은 그 액션부터 사용하세요.

## 다른 모드가 필요한 조건

FTB 관련 조건·액션은 FTB Quests가 있는 환경에서 사용합니다. **faction_score**는 CustomNPCs 팩션 점수이며 DNPC의 우호·적대 설정과 다릅니다. **CustomNPCs Stored Data**는 스크립트에서 저장한 값을 읽는 [고급 연동](#core/script-stored-data-conditions)입니다. 일반적인 1회 선물에는 위 Tag 예제가 맞습니다.

CustomNPCs 연동은 지원되는 구형 Minecraft 대상에 한정됩니다. Minecraft 26.3에서는 사용하지 않습니다. 파일을 직접 다룰 필요가 생겼을 때 [JSON 참고](#core/json-reference)를 확인하세요.

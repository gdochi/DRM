---
title: 조건과 액션
slug: conditions-actions
order: 70
description: 대화 노드, route, 선택지에서 사용하는 조건, 액션, 보상형 처리입니다.
product: core-fabric
category: 다이얼로그 에디터
section: dialogue-editor
status: 안정
version: 0.3.1
audience: 대화 제작자
tags:
  - condition
  - action
---

## 선택지를 보여 줄 사람과 눌렀을 때 할 일

**Condition list**는 선택지가 보일 조건, **Choice actions**는 눌렀을 때 실행할 동작입니다. 예를 들어 ‘선물을 아직 안 받은 사람’은 조건이고, ‘사과를 주고 받은 것으로 기록하기’는 액션입니다.

일반 대화 노드를 고르고 **Choices**를 연 뒤 왼쪽에서 수정할 선택지를 고릅니다. 오른쪽 **Label**은 플레이어에게 보이는 문구입니다. 그 아래 두 탭에서 조건과 동작을 따로 편집합니다.

## 아직 선물을 안 받은 사람에게만 보이기

1. 해당 선택지의 **Condition list → Add**를 누릅니다.
2. **Type: tag**를 고릅니다.
3. **Op: not**을 고르고 **Tag**에 `welcome_received`를 입력합니다.

![welcome_received 태그가 없는 사람에게만 보이는 선택지 조건.](assets/media/guides/drm-031-neo1211/dialogue-choice-condition-tag.png "DRM 0.3.1 / NeoForge 1.21.1. tag / not / welcome_received는 ‘이 태그가 없어야 통과’입니다. has를 고르면 반대로 이미 태그를 가진 사람에게 보입니다.")

이 조건만으로 ‘받음’ 표시가 생기지는 않습니다. 선물을 줄 때 **Tag 액션으로 같은 이름을 추가**해야 다음 방문에 선택지가 숨겨집니다. [1회 보상 만들기](#core/dialogue-rewards)에서 전체 순서를 따릅니다.

조건이 없으면 누구나 볼 수 있습니다. 조건이 여러 개일 때 **and**는 전부 만족, **or**는 하나 이상 만족입니다. 예를 들어 ‘허가 태그가 있고 에메랄드도 세 개 이상’은 and, ‘두 허가 태그 중 하나가 있음’은 or입니다.

## 선택지를 누르면 사과 세 개 주기

**Choice actions**에서 액션의 **Type**을 **Item**으로 바꾸고 **Item: give**, **ID: minecraft:apple**, **Count: 3**으로 정합니다. 새 액션은 **+ Action**으로 추가합니다. 이미 Goto가 있는 예제를 수정한다면 그 행을 Item으로 바꿀지, 남겨 두고 액션을 추가할지 먼저 정하세요.

![Item give와 minecraft:apple, Count 3을 설정한 선택지.](assets/media/guides/drm-031-neo1211/dialogue-item-reward-editor.png "DRM 0.3.1 / NeoForge 1.21.1. Label은 버튼 글자이고 Item 액션이 실제 지급을 담당합니다. 오른쪽 패널을 스크롤하면 아래 Count까지 볼 수 있습니다.")

이 설정을 **Save As → NPC Apply**한 뒤 선택지를 눌러 실제 인벤토리의 사과 세 개를 확인했습니다. 아이템 액션만 있는 이 예제는 지급 후 창이 닫힙니다. 보상 뒤 다음 대사를 보여 주려면 **마지막에 Goto를 추가하고 이동할 일반 노드**를 고릅니다.

## 자주 쓰는 동작 고르기

| 원하는 일 | 고를 액션 | 함께 정할 값 |
| --- | --- | --- |
| 다음 대사로 이동 | Goto | 이동할 일반 노드 |
| 대화 종료 | Close | 추가 값 없음 |
| NPC 상점 열기 | Go Shop | NPC에 붙은 상점 또는 저장한 상점 |
| 이동 목적지 목록 열기 | Go Teleporter | 저장한 텔레포터 세트 |
| 아이템 지급·회수 | Item | give / take / set, 아이템과 수량 |
| 받은 사람 표시 | Tag | add, 기억할 태그 이름 |
| 표시 지우기 | Tag | remove, 같은 태그 이름 |
| 명령 실행 | Command | 앞의 /를 뺀 서버 명령 |
| 퀘스트 연결 | 현재 퀘스트 액션 | [퀘스트 안내](#core-fabric/quest-system)의 현재 선택 항목 사용 |

여러 동작은 목록 순서대로 구성하고 **Goto·상점 열기·Close 같은 화면 전환은 마지막**에 둡니다. 예를 들어 ‘Item 지급 → Tag 추가 → Goto’로 보상과 다음 대사를 연결합니다.

## 어느 곳에 조건을 붙이나요?

| 위치 | 사용 목적 |
| --- | --- |
| 일반 노드의 조건 | 그 장면 자체에 들어갈 수 있는지 제한 |
| start의 Routes | 말을 걸었을 때 어떤 장면을 먼저 열지 선택 |
| Choices의 Condition list | 같은 장면에서 선택지별로 표시 여부 제한 |

선택지 하나만 숨기려면 그 선택지에 조건을 붙입니다. 인사말 전체를 바꾸려면 start의 Routes에 조건을 붙이고 다른 일반 노드로 연결합니다. [대화 만들기](#core-fabric/dialogue-system)의 start와 일반 노드 예제를 함께 보세요.

## 연동이 필요한 조건

아이템·태그·발전 과제는 해당 값으로 비교합니다. FTB 퀘스트 조건은 FTB Quests가 있는 환경에서 사용합니다. `faction_score`는 CustomNPCs의 팩션 점수이며 DNPC의 우호·적대 관계와 다릅니다.

**CustomNPCs Stored Data**는 스크립트로 저장한 값을 읽는 고급 연동입니다. 일반적인 1회 보상에는 위 Tag 예제를 쓰면 됩니다. CustomNPCs 관련 조건은 지원되는 구형 Minecraft 대상에 한정되며 26.3에서는 사용하지 않습니다.

파일을 직접 편집해야 할 때만 [JSON 참고](#core-fabric/json-reference)를 확인하세요.

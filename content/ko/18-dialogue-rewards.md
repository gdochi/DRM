---
title: 보상과 흐름 만들기
slug: dialogue-rewards
order: 71
description: 선택지 액션을 조합해 아이템 보상, 태그, 상점 이동, 노드 이동을 구성합니다.
product: core
category: 다이얼로그 에디터
section: dialogue-editor
status: 안정
version: 0.3.1
audience: 대화 제작자
tags:
  - dialogue
  - reward
---

## 사과 세 개를 한 번만 주는 선택지

먼저 [짧은 대화](#core/dialogue-system)를 만들고 일반 노드의 **Choices**를 엽니다. 이 예제는 처음 말을 건 플레이어에게 사과 세 개를 주고, 다시 말을 걸면 선물 버튼을 숨깁니다. 태그 `welcome_received`를 ‘받음’ 표시로 사용합니다.

아래 화면과 지급 결과는 **DRM 0.3.1 / NeoForge 1.21.1**에서 확인했습니다. 화면의 선택지 글자는 **Receive three apples**이며 원하는 한국어 문구로 바꿀 수 있습니다.

## Forge: 완성 예제를 불러와 시작하기

**[1회 보상 예제 내려받기](assets/media/dialogue/welcome_reward_once.zip)**

검증한 **DRM 0.3.1 / Forge 1.20.1**에서는 새 액션의 Type을 Item으로 골라도 Goto로 남았습니다. 아래 NeoForge의 새 액션 작성 절차 대신, 실제로 저장·적용·지급을 확인한 이 예제를 불러와 기존 값을 수정할 수 있습니다.

1. 압축을 풀어 `welcome_reward_once` 폴더 전체를 해당 게임 또는 서버의 `config/dochi_rpg_maker/dialogue_sets/`에 넣습니다. 결과 경로는 `dialogue_sets/welcome_reward_once/dialogue_set.json`이어야 합니다. 같은 이름의 작업이 있으면 먼저 보존합니다.
2. **Dialogue Editor → Load**에서 **welcome_reward_once → Load**를 누릅니다.
3. **dialogue_1 → Choices → Receive three apples → Choice actions**에서 기존 Item 행의 아이템·수량을 수정합니다. 먼저 예제 그대로 시험해도 됩니다.
4. **Save As**로 자신의 이름을 정하고 아래 ‘저장·NPC 적용·재방문 확인’을 따릅니다. 태그를 바꾸면 조건과 Tag 액션을 함께 바꿉니다.

![Forge의 Load Dialogue Set에서 welcome_reward_once를 선택한 화면.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-load.png "DRM 0.3.1 / Forge 1.20.1. 압축 안의 폴더 전체를 dialogue_sets에 넣은 뒤 목록에서 선택합니다. 목록에 없으면 경로가 한 겹 더 중첩되지 않았는지 확인합니다.")

![불러온 Forge 예제에서 Item 지급과 Tag 기록을 확인하는 화면.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-actions.png "DRM 0.3.1 / Forge 1.20.1. 기존 Item은 give / minecraft:apple / 3입니다. 실제 NPC 적용 후 서버 인벤토리의 사과 3개와 수령 태그를 확인했습니다.")

이 예제는 NeoForge 편집기의 실제 Save As 결과를 폴더째 압축한 것입니다. Forge에서도 불러오기부터 재방문까지 확인했습니다. 다음 단계의 새 액션 생성 화면은 NeoForge 기준입니다.

## 1. 아이템 지급 액션 만들기

1. 보상 선택지를 고르고 **Label**에 ‘사과 세 개 받기’를 입력합니다.
2. **Choice actions**를 열고 액션을 고릅니다. 예제의 **Goto**를 바꾸거나 **+ Action**으로 새 행을 추가합니다.
3. **Type: Item → Item: give**를 고릅니다.
4. **ID**에 `minecraft:apple`, **Count**에 `3`을 넣습니다. Count가 안 보이면 오른쪽 패널을 아래로 스크롤합니다.

## 2. 받았다는 표시 남기기

같은 선택지에서 **+ Action**을 한 번 더 누릅니다. 새 행을 **Type: Tag**, **Op: add**, **Tag: welcome_received**로 정합니다. 목록은 **Item → Tag** 순서가 됩니다.

![Item으로 사과 세 개를 주고 Tag로 welcome_received를 추가하는 두 액션.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-actions.png "DRM 0.3.1 / NeoForge 1.21.1. 첫 행이 실제 아이템 지급, 두 번째 행이 플레이어의 수령 기록입니다. 태그 이름은 다음 조건과 정확히 같아야 합니다.")

이 두 액션만 있는 예제는 지급 후 창이 닫힙니다. ‘선물을 잘 쓰세요’ 같은 다음 대사를 보여 주려면 일반 노드를 만들고 마지막에 **Goto → 그 노드**를 추가합니다. 다음 대사 이동보다 지급·기록을 먼저 둡니다.

## 3. 받은 사람에게 선택지 숨기기

같은 선택지의 **Condition list → Add**에서 **Type: tag**, **Op: not**, **Tag: welcome_received**로 설정합니다.

![수령 태그가 없는 사람에게만 통과하는 tag not 조건.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-condition.png "DRM 0.3.1 / NeoForge 1.21.1. 2 actions / 1 conditions인 선택지입니다. 조건은 지급하지 않고, 받은 사람이 버튼을 다시 보지 못하게 합니다.")

**has**는 태그가 있어야 통과하므로 이 예제에서는 **not**을 사용합니다. ‘아직 받지 않은 사람’에게만 버튼을 보여 주는 조건입니다.

## 4. 저장·NPC 적용·재방문 확인

1. **Save As**로 `welcome_reward_once`에 저장합니다.
2. DRM Core로 NPC를 우클릭하고 **Dialogue JSON**에서 해당 세트를 골라 **Apply Dialogue**를 누릅니다.
3. 양손을 비우고 가까이에서 NPC에게 말을 겁니다.
4. 보상 선택지를 누른 뒤 인벤토리의 사과 세 개를 확인합니다.
5. 다시 말을 걸어 보상 선택지가 사라졌는지 확인합니다.

![보상을 받은 뒤 다시 연 대화에서 Goodbye만 남은 모습.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-hidden.png "DRM 0.3.1 / NeoForge 1.21.1. 실제 서버에서 사과 3개와 welcome_received 태그를 확인한 뒤 다시 상호작용한 결과입니다. 보상 선택지가 숨겨지고 Goodbye만 남았습니다.")

태그는 플레이어에게 남습니다. 여러 NPC가 같은 태그를 쓰면 한 NPC에게 받은 뒤 다른 NPC의 같은 선물도 숨겨집니다. NPC마다 따로 지급하려면 `gate_guard_gift`, `innkeeper_gift`처럼 태그를 나누고, 각 액션과 조건의 이름을 맞춥니다.

![Forge에서도 보상을 받은 뒤 Goodbye만 남은 대화.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-hidden.png "DRM 0.3.1 / Forge 1.20.1. 제공 예제를 Load하고 NPC에 적용한 뒤 실제 보상 선택·지급·태그 기록을 거쳐 다시 말을 건 결과입니다.")

## 다시 시험하려면

관리자 권한으로 자신의 수령 태그만 지우고 다시 말을 겁니다.

```text
/tag @s remove welcome_received
```

이미 받은 사과까지 회수하는 명령은 아닙니다. 재시험할 때 인벤토리 수량도 따로 확인하세요.

## 상점이나 퀘스트로 이어가기

상품 가격과 재고는 [NPC Shop](#core/shop-system)에서 만든 뒤 **Go Shop**으로 연결합니다. 퀘스트 수락·목표 처리는 [퀘스트 안내](#core/quest-system)의 현재 액션을 사용합니다. ‘언제 보여 줄지’가 헷갈리면 [조건과 액션](#core/conditions-actions)에서 노드·Routes·선택지의 차이를 확인하세요.

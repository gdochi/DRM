---
title: NPC 대화 만들기
slug: dialogue-system
order: 60
description: 인사말·선택지·다음 대사를 만들고 NPC에게 적용합니다.
product: core-fabric
category: 다이얼로그 에디터
section: dialogue-editor
status: 안정
version: 0.3.1
audience: 대화 제작자
tags:
  - dialogue
  - npc
---

## 인사말과 ‘다음’ 선택지 만들기

마을 안내 NPC를 예로 만듭니다. 말을 걸면 인사말이 나오고, ‘마을에 대해 알려주세요’를 누르면 답변으로 넘어가며, ‘안녕히 계세요’를 누르면 닫히는 대화입니다.

아래는 **DRM 0.3.1 / NeoForge 1.21.1의 영문 화면**입니다. 편집 화면에는 인사말과 답변을 준비한 예제가 열려 있습니다.

### 1. 대화 편집기 열기

코어를 들고 허공을 우클릭합니다. 가운데 **Dialogue Editor**를 고른 다음 오른쪽 **Use Default**를 누릅니다. 기본 예제의 다른 노드가 보여도 우선 인사말로 쓸 **dialogue_1**부터 선택하세요.

![DRM의 에디터 선택 화면. 가운데 Dialogue Editor가 선택되어 있고 오른쪽에 Load, Use Default, Create New가 있습니다.](assets/media/guides/drm-031-neo1211/editor-selector.png "가운데에서 편집할 도구를 고르고 오른쪽에서 시작 방법을 고릅니다. 처음 따라 할 때는 Use Default로 예제를 엽니다.")

### 2. NPC가 말할 문장 입력하기

왼쪽 **dialogue_1 / General**을 누르고 위쪽 **Text** 탭을 엽니다. **Dialogue Text** 칸에 ‘마을에 오신 것을 환영합니다. 무엇이 궁금하신가요?’처럼 인사말을 입력합니다.

![일반 노드 dialogue_1의 Text 탭. 오른쪽 위 Dialogue Text 칸에 마을 안내 인사말이 입력되어 있습니다.](assets/media/guides/drm-031-neo1211/dialogue-text.png "왼쪽에서 고른 노드의 대사를 Text에서 바꿉니다. start를 고른 채 인사말을 쓰지 않도록 선택한 노드 이름을 확인하세요.")

답변 장면은 **+ General**로 추가합니다. **Info → Node name**에 `dialogue_reply_1`을 입력하고 **Rename**을 누른 뒤, **Text**에 ‘광장 옆에 여관이 있습니다’처럼 답변을 씁니다.

### 3. 플레이어 선택지와 답변 연결하기

다시 **dialogue_1**을 골라 **Choices**를 엽니다. 필요한 선택지를 **+ Choice**로 만들고, 왼쪽 선택지 행을 누른 뒤 오른쪽 **Label**에 플레이어가 누를 문구를 씁니다.

![dialogue_1의 Choices 탭. 왼쪽에 두 선택지, 오른쪽에 Label 입력란과 Choice actions 탭이 있습니다.](assets/media/guides/drm-031-neo1211/dialogue-choices.png "Label은 NPC 대사가 아니라 플레이어가 누를 버튼 문구입니다. 선택한 행의 실행 결과는 아래 Choice actions에서 정합니다.")

‘마을에 대해 알려주세요’ 선택지의 **Choice actions**에서 다른 노드로 이동하는 **Goto** 액션을 넣고 목적지를 **dialogue_reply_1**로 고릅니다. ‘안녕히 계세요’에는 **Close**를 넣습니다. 답변 노드에도 닫기 선택지를 하나 준비합니다.

![Choice actions를 연 화면. Type이 Goto이고 목적지가 dialogue_reply_1인 액션이 선택되어 있습니다.](assets/media/guides/drm-031-neo1211/dialogue-choice-actions.png "+ Action으로 실행할 일을 추가하고 Type과 목적지를 정합니다. 이 설정으로 첫 선택지가 답변 노드에 연결됩니다.")

기본 예제의 선택지를 재사용할 때는 기존 액션도 확인하세요. 문구만 바꾸면 예제에 붙어 있던 상점 열기나 이동 동작이 남을 수 있습니다.

### 4. 처음 열릴 장면 정하기

왼쪽 **start**를 고르고 **Routes** 탭을 엽니다. 인사말로 들어갈 행의 **Action**을 **Goto**, **Goto** 목적지를 **dialogue_1**로 정합니다. 처음에는 조건 없는 행 하나로 시작하면 됩니다.

![start 노드의 Routes 탭. 선택한 행이 Goto 동작으로 dialogue_1을 가리킵니다.](assets/media/guides/drm-031-neo1211/dialogue-start-routes.png "start는 첫 대사를 고르는 입구입니다. 이 예제에서는 start → dialogue_1 순서로 들어갑니다.")

### 5. 저장하고 NPC에게 붙이기

위쪽 **Save As**를 누르고 **Save As ID**를 `village_guide`처럼 새 이름으로 바꾼 뒤 저장합니다. 기본 예제 이름인 `default_set`을 그대로 사용하지 마세요.

![Save Dialogue Set As 창. Save As ID 입력란과 저장될 폴더, Save As 버튼이 있습니다.](assets/media/guides/drm-031-neo1211/dialogue-save-as.png "입력란의 default_set을 내 대화 이름으로 바꿉니다. 저장 후 편집 화면 위쪽 경로와 왼쪽 세트 이름도 새 이름으로 바뀝니다.")

NPC가 없다면 [DNPC 시작하기](#dochi-npc-core/npc-core-setup)에서 먼저 만듭니다. 코어로 NPC를 우클릭한 뒤 **NPC Apply**에서 다음 순서로 적용합니다.

1. 왼쪽 **Dialogue JSON**을 고릅니다.
2. 가운데 목록에서 저장한 **village_guide**를 누릅니다. 목록에 없으면 **Refresh**로 갱신합니다.
3. 아래 **Apply Dialogue**를 누릅니다.
4. 오른쪽 **APPLIED JSON → Dialogue**에 **village_guide**가 표시되는지 확인합니다.

![NPC Apply에서 village_guide를 적용한 결과. 왼쪽 Dialogue JSON, 가운데 저장 목록, 오른쪽 적용된 이름과 아래 Apply Dialogue가 보입니다.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "가운데 파일을 고르는 것만으로 적용되지는 않습니다. Apply Dialogue를 누른 뒤 오른쪽의 적용된 이름까지 확인합니다.")

적용한 뒤 양손을 비우고 NPC를 우클릭해 인사말·답변 이동·닫기를 차례로 확인하세요.

![Oakridge guide라는 DNPC에 말을 걸어 열린 플레이어 대화창. 인사말과 두 선택지가 표시됩니다.](assets/media/guides/drm-031-neo1211/dialogue-npc-player.png "플레이어가 보는 결과입니다. 위의 Text에 쓴 내용이 대사로, Label에 쓴 내용이 아래 선택지로 표시됩니다.")

첫 선택지를 누르면 아래처럼 답변 노드의 대사로 바뀝니다. 첫 화면이 열린 것에 그치지 않고 선택지 연결도 여기서 확인합니다.

![마을을 알려 달라는 선택지를 누른 뒤 답변 노드가 열린 플레이어 화면. 여관 위치 안내와 닫기 선택지가 표시됩니다.](assets/media/guides/drm-031-neo1211/dialogue-npc-reply.png "Goto가 가리킨 dialogue_reply_1의 대사가 표시됩니다. 답변 뒤 돌아갈 곳이나 닫기 선택지도 준비합니다.")

## 노드가 무엇인가요?

**일반 노드 하나가 대화 한 장면**입니다. NPC 대사와 플레이어 선택지가 들어갑니다. 선택지를 다른 노드에 연결하면 다음 장면으로 넘어갑니다.

**start**는 첫 장면을 고르는 입구입니다. 여기에 인사말을 쓰는 대신 어떤 일반 노드를 열지 정합니다. 대화 세트마다 하나만 사용합니다.

## 대답에 따라 다른 일을 시키기

| 만들고 싶은 선택지 | 붙일 액션 |
| --- | --- |
| 다음 이야기를 듣기 | 다른 노드로 이동 |
| 대화를 끝내기 | 닫기 |
| 물건을 사러 가기 | 상점 열기 `go_shop` |
| 보상을 받기 | 아이템·화폐 지급 |
| 임무 진행 상태를 기억하기 | 태그 추가·제거 |

조건을 붙이면 특정 플레이어에게만 선택지를 보여 줄 수 있습니다. 예를 들어 퀘스트를 끝낸 사람에게만 보상 선택지를 보이게 합니다. [조건과 액션](#core-fabric/conditions-actions)에서 설정합니다.

## 대화를 늘리거나 재사용하기

노드·선택지 행은 드래그해 순서를 바꿉니다. 여러 노드는 Shift+클릭이나 드래그로 선택하고 **Copy / Paste**로 복사합니다. 대화 세트를 통째로 나누려면 **Duplicate**를 사용합니다.

상점 선택지를 만들 때는 [상점 파일](#core-fabric/shop-system)을 먼저 준비해 선택하세요.

## 창 모양 바꾸기

대사와 선택지는 이 에디터에서, 창의 모양은 [GUI Maker](#core-fabric/gui-system)에서 만듭니다. 처음에는 기본 창으로 대화를 완성하고, 나중에 원하는 GUI를 연결해도 됩니다.

저장한 대화는 `config/dochi_rpg_maker/dialogue_sets/<세트 이름>/`에 있습니다. 다른 서버로 옮길 때는 세트 폴더 전체를 복사합니다.

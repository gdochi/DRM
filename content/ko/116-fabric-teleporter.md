---
title: 텔레포터
slug: teleporter
order: 82
description: 목적지 좌표를 정해 NPC에 붙이고 실제 이동까지 확인합니다.
product: core-fabric
category: 핵심 시스템
section: teleporter
status: 안정
version: 0.3.1
audience: 제작자 / 운영자
tags:
  - teleporter
  - npc
  - gui
---

## 마을로 돌아가는 목적지 만들기

플레이어가 NPC에게 말을 걸어 목적지를 고르고 이동하게 만듭니다. 먼저 목적지 한 곳을 완성한 뒤, 이용 조건과 이동 연출을 붙입니다. 아래는 **DRM 0.3.1 / NeoForge 1.21.1**의 영문 화면입니다.

1. 이동할 장소에 서서 **F3**의 좌표를 적어 둡니다. 도착할 자리의 바닥과 머리 위 공간도 확인합니다.
2. 코어로 허공을 우클릭하고 **Teleporter Editor → Create New**를 엽니다.
3. **Category Settings**에서 목록을 묶을 이름을 정합니다. 예제의 **Towns**를 ‘마을’로 바꾸거나 **Add**로 새 분류를 만듭니다. **Display name**은 텔레포터 목록 전체의 이름입니다.

![Category Settings에서 텔레포터 목록의 표시 이름과 Towns 분류를 정하는 화면.](assets/media/guides/drm-031-neo1211/teleporter-editor.png "가운데는 전체 목록과 분류 목록, 오른쪽은 선택한 분류의 이름·아이콘입니다. 목적지의 좌표는 다음 Destination Settings에서 정합니다.")

### 목적지 이름과 도착 좌표

**Destination Settings**로 가서 **Add**로 목적지를 추가하거나 예제의 **Spawn**을 고릅니다. 오른쪽 **Info**에서 아래를 정합니다.

| 화면 항목 | 넣을 내용 |
| --- | --- |
| **Name / Description** | 플레이어가 알아볼 장소 이름과 설명 |
| **Enabled** | 이 목적지를 사용할지 여부 |
| **Category** | 앞에서 만든 분류 |
| **Position → X / Y / Z** | 실제 도착할 좌표. Y는 발이 놓일 높이 |
| **Yaw / Pitch** | 도착 뒤 바라볼 방향과 위아래 각도 |

![Spawn 목적지의 이름·설명·분류·좌표와 회전값이 표시된 Info 화면.](assets/media/guides/drm-031-neo1211/teleporter-destinations.png "예제 좌표 0.5 / 64 / 0.5를 내 월드의 안전한 위치로 바꿉니다. 이름만 바꾸면 도착 좌표는 바뀌지 않습니다.")

목적지는 **현재 차원 안에서** 이동합니다. 좌표를 네더의 숫자로 바꾸는 것만으로 네더로 넘어가지는 않습니다.

### 누구에게 열어 줄지 정하기

처음 시험할 때는 조건을 비워 둡니다. 이동이 확인되면 다음 두 곳을 나눠 설정합니다.

- **Interaction Conditions:** 텔레포터 목록 자체를 열 수 있는 사람.
- **Destination Settings → 목적지 → Conditions:** 그 목적지를 이용할 수 있는 사람.

예를 들어 목록은 누구나 열되 ‘유적’ 목적지만 퀘스트 완료자에게 허용할 수 있습니다. **Category Settings → Locked destination presentation**은 잠긴 목적지를 흐리게 보일지, 숨길지 등을 정합니다. 잠긴 표시를 바꾸는 것과 이용 조건을 바꾸는 것은 별도입니다.

![Interaction Conditions의 Enabled 스위치, Mode AND와 Add 버튼.](assets/media/guides/drm-031-neo1211/teleporter-conditions.png "조건을 넣을 때는 Add로 내용을 정하고 Enabled도 확인합니다. 화면은 조건이 없는 초기 상태입니다.")

### 이동할 때의 화면과 소리

**Travel Presentation**에서 **Fade out / Fade in**으로 어두워지는 시간과 다시 밝아지는 시간을 정합니다. 단위는 틱이며 정상 속도에서 20틱이 1초입니다. 아래의 10은 각각 약 0.5초입니다. **Departure sound / Arrival sound**는 출발·도착 소리이고 돋보기로 고른 뒤 재생 버튼으로 미리 들을 수 있습니다.

![Travel Presentation의 페이드 시간과 출발·도착 사운드 설정.](assets/media/guides/drm-031-neo1211/teleporter-presentation.png "출발과 도착 소리는 따로 고릅니다. 이동 전에 실행할 명령 등이 필요하면 목적지의 Commands 탭에서 실행 시점까지 정합니다.")

## 저장하고 NPC에 연결하기

1. 위쪽 **Save As**에 `guide_travel`처럼 새 이름을 넣습니다. 확장자를 붙이지 않아도 `guide_travel.json`으로 저장됩니다.
2. 코어로 **DNPC 또는 CustomNPCs NPC**를 우클릭합니다.
3. **NPC Apply** 왼쪽의 **Teleporter JSON**을 고르고 가운데에서 내 파일을 선택합니다. 없으면 **Refresh**합니다.
4. **Apply Teleporter**를 누른 뒤 오른쪽 적용 목록을 확인합니다.
5. 양손을 비우고 NPC에게 말을 걸어 목적지를 고르고 이동합니다. 목록이 열리는지, 도착 좌표와 방향이 맞는지 각각 확인합니다.

![NPC에 적용한 Village gate 목적지가 열린 플레이어 텔레포터 화면.](assets/media/guides/drm-031-neo1211/teleporter-npc-player.png "가운데에서 목적지를 고른 뒤 오른쪽 아래 Travel을 누릅니다. 오른쪽 큰 그림 영역은 이 예제에서 비워 둔 상태입니다.")

![Travel을 누른 뒤 미리 세워 둔 나무문 앞에 도착한 실제 게임 화면.](assets/media/guides/drm-031-neo1211/teleporter-arrived.png "저장한 X 20.5 / Y -60 / Z 0.5로 실제 이동한 결과입니다. 도착 위치를 구별하려고 촬영 월드에 바닥과 나무기둥을 미리 놓았습니다. 내 월드에서는 실제 목적지 좌표를 사용합니다.")

연결만 지울 때는 같은 NPC에서 **Remove Teleporter**를 사용합니다. 다른 이름으로 저장한 파일로 교체했다면 다시 Apply합니다.

일반 대화의 선택지에서 열고 싶다면 [대화 만들기](#core-fabric/dialogue-system)의 **Choice actions**에 **go_teleporter**를 넣습니다. 현재 NPC에 붙인 목록은 **bound**, 별도 목록은 저장한 파일을 선택합니다.

## 목록의 모양과 파일 위치

목적지·조건은 Teleporter Editor에서, 목록의 위치·그림·버튼은 [GUI Maker](#core-fabric/gui-system)에서 바꿉니다. **Category Settings → GUI JSON / Open GUI Maker**가 화면 연결 위치입니다. 꾸민 화면에도 목적지 목록·이동 버튼·닫기 버튼을 남겨야 사용할 수 있습니다.

세트는 `config/dochi_rpg_maker/teleporters/`에 저장됩니다. `default_teleporter_set.json`과 `gui/default_teleporter_gui.json`은 시작용 기본 파일입니다. 내 작업은 **Save As**로 따로 보관합니다.

목적지가 안 보이면 Enabled·분류·검색어·조건을 확인합니다. 목록은 보이는데 이동이 거절되면 NPC와의 거리나 바뀐 조건을 확인하고 다시 말을 걸어 목록을 엽니다.

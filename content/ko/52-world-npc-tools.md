---
title: 팩션, 텔레포터, 팝업
slug: world-npc-tools
order: 120
description: 팩션 표시, 목적지 흐름, 재사용 플레이 팝업을 설정합니다.
product: core
category: 월드와 NPC 도구
section: world-tools
status: 안정
version: 0.3.1
audience: 월드 / NPC 제작자
tags:
  - faction
  - teleporter
  - popup
---

## 팩션 관계를 플레이어에게 보여 주기

**Faction Editor**는 CustomNPCs 팩션을 DRM 화면에 어떻게 보여 줄지 정합니다. 팩션 ID와 실제 플레이어 점수는 CustomNPCs 쪽 데이터입니다. DNPC의 관계 그룹은 [DNPC 편집기](#dochi-npc-core/npc-core-editor)에서 별도로 만듭니다.

![Faction Editor의 관계 상태 이름·색상·설명과 Sample points 미리보기.](assets/media/guides/drm-031-forge1201/registry-faction.png "DRM 0.3.1 / Forge 1.20.1. Statuses는 점수에 붙일 이름과 색상을 정합니다. 오른쪽 Sample points는 미리보기이며 실제 플레이어 평판을 바꾸는 입력란이 아닙니다.")

1. **Statuses**에서 Unfriendly·Neutral·Friendly의 표시 이름·색상·설명을 정합니다.
2. **Manage Factions**에서는 CustomNPCs가 설치되어 있고 팩션을 불러올 수 있는지 확인합니다.
3. **Presentation**에서 순서·분류·이름·아이콘·배너를, **Runtime Screen**에서 플레이어 화면을 고릅니다.
4. 저장하고 **J**로 플레이어 목록을 열어 관계와 점수를 확인합니다.

표시 설정은 `config/dochi_rpg_maker/factions/settings.json`입니다. 색이나 이름이 잘못됐으면 이 화면을, 실제 점수가 잘못됐으면 점수를 부여하는 조건·액션과 원본 팩션을 확인합니다.

## NPC에게 목적지 목록 붙이기

코어의 **Teleporter Editor**에서 목적지를 만들고 NPC에 적용합니다. 목적지는 **현재 차원 안에서** 이동합니다.

![Teleporter Editor의 Spawn 목적지와 도착 좌표.](assets/media/guides/drm-031-forge1201/teleporter-destinations.png "DRM 0.3.1 / Forge 1.20.1. Destination Settings → Info의 X/Y/Z가 도착 위치입니다. 예제 0.5 / 64 / 0.5를 내 월드의 안전한 좌표로 바꿉니다.")

1. **Category Settings**에서 목록 이름과 분류를 만듭니다.
2. **Destination Settings → Add**로 목적지를 넣고 이름·설명·X/Y/Z·Yaw/Pitch를 정합니다.
3. 필요하면 목적지의 **Conditions**로 이용자를 제한하고 **Commands**에서 도착 전후 할 일을 정합니다. Forge의 추가 **Effects** 설정도 목적지별로 확인합니다.
4. **Travel Presentation**에서 페이드 시간과 출발·도착 소리를 고릅니다.
5. **Save As**에 `town_network`처럼 새 이름을 써 저장합니다. 코어로 NPC를 열고 **Teleporter JSON → 내 파일 → Apply Teleporter**로 연결합니다.
6. 양손을 비우고 말을 걸어 목적지를 고르고 **Travel**로 이동합니다. 도착 위치와 바라보는 방향을 확인합니다.

세트는 `config/dochi_rpg_maker/teleporters/`에 저장됩니다. `Go Teleporter` 대화 액션의 **bound**는 현재 NPC에 적용된 세트를 엽니다. 기본 화면을 꾸미려면 GUI Maker에서 복사본을 만들고 세트의 **GUI JSON**에 연결합니다.

## 지역 이름이나 임무 알림 띄우기

**Popup Maker**에서 잠깐 나타날 글과 시간을 정합니다. 화면에 놓는 위치·그림·버튼은 [GUI Maker](#core/gui-system)의 Popup 화면에서 꾸밉니다.

![Popup Maker의 제목·본문·표시 시간과 채널·사운드 설정.](assets/media/guides/drm-031-forge1201/popup-maker.png "DRM 0.3.1 / Forge 1.20.1. 가운데 아래 패널은 미리보기입니다. 이 예제는 Fade in 10 / Hold 80 / Fade out 20틱이며, 정상 속도에서 총 5.5초입니다.")

1. **Title / Subtitle / Text**에 표시할 내용을 씁니다.
2. **Fade In / Hold / Fade Out**으로 등장·유지·퇴장 시간을 정합니다. 단위는 틱이며 20틱이 1초입니다.
3. 같은 **Channel**에서 알림이 겹칠 때 대체할지 등 충돌 방식을 정합니다. 우선순위가 필요한 알림은 **Priority**도 맞춥니다.
4. 필요하면 **Opening Sound**를 골라 재생 버튼으로 듣습니다.
5. **Save As**로 내 팝업을 저장하고 `/drm popup` 명령 또는 대화 액션으로 실제 표시를 시험합니다.

정의는 `popups/definitions/`, 정책은 `popups/policies/`에 저장됩니다. 기본 파일은 Save As로 복사합니다. 반복 공지가 쌓이면 채널의 충돌 방식과 정책의 동시 표시·대기 수를 함께 확인합니다.


## 저장한 팝업을 명령으로 띄운 예

**ID**를 `village_entry`, **Title**을 `Village Gate`로 정하고 **Save As → village_entry → Save As**로 저장합니다. 편집기를 닫고 관리 권한이 있는 플레이어가 다음을 실행합니다.

```mcfunction
/drm popup show @s village_entry
```

![Village Gate를 village_entry로 저장한 Popup Maker.](assets/media/guides/drm-031-forge1201/popup-village-save.png "DRM 0.3.1 / Forge 1.20.1. Saved: village_entry.json과 제목을 확인합니다. 가운데 아래 패널은 편집기 미리보기입니다.")

![저장한 팝업이 실제 게임에 표시된 결과.](assets/media/guides/drm-031-forge1201/popup-village-runtime.png "DRM 0.3.1 / Forge 1.20.1. 앞에서 저장한 파일을 명령으로 출력한 화면입니다. 지역 감지를 따로 연결하기 전에는 마을에 들어갔다는 이유만으로 자동 재생되지 않습니다.")

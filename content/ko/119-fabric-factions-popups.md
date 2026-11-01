---
title: 팩션과 팝업
slug: factions-popups
order: 120
description: CustomNPCs 팩션 표시와 재사용 가능한 화면 팝업을 만드는 방법입니다.
product: core-fabric
category: 월드와 NPC 도구
section: world-tools
status: 안정
version: 0.3.1
audience: 월드 / NPC 제작자
tags:
  - faction
  - popup
---

## 팩션 상태 이름과 색상 바꾸기

**Faction Editor**는 지원되는 CustomNPCs 팩션을 DRM 화면에 어떻게 보여 줄지 정합니다. 실제 팩션 ID와 플레이어 점수는 CustomNPCs 데이터입니다. DNPC의 관계 그룹은 [DNPC 편집기](#dochi-npc-core/npc-core-editor)에서 따로 설정합니다. 아래 화면은 **DRM 0.3.1 / NeoForge 1.21.1**입니다.

![Faction Editor의 Statuses와 Sample points 미리보기.](assets/media/guides/drm-031-neo1211/faction-editor.png "Statuses에서 Unfriendly·Neutral·Friendly를 고르고 이름·색상·관계 설명을 바꿉니다. Sample points 850은 표시 결과를 시험하는 숫자이며 실제 플레이어의 평판을 지급하는 입력란이 아닙니다.")

1. **Statuses**에서 바꿀 관계 상태를 고릅니다.
2. 오른쪽 **Display name / Color / Relationship description**을 정합니다.
3. **Sample points**를 바꿔 점수에 따른 표시를 확인합니다.
4. **Manage Factions**에서 원본 팩션을 불러올 수 있는지 확인합니다.
5. **Presentation**에서 순서·분류·아이콘 등을, **Runtime Screen**에서 플레이어 화면을 고릅니다.
6. 저장하고 기본 키 **J**로 플레이어 목록을 확인합니다.

표시 설정은 `config/dochi_rpg_maker/factions/settings.json`입니다. 점수가 잘못됐다면 이름·색상 설정을 바꾸기 전에 원본 팩션과 점수를 부여하는 동작을 확인하세요. 이 CustomNPCs 화면 설명을 [Minecraft 26.3 이상](#core-fabric/minecraft-26-3)에 적용하지 않습니다.

## 팝업을 저장하고 게임 화면에 띄우기

예제는 화면에 **Village Gate**라는 제목을 잠깐 띄웁니다. 실제 지역 진입 감지는 별도로 연결하며, 여기서는 저장한 팝업을 명령으로 출력합니다.

![Village Gate 제목을 입력하고 village_entry로 저장한 Popup Maker.](assets/media/guides/drm-031-neo1211/popup-village-save.png "왼쪽 ID와 아래 Saved: village_entry.json을 확인합니다. 가운데 아래는 제작 중 미리보기입니다. 이 예제의 시간은 Fade In 10 / Hold 80 / Fade Out 20틱으로 총 5.5초입니다.")

1. 코어의 **Popup Maker**를 열고 **ID**를 `village_entry`로 정합니다.
2. **Title**에 `Village Gate`, **Text**에 보여 줄 설명을 씁니다. 부제가 필요하면 **Subtitle**도 채웁니다.
3. **Fade In / Hold / Fade Out**으로 등장·유지·퇴장 시간을 정합니다. 정상 속도에서 20틱이 1초입니다.
4. **Channel**과 **Conflict**로 같은 종류의 알림이 겹칠 때 처리할 방식을 정합니다. 예제의 `replace`는 기존 알림을 바꿉니다.
5. 필요하면 **Opening Sound**를 고르고 재생 버튼으로 듣습니다.
6. **Save As → village_entry → Save As**로 기본 파일과 다른 이름에 저장합니다.
7. 편집기를 닫고 관리 권한이 있는 플레이어로 다음 명령을 실행합니다.

```mcfunction
/drm popup show @s village_entry
```

![저장한 Village Gate 팝업이 실제 게임 화면에 표시된 결과.](assets/media/guides/drm-031-neo1211/popup-village-runtime.png "앞에서 저장한 정의를 /drm popup show @s village_entry로 띄운 화면입니다. 명령 대상 @s에게만 보이며 NPC나 지역에 자동 연결된 상태는 아닙니다.")

제목·본문·시간은 **Popup Maker**, 화면 위치·배경·그림은 [GUI Maker](#core-fabric/gui-system)의 Popup GUI에서 바꿉니다. GUI를 복사했다면 팝업의 **GUI JSON**에 그 파일을 지정하세요.

| 가져갈 파일 | 위치 |
| --- | --- |
| 팝업 내용·시간·채널 | `config/dochi_rpg_maker/popups/definitions/village_entry.json` |
| 화면 배치 | `config/dochi_rpg_maker/gui/` 안에서 지정한 GUI |
| 표시 개수·시간 등 운영 제한 | `config/dochi_rpg_maker/popups/policies/` |

안 보이면 저장된 ID·Enabled·GUI 파일을 먼저 확인합니다. 알림이 밀리거나 서로 바뀌면 같은 Channel의 Conflict와 정책의 동시 표시·대기 제한을 함께 확인합니다.

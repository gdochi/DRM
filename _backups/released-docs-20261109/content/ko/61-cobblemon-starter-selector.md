---
title: 스타터 포켓몬 선택 NPC 만들기
slug: cobblemon-starter-selector
order: 551
description: 선택 카드와 지급할 포켓몬을 정하고 한 번만 받는 조건을 붙입니다.
product: drm-cobblemon-editor
category: 서비스 NPC
section: services
status: Draft
version: Fabric / NeoForge 0.2.9
audience: 스타터 선택 NPC를 만드는 제작자
tags:
  - starter-selector
  - pokemon-give
  - runtime-gui
---

## 세 마리 중 한 마리를 고르는 NPC 만들기

**Starter Selector Editor**에서 선택 후보를 만들고 NPC에 연결합니다. 플레이어는 카드에서 포켓몬을 고르고 확정합니다. **Minecraft 1.21.1의 Fabric·NeoForge**에서 DNPC 또는 CustomNPCs NPC를 사용합니다.

![이상해씨·파이리·꼬부기 세 후보가 있는 Starter Selector Editor. 가운데 카드 문구, 오른쪽 포켓몬 설정이 보입니다.](assets/media/guides/cobble-029-neo1211/cobble-starter.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1 영문 화면. 왼쪽에서 고른 후보의 카드 이름·설명은 가운데, 실제 지급할 포켓몬은 오른쪽에서 바꿉니다.")

1. DRM 에디터 목록에서 **Starter Selector Editor → Use Default**를 엽니다.
2. 왼쪽 후보를 고르고 가운데 **Card Name / Pokémon Description**을 씁니다. **Option ID**는 후보마다 겹치지 않게 정합니다.
3. 오른쪽 **Starter settings → Edit Pokémon**에서 종·레벨·폼·성격·특성·지닌 도구·기술을 정합니다. 카드 이름만 바꿔서는 지급할 종이 바뀌지 않습니다.
4. **Add / Delete**로 후보를 조절합니다. 최소 한 개, 최대 32개입니다.
5. **Save As**로 `custom/village_starters.json`을 저장합니다.
6. DRM 코어로 NPC를 열고 **Starter Selector**에 이 파일을 **Apply**합니다.
7. 양손을 비우고 NPC에게 말을 걸어 카드·상세 정보·확정까지 확인합니다.

일반 DRM 대화나 상점이 먼저 열리면 양손을 비운 **Shift+우클릭**으로 전용 역할에 접근합니다. 일반 대화의 선택지에서 열고 싶다면 **go_starter_selector** 액션을 넣습니다. 특정 파일을 고르거나 **bound**로 현재 NPC에 적용한 스타터를 사용합니다.

![Save As 후 내 파일 경로와 Saved 표시.](assets/media/guides/cobble-029-neo1211/cobble-starter-save.png "Save As로 위 예제 경로를 저장한 화면입니다. 파일이 생긴 것과 NPC에 역할을 연결한 것은 별도 단계입니다.")

![NPC와 상호작용해 열린 세 장의 스타터 카드와 Choose This Pokemon 버튼.](assets/media/guides/cobble-029-neo1211/cobble-starter-runtime.png "플레이어 화면: 카드를 먼저 고른 뒤 오른쪽 아래 Choose This Pokemon으로 확정합니다. 이 예제는 기본 세 후보 중 이상해씨를 선택했습니다.")

확정 뒤에는 화면이 닫히고 파티에 포켓몬이 들어옵니다. 아래 왼쪽 파티 목록에 **Bulbasaur / Lv.5**가 표시됩니다. 이 예제는 실제 서버 파티에도 이상해씨 한 마리가 들어온 것을 확인했습니다.

![스타터 확정 뒤 왼쪽 파티에 레벨 5 이상해씨가 추가된 게임 화면.](assets/media/guides/cobble-029-neo1211/cobble-starter-granted.png "Cobblemon Editor 0.2.9 / DNPC 0.1.3 / NeoForge 1.21.1. 지급 결과입니다. 한 번만 받기 제한은 아래 조건을 별도로 설정합니다.")

## 한 번만 받게 하기

기본 스타터 선택기는 모든 플레이어에게 영구 1회 제한을 자동으로 붙이지 않습니다. 다음 두 설정을 함께 만듭니다.

1. **Dialogue and GUI → Success Tag (optional)**에 `starter_chosen`을 쓰고, 아래 버튼을 **Add tag after grant**로 둡니다.
2. 후보의 **Card display conditions**에 플레이어가 **starter_chosen 태그를 가지고 있지 않음** 조건을 넣습니다. 조건의 **Enabled**도 켜고, 모든 후보에 같은 제한을 둡니다.
3. 앞에 안내 대화를 사용한다면, 그 대화의 선택 화면 열기 조건에도 같은 제한을 둡니다.
4. 처음 받는 플레이어로 선택한 뒤 다시 말을 걸어, 이미 받은 사람에게 카드가 다시 제공되지 않는지 확인합니다.

포켓몬 지급에 성공한 뒤에만 태그 등 성공 액션이 실행됩니다. 파티가 꽉 찼으면 PC 저장을 시도하고, 둘 다 지급할 수 없으면 성공 액션도 실행하지 않습니다.

![Dialogue and GUI의 Success Tag와 Add tag after grant.](assets/media/guides/cobble-029-neo1211/cobble-starter-dialogue.png "Success Tag에 지급 완료 태그를 쓰고 Add tag after grant로 둡니다. Dialogue GUI 경로가 비어 있으면 안내 대화를 건너뛰고 카드 화면으로 들어갑니다.")

## 카드·대화·소리 바꾸기

| 위치 | 바꿀 내용 |
| --- | --- |
| **Starter settings → Edit Pokémon** | 실제 받을 포켓몬 |
| **Card display conditions** | 후보가 보이고 선택될 조건 |
| **Card Selection Audio** | 포켓몬 울음소리 또는 사용자 지정 사운드 |
| **Dialogue and GUI** | 선택 전 안내 대화, 화면 경로와 지급 성공 후 액션 |
| **DRM GUI Maker** | 플레이어 카드 목록·미리보기·버튼의 배치 |

**Dialogue GUI (optional)** 경로를 비우면 바로 카드 화면으로 들어갑니다. 대화를 쓰면 고정된 **Open Selector / Close** 흐름을 거칩니다. 자유로운 분기는 [DRM 대화](#core-fabric/dialogue-system)에서 만들고 스타터 액션으로 연결합니다.

기본 플레이 화면은 한 페이지에 카드 세 개를 보여 줍니다. 선택 세션은 60초이므로 오래 열어 둔 뒤 확정이 안 되면 다시 NPC에게 말을 겁니다. 오디오는 Volume 0~4, Pitch 0.05~4 범위입니다.

같은 파일에 **Save**한 변경은 다음 이용부터 반영됩니다. 파일을 바꿨다면 다시 Apply합니다. 역할 파일은 `config/dochi_rpg_maker/cobblemon/starter_selectors/`, 기본 화면은 `gui/starter_selector_gui.json`입니다. 화면을 꾸밀 때는 기본 파일을 **Save As**로 복사하고 카드·확정 버튼을 남깁니다.

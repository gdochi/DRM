---
title: 폴더와 경로
slug: paths
order: 40
description: DRM Core 데이터가 저장되는 실제 루트와 서버 JSON 종류별 경로 규칙입니다.
product: core-fabric
category: 시작하기
section: getting-started
status: 안정
version: 0.3.1
audience: 제작자 / 운영자
tags:
  - paths
  - files
---

## 저장한 대화 파일은 어디에 있나요?

싱글플레이는 런처에서 **사용 중인 인스턴스의 게임 폴더**를 엽니다. 멀티플레이는 **접속한 서버 폴더**가 기준입니다. 그 안의 `config/dochi_rpg_maker/`에 제작 파일이 모입니다.

예를 들어 Dialogue Editor에서 **Save As → village_guide**로 저장했다면 `config/dochi_rpg_maker/dialogue_sets/village_guide/`입니다. 대화 한 세트는 폴더 하나이므로 다른 서버로 옮길 때 **폴더 전체**를 복사합니다.

![Dialogue Editor에 표시되는 대화 세트 폴더 경로.](assets/media/guides/drm-031-neo1211/dialogue-save-result.png "DRM 0.3.1 / NeoForge 1.21.1. Save As 뒤 화면 위의 SET FOLDER / TOOLS에서 현재 대화 폴더를 확인합니다. 파일 이름만 비슷한 다른 인스턴스를 수정하지 않도록 이 경로를 기준으로 찾으세요.")

## 작업별로 가져갈 파일

아래 경로는 모두 `config/dochi_rpg_maker/` 안입니다. 해당 편집기에서 실제로 저장한 이름을 찾습니다.

| 만든 것 | 찾을 위치 | 함께 가져갈 것 |
| --- | --- | --- |
| NPC 대화 | `dialogue_sets/village_guide/` | 세트 폴더 전체, 연결한 GUI·상점·퀘스트 |
| NPC 상점 | `npc_shops/village_shop.json` | 사용하는 화폐·GUI·아이템 모드 |
| 대화·상점 화면 | `gui/` | 화면이 참조하는 그림·텍스처 |
| 화폐 종류 | `currency/definitions/town_coin.json` | 해당 화폐를 쓰는 상점·HUD |
| HUD | `hud/sets/guide_hud/` | `hud_set.json`과 `components/` 전체. 활성 선택은 `hud/active_set.json` |
| 퀘스트 | `quests/<팩 이름>/` | `pack.json`과 `quests/`의 개별 퀘스트 |
| 스탯 | `stats/sets/` | 활성 선택 `stats/active_set.json` |
| 데이터베이스 아이템 | `items/definitions/` | 제작 규칙 `items/editor_settings.json` |
| 이동 목적지 | `teleporters/` | 목적지 세트와 연결한 GUI |
| 팝업 | `popups/definitions/` | 필요하면 `popups/policies/`의 표시 정책 |
| 월드 안내 메시지 | `remnant_msg/messages/` | `remnant_msg/policies/`와 연결한 GUI |
| 제작자 PNG | `assets/textures/` | 애니메이션 그림이면 같은 이름의 `.png.mcmeta` |
| 팩션 표시 | `factions/` | 표시 설정과 필요한 프리셋 |
| 기본 연결·공용 설정 | `settings/` | 바꾼 설정 파일만 확인해서 이동 |

DNPC 자체의 NPC 템플릿은 **다른 폴더**인 `config/dochi_npc_core/templates/`에 있습니다. [NPC 저장](#dochi-npc-core/npc-core-templates)을 참고하세요. BattleWorks·Spawn Control 같은 애드온의 파일은 각 모드의 저장 안내도 함께 확인합니다.

## 파일은 옮겼는데 NPC가 그대로라면

제작 파일과 월드에 배치한 NPC는 따로 보관됩니다. 새 서버에서 파일을 확인한 뒤 **DRM Core로 NPC 우클릭 → 적용할 파일 선택 → Apply**를 진행합니다. 파일 하나만 옮겼다면 연결한 그림이나 상점도 새 서버에 있는지 확인하세요.

[저장과 NPC 적용](#core-fabric/core-concepts)에서 버튼별 차이를 볼 수 있습니다. 서버 전체를 이전하거나 복구할 때는 **config와 월드 저장을 함께** 보관합니다. NPC 배치·스포너·진행 데이터까지 제작 파일만으로 복구되지는 않습니다.

## 목록에 저장 파일이 없을 때

1. 서버에서 쓰는 게임 폴더인지 확인합니다. 클라이언트 PC에만 복사한 파일은 서버 목록에 나오지 않습니다.
2. 대화 세트·상점·GUI 등 파일 종류에 맞는 폴더에 넣었는지 확인합니다.
3. 편집기의 **Load / Refresh**로 목록을 다시 읽고 검색어를 비웁니다.
4. 기본 예제를 바꾸는 중이라면 **Save As**로 내 이름을 사용합니다.

편집기에서 `village_shop.json`처럼 이름을 입력하는 칸에는 안내용 전체 경로를 붙여 넣지 않습니다. 해당 편집기가 이미 자신의 저장 폴더를 선택하고 있습니다. 외부에서 파일을 수정했다면 [다시 반영하기](#core-fabric/data-flow)도 확인하세요.

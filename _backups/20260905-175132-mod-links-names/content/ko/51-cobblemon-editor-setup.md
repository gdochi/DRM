---
title: 설치와 첫 적용
slug: cobblemon-editor-setup
order: 510
description: Dochi Cobblemon Editor 0.1.4 설치, 폴더, 첫 NPC 적용 방법입니다.
product: drm-cobblemon-editor
category: 설치
section: setup
status: Draft
version: 0.1.4
audience: 서버 운영자와 처음 설치하는 제작자
tags:
  - setup
  - fabric
  - npc
---

## 설치 체크리스트

1. Minecraft 1.21.1과 Java 21을 사용합니다.
2. Fabric Loader와 Fabric API를 설치합니다.
3. DRM Core 0.1.7 이상, Cobblemon 1.7.3, CustomNPCs Fabric 1.0.0을 설치합니다.
4. `dochi_cobblemon_editor-0.1.4-fabric-1.21.1.jar`를 `mods/`에 넣습니다.
5. 서버와 모든 클라이언트의 필수 모드 버전을 맞춥니다.

현재 DRM Core와 함께 사용할 때는 Fabric Loader 0.18.0 이상과 Fabric API 0.116.11+1.21.1 이상을 권장합니다. Cobblemon 1.8.0 이상은 이 버전의 지원 범위가 아닙니다.

선택 기능을 쓰는 경우에만 다음 모드를 추가합니다.

| 선택 모드 | 사용하는 기능 |
| --- | --- |
| CobbleDollars | PokéMart 결제 |
| Radical Cobblemon Trainers API 0.15.1-beta+ | RCT AI, RCT 데이터팩 포터 |
| FTB Quests | 퀘스트·태스크 조건과 완료 액션 |
| Mega Showdown | Mega, Dynamax, Z-Move, Tera 기믹 |

## 첫 실행 후 폴더

서버 또는 월드를 한 번 시작하면 다음 폴더가 준비됩니다.

```text
config/dochi_rpg_maker/
├─ cobblemon/
│  ├─ trainers/
│  ├─ pokemon_itself/
│  ├─ battle_presentations/
│  ├─ pokemarts/
│  ├─ nurse_joy/
│  ├─ starter_selectors/
│  ├─ entity_clones/
│  └─ _migration_backups/
├─ npc_spawner/
│  └─ entity_clones/
└─ gui/
   └─ starter_selector_gui.json
```

`gui/`에는 PokéMart 역할별 GUI와 Starter Selector 런타임 GUI가 설치됩니다. 0.1.4는 수정하지 않은 구형 기본 GUI만 새 DRM 스프라이트 스타일로 교체하고, 교체 전 파일은 `_migration_backups/`에 보관합니다. 사용자가 고친 GUI는 덮어쓰지 않습니다. 이 파일은 화면 배치용이며 포켓몬, 가격, 조건, 지급 액션 같은 게임 데이터는 각 에디터 문서에 저장합니다.

`cobblemon/entity_clones/`는 애드온 Clone Library의 기존 호환 경로입니다. 최신 DRM Core NPC Spawner는 Core의 `npc_spawner/entity_clones/`와 이 호환 경로를 모두 읽습니다.

## 에디터 열기

1. 크리에이티브 모드 또는 DRM 편집 권한을 준비합니다.
2. `Dochi RPG Maker Core` 아이템으로 공용 에디터 선택 화면을 엽니다.
3. `Add-on`에서 원하는 에디터를 선택합니다.
4. `Load Existing`, `Use Default`, `Create New` 중 시작 소스를 선택합니다.

| 선택 | 용도 |
| --- | --- |
| `Load Existing` | 저장한 사용자 JSON 다시 편집 |
| `Use Default` | 보호된 기본값을 출발점으로 사용 |
| `Create New` | 새 초안에서 시작 |

기본 파일은 배포 템플릿입니다. 직접 덮어쓰기보다 `Save As`로 `custom/파일명.json`을 만드세요.

## 첫 Trainer 만들기

1. `Cobblemon Editor`에서 `Use Default`를 선택합니다.
2. 유형을 `Trainer`로 두고 첫 라운드의 포켓몬 한 마리를 설정합니다.
3. 처음에는 `Singles`, `Interaction`, DRM Strategy 기본값을 유지합니다.
4. `Save As`로 `custom/first_trainer.json`을 저장합니다.
5. DRM Core 아이템으로 대상 CustomNPCs NPC를 열어 `Cobblemon Trainer`를 선택합니다.
6. 저장한 문서를 한 번 `Apply`합니다.
7. 도구를 내려놓고 양손을 비운 뒤 NPC를 우클릭합니다.
8. 확인 화면과 실제 Cobblemon 전투가 시작되는지 검사합니다.

:::note 저장 후 자동 반영
파일 기반으로 적용한 NPC는 원본 경로를 추적합니다. 같은 `custom/first_trainer.json`에 다시 저장한 내용은 다음 전투 요청에서 최신값으로 해석되므로 일반적인 수정마다 다시 Apply할 필요가 없습니다. 서버 밖에서 파일을 고쳤다면 `/drm reload`를 실행하세요.
:::

## 첫 Pokemon Itself 만들기

1. 유형을 `Pokemon Itself`로 바꿉니다.
2. 첫 라운드의 종, 폼, 레벨, 기술과 외형을 정합니다.
3. `Save As`로 `custom/first_pokemon.json`을 저장합니다.
4. 대상 NPC에 `Cobblemon Pokemon Itself`로 적용합니다.
5. 포켓몬 외형과 PVE 전투를 확인합니다.

Pokemon Itself도 최대 16라운드, 라운드 조건과 전투 후 액션을 사용할 수 있습니다. 각 라운드는 한 마리의 포켓몬을 사용합니다.

## 역할별 첫 적용

| 역할 | 첫 확인 |
| --- | --- |
| Battle Presentation | 문서를 저장하고 Trainer의 Presentation 경로에 연결 |
| PokéMart | 문서를 저장한 뒤 NPC에 Apply하고 빈손 우클릭 |
| Nurse Joy | 문서를 Apply한 뒤 `Link Machine`, 60초 안에 치료기를 Shift+우클릭 |
| Starter Selector | 문서를 Apply하고 빈손 우클릭, 카드 선택 후 파티 또는 PC 지급 확인 |
| Clone Library | 적용 완료 NPC 또는 채워진 Soul Stone을 가져와 클론 저장 |
| NPC Spawner | DRM Core 스포너 블록에 클론 소스를 넣고 조건·웨이브 시험 |

## Apply가 다시 필요한 경우

- 다른 JSON 경로로 바꾸는 경우
- Trainer에서 Pokemon Itself 같은 다른 적용 역할로 바꾸는 경우
- Nurse Joy의 치료기 연결처럼 NPC별 상태를 새로 설정하는 경우
- 파일을 추적하지 않는 스냅샷 클론을 의도한 경우
- 파일이 아닌 초안/임시 소스를 적용한 경우

같은 원본 경로의 내용만 수정한 경우는 보통 다시 Apply하지 않습니다.

## 설치 직후 점검

| 증상 | 먼저 확인할 것 |
| --- | --- |
| Add-on 에디터가 없음 | 서버 로그의 모드 의존성 오류, DRM/애드온 버전 |
| 기본 파일이 없음 | 서버를 한 번 시작했는지, `config/dochi_rpg_maker/cobblemon` 생성 여부 |
| NPC 적용 대상이 없음 | 대상이 CustomNPCs NPC인지, DRM Core 아이템으로 NPC를 열었는지 |
| 전투가 안 열림 | 양손이 비었는지, 현재 라운드 조건·이용 정책, 다른 대화/상점 역할 |
| RCT를 선택할 수 없음 | RCT API 설치와 버전, 서버·클라이언트 일치 |
| 기믹이 작동하지 않음 | Mega Showdown 설치, 일반 인벤토리의 키 아이템, 포켓몬별 설정 |
| Starter가 안 보임 | 옵션 조건, 이미 사용한 60초 세션, 포켓몬 ID |

처음에는 한 NPC에 여러 역할을 겹치지 말고 역할별 테스트 NPC를 사용하세요. 기능이 확인된 뒤 상호작용 우선순위를 고려해 통합하는 편이 안전합니다.

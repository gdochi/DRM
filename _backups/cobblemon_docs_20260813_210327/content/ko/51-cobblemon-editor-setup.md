---
title: 설치
slug: cobblemon-editor-setup
order: 510
description: DRM Cobblemon Editor 설치와 첫 NPC 적용 방법입니다.
product: drm-cobblemon-editor
category: 설치
section: setup
status: Draft
version: 0.1.0
audience: 서버 운영자와 처음 설치하는 제작자
tags:
  - setup
  - fabric
  - npc
---

## 설치 체크리스트

`DRM Cobblemon Editor`는 DRM Core 위에서 동작하는 Fabric 애드온입니다. 다음 JAR을 1.21.1 Fabric 환경에 설치합니다.

| 모드 | 역할 |
| --- | --- |
| Fabric API | 이벤트와 네트워크 기반 |
| DRM 0.1.3+ | 공용 에디터 선택 UI, 서버 JSON 저장소, GUI Maker, 적용 흐름 |
| Cobblemon 1.7.3 | 포켓몬 데이터, 플레이어 파티, 실제 전투 런타임 |
| CustomNPCs Fabric 1.0.0 | 트레이너·포켓몬·상점 데이터를 적용할 NPC |
| `DRM Cobblemon Editor` | Cobblemon용 DRM 에디터와 런타임 연결 |
| CobbleDollars | 선택형 PokéMart 통화 공급자 |

서버에서 사용할 때는 서버와 모든 접속 클라이언트에 동일한 모드 조합을 설치하세요. 이 애드온에는 클라이언트 에디터·렌더러와 서버 전투·보상·상점 로직이 모두 있습니다.

## 첫 실행 후 생성되는 폴더

월드 또는 서버를 한 번 시작하면 DRM의 공식 데이터 루트 아래에 Cobblemon 애드온 폴더가 설치됩니다.

```text
config/dochi_rpg_maker/
├─ cobblemon/
│  ├─ trainers/
│  ├─ pokemon_itself/
│  ├─ battle_presentations/
│  ├─ pokemarts/
│  └─ _migration_backups/
└─ gui/
```

`gui/`에는 역할별 PokéMart 화면 레이아웃이 설치됩니다. 트레이너 JSON과 PokéMart JSON은 `cobblemon/` 아래에 있지만 화면 배치 JSON은 DRM의 공용 `gui/` 폴더를 사용합니다.

## 애드온 에디터 열기

1. 크리에이티브 모드 또는 DRM 편집 권한이 있는 상태에서 `Dochi RPG Maker Core` 아이템을 준비합니다.
2. 허공에 코어 아이템을 우클릭해 공용 에디터 선택 화면을 엽니다.
3. `Add-on` 목록에서 `Cobblemon Editor`, `Battle Presentation Maker`, `PokéMart Editor` 중 하나를 선택합니다.
4. 처음 시작할 때 `Load Existing`, `Use Default`, `Create New` 중 작업 소스를 선택합니다.

| 선택 | 권장 사용 시점 |
| --- | --- |
| `Load Existing` | 이미 저장한 사용자 JSON을 다시 편집할 때 |
| `Use Default` | 안전한 기본 구조에서 시작할 때 |
| `Create New` | 빈 초안 또는 제작 안내에서 시작할 때 |

기본 파일과 샘플은 템플릿입니다. 내용을 바꿀 때는 원본 이름에 바로 덮어쓰기보다 `Save As`로 `custom/` 같은 사용자 경로를 만드세요.

## 첫 트레이너 만들기

1. `Cobblemon Editor`를 열고 `Use Default`를 선택합니다.
2. 전투 유형을 `Trainer`로 둡니다.
3. `Pokemon Party`에서 첫 슬롯의 종과 레벨을 정합니다.
4. `Trainer` 카테고리에서 이름, `Singles`, AI Skill을 확인합니다.
5. `Encounter`의 Trigger를 우선 `Interaction`으로 둡니다. 자동 감지와 추적은 기본 전투가 성공한 뒤 설정합니다.
6. `Save As`를 눌러 `custom/first_trainer.json`처럼 저장합니다.
7. `Dochi RPG Maker Core`로 대상 CustomNPCs NPC를 우클릭합니다.
8. 적용 대상에서 `Cobblemon Trainer`를 선택하고 방금 저장한 파일을 `Apply`합니다.
9. 코어 아이템을 내려놓고 양손을 비운 뒤 NPC를 우클릭합니다.
10. 배틀 확인을 수락하고 플레이어의 실제 Cobblemon 파티로 전투가 시작되는지 확인합니다.

:::warning 저장과 적용은 별도입니다
`Save` 또는 `Save As`는 서버 JSON 파일을 저장합니다. NPC의 PersistentData는 대상 적용 화면에서 `Apply`할 때 바뀝니다. 파일을 수정한 뒤 NPC가 옛 설정을 계속 쓰면 다시 적용하세요.
:::

## 첫 Pokemon Itself 만들기

1. `Cobblemon Editor`에서 전투 유형을 `Pokemon Itself`로 바꿉니다.
2. 종, 폼, Aspects, Shiny, 레벨, 성격, 특성, 기술, 볼, 지닌 도구를 설정합니다.
3. 외형의 Scale, Pose, Animation, Shining을 확인합니다.
4. `Save As`로 `custom/first_pokemon.json`을 저장합니다.
5. 대상 NPC 적용 화면에서 `Cobblemon Pokemon Itself`를 선택해 적용합니다.

이 유형은 트레이너 라운드 대신 한 마리의 전체 스펙을 사용해 Cobblemon 기본 PVE 전투를 만듭니다.

## 설치 직후 점검

| 증상 | 먼저 확인할 것 |
| --- | --- |
| Add-on 에디터가 목록에 없음 | DRM과 애드온 버전, Fabric 로더 로그, `cobble_npc` 모드 로드 여부 |
| 기본 파일이 보이지 않음 | 서버 또는 월드를 한 번 시작했는지, `config/dochi_rpg_maker/cobblemon` 생성 여부 |
| NPC 적용 대상이 안 보임 | 대상이 CustomNPCs NPC인지, 코어 아이템으로 NPC를 직접 열었는지 |
| 전투 확인이 안 열림 | 양손이 비었는지, NPC에 DRM 대화·상점 또는 PokéMart가 우선 연결됐는지 |
| 플레이어 파티 오류 | 전투 가능한 Cobblemon 포켓몬이 실제 파티에 있는지 |

첫 테스트는 별도 테스트 월드에서 단순한 NPC 하나로 진행하세요. 여러 런타임 역할을 한 NPC에 동시에 붙이면 우클릭 우선순위를 먼저 이해해야 합니다.

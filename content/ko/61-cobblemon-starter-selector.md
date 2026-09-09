---
title: Starter Selector Editor
slug: cobblemon-starter-selector
order: 551
description: 스타터 카드, 조건, 지급 후 액션, 오디오와 런타임 GUI입니다.
product: drm-cobblemon-editor
category: 서비스 NPC
section: services
status: Draft
version: 0.1.6
audience: 스타터 선택 NPC를 만드는 제작자
tags:
  - starter-selector
  - pokemon-give
  - runtime-gui
---

## 역할

`Starter Selector Editor`는 서버가 허용한 포켓몬 카드 중 하나를 플레이어가 고르게 합니다. 서버는 선택 직전에 조건을 다시 검사하고, 지급에 성공한 뒤에만 성공 액션을 실행합니다.

문서는 `config/dochi_rpg_maker/cobblemon/starter_selectors/`에 저장되며 현재 스키마는 `2`입니다. 기본 런타임 배치는 `config/dochi_rpg_maker/gui/starter_selector_gui.json`입니다.

## 에디터와 GUI Maker

| 도구 | 편집 범위 |
| --- | --- |
| Starter Selector Editor | 옵션 포켓몬, 표시 문구, 조건, 오디오, 성공 액션, 제한형 대화 |
| DRM GUI Maker | 카드 목록, 상세 정보, 미리보기, 버튼, 페이지 이동의 화면 배치 |
| 플레이어 런타임 | 서버가 허용한 카드 표시와 실제 선택 요청 |

GUI Maker에서 포켓몬이나 조건을 추가할 수는 없습니다. 레이아웃 JSON의 컴포넌트를 지워 필수 동작이 사라지지 않도록 기본 파일을 복제해 편집하세요.

## 문서 구성

- 선택 옵션 최대 32개
- 성공 액션 최대 32개
- 선택형 제한 대화
- 공용 Runtime GUI 경로

### 옵션 필드

| 필드 | 설명 |
| --- | --- |
| Option ID | 문서 안에서 고유한 ID |
| Display Name | 최대 96자의 카드 이름 |
| Description | 최대 1024자의 설명 |
| Pokémon | Species부터 IV/EV, 기술, Tera/Dynamax/GMax까지 전체 슬롯 데이터 |
| Conditions | 이 옵션이 보이고 선택될 조건 그룹 |
| Audio | 포켓몬 울음소리 또는 사용자 지정 Sound ID |
| Volume / Pitch | Volume 0–4, Pitch 0.05–4 |

옵션 ID는 운영 중 바꾸지 않는 편이 좋습니다. 표시 이름은 번역과 연출에 맞춰 바꿀 수 있지만, 내부 ID는 테스트·로그·추적 기준으로 사용합니다.

## 제한형 대화

대화를 비우면 NPC 클릭 시 바로 Starter Selector를 엽니다. 대화를 사용하면 고정된 `Open Selector`와 `Close` 선택 흐름을 거쳐 화면으로 이동합니다.

`Open Selector` 선택지에도 DRM 조건을 둘 수 있습니다. 예를 들어 특정 퀘스트를 시작한 플레이어만 선택 화면을 열게 만들 수 있습니다.

일반 분기 대화나 복잡한 액션은 DRM Dialogue Editor에서 만들고, Starter Selector는 스타터 선택 역할에 집중하세요.

## DRM 대화에서 선택 화면 열기

0.1.6에서는 DRM Dialogue Editor의 `go_starter_selector` 액션으로 일반 분기 대화에서 스타터 선택 화면을 열 수 있습니다.

- 특정 Starter Selector JSON을 지정하면 그 문서를 엽니다.
- `bound`를 선택하면 현재 NPC에 Apply된 Starter Selector를 엽니다.
- 액션이 실행되면 대화 화면을 닫고 선택 화면으로 전환합니다.

여러 대화 분기 중 하나에서 스타터를 고르게 하거나, DRM Core 대화가 일반 클릭을 소유하는 통합 NPC에 권장합니다. 특정 JSON을 지정한 경우에도 플레이어가 확정할 때 서버가 같은 문서와 조건을 다시 확인합니다.

## 성공 액션

포켓몬이 파티 또는 PC에 실제로 들어간 뒤 다음 액션을 실행할 수 있습니다.

| Type | 용도 |
| --- | --- |
| `tag` | 선택 완료 태그 추가/제거 |
| `command` | 서버 명령 실행 |
| `item` | 아이템 지급/회수 |
| `faction_score` | CustomNPCs 세력 점수 변경 |
| `advancement` | 발전과제 변경 |
| `ftb_task` | FTB Task 연동 |
| `ftb_complete` | FTB Quest/Task 완료 연동 |

액션은 포켓몬 지급에 성공한 뒤에만 실행됩니다. 선택 세션은 부작용 실행 전에 닫히므로 같은 클릭을 반복해 포켓몬을 중복 지급하지 않습니다.

## 한 번만 선택하게 만들기

Starter Selector 자체에는 모든 문서에 강제되는 영구 1회 제한이 없습니다. 콘텐츠에 맞는 태그 조건으로 만듭니다.

1. 성공 액션에 `tag add starter_chosen`을 넣습니다.
2. 대화의 Open 조건 또는 각 옵션 조건에 `starter_chosen` 미보유를 넣습니다.
3. 태그를 가진 플레이어에게 보여 줄 안내 대화 또는 별도 NPC 반응을 준비합니다.

서버가 옵션 조건을 화면을 열 때와 선택을 확정할 때 다시 검사하므로 오래된 화면에서 조건을 우회할 수 없습니다.

## 플레이어 런타임

- 서버가 허용한 옵션만 카드로 전송합니다.
- 기본 레이아웃은 페이지당 카드 3개를 표시합니다.
- 카드 선택 후 상세 정보, 포켓몬 미리보기와 확정 버튼을 사용합니다.
- 세션 유효 시간은 60초입니다.
- 파티에 공간이 없으면 PC 저장을 시도합니다.
- 파티와 PC 모두 지급할 수 없으면 성공 액션을 실행하지 않습니다.

Cry를 선택하면 해당 포켓몬 울음소리를 사용하고, Custom Sound는 현재 레지스트리의 Sound ID를 사용합니다.

## 저장과 Apply

1. 옵션을 한 개만 만든 간단한 문서로 시작합니다.
2. `Save As`로 `custom/starter_selector.json`을 저장합니다.
3. 대상 NPC에 `Starter Selector` 역할로 한 번 Apply합니다.
4. 빈손 우클릭으로 대화와 카드 화면을 시험합니다.
5. 같은 JSON 경로에 저장한 변경은 다음 세션에서 자동 반영됩니다.

## 테스트 체크리스트

1. 조건을 만족하는 플레이어와 만족하지 않는 플레이어를 비교합니다.
2. 파티가 찬 상태에서 PC 지급을 확인합니다.
3. 60초가 지난 화면에서 확정이 거부되는지 확인합니다.
4. 두 번 빠르게 확정해도 중복 지급되지 않는지 확인합니다.
5. 1회 선택 태그가 대화 열기와 옵션 선택 양쪽을 막는지 확인합니다.
6. FTB Quests 없이 선택 모드 액션이 실패할 때 포켓몬 지급과 운영 정책을 확인합니다.

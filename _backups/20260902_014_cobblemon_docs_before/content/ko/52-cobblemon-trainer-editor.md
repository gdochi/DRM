---
title: Cobblemon Editor
slug: cobblemon-trainer-editor
order: 520
description: Trainer와 Pokemon Itself 문서, 파티, 라운드, 저장과 적용 방법입니다.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Draft
version: 0.1.3
audience: 트레이너와 포켓몬 NPC를 만드는 제작자
tags:
  - trainer
  - pokemon
  - rounds
---

## 두 전투 유형

| 유형 | 저장 폴더 | 구성 |
| --- | --- | --- |
| `Trainer` | `cobblemon/trainers/` | 라운드당 파티 1–6마리, AI, 아이템, 기믹, 대화 |
| `Pokemon Itself` | `cobblemon/pokemon_itself/` | 라운드당 한 마리, 포켓몬 외형과 PVE 전투 |

두 유형 모두 최대 16라운드, 라운드별 조건, 전투 설정, 전투 후 액션을 지원합니다. Trainer 파일을 Pokemon Itself 폴더로 옮기거나 반대로 사용하지 마세요.

현재 Trainer/Pokemon Itself JSON 스키마는 `19`입니다. 지원되는 구형 문서는 로드할 때 현재 필드로 보정되고, 다시 저장하면 최신 구조로 정규화됩니다.

## 상단 작업 버튼

| 버튼 | 동작 |
| --- | --- |
| `Editors` | DRM 에디터 선택 화면 또는 적용 흐름으로 돌아가기 |
| `Load` | 같은 문서 유형의 기존 JSON 불러오기 |
| `Save` | 현재 사용자 파일에 저장 |
| `Save As` | 새 사용자 경로로 저장 |
| `Reset` | 현재 문서를 기본값으로 되돌리기 |
| `Close` | 저장하지 않고 화면 닫기 |

기본 제공 파일은 보호될 수 있습니다. 수정본은 `Save As`로 `custom/` 아래에 저장하세요. `Close`는 저장이나 NPC 적용을 수행하지 않습니다.

## 화면 구조

왼쪽의 큰 카테고리는 `Pokemon Party`와 `Trainer`입니다. `Trainer` 안에는 다음 섹션이 있습니다.

| 섹션 | 주요 설정 |
| --- | --- |
| `General` | 활성화, 전투 유형, 이름 소스, Battle Presentation, 일반 인벤토리, RCT 포터 |
| `Encounter` | 트리거, 감지 피드백, 추적, 위치 정렬, 전투 설정과 이용 정책 |
| `Feedback` | 마커, 사운드, 반응 대기 |
| `Rounds` | 라운드 추가·복제·삭제·정렬 |
| `Dialogue` | 현재 라운드의 전투 전 DRM Dialogue Set |
| `Conditions` | 현재 라운드 진입 조건 |
| `Rewards` | 이름은 유지되지만 실제 의미는 전투 결과별 `After Actions` |

창 크기와 GUI Scale 1–4에서 사용할 수 있도록 목록과 검색 화면이 스크롤됩니다. 화면이 잘리면 Minecraft GUI Scale을 낮추고 다시 여세요.

## General

### 활성화와 이름

- `Enabled`가 꺼져 있으면 해당 NPC의 전투 역할이 시작되지 않습니다.
- 이름 소스 `Profile`은 문서에 저장한 이름을 사용합니다.
- 이름 소스 `NPC`는 적용 대상 CustomNPCs NPC의 현재 표시 이름을 사용합니다.

NPC 이름을 운영 중 자주 바꾸고 연출·확인창에도 같이 반영하려면 `NPC`를 사용합니다. 문서 이름을 고정하려면 `Profile`을 사용합니다.

### Battle Presentation

Battle Presentation 경로를 선택하면 전투 시작 전에 해당 연출을 재생합니다. 파일이 없거나 잘못되면 기본 연출로 안전하게 대체됩니다. 연출 문서는 별도 `Battle Presentation Maker`에서 편집합니다.

### 일반 인벤토리

Trainer 전체가 공유하는 최대 64종의 아이템입니다. DRM AI의 일반 소비 아이템이 아니라 Mega Showdown 키 아이템 같은 보유 조건에 사용됩니다. 라운드별 치료·회복 아이템은 `Trainer Items`에서 따로 구성합니다.

## Pokemon Party

Trainer는 현재 라운드에 최대 6마리, Pokemon Itself는 한 마리를 편집합니다.

| 필드 | 설명 |
| --- | --- |
| Species | 네임스페이스를 포함한 Cobblemon 종 ID |
| Form / Aspects | 폼과 외형·전투 속성 |
| Gender | Random, Male, Female, Genderless |
| Shiny / Level | 이로치와 1–100 레벨 |
| Nature / Ability | 성격과 특성 |
| Moves | 최대 4개 기술 |
| Poké Ball / Held Item | 볼과 지닌 도구 |
| IV / EV | 능력치별 IV 0–31, EV 0–252, 총합 최대 510 |
| Battle Mechanics | Tera Type, Dynamax Level 0–10, Gigantamax Factor |

종·폼·특성·기술 ID는 현재 설치된 Cobblemon 레지스트리에 있어야 합니다. 비어 있거나 유효하지 않은 선택은 자동 선택 또는 기본값으로 정규화될 수 있습니다.

### 파티 작업

- `Add Pokémon`: 현재 라운드에 슬롯 추가
- `Remove Pokémon`: 선택 슬롯 제거
- `Random Party`: 저장 가능한 랜덤 생성 프로필로 파티 생성
- `Stats`: 선택 포켓몬의 IV/EV 편집
- `Battle Mechanics`: 선택 포켓몬의 Tera/Dynamax/GMax 설정
- `Battle Strategy`: 현재 라운드의 AI 엔진과 전략 편집
- `Trainer Items`: 현재 라운드의 가상 배틀 아이템 편집

## 라운드

문서에는 1–16라운드가 있으며 다음 데이터가 라운드별로 함께 이동합니다.

- 포맷과 파티 또는 Pokemon Itself 한 마리
- 시작 지연
- 조건과 전투 후 액션
- 전투 전 Dialogue Set
- 전투 설정 덮어쓰기
- Trainer AI, 랜덤 파티 프로필, 배틀 아이템, 기믹

`Add Round`는 기본 라운드를 추가하고, `Duplicate Round`는 현재 라운드 전체를 복제합니다. `Remove Round`는 최소 한 라운드가 남아야 합니다. 드래그 정렬 후에는 재대전 시작 라운드와 기존 운영 진행도가 의도한 라운드를 가리키는지 확인하세요.

## 전투 전 Dialogue Set

각 라운드에 DRM Dialogue Set을 하나 연결할 수 있습니다. 빈손으로 해당 Trainer를 우클릭하면 서버가 플레이어의 현재 라운드를 계산해 그 라운드의 대화를 엽니다.

- Dialogue Set에는 `go_battle` 액션이 있어야 합니다.
- 대화가 열려 있는 사이 라운드가 바뀌면 이전 세션으로 전투를 시작하지 않습니다.
- 경로가 비어 있으면 일반 배틀 확인 흐름을 사용합니다.
- 이 기능은 NPC 전역 대화 저장소를 덮어쓰지 않고 플레이어별로 현재 라운드 대화를 해석합니다.

## 저장과 NPC 적용

1. `Save As`로 사용자 파일을 만듭니다.
2. 대상 NPC 적용 화면에서 `Cobblemon Trainer` 또는 `Cobblemon Pokemon Itself`를 선택합니다.
3. 문서를 한 번 `Apply`합니다.
4. 양손을 비우고 런타임을 시험합니다.

파일 기반 Apply는 원본 경로와 대체 스냅샷을 저장합니다. 이후 같은 경로에 `Save`하면 최신 내용이 다음 전투 요청에 반영됩니다. `/drm reload`는 외부 파일 수정이나 캐시 새로고침에 사용합니다.

다시 Apply해야 하는 대표적인 경우는 문서 경로·적용 역할을 바꾸거나 파일 추적이 없는 스냅샷을 적용할 때입니다. 같은 NPC에 다시 Apply해도 플레이어별 클리어 진행도는 자동 초기화되지 않습니다.

## 첫 검증 체크리스트

1. 한 라운드, 한 마리, Singles로 시작합니다.
2. Trigger는 Interaction으로 둡니다.
3. 플레이어 파티에 전투 가능한 포켓몬을 넣습니다.
4. 조건과 전투 후 액션을 비운 상태로 첫 전투를 확인합니다.
5. 그다음 라운드, 자동 감지, AI, 아이템, 기믹을 하나씩 추가합니다.

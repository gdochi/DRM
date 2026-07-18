---
title: Cobblemon Editor 기능 가이드
slug: cobblemon-trainer-editor
order: 520
description: Cobblemon Editor의 화면 구조, 파티·라운드 편집, AI Skill, 저장과 NPC 적용 동작을 설명합니다.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Draft
version: 0.1.0
audience: 코블몬 전투 NPC 제작자
tags:
  - trainer
  - editor
  - party
---

## 이 에디터가 만드는 데이터

`Cobblemon Editor`는 전투 상대와 조우 규칙을 만드는 제작자 화면입니다. 전투 유형은 `Trainer`와 `Pokemon Itself` 중 하나이며, 유형에 따라 저장 위치와 편집 가능한 카테고리가 달라집니다.

| 전투 유형 | 저장 위치 | 실제 런타임 |
| --- | --- | --- |
| `Trainer` | `cobblemon/trainers/` | 최대 16라운드의 트레이너 파티, 조우 감지, 재대전, 조건, 보상 |
| `Pokemon Itself` | `cobblemon/pokemon_itself/` | 한 마리의 지정 포켓몬과 벌이는 Cobblemon PVE 전투 |

전투 유형을 바꾸면 `Load`와 `Save As`가 조회하는 서버 폴더도 즉시 바뀝니다. Trainer 파일을 Pokemon Itself 폴더에 복사해 재사용하지 말고 에디터에서 유형을 먼저 정한 뒤 저장하세요.

## 화면에서 실제로 편집되는 범위

| 화면 | 저장되는 값 | 기능적 결과 |
| --- | --- | --- |
| `Pokemon Party` | 종, 폼, Aspects, Shiny, 레벨, 성격, 특성, 기술, 볼, 지닌 도구 | 서버가 이 값으로 실제 Cobblemon 포켓몬을 생성합니다. |
| `General` | 활성화, 이름, 전투 유형, Battle Presentation | 비활성화하면 NPC에 데이터가 있어도 전투를 시작하지 않습니다. 연출은 파일 경로로 연결됩니다. |
| `Encounter` | Interaction/Vision/Radius와 추적·배틀 위치 | 플레이어를 어떻게 찾고 전투 시작 위치로 이동시킬지 결정합니다. |
| `감지 연출` | 머리 위 문구, 색, 크기, 사운드, 반응 시간 | Vision/Radius로 플레이어를 처음 잡았을 때 한 번 실행됩니다. |
| `Rounds` | 라운드 순서, 포맷, AI, 파티, 시작 지연 | 첫 도전과 재대전에서 사용할 상대 구성을 결정합니다. |
| `Conditions` | 도전 조건 그룹 | 자동 감지 전과 실제 배틀 시작 직전에 서버가 다시 검사합니다. |
| `Rewards` | 승리 보상 그룹 | 승리 결과가 확정된 뒤 서버가 지급합니다. 패배와 도주에는 실행되지 않습니다. |

`Pokemon Itself`에서는 Trainer 전용 카테고리가 비활성화되고 한 마리의 포켓몬 데이터와 외형을 편집합니다.

## 포켓몬 슬롯 편집

Trainer 라운드에는 최대 6개 슬롯이 있습니다. 슬롯을 선택하면 별도 `포켓몬 데이터 편집기`가 열리고, 검색과 필터를 사용해 값을 고릅니다.

| 값 | 처리 방식 |
| --- | --- |
| Species | `cobblemon:` 네임스페이스가 없으면 자동으로 붙습니다. 유효하지 않은 종은 전투 생성에 실패할 수 있습니다. |
| Form | 비워 두면 종의 기본 폼을 사용합니다. |
| Aspects | 쉼표로 여러 값을 저장합니다. 폼과 외형 변형에 사용되므로 실제 종이 지원하는 값만 선택합니다. |
| Shiny | 실제 전투 포켓몬의 이로치 상태입니다. 외형의 `Shining`과는 다른 값입니다. |
| Level | 1–100 범위로 제한됩니다. |
| Nature / Ability | 비워 두면 Cobblemon 생성 기본 규칙을 따릅니다. 값을 고정하면 생성 포켓몬에 명시적으로 적용합니다. |
| Moves | 중복을 제거하고 최대 4개만 저장합니다. 빈 목록은 Cobblemon의 레벨 기반 기본 기술 구성을 사용합니다. |
| Poké Ball | 기본값은 `cobblemon:poke_ball`입니다. 배틀 직전 선두 볼 연출에도 사용됩니다. |
| Held Item | 유효한 아이템 ID를 지정합니다. 빈 값은 지닌 도구 없음입니다. |

종과 기술 선택 창의 세대·타입 필터는 선택 목록을 좁히는 기능일 뿐, 저장 데이터에 별도 제한 조건을 추가하지 않습니다.

## 라운드 편집이 동작하는 방식

`Rounds` 목록에서 라운드를 추가·삭제하고 드래그해 순서를 바꿀 수 있습니다. 각 라운드는 다음 값을 독립적으로 가집니다.

- `Singles`, `Doubles`, `Triples` 전투 포맷
- AI Skill 0–5
- 최대 6마리 파티
- `Battle start delay` 0틱 이상
- 최대 32개 조건과 최대 32개 보상

`Edit this round's party`를 누르면 `Pokemon Party` 화면이 현재 라운드 전용으로 바뀝니다. 편집을 마친 뒤 `라운드 편집으로 돌아가기`를 사용해야 어느 라운드를 수정 중인지 놓치지 않습니다. 첫 라운드의 파티·포맷·AI 값은 문서의 호환용 기본 값과도 동기화됩니다.

`Battle start delay`는 배틀 연출이 끝난 뒤 실제 Cobblemon 배틀을 시작하기 전에 추가되는 지연입니다. 연출이 48틱이고 지연이 20틱이면 서버는 약 68틱 뒤 배틀 시작을 시도합니다.

## AI Skill의 실제 의미

AI Skill은 단순 공격력 보정이 아니라 Cobblemon 트레이너 AI의 고급 판단과 교체 판단 확률을 정합니다.

| AI Skill | 고급 판단 | 교체 판단 |
| --- | ---: | ---: |
| 0 | 0% | 0% |
| 1 | 20% | 0% |
| 2 | 40% | 0% |
| 3 | 60% | 20% |
| 4 | 80% | 60% |
| 5 | 100% | 100% |

AI Skill을 올려도 잘못된 기술 구성이나 포맷에 맞지 않는 파티가 자동 수정되지는 않습니다. Doubles와 Triples는 실제로 동시에 낼 수 있는 유효 포켓몬 수를 준비하세요.

## 저장, 적용, 재적용

1. 기본 파일을 연 뒤 첫 사용자 작업은 `Save As`로 `custom/...json`에 저장합니다.
2. 대상 CustomNPCs NPC를 `Dochi RPG Maker Core`로 열고 `Cobblemon Trainer` 또는 `Cobblemon Pokemon Itself`를 선택합니다.
3. 저장한 파일을 고른 뒤 `Apply`합니다.
4. 코어 아이템을 내려놓고 양손을 비운 상태로 NPC를 우클릭해 런타임을 검사합니다.
5. JSON을 다시 수정했다면 NPC에 다시 `Apply`합니다. 저장 파일과 NPC PersistentData는 자동으로 연결되어 갱신되지 않습니다.

`Apply to NPC`는 에디터가 특정 NPC를 대상으로 열린 경우에만 의미가 있습니다. 서버는 편집 권한과 NPC까지의 거리를 다시 검사한 뒤 적용합니다.

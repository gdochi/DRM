---
title: 트레이너와 Pokemon Itself 편집
slug: cobblemon-trainer-editor
order: 520
description: 파티, 라운드, 조우 감지, 재대전, 조건과 승리 보상을 설정하는 방법입니다.
product: drm-cobblemon-editor
category: 트레이너
section: trainer
status: Draft
version: 0.1.0
audience: 코블몬 전투 NPC 제작자
tags:
  - trainer
  - battle
  - rewards
---

## 에디터 구조

`Cobblemon Editor`는 왼쪽 카테고리, 중앙 작업 영역, 우측 미리보기·상태 영역을 사용하는 DRM 애드온 에디터입니다. 상단의 `Editors / Create New / Load / Save / Save As / Reset / Close`는 DRM 공용 작업 흐름입니다.

| 카테고리 | 주요 내용 |
| --- | --- |
| `Pokemon Party` | 현재 라운드의 포켓몬 슬롯과 세부 스펙 |
| `General` | 이름, 활성화, `Trainer` 또는 `Pokemon Itself` 유형 |
| `Encounter` | Interaction/Vision/Radius 트리거, 감지 간격, 시야, 추적, 배틀 위치 |
| `Detection FX` | 감지 마커, 색상, 크기, 유지 시간, 감지 사운드 |
| `Rounds` | 라운드 추가·복사·삭제, 포맷, AI Skill, 시작 지연, 재대전 진행 방식 |
| `Conditions` | 해당 라운드에 도전할 수 있는 조건 |
| `Rewards` | 해당 라운드 승리 시 서버가 지급하는 보상 |

## 포켓몬 슬롯

트레이너 라운드는 최대 6마리의 파티를 가집니다. 각 슬롯에서 다음 값을 편집할 수 있습니다.

- Species, Form, Aspects
- Shiny와 Level
- Nature와 Ability
- 최대 4개 Moves
- Poké Ball
- Held Item

`Singles`, `Doubles`, `Triples`는 전투 포맷입니다. AI Skill은 `0`에서 `5` 범위입니다. 슬롯을 여러 개 만들었더라도 유효하지 않은 종이나 전투 불가능한 데이터가 있으면 서버가 전투 시작을 거부할 수 있으므로 기본 Bulbasaur 슬롯에서 하나씩 바꾸는 방식이 안전합니다.

## Trainer와 Pokemon Itself 차이

| 항목 | Trainer | Pokemon Itself |
| --- | --- | --- |
| 상대 구성 | 라운드별 최대 6마리 파티 | 한 마리 포켓몬 |
| 포맷 | Singles/Doubles/Triples | Singles 중심 PVE |
| 라운드 | 최대 16개 | 사용하지 않음 |
| 조건·보상 | 라운드별 지원 | 사용하지 않음 |
| 조우 옵션 | Interaction/Vision/Radius, 추적, 재대전, 쿨다운 | 단일 포켓몬 설정과 외형 중심 |
| 기본 연출 | `presets/vs_trainer.json` | `presets/vs_pokemon.json` |

전투 유형을 바꾸면 저장 도메인도 `trainers/`와 `pokemon_itself/` 사이에서 바뀝니다. 유형을 바꾼 직후에는 `Save As`의 대상 폴더를 확인하세요.

## 조우 방식

| Trigger | 동작 |
| --- | --- |
| `Interaction` | 플레이어가 빈손으로 NPC를 우클릭했을 때 배틀 확인을 엽니다. |
| `Vision` | 거리, 시야각, 선택형 Line of Sight를 통과한 가장 가까운 플레이어를 감지합니다. |
| `Radius` | 설정 반경 안의 가장 가까운 유효 플레이어를 감지합니다. |

Vision과 Radius 자동 조우는 크리에이티브·관전자 플레이어를 대상으로 삼지 않습니다. 플레이어가 이미 전투 중이거나 NPC가 다른 전투에 예약된 경우에도 시작하지 않습니다.

자동 감지 후에는 `Detection FX`의 마커와 사운드가 한 번 재생됩니다. `Reaction Ticks`가 지난 뒤 즉시 전투를 시작하거나, Chase를 켰다면 NPC가 플레이어에게 접근합니다. Chase에는 Walking Speed, Stop Distance, Max Distance, Duration, Return Home이 있습니다.

`Battle Positioning`을 켜면 전투 직전에 NPC의 홈 위치를 기준으로 위치를 정리하고 플레이어를 지정 거리 앞에 배치합니다. 전투 중 NPC는 숨겨지고 잠기며, 전투가 끝나거나 시작에 실패하면 원래 상태로 복구됩니다.

## 라운드와 재대전

트레이너는 최대 16개 라운드를 가질 수 있습니다. 각 라운드는 포맷, AI Skill, 파티, 시작 지연, 조건, 보상을 독립적으로 저장합니다.

재대전을 켰을 때 `Round Mode`는 다음처럼 동작합니다.

| 모드 | 동작 |
| --- | --- |
| `Fixed` | `Start Round`로 지정한 라운드를 계속 사용합니다. |
| `Continue` | 클리어 횟수에 따라 다음 라운드로 진행하고 마지막 라운드에서 멈춥니다. |
| `Loop` | `Start Round`부터 마지막 라운드까지 반복합니다. |

`Max Rematches`가 `-1`이면 횟수 제한이 없습니다. Cooldown은 틱 단위이며 `Player` 범위는 플레이어별, `NPC` 범위는 해당 NPC 전체에 적용됩니다. 20틱은 약 1초입니다.

## 조건과 보상

조건은 `AND` 또는 `OR` 그룹으로 묶입니다. 한 라운드에는 최대 32개 조건과 32개 보상이 저장됩니다.

| 조건 유형 | 용도 |
| --- | --- |
| `tag` | 플레이어 스코어보드 태그 존재/부재 |
| `item` | 아이템 보유 또는 수량 비교 |
| `stored` | CustomNPCs 스크립트 storeddata 값 비교 |
| `advancement` | 발전 과제 보유/미보유 |
| `cobblemon_party` | 플레이어 파티의 특정 종 또는 수량 검사 |

| 보상 유형 | 용도 |
| --- | --- |
| `item` | 아이템 지급 또는 회수 |
| `tag` | 스코어보드 태그 추가 또는 제거 |
| `stored` | CustomNPCs storeddata 설정·가감·삭제 |
| `command` | 서버 명령 실행 |
| `advancement` | 발전 과제 지급 또는 회수 |
| `currency` | DRM 통화 추가·회수·설정 |
| `cobblemon_give` | 지정 종과 레벨의 포켓몬 지급 |

보상 모드는 모두 시도하는 `All`과 무작위 선택인 `Random`이 있습니다. 지급 정책은 `Every Clear`, `First Clear`, `Once Per Round` 중 하나입니다. 보상 Chance는 각 항목의 추가 확률입니다.

:::warning 명령과 storeddata
`command` 보상은 서버 권한으로 실행될 수 있으므로 배포 전에 테스트 서버에서 검증하세요. `stored`는 일반 DRM 영구 데이터가 아니라 CustomNPCs 스크립트 storeddata 사용자용 동작입니다.
:::

## 저장하고 NPC에 적용하기

1. 첫 저장은 `Save As`를 사용합니다.
2. 트레이너는 `cobblemon/trainers/`, Pokemon Itself는 `cobblemon/pokemon_itself/` 아래에 저장합니다.
3. 대상 NPC의 DRM 적용 흐름을 열어 올바른 적용 대상을 선택합니다.
4. `Apply` 후 빈손 우클릭으로 실제 런타임을 테스트합니다.
5. 파일을 다시 수정했다면 NPC에도 다시 적용합니다.

조건, 재대전, 보상은 플레이어별 진행도와 연결되므로 같은 테스트 플레이어만 반복 사용하면 이전 클리어 기록의 영향을 받을 수 있습니다. 새 조건을 검증할 때는 테스트용 태그·아이템·진행도를 명확히 정리하세요.

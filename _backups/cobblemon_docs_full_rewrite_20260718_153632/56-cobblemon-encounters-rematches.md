---
title: 조우 감지·추적·재대전 동작
slug: cobblemon-encounters-rematches
order: 521
description: Interaction, Vision, Radius 감지부터 추적, 위치 정렬, 쿨다운과 라운드 진행까지 서버 동작 순서로 설명합니다.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Draft
version: 0.1.0
audience: 자동 조우와 다회차 트레이너를 만드는 제작자
tags:
  - encounter
  - chase
  - rematch
---

## 조우 방식별 판정

| Trigger | 서버가 검사하는 것 | 사용 시점 |
| --- | --- | --- |
| `Interaction` | 양손이 빈 플레이어의 Main Hand 우클릭 | 대화형 NPC, 기본 테스트, 플레이어가 선택해서 도전하는 트레이너 |
| `Vision` | 거리, NPC 정면 기준 반각, 선택형 Line of Sight | 눈이 마주치면 달려오는 트레이너 |
| `Radius` | NPC 주변 거리 | 방향과 벽을 무시한 범위형 조우. Line of Sight와 시야각은 사용하지 않습니다. |

Vision과 Radius는 다음 플레이어를 자동 대상에서 제외합니다.

- 크리에이티브 또는 관전자 모드
- 사망했거나 제거된 플레이어
- 이미 Cobblemon 배틀 중인 플레이어
- 다른 트레이너 조우에 예약되었거나 다른 NPC가 추적 중인 플레이어
- 재대전 횟수, 쿨다운, 현재 라운드 조건을 통과하지 못한 플레이어

여러 명이 범위에 있으면 조건을 통과한 플레이어 중 NPC와 가장 가까운 한 명을 선택합니다.

## 감지값 범위와 성능

| 설정 | 허용 범위 | 실제 의미 |
| --- | ---: | --- |
| Detection interval | 5–200틱 | NPC가 새 대상을 검색하는 간격입니다. 5틱은 빠르지만 트레이너 수가 많을수록 검사량이 늘어납니다. |
| Vision distance | 1–64블록 | Vision의 최대 탐지 거리입니다. |
| Vision half-angle | 5–180도 | NPC 정면에서 좌우 각각 허용할 각도입니다. 180이면 사실상 전 방향입니다. |
| Detection radius | 1–64블록 | Radius의 탐지 반경입니다. |
| Line of Sight | On/Off | Vision에서 NPC가 실제로 플레이어를 볼 수 있어야 하는지 정합니다. |

한 번 대상을 잡은 NPC는 최소 40틱 또는 설정한 감지 간격만큼 다음 획득을 지연합니다. 실패 직후 매 틱 다른 플레이어를 계속 잡는 동작을 막기 위한 서버 보호입니다.

## 감지 연출과 Reaction Ticks

감지 연출은 `Vision`과 `Radius`가 새 플레이어를 획득할 때 한 번 실행됩니다. `Interaction`에서는 실행되지 않습니다.

| 값 | 범위·동작 |
| --- | --- |
| Marker Text | 최대 32자, 줄바꿈 제거 |
| Reaction Ticks | 1–200틱. 마커와 사운드 후 추적 또는 배틀로 넘어가기 전 대기 |
| Marker Color | `#RRGGBB` 또는 `#AARRGGBB` |
| Scale | 0.25–4.0 |
| Y Offset | 0–3블록 |
| Display Distance | 4–256블록 |
| Hold Ticks | 대상 해제 뒤 0–600틱 유지 |
| Sound Volume | 0–4 |
| Sound Pitch | 0.05–4 |

Reaction Ticks 동안 NPC는 바로 달리지 않습니다. 시간이 끝났을 때 Chase가 꺼져 있으면 전투 시작을 시도하고, 켜져 있으면 추적 단계로 전환합니다.

## Chase가 끝나는 조건

| 설정 | 허용 범위 | 동작 |
| --- | ---: | --- |
| Walking Speed | 0–100 | CustomNPCs 걷기 속도 스케일입니다. 내부 이동 배수는 `Walking Speed ÷ 5`입니다. |
| Stop Distance | 0.5–8블록 | 플레이어와 이 거리 안에 들어오면 배틀 시작을 시도합니다. |
| Max Distance | Stop Distance 이상, 최대 96블록 | 플레이어와의 거리가 아니라 감지 당시 NPC 홈 위치에서 NPC가 벗어날 수 있는 최대 거리입니다. |
| Duration | 10–1200틱 | 추적을 유지할 최대 시간입니다. |
| Return Home | On/Off | 추적 실패나 취소 뒤 감지 당시 홈 위치로 내비게이션 복귀합니다. |

대상이 로그아웃하거나 죽음, 다른 배틀 진입, 예약 상태 변경, 제한 거리 초과, 시간 초과가 발생하면 추적은 실패합니다. `Return Home`이 켜져 있으면 복귀를 시작하며, 복귀는 도착하거나 내부 안전 제한 1200틱을 넘으면 종료됩니다.

## Battle Positioning과 NPC 잠금

`Battle Positioning`을 켜면 감지 시점에 잡은 NPC 홈 위치를 기준으로 전투 직전 위치를 정리합니다. Player Distance는 1–16블록입니다.

실행 순서는 다음과 같습니다.

1. 서버가 NPC 홈 위치와 방향을 캡처합니다.
2. NPC와 플레이어를 전투 시작 위치로 정렬합니다.
3. Battle Presentation을 클라이언트에 보냅니다.
4. 연출과 Round의 `Battle start delay`가 끝나면 조건을 다시 검사합니다.
5. Cobblemon 배틀이 시작되면 NPC를 숨기고 다른 사용을 잠급니다.
6. 승리, 패배, 도주, 시작 실패 때 NPC 위치·가시성·잠금을 복구합니다.

연출 중 대상이나 플레이어가 사라지면 서버는 배틀을 취소합니다. 따라서 연출만 재생되고 전투가 시작되지 않는 문제는 대상 유효성, 조건 재검사, 파티 생성 실패도 함께 확인해야 합니다.

## 재대전 횟수와 라운드 선택

첫 도전은 항상 목록의 첫 번째 라운드를 사용합니다. `Start Round`와 `Round Mode`는 첫 승리 이후 재대전에 적용됩니다.

| 설정 | 실제 동작 |
| --- | --- |
| Rematch Off | 한 번 승리한 플레이어는 다시 도전할 수 없습니다. 패배·도주는 클리어 수를 올리지 않습니다. |
| Max Rematches `0` | 재대전 없음 |
| Max Rematches `3` | 최초 승리 뒤 최대 3번 더 클리어 가능 |
| Max Rematches `-1` | 횟수 제한 없음 |
| Start Round | 재대전이 시작할 라운드. UI는 1부터 표시합니다. |
| `Fixed` | 모든 재대전에서 Start Round만 사용 |
| `Continue` | Start Round부터 한 라운드씩 올라가며 마지막 라운드에서 고정 |
| `Loop` | Start Round부터 마지막 라운드까지 반복 |

예를 들어 라운드가 4개이고 Start Round가 2라운드라면, 첫 도전은 1라운드입니다. 이후 `Continue`는 2→3→4→4, `Loop`는 2→3→4→2 순서입니다.

## 쿨다운

Cooldown은 0틱부터 최대 1일(1,728,000틱)까지 설정할 수 있습니다.

- `Player`: NPC와 플레이어 조합별로 저장됩니다. 다른 플레이어는 즉시 도전할 수 있습니다.
- `NPC`: 해당 NPC가 공유하는 쿨다운입니다. 한 플레이어의 전투 종료가 다른 플레이어의 도전도 막습니다.

쿨다운, 클리어 수, 보상 지급 라운드는 서버 진행도에 남습니다. 같은 계정으로 반복 시험할 때 설정을 바꿨는데도 다음 라운드가 나오거나 보상이 다시 안 나오면 이전 진행 기록의 영향부터 확인하세요.

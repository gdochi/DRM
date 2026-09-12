---
title: 타겟 탐색·추적·시선
slug: mob-editor-detection-patrol
order: 250
description: 적대 대상 선택과 공격 사이 추적, 단계별 시선·정지를 나눠 설정합니다.
product: mob-editor
section: combat
category: BattleWorks
status: 사용 안내
version: 0.1.3
audience: 입문자와 전투 콘텐츠 제작자
tags:
  - battleworks
  - combat
---

## 1. 누가 타겟을 정할지 선택하기

BattleWorks 파일을 적용하는 것과 적대 대상을 정하는 것은 별개입니다.

| 방식 | 설정 | 적합한 경우 |
| --- | --- | --- |
| CustomNPCs가 타겟 선택 | Scan Without Target Off | 팩션과 적대 관계를 그대로 쓰는 전투 |
| BattleWorks 보조 탐색 | Scan Without Target On | 타겟이 없을 때 가까운 생명체를 탐색하는 연습·특정 전투 |

보조 탐색은 **CustomNPCs 팩션 적대 필터와 동일하지 않습니다.** 주변 주민이나 다른 생명체가 있는 곳에서는 의도한 대상이 잡히는지 확인해야 합니다. 크리에이티브·관전자 플레이어는 제외됩니다.

## 2. 보조 탐색을 시험하는 설정

다른 생명체가 없는 연습장에서 **Combat Rules → Combat**을 엽니다.

| 항목 | 시작값 | 바꾸면 달라지는 점 |
| --- | --- | --- |
| Scan Without Target | On | 현재 유효 타겟이 없을 때 검색 |
| Target Scan Range | 16 | 주변 탐색 거리 |
| Awareness FOV | 360 | 전 방향 탐색. 낮추면 앞쪽으로 제한 |
| Require Line of Sight | On | 가려진 대상을 탐색 단계에서 제외 |

1. NPC 앞에서 생존 모드로 접근합니다.
2. 뒤쪽에서도 접근해 FOV 360일 때 찾는지 봅니다.
3. FOV를 `160`으로 줄이고 뒤쪽에서 다시 비교합니다.
4. 벽을 사이에 두고 시야 조건을 비교합니다.
5. 팩션 중심 전투로 돌아갈 때는 보조 탐색을 끕니다.

이 시야 조건은 **타겟 탐색**에 사용됩니다. 패턴 Core의 시야 조건은 **해당 패턴을 시작할 때** 사용됩니다.

## 3. 공격 사이의 접근과 바라보기

BattleWorks가 기본 공격을 억제하는 전투에서는 전용 추적 제어를 사용합니다.

| 항목 | 역할 | 근접 실습값 |
| --- | --- | --- |
| Suppress Native Attacks | 기본 공격 AI와 작성한 전투의 중복을 억제 | On |
| Chase Target | 패턴 사이에 타겟으로 경로 탐색 | On |
| Face Between Patterns | 시작·재사용 대기 중 타겟 바라보기 | On |
| Chase Speed Multiplier | 이동 속도에 사용하는 추적 배율 | 1.0 |
| Approach Distance | 접근 후 유지하려는 거리 | 2.0 |

Approach Distance는 현재 페이즈의 사용 가능한 비이동 공격 거리 안으로 보정될 수 있습니다. 그래도 공격 범위·실제 히트박스·경로를 함께 맞춰야 합니다.

기본 공격 억제를 끄면 CustomNPCs의 기존 공격 AI가 계속 개입할 수 있습니다. 추적 문제를 해결하려고 두 전투 제어를 무작정 함께 켜지 마세요.

## 4. 공격 단계가 시작되면 별도 설정을 따릅니다

- **Face Target**은 해당 단계 안에서 타겟을 따라 방향을 맞춥니다.
- **Stop Horizontal**은 수평 움직임을 멈추지만 중력에 의한 수직 이동까지 없애는 설정은 아닙니다.
- **Hold**는 정지용 이동입니다.
- Toward, Away, Orbit 같은 단계 이동은 작성한 공격 움직임입니다.
- 타임라인에서 시작한 Walk·물리 Dash 등의 이동 세션이 있으면 그 이동이 우선권을 유지할 수 있습니다.

“패턴 사이에는 잘 보는데 공격 중에는 뒤를 본다”면 Face Between Patterns보다 **문제가 나는 단계의 Face Target**을 먼저 봅니다. 공격 중 방향을 고정하려고 끈 경우에는 그 의도도 유지합니다.

## 5. 전투 시작과 종료 시간

| 항목 | 의미 | 예 |
| --- | --- | --- |
| Engage Delay Min / Max | 타겟 확보 후 첫 패턴까지의 대기 범위 | 10~18틱 |
| Retry Delay | 시작할 패턴이 없을 때 다시 검사하기 전 대기 | 10틱 |
| Combat Reset Delay | 타겟이 없는 상태가 이어질 때 전투 상태를 초기화할 시간 | 100틱, 약 5초 |

전투 초기화는 패턴 이력·쿨다운·페이즈·패시브 상태 등을 다시 시작하는 일입니다. NPC 체력을 자동으로 최대치로 채우거나 월드 위치를 시작점으로 되돌리는 기능으로 이해하면 안 됩니다.

## 6. 접근하지만 공격하지 않을 때

1. NPC가 원하는 타겟을 잡았는지 봅니다.
2. 패턴 Enabled와 현재 페이즈 범위를 확인합니다.
3. 타겟과의 수평 거리가 Min Range~Max Range에 있는지 봅니다.
4. Max Vertical과 시야 조건을 확인합니다.
5. 실제 타격 범위와 Approach Distance를 비교합니다.
6. 쿨다운과 반복 점수 페널티 때문에 후보가 없는지 확인합니다.
7. NPC 이동 속도·AI 정지 설정·막힌 통로를 확인합니다.

원거리 주문이 없는 근접 NPC는 멀리 있는 타겟까지 접근할 수 있는 길이 필요합니다. 애니메이션만 달리는 모습과 실제 좌표 이동은 별개입니다.

## 순찰과 전투 이동

기존 CustomNPCs의 대기·순찰 경로는 CustomNPCs에서 설정합니다. BattleWorks의 순환 이동 Orbit은 공격 단계에서 타겟 주위를 도는 동작이며 월드 순찰 경로 편집기가 아닙니다.

다음은 [걷기·대시·순간이동](#mob-editor/battleworks-movement)입니다.

---
title: 걷기·대시·순간이동 만들기
slug: battleworks-movement
order: 245
description: NPC 이동과 타겟 이동을 구분하고 시간·방향·정지 규칙을 실습합니다.
product: mob-editor
section: authoring
category: BattleWorks
status: 사용 안내
version: 0.1.3
audience: 입문자와 전투 콘텐츠 제작자
tags:
  - battleworks
  - combat
---

## 먼저 무엇을 움직일지 정하기

| 만들 동작 | 선택할 기능 |
| --- | --- |
| 공격 사이 플레이어에게 접근 | Combat Rules의 Chase Target |
| 준비 중 조금 접근하거나 후퇴 | 단계 Movement의 Toward / Away |
| 정해진 시점에 걷기·대시·순간이동 | 타임라인 Movement 액션 |
| 플레이어를 NPC 쪽으로 끌기 | Pull Target |
| 타겟을 보스 앞 또는 월드 좌표로 이동 | Move Target Relative / Absolute |
| 저장한 위치로 이동 | [고급 액션의 Saved Position](#mob-editor/battleworks-advanced-actions) |

## 1. 가장 쉬운 후퇴부터 만들기

1. 새 패턴을 추가하고 이름을 “짧은 후퇴”로 정합니다.
2. Core의 Min Range `0`, Max Range `3`, Mobility On으로 시작합니다.
3. Windup `6틱`, Action `12틱`, Recovery `12틱`을 정합니다.
4. Action의 Stop Horizontal을 끄고 Movement를 **Away**, Speed를 `0.08`로 둡니다.
5. 준비·회복 단계는 Hold로 둡니다.
6. 피해 액션은 넣지 않고 이동부터 시험합니다.
7. 저장·적용 후 가까이 접근했을 때 후퇴하고 추적으로 돌아오는지 확인합니다.

Mobility는 Manager가 “이동 패턴을 사용했다”고 기록할 표시입니다. 스위치만 켠다고 자동으로 이동 액션이 생기지는 않습니다.

## 2. 세 가지 이동 액션의 차이

| 이동 | 동작 | 값의 의미 |
| --- | --- | --- |
| Walk | 시작 시 계산한 목적지까지 길찾기로 이동 | Speed는 이동 속성 배율, Distance는 목적지 거리 |
| Impulse Dash / 물리 대시 | 시작할 때 한 번 속도를 부여 | Speed는 수평 추진력, Vertical Power는 수직 추진력 |
| Teleport | 목적지 검사를 통과하면 즉시 이동 | Direction과 Distance로 목적지 계산 |

앞·뒤·왼쪽·오른쪽은 **시작 당시 NPC 방향**, Toward / Away는 **시작 당시 타겟 위치**를 기준으로 합니다. Walk 목적지와 물리 대시 방향은 시작 후 플레이어를 계속 따라 바뀌지 않습니다.

기존 단계 이동의 `dash`는 매 틱 속도를 갱신하는 지속 이동입니다. 한 번 힘을 주는 `impulse_dash`와 구분하세요.

## 3. 물리 대시 실습

1. 새 패턴에 Windup `12`, Action `24`, Recovery `16`을 줍니다.
2. Action 0틱에 **Movement** 액션을 추가합니다.
3. Movement Type을 **Impulse Dash**, Direction을 **Toward**로 고릅니다.
4. Speed `0.6`, Vertical Power `0.1`, Duration `12틱`으로 시작합니다.
5. 처음에는 Hitbox 없이 이동 방향과 거리를 확인합니다.
6. 필요하면 Action 12틱에 **Hold** 액션을 넣어 명시적으로 이동을 끝냅니다.
7. 이동이 안정되면 별도 Hitbox 액션을 타격할 틱에 추가합니다.

다음은 **이벤트 한 개의 JSON 참고**입니다. 전투 문서 전체가 아닙니다.

```json
{
  "id": "dash_start",
  "at": 0,
  "interval": 0,
  "count": 1,
  "chancePercent": 100,
  "actions": [
    {
      "type": "dochi_battleworks:movement",
      "chancePercent": 100,
      "params": {
        "movementType": "impulse_dash",
        "direction": "toward",
        "speed": 0.6,
        "verticalPower": 0.1,
        "durationTicks": 12
      }
    }
  ]
}
```

Duration은 **이동 제어권 유지 시간**입니다. 정확히 몇 블록 날아가거나 그 시간 내내 공중에 있는 것을 보장하지 않습니다. 중력·마찰·충돌 영향을 받으며, 대시 자체에는 피해가 없습니다.

## 4. 움직임이 겹치지 않게 하기

- 새 Movement 액션을 시작하면 기존 전용 이동을 교체합니다.
- 타임라인 이동은 단계의 일반 정지·추적보다 우선할 수 있습니다.
- 명시적인 Hold 액션은 전용 이동을 취소합니다.
- Duration이 남아 있으면 단계 경계를 넘어 계속 움직일 수 있습니다.
- 패턴 종료 뒤에도 이동 제어가 남아 있으면 다음 패턴 선택이 기다릴 수 있습니다.
- 반복 이벤트에 이동을 넣으면 반복할 때마다 새 이동이 시작됩니다.

처음에는 이동 Duration을 해당 단계 안에 끝나도록 맞추고, 의도적으로 넘어가게 할 때만 늘립니다.

## 5. NPC 순간이동 시험하기

1. 평평하고 로드된 공간에서 Teleport를 선택합니다.
2. Direction을 Back, Distance를 `3` 정도로 둡니다.
3. NPC 뒤에 공간이 있을 때 이동하는지 봅니다.
4. 뒤쪽이 벽·물·낭떠러지일 때 실패 동작을 확인합니다.

NPC Teleport는 착지 지면을 찾고 경계·로드·충돌·액체 조건을 검사합니다. 실패하면 원래 위치에 남습니다. 단순히 Distance 값을 줬다고 어떤 지형이든 통과해 지정 좌표에 도착하는 것은 아닙니다.

## 6. 플레이어를 끌어당기기

Pull Target는 현재 타겟의 속도에 매 틱 힘을 더합니다. 좌표 순간이동이 아닙니다.

1. 타겟이 필요한 패턴에 Pull Target를 추가합니다.
2. Strength `0.08`, Duration `40틱`으로 시작합니다.
3. 생존 플레이어가 약 2초 동안 끌리는지 시험합니다.
4. 너무 강하면 Strength부터 낮춥니다. `0.03~0.12` 정도에서 천천히 비교합니다.
5. 벽·높이 차이·기존 넉백과 함께 시험합니다.

힘이 누적되므로 큰 Strength는 매우 거친 이동을 만듭니다. 끌기가 끝나도 남은 속도는 자연 물리로 줄어듭니다. 새 끌기는 기존 세션을 교체하며, 보스·타겟 사망이나 차원 변경·전투 중단 등으로 끝날 수 있습니다.

## 7. 타겟을 정확한 좌표로 옮기기

| 액션 | 입력 | 기준 |
| --- | --- | --- |
| Move Target Relative | Offset X / Y / Z | 실행 순간 보스 발 위치와 방향 |
| Move Target Absolute | X / Y / Z | 월드 절대 좌표 |

Relative의 `X=0, Y=0, Z=3`은 타겟의 발을 **보스 앞 3블록**에 놓습니다. +X는 왼쪽, +Y는 위, +Z는 앞입니다.

이 두 액션은 **같은 차원 안에서 정확한 좌표 이동**을 합니다. NPC Teleport와 달리 아래쪽 착지 지면을 찾지 않습니다. Y를 공중에 잡으면 공중으로 이동합니다. 로드된 청크·월드 경계·차원 높이·충돌 조건을 통과해야 하며, 실패 로그는 `Battleworks target movement rejected`입니다.

좌표 이동이 기존 Pull Target를 자동 취소하지는 않습니다. 이동 후 다시 끌려오는 전투라면 남아 있는 끌기 시간을 확인하세요.

## 실제 확인할 항목

평지 → 벽 앞 → 모서리 → 계단 → 높이 차이 순으로 시험합니다. Simulation의 평평한 바닥 미리보기만으로 길찾기, 실제 충돌, 착지 성공을 판정하지 마세요.

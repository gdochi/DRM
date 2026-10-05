---
title: 위치 저장·투사체·소환·조건
slug: battleworks-advanced-actions
order: 276
description: 이전 위치 지연 공격과 관리형 투사체·소환·상태 조건을 순서대로 구성합니다.
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

## 먼저 기본 공격을 완성하세요

이 페이지는 [두 페이즈 보스 실습](#mob-editor/battleworks-encounters) 다음 단계입니다. 한 번에 기능 하나를 추가하고 성공한 파일을 별도로 보관합니다.

액션 추가는 상위 분류 → 하위 액션 순서입니다. 구체적인 값은 선택한 액션의 속성과 Modifiers에서 확인합니다. JSON 키는 직접 편집할 때 참고용입니다.

## 1. 플레이어가 있던 자리에 지연 공격하기

현재 Target를 계속 기준으로 쓰면 예고가 플레이어를 따라 움직일 수 있습니다. 피할 수 있는 장판을 만들려면 **먼저 위치를 저장**합니다.

1. Hitbox Library에 `warning_blast`라는 Cylinder를 만듭니다. Radius `2.4`, Height `3`, Damage `4`로 시작합니다.
2. 새 패턴을 만들고 Windup `40`, Action `10`, Recovery `20`으로 둡니다.
3. Windup 0틱에 **Save Position** 액션을 추가합니다.
4. Position ID를 `blast_spot`, Source를 Target, Mode를 Exact로 둡니다.
5. Windup 1틱에 **Particle Shape**를 추가합니다.
6. Origin을 Saved position, Position ID를 `blast_spot`로 맞춥니다.
7. Ring·Radius `2.4`·Sample points `24`·Particle `minecraft:end_rod`로 예고합니다. 필요하면 반복 간격과 횟수를 Windup 안에 배치합니다.
8. Action 0틱에 **Hitbox At Position**을 추가합니다.
9. Hitbox는 `warning_blast`, Position ID는 `blast_spot`를 선택합니다.
10. 두 단계의 애니메이션은 의도에 맞게 지정하거나 명시적인 None으로 둡니다.

**완료 확인:** 예고가 시작된 뒤 옆으로 이동해도 원래 자리에 판정이 발생합니다. 저장 위치 판정은 저장한 앵커를 중심으로 사용하므로 일반 NPC Hitbox의 몸 중앙 보정과 같다고 가정하지 말고 높이를 시험합니다.

## 2. 위치 이름 관리하기

| 액션 | 역할 |
| --- | --- |
| save_position | Caster 또는 Target 위치를 이름으로 기록 |
| hitbox_at_position | 저장 위치에서 재사용 히트박스 실행 |
| move_to_position | Caster 또는 Target를 저장 위치로 이동 |
| clear_position | 이름 하나 또는 전체 위치 기록 삭제 |

같은 Position ID를 다시 저장하면 그 위치 기록을 갱신합니다. 다음 공격까지 옛 기록을 사용하지 않도록 저장·사용·정리 순서를 명확히 합니다. 위치는 전투 상태에 속하며 전투 초기화 때 사라집니다. 현재 최대 32개를 저장할 수 있습니다.

Random Ring / Random Box는 무작위 위치를 구하는 방식입니다. Safe는 로드·경계·높이·충돌을 확인하며 주변 높이를 탐색할 수 있지만, 반드시 발밑 지지 블록이 있는 지상 착지를 보장하는 옵션은 아닙니다. 이동 목적지는 실제 월드에서 시험합니다.

## 3. 관리형 투사체 한 개부터 발사하기

1. **Spawn Projectile**을 추가합니다.
2. 우선 기본값으로 제공되는 `minecraft:snowball`을 사용해 연결을 확인합니다.
3. Group ID를 `training_shots`, Count를 `1`로 둡니다.
4. Spawn At은 Caster, Direction은 Target로 시작합니다.
5. Speed `0.5`, Damage `2`, Lifetime `60틱`처럼 작은 값으로 시험합니다.
6. 한 개의 생성·이동·명중·정리를 확인한 뒤 Count를 늘립니다.

| 값 | 의미 |
| --- | --- |
| Group ID | 나중에 함께 발사·제거할 묶음 이름 |
| Pattern: Fan / Radial | 발사 방향 배열 |
| Placement: Point / Line / Ring / Arc / Grid | 생성 위치 배열 |
| Hold Ticks | 자동 발사 전에 대기하는 시간 |
| Lifetime Ticks | 최대 유지 시간 |
| Hit Radius | 관리형 충돌 판정 크기 |
| Trail Particle | 이동 흔적용 실제 파티클 ID |

외부 엔티티는 등록 ID가 있다고 모두 이 방식으로 생성 가능한 것은 아닙니다. 특수 주문은 별도 생성 로직을 요구할 수 있습니다. 복잡한 마법은 먼저 실제 Skill 연동을 사용하세요.

## 4. 떠 있는 탄을 나중에 함께 발사하기

1. Spawn Projectile의 Group ID를 `training_shots`로 통일합니다.
2. Hold Ticks를 `40`으로 둡니다.
3. 같은 패턴의 20틱 뒤에 **Release Projectiles**를 추가합니다.
4. 동일 Group ID를 입력합니다.
5. 연출 종료 시 **Remove Projectiles**로 남은 같은 그룹을 제거합니다.

자동 발사까지 기다릴지, 중간에 Release로 당겨 발사할지 결정합니다. 한 액션 최대 64개, 시전자당 살아 있는 관리형 투사체 최대 128개입니다. 처음부터 상한까지 생성하지 말고 적은 수로 명중과 프레임을 확인합니다.

Item ID로 아이템 외형을 사용하는 구성은 습득용 전리품과 구분됩니다. 전리품은 CustomNPCs 드롭 설정에서 별도로 준비합니다.

## 5. CustomNPC 클론 소환하기

1. CustomNPCs의 클론 도구로 실제 사용할 NPC를 먼저 저장합니다.
2. 저장한 **탭 번호와 정확한 클론 이름**을 기록합니다.
3. BattleWorks에 **Summon Clone** 액션을 추가합니다.
4. Clone Tab / Clone Name을 그 값으로 입력합니다.
5. Group ID를 `guards`, Count를 `1`로 둡니다.
6. 소환 위치와 Lifetime을 설정합니다.
7. 필요하면 실제 존재하는 자식 전투 파일을 Battlework File에 연결합니다.
8. **Dismiss Summons**에 같은 Group ID를 입력하여 제거를 시험합니다.

클론 이름은 임의의 몹 ID가 아닙니다. 클론이 서버에 저장되어 있어야 합니다. 자식 전투 파일도 `mobs/patterns` 기준의 상대 경로입니다.

소환수는 부모 기준으로 관리되며 현재 타겟을 이어받도록 설정할 수 있습니다. 한 액션 최대 32명, 부모당 관리형 소환수 최대 64명입니다. 소환수가 다시 같은 소환 패턴을 무제한 반복하지 않도록 자식 파일을 별도로 점검합니다.

## 6. 조건으로 후속 행동 제한하기

패턴·이벤트의 Conditions를 사용하면 체력, 페이즈, 저장 위치, 소환 수, 액션 성공 여부 등을 확인할 수 있습니다. 조건 여러 개는 모두 만족해야 실행됩니다. 직접 JSON을 수정할 때는 예를 들어 이벤트의 conditions 배열에 다음을 넣을 수 있습니다.

```json
[
  {
    "type": "position_exists",
    "key": "blast_spot",
    "operator": "eq",
    "value": 1
  }
]
```

이것은 **조건 배열 조각**입니다. 전투 문서 전체로 저장하지 않습니다. position_exists는 위치 존재 여부를 검사하며 숫자 비교용 조건의 operator / value와 사용 방식이 다릅니다.

| 종류 | 사용할 때 |
| --- | --- |
| boss_health / target_health | 체력 비율 비교 |
| missing_boss_health | 잃은 체력 비율 비교 |
| summon_count / projectile_count | key에 지정한 그룹의 개수 확인 |
| position_exists | 저장 위치 존재 확인 |
| state | Set State로 저장한 숫자 비교 |
| action_succeeded / action_failed | 이름 붙여 저장한 액션 결과 확인 |
| skill_available | 해당 스킬 제공 여부 확인. 시전 성공 보장은 아님 |
| target_distance / target_vertical | 거리·높이 조건 |
| phase / on_ground / random | 페이즈·접지·확률 조건 |

숫자 비교는 eq, neq, gt, gte, lt, lte를 사용합니다. 체력 50%는 JSON에서 0.5입니다. `negate`는 조건 결과를 뒤집습니다.

## 7. 전투 상태 값과 NPC 능력치

**Set State**는 전투 중 숫자 기록을 만들고 Set / Add / Multiply / Random / Clear로 갱신합니다. “충전 3회 후 특수 공격” 같은 설계에 사용할 수 있습니다. 플레이어 영구 저장값이나 CustomNPCs storeddata와 같은 저장소가 아닙니다.

고급 JSON의 `npcStats.enabled`를 켜면 최대 체력, 이동 속도, 페이즈별 이동 속도, 추적 속성 범위, 전투·비전투 초당 회복을 BattleWorks에서 지정할 수 있습니다. 기본은 꺼짐입니다. 체력·속도·추적 범위의 0은 기존 속성에 새 값을 적용하지 않는 의미이고, 회복값 0은 해당 자동 회복을 하지 않는 의미입니다.

첫 실습은 CustomNPCs에서 기본 능력치를 준비합니다. 외부 보스를 가져온 뒤 체력이나 속도가 예상과 다르면 `npcStats`가 켜져 있는지 함께 확인하세요.

## 8. 상태·제어 액션도 한 가지씩 시험하기

Heal은 NPC 자신을 회복하고, Apply Effect는 Self / Target에 실제 효과를 적용합니다. Ignite는 타겟에 불을 붙이며, Launch / Tether는 타겟 이동 제어에 사용됩니다. Cancel Skill / Cancel Tether는 진행 중인 해당 제어를 끝낼 때 사용합니다.

Shield Punish는 현재 바닐라 방패 사용 조건에서 쿨다운 또는 파괴를 요청하는 고급 기능입니다. 일반 패링 스위치로 취급하지 마세요. 장비에 영향을 주는 동작은 의도한 확률·대상·실행 횟수를 별도 연습 NPC에서 확인합니다.

고급 기능을 추가한 뒤에는 [문제 해결 순서](#mob-editor/battleworks-troubleshooting)에 따라 원본과 비교합니다.

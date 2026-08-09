---
title: 무기, 스탠스, 전술 AI
slug: tacz-weapons-ai
order: 330
description: 총기 스탠스, 이동, 인식, 무기 풀, 근접 전환을 설정하는 방법입니다.
product: cnpc-tacz-fire
category: 전투 AI
section: combat-ai
status: Draft
version: 0.2.3
audience: 총기 NPC 제작자
tags:
  - weapon
  - stance
  - ai
---

## 스탠스 모드

`Stance`는 관리 중인 NPC가 어떤 전투 형태를 사용할지 정합니다.

| 스탠스 | 동작 |
| --- | --- |
| `Idle` | 브리지 전투를 멈추고 관리 무기를 숨깁니다. |
| `Ranged` | 관리되는 TACZ 원거리 무기만 사용합니다. |
| `Melee` | 저장된 근접 무기만 사용합니다. |
| `Auto` | 거리에 따라 원거리와 근접을 전환합니다. 대기 중에도 원거리 무기가 보입니다. |
| `Auto Hidden` | 전투 중에만 전환하고, 전투 밖에서는 빈손으로 둡니다. |

`Stance Mode: General`은 일반 스탠스 설정을 사용합니다. `Stance Mode: Advanced`는 `Always`, 체력 비율 이하, 타겟 엔티티, 타겟 팩션, 타겟 태그 같은 조건 1개를 적용합니다. `Always`와 체력 조건은 현재 전투 타겟이 없어도 판정되며, 타겟 엔티티·팩션·태그 조건만 살아 있는 타겟을 요구합니다. Advanced 모드는 충돌을 피하기 위해 활성 조건을 하나로 제한합니다.

## 사격 설정

| 설정 | 실제 의미 |
| --- | --- |
| `Max Distance` | TACZ 원거리 사격의 최대 타겟 거리입니다. 이보다 먼 타겟은 애드온이 무시합니다. |
| `Melee Switch Range` | `Auto` 스탠스에서 근접으로 전환하는 거리입니다. 실제 명중 거리는 CustomNPCs 근접 범위를 따릅니다. |
| `RPM Mode` | `TACZ Native`, `Fixed`, `Random Range` 중 하나를 선택합니다. 선택한 모드에 필요한 값만 표시됩니다. |
| `Fixed RPM` | `RPM Mode: Fixed`에서 사용할 고정 목표 사격 속도입니다. |
| `RPM Min`과 `RPM Max` | `RPM Mode: Random Range`에서 사용할 목표 RPM 범위입니다. |
| `Fixed Accuracy %` | `Accuracy Ramp`가 꺼졌을 때 계속 사용하는 명중률입니다. `100`은 추가 조준 오차가 없습니다. |
| `Ramp Start Accuracy %` | `Accuracy Ramp`가 켜졌을 때 시작 명중률입니다. |
| `Ramp Max Accuracy %` | 조건을 계속 만족했을 때 도달할 최대 명중률입니다. 시작값보다 커야 합니다. |
| `Ramp Time Ms` | 시작 명중률에서 최대 명중률까지 필요한 누적 추적 시간입니다. |
| `Ramp Max Range` | 이 거리 안에서만 명중률 상승 시간이 누적됩니다. |
| `Min Target Speed` | 명중률 상승을 진행시킬 플레이어의 최소 수평 이동 속도입니다. |
| `Burst Minimum Shots` / `Burst Maximum Shots` | 애드온 버스트마다 포함 범위에서 발사 수를 새로 선택합니다. 두 값을 같게 하면 고정 길이가 됩니다. |

`Accuracy Ramp`는 보이는 이동 플레이어가 설정 거리 안에 있고 최소 속도 이상으로 움직일 때만 진행됩니다. 플레이어가 멈추거나 범위를 벗어나면 진행 시간이 멈추고, 타겟이나 활성 General/Advanced 설정이 바뀌면 처음부터 다시 계산합니다. General과 Advanced는 서로 다른 명중률 상승 값을 가질 수 있습니다.

처음에는 `RPM Mode: TACZ Native`와 고정 명중률로 시작하세요. 총기, 타겟, 시야, 탄약 루프가 안정된 뒤 랜덤 RPM, 버스트 범위, 명중률 상승을 하나씩 추가하는 편이 좋습니다.

## 피해 정책

0.2.0에서는 총기와 근접 공격의 피해 계산을 NPC별로 선택할 수 있습니다.

| 위치 | 정책 |
| --- | --- |
| `Gun` | `Gun Spec`은 선택한 TACZ 총기의 기본 탄환 피해를 유지합니다. `Custom`은 총기 원본 데이터를 바꾸지 않고 이 NPC의 관리 탄환에 고정 피해를 적용합니다. |
| `Melee` | `Weapon Spec`은 선택한 아이템의 공격 능력치를 사용합니다. `Custom`은 고정 근접 피해를 사용합니다. |
| `Melee` | 넉백과 공격 속도도 무기 능력치 또는 고정 사용자 값으로 각각 선택할 수 있습니다. 공격 속도 사용자 값의 단위는 초당 공격 횟수입니다. |

관리되는 근접 공격에서는 CustomNPCs 기본 근접 피해가 이 정책을 덮어쓰지 않습니다. 먼저 무기 기본값으로 정상 동작을 확인한 뒤 사용자 값을 적용하세요.

## Better Combat 호환

0.2.1의 `Melee`에는 NPC별 `Better Combat Compatibility` 토글이 있습니다. Better Combat이 설치되어 있으면 기본적으로 켜지며, 설치되어 있지 않으면 토글을 사용할 수 없습니다.

토글이 켜진 NPC는 들고 있는 아이템의 Better Combat 등록 공격 세트와 무기 포즈를 해석합니다. 콤보 순서, 공격 조건, 양손 사용 조건, 아이템 변환도 해당 무기의 등록 정보를 따르며, 공격 간격과 피해 타이밍은 손에 든 아이템의 유효 `ATTACK_SPEED`를 기준으로 계산됩니다. 이때 근접 공격 속도 정책은 `Weapon Spec (locked)`로 표시되고 사용자 공격 속도는 적용되지 않습니다. 사용자 공격 속도가 필요하면 이 토글을 끄세요.

클라이언트에서 정확한 Better Combat NPC 모션을 재생하려면 Better Combat과 Mob Player Animator가 필요합니다. Mob Player Animator가 없거나 해당 무기의 등록 모션을 재생할 수 없으면 애드온은 임의의 대체 동작을 만들지 않고 바닐라 주손 스윙을 사용합니다.

## 전술 이동

`Tactical Move`는 원거리 전투 중 애드온이 NPC 이동을 어떻게 조정할지 정합니다.

| 모드 | 사용 예 |
| --- | --- |
| `Hold` | 고정 경비, 포탑형 NPC, 저격수, 보스 페이즈 |
| `Spread` | 주변 아군과 거리를 벌리는 분대 |
| `Compact` | 흩어지지 않고 다시 모이는 분대 |
| `Advance` | 타겟에게 압박해 들어가는 돌격 NPC |
| `Retreat` | 거리를 벌리는 방어형 NPC |

`Engagement`는 타겟 거리 기준 동작을 추가합니다. `Hold`는 거리 때문에 재배치하지 않고, `Advance`는 `Approach Distance`까지 접근하며, `Retreat`는 `Retreat Distance`까지 물러납니다.

자주 쓰는 이동 토글은 `Move While Firing`, `Retreat Fire`, `Keep Distance Fire`입니다. `Keep Distance Fire`는 선호 거리를 유지하려 하지만 원거리 전용이며 근접 전환을 사용하지 않습니다.

`Reposition Minimum Ms`와 `Reposition Maximum Ms`는 한 전술 이동 계획을 얼마나 유지한 뒤 다시 판단할지 정합니다. NPC는 새 계획마다 두 값 사이의 시간을 다시 선택합니다. General과 Advanced에서 서로 다른 범위를 설정할 수 있습니다.

`Suppressive Fire`는 숨은 타겟을 추적하는 기능이 아닙니다. 전투 중 시야를 잃으면 NPC가 실제로 마지막으로 본 위치에만 `Suppression Time Ms` 동안 TACZ 탄환을 발사할 수 있습니다. 숨은 타겟의 현재 위치를 따라가지 않으며 일반 총기 상태와 탄약을 그대로 소모합니다. `Post-Fire Watch Ms`를 사용하면 사격이 끝난 뒤에도 정해진 시간 동안 같은 지점을 조준하지만 탄약은 더 쓰지 않습니다.

## 인식과 대기 제어

인식 설정은 NPC가 언제 전투에 들어갈 수 있는지 결정합니다.

| 설정 | 의미 |
| --- | --- |
| `Detect Distance` | 대기 중인 NPC가 보이는 타겟을 처음 감지하는 거리입니다. 사격 거리와 다릅니다. |
| `Detect Angle` | 수평 감지 각도입니다. `360`이면 모든 방향에서 감지할 수 있습니다. |
| `Combat Delay Ms` | 감지한 타겟을 확정 전투로 보기 전까지 지켜보는 시간입니다. |
| `Instant Combat Angle` | 지연 없이 바로 전투에 들어갈 수 있는 전방 각도입니다. |
| `Close Detection` | 켜면 `Close Detect Distance` 안의 타겟은 수평 감지 각도를 무시하고 인식할 수 있습니다. 암살·백스탭형 NPC는 끄는 편이 맞습니다. |

`Sound Detection`은 플레이어의 TACZ 총성, TACZ 재장전, 블록 파괴, 블록 설치 이벤트를 각각 설정한 거리에서 감지합니다. 각 소리 범위는 `Detect Distance`를 넘지 못하며, 크리에이티브·관전자 플레이어는 자극을 만들지 않습니다. 반응 방식은 `Off`, `Look Only`, `Move To Source`입니다. 전투가 시작되면 조사는 전투에 양보하고, 위치 고정 스탠스에서는 `Move To Source`도 바라보기만 수행합니다.

`Faction Defense`를 켜면 피해를 받은 TACZ Fire NPC가 `Faction Alert Radius` 안의 같은 팩션 TACZ Fire 아군에게 공격자를 알립니다. 지원 NPC는 공격자를 아직 직접 보지 못해도 도우러 이동할 수 있지만, 발사 직전에는 여전히 최종 시야가 필요합니다. 용병의 소유자 공격 허용 횟수와 우호 타겟 검증도 유지되므로 팩션 방어가 계약·타겟 규칙을 우회하지 않습니다.

대기 이동은 `Stationary`, `Area Patrol`, `Return Only`, `Route Patrol` 네 가지입니다. Area/Route 순찰은 GUI의 `Default Walk Speed`를 사용하며 유효한 A* 경로를 유지합니다. 막힌 지점으로 직진하지 않고, 도달할 수 없는 경로는 제한된 횟수만 재시도한 뒤 다음 지점으로 넘어갑니다. 순찰 좌표는 주변의 설 수 있는 지면 높이로 보정되므로 한 블록 아래 지점도 수직 도달 판정에 포함됩니다.

## 비전투 총기 포즈

`Non-Combat Weapon Pose`는 원거리 무기를 든 NPC의 평시 자세를 정합니다.

| 포즈 | 동작 |
| --- | --- |
| `TACZ Default (Custom Off)` | 사용자 평시 포즈를 끄고 TACZ 기본 표현에 맡깁니다. |
| `Low Ready` | 총구를 낮춘 경계 자세를 사용합니다. |
| `High Ready` | 총을 위쪽으로 든 경계 자세를 사용합니다. |
| `Aim Ready` | 평시에도 조준 준비 자세를 사용합니다. |
| `Custom Pose` | `CTF Pose Core`로 저장한 포즈 JSON을 사용합니다. |

Low Ready와 High Ready는 정지 중뿐 아니라 Area/Route 순찰과 귀환 이동 중에도 유지됩니다. 기본 행동 연결에서는 타겟을 감지하거나 전투가 시작되면 TACZ 조준·사격·재장전 동작에 제어를 넘깁니다. 더 세밀한 행동별 연결은 `Pose` 카테고리에서 설정합니다.

## 무기와 외형 풀

`Gun`은 플레이어 인벤토리의 TACZ 총기 스택을 읽습니다. 선택한 총기를 바로 저장하거나 여러 총기를 랜덤 무기 풀에 넣을 수 있습니다. 풀 굴림은 리스폰, 청크 로드 초기화, 클론 복원, 소울스톤 복원 같은 CustomNPCs init 이벤트에서 실행될 수 있습니다.

`Melee`는 플레이어 인벤토리의 비 TACZ 아이템을 읽습니다. Better Combat 연동은 단일 애니메이션 ID를 대신 저장하는 방식이 아니라, 실제 공격 시 들고 있는 무기에 등록된 공격 세트와 포즈를 해석합니다. 근접 가능한 설정에서는 빈손 근접 공격도 지원됩니다.

`Visual & FX`는 CustomNPCs 텍스처 경로와 각 항목의 `Steve` 또는 `Alex` 모델을 스킨 풀로 저장합니다. 텍스처 자체는 수정하지 않습니다. `Armor`는 실제 머리, 몸통, 다리, 발 방어구 슬롯을 사용하는 전체 방어구 세트를 저장합니다. Gun, Melee, Armor 화면의 미리보기는 선택한 모델, 스킨, 방어구와 무기를 함께 표시합니다.

0.2.1에서는 무기·스킨·방어구 풀의 확률 입력란이 각 항목 행에 표시됩니다. 한 확률을 수정해도 다른 항목은 재분배되지 않으며, 저장하려면 여러 항목의 합계를 `100%`로 맞춰야 합니다. `Equalize`는 사용자가 눌렀을 때만 전체 항목을 균등 분배하고, 항목이 하나면 `100%`로 고정합니다. 방어구 풀은 한 번에 최대 5행을 보여 주며 마우스 휠이나 내부 스크롤바로 나머지 항목을 탐색합니다.

## 밸런싱 순서

1. 총기 하나로 `Ranged` 또는 `Auto` 스탠스를 확인합니다.
2. `Max Distance`와 시야 동작을 조정합니다.
3. 고정 명중률과 `RPM Mode: TACZ Native`를 조정합니다.
4. 총기·근접 피해 정책을 조정합니다.
5. `Move While Firing` 또는 전술 이동을 추가합니다.
6. 근접 전환과 탄약 소진 전환을 추가합니다.
7. 랜덤 총기, 스킨, 방어구 풀을 추가합니다.
8. 일반 동작이 안정된 뒤 버스트 범위, 명중률 상승, 랜덤 재배치 간격을 추가합니다.
9. Advanced 스탠스 규칙을 추가합니다.
10. 일반 이동과 시야 동작을 확인한 뒤 제압 사격과 실험적 엄폐를 마지막에 추가합니다.

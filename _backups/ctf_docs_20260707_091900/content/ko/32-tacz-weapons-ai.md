---
title: 무기, 스탠스, 전술 AI
slug: tacz-weapons-ai
order: 330
description: 총기 스탠스, 이동, 인식, 무기 풀, 근접 전환을 설정하는 방법입니다.
product: cnpc-tacz-fire
category: 전투 AI
section: combat-ai
status: Draft
version: 0.1.9
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
| `Ranged` | 관리되는 TaCZ 원거리 무기만 사용합니다. |
| `Melee` | 저장된 근접 무기만 사용합니다. |
| `Auto` | 거리에 따라 원거리와 근접을 전환합니다. 대기 중에도 원거리 무기가 보입니다. |
| `Auto Hidden` | 전투 중에만 전환하고, 전투 밖에서는 빈손으로 둡니다. |

`Stance Mode: General`은 일반 스탠스 설정을 사용합니다. `Stance Mode: Advanced`는 체력 비율 이하, 타겟 엔티티, 타겟 팩션, 타겟 태그 같은 조건 1개를 적용합니다. Advanced 모드는 충돌을 피하기 위해 활성 조건을 하나로 제한합니다.

## 사격 설정

| 설정 | 실제 의미 |
| --- | --- |
| `Max Distance` | TaCZ 원거리 사격의 최대 타겟 거리입니다. 이보다 먼 타겟은 애드온이 무시합니다. |
| `Melee Switch Range` | `Auto` 스탠스에서 근접으로 전환하는 거리입니다. 실제 명중 거리는 CustomNPCs 근접 범위를 따릅니다. |
| `RPM Override` | 고정 목표 사격 속도입니다. `0`이면 선택한 TaCZ 총기의 기본 RPM을 사용합니다. |
| `RPM Min`과 `RPM Max` | 랜덤 목표 RPM 범위입니다. 활성화되면 고정 RPM보다 우선합니다. |
| `Accuracy %` | NPC 명중률입니다. `100`은 추가 조준 오차가 없고, 낮을수록 탄퍼짐이 생깁니다. |
| `Burst Fire` | 정해진 수의 탄을 묶어서 발사한 뒤 다음 버스트 전까지 쉽니다. |

처음에는 총기의 기본 RPM과 원하는 기준 명중률로 시작하세요. 총기, 타겟, 시야, 탄약 루프가 안정된 뒤 랜덤 RPM을 추가하는 편이 좋습니다.

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

## 인식과 대기 제어

인식 설정은 NPC가 언제 전투에 들어갈 수 있는지 결정합니다.

| 설정 | 의미 |
| --- | --- |
| `Detect Distance` | 대기 중인 NPC가 보이는 타겟을 처음 감지하는 거리입니다. 사격 거리와 다릅니다. |
| `Detect Angle` | 수평 감지 각도입니다. `360`이면 모든 방향에서 감지할 수 있습니다. |
| `Combat Delay Ms` | 감지한 타겟을 확정 전투로 보기 전까지 지켜보는 시간입니다. |
| `Instant Combat Angle` | 지연 없이 바로 전투에 들어갈 수 있는 전방 각도입니다. |

대기 이동은 `Stationary`, `Area Patrol`, `Return Only`, `Route Patrol` 네 가지입니다. 소리 조사 방식은 `Off`, `Look Only`, `Move To Source`입니다. 잠입형 맵에서는 NPC가 뒤에서 맞았거나 소리를 들었을 때 즉시 발사하지 않고 경계하도록 만드는 데 유용합니다.

## 무기와 외형 풀

`Gun`은 플레이어 인벤토리의 TaCZ 총기 스택을 읽습니다. 선택한 총기를 바로 저장하거나 여러 총기를 랜덤 무기 풀에 넣을 수 있습니다. 풀 굴림은 리스폰, 청크 로드 초기화, 클론 복원, 소울스톤 복원 같은 CustomNPCs init 이벤트에서 실행될 수 있습니다.

`Melee`는 플레이어 인벤토리의 비 TaCZ 아이템을 읽습니다. Better Combat 지원이 가능하면 선택한 근접 아이템의 공격 애니메이션 ID를 감지할 수 있습니다. 근접 가능한 설정에서는 빈손 근접 공격도 지원됩니다.

`Visual`은 CustomNPCs 텍스처 경로를 스킨 풀로 저장합니다. `Armor`는 실제 머리, 몸통, 다리, 발 방어구 슬롯을 사용하는 전체 방어구 세트를 저장합니다.

## 밸런싱 순서

1. 총기 하나로 `Ranged` 또는 `Auto` 스탠스를 확인합니다.
2. `Max Distance`와 시야 동작을 조정합니다.
3. `Accuracy %`와 기본 RPM을 조정합니다.
4. `Move While Firing` 또는 전술 이동을 추가합니다.
5. 근접 전환을 추가합니다.
6. 랜덤 총기, 스킨, 방어구 풀을 추가합니다.
7. 일반 동작이 안정된 뒤 Advanced 스탠스 규칙을 추가합니다.

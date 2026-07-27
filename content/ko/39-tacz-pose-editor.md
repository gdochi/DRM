---
title: 포즈 편집과 행동 연결
slug: tacz-pose-editor
order: 332
description: CTF Pose Core로 포즈 JSON과 총기 위치를 만들고 NPC 행동별로 연결하는 방법입니다.
product: cnpc-tacz-fire
category: 포즈
section: combat-ai
status: Draft
version: 0.2.3
audience: NPC 제작자
tags:
  - pose
  - editor
  - TACZ
---

## 편집기와 런타임 구분

`CTF Pose Core`는 크리에이티브 모드 제작자가 사용하는 포즈 편집 도구입니다. 플레이어가 전투 중 여는 런타임 화면이 아닙니다. 편집기에서 포즈 JSON을 만든 뒤 `CTF Npc Core`의 `Pose` 카테고리에서 NPC 행동과 연결하면 게임 안 NPC에 적용됩니다.

현재 포즈 편집기는 Steve/Alex CustomNPCs 플레이어 모델을 지원합니다.

## 포즈 편집기 열기

1. 크리에이티브 모드에서 `CTF Pose Core`를 듭니다.
2. Steve 또는 Alex 모델을 쓰는 CustomNPCs NPC를 우클릭합니다.
3. NPC에서 12블록 안에 머물고 편집 중에는 코어를 주손이나 보조손에 계속 듭니다.
4. `NPC Pose Editor`에서 포즈를 수정합니다.

지원하지 않는 모델, 너무 먼 NPC, CustomNPCs가 아닌 엔티티는 편집할 수 없습니다.

## NPC 미리보기와 몸 파트

분리된 NPC 미리보기는 실제 편집 대상의 스킨, 방어구, 무기 상태를 확인하는 제작자 화면입니다. 드래그해서 돌리고 마우스 휠로 확대·축소할 수 있으며, `Walking Preview`로 걷는 동안 포즈가 어떻게 섞이는지 볼 수 있습니다.

편집 가능한 파트는 다음과 같습니다.

* Head
* Body
* Right Arm / Left Arm
* Right Leg / Left Leg
* Gun Render

몸 파트는 X, Y, Z 회전을 각각 조정합니다. 각 축의 모드는 다음 둘 중 하나입니다.

| 축 모드 | 의미 |
| --- | --- |
| `Animation` | TACZ 또는 플레이어 애니메이션이 계산한 축을 그대로 사용합니다. |
| `Custom` | 슬라이더의 사용자 회전값으로 해당 축을 덮어씁니다. |

머리 추적이나 걷는 다리처럼 계속 움직여야 하는 축은 `Animation`으로 두세요. 필요한 축만 `Custom`으로 바꾸면 기본 애니메이션을 유지하면서 자세를 조정할 수 있습니다.

## 총기 렌더 위치

`Gun Render`에서는 다음 값을 조정합니다.

| 값 | 용도 |
| --- | --- |
| Position X / Y / Z | 총기 표시 위치 |
| Pitch / Yaw / Roll | 총기 회전 |
| Scale X / Y / Z | 축별 총기 크기 |

`All Guns`는 모든 TACZ 총기에 쓰는 기본 변환입니다. `This Gun Only`는 편집 대상 NPC의 현재 TACZ 총기에만 별도 변환을 저장합니다. 특정 총기 변환이 있으면 전체 총기 변환보다 먼저 사용됩니다.

## 새 포즈, 불러오기, 저장

| 도구 | 동작 |
| --- | --- |
| `New` | 애니메이션을 상속하는 빈 포즈를 만듭니다. |
| `Use Low Ready Base` | Low Ready를 시작점으로 사용합니다. |
| `Use High Ready Base` | High Ready를 시작점으로 사용합니다. |
| `Load` | 저장된 포즈 JSON을 불러옵니다. |
| `Save` | 현재 이름의 JSON을 저장합니다. |
| `Save As` | 새 이름으로 저장합니다. 같은 이름은 한 번 더 눌러 덮어쓰기를 확인합니다. |
| `Save & Apply` | 저장한 뒤 현재 NPC의 사용자 평시 포즈로 적용합니다. |
| `Reset` | 저장하지 않은 전체 변경을 마지막 불러오기 또는 저장 상태로 되돌립니다. |
| 파트/값 되돌리기 | 선택한 파트 또는 값만 마지막 상태로 되돌립니다. |

포즈 파일은 서버의 다음 폴더에 저장됩니다.

```text
config/cnpc_tacz_fire/poses/
```

JSON을 직접 편집할 필요는 없습니다. 파일 구조는 외부 도구나 버전 관리가 필요한 제작자를 위한 참고 형식입니다.

## 행동별 포즈 연결

`CTF Npc Core > Pose`는 포즈를 만드는 화면이 아니라, 현재 NPC의 행동에 포즈를 연결하는 제작자 화면입니다.

| 그룹 | 행동 |
| --- | --- |
| Idle & Awareness | Idle - Standing, Idle - Walking, Alert |
| Ranged Combat | Combat Aim, Firing, Moving Fire |
| Combat Movement | Tactical Advance, Retreat, Reload |
| Equipment & Other Actions | Weapon Switch, Melee Ready, Melee Attack, Grenade Throw |

각 행동은 다음 소스 중 하나를 사용합니다.

| 소스 | 의미 |
| --- | --- |
| `Built-in` | `TACZ Default`, `Low Ready`, `High Ready`, `Aim Ready` 중 하나를 사용합니다. |
| `Inherit` | 연결된 상위 행동과 같은 포즈를 사용합니다. |
| `Custom JSON` | `config/cnpc_tacz_fire/poses/`에 저장된 포즈 프로필을 사용합니다. |

기본 연결은 평시 서기에 Low Ready를 사용하고, 평시 걷기와 Alert가 이를 상속합니다. 전투 조준·재장전·무기 전환·근접·수류탄은 기본적으로 TACZ 동작에 제어를 맡깁니다. 필요한 행동만 사용자 포즈로 바꾸는 것이 가장 안전한 시작 방법입니다.

## 권장 테스트 순서

1. Low Ready 또는 High Ready 템플릿으로 새 포즈를 만듭니다.
2. 팔과 몸통의 필요한 축만 바꾸고 머리와 다리는 가능한 한 `Animation`을 유지합니다.
3. `Walking Preview`에서 정지와 이동을 모두 확인합니다.
4. 총기 위치는 먼저 `All Guns`로 맞추고, 모양이 다른 총기만 `This Gun Only`로 보정합니다.
5. `Save & Apply` 후 게임 화면에서 평시 포즈를 확인합니다.
6. `CTF Npc Core > Pose`에서 행동 하나씩 연결하고 사격, 재장전, 이동, 근접 전환을 각각 테스트합니다.


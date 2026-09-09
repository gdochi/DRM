---
title: 재장전과 탄약 재고
slug: warfare-reload-ammo
order: 350
description: 지원 총기 공통 DW 탄약 재고, 원본 재장전 시간, 재생, 소진 전환, 재장전 이동을 설명합니다.
product: dochi-warfare
category: 탄약
section: ammo
status: Draft
version: 0.2.7
audience: 총기 NPC 제작자
tags:
  - reload
  - ammo
  - magazine
---

## 탄약 모델

도치 워페어는 관리 NPC가 여분 TACZ·PointBlank·SuperbWarfare 탄약이나 탄창 아이템을 오프핸드에 들게 만들지 않습니다. NPC는 지원되는 원본 총기를 사용하지만 예비 탄약은 DW 데이터로 표현합니다.

| 데이터 | 의미 |
| --- | --- |
| `Ammo Stock` | 이 NPC의 예비 탄 수입니다. `-1`은 무한, `0`은 비어 있음, 양수는 유한 예비 탄입니다. |
| `Ammo Stock Max` | 재생 후 최대 예비 탄 수입니다. `-1`은 제한 없음입니다. |
| `Ammo Regen Amount` | 재생 간격마다 회복되는 탄 수입니다. `0`이면 재생을 끕니다. |
| `Ammo Regen Interval Ms` | 재생 틱 사이 시간입니다. `0`이면 재생을 끕니다. |
| `Reload Duration Ms` | NPC가 재장전에 묶이는 시간입니다. `0`이면 운용 총기의 원본 빈 탄창/전술 재장전 시간을 사용합니다. |
| `Reload Speed Multiplier` | 재장전 중에만 적용되는 이동 속도 배율입니다. `0`은 재장전 중 이동 정지, `1`은 기본 속도 유지입니다. |

:::warning 오프핸드 탄약을 쓰지 마세요
NPC 탄약은 `Ammo Stock`, DW 재장전 상태, 운용 총기의 원본 스택 상태로 관리됩니다. NPC 재장전을 표현하려고 실제 탄약이나 탄창 아이템을 장착하지 마세요.
:::

## 메인 토글

| 토글 | 동작 |
| --- | --- |
| `Reload` | 총이 비었을 때 NPC가 재장전할 수 있게 합니다. |
| `Supply Ammo` | 재장전 지연 후 애드온 탄약 재고로 NPC 총기를 보급합니다. |

`Supply Ammo`가 OFF이면 애드온 예비 재고에서 총기를 채우지 않습니다. `Ammo Stock`이 `0`이면 재장전이 켜져 있어도 여분 탄약이 없습니다.

## 재장전 방식

| `Reload Type` | 동작 |
| --- | --- |
| `Normal` | 총이 비었을 때 재장전합니다. |
| `Force Fixed` | 성공한 사격 수가 `Force Shots`에 도달하면 탄이 남아 있어도 강제 재장전합니다. |
| `Force Range` | 재장전할 때마다 `Force Min`부터 `Force Max` 사이의 성공 사격 수를 다시 뽑고, 그 수에 도달하면 강제 재장전합니다. |

강제 재장전 카운터는 실제로 성공한 사격을 기준으로 합니다. 먼저 `Normal`로 총기 재장전 호환성을 확인한 뒤 전투 연출에 필요한 경우에만 강제 방식을 사용하세요.

## 탄약 소진 전환

`Ammo-Aware Switching`은 총기 안의 장전탄과 NPC의 예비 `Ammo Stock`이 모두 소진되었을 때만 작동합니다.

| 설정 | 동작 |
| --- | --- |
| `Fallback To Melee` | 설정된 근접 무기가 있으면 해당 무기로 전환해 전투를 계속합니다. |
| `Fallback To Unarmed` | 사용할 근접 무기가 없을 때 빈손 근접 전투를 허용합니다. |

Fallback 상태가 끝나고 탄약을 다시 사용할 수 있으면 NPC는 원거리 무기와 재장전 흐름으로 돌아갑니다. 이 기능을 사용하지 않으면 탄약이 완전히 소진된 NPC가 사격을 멈추는 것이 정상입니다.

## 타겟 상실 후 자동 재무장

`Auto Rearm After Target Loss`는 탄약 소진 fallback에 들어간 NPC가 타겟을 계속 잃은 뒤 다음 전투를 준비하게 하는 선택형 복구 기능입니다.

1. `Rearm Start Delay (Seconds)` 동안 타겟이 계속 없어야 합니다.
2. 타겟을 다시 획득하면 대기 중인 복구가 취소됩니다.
3. 지연이 끝난 뒤에도 설정된 재장전 시간이 추가로 적용됩니다.
4. 복구에 성공하면 관리 총기 어댑터와 원본 총기 스택 상태를 통해 탄창 하나를 가득 채웁니다.

이 기능은 `Ammo Stock`을 회복하지 않으며 실제 탄약 아이템도 만들지 않습니다. 무한 예비 탄약을 주지 않으면서 다음 교전을 준비시킬 때 사용하세요.

재장전 애니메이션은 상체와 하체 역할을 나눕니다. 상체는 관리 재장전 동작을 유지하고 하체는 NPC의 실제 걷기·달리기·웅크리기 상태를 계속 사용합니다. `Reload Speed Multiplier`는 이동 속도를 바꾸며, 하체를 하나의 고정 전신 포즈로 교체하지 않습니다.

## 권장 설정 흐름

1. `Ammo Stock: -1`로 시작합니다.
2. NPC가 발사하고, 재장전하고, 다시 발사하는지 확인합니다.
3. `Reload Type: Normal`에서 기본 루프가 작동한 뒤 `Ammo Stock`을 유한 값으로 바꿉니다.
4. 탄약이 `0`이 되었을 때 멈출지, 근접/빈손으로 전환할지 결정합니다.
5. 전투에 느린 보급이 필요하면 `Ammo Regen Amount`와 `Ammo Regen Interval Ms`를 추가합니다.
6. 들고 있는 총기의 기본 재장전 감각이 전투에 맞지 않을 때만 `Reload Duration Ms`를 조정합니다.
7. 재장전 중 빈틈을 만들고 싶으면 `Reload Speed Multiplier`를 사용합니다.
8. 마지막으로 `Force Fixed` 또는 `Force Range`를 추가합니다.
9. 탄약이 소진된 NPC가 교전 사이에 복구해야 할 때만 타겟 상실 재무장을 추가합니다.

이 순서로 하면 사격 문제와 탄약 경제 문제를 분리할 수 있습니다. 유한 탄약 NPC가 발사하지 않는다면 비었을 수 있지만, 무한 탄약 NPC가 발사하지 않는다면 총기, 타겟, 스탠스, 거리, 시야 문제일 가능성이 큽니다.

## RPM과 탄약 압박

`RPM Mode`, 랜덤 RPM 범위, 버스트 최소·최대 발사 수, 고정 명중률 또는 명중률 상승은 모두 탄약 압박을 바꿉니다. 높은 RPM의 유한 탄약 NPC는 예비 탄을 빠르게 소모할 수 있습니다. 명중률이 낮은 NPC는 연출은 좋아 보일 수 있지만 `Ammo Stock`이 제한되어 있으면 탄약을 낭비합니다.

밸런스는 아래 순서로 잡는 편이 좋습니다.

1. 무한 탄약과 `RPM Mode: TACZ Native`
2. 고정 명중률
3. 버스트 범위, 명중률 상승 또는 고정·랜덤 RPM
4. 유한 탄약 재고
5. 탄약 재생 또는 재장전 이동 페널티

## 스크립트와 storeddata 참고

GUI가 기본 설정 경로지만, 스크립트 사용자는 브리지 값을 다룰 수 있습니다. 공개 모드 ID는 `dochi_warfare`로 바뀌었지만 `tacznpcfire.*` storeddata 네임스페이스는 내부 호환 계약으로 유지됩니다.

| 키 | 의미 |
| --- | --- |
| `tacznpcfire.supplyAmmo` | 애드온 탄약 보급을 켜거나 끕니다. |
| `tacznpcfire.ammoStock` | `-1` 무한, `0` 비어 있음, 양수 유한 탄 수입니다. |
| `tacznpcfire.ammoStockMax` | 재생용 최대 재고입니다. |
| `tacznpcfire.ammoRegenAmount` | 간격마다 회복되는 탄 수입니다. |
| `tacznpcfire.ammoRegenIntervalMs` | 재생 간격 밀리초입니다. |
| `tacznpcfire.reloadDurationMs` | 재장전 시간 밀리초입니다. |
| `tacznpcfire.reloadWalkSpeedMultiplier` | 재장전 중에만 쓰는 이동 배율입니다. |
| `tacznpcfire.reloadType` | `0` Normal, `1` Force Fixed, `2` Force Range입니다. |
| `tacznpcfire.forceReload.shots` | Force Fixed의 성공 사격 수입니다. |
| `tacznpcfire.forceReload.minShots` / `maxShots` | Force Range의 포함형 최소·최대 성공 사격 수입니다. |
| `tacznpcfire.combat.ammoAwareSwitching` | 장전탄과 예비 탄약이 모두 소진됐을 때 전환 판단을 켭니다. |
| `tacznpcfire.combat.fallbackToMelee` | 탄약 소진 시 설정된 근접 무기 전환을 허용합니다. |
| `tacznpcfire.combat.fallbackToUnarmed` | 근접 무기가 없을 때 빈손 전환을 허용합니다. |

storeddata는 전투가 정말 스크립트 측 변경을 필요로 할 때만 사용하세요. 일반 NPC 제작에서는 다른 제작자가 GUI에서 바로 확인할 수 있도록 NPC별 GUI 값을 유지하는 편이 좋습니다.

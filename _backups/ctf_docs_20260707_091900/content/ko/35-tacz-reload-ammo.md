---
title: 재장전과 탄약 재고
slug: tacz-reload-ammo
order: 350
description: TaCZ Fire NPC의 탄약 재고, 재장전 시간, 재생, 재장전 중 이동 동작입니다.
product: cnpc-tacz-fire
category: 탄약
section: ammo
status: Draft
version: 0.1.9
audience: 총기 NPC 제작자
tags:
  - reload
  - ammo
  - magazine
---

## 탄약 모델

CNPC TaCZ Fire는 NPC가 여분 TaCZ 탄약이나 탄창 아이템을 오프핸드에 들게 만들지 않습니다. NPC는 실제 TaCZ 총기를 사용하지만 예비 탄약은 애드온 데이터로 표현합니다.

| 데이터 | 의미 |
| --- | --- |
| `Ammo Stock` | 이 NPC의 예비 탄 수입니다. `-1`은 무한, `0`은 비어 있음, 양수는 유한 예비 탄입니다. |
| `Ammo Stock Max` | 재생 후 최대 예비 탄 수입니다. `-1`은 제한 없음입니다. |
| `Ammo Regen Amount` | 재생 간격마다 회복되는 탄 수입니다. `0`이면 재생을 끕니다. |
| `Ammo Regen Interval Ms` | 재생 틱 사이 시간입니다. `0`이면 재생을 끕니다. |
| `Reload Duration Ms` | NPC가 재장전에 묶이는 시간입니다. `0`이면 들고 있는 TaCZ 총기의 기본 재장전 시간을 사용합니다. |
| `Reload Speed Multiplier` | 재장전 중에만 적용되는 이동 속도 배율입니다. `0`은 재장전 중 이동 정지, `1`은 기본 속도 유지입니다. |

:::warning 오프핸드 탄약을 쓰지 마세요
NPC 탄약은 `Ammo Stock`, 재장전 상태, TaCZ 총기 스택 상태로 관리됩니다. NPC 재장전을 표현하려고 실제 탄약이나 탄창 아이템을 장착하지 마세요.
:::

## 메인 토글

| 토글 | 동작 |
| --- | --- |
| `Reload` | 총이 비었을 때 NPC가 재장전할 수 있게 합니다. |
| `Supply Ammo` | 재장전 지연 후 애드온 탄약 재고로 NPC 총기를 보급합니다. |

`Supply Ammo`가 OFF이면 애드온 예비 재고에서 총기를 채우지 않습니다. `Ammo Stock`이 `0`이면 재장전이 켜져 있어도 여분 탄약이 없습니다.

## 권장 설정 흐름

1. `Ammo Stock: -1`로 시작합니다.
2. NPC가 발사하고, 재장전하고, 다시 발사하는지 확인합니다.
3. 기본 루프가 작동한 뒤 `Ammo Stock`을 유한 값으로 바꿉니다.
4. 전투에 느린 보급이 필요하면 `Ammo Regen Amount`와 `Ammo Regen Interval Ms`를 추가합니다.
5. 들고 있는 총기의 기본 재장전 감각이 전투에 맞지 않을 때만 `Reload Duration Ms`를 조정합니다.
6. 재장전 중 빈틈을 만들고 싶으면 `Reload Speed Multiplier`를 사용합니다.

이 순서로 하면 사격 문제와 탄약 경제 문제를 분리할 수 있습니다. 유한 탄약 NPC가 발사하지 않는다면 비었을 수 있지만, 무한 탄약 NPC가 발사하지 않는다면 총기, 타겟, 스탠스, 거리, 시야 문제일 가능성이 큽니다.

## RPM과 탄약 압박

`RPM Override`, 랜덤 RPM, 버스트 사격, 명중률은 모두 탄약 압박을 바꿉니다. 높은 RPM의 유한 탄약 NPC는 예비 탄을 빠르게 소모할 수 있습니다. 명중률이 낮은 NPC는 연출은 좋아 보일 수 있지만 `Ammo Stock`이 제한되어 있으면 탄약을 낭비합니다.

밸런스는 아래 순서로 잡는 편이 좋습니다.

1. 무한 탄약과 총기 기본 RPM
2. 명중률
3. 버스트 사격 또는 고정 RPM
4. 유한 탄약 재고
5. 탄약 재생 또는 재장전 이동 페널티

## 스크립트와 storeddata 참고

GUI가 기본 설정 경로지만, 스크립트 사용자는 브리지 값을 다룰 수 있습니다. 자주 쓰는 storeddata 키는 아래와 같습니다.

| 키 | 의미 |
| --- | --- |
| `tacznpcfire.supplyAmmo` | 애드온 탄약 보급을 켜거나 끕니다. |
| `tacznpcfire.ammoStock` | `-1` 무한, `0` 비어 있음, 양수 유한 탄 수입니다. |
| `tacznpcfire.ammoStockMax` | 재생용 최대 재고입니다. |
| `tacznpcfire.ammoRegenAmount` | 간격마다 회복되는 탄 수입니다. |
| `tacznpcfire.ammoRegenIntervalMs` | 재생 간격 밀리초입니다. |
| `tacznpcfire.reloadDurationMs` | 재장전 시간 밀리초입니다. |
| `tacznpcfire.reloadWalkSpeedMultiplier` | 재장전 중에만 쓰는 이동 배율입니다. |

storeddata는 전투가 정말 스크립트 측 변경을 필요로 할 때만 사용하세요. 일반 NPC 제작에서는 다른 제작자가 GUI에서 바로 확인할 수 있도록 NPC별 GUI 값을 유지하는 편이 좋습니다.

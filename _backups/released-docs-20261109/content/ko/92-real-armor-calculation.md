---
title: 방어와 피격 부위 계산
slug: dochi-real-armor-calculation
order: 920
description: 방어 수치 출처, 피격 높이, 저항 순서, 인챈트, 넉백과 내구도 처리입니다.
product: dochi-real-armor
category: 방어 계산
section: calculation
status: Stable
version: 0.1.4
audience: 서버 운영자와 모드팩 제작자
tags:
  - damage
  - body parts
  - toughness
---

## 어떤 효과를 적용할지 고르기

![Real Armor 0.1.4 NeoForge 1.21.1의 General Armor 화면. 강인함, 보호 인챈트와 넉백 저항을 각각 켜고 끌 수 있습니다.](assets/media/guides/armor-014-neo1211/armor-config.png "Armor toughness, Protection enchantments, Armor knockback resistance는 서로 다른 효과입니다. 피해 감소와 밀려나는 거리를 한 스위치로 바꾸는 것이 아닙니다.")

투구 없는 머리를 더 약하게 만들려면 **Body-part armor**를 켭니다. 장비 전체가 함께 보호하게 하려면 끕니다. 갑옷이 닳지 않게 하려면 **Damage armor items**를 끄며, 방어 계산 자체는 그대로 켜 둘 수 있습니다.

## 설정 파일 참고: 방어 수치 출처

아래는 설정 파일을 직접 조정할 때의 참고입니다. 기본 설정 화면만 사용할 때 이 값들을 모두 입력할 필요는 없습니다.

`armorStatSource`는 방어력, 강인함, 넉백 저항을 어디서 읽을지 정합니다.

| 값 | 동작 |
| --- | --- |
| `AUTO` | 사용 가능한 엔티티 속성을 우선하고, 장비 수정자가 빠진 값이나 더 큰 방어 값을 제공하면 보완 |
| `VANILLA_ATTRIBUTE` | LivingEntity의 바닐라 방어 속성만 사용 |
| `INVENTORY_SCAN` | 투구, 흉갑, 레깅스, 부츠의 아이템 수정자를 직접 합산 |

NPC 모드마다 장비를 바닐라 속성에 반영하는 방식이 다를 수 있으므로 기본값 `AUTO`를 권장합니다.

## Easy NPC 부위 기준

충돌 상자 안의 피격 높이를 0부터 1까지로 정규화합니다.

| 정규화 높이 | 부위 | 사용 슬롯 |
| --- | --- | --- |
| `0.75` 이상 | 머리 | 투구 |
| `0.375` 이상 `0.75` 미만 | 가슴 | 흉갑 |
| `0.375` 미만 | 다리 | 레깅스와 부츠 |

CustomNPCs는 전용 판정기와 사용 가능한 모델 데이터를 이용합니다. 신뢰할 피격점을 구하지 못하면 `unknown`으로 처리하고 모든 슬롯을 사용하므로 일반 피해에서 방어가 통째로 사라지지 않습니다.

## 저항, 인챈트, 내구도

CustomNPCs 저항 순서는 `CNPC_RESISTANCE_THEN_VANILLA_ARMOR` 또는 `VANILLA_ARMOR_THEN_CNPC_RESISTANCE`로 지정합니다. 이 값은 CustomNPCs 처리 경로에 적용됩니다.

보호 인챈트 스위치가 켜져 있을 때만 보호 계열 효과를 적용합니다. 방어 무시 피해는 방어구를 건너뜁니다. 내구도 감소 역시 선택 사항이며 부위별 방어에서는 실제 계산에 참여한 슬롯만 손상됩니다.

넉백 저항은 계산된 장비 값과 엔티티의 기존 바닐라 속성을 비교하고 부족한 부분만 보완합니다. 이미 적용된 저항을 중복 합산하지 않습니다.

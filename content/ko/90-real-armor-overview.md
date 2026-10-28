---
title: Dochi's Real Armor 개요
slug: dochi-real-armor-overview
order: 900
description: 현재 Forge·NeoForge 빌드의 역할, 지원 NPC 모드, 방어 처리 위치와 호환 범위를 설명합니다.
product: dochi-real-armor
category: 개요
section: overview
status: Stable
version: 0.1.4
audience: 플레이어, 서버 운영자, 모드팩 제작자
tags:
  - armor
  - customnpcs
  - easy npc
---

## 모드의 역할

**Dochi's Real Armor 0.1.4**는 지원 NPC의 장착 방어구·강인함·인챈트·내구도를 실제 피해 계산에 연결합니다. Forge 1.20.1 / Fabric·NeoForge 1.21.1과 별도 Fabric·NeoForge 26.3 빌드가 있습니다. 모드 ID와 명령은 `dochi_real_armor`입니다.

| NPC 제공자 | 기존 대상 | 26.3 |
| --- | --- | --- |
| CustomNPCs | 선택 연동 | 영구 제외 |
| Easy NPC | 선택 연동 | 선택 연동 |
| Dochi NPC Core | 선택 연동 | 선택 연동 |

DRM과 NPC 제공자는 필수가 아닙니다. 실제 NPC 방어를 확인하려면 지원 제공자를 설치합니다. DNPC는 전체·부위별 방어, 내구도·보호 인챈트·넉백을 지원하며 CustomNPCs 전용 저항 순서와 companion 규칙을 적용하지 않습니다.

## 피해 처리 방식

방어 계산은 Minecraft의 방어 흡수 단계에서 한 번만 실행됩니다. 디버그 메시지는 완료된 결과를 보여 줄 뿐이므로 디버그를 꺼도 방어 계산은 계속됩니다.

NPC의 바닐라 방어 속성을 읽거나, 장착 아이템의 속성 수정자를 직접 합산하거나, 두 방식 중 적절한 값을 자동 선택할 수 있습니다. 강인함, 보호 인챈트, 넉백 저항, 방어구 내구도 감소도 각각 설정할 수 있습니다.

:::note 적용 경계
방어 무시 태그가 붙은 피해에는 방어구가 적용되지 않습니다. Minecraft의 일반 LivingEntity 방어 단계를 건너뛰는 무기나 모드는 별도 호환 어댑터가 필요할 수 있습니다.
:::

## 부위별 방어

부위별 방어를 켜면 모든 방어구가 아니라 피격 부위에 대응하는 슬롯만 사용합니다.

| 피격 부위 | 사용 슬롯 |
| --- | --- |
| 머리 | 투구 |
| 가슴 | 흉갑 |
| 다리 | 레깅스와 부츠 |
| 판정 불가 | 모든 방어구 슬롯 |

Easy NPC의 발사체 피격은 발사체 이동 경로와 엔티티 충돌 상자를 교차해 판정합니다. 따라서 TACZ 계열처럼 빠르거나 외부에서 관리되는 탄환의 하체 피격도 다리로 인식하기 쉬워졌습니다.

Forge 빌드에서 Dochi RPG Maker 0.1.4 이상이 있으면 DRM의 Mods Config에 탭이 등록됩니다. DRM이 없을 때는 Forge 모드 목록에서 동일한 형태의 독립 설정 화면을 엽니다.

## 0.1.4과 DNPC

Forge·Fabric·NeoForge의 현재 버전은 모두 0.1.4입니다. CustomNPCs·Easy NPC 외에 Dochi NPC Core의 전체·부위별 방어, 내구도, 보호 인챈트와 넉백을 지원합니다. 부위 판정은 서버 AABB 기준이며 CustomNPCs 전용 저항·companion 동작을 DNPC에 적용하지 않습니다. DRM이 없어도 독립 설정 화면을 사용합니다.

0.1.4는 다섯 대상의 버전·패키징 정렬을 포함하며 이 변경만으로 모든 게임플레이를 재검증한 것은 아닙니다. [26.3 설치 범위](#core-fabric/minecraft-26-3)를 확인하세요.

---
title: 설치와 첫 사격 설정
slug: warfare-setup
order: 320
description: 필수 모드를 설치하고 NPC가 총을 쏘도록 설정합니다.
product: dochi-warfare
category: 설치
section: setup
status: Draft
version: 0.3.3
audience: 서버 운영자
tags:
  - setup
  - TACZ
  - gui
---

## 설치할 모드

| 항목 | 준비할 것 |
| --- | --- |
| Minecraft / 로더 | Forge 1.20.1, NeoForge 1.21.1 또는 Fabric 1.21.1 |
| Java | Forge 17 / NeoForge·Fabric 21 |
| DW | 목표 로더용 0.3.3 |
| TACZ | 필수. Forge·NeoForge는 TACZ, Fabric은 TACZ Refabricated. 구버전 안내의 1.2 미만 제한은 현재 적용하지 않음 |
| Player Animator | Forge·NeoForge 클라이언트 필수: Forge 1.0.0+ / NeoForge 2.0+. Fabric은 선택 |
| Fabric | Fabric API + Forge Config API Port (Fabric 빌드) |
| NPC 모드 | DNPC 또는 CustomNPCs |

서버와 클라이언트에 같은 로더의 DW와 필수 모드를 설치합니다. DRM은 선택입니다. 차량에는 **DWE 0.3.3**과 SuperbWarfare를 추가합니다. 지원 SuperbWarfare 버전은 Forge **0.8.9 / 0.8.9.1 / 0.8.9.2**, NeoForge **0.8.9.1 / 0.8.9.2**입니다. SuperbWarfare 자체가 요구하는 Kotlin for Forge 등도 함께 준비합니다.

## 플레이어 인벤토리에서 총을 골라 NPC에게 주기

다음은 **DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1** 영문 화면입니다.

![Gun에서 M4A1 Carbine을 선택하고 NPC 미리보기에 총이 표시된 상태.](assets/media/guides/warfare-031-neo1211/dw-gun.png "왼쪽 Gun을 선택한 뒤 플레이어 인벤토리의 총기 아이콘을 누릅니다. 아래에 Stored gun과 100% 항목이 생겼는지 확인합니다.")

1. NPC를 배치합니다. [DNPC 시작](#dochi-npc-core/npc-core-setup)에서 NPC 한 명을 만들 수 있습니다.
2. 사용할 지원 총기를 **플레이어 인벤토리**에 넣고, **DW Npc Core**로 NPC를 우클릭합니다.
3. 오른쪽 위 **TACZ Fire NPC Mode**를 켭니다. **Overview**에서 모드와 Enabled가 켜져 있는지 확인합니다.
4. 왼쪽 **Gun**에서 총기 아이콘을 선택합니다. 목록이 비어 있다면 플레이어 인벤토리에 지원 총기가 있는지 확인합니다.
5. **Senses → Quick View → Combat Mode**에서 **Stance**를 **Ranged** 또는 **Auto**로 둡니다. Ranged는 총, Auto는 거리별 총·근접 전환입니다.
6. 같은 **Quick View → Fire Rate**에서 **RPM Mode: TACZ Native**로 시작합니다. 발사 속도와 명중률을 이곳에서 정합니다.
7. **Ammo**에서 **Reload / Supply Ammo**를 켜고 **Ammo Stock**을 정합니다. `-1`이면 예비 탄약이 무한입니다.
8. **Targets**에서 공격할 몹을 선택하고 상단 **Save**로 NPC에 저장합니다.
9. 사거리 안에 실제 공격 대상을 놓고, 시야와 감지 방향이 맞는 상태에서 사격·재장전을 확인합니다.

## 다음 설정을 찾는 위치

![Senses의 오른쪽 Quick View와 Awareness·Combat Mode.](assets/media/guides/warfare-031-neo1211/dw-senses.png "Quick View 항목을 누르면 그 설정 구역으로 이동합니다. 감지 거리와 사격 거리는 각각 정합니다.")

| 위치 | 정할 내용 |
| --- | --- |
| **Gun / Melee** | 원거리·근접 무기와 피해 |
| **Senses → Awareness** | 발견 거리·각도·반응 지연·대기 이동 |
| **Senses → Combat Mode** | 총·근접 전환과 교전 거리 행동 |
| **Senses → Fire Modes / Fire Rate** | 이동 사격·버스트 / 발사 속도·명중률 |
| **Targets** | 공격할 대상 |
| **Ammo** | 재장전·예비 탄약·재생 |
| **Armor / Visual & FX / Pose** | 방어구·외형·소리·포즈 |
| **Cover** | 전투 중 엄폐 |

**Overview**는 현재 값을 읽는 요약입니다. 여러 총·스킨·방어구 후보를 쓰면 해당 목록의 확률 합계를 **100%**로 맞춥니다. 현재 UI의 **Even**은 확률을 균등하게 나눕니다.

## 다른 NPC에도 같은 설정 쓰기

**Save As**로 프로필을 저장하고 다른 NPC의 **Load**에서 불러온 뒤 **Save**합니다. 프로필은 `config/dochi_warfare/target_entities/`에 있습니다. NPC 자체를 보관하려면 코어로 허공을 우클릭해 [클론 보관함](#dochi-warfare/warfare-entity-clones)을 엽니다.

질문에 답하며 행동을 만들려면 [Easy Build와 Presets](#dochi-warfare/warfare-easy-build-presets), 사격하지 않으면 [문제 해결](#dochi-warfare/warfare-troubleshooting)로 이어갑니다. 포즈·고용·함정은 각각 **DW Pose Core / DW Mercenary Core / DW Booby Trap Core**, 차량은 [DWE](#dochi-warfare-expanded/expanded-overview)를 사용합니다.

## 0.3.3에서 설치·저장할 때

Forge·NeoForge는 기존 TaCZ 연동을 유지하면서 1.2.0도 지원합니다. Fabric은 TACZ Refabricated 0.7.1과 1.2.0을 지원합니다. 이 목록은 모든 과거·미래 버전의 호환 보증이 아닙니다. Fabric에서는 Mod Menu에서 DW 설정을 열 수 있습니다.

기존 Save 동작이 있는 편집기·설정 화면에서는 **Ctrl+S**로 같은 저장을 실행합니다. Save As가 필요한 새 문서는 파일 이름을 정하고 서버 저장 완료를 확인하세요. 아래 0.3.1 화면은 당시 촬영본이며 설치 버전을 낮추라는 뜻이 아닙니다.

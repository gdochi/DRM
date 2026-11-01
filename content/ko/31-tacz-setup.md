---
title: 설치와 첫 사격 설정
slug: warfare-setup
order: 320
description: 필수 모드를 설치하고 NPC가 총을 쏘도록 설정합니다.
product: dochi-warfare
category: 설치
section: setup
status: Draft
version: 0.3.1
audience: 서버 운영자
tags:
  - setup
  - TACZ
  - gui
---

## 설치할 모드

| 항목 | 준비할 것 |
| --- | --- |
| Minecraft / 로더 | Forge 1.20.1 또는 NeoForge 1.21.1 |
| Java | Forge 17 / NeoForge 21 |
| DW | 해당 로더의 0.3.1 |
| TACZ | 1.1.8 이상 1.2 미만 |
| Player Animator | 클라이언트 필수. Forge 1.0.0 이상 / NeoForge 2.0 이상 |
| NPC 모드 | DNPC 또는 CustomNPCs |

서버와 클라이언트에 같은 로더의 DW와 필수 모드를 설치합니다. DRM은 선택입니다.

차량을 쓰려면 **DWE 0.3.1**과 SuperbWarfare를 추가합니다. 지원하는 SuperbWarfare 버전은 Forge **0.8.9 / 0.8.9.1 / 0.8.9.2**, NeoForge **0.8.9.1 / 0.8.9.2**입니다.

## NPC에게 첫 총 설정하기

1. NPC를 배치하고 크리에이티브에서 **DW Npc Core**를 꺼냅니다.
2. 코어로 NPC를 우클릭합니다.
3. **TACZ Fire NPC Mode**, **Enabled**를 켭니다.
4. **Gun**에서 지원 총기 하나를 고릅니다.
5. **Senses → General → Stance**를 **Ranged** 또는 **Auto**로 둡니다.
6. **Fire → RPM Mode**를 **TACZ Native**로 둡니다.
7. **Ammo**의 **Reload / Supply Ammo**를 켭니다. **Ammo Stock = -1**은 무한 재고입니다.
8. 공격할 대상을 정하고 **Save**합니다.

사격하지 않으면 NPC가 대상을 적으로 인식하는지, 사거리 안에 있는지, 시야를 막는 블록이 없는지 확인합니다. [문제 해결](#dochi-warfare/warfare-troubleshooting)에서 증상별로 볼 수 있습니다.

## 설정은 어디서 하나요?

| 탭 | 바꾸는 것 |
| --- | --- |
| Gun / Melee | 총·근접 무기와 피해 |
| Senses | 적 감지·스탠스·이동 |
| Fire | 사거리·발사 속도·명중률 |
| Targets | 공격할 대상 |
| Ammo | 재장전·탄약 수 |
| Armor | 방어구 후보 |
| Cover | 엄폐 |
| Visual & FX / Pose | 외형·소리·포즈 |

**Overview**는 현재 설정을 읽는 요약입니다. 값을 바꾸려면 해당 탭으로 이동합니다.

무기·스킨·방어구 후보를 여러 개 넣으면 각 확률의 합계를 100%로 맞춥니다. **Equalize**로 균등하게 나눌 수 있습니다.

## 같은 설정을 다른 NPC에 쓰기

**Save As**로 설정을 저장하고 다른 NPC의 **Load**에서 불러옵니다. 파일은 `config/dochi_warfare/target_entities/`에 있습니다.

NPC 자체를 보관하려면 코어로 **허공을 우클릭**해 [클론 보관함](#dochi-warfare/warfare-entity-clones)을 엽니다.

## 다른 제작 도구

**DW Pose Core**는 포즈, **DW Mercenary Core**는 고용 조건, **DW Booby Trap Core**는 부비트랩을 편집합니다. 차량은 [DWE 설정](#dochi-warfare-expanded/expanded-overview)을 따릅니다.

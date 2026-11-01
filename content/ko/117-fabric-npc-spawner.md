---
title: Core NPC 스포너 사용하기
slug: npc-spawner
order: 84
description: Core 스포너 블록에 저장한 NPC와 소환 조건을 설정합니다.
product: core-fabric
category: 핵심 시스템
section: npc-spawner
status: 안정
version: 0.3.1
audience: 제작자 / 운영자
tags:
  - npc
  - spawner
  - world
---

## 어떤 스포너인가요?

이 페이지는 **DRM Core의 NPC Spawner**입니다. Source 목록에서 읽을 수 있는 Core 형식의 NPC 클론을 사용합니다. Cobblemon Editor의 Clone Library는 역할을 적용한 DNPC도 이 흐름에 연결합니다. 기존 1.21.1의 CustomNPCs Filled Soul Stone 가져오기는 별도 제공자의 경로입니다.

DNPC 자체의 Save As 템플릿으로 시작한다면 [Spawn Control의 NPC 템플릿 스포너](#dochi-spawn-control/spawn-control-npc-templates)를 보세요. Cobblemon 역할 클론은 [Clone Library 안내](#drm-cobblemon-editor/cobblemon-clone-library-spawner)로 이어집니다. 템플릿 형식과 스포너를 함께 맞춰야 합니다.

## 블록을 놓고 열기

1. `/give @s dochi_rpg_maker:npc_spawner`로 블록을 받아 배치합니다.
2. DRM 코어를 들고 블록을 우클릭합니다.
3. 편집하는 동안 블록에서 8칸 안에 머뭅니다.
4. **Source**에서 저장한 NPC를 추가합니다. CustomNPCs Filled Soul Stone은 인벤토리에 넣으면 목록에서 고를 수 있습니다.
5. **Spawn**에서 생성 방식·간격·수량을 정합니다.
6. **Save**를 누릅니다.

이 화면의 Save는 선택한 월드 블록에 저장합니다. 새 파일을 만드는 Save As와는 다릅니다.

## 여러 NPC 중 하나 고르기

Source에는 최대 64개를 넣을 수 있습니다. 각 항목의 **가중치**가 등장 비율입니다. 경비병 3, 궁수 1이면 같은 조건에서 경비병이 더 자주 뽑힙니다.

한 번 작동할 때마다 다시 뽑습니다. **Max Active**는 전체 소환 목록의 살아 있는 NPC 수 제한입니다.

## 언제 작동하게 하나요?

![Core 스포너의 Spawn 설정.](assets/media/guides/drm-031-neo1211/core-npc-spawner-rules.png "DRM 0.3.1 / NeoForge 1.21.1 영문 화면. Mode는 작동 계기, Cooldown은 틱 간격, Max active는 살아 있는 수 제한, Wave size는 한 번 생성 수입니다. 이 실행은 Assigned sources 0이므로 설정 화면만 확인했으며 NPC 생성 성공 장면은 아닙니다.")

| 선택 | 동작 |
| --- | --- |
| continuous | 간격마다 계속 시도 |
| target_nearby | 대상이 주변에 있으면 시도 |
| target_enter | 대상이 영역에 들어오면 시도 |
| redstone_pulse | 레드스톤 신호가 들어올 때 시도 |

예를 들어 Cooldown 200은 약 10초 간격이고, Max active 1은 한 명이 살아 있는 동안 추가 생성을 제한합니다. Wave size 1은 한 번에 한 명을 시도한다는 뜻입니다.

쿨다운은 20~72,000틱, 살아 있는 NPC 상한과 한 번 소환 수는 각각 1~32입니다. 대상 반경은 최대 64칸, 소환 반경은 최대 32칸입니다.

## 효과와 외형

**Conditions**는 작동 조건, **Effects**는 파티클·블록 모습·크기를 정합니다. 소환할 NPC와 스포너 블록의 외형은 따로 선택합니다.

블록을 포함한 월드를 옮길 때는 `config/dochi_rpg_maker/npc_spawner/`의 NPC 템플릿도 함께 가져갑니다.

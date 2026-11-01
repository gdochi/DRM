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

이 페이지는 **DRM Core의 NPC Spawner**입니다. 기존 1.21.1의 CustomNPCs 클론과 Filled Soul Stone을 사용하는 방법입니다.

DNPC를 등장시키려면 [Spawn Control의 NPC 템플릿 스포너](#dochi-spawn-control/spawn-control-npc-templates)를 보세요. Spawn Control의 스포너와 Core 스포너는 별도 도구입니다.

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

| 선택 | 동작 |
| --- | --- |
| continuous | 간격마다 계속 시도 |
| target_nearby | 대상이 주변에 있으면 시도 |
| target_enter | 대상이 영역에 들어오면 시도 |
| redstone_pulse | 레드스톤 신호가 들어올 때 시도 |

쿨다운은 20~72,000틱, 살아 있는 NPC 상한과 한 번 소환 수는 각각 1~32입니다. 대상 반경은 최대 64칸, 소환 반경은 최대 32칸입니다.

## 효과와 외형

**Conditions**는 작동 조건, **Effects**는 파티클·블록 모습·크기를 정합니다. 소환할 NPC와 스포너 블록의 외형은 따로 선택합니다.

블록을 포함한 월드를 옮길 때는 `config/dochi_rpg_maker/npc_spawner/`의 NPC 템플릿도 함께 가져갑니다.

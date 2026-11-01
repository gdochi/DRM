---
title: 26.3 설치와 달라진 기능
slug: minecraft-26-3
order: 6
description: 26.3용 파일과 NPC 선택, 이전 버전에서 달라진 편집 기능을 확인합니다.
product: core-fabric
category: Minecraft 26.3
section: getting-started
status: 사용 안내
version: 0.3.1 / Minecraft 26.3
audience: 제작자 / 서버 운영자
---

## 26.3용 파일로 설치하기

**Fabric 또는 NeoForge / Java 25**를 사용합니다. 각 모드의 26.3용 파일을 골라 서버와 클라이언트에 설치합니다. Fabric은 각 모드가 요구하는 Fabric API도 필요합니다.

NPC는 **DNPC**로 만듭니다. **CustomNPCs는 26.3에서 사용할 수 없습니다.** DRM과 DNPC는 각각 단독으로도 사용할 수 있습니다.

## 하고 싶은 기능에 맞춰 고르기

| 기능 | 모드 |
| --- | --- |
| NPC 만들기·꾸미기·시간표 | DNPC |
| 대화·상점·퀘스트·화면 꾸미기 | DRM |
| NPC 공격 패턴·보스 전투 | DRM + BattleWorks + DNPC |
| 일반 몹 등장 규칙 | Spawn Control |
| 저장한 NPC를 블록에서 소환 | Spawn Control + DRM + DNPC |
| NPC 갑옷 효과 | Real Armor와 지원 NPC |
| 미니게임·MWENT 테이블 | Minigames |
| 지도 NPC 아이콘 | DRM + MapIcon + 지원 지도 |

Cobblemon Editor와 DW/DWE는 이 안내의 26.3 모드에 포함하지 않습니다. 각각 기존 1.21.1 또는 1.20.1 문서를 사용하세요.

## 이전 버전과 다른 점

26.3 DRM에는 **Faction Editor·플레이어 세력 화면·GUI Maker 세력 요소**가 없습니다. Fabric은 **Item Editor·Stat Builder**도 제공하지 않습니다.

DNPC에서 사람을 만들고 DRM 대화나 상점을 붙이는 순서는 [NPC 만들기](#dochi-npc-core/npc-core-setup), [DRM 시작](#core-fabric/quick-start)을 따릅니다.

Spawn Control은 [배치형 NPC 템플릿](#dochi-spawn-control/spawn-control-npc-templates)을 사용합니다. 구형 CustomNPCs 클론을 그대로 가져와 생성하지는 않습니다.

MWENT의 주민 거래 정의를 바꿨다면 월드에 다시 접속하거나 서버를 다시 시작해야 반영됩니다.

## 이전 월드를 가져올 때

원본 월드를 바로 바꾸기 전에 사본에서 NPC·대화·상점 등 사용하는 기능을 확인합니다. 설정 폴더와 월드를 함께 보관하세요.

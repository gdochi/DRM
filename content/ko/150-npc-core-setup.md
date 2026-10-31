---
title: NPC Core 설치와 시작
slug: npc-core-setup
order: 1500
description: NPC Core 설치와 시작
product: dochi-npc-core
category: NPC Core 설치와 시작
section: setup
status: 사용 안내
version: 0.1.2
audience: 제작자 / 서버 운영자
---

## 0.1.2 최신 수정

작업과 외부 AI의 이동 제어, 고용 복귀와 일정 상점 권한을 보완했습니다. 기존 NPC에 템플릿을 적용할 때 실제 운반물은 보존하고 새 복제본에는 실행 중 화물·탑승·전투 상태를 넘기지 않습니다. [시간표·탑승](#dochi-npc-core/npc-core-schedules)과 [조리 작업](#dochi-npc-core/npc-core-cooking)을 확인하세요. 기존 1.20.1·1.21.1 NPC 화면에서는 Delete 키로 삭제할 수 있습니다.

## 어떤 모드인가요?

Dochi’s NPC Core(DNPC) **0.1.2**은 자체 NPC, 외형·장비, 포즈, 관계, 시간표와 작업을 만드는 독립 모드입니다. DRM 없이 기본 NPC를 만들고 편집할 수 있습니다.

| 빌드 | Minecraft | Java |
| --- | --- | --- |
| Forge | 1.20.1 | 17 |
| Fabric | 1.21.1 | 21 |
| NeoForge | 1.21.1 | 21 |
| Fabric / NeoForge | 26.3 | 25 |

서버와 클라이언트에 같은 로더의 `dochi_npc_core-0.1.2-<loader>-<minecraft>.jar`를 설치합니다. Fabric에는 Fabric API도 필요합니다. DRM은 선택 연동이며 현재 통합 안내는 DRM 0.3.1 기준입니다. Gecko 모델을 사용하면 해당 로더의 GeckoLib를 함께 설치합니다.

## 첫 NPC 만들기

1. 크리에이티브의 NPC Core 탭 또는 `/dnpc core`로 코어를 준비합니다.
2. 코어로 블록을 우클릭해 NPC를 생성합니다.
3. 생성한 NPC를 코어로 우클릭해 제작용 NPC 에디터를 엽니다.
4. 이름·모델·스킨·장비를 정하고 저장합니다.
5. 시간표나 작업을 설정한 뒤 도구를 내려놓고 실제 NPC 행동을 확인합니다.

## 코어 조작

| 조작 | 기능 |
| --- | --- |
| 블록 우클릭 | 새 NPC 배치 |
| NPC 우클릭 | 해당 NPC 편집 |
| 허공 우클릭 | 글로벌 설정과 포저 |
| 좌클릭 | 중앙 유틸리티 HUD |
| 주 손에 코어 + Ctrl+C / Ctrl+V | 임시 NPC 복사 / 붙여넣기 |
| 주 손에 코어 + Ctrl+X | 대상 NPC 즉시 삭제 |

복사 목록은 장기 보관용 템플릿과 다릅니다. 재사용할 NPC는 [v3 복제 템플릿](#dochi-npc-core/npc-core-templates)으로 저장하세요. 원본으로 이동하는 동작은 복사 당시 UUID를 사용하므로 원본이 삭제되면 이동할 수 없습니다.

[NPC와 작업](#dochi-npc-core/npc-core-editor), [파일·연동·변환](#dochi-npc-core/npc-core-files)을 이어서 확인하세요.

26.3도 DRM·GeckoLib·Curios 없이 기본 NPC를 만들고 편집·저장할 수 있습니다. 선택 연동 데이터는 보존하며 필요한 API가 없으면 해당 외부 기능만 사용할 수 없습니다. 26.3에는 CustomNPCs가 없습니다. [대상별 설치](#core-fabric/minecraft-26-3)를 확인하세요.

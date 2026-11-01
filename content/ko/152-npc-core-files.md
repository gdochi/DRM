---
title: 대화·상점 연결과 저장 위치
slug: npc-core-files
order: 1520
description: DNPC에 다른 모드의 기능을 붙이고 필요한 파일을 찾습니다.
product: dochi-npc-core
category: NPC 파일·연동·변환
section: operations
status: 사용 안내
version: 0.1.2
audience: 제작자 / 서버 운영자
---

## NPC에게 대화나 상점 붙이기

**DRM**을 설치하면 DNPC에 대화·상점 등을 붙일 수 있습니다. DRM 코어로 NPC를 우클릭해 **NPC Apply**에서 사용할 파일을 고릅니다.

[첫 대화 만들기](#core/quick-start) 또는 [Fabric·NeoForge 대화 만들기](#core-fabric/quick-start)를 따라 시작할 수 있습니다.

## 하고 싶은 일에 맞춰 모드 고르기

| 하고 싶은 일 | 추가 모드 |
| --- | --- |
| 대화·상점·플레이어 고용 | DRM |
| 포켓몬 트레이너·포켓마트·치료·스타터 | Cobblemon Editor와 그 필수 모드 |
| 저장한 NPC를 조건에 맞춰 등장시키기 | Spawn Control과 DRM |
| 근접 패턴·보스 전투 만들기 | BattleWorks와 DRM |
| 총을 쏘는 NPC·차량 승무원 | DW / DWE와 해당 필수 모드 |
| 장착 방어구로 피해 줄이기 | Real Armor |
| 악기 연주 | Immersive Melodies |

DW/DWE는 Forge 1.20.1·NeoForge 1.21.1용입니다. 26.3에서는 CustomNPCs를 사용하지 않습니다. 각 모드의 설치 문서에서 자신의 버전에 맞는 파일을 고릅니다.

## 저장 파일 찾기

| 내용 | 위치 |
| --- | --- |
| NPC 템플릿 | `config/dochi_npc_core/templates/` |
| 포즈 | `config/dochi_npc_core/poses/` |
| 서버 스킨 PNG | `config/dochi_npc_core/assets/textures/` |
| 전체 설정 | `config/dochi_npc_core/global.json` |
| 클라이언트 설정 | `config/dochi_npc_core/client-settings.json` |
| DRM 고용 설정 | `config/dochi_rpg_maker/dochi_npc/employment/` |

배치한 NPC와 고용 계약은 월드에도 저장됩니다. 서버를 옮길 때는 월드도 함께 가져갑니다.

## 다른 NPC를 DNPC로 바꾸기

1.20.1·1.21.1의 **전체 설정 → 실험적 기능 → 월드 조사**에서 바꿀 NPC를 고릅니다. 목록의 변환 가능·불가능 항목을 보고 실행합니다.

외형·장비·관계처럼 지원하는 내용만 옮겨집니다. 변환 전에는 월드 사본을 남겨 두세요. 26.3에서는 CustomNPCs 변환을 제공하지 않습니다.

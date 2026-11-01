---
title: Fabric·NeoForge 설치 파일 고르기
slug: installation
order: 2
description: 1.21.1에 맞는 DRM 파일과 필수 모드를 설치합니다.
product: core-fabric
category: 시작하기
section: getting-started
status: 안정
version: 0.3.1
audience: 제작자 / 운영자
---

## 로더에 맞춰 파일 받기

| 항목 | Fabric | NeoForge |
| --- | --- | --- |
| Minecraft | 1.21.1 | 1.21.1 |
| Java | 21 | 21 |
| 로더 | Fabric Loader 0.18.0 이상 | NeoForge 21.1 이상 |
| Fabric API | 0.116.11+1.21.1 이상 | 사용하지 않음 |
| DRM 파일 | 0.3.1 Fabric 1.21.1 | 0.3.1 NeoForge 1.21.1 |

**26.3은 위 파일을 쓰지 않습니다.** [26.3 설치](#core-fabric/minecraft-26-3)에서 Java 25와 해당 버전 파일을 확인하세요. Forge 1.20.1은 [Forge 안내](#core/installation)를 사용합니다.

받은 파일은 **mods** 폴더에 넣습니다. 멀티플레이는 서버와 접속자의 Minecraft·로더·모드 파일을 맞춥니다.

## 필요한 기능만 추가하기

| 만들 기능 | 추가 모드 |
| --- | --- |
| NPC 배치 | DNPC 또는 해당 로더의 CustomNPCs |
| Gecko 모델 | 해당 버전·로더의 GeckoLib |
| FTB 퀘스트 연결 | FTB Quests |
| 포켓몬 트레이너·상점·치료 | Cobblemon Editor와 Cobblemon |
| Fabric 모드 목록의 설정 버튼 | Mod Menu |

DRM만으로도 기본 편집 도구를 열 수 있습니다. NPC를 만들려면 [DNPC 시작](#dochi-npc-core/npc-core-setup)을 보세요.

## 게임에서 시작하기

1. 크리에이티브에서 **Dochi RPG Maker Core**를 꺼내거나 `/give @s dochi_rpg_maker:dialogue_editor`를 입력합니다.
2. 코어로 허공을 우클릭합니다.
3. **Dialogue Editor**를 열어 [첫 대화](#core-fabric/quick-start)를 만듭니다.

기본 예제와 설정 폴더는 첫 실행 때 생성됩니다. Fabric은 Item Editor·Stat Builder를 제공하지 않습니다.

## 서버를 옮길 때

`config/dochi_rpg_maker/`와 월드를 함께 보관합니다. 설정 파일만 옮기면 배치한 NPC·퀘스트 진행도·스포너 상태는 따라가지 않습니다.

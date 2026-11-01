---
title: Forge 설치 파일 고르기
slug: installation
order: 2
description: Forge 1.20.1에 DRM과 사용할 NPC 모드를 설치합니다.
product: core
category: 시작하기
section: getting-started
status: 안정
version: 0.3.1
audience: 서버 운영자
tags:
  - install
  - forge
---

## 필요한 파일

| 항목 | 준비할 것 |
| --- | --- |
| Minecraft | Java Edition 1.20.1 |
| Java | 17 |
| 로더 | Forge 47 이상 |
| DRM | Forge 1.20.1용 0.3.1 |

받은 모드 파일을 게임의 **mods** 폴더에 넣습니다. 서버에서 쓸 때는 서버와 접속자 모두 같은 파일을 설치합니다.

Fabric·NeoForge는 [별도 설치 안내](#core-fabric/installation)를 사용하세요.

## NPC도 만들고 싶다면

[DNPC](#dochi-npc-core/npc-core-setup) 또는 호환 CustomNPCs를 설치합니다. DRM 자체에는 NPC 모드가 필수가 아니지만, 대화·상점을 붙일 NPC를 만들 때는 필요합니다.

Gecko 모델에는 GeckoLib, FTB 퀘스트 연결에는 FTB Quests처럼 사용하려는 기능에 맞는 모드만 추가합니다.

## 설치 후 열어보기

1. 월드에 들어가 크리에이티브로 전환합니다.
2. **Dochi RPG Maker Core**를 꺼냅니다. 명령어는 `/give @s dochi_rpg_maker:dialogue_editor`입니다.
3. 코어로 허공을 우클릭합니다.
4. 에디터 목록이 열리면 [첫 대화 만들기](#core/quick-start)를 진행합니다.

기본 예제는 첫 실행 때 준비됩니다. 따로 JSON 파일을 작성해 놓을 필요는 없습니다.

![설치 후 코어로 여는 에디터 선택 화면.](assets/media/guides/drm-031-forge1201/editor-selector.png "DRM 0.3.1 / Forge 1.20.1. Dialogue Editor를 고르면 오른쪽에 Load·Use Default·Create New가 나옵니다. 처음에는 Use Default로 예제를 열고 Save As로 자신의 작업을 저장합니다. 추가 모드에 따라 목록은 달라집니다.")

## 업데이트하거나 서버를 옮길 때

같은 모드의 예전 파일과 새 파일을 동시에 넣지 않습니다. 설정은 `config/dochi_rpg_maker/`, 배치한 NPC와 플레이어 진행도는 월드에도 저장되므로 둘을 함께 보관합니다.

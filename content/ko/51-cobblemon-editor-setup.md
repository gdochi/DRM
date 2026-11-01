---
title: 설치와 첫 포켓몬 배틀
slug: cobblemon-editor-setup
order: 510
description: NPC에게 포켓몬 한 마리를 설정하고 플레이어와 싸우게 합니다.
product: drm-cobblemon-editor
category: 설치
section: setup
status: Draft
version: Fabric / NeoForge 0.2.9
audience: 서버 운영자와 처음 설치하는 제작자
tags:
  - setup
  - fabric
  - npc
---

## 준비할 모드

| 항목 | 버전·선택 |
| --- | --- |
| Minecraft | 1.21.1 / Java 21 |
| 로더 | Fabric 또는 NeoForge |
| DRM Core | 0.2.8 이상 |
| Cobblemon | 1.7.3 이상 1.9.0 미만 |
| Cobblemon Editor | 해당 로더의 0.2.9 |
| NPC | DNPC 또는 CustomNPCs |

서버와 클라이언트에 같은 로더의 파일을 설치합니다. Fabric에서는 DRM·Cobblemon이 요구하는 Fabric Loader와 Fabric API도 준비합니다.

## 첫 트레이너 만들기

1. NPC 한 명을 배치합니다. NPC가 없다면 [DNPC 시작](#dochi-npc-core/npc-core-setup)을 먼저 봅니다.
2. **Dochi RPG Maker Core**로 허공을 우클릭하고 **Add-on → Cobblemon Editor**를 엽니다.
3. **Use Default**로 기본 예제를 불러오고 유형을 **Trainer**로 둡니다.
4. **Pokemon Party**에서 포켓몬 한 마리와 레벨을 정합니다.
5. 첫 배틀은 **Singles**, 시작 방식은 **Interaction**으로 둡니다.
6. **Save As**로 `custom/first_trainer.json`을 저장합니다.
7. DRM 코어로 NPC를 우클릭해 **Cobblemon Trainer**를 고르고 저장한 파일을 **Apply**합니다.
8. 플레이어 파티에 전투 가능한 포켓몬을 넣고 양손을 비운 채 NPC에게 말을 겁니다.

## 포켓몬 자체와 싸우게 하려면

유형을 **Pokemon Itself**로 바꾸고 종·외형·레벨을 정합니다. 다른 이름으로 저장한 뒤 NPC에 **Cobblemon Pokemon Itself**로 적용합니다. 이 유형은 라운드당 한 마리를 사용합니다.

## 저장 후 다시 Apply해야 하나요?

같은 파일에 포켓몬·레벨 등을 바꿔 **Save**했다면 다음 상호작용에 반영됩니다. 파일 이름이나 NPC 역할을 바꿨을 때는 새 파일을 다시 **Apply**합니다.

파일을 게임 밖에서 직접 바꿨다면 `/drm reload`를 사용합니다.

## 배틀이 안 열리면

| 상황 | 확인 |
| --- | --- |
| 에디터가 안 보임 | DRM·Cobblemon·애드온이 같은 로더로 설치되어 있는지 |
| NPC가 반응하지 않음 | Trainer가 활성화되어 있는지, Apply했는지, 양손을 비웠는지 |
| 대화나 상점이 먼저 열림 | 해당 대화에서 go_battle로 연결하거나 다른 NPC에 적용 |
| 플레이어 파티 오류 | 싸울 수 있는 포켓몬이 파티에 있는지 |

[파티·라운드·보상 설정](#drm-cobblemon-editor/cobblemon-trainer-editor)으로 이어가세요.

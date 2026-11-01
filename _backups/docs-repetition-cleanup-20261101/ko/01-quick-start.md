---
title: 처음 시작하기
slug: quick-start
order: 1
description: DRM 도구를 꺼내고 NPC에게 첫 대화를 붙여 봅니다.
product: core
category: 시작하기
section: getting-started
status: 안정
version: 0.3.1
audience: 처음 설치하는 사용자
tags:
  - quick-start
  - setup
---

## NPC에게 대화 붙이기

DRM으로 NPC 대화·상점·퀘스트를 만들 수 있습니다. 우선 NPC 한 명에게 짧은 인사말을 붙여 봅니다.

1. 크리에이티브에서 **Dochi RPG Maker Core**를 꺼냅니다. 찾기 어렵다면 `/give @s dochi_rpg_maker:dialogue_editor`를 입력합니다.
2. 코어를 들고 **허공을 우클릭**합니다.
3. **Dialogue Editor**를 열고 **Use Default Dialogue Set**으로 기본 대화를 불러옵니다.
4. 일반 대화 노드를 골라 NPC의 대사와 선택지 문구를 바꿉니다.
5. **Save As**로 내 대화를 저장합니다.
6. 코어로 DNPC 또는 CustomNPCs NPC를 우클릭하고 저장한 대화를 적용합니다.
7. 양손을 비우고 NPC를 우클릭하면 방금 만든 대화가 열립니다.

NPC가 없다면 [DNPC로 NPC 만들기](#dochi-npc-core/npc-core-setup)부터 진행하세요. DRM과 DNPC는 별도 모드입니다.

## 만들고 싶은 것부터 고르세요

| 만들 것 | 열 도구 | 이어 볼 문서 |
| --- | --- | ---

## NPC에게 대화 붙이기

DRM으로 NPC 대화·상점·퀘스트를 만들 수 있습니다. 우선 NPC 한 명에게 짧은 인사말을 붙여 봅니다.

1. 크리에이티브에서 **Dochi RPG Maker Core**를 꺼냅니다. 찾기 어렵다면 `/give @s dochi_rpg_maker:dialogue_editor`를 입력합니다.
2. 코어를 들고 **허공을 우클릭**합니다.
3. **Dialogue Editor**를 고르고 오른쪽 **Use Default**로 기본 대화를 불러옵니다.
4. 일반 대화 노드를 골라 NPC의 대사와 선택지 문구를 바꿉니다.
5. **Save As**로 내 대화를 저장합니다.
6. 코어로 DNPC 또는 CustomNPCs NPC를 우클릭하고 저장한 대화를 적용합니다.
7. 양손을 비우고 NPC를 우클릭하면 방금 만든 대화가 열립니다.

NPC가 없다면 [DNPC로 NPC 만들기](#dochi-npc-core/npc-core-setup)부터 진행하세요. Minecraft 26.3에서는 DNPC를 사용합니다.

![DRM 에디터 선택 화면에서 Dialogue Editor를 고른 모습. 오른쪽 Use Default로 기본 대화를 엽니다.](assets/media/guides/drm-031-forge1201/editor-selector.png "DRM 0.3.1 / Forge 1.20.1의 영문 화면입니다. 대사는 Dialogue Editor, 상점 상품은 NPC Shop에서 만듭니다.")

노드와 선택지를 처음 만든다면 [화면을 보며 첫 대화 만들기](#core/dialogue-system)를 순서대로 따라가세요. 대사 입력, 답변 연결, Save As, NPC에서 확인하기까지 이어집니다.

## 만들고 싶은 것부터 고르세요

| 만들 것 | 열 도구 | 이어 볼 문서 |
| --- | --- | --- |
| NPC 대사와 선택지 | Dialogue Editor | [대화 만들기](#core/dialogue-system) |
| 물건을 사고파는 NPC | NPC Shop | [상점 만들기](#core/shop-system) |
| 대화창·상점창의 모양 | GUI Maker | [화면 꾸미기](#core/gui-system) |
| 돈의 이름·아이콘·잔액 | Currency Editor | [화폐 만들기](#core/currency-editor) |
| 화면에 계속 보이는 정보 | HUD Maker | [HUD 만들기](#core/hud-maker) |

퀘스트·이동 지점·팝업도 같은 에디터 선택 화면에서 엽니다. 설치한 애드온의 도구는 애드온 항목에 표시됩니다.

## Save와 Apply는 언제 누르나요?

**Save / Save As**는 작업을 파일로 남깁니다. **Apply**는 그 작업을 어느 NPC가 사용할지 정합니다. 처음 만든 대화나 상점은 저장한 뒤 NPC에 한 번 적용하세요.

기본 예제는 **Save As**로 이름을 바꿔 저장합니다. 내가 만든 파일은 **Save**로 계속 수정할 수 있습니다.

## 설치가 아직이라면

이 문서는 Forge 1.20.1용입니다. [설치 준비](#core/installation)에서 필요한 파일을 확인하세요. Fabric·NeoForge는 [해당 시작 문서](#core-fabric/quick-start)를 사용합니다.

저장 파일을 다른 서버로 옮길 때는 [폴더 안내](#core/paths)를 참고하세요.

---
title: 간호순과 치료기 연결하기
slug: cobblemon-nurse-joy
order: 550
description: 치료 안내를 만들고 NPC·치료기를 연결해 포켓몬 파티를 치료합니다.
product: drm-cobblemon-editor
category: 서비스 NPC
section: services
status: Draft
version: Fabric / NeoForge 0.2.9
audience: 포켓몬 치료 NPC를 만드는 제작자
tags:
  - nurse-joy
  - healer
  - dialogue
---

## 말을 걸면 파티를 치료해 주는 NPC 만들기

간호순에게 말을 걸어 치료를 고르면, NPC가 연결된 Cobblemon 치료기로 이동해 파티를 치료하고 제자리로 돌아옵니다. **Minecraft 1.21.1의 Fabric·NeoForge**에서 DNPC 또는 CustomNPCs NPC에 적용합니다.

![Nurse Joy Editor의 이름·최대 거리, 대화 문구와 치료·닫기 선택지.](assets/media/guides/cobble-029-neo1211/cobble-nurse.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1 영문 화면. 이 화면은 NPC를 선택하기 전이므로, 왼쪽 안내처럼 먼저 저장·NPC 적용을 마쳐야 치료기를 연결할 수 있습니다.")

1. DRM 에디터 목록에서 **Nurse Joy Editor → Use Default**를 엽니다.
2. **Display Name**에 제작 목록에서 알아볼 이름을 씁니다.
3. 가운데 **Dialogue Text**에 치료 안내를, 오른쪽 **Treatment Choice Text / Close Choice Text**에 플레이어가 누를 문구를 씁니다. 예를 들어 ‘포켓몬을 치료할까요? / 치료 부탁해요 / 다음에 올게요’로 정합니다.
4. **Save As**로 `custom/village_healer.json`처럼 내 파일을 저장합니다.
5. DRM 코어로 간호순으로 사용할 NPC를 열고 **Nurse Joy**에 저장한 파일을 **Apply**합니다.
6. 아래 순서대로 치료기를 연결합니다. 파일 저장만으로 기계가 연결되지는 않습니다.

치료와 닫기의 **동작과 순서는 고정**되어 있습니다. 글자를 ‘보상 받기’로 바꿔도 보상을 주는 버튼이 되지 않습니다. 일반 분기나 보상은 [DRM 대화](#core-fabric/dialogue-system)에서 만듭니다.

![Save As 후 내 파일 경로와 Saved 표시.](assets/media/guides/cobble-029-neo1211/cobble-nurse-save.png "Save As로 위 예제 경로를 저장한 화면입니다. 파일이 생긴 것과 NPC에 역할을 연결한 것은 별도 단계입니다.")

## 치료기 연결하기

1. 역할을 적용한 NPC의 편집 화면에서 **Link Machine**을 누릅니다.
2. **60초 안에 같은 차원**의 Cobblemon 치료기를 **Shift+우클릭**합니다.
3. NPC와 치료기 사이 거리를 확인합니다. 에디터 **Max Distance**는 1~16블록이며, 예제는 16입니다.
4. 치료기 옆에 NPC가 서고 돌아올 수 있는 바닥과 빈 공간을 남깁니다.
5. 양손을 비우고 NPC에게 말을 걸어 치료를 선택합니다.

연결된 치료기는 간호순을 통해 사용합니다. 플레이어가 직접 사용하는 공용 치료기가 필요하면 별도로 둡니다. 한 기계를 여러 간호순이 함께 소유할 수 없고, 연결된 기계를 부수면 연결이 해제됩니다.

## 문구 수정과 기계 변경은 따로 하기

NPC가 참조하는 **같은 파일**에 문구·거리를 Save하면 다음 이용부터 반영됩니다. 다른 이름으로 저장했다면 새 파일을 NPC에 다시 Apply합니다. 치료기는 NPC마다 연결하므로, 같은 역할 파일을 여러 NPC에 적용해도 기계까지 공유되지 않습니다.

| 문제 | 먼저 확인할 것 |
| --- | --- |
| 대화 대신 일반 대화나 상점이 열림 | 양손을 비운 **Shift+우클릭**으로 간호순 역할에 접근합니다. |
| 연결 시간이 지남 | 다시 Link Machine을 누르고 60초 안에 연결합니다. |
| NPC가 치료기로 가지 못함 | 같은 차원·허용 거리·치료기 옆 빈자리와 바닥을 확인합니다. |
| 치료가 시작되지 않음 | 플레이어가 NPC에서 12블록 이내인지, 배틀 중인지, 기계가 충전·사용 가능한지 확인합니다. 다른 치료가 진행 중이면 끝날 때까지 기다립니다. |
| 문구를 바꿨는데 그대로임 | 저장한 파일과 NPC에 적용한 파일 경로가 같은지 확인합니다. |

백업할 파일은 `config/dochi_rpg_maker/cobblemon/nurse_joy/`에 있습니다. NPC와 기계 연결은 월드에도 남으므로 서버를 옮길 때 월드를 함께 보존합니다.

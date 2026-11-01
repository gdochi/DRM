---
title: 마커와 GUI
slug: remnant-marker-gui
order: 117
description: Remnant Msg 마커, 세터 아이템, remnant_msg GUI 연결 방식을 설명합니다.
product: core
category: 레머넌트 Msg
section: remnant-msg
status: 안정
version: 0.3.1
audience: 제작자 / 운영자
tags:
  - remnant
  - gui
  - marker
---

## 장소에 짧은 안내문 놓기

한 위치에만 쓸 문구는 파일부터 만들 필요가 없습니다. **Remnant Msg Setter**를 들고 블록 면을 우클릭하면 그 면에 마커가 놓이고 설정창이 열립니다. 제작 권한이 있는 상태에서 Message에 글을 쓰고 **Save**하세요.

![세터로 마커를 놓은 뒤 안내 문구를 작성한 화면.](assets/media/guides/drm-031-neo1211/remnant-message-ready.png "DRM 0.3.1 / NeoForge 1.21.1 영문 화면. Message에 ‘Follow the lanterns to reach the village.’를 입력했습니다. Message JSON은 기존 문서 선택, Marker model은 월드에서 보일 표식, Save는 이 마커의 메시지 저장입니다.")

1. `/give @s dochi_rpg_maker:remnant_msg_setter`로 세터를 받습니다.
2. 표식을 붙일 블록 면을 우클릭합니다.
3. **Message**에 본문을 입력합니다.
4. 처음에는 **Marker model: Default icon**, Scale 1을 유지하고 Save합니다.
5. 손에서 세터를 치운 뒤 마커를 우클릭해 실제 문구를 읽습니다. 세터를 든 제작자는 읽기 대신 설정창을 엽니다.

![저장한 마커를 빈손으로 사용해 연 실제 읽기 화면.](assets/media/guides/drm-031-neo1211/remnant-placed-setter.png "같은 DRM 0.3.1 / NeoForge 1.21.1 배포 파일에서 저장·빈손 사용 후 열린 결과입니다. 이 기본 GUI는 문구와 Close만 표시합니다. 메시지 배경·글 위치를 바꾸려면 아래 GUI 연결 단계로 진행합니다.")

이 경로의 Save는 메시지를 서버 파일로 만들고 월드의 마커에 연결합니다. 문구를 별도 문서로 저장한 것과 월드에 마커를 놓은 것은 다른 작업입니다.

## 표식 모양 바꾸기

**Marker model**에서 Default icon·Item·Block·Hidden 중 고릅니다. Item과 Block은 검색해서 원하는 항목을 선택하고 Apply합니다. 세터 화면으로 돌아오면 다시 Save해야 마커에 반영됩니다.

![마커의 외형을 고르는 실제 선택창.](assets/media/guides/drm-031-neo1211/remnant-marker-picker.png "DRM 0.3.1 / NeoForge 1.21.1. 위쪽 네 가지 선택은 월드 표식의 외형입니다. 메시지 읽기 창의 배경 그림을 고르는 창은 아닙니다. 이 촬영에서는 Default icon을 유지했습니다.")

**Scale**은 표식 크기, **Billboard**는 카메라를 향하는 방식, X·Y·Z는 표식 모델의 위치 보정입니다. 메시지 창의 글자 크기·위치는 GUI Maker에서 조정합니다.

## 놓은 위치 다시 찾기

세터로 **허공 우클릭** 또는 **웅크린 채 블록 우클릭**하면 월드 목록이 열립니다. 여러 개라면 아래의 메시지 이동 화살표로 고른 뒤 위치·본문을 확인하고 Edit을 누르세요. Delete는 선택한 마커를 삭제하므로 다른 위치를 고르지 않았는지 먼저 봅니다.

![저장한 메시지 한 개가 표시된 월드 목록.](assets/media/guides/drm-031-neo1211/remnant-populated-world-list.png "DRM 0.3.1 / NeoForge 1.21.1 실제 저장 결과입니다. 차원·좌표·연결된 marker_…json과 본문을 확인할 수 있습니다. Previous/Next page는 페이지 이동, 가운데 < / >는 선택 메시지 이동입니다.")

## 같은 문구 재사용과 GUI 연결

여러 위치에서 같은 메시지를 쓰려면 [Remnant Msg Editor](#core/remnant-msg)에서 문서를 저장하고 세터의 **Message JSON**으로 그 문서를 고릅니다. **Policy**는 누가 배치·편집할 수 있는지 같은 운영 규칙을 선택합니다. 일반 사용자는 서버 정책이 허용한 기능만 사용할 수 있습니다.

읽기 화면을 꾸미려면 다음 순서로 연결합니다.

1. [GUI Maker](#core/gui-system)에서 **remnant_msg** 타입 GUI를 만듭니다.
2. `dialog` 요소를 실제 본문 위치에 두고, 필요하면 `panel`·`image`로 배경을 만듭니다.
3. 새 GUI 이름으로 Save As합니다.
4. Remnant 메시지 문서에서 사용할 GUI를 선택하고 저장합니다.
5. 그 문서를 연결한 마커를 다시 읽어 봅니다.

`dialogue` 타입 GUI와 remnant_msg는 서로 다른 화면입니다. 선택지·분기가 필요한 NPC 대화는 [Dialogue Editor](#core/dialogue-system)를 사용하세요.

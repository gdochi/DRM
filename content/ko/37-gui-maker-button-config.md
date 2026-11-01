---
title: 버튼 설정
slug: gui-maker-button-config
order: 103
description: 대화 선택지와 화면 버튼의 기본·사용자 스타일을 인게임에서 바꿉니다.
product: core
category: GUI Maker
section: gui-maker
status: 안정
version: 0.3.1
audience: GUI 제작자
tags:
  - gui
  - button
---

## 선택지를 마인크래프트 기본 버튼으로 바꾸기

1. [GUI Maker](#core/gui-system)에서 사용할 대화 GUI를 엽니다.
2. 위쪽 **Button Config**를 누릅니다.
3. **Choice / choice_box** 행 오른쪽 스위치를 켜 기본 버튼 표시로 바꿉니다. 꺼진 **Custom**은 DRM의 사용자 스타일입니다.
4. **Done**으로 돌아와 **Preview**에서 읽기 편한지 확인합니다.
5. 기본 파일은 **Save As**로 내 이름에 저장하고, Dialogue Editor의 GUI 설정에서 이 파일을 선택합니다.

![Button Config에서 Choice / choice_box가 Custom으로 설정된 화면.](assets/media/guides/drm-031-forge1201/gui-button-config.png "DRM 0.3.1 / Forge 1.20.1. 목록에는 현재 GUI에서 설정할 수 있는 버튼 종류가 나옵니다. 오른쪽 스위치는 그 종류 전체의 표시 방식을 바꿉니다.")

이 설정은 버튼의 **그림을 그리는 방식**을 바꿉니다. 눌렀을 때 상점으로 갈지, 다음 대사로 갈지는 Dialogue Editor의 **Choice actions**에서 정합니다.

![Choice / choice_box 스위치를 켜 Vanilla로 바꾼 Button Config.](assets/media/guides/drm-031-forge1201/gui-vanilla-buttons.png "DRM 0.3.1 / Forge 1.20.1. Choice 행이 Vanilla로 바뀐 상태입니다. Done으로 돌아간 뒤 Preview에서 선택지의 크기와 긴 문장 표시를 확인합니다.")

## 버튼의 크기와 문구는 어디서 바꾸나요?

| 바꿀 것 | 편집 위치 |
| --- | --- |
| 선택지에 쓸 말 | Dialogue Editor → Choices → Label |
| 선택지 영역의 위치·크기 | GUI Maker 캔버스의 Choice 영역 |
| 글자 크기·긴 문장·펄스 강조 | [선택지 크기와 펄스](#core/dialogue-choice-style) |
| 기본 버튼 또는 사용자 스타일 | 이 페이지의 Button Config |

상점처럼 다른 GUI를 열면 그 화면이 지원하는 버튼 목록이 나옵니다. 대화 GUI에서 바꾼 설정이 모든 화면의 버튼을 한꺼번에 바꾸는 것은 아닙니다.

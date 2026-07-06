---
title: 마커와 GUI
slug: remnant-marker-gui
order: 117
description: Remnant Msg 마커, 세터 아이템, remnant_msg GUI 연결 방식을 설명합니다.
product: core
category: 레머넌트 Msg
section: remnant-msg
status: 안정
version: 0.1.2
audience: 제작자 / 운영자
tags:
  - remnant
  - gui
  - marker
---

## 마커와 세터 아이템

Remnant Msg는 월드 배치를 위해 마커와 세터 아이템을 사용합니다.

| 요소 | 역할 |
| --- | --- |
| `remnant_msg_marker` | 월드 안 메시지 위치를 나타내는 블록/엔티티 계열 요소입니다. |
| `remnant_msg_setter` | 메시지 마커를 배치하거나 설정하는 아이템입니다. |
| World List | 월드에 있는 레머넌트 메시지 위치 목록을 다루는 흐름입니다. |

마커에는 메시지 파일과 정책 파일이 연결될 수 있습니다. 메시지 파일이 비어 있으면 마커에 직접 저장된 메시지 값을 사용할 수 있습니다.

## 마커에 저장되는 값

| 값 | 의미 |
| --- | --- |
| `Message` | 마커에 직접 저장된 메시지입니다. |
| `MessageFile` | 참조할 메시지 JSON 파일입니다. |
| `PolicyFile` | 적용할 정책 JSON 파일입니다. |

파일을 참조하면 같은 메시지를 여러 위치에서 재사용하기 쉽습니다. 직접 메시지를 저장하면 한 위치 전용 문구를 빠르게 만들 수 있습니다.

## GUI 연결

Remnant Msg 표시 화면은 GUI Maker의 `remnant_msg` 타입 GUI를 사용합니다.

| GUI 요소 | 역할 |
| --- | --- |
| `panel` | 메시지 프레임입니다. |
| `image` | 배경, 장식, 마커 이미지를 표시합니다. |
| `dialog` | 실제 메시지 본문을 표시합니다. |

메시지 문서의 `gui` 필드에 파일명을 넣으면 해당 `remnant_msg` GUI를 사용합니다. 기본값은 `default_remnant_msg_gui.json`입니다.

## 제작 흐름

1. Remnant Msg Editor에서 메시지 문서를 만듭니다.
2. 필요하면 정책 문서를 정리합니다.
3. GUI Maker에서 `remnant_msg` 타입 GUI를 만듭니다.
4. 메시지 문서의 `gui` 필드에 GUI 파일을 넣습니다.
5. 세터 아이템이나 월드 목록 흐름으로 마커와 메시지를 연결합니다.

## 제한

- `dialogue` GUI를 연결하면 레머넌트 메시지 전용 컴포넌트 흐름과 맞지 않습니다.
- 마커 배치와 메시지 문서 저장은 다른 단계입니다. 메시지를 저장했다고 월드에 자동으로 마커가 놓이지 않습니다.
- 레머넌트 메시지는 선택지 중심 대화가 아닙니다. 선택지와 분기 대화는 Dialogue Editor에서 구성합니다.

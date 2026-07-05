---
title: 레머넌트 Msg
slug: remnant-msg
order: 87
description: Remnant Msg Editor에서 메시지 문서, 정책, 표시 GUI를 구성하는 방법입니다.
product: core
category: 핵심 시스템
section: remnant-msg
status: 안정
version: 0.1.2
audience: 제작자 / 운영자
tags:
  - remnant
  - message
---

## 역할

Remnant Msg는 일반 대화 노드와 별도로 메시지 출력 규칙을 관리하는 기능입니다. 메시지 문서, 정책, 표시 GUI를 분리해서 운영할 수 있으므로 이벤트 안내, 상태 알림, 연출성 텍스트에 적합합니다.

코어는 기본 Remnant Msg GUI와 샘플 메시지/정책 파일을 기본 콘텐츠로 설치합니다.

## 저장 위치

Remnant Msg 관련 파일은 아래 위치를 사용합니다.

| 데이터 | 경로 |
| --- | --- |
| 메시지 | `config/dochi_rpg_maker/remnant_msg/messages` |
| 정책 | `config/dochi_rpg_maker/remnant_msg/policies` |
| 기본 GUI | `config/dochi_rpg_maker/gui/default_remnant_msg_gui.json` |

표시 화면은 GUI Maker의 `remnant_msg` 레이아웃 프로필을 사용합니다.

## 기본 제작 흐름

1. `Dochi RPG Maker Core` 아이템을 우클릭합니다.
2. `Remnant Msg Editor`를 엽니다.
3. 메시지 문서를 작성합니다.
4. 메시지 출력 조건이나 정책을 정합니다.
5. 표시용 GUI가 필요하면 GUI Maker에서 `remnant_msg` 타입 GUI를 수정합니다.
6. 저장 후 서버 리로드로 반영합니다.

## 메시지와 정책의 차이

| 구분 | 역할 |
| --- | --- |
| 메시지 | 실제 표시될 텍스트와 표시 단위입니다. |
| 정책 | 언제, 어떤 방식으로 메시지를 보여줄지 정하는 규칙입니다. |
| GUI | 메시지가 화면에 어떻게 배치될지 정하는 레이아웃입니다. |

메시지 내용과 표시 위치를 분리하면 같은 메시지를 다른 GUI에 연결하거나, 같은 GUI를 여러 정책에서 재사용하기 쉽습니다.

## GUI 연결

Remnant Msg GUI는 일반 대화 GUI와 같은 `gui` 저장소에 있지만 `guiType`과 컴포넌트 구성이 다릅니다. 기본 파일은 `default_remnant_msg_gui.json`이며, 직접 수정하기보다 복사본을 만들어 사용하는 편이 안전합니다.

GUI Maker에서 확인할 때는 미리보기 텍스트와 실제 런타임 메시지가 다를 수 있습니다. 실제 출력은 Remnant Msg 문서와 정책이 전달하는 값이 기준입니다.

## 점검 순서

| 증상 | 확인할 것 |
| --- | --- |
| 메시지가 보이지 않음 | 메시지 파일, 정책 파일, 서버 리로드를 확인합니다. |
| GUI가 깨짐 | `guiType`, 컴포넌트 ID, 기본 GUI 경로를 확인합니다. |
| 다른 메시지가 나옴 | 정책이 참조하는 메시지 ID를 확인합니다. |
| 위치가 이상함 | GUI Maker에서 `remnant_msg` 프로필로 열었는지 확인합니다. |

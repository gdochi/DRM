---
title: 대화 선택지와 Gecko 연출
slug: dialogue-presentation
order: 63
description: 선택지 글자를 키우고 필요한 버튼을 강조하며 Gecko 애니메이션을 대화에 연결합니다.
product: core-fabric
category: 대화 에디터
section: dialogue-editor
status: 안정
version: 0.3.1
audience: 대화 제작자
---

## 선택지 글자와 펄스 강조

대화 노드의 **Choices**에서 **Choice text size (px; 0 = GUI default)**를 사용하면 해당 노드의 글자 크기를 연결된 GUI 레이아웃과 다르게 지정할 수 있습니다. `0`은 GUI 설정을 그대로 사용합니다.

특정 선택지의 **Pulse highlight**를 켜면 그 선택지가 처음 표시될 때 강조 효과가 재생됩니다. 전체 시간, 반복 횟수, RGB 색상과 강도를 설정하세요. 아직 숨겨져 있거나 스크롤 영역 밖에 있는 선택지는 화면에 나타나기 전에 재생 시간을 소비하지 않습니다.

긴 번역 선택지는 실제 화면에 표시되는 문장을 기준으로 버튼 너비와 줄바꿈을 계산합니다. 전체 목록이 영역에 들어가지 않으면 플레이 선택지 영역을 스크롤할 수 있습니다.

![선택지의 Pulse highlight를 켠 편집 화면.](assets/media/guides/drm-031-neo1211/dialogue-choice-pulse.png "DRM 0.3.1 / NeoForge 1.21.1. 오른쪽 ON 아래 Total ticks 40·Pulse count 2·Intensity 25와 색상을 편집합니다. 위 Choice text size의 0은 GUI 기본 크기를 사용한다는 뜻입니다. 그림은 편집 설정이며 실제 재생 장면은 아닙니다.")

[대화 만들기](#core-fabric/dialogue-system)의 Save As·NPC Apply 후 실제 선택지가 나타나는 순간을 확인합니다. 특정 버튼 하나만 강조하려면 그 선택지를 고른 상태에서 Pulse highlight를 켭니다.

## Gecko 애니메이션 경로

`gecko_animation`을 사용하는 Start Route에 Goto 대상을 지정할 수 있습니다. DRM은 애니메이션 요청을 전송한 다음 유효한 대상 노드로 이동합니다.

대화 액션은 같은 서버 틱에 문서 순서대로 평가됩니다. 첫 번째 이동 결과가 우선하지만, 그 뒤에 놓인 Gecko 애니메이션, 명령어, 태그와 아이템 액션도 계속 실행됩니다.

Gecko 재생은 서버 시간축에 동기화됩니다. 애니메이션 시작 후 NPC를 보기 시작한 플레이어도 현재 활성 애니메이션을 받고 진행 위치를 따라갑니다.

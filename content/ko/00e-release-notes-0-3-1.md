---
title: 0.3.1에서 달라진 점
slug: release-notes-0-3-1
order: 3
description: 대화창에 문구·NPC 이름을 넣고 새로운 DNPC 연동을 사용합니다.
product: core
category: 업데이트
section: getting-started
status: 사용 안내
version: 0.3.1
audience: 제작자 / 서버 운영자
hiddenNav: true
---

## 대화창에 이름과 문구 넣기

**GUI Maker → Text → Content**에서 직접 쓸 문장 또는 **NPC name**을 고릅니다. 본문과 별도로 이름표·장소명·안내 문구를 여러 곳에 배치할 수 있습니다.

각 상자의 위치·크기·배경·테두리를 바꾸고 **Save As**한 뒤 대화에 연결합니다. [화면 꾸미기](#core/gui-system)에서 따라 할 수 있습니다.

![GUI Maker에서 독립 Text 상자를 선택한 화면.](assets/media/guides/drm-031-forge1201/gui-text.png "DRM 0.3.1 / Forge 1.20.1. 왼쪽 + Text로 상자를 추가하고 오른쪽 Content에서 Direct input 또는 NPC name을 고릅니다. 가운데 Text 상자는 아래 Dialogue text 본문과 별개로 위치를 바꿀 수 있습니다.")

## DNPC 트레이너와 대화 연결

기존 1.20.1·1.21.1에서는 호환 DNPC·Cobblemon Editor와 함께 위치 고정을 켠 트레이너의 대시·복귀를 사용할 수 있습니다.

Fabric·NeoForge 1.21.1의 코블몬 **순차 실행**은 대화를 끝낸 다음 보상을 지급합니다. [코블몬 보상 설정](#drm-cobblemon-editor/cobblemon-trainer-editor)을 참고하세요.

## 설치 파일

Forge 1.20.1은 Java 17, Fabric·NeoForge 1.21.1은 Java 21, 별도 26.3 파일은 Java 25를 사용합니다. 26.3의 기능 차이는 [전용 안내](#core-fabric/minecraft-26-3)에 있습니다.

처음 쓰는 경우에는 [시작하기](#core/quick-start)부터 보세요.

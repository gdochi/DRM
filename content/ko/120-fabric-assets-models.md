---
title: 내 그림과 NPC 모델 넣기
slug: assets-models
order: 130
description: PNG를 가져와 화면에 넣고 NPC 모델과 동작을 고릅니다.
product: core-fabric
category: 월드와 NPC 도구
section: world-tools
status: 안정
version: 0.3.1
audience: GUI / NPC 제작자
tags:
  - assets
  - geckolib
  - animation
---

## 내 그림을 화면에 넣기

1. PNG를 서버의 `config/dochi_rpg_maker/assets/textures/` 안에 넣습니다.
2. GUI Maker의 **Image** 요소에서 그림 선택창을 엽니다.
3. 파일 이름을 검색하고 미리보기를 확인합니다.
4. **Apply**를 누른 뒤 GUI를 저장합니다.

서버에 넣은 그림은 접속자에게 전달됩니다. 한 PNG는 최대 8 MiB, 한 변은 4096픽셀까지이며 전체 1600만 픽셀 이하여야 합니다.

## NPC 모델 바꾸기

**NPC Basic**에서 사용할 모델과 텍스처를 고릅니다. 미리보기를 회전·확대해 보고 크기와 피격 범위를 정합니다.

Gecko 모델은 해당 Minecraft 버전에 맞는 **GeckoLib**를 설치하고 모델·애니메이션·텍스처 파일을 함께 연결합니다. 걷기·공격·피격·사망처럼 어떤 상황에 어떤 동작을 쓸지 정합니다.

동작의 반복 재생은 **loop**, 한 번만 재생은 **once**, 마지막 자세 유지는 **hold-last**입니다.

## 움직이는 PNG 쓰기

리소스팩과 같은 방식으로 그림 옆에 `.png.mcmeta` 파일을 둡니다. 예를 들어 `priest.png`와 `priest.png.mcmeta`입니다. 프레임 크기·순서·재생 속도는 그 파일에서 정합니다.

화면 안에 배치하는 방법은 [GUI Maker](#core-fabric/gui-system)에서 이어서 설명합니다.

---
title: 에셋, NPC 모델과 애니메이션
slug: assets-models
order: 130
description: 서버 PNG 에셋, 움직이는 텍스처, NPC 모델과 애니메이션 설정을 설명합니다.
product: core-fabric
category: 월드와 NPC 도구
section: world-tools
status: 안정
version: 0.1.8
audience: GUI / NPC 제작자
tags:
  - assets
  - geckolib
  - animation
---

## 서버 텍스처 폴더

직접 만든 PNG는 `config/dochi_rpg_maker/assets/textures/` 아래에 둡니다. 에셋 선택기에서 경로를 검색하고, 모드 이름이나 상위 폴더로 거른 뒤 미리보기를 확인하고 `Apply`를 누르세요.

한 파일은 최대 8 MiB, 한 변은 최대 4096픽셀, 전체는 최대 1600만 픽셀입니다. 서버 밖의 임의 경로는 읽지 않습니다.

## 움직이는 PNG

`priest.png`를 움직이게 하려면 같은 위치에 `priest.png.mcmeta`를 둡니다. 일반 리소스팩과 같은 `animation` 형식으로 프레임 크기, 재생 시간, 프레임 순서와 보간을 설정할 수 있습니다.

## NPC Basic

NPC Basic에서 텍스처와 모델 공급자를 고르고, 편집 화면에서 NPC를 회전·확대해 미리볼 수 있습니다. 모델에 맞게 표시 크기와 히트박스도 조정할 수 있습니다.

GeckoLib을 설치하면 모델, 애니메이션, 텍스처 파일을 연결하고 idle, walk, sprint, attack, hurt, death 동작을 지정할 수 있습니다. 대화의 Gecko Animation 액션으로 특정 애니메이션을 재생하는 연출도 가능합니다.

:::warning GeckoLib은 선택 설치입니다
일반 NPC 편집에는 필요하지 않지만 GeckoLib 모델과 애니메이션을 사용하는 모든 클라이언트에는 GeckoLib 4.8.4 이상이 필요합니다.
:::

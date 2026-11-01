---
title: 내 그림과 NPC 모델 넣기
slug: assets-models
order: 130
description: PNG를 가져와 화면에 넣고 NPC 모델과 동작을 고릅니다.
product: core
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

## PNG를 골라 화면에 넣기

GUI Maker에서 **+ Image → 오른쪽 속성의 Asset: → 그림 선택 → Apply** 순서로 진행합니다. 속성이 길면 오른쪽 패널 안에서 아래로 스크롤하세요. 그림 선택창에서는 파일명 검색, 모드, 상위 폴더 필터로 목록을 줄일 수 있습니다.

![GUI Maker의 실제 Image Asset Picker.](assets/media/guides/drm-031-neo1211/gui-custom-png-search.png "DRM 0.3.1 / NeoForge 1.21.1 영문 화면. guide_icon을 검색해 서버 폴더에 넣은 PNG 한 개를 찾았습니다. 예시 PNG는 DNPC의 기존 아이콘을 변경 없이 복사한 것이며, 선택한 뒤 위쪽 Apply를 눌렀습니다.")

**Apply는 선택한 Image 요소에 그림을 지정하는 버튼**입니다. 전체 GUI 파일을 저장하는 단계는 따로 있습니다. 선택창을 닫은 뒤 위치·너비·높이와 Fit을 조정하고, 새 작업은 Save As로 이름을 정해 보관합니다. 실제 대화·상점 등에 보이려면 그 기능에서 저장한 GUI를 선택해야 합니다.

![선택한 PNG를 Image 요소에 넣고 guide_image로 저장한 결과.](assets/media/guides/drm-031-neo1211/gui-custom-png-applied.png "같은 0.3.1 실행에서 Apply 후 실제 Save As까지 마쳤습니다. 캔버스의 선택된 이미지와 상단 guide_image.json을 확인하세요. 대화 NPC에 적용해 플레이한 결과와는 별도인 GUI 편집·저장 결과입니다.")

## 내 PNG가 목록에 없을 때

1. 서버의 `config/dochi_rpg_maker/assets/textures/`에 PNG를 넣습니다. 폴더로 나누어도 됩니다.
2. 그림 선택창에서 **Refresh**를 누르고 파일명을 검색합니다.
3. 다른 모드나 폴더 필터가 남아 있으면 **All**로 돌립니다.
4. 해당 행의 미리보기를 확인하고 Apply합니다.

서버의 사용자 그림은 접속자에게 전달됩니다. PNG 한 파일은 **8 MiB 이하**, 한 변은 **4096픽셀 이하**, 전체는 **16,777,216픽셀 이하**여야 합니다. GUI를 다른 서버로 옮길 때는 GUI JSON과 그 JSON이 사용하는 그림도 함께 옮깁니다.

## NPC 외형은 어디서 바꾸나요?

DNPC는 **Dochi Npc Core로 NPC 우클릭 → Appearance & Model**에서 모델·스킨·크기를 고릅니다. GUI의 Image 요소는 화면에 붙이는 그림이므로 이 설정으로 NPC 몸체가 바뀌지는 않습니다.

![DNPC의 Appearance & Model 화면.](assets/media/guides/dnpc-012-neo1211/dnpc-appearance.png "DNPC 0.1.2 / NeoForge 1.21.1 영문 화면. Humanoid·Skin·Scale을 가운데 NPC 미리보기와 함께 확인합니다. DNPC의 외형 경로를 설명하는 화면이며 DRM의 CustomNPCs용 NPC Basic 화면과 구분합니다.")

CustomNPCs를 사용하는 기존 1.20.1·1.21.1 프로젝트의 DRM 모델 설정은 **NPC Basic**에서 다룹니다. Minecraft 26.3 이후에는 CustomNPCs를 사용하지 않습니다. DNPC의 [외형·장비 안내](#dochi-npc-core/npc-core-editor)에서 자기 NPC에 맞는 경로를 확인하세요.

Gecko 모델을 가져올 때는 해당 대상에 맞는 모델·텍스처·애니메이션과 GeckoLib가 함께 필요합니다. PNG 하나만 넣으면 걷기나 공격 동작이 만들어지는 것은 아닙니다. **loop**는 반복, **once**는 한 번 재생, **hold-last**는 마지막 자세 유지입니다. 사용할 모델이 제공하는 동작을 선택합니다.

## 움직이는 PNG

세로 프레임 이미지에는 리소스팩 방식의 `.png.mcmeta`를 함께 둡니다. 예를 들어 `priest.png`와 `priest.png.mcmeta`가 한 쌍입니다. 프레임 크기·순서·속도는 그 메타데이터가 정합니다. 화면 배치는 [GUI Maker](#core/gui-system), 대화에 연결하는 단계는 [대화 만들기](#core/dialogue-system)를 이어서 보세요.

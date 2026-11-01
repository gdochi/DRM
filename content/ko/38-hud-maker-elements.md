---
title: HUD 요소
slug: hud-maker-elements
order: 111
description: 체력·잔액 등 표시를 추가하고 위치·크기·겹침 순서를 조정합니다.
product: core
category: HUD Maker
section: hud-maker
status: 안정
version: 0.3.1
audience: HUD 제작자
tags:
  - hud
  - elements
---

## 표시할 정보부터 추가하기

[HUD Maker](#core/hud-maker)를 열면 왼쪽 **HUD TYPE** 목록이 나옵니다. 체력은 **+ Health**, 허기는 **+ Food**, 잔액은 **+ Currency**로 추가합니다. 추가한 뒤에는 아래 **ADDED HUD TYPES**에서 해당 항목을 골라야 오른쪽에 그 항목의 설정이 나옵니다.

![Health를 추가해 선택한 HUD 캔버스와 Inspector.](assets/media/guides/drm-031-forge1201/forge-hud-health.png "DRM 0.3.1 / Forge 1.20.1. ADDED HUD TYPES의 선택 항목 앞에 *가 붙습니다. 예제는 체력 표시를 X 400 / Y 250에 놓고 guide_hud로 저장했습니다.")

| 추가 버튼 | 표시할 정보 |
| --- | --- |
| **+ Currency** | Currency Editor에서 만든 화폐의 잔액 |
| **+ Health / Food / Armor / Air / Level** | 체력·허기·방어도·산소·경험치 |
| **+ Player Head** | 플레이어 얼굴 |
| 마나·스태미나 등 연동 항목 | 설치한 해당 모드의 정보 |

버튼이 회색이면 먼저 필요한 화폐나 연동 모드가 있는지 확인합니다. **CNPC Tempdata / Storeddata**는 CustomNPCs가 설치된 지원 환경에서 쓰는 항목입니다.

## 위치·크기·표시 모양 바꾸기

오른쪽 Inspector를 스크롤해 **Box ID / Layer # / X / Y / W / H**를 찾습니다. Box ID는 표시 하나를 구분하는 이름이고, Layer는 겹쳤을 때 앞뒤 순서입니다. X/Y는 위치, W/H는 크기입니다. 화면에서 직접 골라 옮겨도 됩니다.

표시 종류에 따라 글자·막대·아이콘 설정이 다릅니다. 한 종류를 여러 개 만들었다면 Added 목록에서 무엇을 선택했는지 먼저 확인하세요. **Duplicate**는 현재 표시를 복사하며, 복사한 뒤에는 위치도 옮겨 겹침을 확인합니다.

크리에이티브에서 생존 정보가 숨겨지면 **Render survival HUD**를 확인하고 서바이벌에서도 시험합니다. 구성 요소를 지우는 것과 [기본 하트를 숨기는 것](#core/hud-maker-vanilla)은 다른 설정입니다.

**Save As**로 세트를 저장합니다. 현재 Forge 0.3.1의 Apply 오류와 저장·적용 구분은 [HUD 시작 안내](#core/hud-maker)에 정리했습니다.

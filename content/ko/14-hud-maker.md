---
title: HUD Maker
slug: hud-maker
order: 110
description: HUD Maker에서 커스텀 HUD, 바닐라 HUD 대체, 요소, 연결, 표시 조건을 구성하는 방법입니다.
product: core
category: HUD Maker
section: hud-maker
status: 안정
version: 0.3.1
audience: HUD 제작자
tags:
  - hud
  - editor
---

## 화면 위에 체력 막대 놓기

HUD는 플레이 중 계속 보이는 체력·허기·잔액 표시입니다. DRM 코어의 **HUD Maker**에서 게임 화면을 보며 배치합니다. 아래는 **DRM 0.3.1 / Forge 1.20.1**의 영문 화면입니다.

![Health 구성 요소를 추가해 X 400, Y 250으로 옮기고 guide_hud 세트로 저장한 화면.](assets/media/guides/drm-031-forge1201/forge-hud-health.png "왼쪽 + Health로 추가하고 Added HUD Types의 Health를 선택합니다. 오른쪽 Inspector를 스크롤하면 위치와 구성 요소 설정을 찾을 수 있습니다. 가운데 녹색 선은 편집 중인 체력 표시입니다.")

1. 왼쪽 **+ Health**를 눌러 체력 표시를 추가합니다.
2. **Added HUD Types → Health**를 선택합니다. 선택된 항목 앞에는 `*`가 표시됩니다.
3. 오른쪽 **Inspector**를 스크롤해 **X / Y**를 정합니다. 예제는 **400 / 250**으로 가운데에서 확인하기 쉽게 놓았습니다. 실제 사용할 때는 원하는 모서리로 옮깁니다.
4. **Box ID**로 구성 요소를 구분하고 크기·글자·막대 모양을 조절합니다. 화면 위 패널과 겹치면 패널의 `-` 버튼으로 접어 배치를 확인합니다.
5. 상단 **Save As**에 `guide_hud`처럼 새 세트 이름을 써 저장합니다. **Loaded JSON: guide_hud**로 바뀌었는지 확인합니다.
6. 상단 **Apply**로 사용할 세트를 지정합니다. 편집기를 닫고 실제 플레이 상태와 GUI 배율에서 위치·표시를 확인합니다.

저장은 파일을 보관하는 작업이고 Apply는 표시할 세트를 고르는 작업입니다. 사용을 멈추려면 **Unapply**, 배치를 계속 고치려면 같은 세트를 Load해 수정·저장합니다.


## Apply 후 오류가 표시된다면

현재 Forge 0.3.1 배포본에서 **Apply**를 눌렀을 때 `JSON save failed: too many requests`가 표시되는 경우를 확인했습니다. 이때 세트 파일은 저장되었어도 활성화가 끝난 것은 아닙니다. **Applying HUD Set** 문구만으로 성공으로 판단하지 말고, 오류 표시와 실제 플레이 화면을 확인하세요. 위 사진은 레이아웃 저장까지의 화면입니다.

## 체력 외에 추가할 표시

| 왼쪽 버튼 | 표시할 정보 |
| --- | --- |
| **+ Currency** | Currency Editor에서 만든 화폐의 잔액 |
| **+ Health / Food / Armor / Air / Level** | 플레이어 체력·허기·방어도·산소·경험치 |
| **+ Player Head** | 플레이어 얼굴 |
| 설치한 연동 모드의 항목 | 해당 모드가 제공하는 마나·스태미나 등 |

화폐는 [Currency Editor](#core/currency-editor)에서 먼저 만든 **같은 화폐 ID**를 고릅니다. 잔액을 표시하는 HUD를 추가하는 것만으로 돈이 지급되지는 않습니다.

다른 모드의 표시를 쓰려면 그 모드도 설치되어 있어야 합니다. **CNPC Tempdata / Storeddata**는 CustomNPCs를 설치한 지원 환경에서만 씁니다. Minecraft 26.3 이상에서는 CustomNPCs 항목을 사용하는 구성을 만들지 않습니다.

![Vanilla HUD Guide를 펼친 기본 표시 스위치.](assets/media/guides/drm-031-forge1201/forge-hud-guide.png "DRM 0.3.1 / Forge 1.20.1. 기본 하트 등을 숨길 때는 이 Visible 스위치를 사용합니다. 새 DRM 체력 표시를 추가하는 것은 왼쪽 + Health입니다.")

## 제작 화면과 실제 플레이 화면 확인하기

크리에이티브에서는 생존 정보 표시 정책 때문에 체력·허기 등이 보이지 않을 수 있습니다. 편집 화면의 **Render survival HUD**와 실제 게임 모드를 함께 확인하고, 배포할 때 사용할 서바이벌 상태에서도 시험합니다.

DRM 막대와 기본 하트가 겹치면 Inspector의 **Vanilla HUD Guide**를 펼쳐 필요한 기본 표시만 숨깁니다. 기본 표시를 숨긴 것만으로 새 체력 막대가 만들어지지는 않습니다. 아래 점검에서 실제 표시 상태도 함께 확인합니다.

| 증상 | 확인할 것 |
| --- | --- |
| 저장한 HUD가 안 보임 | 저장한 세트와 Apply한 세트가 같은지, 구성 요소가 켜져 있는지 |
| 편집 중 보이지만 닫으면 안 보임 | Apply 오류 여부를 먼저 확인합니다. 오류가 없다면 게임 모드·표시 조건·F3 디버그 화면 여부를 확인합니다. |
| 위치가 어긋남 | X/Y·기준점·화면 크기·GUI 배율 |
| 잔액이 그대로임 | 화폐 ID와 실제 플레이어 잔액 |
| 다른 모드 HUD와 겹침 | 각 모드의 표시 설정과 DRM 구성 요소의 위치 |

## 저장 파일 가져가기

세트는 `config/dochi_rpg_maker/hud/sets/<세트 이름>/`에 저장됩니다. 예제 `guide_hud`에는 **hud_set.json**과 **components/hp/hp.json**이 만들어집니다. 체력 구성 파일 하나만 옮기지 말고 세트 폴더를 함께 보관합니다. 현재 선택한 세트는 `hud/active_set.json`에 기록됩니다.

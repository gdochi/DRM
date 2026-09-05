---
title: HUD Maker
slug: hud-maker
order: 110
description: HUD Maker에서 커스텀 HUD, 바닐라 HUD 대체, 요소, 바인딩, 표시 조건을 구성하는 방법입니다.
product: core
category: HUD Maker
section: hud-maker
status: 안정
version: 0.1.4
audience: HUD 제작자
tags:
  - hud
  - editor
---

## 역할

HUD Maker는 플레이어 화면에 표시되는 HUD 정의를 만드는 에디터입니다. GUI Maker가 대화/상점 화면의 레이아웃을 다룬다면, HUD Maker는 플레이 중 화면 위에 계속 렌더링되는 요소를 다룹니다.

HUD 정의는 `HudDefinition` 구조를 사용합니다. 하나의 정의에는 HUD 모드, 바닐라 HUD 대체 대상, 활성 여부, 요소 목록이 들어갑니다.

## 저장 위치

| 데이터 | 경로 |
| --- | --- |
| HUD 세트 | `config/dochi_rpg_maker/hud/sets` |
| 활성 HUD 세트 | `config/dochi_rpg_maker/hud/active_set.json` |
| HUD 정의 | `config/dochi_rpg_maker/hud/definitions` |
| 바닐라 HUD 정의 | `config/dochi_rpg_maker/hud/definitions/vanilla` |
| 커스텀 HUD 정의 | `config/dochi_rpg_maker/hud/definitions/custom` |

HUD 정의의 서버 JSON kind는 `hud_definition`입니다. 활성 세트는 `hud/active_set.json`으로 따로 관리됩니다.

0.1.4는 화폐 지갑, 체력, 허기, 방어도, 산소, 경험치 기본 정의를 제공합니다. 모두 `enabled: false`로 설치되므로 원하는 정의만 복제하거나 활성화해 사용합니다.

## 상단 버튼

| 버튼 | 기능 |
| --- | --- |
| `Editors` | 에디터 선택 UI로 돌아갑니다. |
| `Create New` | 새 HUD 정의 또는 초안을 만듭니다. |
| `Load` | HUD 정의 JSON을 불러옵니다. |
| `Save` | 현재 HUD 정의를 저장합니다. |
| `Save As` | 새 파일명으로 저장합니다. |
| `Reset` | 현재 HUD 초안을 기본값으로 되돌립니다. |
| `Close` | 에디터를 닫습니다. |

HUD Maker 일부 버튼은 번역 키를 사용합니다. 화면에는 지역화된 라벨이 표시됩니다.

## HUD 모드

| 모드 | 설명 |
| --- | --- |
| `CUSTOM_OVERLAY` | 바닐라 HUD와 별개로 추가 HUD를 그립니다. |
| `VANILLA_REPLACEMENT` | 특정 바닐라 HUD 슬롯을 DRM HUD 정의로 대체합니다. |

바닐라 대체를 사용할 때는 `replaceVanilla` 값으로 어떤 HUD를 대체할지 정합니다.

## 바닐라 HUD 슬롯

| 슬롯 | 의미 |
| --- | --- |
| `HEALTH` | 체력 |
| `ARMOR` | 방어도 |
| `FOOD` | 허기 |
| `AIR` | 산소 |
| `EXPERIENCE` | 경험치 |
| `HOTBAR` | 핫바 |
| `CROSSHAIR` | 조준점 |
| `MOUNT_HEALTH` | 탑승 생물 체력 |
| `BOSS_BAR` | 보스바 |

모든 슬롯이 같은 방식으로 꾸밀 수 있는 것은 아닙니다. 대체 정의가 활성화된 슬롯만 DRM 렌더러가 대신 그립니다.

`Vanilla HUD` 설정 화면에서는 `Hide Health`, `Hide Armor`, `Hide Food`, `Hide Air`, `Hide XP Bar`, `Hide XP Level`, `Hide Hotbar`, `Hide Crosshair`, `Hide Boss Bar`를 각각 켜고 끌 수 있습니다. 채팅, 디버그 텍스트, 스코어보드, 플레이어 목록은 이 설정이 숨기지 않습니다.

## HUD 요소

| 요소 | 용도 |
| --- | --- |
| `GROUP` | 여러 요소를 묶는 부모 요소입니다. |
| `TEXT` | 글자나 숫자 값을 표시합니다. |
| `BAR` | 체력, 허기, 경험치처럼 비율이 있는 값을 막대로 표시합니다. |
| `IMAGE` | 텍스처, 아이콘, 배경 이미지를 표시합니다. |
| `ICON_LIST` | 방어도처럼 정해진 개수의 아이콘을 값에 따라 채웁니다. |

## 외부 게이지와 모드 HUD 가이드

Inspector의 `Mod HUD Guide`는 `Vanilla HUD Guide` 아래에 있습니다. 여기서 Iron's Spells 마나 HUD와 Combat Roll 스태미너 HUD의 원본 표시를 각각 숨길 수 있습니다. 이 스위치는 DRM 컴포넌트를 자동 생성하지 않으므로 대응하는 DRM HUD 컴포넌트는 별도로 추가해야 합니다.

| 데이터 소스 | 용도 |
| --- | --- |
| `irons_spellbooks_mana` | Iron's Spells 현재/최대 마나 |
| `combat_roll_stamina` | Combat Roll 현재/최대 스태미너 |
| `custom_npcs_tempdata` | CustomNPCs 숫자형 `tempdata` 키 |
| `custom_npcs_storeddata` | CustomNPCs 숫자형 `storeddata` 키 |

외부 바는 DRM 게이지 스프라이트를 기본 디자인으로 사용합니다. 단색 사각형으로 교체하기보다 컴포넌트 tint/color로 색을 조정하세요.

CustomNPCs 데이터 컴포넌트는 여러 개 추가할 수 있습니다. `Data Key`를 정하고 `Max Key` 또는 숫자 `Max Value`를 설정합니다. 서버 설정 `hud_maker.customNpcsDataHudMaxInstances`가 데이터 컴포넌트 종류별 최대 개수를 제한하며 기본값은 3, 허용 범위는 1–16입니다.

요소는 `transform`, `binding`, `renderer`, `visibility`, `animation`, `children` 구조를 가집니다. 0.1.3 기본 방어도 HUD는 `ICON_LIST`를 사용합니다.

## Open Canvas

`Open Canvas`는 HUD 배치를 화면형 레이아웃으로 조정하기 위한 연결 버튼입니다. HUD 요소의 위치와 크기를 더 시각적으로 조정해야 할 때 사용합니다.

일반 HUD 정의와 `currency_hud` 레이아웃은 저장소가 다르므로, 어떤 모드에서 열었는지 먼저 확인해야 합니다.

## 가능한 것

- 커스텀 HUD를 화면 위에 추가할 수 있습니다.
- 체력, 허기, 방어도, 경험치 같은 바닐라 HUD 일부를 대체할 수 있습니다.
- 텍스트, 이미지, 바, 그룹 요소를 배치할 수 있습니다.
- 요소마다 표시 조건, 바인딩, 렌더러 설정을 나눌 수 있습니다.
- Currency Editor에서 만든 화폐 값을 HUD에 표시할 수 있습니다.

## 제한

- HUD Maker는 플레이어 화면 HUD를 다룹니다. 대화창이나 상점창의 레이아웃은 GUI Maker가 담당합니다.
- HUD 요소가 있어도 바인딩이 없으면 실제 플레이어 데이터와 연결되지 않습니다.
- 바닐라 HUD 대체는 선택한 슬롯에만 적용됩니다. 모든 Minecraft 화면 UI를 한 번에 바꾸는 기능은 아닙니다.
- 서버 잔액이나 플레이어 상태는 클라이언트가 직접 임의로 바꾸지 않습니다. HUD는 전달받은 값을 표시합니다.

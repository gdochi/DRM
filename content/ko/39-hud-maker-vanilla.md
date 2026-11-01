---
title: 바닐라 HUD 대체
slug: hud-maker-vanilla
order: 112
description: 커스텀 HUD와 겹치는 기본 하트·경험치·핫바의 표시를 조절합니다.
product: core
category: HUD Maker
section: hud-maker
status: 안정
version: 0.3.1
audience: HUD 제작자
tags:
  - hud
  - vanilla
---

## 새 체력 막대와 기본 하트가 겹칠 때

새 체력 표시를 추가해도 마인크래프트 기본 하트가 자동으로 사라지지는 않습니다. **HUD Maker → 오른쪽 Inspector → Vanilla HUD Guide**를 펼쳐 기본 표시를 따로 정합니다.

![Vanilla HUD Guide를 펼쳐 Health·Food·XP·핫바 등의 Visible 스위치를 보는 화면.](assets/media/guides/drm-031-forge1201/forge-hud-guide.png "DRM 0.3.1 / Forge 1.20.1. 현재 스위치는 모두 Visible입니다. 이 목록은 마인크래프트 기본 표시를 다루고, 왼쪽 Added HUD Types는 DRM이 추가한 표시를 다룹니다.")

1. 먼저 [새 HUD](#core/hud-maker)를 저장하고 실제로 표시되는지 확인합니다.
2. Inspector의 **Vanilla HUD Guide → HUD Guide +**를 펼칩니다.
3. 바꿀 기본 표시의 **Visible** 스위치를 끕니다. 체력만 바꾸려면 **HP Health**부터 조정합니다.
4. 세트를 저장·적용하고 플레이 화면에서 확인합니다. Forge 0.3.1에서 Apply 오류가 나오면 활성화가 끝난 것이 아니므로 [해당 안내](#core/hud-maker)를 확인합니다.

| 화면 이름 | 기본 표시 |
| --- | --- |
| **HP Health / AR Armor / FD Food / O2 Air** | 하트·방어도·허기·산소 |
| **XP XP Bar / LV Level** | 경험치 막대·레벨 숫자 |
| **HB Hotbar / + Crosshair / BB Bossbar** | 핫바·조준점·보스바 |

기본 하트를 숨기는 것만으로 새 체력 막대가 만들어지지는 않습니다. 새 HUD를 아직 만들지 않았다면 기본 표시는 켜 두고 작업합니다.

## 다른 모드의 표시와 겹칠 때

아래 **Mod HUD Guide**는 지원 모드가 그리는 기존 HUD의 표시 여부를 다룹니다. 왼쪽의 **+ Iron’s Mana** 같은 버튼은 DRM 쪽 표시를 새로 추가합니다. 기존 표시를 숨길지와 새 표시를 어디에 놓을지 따로 정합니다.

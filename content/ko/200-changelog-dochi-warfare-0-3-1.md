---
title: 0.3.1 Change Log
slug: changelog-0-3-1
order: 900000
description: CurseForge에 공개된 버전의 변경 기록입니다.
product: dochi-warfare
category: 체인지로그
section: releases
status: Published
version: 0.3.1
releaseVersion: 0.3.1
curseForgeFiles:
  - 9384015
  - 9384011
---
CurseForge에 업로드된 버전만 기록합니다. 이전 버전은 CurseForge에서 확인하세요.
## 공개 파일
| 환경 | 업로드 (UTC) | 파일 |
| --- | --- | --- |
| NeoForge 1.21.1 | 2026-10-31 | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochis-warfare/files/9384015) |
| Forge 1.20.1 | 2026-10-31 | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochis-warfare/files/9384011) |
아래 변경 사항은 공개된 영문 릴리스 노트를 따릅니다. 파일 목록에는 이 프로젝트에 실제 업로드된 파일만 표시합니다.
> **Update Notice:** Version 0.3.1 adds compatibility with **DNPC (Dochi's NPC Core)**. Users who only use **CNPC (CustomNPCs)** do not need to update.
## Global
### Added
* Added DW firearm and melee combat support for DNPC without requiring CNPC.
* Added support for DNPC's friendly/hostile relationships and friendly group protection.
* Added movement slowdown during reloading and stationary shooting for DNPC.
* Added DNPC configuration, pose preview, and event dialogue integration.
* Added support for DNPC's Military Bed "Wake Up When Damaged" setting.
* Added PointBlank firearm model previews in the DNPC Pose Editor.
* Added checkbox selection, Select All, and Delete Selected to weapon, armor, and skin lists.
### Fixed
* Fixed automatic switching between firearms and melee weapons repeatedly stopping.
* Fixed incorrect text in the overview and probability totals.
* Fixed probability values disappearing during list editing or page navigation.
### Changed
* Changed DW combat behavior to respect DNPC's external AI control.
* Changed DW to preserve movement paths, targets, and equipment during external control.
* Changed DW to resume combat when external control ends.
* Changed DW tools to appear in DNPC and CNPC Creative Tabs when available.
* Changed the layout of NPC, pose, booby trap, clone, and mercenary editors.
* Changed the Pose Editor layout into separate editing and preview sections.
### Improved
* Improved movement speed restoration when DW combat control ends.
* Improved editor buttons, input fields, and overall UI visibility.
* Improved settings categories and back/forward navigation.
* Improved profile search and scrolling.
* Improved skin previews, preset cards, descriptions, and scroll indicators.
* Improved button spacing, text alignment, and long weapon name wrapping.
* Improved panel background rendering.
## NeoForge 1.21.1
### Fixed
* Fixed a crash when opening the Mercenary Configuration screen.
## 이전 버전
[CurseForge에서 이전 버전 보기](https://www.curseforge.com/minecraft/mc-mods/dochis-warfare/files/all)

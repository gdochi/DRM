---
title: 0.3.1 Change Log
slug: changelog-0-3-1
order: 900000
description: CurseForge에 공개된 버전의 변경 기록입니다.
product: dochi-warfare-expanded
category: 체인지로그
section: releases
status: Published
version: 0.3.1
releaseVersion: 0.3.1
curseForgeFiles:
  - 9384019
  - 9384017
---
CurseForge에 업로드된 버전만 기록합니다. 이전 버전은 CurseForge에서 확인하세요.
## 공개 파일
| 환경 | 업로드 (UTC) | 파일 |
| --- | --- | --- |
| NeoForge 1.21.1 | 2026-10-31 | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-warfare-expanded/files/9384019) |
| Forge 1.20.1 | 2026-10-31 | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-warfare-expanded/files/9384017) |
아래 변경 사항은 공개된 영문 릴리스 노트를 따릅니다. 파일 목록에는 이 프로젝트에 실제 업로드된 파일만 표시합니다.
> **Update Notice:** Version 0.3.1 adds compatibility with **DNPC (Dochi's NPC Core)**. Users who only use **CNPC (CustomNPCs)** do not need to update. **Important:** Update both DW and DWE together.
## Global
### Added
* Added DNPC crew support for vehicle drivers, gunners, and other crew roles.
* Added DNPC friendly/hostile relationship support for vehicle targeting and ally protection.
* Added combat dismount support for DNPC crews without requiring CNPC.
* Added support for Superb Warfare 0.8.9.2 vehicles.
* Added settings for handling NPC crews when vehicles are destroyed.
### Fixed
* Fixed AH-6 patrols failing to aim and fire fixed machine guns at ground targets.
* Fixed fixed-wing aircraft failing to aim with mounted weapons.
* Fixed fixed-wing aircraft climbing excessively near unloaded terrain.
* Fixed reloads taking too long after restoring vehicles from another world.
* Fixed ammo duplication and magazine capacity overflow when changing ammo settings during reloading.
* Fixed vehicles incorrectly blocking their own fire as friendly obstacles.
* Fixed unresponsive entries in crew and Soulstone selection screens.
### Changed
* Changed vehicle AI ammo and weapon processing to reduce unnecessary repeated operations.
### Improved
* Improved update warnings when using incompatible older DW versions.
* Improved vehicle AI performance by reducing redundant processing.
### Expanded Addon Compatibility
* Compatibility is verified for the listed vehicles only. Not all vehicles or special weapons are supported.
Verified vehicle AI movement, firing, and reloading with NPC crews.
| Addon | Supported Versions | Verified Vehicles |
| --- | --- | --- |
| AshVehicle | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley, AH-64, F-22 |
| HaloVehicles | Forge 1.20.1 / NeoForge 1.21.1 | M12 HMG |
| MCSP | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley |
| Vintage Vehicle Pack (VVP) | Forge 1.20.1 | BMP-2 |
| Frontline Combat Pack (FCP) | Forge 1.20.1 | BMP-2 |
| Spectacular Machines Addon (SMA) | Forge 1.20.1 | Type 10 |
## 이전 버전
[CurseForge에서 이전 버전 보기](https://www.curseforge.com/minecraft/mc-mods/dochi-s-warfare-expanded/files/all)

---
title: 0.1.2 Change Log
slug: changelog-0-1-2
order: 900000
description: CurseForge에 공개된 버전의 변경 기록입니다.
product: dochi-npc-core
category: 체인지로그
section: releases
status: Published
version: 0.1.2
releaseVersion: 0.1.2
curseForgeFiles:
  - 9383998
  - 9383997
  - 9383992
  - 9383987
  - 9383985
---
CurseForge에 업로드된 버전만 기록합니다. 이전 버전은 CurseForge에서 확인하세요.
## 공개 파일
| 환경 | 업로드 (UTC) | 파일 |
| --- | --- | --- |
| NeoForge 26.3 | 2026-10-31 | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-npc-core/files/9383998) |
| Fabric 26.3 | 2026-10-31 | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-npc-core/files/9383997) |
| NeoForge 1.21.1 | 2026-10-31 | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-npc-core/files/9383992) |
| Fabric 1.21.1 | 2026-10-31 | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-npc-core/files/9383987) |
| Forge 1.20.1 | 2026-10-31 | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-npc-core/files/9383985) |
아래 변경 사항은 공개된 영문 릴리스 노트를 따릅니다. 파일 목록에는 이 프로젝트에 실제 업로드된 파일만 표시합니다.
## Global
### Fixed
* Fixed carried blocks and contents disappearing when applying templates to existing NPCs.
* Fixed carried items being copied to newly cloned NPCs.
* Fixed old mount records, timeout data, squad states, and combat progress persisting in new NPCs or clones.
* Fixed NPC jobs interfering with movement and actions controlled by other mods.
* Fixed hired NPCs failing to resume jobs and contract expiration handling after external control ends.
* Fixed DRM scheduled shops remaining accessible after closing, being disabled, or switching shops.
### Improved
* Improved NPC pathfinding accuracy.
## Forge 1.20.1 / Fabric & NeoForge 1.21.1
### Added
* Added NPC deletion using the Delete key in the NPC screen.
* Added Farmer's Delight cooking jobs.
### Fixed
* Fixed NPCs waiting unnecessarily in front of trees that cannot be chopped.
* Fixed NPCs returning after mining only one block.
* Fixed incorrect songs playing during Immersive Melodies performances or after resuming.
* Fixed fuel and ingredients disappearing during cooking.
* Fixed empty buckets not being returned after cheese production.
* Fixed cooking stations becoming unusable after resetting pizza jobs.
### Improved
* Improved default job schedules.
## Fabric & NeoForge 1.21.1
### Fixed
* Fixed stationary Cobblemon trainers being unable to dash and return to position.
* Fixed trainers failing to lock their position again after movement.
## Fabric 1.21.1 / Fabric & NeoForge 26.3
### Fixed
* Fixed previous movement and sleep states interfering with external NPC control.
## NeoForge 1.21.1
### Added
* Added cutting board, furnace, smoker, pizza assembly, and French Delight cheese mold jobs.
* Added ingredient and product transfers using baskets and cabinets.
* Added cabinet opening and closing animations during cooking jobs.
## 이전 버전
[CurseForge에서 이전 버전 보기](https://www.curseforge.com/minecraft/mc-mods/dochi-s-npc-core/files/all)

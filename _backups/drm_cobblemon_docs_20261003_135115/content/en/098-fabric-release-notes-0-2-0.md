---
title: Fabric 0.2.0 Update
slug: release-notes-0-2-0
order: 8
description: Tooltip Maker, shared hover help, dialogue presentation, and Gecko animation improvements in Fabric 0.2.0.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.2.0
audience: Creators / Operators
---

## Change Log 0.2.0

### Changed

- Editor fields and buttons now use more compact content-based widths where appropriate.
- Shared hover-help cards now wrap, reposition, and stay above editor content more consistently.
- Gecko animation playback now uses a synchronized server timeline and catches up correctly for late viewers.

### Added

- **Tooltip Maker** for item hover layouts, 2D or 3D item previews, images, text, scrolling, and entrance effects.
- Player-head HUD rendering.
- Per-node dialogue choice text sizing and optional pulse highlights.
- Gecko animation Start Routes with a Goto target.

### Fixed

- Dialogue navigation no longer prevents later actions such as animations, commands, tags, or item actions from running.
- Gecko previews can seek and restart independently, retry missing assets, and fall back safely when loading fails.
- Overlapping, stretched, and incorrectly clipped controls were corrected in GUI Maker, Quest Editor, Faction Editor, and related screens.

### Updating

Back up your world and `config/dochi_rpg_maker/`, then install the same DRM Core 0.2.0 JAR on the server and every client. CustomNPCs remains required by this Fabric build. Existing 0.1.9 data remains the starting point; use `Save As` when customizing protected defaults.

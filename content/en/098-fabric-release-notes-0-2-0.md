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
hiddenNav: true
---

This is a historical release record. See [DRM 0.3.1](#core-fabric/release-notes-0-3-1) for current guidance.

## Customize an item tooltip

Tooltip Maker arranges the name, description and item preview. Select an element on the center canvas, edit it on the right and use Preview. This is a current NeoForge screen, not the historical Fabric 0.2.0 UI. Continue with the [current guide](#core-fabric/tooltip-maker) for saving and applying it.

![Customize an item tooltip.](assets/media/guides/drm-031-neo1211/tooltip-maker.png "DRM 0.3.1 / NeoForge 1.21.1. This is the related feature in the current production build, not a capture of the historical UI described below.")

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

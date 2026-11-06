---
title: What's New In 0.1.6
slug: release-0-1-6
order: 9
description: Shared editor improvements, hover help, player head HUD support, and rendering fixes.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.1.6
audience: Creators / Operators
tags:
  - release
  - migration
hiddenNav: true
---

Minecraft 1.20.1 · Forge

## Shared editor controls

The document, folder and save icons keep the same roles across editors. The two arrows move through visited screens; use the disk icon or Save As to save. Continue with the [current guide](#core/gui-system) for saving and applying it.

![Shared editor controls.](assets/media/guides/drm-031-forge1201/gui-text.png "DRM 0.3.1 / Forge 1.20.1. This is the related feature in the current production build, not a capture of the historical UI described below.")

## Changed

- Unified the top menu and navigation UI across editors.
- Improved the UI and usability of the configuration screen and various editors.
- Improved item tooltip model rendering and NPC GeckoLib animation handling.

## Added

- Added shared hover help for editors.
- Added a player head HUD component.
- Added popup layout, viewport cropping, and JSON list request state management.

## Fixed

- Fixed rendering, buffer, and stencil issues in TaCZ gun tooltips.
- Fixed NPC model preview and animation synchronization issues.
- Fixed layout, selection, and display issues across editor screens.

Update both the server and clients to **0.1.6**. Back up `config/dochi_rpg_maker` before replacing the mod JAR.

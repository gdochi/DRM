---
title: Fabric and NeoForge 0.2.4 update
slug: release-notes-0-2-4
order: 7
description: Shared authoring workflow, restock clocks, and GUI tiling settings.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.2.4
audience: Creators / Operators
---

## Shared documentation and installation

**Fabric and NeoForge DRM 0.2.4 for Minecraft 1.21.1** share this documentation. Authoring tools and normal workflows are the same; choose your loader's JAR and dependencies in [Installation](#core-fabric/installation).

## NPC Shop

Choose `Real ticks` or `World ticks` in product details under `RESTOCK > Timer basis`. The setting applies shop-wide. Real ticks counts actual game ticks; World ticks includes world time skipped by sleep.

Changing the clock or moving time backward rebases the remaining cooldown. File-based runtime stock/restock state retains the existing JSON persistence. See [NPC Shop](#core-fabric/shop-system).

## GUI Maker

- Tile/Stretch and direct `Sprite Scale %` input, 50–400%.
- Per-component `Tile W %` and `H %` when `Fit` is `Tile`, each 10–800%.
- Consistent Tile settings between preview and live dialogue, with improved repeating-image rendering.

See [GUI Maker](#core-fabric/gui-system). Tile width/height are component settings, not global UI defaults.

## Quests and addons

Both current Quest Editors author automatic quests. Add the matching Dochi Cobblemon Editor build for trainer-victory objectives. See [Quests](#core-fabric/quest-system) and [Trainer Victory Quests](#drm-cobblemon-editor/cobblemon-trainer-quests).

Back up `config/dochi_rpg_maker` and the world, then install matching-loader 0.2.4 on the server and every client. Use `Save As` for custom versions of protected defaults.

---
title: Forge 0.2.1 update
slug: release-0-2-1
order: 7
description: Per-NPC shop stock, restock clocks, and GUI tiling controls.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.2.1
audience: Creators / Operators
---

## Current version

Minecraft 1.20.1 · Forge · DRM **0.2.1**. Update the server and all clients together and back up `config/dochi_rpg_maker` and the world.

## NPC Shop

- Runtime stock and deadlines persist per NPC in NBT. Different NPCs using the same JSON have separate stock.
- JSON keeps initial stock, products, and restock configuration; definition saves/exports omit runtime deadlines.
- Choose `Real ticks` or `World ticks` in product details under `RESTOCK > Timer basis`. The choice applies shop-wide and controls whether sleep skips count.

See [NPC Shop](#core/shop-system) for setup and legacy-stock migration.

## GUI Maker

- Tile/Stretch and direct `Sprite Scale %` input in `Default UI Settings`, with scale 50–400%.
- Per-component tile width/height from 10–800% when image `Fit` is `Tile`.
- Dialogue runtime reads Tile settings, with improved repeating-image rendering and visibility.

See [GUI Maker](#core/gui-system) for authoring and JSON reference. Use `Save As` for custom copies of bundled templates.

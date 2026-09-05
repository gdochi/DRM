---
title: Forge And Fabric Boundary
slug: loader-compatibility
order: 45
description: How the Forge 1.20.1 and Fabric 1.21.1 documentation differ, including migration checks.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.1.8
audience: Creators / Server operators
tags:
  - fabric
  - compatibility
  - migration
---

## Build Covered By These Pages

Every page in this product targets `DRM Core 0.1.8`, `Fabric 1.21.1`, and Java 21. The separate `Dochi's RPG Maker Forge 1.20.1` product remains the Forge documentation.

| Boundary | Forge docs | Fabric docs |
| --- | --- | --- |
| Minecraft | 1.20.1 | 1.21.1 |
| Loader | Forge 47+ | Fabric Loader 0.18.0+ |
| Java | 17 | 21 |
| Example JAR | `dochi_rpg_maker-0.1.4-1.20.1-forge.jar` | `dochi_rpg_maker-0.1.8-fabric-1.21.1.jar` |

## 0.1.8 Installation Boundary

Fabric 0.1.8 requires CustomNPCs 1.0.0. Install the following on the server and every connecting client:

- DRM Core 0.1.8 for Fabric
- Fabric API 0.116.11+1.21.1 or newer
- CustomNPCs 1.0.0

GeckoLib, FTB Quests, Mod Menu, and CobbleDollars are needed only for their related optional integrations.

## Preserved Data

Fabric keeps the `dochi_rpg_maker` mod ID and `config/dochi_rpg_maker` data root. Existing dialogue, shop, GUI, currency, HUD, and Remnant Msg JSON can be loaded from a copied test folder.

0.1.8 adds folders for quests, factions, popups, and server PNG assets that were not part of 0.1.7. Do not assume an older build can understand files saved by the new version.

## Moving From Forge

1. Back up `config/dochi_rpg_maker` and the world.
2. Prepare a separate Fabric 1.21.1 instance.
3. Use Fabric builds of DRM and every addon or integration.
4. Add a copy of the config folder and load it through each editor.
5. Check NPC dialogue, shops, Teleporters, quests, factions, popups, HUDs, and world-saved data.

:::warning Do not mix loaders
Forge DRM and Forge addons do not load on Fabric. Check that every JAR targets Fabric 1.21.1 instead of relying on similar file names.
:::

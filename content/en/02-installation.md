---
title: Choose Forge Installation Files
slug: installation
order: 2
description: Install DRM and your chosen NPC mod on Forge 1.20.1.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.3.1
audience: Server operators
tags:
  - install
  - forge
---

## Required files

| Item | Choose |
| --- | --- |
| Minecraft | Java Edition 1.20.1 |
| Java | 17 |
| Loader | Forge 47+ |
| DRM | Forge 1.20.1 version 0.3.1 |

Put the mod file in **mods**. On a server, install matching files on the server and every client.

Use the [separate guide](#core-fabric/installation) for Fabric/NeoForge.

## Want NPCs too?

Install [DNPC](#dochi-npc-core/npc-core-setup) or compatible CustomNPCs. DRM itself does not require an NPC mod, but you need one to create the characters receiving conversations or shops.

Add optional mods for the features you use, such as GeckoLib for Gecko models or FTB Quests for FTB quest connections.

## Open it after installation

1. Enter a world in Creative mode.
2. Get **Dochi RPG Maker Core**, or use `/give @s dochi_rpg_maker:dialogue_editor`.
3. Right-click air with it.
4. Once the editor list opens, follow [your first conversation](#core/quick-start).

Bundled examples are prepared on the first run; no hand-written JSON is needed to begin.

## Updates and moving servers

Replace old mod files rather than keeping both versions. Keep `config/dochi_rpg_maker/` together with the world, which also stores placed NPCs and player progress.

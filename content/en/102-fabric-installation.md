---
title: Choose Fabric or NeoForge Files
slug: installation
order: 2
description: Install the matching DRM file and requirements for 1.21.1.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.3.1
audience: Creators / Operators
---

## Match the loader

| Item | Fabric | NeoForge |
| --- | --- | --- |
| Minecraft | 1.21.1 | 1.21.1 |
| Java | 21 | 21 |
| Loader | Fabric Loader 0.18.0+ | NeoForge 21.1+ |
| Fabric API | 0.116.11+1.21.1+ | Not used |
| DRM file | 0.3.1 Fabric 1.21.1 | 0.3.1 NeoForge 1.21.1 |

**26.3 needs different files.** See [26.3 installation](#core-fabric/minecraft-26-3) for Java 25 and its builds. Forge 1.20.1 uses the [Forge guide](#core/installation).

Put files in **mods**. Match Minecraft, loader and mod files on the server and clients.

## Add the features you want

| Feature | Extra mod |
| --- | --- |
| Create NPCs | DNPC or matching-loader CustomNPCs |
| Gecko models | Matching GeckoLib |
| FTB quest connections | FTB Quests |
| Pokémon trainers, shops and healing | Cobblemon Editor and Cobblemon |
| Settings button in Fabric's mod list | Mod Menu |

DRM alone opens its editing tools. See [DNPC getting started](#dochi-npc-core/npc-core-setup) to create a character.

## Start in-game

1. Get **Dochi RPG Maker Core** in Creative, or enter `/give @s dochi_rpg_maker:dialogue_editor`.
2. Right-click air with it.
3. Open **Dialogue Editor** and make [your first conversation](#core-fabric/quick-start).

Examples and configuration folders are created on the first run. Fabric excludes Item Editor and Stat Builder.

![The editor selector opened with Core after installation.](assets/media/guides/drm-031-neo1211/editor-selector.png "DRM 0.3.1 / NeoForge 1.21.1. Selecting Dialogue Editor exposes Load, Use Default and Create New. Start with Use Default, then Save As your own work. Installed addons change the available list.")

## Move a server

Keep `config/dochi_rpg_maker/` and the world together. Configuration alone does not include placed NPCs, quest progress or spawner state.

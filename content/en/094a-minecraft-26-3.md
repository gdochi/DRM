---
title: 26.3 Setup and Feature Differences
slug: minecraft-26-3
order: 6
description: Choose 26.3 files and NPCs, and check which editor features differ.
product: core-fabric
category: Minecraft 26.3
section: getting-started
status: Guide
version: 0.3.1 / Minecraft 26.3
audience: Creators / server operators
---

## Install 26.3 files

Use **Fabric or NeoForge / Java 25**. Install each mod's 26.3 files on server and clients. Fabric also needs the Fabric API required by those mods.

Create NPCs with **DNPC**. **CustomNPCs is unavailable on 26.3.** DRM and DNPC can also run independently.

## Choose the features you want

| Feature | Mods |
| --- | --- |
| NPC creation, appearance and schedules | DNPC |
| Dialogue, shops, quests and screen layouts | DRM |
| NPC patterns and boss combat | DRM + BattleWorks + DNPC |
| Ordinary mob spawn rules | Spawn Control |
| Spawn a saved NPC from a block | Spawn Control + DRM + DNPC |
| NPC armor effects | Real Armor and a supported NPC mod |
| Minigames/MWENT tables | Minigames |
| NPC map icons | DRM + MapIcon + a supported map |

Cobblemon Editor and DW/DWE are not included as 26.3 mods here. Use their older 1.21.1/1.20.1 guides.

## Differences from older versions

26.3 DRM has no **Faction Editor, player faction screen or GUI Maker faction elements**. Fabric also excludes **Item Editor and Stat Builder**.

Follow [NPC creation](#dochi-npc-core/npc-core-setup) and [DRM getting started](#core-fabric/quick-start) for NPCs with conversations or shops.

Use [placed NPC templates](#dochi-spawn-control/spawn-control-npc-templates) in Spawn Control. Old CustomNPCs clones are not directly converted into DNPC spawns.

After changing MWENT's native villager trade definitions, reconnect to the world or restart the server.

## Bringing an old world

Try the NPCs, conversations, shops and other features you use on a copy before replacing the original world. Keep its configuration and world together.

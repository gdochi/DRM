---
title: Conversations, Shops and Saved Files
slug: npc-core-files
order: 1520
description: Add other mods' features to DNPC and find your saved work.
product: dochi-npc-core
category: NPC files and integrations
section: operations
status: Guide
version: 0.1.2
audience: Creators / server operators
---

## Add conversations or shops

Install **DRM**, right-click the DNPC with the DRM Core, then choose a saved file in **NPC Apply**.

Start with [Forge dialogue](#core/quick-start) or [Fabric/NeoForge dialogue](#core-fabric/quick-start).

## Choose a mod for your goal

| Goal | Extra mod |
| --- | --- |
| Conversations, shops and player employment | DRM |
| Pokémon trainers, shops, healing and starters | Cobblemon Editor and its requirements |
| Spawn saved NPCs under chosen conditions | Spawn Control and DRM |
| Melee patterns and boss battles | BattleWorks and DRM |
| Firearm NPCs and vehicle crews | DW / DWE and their requirements |
| Armor that reduces incoming damage | Real Armor |
| Instrument performances | Immersive Melodies |

DW/DWE target Forge 1.20.1 and NeoForge 1.21.1. CustomNPCs is unavailable on 26.3. Use each mod's setup guide to choose matching files.

## Find saved work

| Content | Location |
| --- | --- |
| NPC templates | `config/dochi_npc_core/templates/` |
| Poses | `config/dochi_npc_core/poses/` |
| Server skin PNGs | `config/dochi_npc_core/assets/textures/` |
| Global settings | `config/dochi_npc_core/global.json` |
| Client settings | `config/dochi_npc_core/client-settings.json` |
| DRM employment settings | `config/dochi_rpg_maker/dochi_npc/employment/` |

Placed NPCs and contracts are also saved in the world. Include the world when moving a server.

## Convert another NPC to DNPC

On 1.20.1 / 1.21.1, open **Global settings → Experimental features → World scan** and select an NPC. Read which parts can be converted before proceeding.

Only supported content, such as appearance, equipment and relationships, transfers. Keep a world copy before conversion. CustomNPCs conversion is unavailable on 26.3.

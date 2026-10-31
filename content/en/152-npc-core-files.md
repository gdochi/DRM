---
title: NPC files and integrations
slug: npc-core-files
order: 1520
description: NPC files and integrations
product: dochi-npc-core
category: NPC files and integrations
section: operations
status: Guide
version: 0.1.2
audience: Creators / server operators
---

## Files

| Content | Path |
| --- | --- |
| Global settings | `config/dochi_npc_core/global.json` |
| Poses | `config/dochi_npc_core/poses/<id>.json` |
| NPC templates | `config/dochi_npc_core/templates/` |
| Server skins | `config/dochi_npc_core/assets/textures/` |
| Client settings | `config/dochi_npc_core/client-settings.json` |
| DRM employment Function | `config/dochi_rpg_maker/dochi_npc/employment/<id>.json` |

Placed NPC state and employment contracts also live in the world. Back up the world and configuration together. Server-selected PNG assets are transferred to clients.

## Integration boundaries

| Mod | DNPC support |
| --- | --- |
| DRM 0.3.1 | Optional Actor and template provider APIs; supported Apply tools |
| Cobblemon Editor 0.2.9 | 1.21.1 Trainer, Pokemon Itself, shops, healing, starters, clones and Sequential actions |
| Spawn Control 0.1.4 | Default entities and exact v3 templates are separate sources; COMMON natural rules and older-target/26.3 placed templates |
| Real Armor 0.1.4 | Armor, body damage and durability; excludes CNPC-specific resistance/companion rules |
| BattleWorks 0.1.6 | DNPC combat, relationships, appearance and control on existing targets and 26.3 |
| DW / DWE 0.3.1 | Firearms, melee, crews and schedules on Forge 1.20.1 / NeoForge 1.21.1; excludes 26.3 |
| Minigames 0.1.5 | DNPC Gecko card models and loading-preview refresh |

File templates differ from the temporary clipboard. See [v3 storage and older files](#dochi-npc-core/npc-core-templates). Checked versions do not establish a minimum for every integration.

## Experimental NPC Changing

Open Global Settings → Experimental Features → World Scan. Check individual NPCs, review unsupported fields and explicitly allow partial conversion only when appropriate. Convert selected entries after backing up the world and testing a copy.

Adapters target Forge 1.20.1 and Fabric / NeoForge 1.21.1. They map supported appearance, model, animation and relation data; they do not automatically port arbitrary third-party scripts or entire world formats.

26.3 uses separate Fabric / NeoForge Java 25 builds and permanently excludes CustomNPCs. The older CNPC conversion workflow does not apply there. See [26.3 scope](#core-fabric/minecraft-26-3).

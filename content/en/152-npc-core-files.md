---
title: NPC files and integrations
slug: npc-core-files
order: 1520
description: NPC files and integrations
product: dochi-npc-core
category: NPC files and integrations
section: operations
status: Guide
version: 0.1.0
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
| DRM | Optional public NPC Actor API and supported authoring / Apply tools |
| Cobblemon Editor 0.2.6 | Trainer JSON Apply. Pokemon Itself, shops, Nurse Joy and Starter roles remain CustomNPCs-only |
| Spawn Control 0.1.3 | Default EntityType spawning; no saved DNPC template / equipment cloning |
| Real Armor 0.1.3 | Armor, body damage and durability; excludes CustomNPCs-specific resistance / companion rules |
| BattleWorks 0.1.5 | DNPC compatibility is under development; do not assume full CustomNPCs parity |

## Experimental NPC Changing

Open Global Settings → Experimental Features → World Scan. Check individual NPCs, review unsupported fields and explicitly allow partial conversion only when appropriate. Convert selected entries after backing up the world and testing a copy.

Adapters target Forge 1.20.1 and Fabric / NeoForge 1.21.1. They map supported appearance, model, animation and relation data; they do not automatically port arbitrary third-party scripts or entire world formats.

Separate Minecraft 26.3 artifacts do not imply identical world or CustomNPCs support. The installation table in this guide targets 1.20.1 and 1.21.1.

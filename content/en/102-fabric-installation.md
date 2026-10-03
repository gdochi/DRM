---
title: Installation
slug: installation
order: 30
description: Requirements and client/server roles for DRM 0.2.4 on Fabric and NeoForge 1.21.1.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.2.4
audience: Creators / Operators
---

## Supported environment

This documentation covers **DRM 0.2.4 for Fabric and NeoForge 1.21.1** together. Both use the same authoring tools and normal workflow. Choose the JAR and dependencies for your loader. Forge 1.20.1 has its own documentation entry.

| Item | Fabric | NeoForge |
| --- | --- | --- |
| Minecraft | Exactly `1.21.1` | Exactly `1.21.1` |
| Java | `21` or newer | `21` |
| Loader | Fabric Loader `0.18.0`+, built with `0.19.3` | NeoForge `21.1`+, built with `21.1.216` |
| Fabric API | `0.116.11+1.21.1`+, built with `0.116.13+1.21.1` | Not used. |
| CustomNPCs | Fabric `1.0.0`, required | Compatible NeoForge `1.21.1` build, required |
| DRM | `dochi_rpg_maker-0.2.4-fabric-1.21.1.jar` | `dochi_rpg_maker-0.2.4-neoforge-1.21.1.jar` |

Both builds keep the mod ID and resource namespace `dochi_rpg_maker`. Install the same version for the same loader on the server and every client.

## Optional integrations

| Mod | Purpose |
| --- | --- |
| GeckoLib | GeckoLib NPC models and animation. Use Fabric `4.8.4`+ or NeoForge `4.9`+ for the matching loader. |
| Mod Menu | Opens DRM's `Mods Config` from the Fabric mod list. |
| Player Animator | Optional player-animation provider integration on NeoForge. |
| FTB Quests | Needed for `ftb`, `ftb_task`, and FTB quest/task completion actions. |
| CobbleDollars | Needed when server content or an addon selects CobbleDollars payments. |
| Dochi Cobblemon Editor | Separate addon for trainer battles, markets, healing, starters, and trainer-victory quests. |

CustomNPCs is required by DRM. Install other integrations for the features you use. Follow [Cobblemon Editor setup](#drm-cobblemon-editor/cobblemon-editor-setup) for Pokémon content.

## Installation

1. Prepare a Minecraft 1.21.1 instance with Fabric or NeoForge.
2. Add matching-loader DRM 0.2.4 and CustomNPCs to the server and client `mods` folders. Add Fabric API on Fabric.
3. Start the server or world once to create `config/dochi_rpg_maker`.
4. In Creative mode or with permission level 2, obtain the Core item.
5. Open the editor selector with that item and choose an authoring tool.

Find these items in the CustomNPCs creative tab or use:

```text
/give @s dochi_rpg_maker:dialogue_editor
/give @s dochi_rpg_maker:remnant_msg_setter
/give @s dochi_rpg_maker:npc_spawner
```

## Client and server responsibilities

| Side | Responsibility |
| --- | --- |
| Server | JSON storage, editing permissions, NPC bindings, conditions/actions, shop trades/stock, currency, quest progress, spawners, and Remnant marker state |
| Client | Authoring screens, searchable pickers, GUI Maker previews, player runtime screens, and HUD rendering |

In multiplayer, the **server's** `config/dochi_rpg_maker` is authoritative. Editing a similarly named client file does not update server content.

## Updating

Back up `config/dochi_rpg_maker` and the world together. NPC bindings, quest progress, NPC Spawner block state/leases, and Remnant markers also live in the world.

Bundled dialogue, GUI, shop, Teleporter, and sample files may be refreshed at startup. Use `Save As` for custom files and link those copies.

0.2.4 transmits the selected restock clock, so update the server and every client together. Use only the JAR for your instance's loader.

---
title: Folders and Paths
slug: paths
order: 40
description: Folders and Paths for Forge DRM 0.2.1.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.3.1
audience: Creators and server operators
---

## Where is the conversation I saved?

In singleplayer, open the **game folder for your current launcher instance**. In multiplayer, use the **connected server's folder**. Authoring files live under `config/dochi_rpg_maker/` there.

For **Dialogue Editor → Save As → village_guide**, look in `config/dochi_rpg_maker/dialogue_sets/village_guide/`. One conversation set is a folder: copy the **whole folder** when moving it to another server.

![Dialogue Editor shows the saved conversation's folder path.](assets/media/guides/drm-031-forge1201/dialogue-save-result.png "DRM 0.3.1 / Forge 1.20.1. After Save As, SET FOLDER / TOOLS shows the current set folder. Use that path to identify the correct instance.")

## Files to bring for each task

All paths below are inside `config/dochi_rpg_maker/`. Find the name you actually saved in the editor.

| What you made | Location | Bring along |
| --- | --- | --- |
| NPC dialogue | `dialogue_sets/village_guide/` | Whole set folder and linked GUI, shop or quests |
| NPC shop | `npc_shops/village_shop.json` | Currency, GUI and item mods it uses |
| Dialogue/shop layout | `gui/` | Referenced pictures and textures |
| Currency type | `currency/definitions/town_coin.json` | Shops and HUD using that currency |
| HUD | `hud/sets/guide_hud/` | Entire hud_set.json and components/. Active selection: hud/active_set.json |
| Quests | `quests/<pack-name>/` | pack.json and individual quests under quests/ |
| Stats | `stats/sets/` | Active selection stats/active_set.json |
| Database items | `items/definitions/` | Authoring rules items/editor_settings.json |
| Travel destinations | `teleporters/` | Destination set and linked GUI |
| Popups | `popups/definitions/` | Display policies under popups/policies/ if used |
| World messages | `remnant_msg/messages/` | remnant_msg/policies/ and linked GUI |
| Creator PNGs | `assets/textures/` | Matching .png.mcmeta for animated textures |
| Faction display | `factions/` | Settings and required presets |
| Defaults/shared settings | `settings/` | Review the settings you changed before moving them |

DNPC's own NPC templates use a **separate folder**, `config/dochi_npc_core/templates/`. See [saving NPCs](#dochi-npc-core/npc-core-templates). Check each addon's storage guide for BattleWorks, Spawn Control and other addon files.

## The file moved, but the NPC did not change

Authoring files and world NPCs are separate. On the destination server, check the file, then **right-click the NPC with DRM Core → select the file → Apply**. Bring referenced pictures and shops as well.

See [saving and NPC application](#core/core-concepts) for the buttons. Back up **config and world saves together** when moving or restoring a whole server; authoring files alone do not restore NPC placement, spawners and progress.

## A saved file is missing from the list

1. Check the server's actual game folder. A client-only copy does not appear in the server list.
2. Use the correct folder for a conversation, shop or GUI file.
3. Open **Load / Refresh** and clear search filters.
4. Use **Save As** with your own name when customizing a bundled example.

Enter names such as `village_shop.json` in editor filename fields; the editor already selects its own storage folder. For external file edits, see [reloading saved work](#core/core-concepts).

---
title: Quick Start
slug: quick-start
order: 20
description: Quick Start for Forge DRM 0.2.1.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.2.1
audience: Creators and server operators
---

## First launch

1. Install Forge 1.20.1 with Java 17, DRM 0.2.1, and compatible CustomNPCs on the server and clients.
2. Start once to create `config/dochi_rpg_maker` and the bundled templates.
3. In Creative mode or with edit permission, get `Dochi RPG Maker Core` from the CustomNPCs tab. Its registry ID remains `dochi_rpg_maker:dialogue_editor`.
4. Right-click air to open the editor selector. Right-click a CustomNPCs NPC to enter the target-aware editing flow.

See [installation](#core/installation) and [loader differences](#core-fabric/loader-compatibility) before mixing builds. Forge Core does not include the placed spawner; install [Spawn Control](#dochi-spawn-control/dochi-spawn-control-spawner) for that feature.

## Choose an editor

The selector provides search and General, Visual, and Config categories. Visual includes GUI Maker, Tooltip Maker, HUD Maker, and Popup Maker. Config includes Currency Editor and Stat Builder. General contains dialogue, NPC, shop, quest, teleporter, faction, Remnant Msg, and item tools. Installed addons register their own tools.

| Tool | Main authoring data |
| --- | --- |
| Dialogue Editor | `dialogue_sets/<set>/` |
| NPC Shop | `npc_shops/` |
| GUI Maker / Tooltip Maker | `gui/` |
| Quest Editor | `quests/<pack>/` |
| Stat Builder / Item Editor | `stats/sets/`, `items/definitions/` |
| Currency Editor | `currency/definitions/` |
| HUD Maker | `hud/sets/`, `hud/definitions/` |
| Teleporter / Faction / Popup | `teleporters/`, `factions/`, `popups/` |
| Remnant Msg | `remnant_msg/messages/`, `remnant_msg/policies/` |

All paths above are relative to `config/dochi_rpg_maker`. A dialogue set contains multiple node files; a GUI or shop is usually one JSON document. See [Folders and Paths](#core/paths).

## Make a first dialogue

1. Open Dialogue Editor and create a set or start from the default set.
2. Edit nodes and choices, then add conditions or actions.
3. Use `Save As` to save under a new user name.
4. Right-click the target NPC with the core item and apply the dialogue.
5. Put away the editing item and right-click the NPC to test the player dialogue.

NPC Shop follows the same author-save-apply flow. File-based shops live in `npc_shops`; applied NPC data also uses NPC PersistentData.

## Saving and navigation

Supported editors use `Ctrl+S` to save, `Ctrl+Z` to undo, and `Ctrl+Y` or `Ctrl+Shift+Z` to redo. Check the screen's `?` help for its available shortcuts. Protected default documents require `Save As`.

The common topbar's Back/Forward buttons navigate editor history. They do not undo edits or save server data.

Default dialogue sets, protected default GUIs, and bundled sample shops are starting points. Keep authored files under distinct names. After editing server JSON externally, use `/drm reload` or review `settings/reload_policy.json`.

## Continue learning

Start with installation and paths, then Dialogue Editor and conditions/actions. Continue with NPC Shop, GUI Maker, HUD Maker, quests, and stats/items as your project needs them. GUI files control presentation; shop products, dialogue content, and quest progress have their own data stores.

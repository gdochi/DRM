---
title: Folders and Paths
slug: paths
order: 40
description: Folders and Paths for Forge DRM 0.2.1.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.2.1
audience: Creators and server operators
---

## Official data root

Authoring files live under `config/dochi_rpg_maker` in the game or server directory. In multiplayer, the server's files are authoritative. Editing only a client's copy does not update the server.

```text
<game-or-server-root>/config/dochi_rpg_maker/
```

If the legacy top-level `dochi_rpg_maker` directory exists and the new root does not, startup copies the legacy data into the new root. Back up both locations before migration.

## Main folders

The following paths are relative to the data root.

| Path | Contents |
| --- | --- |
| `dialogue_sets/<set>/` | `dialogue_set.json` and individual node JSON files |
| `gui/` | Dialogue, shop, message, and tooltip layouts |
| `npc_shops/` | File-based shops |
| `quests/<pack>/` | `pack.json` and individual quests in `quests/` |
| `stats/sets/` | Stat definitions; `stats/active_set.json` selects the active set |
| `items/definitions/` | Database item definitions |
| `items/sets/` | Equipment set definitions referenced by items |
| `items/tooltip_templates/` | Item tooltip templates |
| `items/editor_settings.json` | Shared item editor settings |
| `teleporters/` | Destination sets |
| `factions/` | Faction settings and presets |
| `popups/definitions/`, `popups/policies/` | Popup content and access/resource policies |
| `assets/textures/` | Server PNG assets and companion `.png.mcmeta` files |
| `currency/definitions/` | Currency IDs, display, pickup conversion, and death rules |
| `hud/sets/`, `hud/definitions/` | HUD layouts and element definitions |
| `settings/` | Default GUI/currency references and reload policy |
| `remnant_msg/messages/`, `remnant_msg/policies/` | Message documents and display policy |
| `debug.log` | Core diagnostic output |

A dialogue set is a folder of documents. Most other entries are individual JSON documents. Layout files do not contain the shop products or dialogue text they display. Copy referenced equipment sets and tooltip templates together with item definitions.

## Server document kinds

Editors exchange a document kind and a path with the server. Important kinds include `dialogue_set`, `gui`, `npc_shop`, `currency`, `teleporter_set`, `stat_set`, `item_definition`, `item_editor_settings`, `popup_definition`, `popup_policy`, `remnant_msg`, and `remnant_msg_policy`.

`currency_index` is a read-only currency listing. `currency_hud_layout` stores HUD sets; the legacy `currency_hud` name remains compatible. `hud_active_set` selects `hud/active_set.json`; `hud_definition` stores element definitions. `faction_settings` maps to `factions/settings.json`, and `faction_preset` to `factions/presets/`. The `settings` kind maps to `settings/defaults.json`.

## Path and save rules

- Use paths relative to the selected document store. Some loaders also accept the displayed full config path.
- Windows separators are normalized to `/`; parent traversal using `..` is rejected.
- Use explicit names. An empty filename may normalize to `default.json`.
- GUI discovery supports subfolders up to three levels deep.
- Protected defaults cannot be saved over or deleted through the server editor. Use `Save As` with a new name.

## Defaults, updates, and backups

Bundled defaults follow per-store installation policies. Dialogue, GUI, shop, faction, teleporter, quest, stat, item, and popup defaults may be installed or refreshed. Remnant Msg samples are refreshed from the JAR. HUD definitions and the default Remnant Msg policy are installed only when absent; bundled HUD definitions start disabled.

Use distinct user filenames instead of editing protected defaults for production content. Back up the config root and world together: files hold authoring data, while the world holds NPC bindings and player state.

Tooltip Maker saves layouts in `gui/`. Open `default_tooltip_gui.json`, use `Save As`, and edit it under Visual → Tooltip Maker. These layouts are separate from the item tooltip templates in `items/tooltip_templates/`.

## Legacy dialogue data

Old NPC data may reference `dc_dialogue_json_path` under `customnpcs/dc_data/dc_dialogues`. The dialogue repository can read and convert it. New projects should use `config/dochi_rpg_maker`, keeping the legacy path only for existing content that still references it.

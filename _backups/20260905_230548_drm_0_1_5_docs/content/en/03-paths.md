---
title: Folders And Paths
slug: paths
order: 40
description: The actual DRM Core data root and server JSON path rules.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.1.4
audience: Creators / Operators
tags:
  - paths
  - files
---

## Official Data Root

The current DRM Core data root is `config/dochi_rpg_maker` under the game or server root.

```text
<game-or-server-root>/
  config/
    dochi_rpg_maker/
```

If the legacy `<game-or-server-root>/dochi_rpg_maker` folder exists and the new root does not, startup migrates the legacy folder to the new root.

## Main Folders

| Data | Path | Description |
| --- | --- | --- |
| Dialogue sets | `config/dochi_rpg_maker/dialogue_sets/<set>/` | Stores `dialogue_set.json` plus node `*.json` files. |
| GUI layouts | `config/dochi_rpg_maker/gui/` | Screen GUI JSON for dialogue, shops, Remnant Msg, and related layouts. |
| NPC shops | `config/dochi_rpg_maker/npc_shops/` | File-based shop JSON. |
| Quest packs | `config/dochi_rpg_maker/quests/<pack>/` | `pack.json` plus individual files under `quests/`. |
| Stat sets | `config/dochi_rpg_maker/stats/sets/` | Stat definitions; `stats/active_set.json` selects the active set. |
| Database items | `config/dochi_rpg_maker/items/definitions/` | DRM item definitions; global editor rules are in `items/editor_settings.json`. |
| Teleporters | `config/dochi_rpg_maker/teleporters/` | Teleporter Set JSON. |
| Factions | `config/dochi_rpg_maker/factions/` | DRM faction presentation settings and presets. |
| Popups | `config/dochi_rpg_maker/popups/` | Popup definitions and policies. |
| Creator PNG assets | `config/dochi_rpg_maker/assets/textures/` | Server-catalogued PNG and companion `.png.mcmeta` files. |
| Currency definitions | `config/dochi_rpg_maker/currency/definitions/` | Currency ID, name, icon, pickup conversion, and death rules. |
| HUD sets | `config/dochi_rpg_maker/hud/sets/` | HUD Maker set JSON. |
| HUD definitions | `config/dochi_rpg_maker/hud/definitions/` | Vanilla replacement and custom HUD definitions. |
| Settings | `config/dochi_rpg_maker/settings/` | `reload_policy.json`, `defaults.json`, and related settings. |
| Remnant Msg | `config/dochi_rpg_maker/remnant_msg/` | Message and policy JSON. |
| Debug log | `config/dochi_rpg_maker/debug.log` | Extra log file written by the core mod. |

## Server JSON Kinds

Client and server exchange JSON by `kind` and `path`.

| kind | Folder | Notes |
| --- | --- | --- |
| `dialogue_set` | `dialogue_sets` | Folder-based. Save writes both `dialogue_set.json` and node files. |
| `gui` | `gui` | Supports recursive search up to depth 3. |
| `npc_shop` | `npc_shops` | File-based shop JSON. |
| `currency` | `currency/definitions` | Currency definition file. |
| `currency_index` | All currency definitions | Read-only index for lists and previews. |
| `currency_hud_layout` | `hud/sets` | HUD set storage. Legacy `currency_hud` maps here. |
| `hud_active_set` | `hud/active_set.json` | Current active HUD set. |
| `hud_definition` | `hud/definitions` | Vanilla replacement and custom HUD definitions. |
| `faction_settings` | `factions/settings.json` | Active faction presentation settings. |
| `faction_preset` | `factions/presets` | Reusable faction presentation preset. |
| `teleporter_set` | `teleporters` | Teleporter Set definition. |
| `stat_set` | `stats/sets` | Player stat set. |
| `item_definition` | `items/definitions` | DRM database item. |
| `item_editor_settings` | `items/editor_settings.json` | Categories, rarities, and tooltip formats. |
| `popup_definition` | `popups/definitions` | Popup presentation. |
| `popup_policy` | `popups/policies` | Popup permission and resource limits. |
| `remnant_msg` | `remnant_msg/messages` | Remnant Msg document. |
| `remnant_msg_policy` | `remnant_msg/policies` | Remnant Msg policy document. |
| `settings` | `settings/defaults.json` | Default currency and default GUI references. |

## Input Rules

- Use folder-relative paths such as `gui/default_shop_gui.json`.
- Display paths like `config/dochi_rpg_maker/gui/default_shop_gui.json` are accepted by some loaders.
- Windows backslashes are normalized to `/`.
- Blank filenames may become `default.json`; name files explicitly.
- Paths that escape the storage root with `..` are rejected.
- `default_set`, GUI files beginning with `default`, known default GUI paths, shops beginning with `default`, and the sample shop are protected. Server save/delete rejects them; use `Save As`.

## Default Content During Updates

| Data | Startup behavior |
| --- | --- |
| Bundled dialogue, GUI, shop, faction, teleporter, quest, stat, item, and popup defaults | Installed or refreshed from the 0.1.4 JAR according to the data type's default policy. |
| Remnant Msg sample message | Refreshed from the JAR. |
| HUD definitions | Installed only when missing and default to `enabled: false`. |
| Remnant Msg default policy | Installed only when missing. |

Keep production files under non-default names so they remain separate from bundled refreshes.

## Legacy Compatibility

Dialogue storage can read old NPC data from `dc_dialogue_json_path`. That loader resolves files under `customnpcs/dc_data/dc_dialogues` and converts them to the current `DialogueDocument` shape.

New content should not use `customnpcs/dc_data` as the primary storage root. Treat it as import compatibility only.

:::danger Operator Note
When editing JSON by hand, make sure you are changing the server-side `config/dochi_rpg_maker` file, not only a client copy.
:::

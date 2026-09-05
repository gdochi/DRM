---
title: Stat Builder And Item Editor
slug: stat-item-systems
order: 110
description: Custom stat sets, allocation costs, database items, requirements, bonuses, attributes, and scaling.
product: core
category: Stats And Items
section: stat-item
status: Stable
version: 0.1.4
audience: RPG system creators
tags:
  - stats
  - items
---

## Stat Builder

Stat sets are stored in `config/dochi_rpg_maker/stats/sets/`; `stats/active_set.json` selects the runtime set. Each stat can define an ID, name, description, item icon, min/max/default value, investment cost, and one or more vanilla/modded attribute effects.

Investment providers are Minecraft XP levels, a DRM currency, or an item. Cost progression uses base, step, and multiplier settings.

The player allocation screen opens with `Y` by default. `Allow Y key allocation UI` controls whether the active set may be opened from the keybind. The dialogue action `Go Stat Builder` opens the same runtime screen regardless of that keybind-only setting.

The bundled `default_stat_gui.json` uses a wide scrollable list on the left and separated value, cost, description, and increase controls on the right. Modify a copy in GUI Maker.

## Item Editor

Item definitions are stored in `config/dochi_rpg_maker/items/definitions/`; global categories, rarities, and tooltip formatting live in `items/editor_settings.json`.

An item definition can configure:

- carrier/category, item template, name, rarity, foil, stack size, durability, and lore;
- required allocated stats;
- equipped stat bonuses;
- vanilla/modded attribute modifiers and equipment slots;
- per-point stat scaling;
- tooltip section order and visibility.

## Requirement Penalty

Requirements use allocated values only, so an item's own bonus cannot satisfy its requirement. A player may still hold, equip, and attack with an item while under the requirement.

`Unmet penalty %` is the percentage removed from the item's contribution:

| Penalty | Retained contribution while unmet |
| --- | --- |
| `0` | 100% |
| `25` | 75% |
| `100` | 0% |

The multiplier affects equipped stat bonuses, configured attribute modifiers, and stat-scaling modifiers. It does not delete or replace the base behavior of the template item unless that behavior is represented by a configured modifier.

:::tip Testing
Save the definition before using `Give Test Item`. Hover the preview or test item to verify the generated tooltip, then test both a qualifying and non-qualifying player.
:::


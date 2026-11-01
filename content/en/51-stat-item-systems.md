---
title: Stat Builder And Item Editor
slug: stat-item-systems
order: 110
description: Custom stat sets, allocation costs, database items, requirements, bonuses, attributes, and scaling.
product: core
category: Stats And Items
section: stat-item
status: Stable
version: 0.3.1
audience: RPG system creators
tags:
  - stats
  - items
---

## Stat Builder

Create stats that players can invest in. Start with **Add**, name one stat and set its minimum, maximum and default value. Choose the investment cost **Provider** on the right: XP levels, a DRM currency or an item.

Connect **Attribute** and **Base effect / Per point** to change actual health, attack or another attribute. Save, use **Set Active**, then open **Y** to check the allocation cost and result.

Investment providers are Minecraft XP levels, a DRM currency, or an item. Cost progression uses base, step, and multiplier settings.

The player allocation screen opens with `Y` by default. `Allow Y key allocation UI` controls whether the active set may be opened from the keybind. The dialogue action `Go Stat Builder` opens the same in-game screen regardless of that keybind-only setting.

The bundled `default_stat_gui.json` uses a wide scrollable list on the left and separated value, cost, description, and increase controls on the right. Modify a copy in GUI Maker.

![Stat Builder with Strength, point costs and attribute effects.](assets/media/guides/drm-031-forge1201/registry-stat_builder.png "DRM 0.3.1 / Forge 1.20.1. Choose the stat on the left, its limits in the middle and costs/effects on the right. Attribute: Not selected means no attribute effect is connected yet.")

## Item Editor

Choose the base **Item template** first. Set its name and description, use **Stat Rules** for requirements and equipped bonuses, and **Vanilla Attribute** for attribute effects. **Save As** your file, then use **Give Test Item** to inspect the result.

An item definition can configure:

- carrier/category, item template, name, rarity, foil, stack size, durability, and lore;
- required allocated stats;
- equipped stat bonuses;
- vanilla/modded attribute modifiers and equipment slots;
- per-point stat scaling;
- tooltip section order and visibility.

![Item Editor Item Definition with Tooltip Lines, Stat Rules and Vanilla Attribute tabs.](assets/media/guides/drm-031-forge1201/registry-item_editor.png "DRM 0.3.1 / Forge 1.20.1. Item template is currently Not selected. Choose the base item, configure its name, effects and requirements, save, then use Give Test Item.")

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

## NPC stat screens and item tooltips in 0.1.5

In the NPC apply screen, connect a **Stat Builder** file to the NPC. Interacting with that NPC then opens the player's stat allocation screen using the connected set.

Use **Visual → Tooltip Maker** to design how item information is presented. See the **Tooltip Maker** guide for item previews, equipment views, and long-tooltip scrolling. Removing equipment that only reduces maximum health no longer plays the hurt effect.

## Equipment sets and tooltip links

Forge Item Editor lets an item select a `setId` and a tooltip template. Equipment sets live in `items/sets/` and define required equipped-piece counts, stat bonuses, and attribute modifiers by tier. Reusable tooltip templates live in `items/tooltip_templates/`.

Keep the individual item, shared equipment set, and presentation template as separate documents. Check their stat-set references and test bonuses/tooltips while changing equipped pieces. This Forge feature is not a claim of identical implementation on other loaders.

## Move saved files

| Contents | Location |
| --- | --- |
| Stat sets / active set | `config/dochi_rpg_maker/stats/sets/` / `stats/active_set.json` |
| Item definitions | `config/dochi_rpg_maker/items/definitions/` |
| Shared categories, rarities and tooltip settings | `config/dochi_rpg_maker/items/editor_settings.json` |

---
title: GUI System
slug: gui-system
order: 60
description: GUI Maker layout JSON, GUI types, components, and runtime connection rules.
product: core-fabric
category: Core Systems
section: gui-maker
status: Stable
version: 0.1.8
audience: GUI creators
tags:
  - gui
  - layout
---

## What GUI JSON Does

GUI JSON defines the shape of a screen. Dialogue text, shop products, and currency balances are supplied by runtime data. The GUI decides where and how components are rendered.

GUI Maker preview, the saved layout document, and the player-facing runtime screen are separate stages. Preview samples validate placement only; live dialogue, shop, Teleporter, Remnant Msg, and HUD values come from their runtime data sources.

| Field | Meaning |
| --- | --- |
| `guiType` | Layout type such as `dialogue`, `npc_shop`, `teleporter`, `quest_journal`, `popup`, `currency_hud`, or `remnant_msg`. |
| `id` | Internal GUI ID. Matching it to the filename helps tracking. |
| `stage` | Base size, background, and grid settings. |
| `elements` | Array of screen components. |
| `defaultUiStyle` | Shared panel color, border, opacity, and glow defaults. |
| `buttonConfig` | Enables vanilla button rendering for selected shop controls. |

## GUI Types And Storage

| guiType | Surface | Default File | Storage kind | Storage Path |
| --- | --- | --- | --- | --- |
| `dialogue` | Screen GUI | `default_dialogue_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `npc_shop` | Screen GUI | `default_shop_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `teleporter` | Screen GUI | `default_teleporter_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `quest_journal` | Screen GUI | `default_quest_journal_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `popup` | Screen GUI | `default_popup_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `remnant_msg` | Screen GUI | `default_remnant_msg_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `currency_hud` | HUD overlay | `hud_components.json` | `currency_hud_layout` | `config/dochi_rpg_maker/hud/sets` |
| `player_status` | HUD overlay | `player_status_hud.json` | HUD family | `config/dochi_rpg_maker/hud/player_status` |
| `custom_hud` | HUD overlay | `custom_hud_layout.json` | HUD family | `config/dochi_rpg_maker/hud/custom` |

Inputs such as `currency`, `hud_layout`, and `currency_hud_layout` normalize to `currency_hud`. `shop` normalizes to `npc_shop`; `remnant` normalizes to `remnant_msg`.

## Registered Components

| Component | GUI Types | Purpose |
| --- | --- | --- |
| `dialog` | Dialogue, Remnant Msg | Dialogue or message body. |
| `choice` | Dialogue | Dialogue choice list. |
| `panel` | Shop, HUD, Remnant Msg | Basic UI panel. |
| `image` | Dialogue, Shop, Teleporter, HUD, Remnant Msg | Image or texture. |
| `entity` | Dialogue, Shop | NPC or entity preview. |
| `item` | Dialogue, Shop | Item icon. |
| `item_slot` | Shop | Product, stock, and price rows. |
| `player_inventory` | Shop | Inventory grid for selling. |
| `shop_transaction_viewer` | Shop | Buy/sell preview. |
| `shop_search_bar` | Shop | Search field. |
| `shop_page_selector` | Shop | Page navigation. |
| `currency_display` | Shop | Player-owned currency amount. |
| `teleporter_search_bar` | Teleporter | Destination search field. |
| `teleporter_category_list` | Teleporter | Category filter list. |
| `teleporter_destination_list` | Teleporter | Available destination rows. |
| `teleporter_destination_name`, `teleporter_destination_description`, `teleporter_destination_icon` | Teleporter | Selected destination details. |
| `teleporter_action_button`, `teleporter_close_button` | Teleporter | Travel and close controls. |
| `quest_tabs`, quest list/detail/objective/reward components | Quest Journal | Journal navigation and quest information. |
| `popup_title`, `popup_subtitle`, `popup_text` | Popup | Popup title, subtitle, and body. |
| `currency_list`, `currency_icon`, `currency_amount`, `currency_delta`, `currency_name` | HUD | Currency HUD elements. |
| `player_health`, `player_food`, `player_armor`, `player_air`, `player_xp_level` | HUD | Player status preview/runtime values. |

## Dialogue, Shop, And Teleporter GUI References

Dialogue documents use `dialogueDefaultGui`. Shop documents use `shopDefaultGui`, plus optional `shopGuis.buy` and `shopGuis.sell`. A Teleporter Set uses its root `gui` reference and defaults to `default_teleporter_gui.json`.

```json
{
  "guiSource": "default",
  "guiJsonSubPath": "",
  "guiJsonFileName": "default_shop_gui.json",
  "guiJsonPath": "default_shop_gui.json"
}
```

Runtime reads this path from `config/dochi_rpg_maker/gui`. If it is blank, the value from `settings/defaults.json` is applied.

## Authoring Rules

- Clone default GUI files with `Save As` instead of overwriting them directly.
- Save dialogue, shop, and Teleporter layouts with separate `guiType` values.
- Shop buy/sell buttons, page buttons, and inventory toggles can use `buttonConfig.vanillaButtons`.
- Keep Minecraft resource locations such as `namespace:textures/...` separate from local file paths.
- Avoid duplicate component IDs and use `z` to keep draw order predictable.
- Treat sample text in GUI Maker as preview only; live dialogue and shop values come from runtime data.
- Check the base viewport and safe margins, then adjust `fillOpacity` or inherited style values only where the component needs an override.
- Files beginning with `default` and known default GUI paths are server-protected, so custom layouts must use `Save As`.

:::warning GUI Type Mismatch
A layout saved under the wrong `guiType` may render without the runtime behavior it needs. Use `npc_shop` for shops, `dialogue` for dialogue, and `teleporter` for Teleporter screens.
:::

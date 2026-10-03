---
title: GUI System
slug: gui-system
order: 60
description: GUI Maker layout JSON, GUI types, components, and runtime connection rules.
product: core
category: Core Systems
section: gui-maker
status: Stable
version: 0.2.1
audience: GUI creators
tags:
  - gui
  - layout
---

## What GUI JSON Does

GUI JSON defines the shape of a screen. Dialogue text, shop products, and currency balances are supplied by runtime data. The GUI decides where and how components are rendered.

GUI Maker preview, the saved layout document, and the player-facing runtime screen are separate stages. Preview samples validate placement only; live dialogue, shop, Remnant Msg, and HUD values come from their runtime data sources.

| Field | Meaning |
| --- | --- |
| `guiType` | Layout type such as `dialogue`, `npc_shop`, `faction`, `teleporter`, `quest_journal`, `stat_allocation`, `popup`, or `remnant_msg`. |
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
| `remnant_msg` | Screen GUI | `default_remnant_msg_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `faction` | Faction overview | `default_faction_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `teleporter` | Destination browser | `default_teleporter_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `quest_journal` | Player quest journal | `default_quest_journal_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `stat_allocation` | Player stat allocation | `default_stat_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `popup` | Popup presentation | `default_popup_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
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
| `image` | Dialogue, Shop, HUD, Remnant Msg | Image or texture. |
| `entity` | Dialogue, Shop | NPC or entity preview. |
| `item` | Dialogue, Shop | Item icon. |
| `item_slot` | Shop | Product, stock, and price rows. |
| `player_inventory` | Shop | Inventory grid for selling. |
| `shop_transaction_viewer` | Shop | Buy/sell preview. |
| `shop_search_bar` | Shop | Search field. |
| `shop_page_selector` | Shop | Page navigation. |
| `currency_display` | Shop | Player-owned currency amount. |
| `currency_list`, `currency_icon`, `currency_amount`, `currency_delta`, `currency_name` | HUD | Currency HUD elements. |
| `player_health`, `player_food`, `player_armor`, `player_air`, `player_xp_level` | HUD | Player status preview/runtime values. |
| `faction_*` | Faction | Header, category tabs, faction list/details, state legend, and close controls. |
| `teleporter_*` | Teleporter | Category, destination list/details, travel/close, status, and page controls. |
| `quest_*` | Quest Journal | Filters, search, list/details, objectives, rewards, tracking, accept/abandon, and close. |
| `stat_*` | Stat Allocation | Header, scrollable stat list, points, description, increase, and close. |
| `popup_*` | Popup | Runtime title, subtitle, body, and presentation surfaces. |

## Dialogue And Shop GUI References

Dialogue documents use `dialogueDefaultGui`. Shop documents use `shopDefaultGui`, plus optional `shopGuis.buy` and `shopGuis.sell`.

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
- Save dialogue and shop layouts with separate `guiType` values.
- Shop buy/sell buttons, page buttons, and inventory toggles can use `buttonConfig.vanillaButtons`.
- Keep Minecraft resource locations such as `namespace:textures/...` separate from local file paths.
- Avoid duplicate component IDs and use `z` to keep draw order predictable.
- Treat sample text in GUI Maker as preview only; live dialogue and shop values come from runtime data.
- Check the base viewport and safe margins, then adjust `fillOpacity` or inherited style values only where the component needs an override.
- Files beginning with `default` and known default GUI paths are server-protected, so custom layouts must use `Save As`.

:::warning GUI Type Mismatch
A shop layout saved as `dialogue` may render without the shop-specific behavior the runtime expects. Use `npc_shop` for shops and `dialogue` for dialogue.
:::

## Tooltip and choice styling in 0.1.5

Item tooltips have a dedicated editor: **Visual → Tooltip Maker**. Use it to arrange item previews, text, images, and dividers. Tooltip layouts are still stored in the `gui` folder.

For dialogue choice text, select the **Choice** component and set **Text size (px)**. A dialogue node can override that size with **Choice text px (0 = GUI)**. See **Choice Text And Pulse** for automatic button sizing and per-choice highlights.

## Sprite scale and tiled images

These settings affect the **player runtime layout** saved by GUI Maker. They do not resize the authoring editor's toolbar.

Use `Default UI Settings` for the shared sprite appearance.

| Setting | Behavior |
| --- | --- |
| `Tile` | Repeats the sprite pattern to fill panels and buttons. |
| `Stretch` | Stretches the pattern across the surface. |
| `Sprite Scale %` | Enter a number directly: 50–400%, default 100%. Decimals such as `125.5` are supported. |

For an ordinary image, use the **selected component's Inspector**.

1. Select the image component and assign its asset.
2. Set `Fit` to `Tile`.
3. Enter `Tile W %` and `H %`. Each axis accepts 10–800%, default 100%.
4. For example, 200% width and 50% height repeats a tile twice as wide and half as tall. The component's overall `w` and `h` stay the same.
5. Use `Save As` for a custom GUI and connect it to the dialogue, shop, or other runtime screen.

Tile proportions belong to **one component** and do not alter neighboring images. Stretch or Contain hides the ratio fields; switching back to Tile restores the stored ratios. Preview and live dialogue use the same Tile settings.

## JSON reference: repetition settings

At GUI root, `spriteFillMode` is `tile` or `stretch`, and `spriteScale` is 0.5–4.0. Each element stores `imageFit: tile`, `tileWidthRatio`, and `tileHeightRatio`. A JSON ratio of `1.0` means 100%.

Legacy root ratios become initial values for components without explicit ratios and are written to each element on the next save. New tile width/height ratios belong to elements rather than global UI defaults.

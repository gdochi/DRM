---
title: Recommended Workflows
slug: workflows
order: 120
description: Practical flows for dialogue, shops, Teleporter, NPC Spawner, and currency/HUD setup.
product: core-fabric
category: Reference / Operations
section: operations
status: Stable
version: 0.1.8
audience: Creators
tags:
  - workflow
  - examples
---

## Dialogue NPC

1. In `GUI Maker`, create a `dialogue` GUI and save it as `gui/my_dialogue_gui.json`.
2. In `Dialogue Editor`, choose `Create New Dialogue Set`.
3. Point `dialogueDefaultGui.guiJsonPath` at your GUI file.
4. Make the `start` node route point to the first general node.
5. Add text, choices, conditions, and actions to general nodes.
6. For repeated flows, select nodes with `Shift+Click`, use `Copy` / `Paste`, and drag node/route/choice/condition/action rows into order.
7. Use `Save As` and save to `dialogue_sets/my_npc_dialogue`.
8. Right-click the target NPC with the core item and apply the dialogue.
9. The saved dialogue opens as runtime dialogue when the NPC is right-clicked without the core item.

## File-Based Shop NPC

1. In `GUI Maker`, create an `npc_shop` GUI or use `default_shop_gui.json`.
2. In `NPC Shop`, choose `Create New NPC Shop`.
3. Set `id`, `title`, `tradeMode`, and `currency` or `currencyId`.
4. Add buy products to `items` and sale offers to `sellItems`. Change a product's `Payment` from inherited to an item/DRM currency override when needed.
5. For finite products, configure `Stock`, `Max Stock`, `Restock`, `Amount`, and `Interval`.
6. Connect `shopDefaultGui`, and optionally `shopGuis.buy` and `shopGuis.sell`.
7. Save as `npc_shops/blacksmith.json`.
8. Add a dialogue `go_shop` action with `shop: "blacksmith"`.
9. The selected dialogue choice opens the file-based shop.

## NPC-Bound Shop

1. Right-click the target NPC with the core item.
2. Open `NPC Shop` for that NPC.
3. Save the shop to NPC PersistentData.
4. Use a blank or `bound` `go_shop` value to open that NPC-bound shop.

This is convenient for one-off NPCs. File-based shops are easier when multiple NPCs share the same shop.

## Teleporter NPC

1. In `GUI Maker`, create a `teleporter` GUI or start with `default_teleporter_gui.json`.
2. Open `Teleporter` from the shared editor selector, then choose `Create New` or clone the protected default with `Save As`.
3. Add categories and destinations. Each destination uses coordinates and rotation in the player's current dimension.
4. Configure interaction/destination conditions, locked presentation, fade ticks, sounds, and optional image/item media.
5. Save as `teleporters/town_network.json`.
6. Right-click the target CustomNPCs NPC with the core item. In NPC Apply, search `FUNCTION` for Teleporter, select the saved JSON, and choose `Apply Teleporter`.
7. Right-click that NPC without the core item and verify search, category selection, destination details, and travel.
8. To open it from dialogue instead, add `go_teleporter` with `bound` or an explicit set path.

The travel request is rechecked by the server for the current NPC binding, session distance/dimension, interaction conditions, and destination access conditions.

## NPC Spawner Block

1. Place `dochi_rpg_maker:npc_spawner` and right-click it with `dochi_rpg_maker:dialogue_editor`. You need edit permission and must remain within eight blocks.
2. Put reusable templates under `npc_spawner/entity_clones/<classification>`, or keep a CustomNPCs Filled Soul Stone in your inventory for an atomic snapshot source.
3. On `Source`, search/filter available sources, add up to 64 entries, and set each weight from 1 to 10,000.
4. On `Spawn`, choose the mode, redstone gate, cooldown, target radius, offsets/radius, `Max Active`, and `Wave Size`.
5. On `Conditions`, build the target condition group. On `Effects`, set visibility, particles, and Default/Item/Block appearance.
6. Choose `Save`, enable the block, and test both spawn behavior and restart persistence.

`Max Active` is global across the whole weighted pool, while `Wave Size` is the number of spawn attempts. Reweighting or removing a source affects future selections; it does not remove unrelated NPCs that already spawned.

## Currency And HUD

1. In `Currency Editor`, create a currency ID and name.
2. Set `itemIcon` to a real item ID such as `minecraft:emerald`.
3. Enable `autoConvertOnPickup` if pickups should become balance.
4. For death loss, set `deathRule: "LOSE"` and `deathLossPercent`.
5. In `HUD Maker` or GUI Maker `currency_hud`, place currency display components.
6. Run `/drm currency reload` so the server reads the new currency definition.

## Before Production

| Item | Rule |
| --- | --- |
| Filenames | Dialogue set, GUI, shop, Teleporter, and currency filenames should match intended IDs. |
| Defaults | Do not overwrite bundled defaults directly. |
| Links | Dialogue/shop/Teleporter GUI and shop currency IDs should point to real files and definitions. |
| World data | Keep file-based server JSON separate from NPC PersistentData and NPC Spawner block-entity data. |
| Reload | If server JSON is edited directly, run `/drm reload` or the matching reload command. |

:::tip Production Copy
Manage production data from the full `config/dochi_rpg_maker` folder and the world save. Data stored only in NPC PersistentData or NPC Spawner blocks does not move with config file copies alone.
:::

:::tip Editing Shortcuts
Supported editors use `Ctrl+S`, `Ctrl+Z`, and `Ctrl+Y` or `Ctrl+Shift+Z`. On protected defaults, create a new ID with `Save As` instead of quick-saving.
:::

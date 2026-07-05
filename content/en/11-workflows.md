---
title: Recommended Workflows
slug: workflows
order: 120
description: Practical flows for dialogue NPCs, shop NPCs, currency/HUD setup, and release checks.
product: core
category: Reference / Operations
status: Stable
version: 0.1.2
audience: Creators
tags:
  - workflow
  - examples
---

## Dialogue NPC

1. In `GUI Maker`, create a `dialogue` GUI and save it as `gui/my_dialogue_gui.json`.
2. In `Dialogue Editor`, choose `Create New Dialogue Set`.
3. Point `dialogueDefaultGui.guiJsonPath` at your GUI file.
4. Confirm that the `start` node route points to the first general node.
5. Add text, choices, conditions, and actions to general nodes.
6. Use `Save As` and save to `dialogue_sets/my_npc_dialogue`.
7. Right-click the target NPC with the core item and apply the dialogue.
8. Right-click the NPC without the item to verify runtime.

## File-Based Shop NPC

1. In `GUI Maker`, create an `npc_shop` GUI or use `default_shop_gui.json`.
2. In `NPC Shop`, choose `Create New NPC Shop`.
3. Set `id`, `title`, `tradeMode`, and `currency` or `currencyId`.
4. Add buy products to `items` and sale offers to `sellItems`.
5. Connect `shopDefaultGui`, and optionally `shopGuis.buy` and `shopGuis.sell`.
6. Save as `npc_shops/blacksmith.json`.
7. Add a dialogue `go_shop` action with `shop: "blacksmith"`.
8. Test that the dialogue opens the shop.

## NPC-Bound Shop

1. Right-click the target NPC with the core item.
2. Open `NPC Shop` for that NPC.
3. Save the shop to NPC PersistentData.
4. Use a blank or `bound` `go_shop` value to open that NPC-bound shop.

This is convenient for one-off NPCs. File-based shops are easier when multiple NPCs share the same shop.

## Currency And HUD

1. In `Currency Editor`, create a currency ID and name.
2. Set `itemIcon` to a real item ID such as `minecraft:emerald`.
3. Enable `itemBacked` and `autoConvertOnPickup` if pickups should become balance.
4. For death loss, set `deathRule: "LOSE"` and `deathLossPercent`.
5. In `HUD Maker` or GUI Maker `currency_hud`, place currency display components.
6. Run `/drm currency reload`, then test login, pickup, and balance updates.

## Release Checklist

| Step | Check |
| --- | --- |
| Filenames | Dialogue set, GUI, shop, and currency filenames match intended IDs. |
| Defaults | Production files do not overwrite bundled defaults. |
| Conditions | Test both passing and failing cases. |
| Shop | Test stock 0, unlimited stock, insufficient currency, and full inventory. |
| Selling | Test same item with different prices, NBT items, and unit counts. |
| Reload | Compare behavior after server restart and `/drm reload`. |

:::tip Production Copy
Before deploying, copy the full `config/dochi_rpg_maker` folder from staging. Data stored only in NPC PersistentData will not be reproduced by copying files alone.
:::

---
title: JSON Reference (Advanced)
slug: json-reference
order: 100
description: Current DRM Core JSON shapes and key fields.
product: core
category: Reference / Operations
section: operations
status: Stable
version: 0.3.1
audience: Advanced users
tags:
  - json
  - reference
---

## Start with a file saved by the editor

Dialogue, shops and GUIs create files through **Save As**. This page is for importing externally edited files or inspecting saved settings. The JSON below is a structural outline: copying empty routes or items does not create a finished conversation or shop.

![Saving a dialogue set with Save As.](assets/media/guides/drm-031-forge1201/dialogue-save-result.png "DRM 0.3.1 / Forge 1.20.1. village_guide names the set folder. Keep dialogue_set.json and the individual node files together.")

For a working download, follow the [one-time reward conversation](#core/dialogue-rewards). Find each file location in [storage paths](#core/paths).

## Common Rules

- Save JSON as UTF-8.
- Treat paths as relative to `config/dochi_rpg_maker`.
- Matching filenames and internal `id` values makes dialogue and shop lookup easier.
- Clone bundled defaults with `Save As` instead of editing them in place.
- Dialogue and shop documents have a 1 MB network transfer limit.

## DialogueDocument Summary

```json
{
  "version": 1,
  "dialogueScript": true,
  "globals": {
    "ftb": false,
    "geckolib": false,
    "shopScript": false
  },
  "dialogueDefaultGui": {
    "guiSource": "default",
    "guiJsonPath": "default_dialogue_gui.json"
  },
  "setRegistry": ["default_set"],
  "nodes": {
    "start": {
      "type": "start",
      "routes": []
    },
    "dialogue_1": {
      "type": "general",
      "text": "",
      "choice": []
    }
  },
  "current": "start"
}
```

Dialogue sets are folder-based. `dialogue_set.json` is the full snapshot; node files provide per-node compatibility.

## GUI Layout Summary

```json
{
  "guiType": "npc_shop",
  "id": "default_shop_gui",
  "stage": {
    "width": 800,
    "height": 450,
    "grid": {
      "width": 4,
      "height": 4
    }
  },
  "elements": [
    {
      "id": "shop_rows",
      "type": "item_slot",
      "x": 88,
      "y": 112,
      "w": 416,
      "h": 154,
      "z": 2
    }
  ]
}
```

Elements use `id`, `type`, `x`, `y`, `w`, `h`, and `z` as their base fields. Type-specific style fields are added by GUI Maker.

## ShopDocument Summary

```json
{
  "type": "npc_shop",
  "schemaVersion": 2,
  "id": "blacksmith",
  "title": "Blacksmith",
  "currency": "minecraft:emerald",
  "currencyType": "item",
  "tradeMode": "buy_sell",
  "display": {
    "itemDescription": true,
    "itemSearchBar": true,
    "itemListMode": "scroll"
  },
  "shopDefaultGui": {
    "guiJsonPath": "default_shop_gui.json"
  },
  "items": [],
  "sellItems": []
}
```

`tradeMode` accepts `buy_only`, `sell_only`, and `buy_sell`. `items[].stock` uses `-1` for unlimited stock.

A 0.1.3 buy product can override payment and configure restocking.

```json
{
  "productId": "tacz_ammo",
  "item": "minecraft:paper",
  "count": 1,
  "price": 4,
  "currencyType": "item",
  "currencyItem": "tacz:ammo",
  "currencyItemNbt": "{AmmoId:\"tacz:9mm\"}",
  "stock": 8,
  "maxStock": 8,
  "restock": {
    "enabled": true,
    "amount": 2,
    "intervalTicks": 24000
  }
}
```

Use `currencyType: "inherit"` on a product to use the shop-level payment. Explicit invalid payment IDs or SNBT produce a runtime error instead of a fallback.

## Remnant Msg Summary

```json
{
  "type": "remnant_msg",
  "id": "tutorial",
  "enabled": true,
  "message": "Inspect the door.",
  "messageStyles": [],
  "useConditionsEnabled": false,
  "useConditions": [],
  "messageConditionsEnabled": false,
  "messageConditions": [],
  "messageActionsEnabled": false,
  "messageTrigger": "every_view",
  "messageActions": [],
  "gui": "default_remnant_msg_gui.json"
}
```

The separate `remnant_msg_policy` document controls general/admin JSON and trigger permissions, setter consumption, marker lifetime, and maximum message length.

## CurrencyDefinition Summary

```json
{
  "type": "currency",
  "id": "town_coin",
  "name": "Town Coin",
  "enabled": true,
  "iconType": "item",
  "itemIcon": "minecraft:emerald",
  "itemBacked": true,
  "autoConvertOnPickup": true,
  "displayFormat": "%s",
  "deathRule": "KEEP",
  "deathLossPercent": 0,
  "conversionItems": [
    {
      "itemId": "minecraft:emerald",
      "nbt": "",
      "unitValue": 10
    }
  ]
}
```

![Setting the conversion value of one emerald.](assets/media/guides/drm-031-forge1201/currency-emerald-prices.png "DRM 0.3.1 / Forge 1.20.1. minecraft:emerald and Value / Item 10 map to conversionItems itemId and unitValue. This verifies the saved definition, not a pickup conversion result.")

Use [HUD Maker](#core/hud-maker) for HUD appearance and visibility. The old hudAmountFormat and hudShowOnPickup fields are removed from currency definitions.

Currency IDs use lowercase letters, numbers, underscore, dash, or dot. `deathRule` is `KEEP` or `LOSE`.

## Settings Summary

`settings/defaults.json` manages default GUI and currency references.

```json
{
  "type": "editor_defaults",
  "version": 1,
  "defaultCurrencyId": "",
  "defaultCurrencyItem": "",
  "currencyEnabled": false,
  "defaultDialogueGui": {
    "guiJsonPath": "default_dialogue_gui.json"
  },
  "defaultShopGui": {
    "guiJsonPath": "default_shop_gui.json"
  }
}
```

`settings/reload_policy.json` manages reload behavior.

```json
{
  "type": "reload_policy",
  "version": 1,
  "reloadOnTrigger": true,
  "manualReloadCommand": true
}
```

:::tip Manual Editing
After editing JSON by hand, validate syntax, confirm you edited the server file, then use `/drm reload` or reload through the relevant editor.
:::

## Current repetition and restock fields

GUI root `spriteFillMode`/`spriteScale` and element `imageFit`/`tileWidthRatio`/`tileHeightRatio` follow [GUI Maker](#core/gui-system). NPC Shop root `restockTimeMode` is `real_ticks` or `world_ticks`; follow the [restock guide](#core/shop-system). Deadlines are runtime-managed, so do not supply arbitrary times in new definitions.

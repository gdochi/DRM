---
title: JSON Reference
slug: json-reference
order: 100
description: Current DRM Core JSON shapes and key fields.
product: core
category: Reference / Operations
section: operations
status: Stable
version: 0.1.2
audience: Advanced users
tags:
  - json
  - reference
---

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

## CurrencyDefinition Summary

```json
{
  "type": "currency",
  "id": "gold",
  "name": "Gold",
  "enabled": true,
  "iconType": "item",
  "itemIcon": "minecraft:gold_nugget",
  "itemBacked": true,
  "autoConvertOnPickup": true,
  "displayFormat": "%s",
  "hudAmountFormat": "compact",
  "deathRule": "KEEP",
  "deathLossPercent": 0,
  "hudShowOnPickup": true
}
```

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

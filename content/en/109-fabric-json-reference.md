---
title: JSON Reference
slug: json-reference
order: 100
description: Current DRM Core JSON shapes and key fields.
product: core-fabric
category: Reference / Operations
section: operations
status: Stable
version: 0.1.7
audience: Advanced users
tags:
  - json
  - reference
---

## Common Rules

- Save JSON as UTF-8.
- Treat paths as relative to `config/dochi_rpg_maker`.
- Matching filenames and internal IDs makes dialogue, shop, and Teleporter lookup easier.
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

A 0.1.7 buy product can override payment and configure restocking.

```json
{
  "productId": "special_ticket",
  "item": "minecraft:name_tag",
  "count": 1,
  "price": 4,
  "currencyType": "item",
  "currencyItem": "minecraft:paper",
  "currencyItemNbt": "",
  "stock": 8,
  "maxStock": 8,
  "restock": {
    "enabled": true,
    "amount": 2,
    "intervalTicks": 24000,
    "nextGameTime": 0
  }
}
```

Use `currencyType: "inherit"` on a product to use the shop-level payment. Explicit invalid payment IDs or SNBT produce a runtime error instead of a fallback.

## TeleporterDocument Summary

```json
{
  "schemaVersion": 2,
  "setId": "town_network",
  "displayName": "Town Network",
  "gui": "default_teleporter_gui.json",
  "interactionConditions": {
    "enabled": false,
    "conditionMode": "and",
    "conditions": []
  },
  "lockedPresentation": { "mode": "dimmed" },
  "transition": {
    "fadeOutTicks": 10,
    "fadeInTicks": 10
  },
  "categories": [
    { "id": "towns", "name": "Towns", "iconMedia": { "mode": "image" } }
  ],
  "destinations": [
    {
      "id": "spawn",
      "enabled": true,
      "categoryId": "towns",
      "name": "Spawn",
      "description": "Return to spawn",
      "descriptionStyles": [],
      "target": { "x": 0.5, "y": 64.0, "z": 0.5, "yaw": 0.0, "pitch": 0.0 },
      "accessConditions": { "enabled": false, "conditionMode": "and", "conditions": [] }
    }
  ]
}
```

Teleporter Sets are file-based `teleporter_set` documents under `teleporters`. A set supports up to 256 categories and 1,024 destinations. Targets use coordinates and rotation in the player's current dimension; the 0.1.7 schema has no dimension field.

## NPC Spawner Template Summary

```json
{
  "format": "dochi_rpg_maker_npc_spawner_template",
  "schemaVersion": 1,
  "sourceId": "npc/test_guard",
  "name": "test_guard",
  "classificationId": "npc",
  "entityType": "customnpcs:customnpc",
  "minecraftVersion": "1.21.1",
  "requiredMods": ["customnpcs"],
  "bindingPolicy": "",
  "displayName": "Test Guard",
  "subject": "",
  "partySize": 0,
  "level": 0,
  "payloadEncoding": "snbt",
  "entityNbt": "{...}"
}
```

Reusable templates live under `npc_spawner/entity_clones/<classification>`. The placed block's ConfigVersion 4 settings, weighted pool, and active leases live in world block-entity data instead of `ServerJsonStorage`. Do not hand-edit `entityNbt` unless you understand SNBT and CustomNPCs entity data.

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

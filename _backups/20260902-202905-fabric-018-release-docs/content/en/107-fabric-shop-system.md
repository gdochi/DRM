---
title: Shop System
slug: shop-system
order: 80
description: NPC Shop JSON, buy/sell modes, stock, currency, and shop GUI references.
product: core-fabric
category: Core Systems
section: npc-shop
status: Stable
version: 0.1.7
audience: Shop creators
tags:
  - shop
  - economy
---

## ShopDocument Structure

An NPC shop is JSON with `type: "npc_shop"` and `schemaVersion: 2`. Runtime reads this document and performs buy, sell, stock, and currency operations server-side.

| Field | Meaning |
| --- | --- |
| `id` | Unique shop ID. Matching the filename helps dialogue actions find it. |
| `title` | Display name. `titleTranslationKey` is supported. |
| `currency` / `currencyItem` | Item-currency fallback, such as `minecraft:emerald`. |
| `currencyType` / `currencyId` | Use `currency` plus a DRM currency ID for definition-backed currency. |
| `tradeMode` | One of `buy_only`, `sell_only`, or `buy_sell`. |
| `display` | Item description, search bar, and list mode options. |
| `shopDefaultGui` | Default shop GUI reference. |
| `shopGuis.buy` / `shopGuis.sell` | Separate buy and sell GUI references. |
| `items` | Products sold by the NPC. |
| `sellItems` | Items the NPC buys from players. |

## Trade Modes

| tradeMode | Buy | Sell | Description |
| --- | --- | --- | --- |
| `buy_only` | Yes | No | NPC sells items to the player. |
| `sell_only` | No | Yes | NPC buys items from the player. |
| `buy_sell` | Yes | Yes | Both buy and sell views are enabled. |

Older `buyEnabled`, `sellEnabled`, and `shopMode` values are normalized into `tradeMode` on load.

## Product Fields

| Field | Buy product `items` | Sell offer `sellItems` |
| --- | --- | --- |
| `productId` | Unique product row ID | Unique sell offer row ID |
| `item` | Item ID to give | Item ID to buy |
| `count` | Count given per buy unit | Count required per sell unit |
| `price` | Price per buy unit | Payout per sell unit |
| `stock` | Stock. `-1` means unlimited. | Not used. |
| `maxStock` | Maximum stock reached by automatic restocking. | Not used. |
| `restock` | Enabled state, amount, interval, and next game time. | Not used. |
| `currencyType` / `currencyItem` / `currencyItemNbt` / `currencyId` | Optional per-product payment override. | Not used. |
| `description` | Text or translation key shown in description panel. | Usually unused. |
| `action` | Command-like string after successful buy. | Not used. |
| `nbt` | Optional | Require matching item NBT. |

Duplicate product IDs are repaired with suffixes on load. Blank item IDs default to `minecraft:stone`.

## Buy Runtime

Buying runs server-side:

1. Resolve the shop target as `bound` or a file/ID target.
2. Check that `tradeMode` allows buying.
3. Validate selected product and requested quantity.
4. Limit quantity to available stock when stock is finite.
5. Check inventory space.
6. Charge item currency or DRM currency balance.
7. Give the item and update finite stock.

`stock: 0` means sold out. `stock: -1` means unlimited. Price is `price * quantity`. Finite products can use `maxStock` plus `restock.enabled`, `amount`, `intervalTicks`, and server-managed `nextGameTime`. Runtime shows `Restock in` or `Restock ready` when applicable.

## Per-Product Payment

Each buy product can use `Inherit Shop`, `Override: Item`, or `Override: Currency`. Item overrides accept exact SNBT in `currencyItemNbt`; use the inventory picker to preserve the exact value when payment items share an item ID but differ in stored data. Invalid NBT or an unknown DRM currency fails closed instead of falling back to another payment. Older fields remain available through the legacy item/currency compatibility modes.

In 0.1.7, the Item ID row opens a searchable item picker. Manual entry and inventory selection remain available, while the picker searches localized item names, namespaces, and full registry IDs with page-scoped icon previews.

## Sell Runtime

Selling requires an explicit selected `sellItems` offer. If the same item can be sold at different prices, runtime verifies that the selected offer still matches the inventory slot.

| Check | Description |
| --- | --- |
| Item ID | Inventory item must equal `sellItems[].item`. |
| NBT | If `sellItems[].nbt` exists, the item NBT string must match. |
| Unit count | Available count is rounded down to the offer `count` unit. |
| Price | `price` must be greater than 0. |

## Shop GUI Reference

Shop runtime expects a GUI JSON with `guiType: "npc_shop"`. The default shop GUI includes search, page controls, action button, transaction preview, and currency display components.

```json
{
  "shopDefaultGui": {
    "guiSource": "default",
    "guiJsonFileName": "default_shop_gui.json",
    "guiJsonPath": "default_shop_gui.json"
  }
}
```

Use `shopGuis.buy` and `shopGuis.sell` when buy and sell views need different layouts.

## Server-Side Trade Safety

The server revalidates the active session, NPC, dimension, distance, product, stock, and payment before every trade. Finite stock is reserved and saved before charging; delivery or payment failures restore stock and refund payment. Restock changes persist to file-based shops and are pushed to live viewers.

## Opening Shops From Dialogue

The dialogue action `go_shop` opens a shop.

| Value | Meaning |
| --- | --- |
| `bound` or blank | Open the shop attached directly to the NPC. |
| `blacksmith` | Find `npc_shops/blacksmith.json` or a shop whose ID is `blacksmith`. |
| `folder/blacksmith.json` | Resolve a shop file under a subfolder. |

:::warning File-Based Stock
Finite stock in file-based shops may be written back to the shop JSON after trades. When editing production shop files by hand, check whether the server is running and how reload policy is configured.
:::

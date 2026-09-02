---
title: PokéMart Editor Functional Guide
slug: cobblemon-pokemart
order: 540
description: Understand role-specific categories, currency, interaction conditions, saving, NPC application, and GUI editing.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Draft
version: 0.1.4
audience: Pokémon shop creators and server operators
tags:
  - pokemart
  - editor
  - runtime
---

## Editor versus player screen

`PokéMart Editor` creates shop documents. `PokeMartRuntimeScreen` is the player-facing screen opened after a document is applied to an NPC. Editor field positions do not control player layout; the Runtime GUI JSON does.

## Roles and active categories

Each document has exactly one role. The role selects the enabled editor category and runtime tabs.

| Role | Editor categories | Player runtime |
| --- | --- | --- |
| `Sales` | General and Pokémon Products | Catalog, details, balance, and purchase |
| `Trade` | General and Pokémon Trades | Offers, owned-Pokémon selection, and confirmation |
| `Auction` | General and Auction | Auction list, listing creation, and claims |

Changing roles does not immediately erase the other role's products or trades, but the current runtime ignores them. Use separate NPCs when a location must provide both sales and trades.

## General fields

| Setting | Runtime use |
| --- | --- |
| Mart ID | Internal token, up to 64 characters |
| Display Name | Header title, up to 96 characters |
| Role | Selects editor category, default GUI, and allowed server actions |
| Currency Provider / ID | Used by Sales and Auction; Trade does not charge currency |
| GUI JSON Path | Runtime layout relative to `config/dochi_rpg_maker/gui/` |
| Interaction Conditions | DRM condition group checked before the server opens the screen |

## Currency providers

| Provider | ID | Server behavior |
| --- | --- | --- |
| `cobbledollars` | Usually `balance` | Reads and updates CobbleDollars balance; unavailable when the mod is missing |
| `drm` | A DRM Currency ID | Uses a currency created in DRM Currency Editor |
| `item` | For example `minecraft:emerald` | Consumes inventory items with optional exact Item NBT matching |

The picker can search DRM currencies and current inventory items. When Item NBT is configured, stacks with the same ID but different NBT do not qualify.

## Role and GUI path changes

When the current path is one of the canonical defaults, changing Role automatically selects:

```text
Sales   → pokemart_sales_gui.json
Trade   → pokemart_trade_gui.json
Auction → pokemart_auction_gui.json
```

A custom GUI path is preserved across a role change. Its components may not fit the new role, so switch the path manually or start from that role's default GUI.

`Apply UI` and `Edit UI` open the current path in DRM GUI Maker. Save the GUI, return to PokéMart Editor, verify the path, and save the PokéMart document as well.

## Interaction conditions

The shared DRM condition editor configures a flat `AND` or `OR` group. The server evaluates it before opening the shop and rejects the entire document when it fails. These are shop-entry conditions, not per-product rules. Split VIP and public catalogs into separate documents or NPCs when they require different access.

## Save and apply

1. Save a relative path such as `towns/pewter_sales.json` under `cobblemon/pokemarts/`.
2. Open the editor for a target NPC and choose `Apply to NPC`.
3. Empty both hands and right-click the NPC.
4. Verify that the runtime tabs match the selected role.
5. Saving to the same bound source path updates the next shop request. Reapply only when changing the path or role.

Version 0.1.4 performs search and paging on the server for products, offers, eligible owned Pokémon, listings, selling choices, and claims. Large shops no longer send every row at once.

`Clear` removes the PokéMart binding from the NPC. It does not delete the server JSON or world-level auction and claim data.

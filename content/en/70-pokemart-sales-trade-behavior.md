---
title: Sales, Trade, and Stock Processing
slug: pokemart-sales-trade-behavior
order: 541
description: Follow Sales transactions, Trade matching, per-NPC stock, restocking, and failure recovery.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Draft
version: 0.1.0
audience: Creators building sales shops and trade centers
tags:
  - sales
  - trade
  - stock
---

## Sales products

A Sales document supports up to 256 products. Add, duplicate, or remove rows, then use the detailed Pokémon editor for the delivered Pokémon.

| Field | Behavior |
| --- | --- |
| Product ID | Inventory key and purchase lookup; keep it unique inside the document |
| Pokémon | Full species, form, aspects, shiny, level, nature, ability, ball, held item, and up to four moves |
| Description | Runtime detail text, up to 512 characters |
| Price | Non-negative integer in the selected currency |
| Initial Stock | Initial server count; `-1` means unlimited |
| Maximum Stock | Restock cap; normalized to at least Initial Stock |
| Restock Amount | Units restored per interval; zero disables restocking |
| Restock Interval | 20 ticks through 30 days; normalized to zero when restock amount is zero |

If IDs are duplicated, server lookup uses the first match. The editor may not present that as a hard validation error, so creators must keep IDs unique.

## Stock identity

Finite stock is keyed by `NPC UUID + Product ID`. Two NPCs using the same document have separate stock. Renaming Product ID on the same NPC creates a new stock key beginning at Initial Stock.

Restocking uses server world time. Offline wall-clock time does not refill inventory. When world ticks advance and stock is queried again, missed intervals are applied together up to Maximum Stock.

## Sales transaction order

1. Validate Sales role and Product ID.
2. Validate the currency provider and balance.
3. Reserve one unit of NPC stock.
4. Create the configured Cobblemon Pokémon.
5. Debit currency.
6. Deliver the Pokémon.
7. Flush success and stock state to world storage.

Creation or payment failure restores reserved stock. Delivery failure attempts both a currency refund and stock restoration. If delivery and recovery both fail, the server reports `recovery_failed`; an operator should inspect the player's balance and logs.

## Trade offers

A Trade document supports up to 128 offers. Each offer has one Pokémon given by the NPC and one request matcher for the player's Pokémon.

| Request field | Match rule |
| --- | --- |
| Species | Must match |
| Form | Blank allows all forms; otherwise exact match |
| Aspects | The player's Pokémon must contain every comma-separated requested aspect |
| Shiny `Any` | Either state |
| Shiny `Required` | Shiny only |
| Shiny `Forbidden` | Non-shiny only |
| Min / Max Level | Inclusive 1–100 range |

Nature, ability, moves, ball, and held item affect the offered Pokémon but are not request-matching fields.

## Trade transaction

1. The player selects an offer.
2. Runtime filters owned Pokémon to eligible candidates.
3. The player confirms a permanent exchange.
4. The server rechecks ownership, tradeability, matcher rules, and offer stock.
5. It saves the original Pokémon NBT and removes that Pokémon.
6. It creates and delivers the offered Pokémon.

If delivery fails, the server tries to restore the original. If immediate restoration fails, it stores the Pokémon in the same Pokémon Claim ledger used by auctions, and restores offer stock.

Trade stock uses `NPC UUID + Trade ID` and the same Initial/Maximum/Restock rules. Trade IDs must also be unique.

## Test cases

- Two players clicking the last finite-stock row should produce one success.
- Test purchase and trade recovery with limited party or PC capacity.
- Confirm item currency rejects mismatched NBT.
- Test Form and Aspect requests against both ordinary and variant Pokémon.
- Treat published Product and Trade IDs as persistent stock identifiers.

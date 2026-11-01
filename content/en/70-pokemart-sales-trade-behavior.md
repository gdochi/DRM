---
title: Sell and Trade Pokémon
slug: pokemart-sales-trade-behavior
order: 541
description: Create Pokémon products and trade offers, then manage prices and stock.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Draft
version: Fabric / NeoForge 0.2.9
audience: Creators building sales shops and trade centers
tags:
  - sales
  - trade
  - stock
---

## Make a Pokémon product

Choose **Sales** and a payment method in [PokéMart setup](#drm-cobblemon-editor/cobblemon-pokemart), then open **Pokémon Catalog → Add**. Select the product and use **Edit Detailed Pokémon Data** for species, level and moves. Set its price and stock, **Save As** your own file, then apply it to the shop NPC.

![Bulbasaur product with price and stock fields.](assets/media/guides/cobble-029-neo1211/cobble-catalog.png "Creator screen in Cobblemon Editor 0.2.9 / NeoForge 1.21.1. Price 5000, Initial 3, Maximum 3, Restock 1 and Interval 72000 replenish one Pokémon per hour up to three. This is an editing example, not a completed purchase.")

**Buyers need a free active-party slot.** Purchases are not automatically sent to the PC. Check the payment method and delivered Pokémon before expanding the catalog.

![Actual NPC shop after a purchase, with balance 60 and stock 2.](assets/media/guides/cobble-029-neo1211-player/cobble-sales-purchased.png "In the same version, the saved and applied product costs four emeralds. Buy · 4 changed emeralds 64→60 and stock 3→2, and added one level 5 Bulbasaur to the server party.")

### Price and stock reference

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

## If a purchase fails

Failed delivery or payment restores the stock and payment. Report persistent errors and transaction details to an administrator.

Purchases go to the active party. **Keep a free party slot before buying.** Sales do not automatically send purchases to the PC.

## Trade offers

Choose **General → Trade**, then **Pokémon Trades → Add**. The middle model is the Pokémon given by the NPC; **Requests** below it identifies what the player must give.

![Bulbasaur ← Rattata offer with requested levels, stock and both Pokémon editor buttons.](assets/media/guides/cobble-029-neo1211-flow/cobble-mart-trades.png "An actual Add result in 0.2.9 / NeoForge 1.21.1: the player gives Rattata and receives Bulbasaur. Offered and Requested are edited separately. This does not show a completed exchange.")

1. Use **Edit NPC Offered Pokémon** to choose the reward Pokémon.
2. Use **Edit Requested Pokémon** to choose the required species, form and aspects.
3. Set **Minimum / Maximum level**, **Shiny rule** and **NPC Stock** on the right.
4. **Save As** and apply the file to the trade NPC. Players select an offer and an eligible owned Pokémon, then confirm the exchange.

A Trade document supports up to 128 offers. The following rules match the **player’s Pokémon**.

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

## Complete an exchange

1. The player selects an offer.
2. Choose an eligible Pokémon from the active party or PC.
3. Check the offered Pokémon and confirm the permanent exchange.

![Player-owned Rattata selected for the exchange.](assets/media/guides/cobble-029-neo1211-player/cobble-trade-player.png "Choose Your Pokémon opens the eligible owned list. Check the individual and the green requirement message, then press Confirm Trade.")

![Trade completed with offer stock zero and the success message.](assets/media/guides/cobble-029-neo1211-player/cobble-trade-completed.png "After the actual Confirm Trade, Rattata was removed from the server party, a level 5 Bulbasaur was added and offer stock changed 1→0. This exchange used no currency.")

If delivery fails, the server tries to restore the original and restores offer stock. If immediate restoration fails, the Pokémon is kept in [Pokémon Claims](#drm-cobblemon-editor/pokemart-auction-gui-runtime).

The offered Pokémon goes to the **active party**. Giving a party Pokémon frees its slot, but trading a PC Pokémon with a full party can fail delivery. Keep a party slot free.

Trade stock uses `NPC UUID + Trade ID` and the same Initial/Maximum/Restock rules. Trade IDs must also be unique.

## Test cases

The addon fetches Sales products, Trade offers, and matching owned Pokémon by search and page. Large catalogs and PC storage no longer have to be sent as one list.

- Two players clicking the last finite-stock row should produce one success.
- Test purchase and trade recovery with limited party or PC capacity.
- Confirm item currency rejects mismatched NBT.
- Test Form and Aspect requests against both ordinary and variant Pokémon.
- Treat published Product and Trade IDs as persistent stock identifiers.

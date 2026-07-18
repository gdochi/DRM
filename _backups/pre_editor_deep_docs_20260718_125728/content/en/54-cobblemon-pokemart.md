---
title: PokéMart Authoring and Runtime
slug: cobblemon-pokemart
order: 540
description: Configure Pokémon sales, trade, and auction roles with currency, stock, access conditions, and runtime GUIs.
product: drm-cobblemon-editor
category: PokéMart
section: pokemart
status: Draft
version: 0.1.0
audience: Pokémon shop creators and server operators
tags:
  - pokemart
  - trade
  - auction
---

## Editor and player screen

`PokéMart Editor` creates shop documents. After a document is applied to a CustomNPCs NPC, a player with both hands empty can right-click that NPC to open `PokeMartRuntimeScreen`.

Editor lists and input fields are authoring controls, not the final player layout. The linked GUI JSON defines the screen arrangement, while the server supplies prices, stock, owned Pokémon, and auction state.

## Choose one NPC role

Each PokéMart document has exactly one role.

| Role | Player action | Currency |
| --- | --- | --- |
| `Sales` | Buy predefined Pokémon according to price and stock | Used |
| `Trade` | Exchange an eligible owned Pokémon for the offered Pokémon | Not directly used |
| `Auction` | List Pokémon, bid, buy out, settle, and claim | Used |

Changing the role selects the matching default runtime GUI: `pokemart_sales_gui.json`, `pokemart_trade_gui.json`, or `pokemart_auction_gui.json`. If you linked a custom GUI, verify that its components still match the new role.

## Build the first Sales shop

1. Open `PokéMart Editor` and choose `Use Default`.
2. Set ID and Display Name, then keep Role on `Sales`.
3. Select a Currency Provider and Currency ID.
4. Add the Pokémon spec, description, price, and stock under Products.
5. Save a user copy such as `custom/first_sales.json`.
6. Apply it to a CustomNPCs NPC through `Cobblemon PokéMart`.
7. Empty both hands, right-click the NPC, and test a real purchase.

## Currency providers

| Provider | Example ID | Use |
| --- | --- | --- |
| `cobbledollars` | `balance` | CobbleDollars account balance; requires that mod |
| `drm` | A DRM currency ID | A server currency created in DRM Currency Editor |
| `item` | `minecraft:emerald` | An item, with optional NBT matching, used as currency |

The default PokéMart uses `cobbledollars:balance`. If CobbleDollars is not installed, choose a DRM or item provider before release.

## Sales products and stock

A Sales document supports up to 256 products. Each product stores Product ID, the full Pokémon spec, description, price, initial and maximum stock, restock amount, and restock interval.

| Stock value | Meaning |
| --- | --- |
| Initial Stock `-1` | Unlimited stock |
| Initial Stock `0` or higher | Finite stock tracked by the server |
| Restock Amount `0` | Automatic restocking disabled |
| Restock Interval | Delay in ticks; 20 ticks are about one second |

Purchases and stock are server-authoritative. The runtime includes payment-recovery handling when delivery fails, but production testing must cover both the selected currency provider and Pokémon delivery.

## Trade offers

A Trade document supports up to 128 offers. Each offer separately defines the Pokémon given to the player and the eligibility rules for the Pokémon the player must provide.

Eligibility may check Species, optional Form, required Aspects, Shiny state (`Any`, `Required`, or `Forbidden`), and minimum or maximum Level. The player must explicitly select an owned Pokémon that satisfies the rules. Trade offers may also use unlimited or finite stock and restocking.

## Auction policy

| Policy | Meaning |
| --- | --- |
| House ID | Group ID shared by documents using the same auction house |
| Max Listings | Maximum active listings per player |
| Duration | Listing lifetime |
| Listing Fee | Amount paid when creating a listing |
| Sale Tax | Percentage deducted from a completed sale |
| Minimum Bid Increment | Required increase for the next bid |
| Allow Buyout | Whether instant purchase is allowed |
| Allow Shiny / Legendary | Pokémon eligibility policy |

The server holds listed Pokémon in escrow and records bids, purchases, cancellations, expiry, and settlement. Unclaimed currency or Pokémon are recovered through the runtime Claim flow. Before opening a production server, test reconnects, restarts, expiry, self-bid prevention, and buyout.

## Interaction conditions

When Interaction Conditions are enabled, the server evaluates the condition group before opening the shop. The structure follows DRM dialogue conditions and can combine supported checks such as tags, items, and advancements.

A player who fails the group cannot open the shop. Use bundled `samples/` documents as references, but copy them to a user path with `Save As`.

## Runtime GUI connection

```text
config/dochi_rpg_maker/gui/
├─ pokemart_sales_gui.json
├─ pokemart_trade_gui.json
└─ pokemart_auction_gui.json
```

To customize a screen in GUI Maker, copy the canonical GUI with `Save As` and link the new path from the PokéMart document. Sales, Trade, and Auction require different lists and actions, so do not assume one role's layout works for another.

## Operations checklist

- Apply the shop document to the target NPC after saving changes.
- Install the selected currency mod on both server and client where required.
- Verify finite stock decreases and restocks at the configured interval.
- Rapid repeated clicks must not duplicate deliveries.
- Test Auction fees, taxes, bid increment, Buyout, and Claim with real balances.
- Confirm the intended interaction when DRM Dialogue or NPC Shop is also attached.

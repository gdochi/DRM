---
title: Auction Escrow, Settlement, and Runtime GUI
slug: pokemart-auction-gui-runtime
order: 542
description: Understand listing, bidding, buyout, cancellation, expiry, claims, and PokéMart GUI Maker components.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Draft
version: 0.1.0
audience: Creators operating auction houses and custom PokéMart screens
tags:
  - auction
  - escrow
  - gui-maker
---

## Auction Policy

| Setting | Range | Runtime behavior |
| --- | ---: | --- |
| House ID | Up to 64 token characters | Auction NPCs with the same ID share listings and settlement scope |
| Max Listings | 1–64 | Active listings per player in that house |
| Maximum Duration | 5–10,080 minutes | Upper bound of the duration a player may choose |
| Listing Fee | Non-negative integer | Debited before escrow; refunded when escrow transfer fails |
| Sale Tax | 0–100% | Deducted from completed sale proceeds |
| Minimum Bid Increment | At least 1 | Required next-bid increase |
| Allow Buyout | On/Off | Enables instant-purchase price and action |
| Allow Shiny / Legendary | On/Off | Listing eligibility |

Use the same House ID and compatible currency configuration when several NPCs should expose one global auction.

## Listing and escrow

The server requires a positive starting bid, a buyout of zero or at least the starting bid, available listing capacity, owned and tradeable Pokémon, policy eligibility, and a payable listing fee.

After validation, it debits the fee, removes the full Pokémon from player storage, and places its NBT in world PersistentState escrow. If removal fails, the fee is refunded and no listing is created.

## Bids and buyout

Sellers cannot bid on their own listings. A stale listing Revision is rejected so an old client price cannot overwrite newer state.

- A new bidder escrows the full bid.
- The current highest bidder pays only the difference when raising their own bid.
- An outbid player's previous amount moves to Money Claim.
- A bid at or above Buyout settles at the configured buyout amount.
- Settlement gives the buyer a Pokémon Claim and the seller a post-tax Money Claim.

Claims preserve data across offline players, full party/PC capacity, and temporarily unavailable currency providers.

## Cancellation and expiry

Only the seller may cancel, and only before a highest bidder exists. Cancellation completes only if the Pokémon can immediately return to party or PC; otherwise the listing stays active.

The server settles expired listings approximately every 20 ticks.

- No bidder: return the Pokémon through seller Claim.
- Highest bidder: create buyer Pokémon Claim and seller Money Claim.
- Seller proceeds: `winning amount - (winning amount × tax ÷ 100)`.

`Claim All` removes only entries successfully delivered. Failed currency or Pokémon delivery leaves the claim for a later retry.

## Runtime GUI components

PokéMart GUI Maker uses an 800×450 logical Stage.

| Component | Runtime data/action | Inspector examples |
| --- | --- | --- |
| Header and Balance | Display Name, balance, provider warning | Title, balance, warning colors |
| Toolbar | Refresh and Close | Button colors |
| Mode Tabs | Role-specific tab switching | Gap and active/inactive colors |
| Search | Filters the current list | Placeholder translation key |
| Catalog | Scrollable products, offers, or listings | Row height/gap, colors, scrollbar |
| Pokémon Preview | Selected 3D model | Model Scale, level/shiny display |
| Pokémon Details | Species, description, price, stock, or bid data | Text colors |
| Action Area | Buy, trade, bid, list, cancel, claim | Control gap and button colors |

These functional components are singletons. Removing a critical component leaves runtime with no place to render its data or controls.

| Role | Visible runtime tabs |
| --- | --- |
| Sales | Pokémon Shop |
| Trade | Pokémon Trade |
| Auction | Auction, Create Listing, Claims |

If GUI JSON is missing, has the wrong `guiType`, or lacks a valid element structure, runtime falls back to the addon default for that role. If only one area is missing, inspect that component's presence and geometry first.

## Operations test

1. Player A lists a Pokémon; verify fee and removal.
2. Player B bids; verify A cannot cancel.
3. Player C outbids; verify B receives a refund claim.
4. Complete Buyout and claim buyer Pokémon and seller net proceeds.
5. Test expiry with and without a bidder.
6. Restart the server and verify listings, escrow, bids, and claims persist.
7. Temporarily disable a currency provider and verify failed claims remain stored.

---
title: Auctions, Claims and Shop Layouts
slug: pokemart-auction-gui-runtime
order: 542
description: Set up an auction NPC, collect purchases and proceeds, and customize the player screen.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Draft
version: Fabric / NeoForge 0.2.9
audience: Creators operating auction houses and custom PokéMart screens
tags:
  - auction
  - escrow
  - gui-maker
---

## Make an auction NPC

In [PokéMart Editor](#drm-cobblemon-editor/cobblemon-pokemart), choose **General → NPC Role → Auction** and a payment method. Open **Auction** on the left to set **Auction House ID**, listing fees and tax. **Save As** your own file and apply it to the auction NPC.

![Auction house ID, listing limits, fees and tax in the editor.](assets/media/guides/cobble-029-neo1211-flow/cobble-mart-auction.png "Creator screen in Cobblemon Editor 0.2.9 / NeoForge 1.21.1. The example uses house default, five listings per player, a 1440-minute limit, fee 500, tax 5% and minimum bid increase 100. It does not show a completed listing or sale.")

Use the **same House ID and compatible currency settings** to share listings between villages. Different IDs create separate auction houses even when their currencies match.

## List, bid and collect

1. In **Auction Listing**, choose a Pokémon and starting bid. The current default screen uses the house’s configured duration. Set an optional buyout if the house permits it. Listing charges the fee and holds the Pokémon for auction.
2. Other players select a listing in **Auction** and bid or buy out. Sellers cannot bid on their own listings.
3. After settlement, open **Settlement Inbox → Claim All**. Buyers collect Pokémon; sellers collect proceeds after tax. Outbid players also collect their previous bids here.

**Keep a free active-party slot before collecting Pokémon.** PC space alone does not guarantee delivery. Entries that cannot be delivered stay in Claims; fix capacity or currency access and try again.

![Rattata and prices selected under Auction Listing.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-player.png "Actual player screen in 0.2.9 / NeoForge 1.21.1. This exercise uses emeralds, starting bid 10, buyout 20 and fee 2. List Pokémon · Fee 2 submits the listing.")

![The listed Rattata and balance 62 after the listing fee.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-listed.png "Listing changed emeralds 64→62, removed Rattata from the party and created one active listing. Bid and Buyout are disabled for the seller; Cancel Listing remains available.")

![An unbid expired Pokémon waiting in Settlement Inbox.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-inbox.png "The isolated world’s game clock was advanced to check unbid expiry. Pokémon waiting: 1 was followed by the actual Claim All action.")

![Zero Pokémon waiting and Auction claims delivered after collection.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-claimed.png "Rattata returned to the server party and the waiting count changed 1→0. Balance remained 62 after the paid listing fee. This exercise did not include another player’s bid, a completed sale or tax settlement.")

## Auction settings reference

| Setting | Range | Runtime behavior |
| --- | ---: | --- |
| House ID | Up to 64 token characters | Auction NPCs with the same ID share listings and settlement scope |
| Max Listings | 1–64 | Active listings per player in that house |
| Maximum Duration | 5–10,080 minutes | Duration cap; the current default listing screen uses this value |
| Listing Fee | Non-negative integer | Debited before escrow; refunded when escrow transfer fails |
| Sale Tax | 0–100% | Deducted from completed sale proceeds |
| Minimum Bid Increment | At least 1 | Required next-bid increase |
| Allow Buyout | On/Off | Enables instant-purchase price and action |
| Allow Shiny / Legendary | On/Off | Listing eligibility |

Existing listings retain their original currency and tax settings. Editing the auction document does not convert every active listing to the new policy.

## Listing and escrow

The server requires a positive starting bid, a buyout of zero or at least the starting bid, available listing capacity, owned and tradeable Pokémon, policy eligibility, and a payable listing fee.

Registering charges the fee and holds the Pokémon for auction. Failed registration refunds the fee and creates no listing.

## Bids and buyout

If another player bids while your screen is open, switch tabs or reopen the NPC screen and check the new price before bidding again. Ordinary bids must meet the current price plus **Minimum Bid Increment**.

- A new bidder escrows the full bid.
- The current highest bidder pays only the difference when raising their own bid.
- An outbid player's previous amount moves to Money Claim.
- A bid at or above Buyout settles at the configured buyout amount.
- Settlement gives the buyer a Pokémon Claim and the seller a post-tax Money Claim.

Undelivered Claims remain stored while a player is offline, their party is full, or the currency provider is unavailable.

## Cancellation and expiry

Only the seller may cancel, and only before a highest bidder exists. Cancellation completes only if the Pokémon can immediately return to party or PC; otherwise the listing stays active.

The server settles expired listings approximately every 20 ticks.

- No bidder: return the Pokémon through seller Claim.
- Highest bidder: create buyer Pokémon Claim and seller Money Claim.
- Seller proceeds: `winning amount - (winning amount × tax ÷ 100)`.

`Claim All` removes only entries successfully delivered. Failed currency or Pokémon delivery leaves the claim for a later retry.

## Runtime GUI components

Check the shop’s behavior first, then edit a **PokéMart** layout in [GUI Maker](#core/gui-system). Use **Save As** for your own layout and connect it in **General → Runtime GUI** in PokéMart Editor. The creator’s product form and the player’s transaction screen are separate screens.

PokéMart GUI Maker uses an 800×450 logical Stage.

| Component | Runtime data/action | Inspector examples |
| --- | --- | --- |
| Header and Balance | Display Name, balance, provider warning | Title, balance, warning colors |
| Toolbar | Close | Button colors |
| Mode Tabs | Role-specific tab switching | Gap and active/inactive colors |
| Search | Filters the current list | Placeholder translation key |
| Catalog | Scrollable products, offers, or listings | Row height/gap, colors, scrollbar |
| Pokémon Preview | Selected 3D model | Model Scale, level/shiny display |
| Pokémon Details | Species, description, price, stock, or bid data | Text colors |
| Action Area | Buy, trade, bid, list, cancel, claim | Control gap and button colors |

These functional components are singletons. Removing a critical component leaves runtime with no place to render its data or controls.

The addon searches and pages listings, eligible Pokémon, selling choices, and claims on the server. The default PokéMart and Starter Selector layouts use DRM's shared sprite sheet. Only untouched legacy defaults are upgraded automatically; customized GUI files are preserved and the replaced defaults are backed up under `cobblemon/_migration_backups/`.

| Role | Visible in-game tabs |
| --- | --- |
| Sales | Pokémon Shop |
| Trade | Pokémon Trade |
| Auction | Auction, Auction Listing, Settlement Inbox |

If GUI JSON is missing, has the wrong `guiType`, or lacks a valid element structure, runtime falls back to the addon default for that role. If only one area is missing, inspect that component's presence and geometry first.

## Operations test

1. Player A lists a Pokémon; verify fee and removal.
2. Player B bids; verify A cannot cancel.
3. Player C outbids; verify B receives a refund claim.
4. Complete Buyout and claim buyer Pokémon and seller net proceeds.
5. Test expiry with and without a bidder.
6. Restart the server and verify listings, escrow, bids, and claims persist.
7. Temporarily disable a currency provider and verify failed claims remain stored.

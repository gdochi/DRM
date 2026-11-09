---
title: Make a Pokémon Shop or Trading NPC
slug: cobblemon-pokemart
order: 540
description: Create NPCs that sell, trade or auction Pokémon.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Draft
version: Fabric / NeoForge 0.2.9
audience: Pokémon shop creators and server operators
tags:
  - pokemart
  - editor
  - runtime
---

## Choose a role

**PokéMart Editor** makes Pokémon-trading NPCs. Use DRM's **NPC Shop** for ordinary item shops.

| Role | Player activity |
| --- | --- |
| **Sales** | Buy Pokémon at fixed prices |
| **Trade** | Exchange a matching owned Pokémon |
| **Auction** | List, bid and collect settlements |

One NPC uses one role. Use separate NPCs for a shop and a trading service.

![PokéMart General role and payment settings.](assets/media/guides/cobble-029-neo1211/cobble-pokemart.png "Choose NPC Role and Currency on the right. The default Provider is CobbleDollars; change it to an available payment provider if that mod is absent. Version 0.2.9 / NeoForge 1.21.1.")

## Make the first shop

1. Open **Add-on → PokéMart Editor** from DRM's editor list.
2. Load a default and choose **General → NPC Role → Sales**.
3. Set the name and payment under **General**.
4. Use **Pokémon Catalog → Add**, then **Edit Detailed Pokémon Data** at the lower right to choose species, level, form and other details.
5. Set its price and **NPC Stock → Initial**. **-1** is unlimited.
6. **Save As** your own file.
7. Open a DNPC or CustomNPCs NPC with the DRM Core and apply **PokéMart**.
8. Interact with empty hands. Buyers need a free party slot.

![Pokémon Catalog editing a level 5 Bulbasaur product, price and stock.](assets/media/guides/cobble-029-neo1211/cobble-catalog.png "Select a product on the left to edit it on the right. This example costs 5000, starts/caps at 3, and restocks 1 every 72000 ticks: one hour at 20 ticks per second.")

## Choose payment

**Currency Provider / ID** selects DRM currency, items or CobbleDollars. Create DRM money in Currency Editor first; CobbleDollars needs its mod installed.

Trade uses a matching Pokémon instead of money. See [sales and trades](#drm-cobblemon-editor/pokemart-sales-trade-behavior).

## Change the screen

Select the player-facing layout in **Runtime GUI**. The editor's input fields and the player's shop screen are separate layouts.

See [auction registration, bids and collection](#drm-cobblemon-editor/pokemart-auction-gui-runtime) for auctions.

## Update the shop

**Save** product/price changes to the same file for the next interaction. **Apply** again after changing the file name or role.

Stock, auctions and collection data remain in the world. Move configuration and world together. Removing the NPC's shop link does not delete ongoing auctions.

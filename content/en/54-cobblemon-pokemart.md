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

## Make the first shop

1. Open **Add-on → PokéMart Editor** from DRM's editor list.
2. Load a default and choose **Role → Sales**.
3. Set the name and payment under **General**.
4. Add a product and edit its species, level, form and other Pokémon details.
5. Set its price and **Initial Stock**. **-1** is unlimited.
6. **Save As** your own file.
7. Open a DNPC or CustomNPCs NPC with the DRM Core and apply **PokéMart**.
8. Interact with empty hands. Buyers need a free party slot.

## Choose payment

**Currency Provider / ID** selects DRM currency, items or CobbleDollars. Create DRM money in Currency Editor first; CobbleDollars needs its mod installed.

Trade uses a matching Pokémon instead of money. See [sales and trades](#drm-cobblemon-editor/pokemart-sales-trade-behavior).

## Change the screen

Select the player-facing layout in **Runtime GUI**. The editor's input fields and the player's shop screen are separate layouts.

See [auction registration, bids and collection](#drm-cobblemon-editor/pokemart-auction-gui-runtime) for auctions.

## Update the shop

**Save** product/price changes to the same file for the next interaction. **Apply** again after changing the file name or role.

Stock, auctions and collection data remain in the world. Move configuration and world together. Removing the NPC's shop link does not delete ongoing auctions.

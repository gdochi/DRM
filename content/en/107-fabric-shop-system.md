---
title: Create an NPC Shop
slug: shop-system
order: 80
description: Choose products, prices and payment, then give an NPC a shop.
product: core-fabric
category: Core Systems
section: npc-shop
status: Stable
version: 0.3.1
audience: Shop creators
tags:
  - shop
  - economy
---

## Make a shop that sells bread

1. Open **NPC Shop** and load a default shop.
2. Choose **buy-only**. “Buy” means the player buys from the NPC.
3. Add bread and set the quantity and price for one purchase.
4. Choose an item payment, such as emeralds. To use DRM money, create it in Currency Editor first.
5. Set stock to **-1** for unlimited sales while setting up.
6. Use **Save As** to save your shop.
7. Right-click the NPC with the Core, apply the shop, then empty both hands to open it.

## Selling and buying back

| Goal | Setup |
| --- | --- |
| NPC sells to the player | Add products to the buy list |
| NPC buys items from the player | Add them to the sell/buyback list |
| Both | Use buy-and-sell mode |

The NPC only buys back listed items. You can list the same item several times with different quantities or prices.

## Stock and restocking

Stock **0** means sold out; **-1** means unlimited. For limited sales, use a positive stock and set maximum stock, refill amount and interval under **RESTOCK**.

**Timer basis** applies to the whole shop.

| Setting | Time counted |
| --- | --- |
| **Real ticks** | Time actually played; skips made by sleeping are excluded |
| **World ticks** | World time, including time skipped by sleeping |

At normal speed, 20 ticks is one second and 24,000 ticks is about 20 minutes. Real ticks does not count time while the server is off. Unlimited and buyback entries do not restock.

Different NPCs have separate stock even when they use the same product file. Players visiting the same NPC share its stock.

## Different payment for one product

**Inherit Shop** uses the shop's money. **Override: Item** chooses a separate payment item. **Override: Currency** chooses separate DRM currency.

Select a custom item from inventory when its exact name, enchantments or variant matters.

## Open a shop from dialogue

Add an **open shop / go_shop** action to a dialogue choice and choose the saved shop. Use **bound** for the shop already applied to that NPC.

Use [GUI Maker](#core-fabric/gui-system) for the window's layout and pictures. Products and prices are still edited in NPC Shop.

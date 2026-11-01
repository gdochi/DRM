---
title: Products, Buyback and Stock
slug: shop-editor-items
order: 81
description: Make a three-bread product costing four emeralds, then configure stock and restocking.
product: core
category: NPC Shop
section: npc-shop
status: Guide
version: 0.3.1
audience: Shop creators
---

## Choose which direction the trade goes

Open the default shop from [NPC Shop setup](#core/shop-system). **Buy items** contains products the player buys; **Sell items** contains items the player sells to the NPC. The shop’s trade mode must also permit the selected direction.

| Example | List | Player receives |
| --- | --- | --- |
| NPC sells bread | Buy items | Bread after paying |
| NPC buys wheat | Sell items | The configured payment after giving wheat |

## Make one bundle of three bread

![Bread selected under Buy items, with Product settings.](assets/media/guides/drm-031-forge1201/shop-bread-product.png "DRM 0.3.1 / Forge 1.20.1. Quantity 3 is bread per purchase; Stock 12 means twelve purchases, not twelve bread.")

1. Select **Bread** or use **Buy items → Add**.
2. Choose bread under **Product → Item** and set the displayed **Name**.
3. Set **Quantity 3**, **Stock 12** and **Maximum stock 12**.
4. Add a product **Description** if needed. It is separate from the delivered item’s own name and effects.

Use **Duplicate** for a variation and **Delete** for an unwanted row. Ordinary bread needs no custom NBT; special-item matching may need it.

## Charge four emeralds for the whole bundle

![Bread Payment tab with price four and emerald payment.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "Price 4 buys the whole Quantity 3 bundle. item:minecraft:emerald identifies the payment item.")

Open **Payment**, set **Price 4** and use **Payment method → Inherit Shop** to follow the shop’s default currency. Read **Preview** before saving. Choose **Override: Item / Override: Currency** for a product-specific payment; use **Required items** for multiple materials. See [currency connections](#core/shop-currency-gui).

## Restock a limited product

![Restock tab with interval and amount controls.](assets/media/guides/drm-031-forge1201/shop-restock.png "Enable restock and set Restock interval, Restock amount and Maximum stock. Replenishment stops at the maximum.")

| Setting | Meaning |
| --- | --- |
| Stock 12 / 0 / −1 | Twelve purchases / sold out / unlimited |
| Maximum stock 12 | Refill cap |
| Restock amount 2 | Restore two purchases each interval |
| Restock interval 24000 ticks | One normal Minecraft day at 20 ticks per second |

Use positive amount, interval and maximum for finite restocking. The shop’s **Timer basis** determines how skipped sleep time is counted; see [shop setup](#core/shop-system). Two NPCs using one shop file keep separate remaining stock.

## Buy items from the player

Use **Sell items → Add**, choose the item and **Quantity**, then its payment. For example, a wheat quantity of three requires one complete three-wheat bundle per sale. Buyback entries do not use sale-product stock. Test the exact item when adding NBT requirements.

## Save and check a purchase

**Save As** `village_shop`, then open the NPC with the DRM Core and use **NPC Shop JSON → file → Apply Shop**. Open the NPC empty-handed, check the product and press **Buy Selected**. The checked example delivers three bread, removes four emeralds and reduces stock by one.

Edit row placement and button appearance in [GUI Maker](#core/gui-system); products, quantities and prices stay in NPC Shop.

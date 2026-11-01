---
title: Create an NPC Shop
slug: shop-system
order: 80
description: Choose products, prices and payment, then give an NPC a shop.
product: core
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

### Check the real transaction

Use the DRM Core on the NPC and choose **NPC Shop JSON → saved shop → Apply Shop**. Bring ten emeralds, empty both hands and interact with the NPC. Check Bread and press **Buy Selected**.

![Only Bread checked in the actual NPC shop.](assets/media/guides/drm-031-forge1201/shop-bread-selected.png "DRM 0.3.1 / Forge 1.20.1. The 3 on the icon is the bread bundle size; the middle 1 is the number of bundles to buy. The summary shows three bread for four emeralds.")

![After purchase, Emerald is 6 and Bread stock is 11/12.](assets/media/guides/drm-031-forge1201/shop-bread-purchased.png "The server inventory received three bread and emeralds fell from ten to six. Bread stock fell from twelve to eleven and its restock timer started. The lower summary follows the currently selected lantern; it is not a receipt for the previous trade.")

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
| --- | ---

## Make a shop that sells bread

This example sells **three bread for four emeralds**. The captures show **DRM 0.3.1 on Forge 1.20.1, in English**.

### 1. Choose the product and quantity

Open **NPC Shop → Use Default** from the editor selector. Select **Bread** in **Buy items** on the left, then open **Product** on the right. Use **Add** for a new product.

![Bread selected in the Buy items list, with minecraft:bread and Quantity 3 in the Product tab.](assets/media/guides/drm-031-forge1201/shop-bread-product.png "Product sets what the customer receives. Quantity 3 means three bread per purchase.")

Use the magnifying glass beside **Item** to select the item. Set **Quantity** to the bundle size. **Stock** is the remaining number of purchases: the example has 12; use **-1** for unlimited sales. **Display name** and **Description** control the product's name and description.

### 2. Set the price and payment

With the same product selected, open **Payment**. **Price** is the price per purchase. With **Quantity 3 + Price 4**, each purchase exchanges four emeralds for three bread.

![Bread's Payment tab showing Inherit Shop, Price 4 and emerald item payment.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "Inherit Shop uses the shop's default payment. item:minecraft:emerald below confirms the payment item.")

Set that default in **Shop settings**: choose **Shop currency → Item** and emeralds as **Payment item**, for example. To use DRM money, create it in [Currency Editor](#core/currency-editor) first.

![Shop settings with layout path and default payment controls.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. These settings apply to the shop. Override them in Payment for a product with a different payment method.")

### 3. Preview and save

Click **Preview** at the top to inspect the player's shop layout. Check quantities, prices and descriptions. Return with **Close**, then use **Save As** to save your own shop.

![The player-facing shop opened with the editor's Preview button, showing products, prices, a description and purchase summary.](assets/media/guides/drm-031-forge1201/shop-player-preview.png "This is the editor's Preview. Test an actual purchase after applying the saved shop to an NPC and bringing the payment item.")

Right-click the NPC with the Core and apply the saved shop. Empty both hands and talk to it, bring the payment item and try one purchase. To open it from a conversation, follow **Open a shop from dialogue** below.

## Selling and buying back

| Goal | Setup |
| --- | --- |
| NPC sells to the player | Add products to the buy list |
| NPC buys items from the player | Add them to the sell/buyback list |
| Both | Use buy-and-sell mode |

The NPC only buys back listed items. You can list the same item several times with different quantities or prices.

## Stock and restocking

Stock **0** means sold out; **-1** means unlimited. For limited sales, use a positive stock. Configure **Restock** to refill it automatically.

![The lantern example's Restock tab, with Enable restock, Timer basis, Restock interval and Restock quantity.](assets/media/guides/drm-031-forge1201/shop-restock.png "Set Stock and Maximum stock in Product first. Restock controls whether, when and how many purchases to refill. This capture uses the lantern example.")

**Maximum stock is in Product**; **Restock quantity and interval are in Restock**. A maximum of eight with a refill amount of two adds two purchases' worth each time, up to eight.

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

Use [GUI Maker](#core/gui-system) for the window's layout and pictures. Products and prices are still edited in NPC Shop.

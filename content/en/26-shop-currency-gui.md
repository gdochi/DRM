---
title: Connect Shop Currency and Layouts
slug: shop-currency-gui
order: 82
description: Choose payment items or DRM balances and connect a custom shop window.
product: core
category: NPC Shop
section: npc-shop
status: Guide
version: 0.3.1
audience: Shop creators
---

## Take emerald items or a town-coin balance

Open **NPC Shop → Shop settings → Shop currency**. An inventory item and a saved DRM balance are different payment methods.

| Payment | Choose | Prepare first |
| --- | --- | --- |
| Emerald items | Same required item → Payment item: minecraft:emerald | No currency definition needed |
| Town Coin balance | Currency → saved town_coin | Save it in [Currency Editor](#core/currency-editor) |

![Shop currency and Payment item in Shop settings.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. This example takes emerald items through Same required item. A product can override it in Payment.")

## Use different payment for one product

Select the product and open **Payment**. **Inherit Shop** uses the common setting; an item or currency override changes that product alone. Changing the number in Price does not select a different payment method.

![Bread payment settings.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "Check both the payment method and Price. Product Quantity is the bundle delivered; Price is the cost of that bundle.")

## Connect your own shop layout

1. Open an **npc_shop** layout in **GUI Maker**.
2. Arrange product rows, prices and action controls; **Save As** your own layout.
3. In **NPC Shop → Shop settings → Shop interface**, choose the custom-interface mode.
4. Use the browse button beside **Interface JSON** to select the saved layout.
5. Save the shop, apply it to the NPC and reopen the actual shop.

Separate buy/sell layouts must both use **npc_shop**. A dialogue layout does not provide the expected product and transaction areas.

![Actual NPC shop with Bread checked and the payment total below.](assets/media/guides/drm-031-forge1201/shop-bread-selected.png "DRM 0.3.1 / Forge 1.20.1. The exercise costs four emeralds for three bread. Check selected products and the total before Buy Selected.")

| Change | Editor |
| --- | --- |
| Products, quantities, prices, stock | NPC Shop → Product / Restock |
| Payment item or balance | Shop settings or product Payment |
| Product rows and button placement | GUI Maker → npc_shop |
| Currency name, icon and conversion | Currency Editor |
| A balance always visible during play | HUD Maker |

A balance component displays money; drawing an icon does not grant it. Continue to [currency and HUD](#core/currency-hud-shop) or the [complete purchase exercise](#core/shop-system).

---
title: Use One Currency in Shops and HUDs
slug: currency-hud-shop
order: 92
description: Connect the same saved currency to shop payments and the player’s balance display.
product: core
category: Currency Editor
section: currency-editor
status: Guide
version: 0.3.1
audience: Creators and operators
---

## Select the same saved currency

Save `town_coin` in [Currency Editor](#core/currency-editor). Its file defines the money type; a shop accepts that money and a HUD displays the player’s balance. Select the same ID in all three places.

## Accept its balance in a shop

1. Open **NPC Shop → Shop settings**.
2. Choose **Shop currency → Currency** and the saved currency.
3. Use **Payment → Payment method → Inherit Shop** for products following it.
4. Set **Price**, save and apply the shop to the NPC.
5. Try a purchase with a player holding a balance in that currency.

![Shop settings for common payment.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. This photo uses item payment; switch Shop currency to Currency for a DRM balance. Product overrides take precedence over the common setting.")

| Payment | What the player needs |
| --- | --- |
| Item | Real inventory items, such as four emeralds |
| Currency | A stored balance, such as town_coin 4 |

An emerald **Item Icon** does not make the shop accept emerald items. Choose payment separately. See [products](#core/shop-editor-items) for overrides.

## Display the balance on a HUD

1. Open **HUD Maker → + Currency**.
2. Search `town_coin` in **Apply Currency HUD**.
3. Check the ID below the name and press this picker’s **Apply**.
4. Select the added **Currency** element and set position, size and amount format.
5. **Save As** the HUD set and use the toolbar **Apply** to activate it.

![Town Coin / town_coin selected in Apply Currency HUD.](assets/media/guides/drm-031-forge1201/hud-currency-picker.png "DRM 0.3.1 / Forge 1.20.1. Apply inside this picker adds the component. Apply in the toolbar behind it activates the set.")

Configure amount formatting and visibility in HUD Maker rather than adding obsolete HUD fields to the currency file. The checked Forge 0.3.1 artifact can reject activation’s second save because of a request limit; see [HUD Maker’s activation note](#core/hud-maker).

## Prepare money for a transaction check

With administrative permission, use the actual saved ID:

```mcfunction
/drm currency give @s town_coin 20
/drm currency get @s town_coin
```

For a price-four purchase, compare the balance and product count before and after. If trading works but the display is missing, check the active HUD, currency ID and visibility rules. Use [pickup conversion](#core/currency-fields) to turn collected items into a balance.

---
title: Currency Names, Values and Conversion
slug: currency-fields
order: 91
description: Set currency names, amount formatting, pickup values and physical currency.
product: core
category: Currency Editor
section: currency-editor
status: Guide
version: 0.3.1
audience: Creators and operators
---

## Name and display the currency

Use **Currency Editor → General settings** for the currency’s rules. Set product prices separately in [NPC Shop → Payment](#core/shop-system).

![Currency name, display format, death rules and item conversion settings.](assets/media/guides/drm-031-forge1201/currency-editor.png "DRM 0.3.1 / Forge 1.20.1. This defines a money type; it does not directly set a product price or a player’s current balance.")

| Setting | Choose |
| --- | --- |
| Enabled | Whether the currency is used |
| Name | Player-visible name |
| Display format | Amount formatting; `%s G` displays 1200 as `1200 G` |
| Death settings | Whether and how much money is lost |
| Use as shared currency | Whether to use it as the shared currency |
| Item Icon | The currency’s representative image |

The saved ID is separate from Name. **Save As** `town_coin`, then select that same currency in shops, rewards and HUDs. Renaming the displayed name is different from creating another ID.

## Convert picked-up items to money

Enable **Convert items on pickup**, then open **Item Prices**. Selecting an icon does not add a conversion rule.

![Pickup Conversion Items opened from Item Prices.](assets/media/guides/drm-031-forge1201/currency-item-prices.png "Start with Add Item, then assign Value / Item to the checked conversion rows and use Apply Selected.")

1. In **Add Item**, search and check the item; use **Add Selected**.
2. Check that item’s conversion row.
3. Set **Value / Item → 10**, then **Apply Selected**. One matching item is worth ten balance units.
4. Close the window and **Save / Save As** the currency.
5. Pick up the actual item and compare its inventory quantity with the balance change.

![town_coin saved with only Emerald assigned a value of ten.](assets/media/guides/drm-031-forge1201/currency-emerald-prices.png "DRM 0.3.1 / Forge 1.20.1. Emerald is worth 10 and the saved path is town_coin.json. This verifies saved rules; actual pickup conversion is a separate check.")

Searching `emerald` also finds ore and blocks. Check **Emerald / minecraft:emerald** alone and use **Add Selected (1)** for this exercise. **Select Visible** selects every visible search result.

## Physical currency

**Physical currency** defines money that can be handed over as an item. Set its name, unique ID and per-item value, then save. The icon, pickup-conversion list and physical currency have different uses. Continue to [currency setup](#core/currency-editor) to connect a shop.

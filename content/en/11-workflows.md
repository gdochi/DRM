---
title: Recommended Workflows
slug: workflows
order: 120
description: Practical flows for dialogue NPCs, shop NPCs, and currency/HUD setup.
product: core
category: Reference / Operations
section: operations
status: Stable
version: 0.3.1
audience: Creators
tags:
  - workflow
  - examples
---

## Finish one dialogue NPC

1. Open the example in [Dialogue Editor](#core/dialogue-system) and write the greeting in **Text**.
2. In **Choices**, create a reply choice and a closing choice.
3. Check that **start → Routes** points to the greeting.
4. **Save As** `village_guide`.
5. Open the NPC with the core and choose **Dialogue JSON → village_guide → Apply Dialogue**.
6. Interact with both hands empty and test every choice.

![village_guide applied as the NPC Dialogue.](assets/media/guides/drm-031-forge1201/npc-apply-result.png "DRM 0.3.1 / Forge 1.20.1. Select the file, press Apply Dialogue, then check its name on the right.")

Complete the conversation with the default layout first. To change its appearance, copy a layout in [GUI Maker](#core/gui-system) and connect it in the dialogue’s **GUI** settings.

## Connect a shop

In [NPC Shop](#core/shop-system), set **Product → Payment → Restock** for goods, price and stock. Check **Preview**, Save As the file and apply it under **NPC Shop JSON**. Prepare payment, buy once, then check inventory and stock.

![Bread price 4 with Inherit Shop payment.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "DRM 0.3.1 / Forge 1.20.1. Quantity 3 is the bread received per purchase; Price 4 is the emeralds paid per purchase.")

To enter through dialogue, add **go_shop** in **Choice actions** and choose the saved shop. Use **bound** for the shop applied to the current NPC.

## Add currency and a balance display

1. Create a currency in [Currency Editor](#core/currency-editor) and Save As.
2. Select it for shop payment, matching physical items or DRM balance to the intended method.
3. Add Currency in [HUD Maker](#core/hud-maker) and select the same currency.
4. Test granting money, purchasing and the balance display together. Adding a HUD does not grant money.

When moving files, check the connected GUI, shop and currency in [saved folders](#core/paths).

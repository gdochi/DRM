---
title: Choose the Right GUI Parts
slug: gui-maker-components
order: 102
description: Choose components that display actual dialogue, products, balances and messages.
product: core
category: GUI Maker
section: gui-maker
status: Guide
version: 0.3.1
audience: GUI creators
---

## Keep the functional parts in the layout

For a conversation, position the **dialogue** and **choice** areas before adding decorative text or images. The dialogue editor supplies the actual line and replies; GUI Maker supplies their position and appearance.

![Dialogue canvas with NPC preview, dialogue and choices.](assets/media/guides/drm-031-forge1201/gui-maker.png "DRM 0.3.1 / Forge 1.20.1. Keep actual dialogue/choice areas separate from decorative Text. Write the conversation in Dialogue Editor.")

## Dialogue parts

| Component | Displays |
| --- | --- |
| dialog | Current node’s NPC line |
| choice | Replies passing their visibility conditions |
| entity | NPC or entity preview |
| item | Presentation item icon |
| image / panel | Pictures, background and framing |

Removing `dialog` or `choice` removes the place used for those parts of the conversation.

## Shop parts

| Component | Displays or performs |
| --- | --- |
| item_slot | Product rows |
| player_inventory | Player inventory in sell mode |
| shop_transaction_viewer | Planned transaction summary |
| shop_action_button | Purchase or sale |
| shop_item_description | Selected product description |
| shop_search_bar / shop_page_selector | Search and page navigation |
| currency_display | Player balance or payment holdings |

Buy and sell layouts may share parts, but the active mode determines row and action meaning. Make products in [NPC Shop](#core/shop-system).

## Currency and player-status parts

`currency_list` provides the list area. `currency_icon`, `currency_amount`, `currency_delta` and `currency_name` show an icon, balance, recent change and name. `player_health`, `player_food`, `player_armor`, `player_air` and `player_xp_level` show player state.

A currency amount component does not grant money. Balances change through server actions, transactions and pickup conversion. See [currency and HUD](#core/currency-hud-shop).

## Remnant parts

Use `dialog` for the message body and `panel / image` for framing. Remnant messages do not use a conversation-choice list. Connect the layout through the [Remnant message](#core/remnant-msg).

If a component is blank, check whether the feature supplies its data and whether the component has a visible area. For position and layering, see [canvas editing](#core/gui-maker-screen).

---
title: Arrange and Save a GUI
slug: gui-maker-screen
order: 101
description: Select a screen type, move its parts and save a reusable layout.
product: core
category: GUI Maker
section: gui-maker
status: Guide
version: 0.3.1
audience: GUI creators
---

## Move one part of the window

Open the intended layout in [GUI Maker](#core/gui-system), click a canvas element and edit its properties on the right. Use **X / Y** for position and **W / H** for size. **Layer # / Layer − / Layer +** control which overlapping element is in front.

![Selected Text element and its Inspector.](assets/media/guides/drm-031-forge1201/gui-text.png "DRM 0.3.1 / Forge 1.20.1. Select on the canvas, then edit the corresponding element on the right. Text here can be decoration; actual dialogue lines come from Dialogue Editor.")

![Move and resize a Text component, then inspect the editor preview.](assets/media/guides/extra-videos-20261106/gui-drag-resize.mp4 "DRM 0.3.1 / NeoForge 1.21.1, English UI. Native drag, resize and Preview; the layout is still an editor draft.")

| Area | Use |
| --- | --- |
| Toolbar | New, load, save, Save As and reset |
| Type selector | Choose what the layout will display |
| Tools | Add components supported by that type |
| Canvas / Screen Editor | Select, drag, resize and inspect overlaps |
| Inspector | Position, size, colors, text, images and data roles |

Canvas sample dialogue, products and amounts help with placement. The player’s actual data comes from the connected dialogue, shop or currency. Background transparency and inherited styling are separate settings; override only the elements you want to change.

## Choose the screen type first

| Type | Screen |
| --- | --- |
| dialogue | NPC conversation |
| npc_shop | Purchase and buyback |
| currency_hud | Currency HUD layout |
| remnant_msg | Remnant message |

Other layout profiles such as `player_status`, `custom_hud` and `generic` may be used by connected tools. For a normal dialogue or shop, select its matching type. A choice component needs dialogue data; placing it in another type does not create a conversation.

## Save and connect the layout

**Create New** starts a draft for the current type. **Load** lists matching saved layouts. **Save** writes the existing file; **Save As** gives it another name. **Reset** restores the type’s default layout.

Use **Save As** for a customized default. Regular layouts live under `config/dochi_rpg_maker/gui/`; currency HUDs can use the HUD-set store. Select the saved file in the feature that uses it, then reopen the actual player screen.

For the parts each type can display, see [GUI components](#core/gui-maker-components). For images and importing a PNG, see [assets](#core/assets-models).

---
title: Tooltip Maker
slug: tooltip-maker
order: 105
description: Design item tooltips, control item previews, and add entrance effects.
product: core
category: Tooltip Maker
section: tooltip-maker
status: Stable
version: 0.1.5
audience: Creators
tags:
  - tooltip
  - item
  - editor
---

## What it does

Tooltip Maker designs the information panel players see when hovering over an item. It is a separate editor from GUI Maker, which designs screens such as dialogue and shops. The item name, stats, and other live information come from the hovered item; the layout decides where they appear.

## Start a design

1. Right-click the air with the **Dochi RPG Maker Core**.
2. Open **Visual → Tooltip Maker**.
3. Use **Load** to open an existing tooltip or start a new design. Use **Save As** to customize a copy of a bundled template.
4. Set the canvas width and height, then arrange the item preview, text, sections, images, and dividers.
5. Adjust the selected element in the Inspector and save your design.

Tooltip layouts live in `config/dochi_rpg_maker/gui`. The default template is `default_tooltip_gui.json`. They share this folder with other GUI files, but Tooltip Maker's load list shows tooltip layouts.

## Canvas and saving

The output canvas is the area that will be saved. Moving an element does not automatically enlarge the canvas. Change the canvas dimensions when you need a larger tooltip.

You can temporarily place elements around the canvas while arranging them. **An element must be completely inside the canvas to be included in Save or Save As.** Outside elements remain part of the editing workspace, but are omitted from the saved output.

## Item preview controls

| Control | Use |
| --- | --- |
| Item presentation | Choose a still or spinning item, armor stand, player model, or no item model. |
| Model view | Choose a 3D model or a 2D inventory icon for the item presentation. |
| Item size / Model scale | Adjust how large the item appears within its allotted box. |
| Spin speed | Change rotation speed and direction. |
| Rotation X / Y / Z | Adjust the viewing angle. |
| Sprite slot frame | Show or hide the slot background. Its size follows the item box. |
| Item entrance | Choose how the item appears. Use the play button beside it to replay the entrance. |

Armor stand and player presentations are for equipment that can be worn in a supported equipment slot. Ordinary blocks, materials, and other non-wearable items display as the item itself. Blocks that can actually be worn on the head still follow their equipment behavior.

3D previews are fitted around the model's own center before rotation. DRM improves the fit of modded weapons, including models with extra empty texture space. TaCZ previews keep the gun's item details and installed attachments. Select 2D explicitly if you want an inventory icon.

The editor's sample item is a layout aid. The live tooltip uses the actual hovered item, including its saved item data.

## Text, images, and entrance effects

Use text, paired values, stat sections, and dividers to organize the information. Images and cropped texture regions can decorate the layout. Text size and section spacing can be adjusted independently of item size.

Entrance settings control how the tooltip's surface, frame, text, and item appear. The play button restarts the preview once each time you press it; it does not switch the tooltip into endless playback.

## Long tooltips and other screens

When a live tooltip is too tall for the screen, use its mouse wheel or scrollbar to read the rest. The frame stays in place while the contents scroll. Very wide tooltips are scaled to fit the screen.

Creative inventory items can use the custom item tooltip. Creative tab names and ordinary button hints do not receive that item layout.

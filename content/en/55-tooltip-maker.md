---
title: Tooltip Maker
slug: tooltip-maker
order: 105
description: Design item tooltips, control item previews, and add entrance effects.
product: core
category: Tooltip Maker
section: gui-maker
status: Stable
version: 0.3.1
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
| --- | ---

## What Tooltip Maker does

Tooltip Maker designs the panel shown when a player hovers over an item. Arrange where its name, information and item preview appear.

Open the editor selector with the **Dochi RPG Maker Core**, choose **Tooltip Maker**, then load a tooltip layout or create one. Bundled defaults are protected templates, so use `Save As` before customizing them.

Tooltip layouts are stored in `config/dochi_rpg_maker/gui/`. The bundled starting layout is `default_tooltip_gui.json`.

![Tooltip Maker's default layout, with item icon, name and information areas in the middle and canvas and element dimensions on the right.](assets/media/guides/drm-031-forge1201/tooltip-maker.png "DRM 0.3.1 / Forge 1.20.1. The black panel is the tooltip. The surrounding blue workspace is outside its output canvas.")

1. Select an element in the middle. The sword icon, a **Rendered Item**, is selected here.
2. Change its **X / Y** position and **W / H** dimensions on the right. Set the whole tooltip's size with **Tooltip W / H → Apply** above.
3. Add displays with **+ Tooltip Text**, **+ Divider**, **+ Rendered Item** or the other tools on the left.
4. Check **Preview**, then **Save As** your layout. Use **Use Globally** when selecting it as the layout for all items.

Configure an item's actual stats and description in Item Editor. Tooltip Maker arranges how that information is presented.

## Main controls

- Set the canvas size and arrange text, values, dividers, images, and the item preview.
- Choose a 2D icon or fitted 3D item model and adjust scale, rotation, and spin.
- Configure surface, frame, text, and item entrance effects, then replay them in the editor.
- Keep elements fully inside the output canvas if they must be included when saving.

The runtime tooltip uses the actual hovered item and its item data. If the result is taller than the screen, players can scroll its content while the outer frame stays in place.

Creative inventory items can use the custom item tooltip. Ordinary button hints and editor hover-help cards use their own rendering and are not replaced by Tooltip Maker.

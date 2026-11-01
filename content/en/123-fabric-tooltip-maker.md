---
title: Tooltip Maker
slug: tooltip-maker
order: 105
description: Arrange the name, description and model shown when hovering over an item.
product: core-fabric
category: GUI Maker
section: gui-maker
status: Stable
version: 0.3.1
audience: Creators
---

## What Tooltip Maker does

Tooltip Maker designs the panel shown when a player hovers over an item. Arrange where its name, information and item preview appear.

Open the editor selector with the **Dochi RPG Maker Core**, choose **Tooltip Maker**, then load a tooltip layout or create one. Bundled defaults are protected templates, so use `Save As` before customizing them.

Tooltip layouts are stored in `config/dochi_rpg_maker/gui/`. The bundled starting layout is `default_tooltip_gui.json`.

![Tooltip Maker's default layout, with item icon, name and information areas in the middle and canvas and element dimensions on the right.](assets/media/guides/drm-031-neo1211/tooltip-maker.png "DRM 0.3.1 / NeoForge 1.21.1. The black panel is the tooltip. The surrounding blue workspace is outside its output canvas.")

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

---
title: Tooltip Maker
slug: tooltip-maker
order: 105
description: Design item hover layouts and previews in Fabric 0.2.0.
product: core-fabric
category: GUI Maker
section: gui-maker
status: Stable
version: 0.2.0
audience: Creators
---

## What Tooltip Maker does

Tooltip Maker designs the panel shown when a player hovers over an item. It is a built-in editor in Fabric 0.2.0 and is separate from GUI Maker, which builds full dialogue, shop, and other runtime screens.

Open the editor selector with the **Dochi RPG Maker Core**, choose **Tooltip Maker**, then load a tooltip layout or create one. Bundled defaults are protected templates, so use `Save As` before customizing them.

Tooltip layouts are stored in `config/dochi_rpg_maker/gui/`. The bundled starting layout is `default_tooltip_gui.json`.

## Main controls

- Set the canvas size and arrange text, values, dividers, images, and the item preview.
- Choose a 2D icon or fitted 3D item model and adjust scale, rotation, and spin.
- Configure surface, frame, text, and item entrance effects, then replay them in the editor.
- Keep elements fully inside the output canvas if they must be included when saving.

The runtime tooltip uses the actual hovered item and its item data. If the result is taller than the screen, players can scroll its content while the outer frame stays in place.

Creative inventory items can use the custom item tooltip. Ordinary button hints and editor hover-help cards use their own rendering and are not replaced by Tooltip Maker.

---
title: Customize Dialogue and Shop Screens
slug: gui-system
order: 60
description: Copy a default layout and arrange text, pictures and buttons in GUI Maker.
product: core-fabric
category: Core Systems
section: gui-maker
status: Stable
version: 0.3.1
audience: GUI creators
tags:
  - gui
  - layout
---

## Make a default screen your own

1. Right-click air with the Core and open **GUI Maker**.
2. Choose the screen type and load a default: **dialogue** for conversations or **npc_shop** for shops.
3. Select elements on the canvas and change position, size and colors.
4. Use **Save As** to save your layout.
5. Select that file in the dialogue or shop's GUI settings.
6. Interact with the NPC to see the player-facing screen.

Preview text and products help you arrange the layout. Write actual dialogue in Dialogue Editor and set products/prices in NPC Shop.

![GUI Maker with Tools on the left, Canvas in the middle and the selected element's position and size in Inspector on the right.](assets/media/guides/drm-031-neo1211/gui-maker.png "DRM 0.3.1 on NeoForge 1.21.1. Add elements on the left, select them on the canvas, then edit them in Inspector.")

The default conversation layout already contains dialogue and choice areas. Keep those while starting, and select the element you want to change. **X / Y** sets position, **W / H** sets width and height, and **Layer #** sets drawing order. Use **Preview** at the top to inspect the result.

## Choose an element

| What you want | Element |
| --- | --- |
| NPC dialogue | **Dialog** |
| Player choices | **Choice** |
| Your own text or the NPC's name | **Text** |
| A background or section | **Panel** |
| A logo or picture | **Image** |
| The NPC's appearance | **Entity** |
| Shop products | **Item Slot** |
| Buy/sell buttons | **Shop Action Button** |
| Money display | **Currency Display** |

Use functional elements, such as shop products and transaction buttons, with their matching screen type.

## Add names and labels

Add **Text** to a dialogue layout and choose **Content**.

![A text box added with + Text, with Content, Direct input, Text and Translation Key settings in Inspector.](assets/media/guides/drm-031-neo1211/gui-text.png "Use + Text for a separate label. Content chooses between a fixed label and the current NPC's name.")

- **Direct input:** enter a fixed label, such as “Blacksmith.”
- **NPC name:** display the current conversation partner's name.

For your own wording, enter it in **Text** and change **Translation Key** to **Literal Text** if necessary. Use Translation Key for a name registered in a language file.

Add several text boxes for separate labels. Each has its own position, size, fill and border.

## Repeat or resize a picture

Select an Image and choose **Fit**. **Stretch** fills its area, **Contain** keeps the picture's proportions, and **Tile** repeats it.

For Tile, **Tile W % / H %** controls each repeated picture's size: default 100%, range 10–800%, separately for width and height. The element's width/height controls the full area it covers.

**Default UI Settings → Sprite Scale %** changes panel/button pattern size: default 100%, range 50–400%. It does not resize the editor's tools.

## The saved layout is not showing

Check that your dialogue or shop selects the saved GUI. Saving a layout alone does not replace an existing screen.

Layouts are stored in `config/dochi_rpg_maker/gui/`. Use the [JSON reference](#core-fabric/json-reference) when editing files directly.

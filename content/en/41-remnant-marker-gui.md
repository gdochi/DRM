---
title: Place a message marker
slug: remnant-marker-gui
order: 117
description: Place a marker, write its message, read it and change the display GUI.
product: core
category: Remnant Msg
section: remnant-msg
status: Stable
version: 0.3.1
audience: Creators / operators
tags:
  - remnant
  - gui
  - marker
---

## Leave a short note at a place

For a note used at one location, you do not need to create a file first. Hold **Remnant Msg Setter** and right-click a block face to place a marker and open its settings. With editing permission, write in Message and press **Save**.

![Message text entered after placing a marker with the setter.](assets/media/guides/drm-031-neo1211/remnant-message-ready.png "DRM 0.3.1 / NeoForge 1.21.1, English UI. The text is ‘Follow the lanterns to reach the village.’ Message JSON selects an existing document; Marker model controls the world marker; Save stores its message.")

1. Get the setter with `/give @s dochi_rpg_maker:remnant_msg_setter`.
2. Right-click the block face where the marker should attach.
3. Enter the text in **Message**.
4. Keep **Marker model: Default icon** and Scale 1 for the first attempt, then Save.
5. Put away the setter and right-click the marker to read it. An authorized creator holding the setter opens editing instead.

![The saved marker opened through empty-hand use.](assets/media/guides/drm-031-neo1211/remnant-placed-setter.png "Actual saved-message result in the same DRM 0.3.1 / NeoForge 1.21.1 artifact. This default GUI displays text and Close. Follow the GUI steps below to change its background or text position.")

Save in this workflow creates the server message file and links it to the world marker. Saving a document and placing a marker are separate operations.

## Change the world marker

Open **Marker model** and choose Default icon, Item, Block or Hidden. For Item or Block, search for an entry, select it and Apply. Back in the setter, press Save to update the marker.

![The actual marker-model picker.](assets/media/guides/drm-031-neo1211/remnant-marker-picker.png "DRM 0.3.1 / NeoForge 1.21.1. The four tabs control the world marker’s appearance, not the reading screen’s background. This capture keeps Default icon.")

**Scale** controls marker size, **Billboard** how it faces the camera, and X/Y/Z its model offsets. Change reading-screen text size and position in GUI Maker.

## Find a placed marker again

With the setter, **right-click air** or **sneak-right-click a block** to open the world list. Use the message arrows to select a marker, check its location and text, then Edit. Before Delete, check that the intended marker is selected.

![One saved message in the world list.](assets/media/guides/drm-031-neo1211/remnant-populated-world-list.png "Actual DRM 0.3.1 / NeoForge 1.21.1 save result. The list shows dimension, coordinates, linked marker_…json and text. Previous/Next page changes pages; the central < / > changes the selected message.")

## Reuse a message and connect a GUI

For the same text at several places, save a document in [Remnant Msg Editor](#core/remnant-msg), then choose it with **Message JSON** in each setter. **Policy** selects rules such as who may place or edit markers. General users can access only what the server policy allows.

To customize the reading screen:

1. Create a **remnant_msg** GUI in [GUI Maker](#core/gui-system).
2. Place a `dialog` element for the actual message; add `panel` or `image` elements for a background if wanted.
3. Save As a new GUI name.
4. Select that GUI in the Remnant message document and save.
5. Read a marker linked to that document again.

The `dialogue` and remnant_msg GUI types serve different screens. For NPC choices and branching, use [Dialogue Editor](#core/dialogue-system).

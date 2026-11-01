---
title: Add Your Pictures and NPC Models
slug: assets-models
order: 130
description: Import a PNG for your screens and choose NPC models and animations.
product: core
category: World And NPC Tools
section: world-tools
status: Stable
version: 0.3.1
audience: GUI and NPC creators
tags:
  - assets
  - geckolib
  - animation
---

## Choose a PNG for a screen

In GUI Maker follow **+ Image → Asset: in the right inspector → choose a picture → Apply**. Scroll inside the inspector if the property is below view. Search by filename or narrow the picker by mod and parent folder.

![The actual GUI Maker Image Asset Picker.](assets/media/guides/drm-031-neo1211/gui-custom-png-search.png "DRM 0.3.1 / NeoForge 1.21.1, English UI. Searching guide_icon finds the PNG placed in the server folder. This example copies DNPC’s existing icon unchanged. Select the row and press Apply at the top.")

**Apply assigns the picture to the selected Image element.** Saving the whole GUI is a separate step. After closing the picker, adjust position, width, height and Fit; use Save As for a new file. To display it in a dialogue or shop, select that saved GUI in the corresponding feature.

![The selected PNG applied and saved as guide_image.](assets/media/guides/drm-031-neo1211/gui-custom-png-applied.png "Actual Apply and Save As in the same 0.3.1 run. Check the selected canvas image and guide_image.json at the top. This verifies GUI editing and saving, separate from playing a dialogue using it.")

## If your PNG is missing

1. Put it under the server's `config/dochi_rpg_maker/assets/textures/`. Subfolders are allowed.
2. Press **Refresh** in the picker and search its filename.
3. Reset mod or folder filters to **All** if needed.
4. Check the row preview and press Apply.

Server-owned pictures are sent to joining players. Each PNG must be **8 MiB or less**, **4096 pixels or less per side**, and **16,777,216 pixels or less total**. When transferring a GUI, include both its JSON and the images it references.

## Where to change an NPC model

For DNPC, **right-click the NPC with Dochi Npc Core → Appearance & Model** to choose its model, skin and scale. A GUI Image element places a picture on a screen; it does not change the NPC's body.

![DNPC Appearance & Model.](assets/media/guides/dnpc-012-neo1211/dnpc-appearance.png "DNPC 0.1.2 / NeoForge 1.21.1, English UI. Compare Humanoid, Skin and Scale with the center preview. This is DNPC's appearance screen, separate from DRM's CustomNPCs NPC Basic screen.")

Existing 1.20.1 and 1.21.1 projects using CustomNPCs configure DRM models in **NPC Basic**. CustomNPCs is excluded from Minecraft 26.3 onward. Follow [DNPC appearance and equipment](#dochi-npc-core/npc-core-editor) for the path matching your actor.

A Gecko model needs matching model, texture and animation assets plus the correct GeckoLib. A PNG alone does not create walking or attack motions. **loop** repeats, **once** plays once, and **hold-last** holds the final pose. Choose a motion actually supplied by the model.

## Animated PNGs

For a vertical frame image, include resource-pack-style `.png.mcmeta`: for example, `priest.png` and `priest.png.mcmeta`. Metadata sets frame size, order and timing. Continue with [GUI Maker](#core/gui-system) for layout and [dialogue creation](#core/dialogue-system) for connecting it.

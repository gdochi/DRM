---
title: Add Your Pictures and NPC Models
slug: assets-models
order: 130
description: Import a PNG for your screens and choose NPC models and animations.
product: core-fabric
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

## Put your picture on a screen

1. Put the PNG under the server's `config/dochi_rpg_maker/assets/textures/`.
2. Open the image picker for an **Image** element in GUI Maker.
3. Search its name and check the preview.
4. Press **Apply**, then save the GUI.

Server images are sent to joining players. Each PNG can be up to 8 MiB, 4096 pixels on either side and 16 million pixels total.

## Change an NPC's model

In **NPC Basic**, choose a model and texture. Rotate/zoom the preview and adjust size and hit bounds.

For Gecko models, install **GeckoLib** for your Minecraft version and connect the model, animation and texture files. Choose animations for walking, attacking, hurt, death and other activities.

Use **loop** to repeat, **once** for a single play, or **hold-last** to keep the final pose.

## Animated PNGs

Place a resource-pack-style `.png.mcmeta` beside the picture: for example, `priest.png` and `priest.png.mcmeta`. That file sets frame size, order and speed.

Continue with [GUI Maker](#core-fabric/gui-system) to arrange it on screen.

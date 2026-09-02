---
title: Assets, NPC Models, And Animation
slug: assets-models
order: 130
description: Server PNG assets, animated textures, NPC models, and animation setup.
product: core-fabric
category: World And NPC Tools
section: world-tools
status: Stable
version: 0.1.8
audience: GUI and NPC creators
tags:
  - assets
  - geckolib
  - animation
---

## Server Texture Folder

Place custom PNG files under `config/dochi_rpg_maker/assets/textures/`. Search by path in the asset picker, filter by mod namespace or top folder, check the preview, then press `Apply`.

Each file is limited to 8 MiB, 4096 pixels per side, and 16 million pixels. Paths outside the server asset folder are not read.

## Animated PNG Files

To animate `priest.png`, place `priest.png.mcmeta` beside it. The standard resource-pack `animation` format can set frame size, timing, frame order, and interpolation.

## NPC Basic

NPC Basic can select texture and model providers, rotate or zoom the NPC preview, and adjust presentation size and hitbox settings for the chosen model.

With GeckoLib installed, you can connect model, animation, and texture files and assign idle, walk, sprint, attack, hurt, and death behavior. The Gecko Animation dialogue action can also play a chosen animation during a conversation.

:::warning GeckoLib is optional
It is not required for normal NPC editing, but every client using GeckoLib NPC models or animations needs GeckoLib 4.8.4 or newer.
:::

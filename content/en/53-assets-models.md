---
title: Assets, Models, And Animation Metadata
slug: assets-models
order: 130
description: Server PNG assets, picker filters, mcmeta animation, and NPC model/animation providers.
product: core
category: World And NPC Tools
section: world-tools
status: Stable
version: 0.1.6
audience: GUI and NPC creators
tags:
  - assets
  - geckolib
  - animation
---

## Server Asset Root

Place creator PNG files under `config/dochi_rpg_maker/assets/textures/`. The server catalogs safe relative paths and transfers the selected runtime data to clients. A PNG is limited to 8 MiB, 4096 pixels per side, and 16 million pixels.

## Asset Picker Policy

- Search matches the resource path.
- Mod/namespace and first parent-folder filters are multi-select checkboxes.
- Paging is server bounded; changing pages does not apply a texture.
- Select a row, verify its preview, then press `Apply`.
- The picker renders the target texture over its list preview surface instead of a generic item-slot placeholder.

## Animated PNG Metadata

For `priestall.png`, place metadata beside it as `priestall.png.mcmeta`. 0.1.4 reads the standard `animation` object, including frame width/height, `frametime`, explicit `frames`, per-frame time, and `interpolate`.

Metadata is accepted only when valid and bounded: up to 16 KiB and 4096 animation frames. A malformed or out-of-root companion file is ignored safely.

## NPC Models And Animations

NPC Basic supports presentation providers for GeckoLib, modded entities, Player Animator, and Better Combat where available. Animation behavior bindings include idle, walk, sprint, attack, hurt, and death, with loop/once/hold-last playback controls.

Use bundled Gecko examples only as templates. Keep custom model, animation, texture, and metadata paths together and test the final NPC on every required client mod combination.


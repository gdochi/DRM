---
title: Add and Position HUD Elements
slug: hud-maker-elements
order: 111
description: Add health, balances and other information, then adjust size and layering.
product: core
category: HUD Maker
section: hud-maker
status: Guide
version: 0.3.1
audience: HUD creators
---

## Add the information you want to see

Open [HUD Maker](#core/hud-maker). Use **+ Health**, **+ Food** or **+ Currency** under **HUD TYPE**. Then select that entry under **ADDED HUD TYPES** to edit it on the right.

![Health selected on the HUD canvas and in the Inspector.](assets/media/guides/drm-031-forge1201/forge-hud-health.png "DRM 0.3.1 / Forge 1.20.1. The selected Added entry has a leading *. This example was positioned at X 400 / Y 250 and saved as guide_hud.")

| Add | Displays |
| --- | --- |
| + Currency | A saved currency’s balance |
| + Health / Food / Armor / Air / Level | Player survival and experience values |
| + Player Head | Player face |
| Optional mana/stamina integrations | Values from the installed provider |

A disabled button can indicate missing currency or provider data. **CNPC Tempdata / Storeddata** require CustomNPCs on a supported older target.

## Move, resize and duplicate

Scroll the Inspector to **Box ID / Layer # / X / Y / W / H**. Box ID distinguishes the element; Layer controls front/back order. X/Y set position and W/H set size. You can also select and move elements on the canvas.

Available text, bar and icon settings depend on the element. **Duplicate** copies the selected element; move the copy so it does not cover the original.

If survival information is hidden in Creative, check **Render survival HUD** and inspect Survival too. Removing a DRM element is separate from [hiding vanilla hearts](#core/hud-maker-vanilla).

**Save As** your set. The checked Forge 0.3.1 activation-save limitation is described in [HUD setup](#core/hud-maker); a saved file alone does not prove activation succeeded.

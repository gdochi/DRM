---
title: What's New In 0.1.5
slug: release-0-1-5
order: 9
description: Tooltip Maker, clearer dialogue choices, better item previews, and HUD fixes.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.1.5
audience: Creators / Operators
tags:
  - release
  - migration
---

Minecraft 1.20.1 · Forge

This update adds a dedicated Tooltip Maker and gives creators more control over dialogue choices. It also improves item previews and fixes several HUD display problems.

## Added

- **Tooltip Maker:** Design item tooltips in their own editor, available under **Visual**. Arrange item previews, text, stat sections, images, and dividers.
- **Tooltip effects:** Add entrance effects and replay them with the play button while editing. Choose 2D item icons, rotating 3D items, or wearable equipment previews.
- **Long tooltip scrolling:** Read information that does not fit on screen by scrolling the tooltip.
- **Choice text size:** Change dialogue choice text size in the dialogue editor or its GUI layout.
- **Choice pulse highlight:** Make an individual choice gently flash when it appears. Choose the color, total duration, pulse count, and strength from **0 to 100**. Existing conversations stay unchanged unless you enable the effect.
- **NPC stat screens:** Connect a Stat Builder file to an NPC so interacting with that NPC opens the player's stat allocation screen.

## Improved

- Choice buttons now use the available width before wrapping long text, including text translated through a resource pack.
- Long choices grow taller when needed. Lists with too many choices can be scrolled.
- Default choice buttons have about **5 GUI pixels of space above and below the text**, instead of oversized empty padding.
- Tooltip editing has clearer canvas boundaries, size controls, and space for temporarily placing elements outside the canvas. Only elements fully inside the output canvas are saved.
- Improved tooltip saving, loading, and reopening so the default design no longer flashes before the previously loaded design.

## Fixed

- Fixed ordinary blocks and other non-wearable items being shown in an armor stand's or player's hand when an equipment preview was selected.
- Improved the size and rotation center of modded item previews, including Epic Knights weapons. Reduced clipping and corrected causes of dark flickering while items rotate.
- Fixed TaCZ guns missing from tooltip previews. Gun details and installed attachments are kept when displaying their models.
- Fixed item-slot backgrounds staying small when their tooltip box was enlarged.
- Fixed Creative tab names incorrectly receiving the custom item tooltip layout.
- Fixed currency appearing in the Survival inventory when its inventory display option was turned off.
- Fixed custom HUD bars switching back to vanilla bars when **F3** was opened.
- Fixed the hurt effect playing when removing equipment only lowered the player's maximum health.
- Improved custom NPC model loading to avoid briefly showing mismatched model and texture parts.

## Updating

Update both the server and clients to **0.1.5**. Keep a copy of your `config/dochi_rpg_maker` folder before replacing files. Use **Save As** when customizing bundled templates.

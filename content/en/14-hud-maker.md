---
title: HUD Maker
slug: hud-maker
order: 86
description: How to configure HUD sets, active layouts, and currency display components in HUD Maker.
product: core
category: Core Systems
section: hud-maker
status: Stable
version: 0.3.1
audience: Creators / Operators
tags:
  - hud
  - editor
---

## Place a health bar on the screen

A HUD displays health, hunger or balances during play. Open **HUD Maker** from the DRM Core to position it over the game view. This English screen uses **DRM 0.3.1 / Forge 1.20.1**.

![Health component positioned at X 400, Y 250 and saved as guide_hud.](assets/media/guides/drm-031-forge1201/forge-hud-health.png "Add it with + Health on the left, select Health under Added HUD Types, then scroll the right Inspector for placement and component settings. The green outline marks the edited health display.")

1. Click **+ Health** on the left.
2. Select **Added HUD Types → Health**. A `*` marks the selected item.
3. Scroll the **Inspector** to **X / Y**. The example uses **400 / 250** so it is easy to see near the center; move it to the intended corner for normal play.
4. Use **Box ID** to identify the component, then adjust size, text and bar appearance. Collapse overlapping editor panels with their `-` controls to inspect placement.
5. **Save As** a new set such as `guide_hud`. Check **Loaded JSON: guide_hud**.
6. Choose **Apply**, close the editor and check the HUD in the intended game mode and GUI scale.

Saving keeps the files; Apply selects the set to display. Use **Unapply** to stop using it. Load the same set to continue editing and saving its layout.


## If Apply reports an error

The current Forge 0.3.1 build was observed to report `JSON save failed: too many requests` after **Apply**. The set can be saved without being activated. **Applying HUD Set** alone does not confirm success; check the error output and actual gameplay display. The screenshot above documents layout saving.

## Add other information

| Left button | Information |
| --- | --- |
| **+ Currency** | Balance of a currency created in Currency Editor |
| **+ Health / Food / Armor / Air / Level** | Player health, hunger, armor, air and experience |
| **+ Player Head** | Player face |
| Installed integration entries | Mana, stamina or other values supplied by that mod |

For money, select the **same currency ID** created in [Currency Editor](#core/currency-editor). Adding a balance display does not grant money.

Mod-specific values require their provider. **CNPC Tempdata / Storeddata** applies only to supported environments with CustomNPCs installed. Minecraft 26.3 and later excludes CustomNPCs; do not build HUDs around those entries there.

![Vanilla HUD Guide expanded to show default display switches.](assets/media/guides/drm-031-forge1201/forge-hud-guide.png "DRM 0.3.1 / Forge 1.20.1. Use these Visible switches to hide vanilla hearts or other default displays. Add a new DRM health display with + Health on the left.")

## Check the editor and normal play

Creative-mode display policy may hide survival information such as health and hunger. Check **Render survival HUD** in the editor and the actual game mode, then test in the survival environment intended for players.

If the DRM bar overlaps vanilla hearts, hide the relevant default display in the Inspector’s **Vanilla HUD Guide**. Hiding a vanilla element does not create its replacement.

| Symptom | Check |
| --- | --- |
| Saved HUD is absent | Saved and applied set names, enabled components |
| Visible only while editing | Check the saved/applied set and reconnect. If still absent, check game mode, visibility conditions and F3 debug overlay. |
| Wrong placement | X/Y, anchor, screen size and GUI scale |
| Balance stays unchanged | Currency ID and the player’s actual balance |
| Other mod HUD overlaps | Each mod’s visibility settings and DRM component placement |

## Keep the complete set

Sets are under `config/dochi_rpg_maker/hud/sets/<set name>/`. This `guide_hud` example creates **hud_set.json** and **components/hp/hp.json**. Keep the whole set folder rather than moving only its health component. `hud/active_set.json` records the selected set.

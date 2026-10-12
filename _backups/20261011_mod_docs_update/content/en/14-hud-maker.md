---
title: HUD Maker
slug: hud-maker
order: 86
description: How to configure HUD sets, active layouts, and currency display components in HUD Maker.
product: core
category: Core Systems
section: hud-maker
status: Stable
version: 0.1.5
audience: Creators / Operators
tags:
  - hud
  - editor
---

## Role

HUD Maker creates layouts that appear on the player's screen. DRM Core can handle currency HUDs, player status HUDs, and custom HUD layouts.

HUD data uses a `LayoutDocument` structure similar to normal GUI files, but the storage path and runtime display flow are different.

## Storage

HUD files use these paths.

| Data | Path |
| --- | --- |
| HUD sets | `config/dochi_rpg_maker/hud/sets` |
| Active HUD set | `config/dochi_rpg_maker/hud/active_set.json` |
| HUD definitions | `config/dochi_rpg_maker/hud/definitions` |
| Legacy currency HUD compatibility | `currency_hud_layout` maps to `hud/sets`. |

HUD sets are managed by the server, then sent to the client for rendering.

0.1.4 installs disabled starter definitions for the currency wallet plus health, food, armor, air, and experience. Enable or clone only the definitions you intend to use.

## Basic Workflow

1. Open the editor selector with the `Dochi RPG Maker Core` item.
2. Choose `HUD Maker`.
3. Select the HUD profile.
4. Place the required components.
5. Save the HUD set under a clear name.
6. Make it the active set.
7. Check the actual position and scale in game.

## Common Components

| Component | Purpose |
| --- | --- |
| currency display | Shows a specific currency balance. |
| image | Displays a background panel or icon. |
| text | Displays fixed text or status text. |
| panel | Groups several elements into a background area. |
| player health/food/armor/air/XP | Shows player status values in a HUD layout. |
| Iron's Spells mana | Shows current/max mana when the integration is installed. |
| Combat Roll stamina | Shows current/max roll stamina when the integration is installed. |
| CustomNPCs tempdata | Shows a numeric `tempdata` key with a configured max key or max value. |
| CustomNPCs storeddata | Shows a numeric `storeddata` key with a configured max key or max value. |

Currency HUD components connect directly to Currency Editor IDs. If the HUD component exists but the currency definition does not, the display will not be reliable.

## External Gauges And Native HUD Visibility

The Inspector's `Mod HUD Guide` sits below `Vanilla HUD Guide`. It independently controls whether Iron's Spells mana and Combat Roll's native HUD are hidden. This does not create a DRM component by itself; add the matching DRM HUD component and configure its layout separately.

External bars use the DRM gauge sprite as their base design. Change the component tint/color rather than replacing the fill with an unstyled solid rectangle.

CustomNPCs data components can be added multiple times. Configure `Data Key`, then either a `Max Key` or numeric `Max Value`. The server config entry `hud_maker.customNpcsDataHudMaxInstances` limits each data component type; the default is three and the accepted range is 1–16.

## Layout Guidelines

HUD elements are visible during normal play, so place them more conservatively than dialogue or shop GUI elements.

- Decide the screen corner or anchor first.
- Avoid placing large panels in the center.
- Leave enough margin for different resolutions.
- Prioritize number readability over long currency names.
- Check overlap with vanilla HUD elements.

## Runtime Updates

HUD display depends on the server active set and player data. If you edit JSON manually, check server reload and HUD sync together.

| Symptom | Check |
| --- | --- |
| HUD does not appear | `hud/active_set.json` and the referenced HUD set file. |
| Number does not update | Currency balance storage and server sync. |
| Position is wrong | Anchor, coordinates, and GUI scale. |
| Overlaps another HUD | Vanilla HUD replacement settings and component coordinates. |

## Vanilla HUD Visibility

`Vanilla HUD` exposes independent `Hide Health`, `Hide Armor`, `Hide Food`, `Hide Air`, `Hide XP Bar`, `Hide XP Level`, `Hide Hotbar`, `Hide Crosshair`, and `Hide Boss Bar` switches. These hide vanilla surfaces; a `VANILLA_REPLACEMENT` definition supplies the custom replacement. Chat, debug text, the scoreboard, and the player list are left untouched.

HUD definitions use `GROUP`, `TEXT`, `BAR`, `IMAGE`, and `ICON_LIST` elements. The bundled armor definition demonstrates `ICON_LIST`; bundled definitions start with `enabled: false`.

## F3 and inventory display in 0.1.5

Opening **F3** keeps your custom HUD and its vanilla-bar replacement active. For example, a custom health bar stays visible instead of switching back to vanilla hearts.

A currency HUD with **Inventory** display turned off stays hidden in both Survival and Creative inventories, even when **Always** or change notifications are enabled.

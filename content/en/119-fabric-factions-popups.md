---
title: Factions And Popups
slug: factions-popups
order: 120
description: CustomNPCs faction presentation and reusable on-screen popups.
product: core-fabric
category: World And NPC Tools
section: world-tools
status: Stable
version: 0.1.8
audience: World and NPC creators
tags:
  - faction
  - popup
---

## Faction Editor

Faction presentation is stored in `config/dochi_rpg_maker/factions/settings.json`. CustomNPCs continues to own the faction IDs and player scores; DRM adds:

- Display order and categories
- Names, descriptions, icons, and banners
- Names and colors for relationship states
- Visibility and the detail-screen GUI

Players open Faction Overview with the default `J` key. If a score is wrong, check the CustomNPCs faction and player score before changing DRM presentation.

## Popup Maker

Popups are short on-screen presentations for announcements, area names, quest notices, and similar events.

| Data | Storage |
| --- | --- |
| Popup definitions | `config/dochi_rpg_maker/popups/definitions/` |
| Display policy | `config/dochi_rpg_maker/popups/policies/` |
| Popup GUI | `config/dochi_rpg_maker/gui/` |

Popup Maker controls title, subtitle, body text, image, sound, fades, hold time, priority, and overlap behavior. GUI Maker's `popup` type controls the actual screen layout.

Show popups with `/drm popup` commands or the `drmPopup` CustomNPCs script global. On public servers, keep policy limits for simultaneous popups, queue size, text length, and duration reasonable.

---
title: Fabric 0.1.8 Update
slug: release-notes-0-1-8
order: 10
description: The main additions in Fabric 0.1.8 since the public 0.1.7 release, plus update requirements.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.1.8
audience: Players / Creators / Operators
tags:
  - release
  - changelog
---

0.1.8 is a major update built on the dialogue, shop, Teleporter, and NPC Spawner tools from 0.1.7. It adds quests, factions, popups, administration, and a much larger asset and NPC presentation toolset.

## New At A Glance

| Feature | What It Does | How To Open |
| --- | --- | --- |
| Quest Editor | Creates quest packs with objectives, prerequisites, rewards, repeat rules, and NPC dialogue links | Core item's editor selector |
| Quest Journal | Search, track, accept, and turn in player quests | Default key `U` |
| Faction Editor | Adds names, icons, descriptions, categories, and relationship presentation to CustomNPCs factions | Core item's editor selector |
| Faction Overview | Shows the player's faction scores and relationships | Default key `J` |
| Popup Maker | Creates announcements with text, images, sounds, timing, and priority | Core item's editor selector |
| DRM Admin | Manages player tags, currency, quests, advancements, faction points, and stored data | `F7` for authorized operators |

## Creation And NPC Presentation

- Editor top bars, panels, lists, alignment, and input focus are clearer and more consistent.
- PNG files in `config/dochi_rpg_maker/assets/textures` can be searched, filtered, and previewed.
- A matching `.png.mcmeta` file can animate a PNG texture.
- NPC Basic adds deeper texture, model, animation, preview-camera, and hitbox controls.
- Installing GeckoLib enables custom NPC models, animations, and dialogue animation actions.

## Existing Feature Improvements

- A currency can have a physical item form and a value per item.
- HUDs can display CustomNPCs storeddata and tempdata values.
- Teleporter commands can run at chosen moments around the fade and teleport.
- Dialogue, shops, NPC Apply, NPC Spawner, and Remnant Msg received search, scrolling, input, and preview fixes.
- Large asset lists and editor screens avoid unnecessary repeated loading.

## Before Updating

:::warning CustomNPCs is now required
0.1.8 requires CustomNPCs `1.0.0`. Install DRM 0.1.8, Fabric API, and CustomNPCs on the server and every connecting client.
:::

GeckoLib, FTB Quests, Mod Menu, and CobbleDollars remain optional integrations. Back up the world and `config/dochi_rpg_maker` before updating.

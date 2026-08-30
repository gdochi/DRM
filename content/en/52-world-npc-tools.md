---
title: Factions, Teleporters, And Popups
slug: world-npc-tools
order: 120
description: Configure faction presentation, destination flows, and reusable runtime popups.
product: core
category: World And NPC Tools
section: world-tools
status: Stable
version: 0.1.4
audience: World and NPC creators
tags:
  - faction
  - teleporter
  - popup
---

## Faction Editor

Faction presentation is stored in `config/dochi_rpg_maker/factions/settings.json`. It reads CustomNPCs faction IDs and player points, then adds DRM ordering, categories, icons, banners, descriptions, visibility, state styles, and an active faction GUI. The default runtime key is `J`.

This editor changes DRM presentation and state mapping; CustomNPCs remains the source of faction definitions and player faction points.

## Teleporter Editor

Teleporter Sets are stored under `config/dochi_rpg_maker/teleporters/`. A set contains categories and destinations, with per-destination position/dimension, icon media, availability conditions, locked presentation, sounds, fades, and commands.

Command timing supports `BEFORE_FADE_OUT`, `DURING_FADE_OUT`, `BEFORE_TELEPORT`, `AFTER_TELEPORT`, `DURING_FADE_IN`, and `AFTER_FADE_IN`. Apply a saved set to an NPC, or open it through the dialogue action `Go Teleporter`.

## Popup Maker

Popup definitions are stored in `config/dochi_rpg_maker/popups/definitions/`; policies are stored in `popups/policies/`. Definitions control GUI, channel, priority, conflict behavior, title/subtitle/body styling, fade/hold timing, and sound. Policies bound permissions, text/timing overrides, active/queued counts, text length, and duration.

Popups can be opened through DRM commands, dialogue/runtime actions, or the `drmPopup` CustomNPCs script global. Keep policy limits conservative on public servers.


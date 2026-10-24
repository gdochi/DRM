---
title: 0.2.8 update
slug: release-notes-0-2-8
order: 5
description: 0.2.8 update
product: core
category: 0.2.8 update
section: getting-started
status: Guide
version: 0.2.8
audience: Creators / server operators
---

## Installation

DRM **0.2.8** targets Forge 1.20.1 / Java 17 and Fabric / NeoForge 1.21.1 / Java 21. Match the loader and build on the server and every client. Filter [Modrinth files](https://modrinth.com/mod/drm/versions) by both Minecraft version and loader.

**CustomNPCs is optional.** Install it for workflows that attach dialogue, shops or models to CustomNPCs NPCs. DNPC is a separate optional NPC provider; support for one provider does not imply that every addon feature supports it.

## Editing and saving

- Supported lists now offer independent row checks, Select All, bulk deletion and copy/paste. The active detail row and checked deletion targets are separate.
- Dialogue nodes, choices, conditions and actions have clearer sections and scrolling. Forge multiline-input and node-drag crashes were fixed.
- NPC Apply supports multiple category filters. Matching any selected category includes a file; All clears the filter. The selection is saved locally.
- Shared Back/Forward buttons navigate screen history. Save or Save As still commits your document.

## Quests and administration

Quest actions expose fields for their actual item, tag, score, advancement, animation or JSON operation. The quest-only new-action picker excludes `go_stat_builder`, `cobble_npc:go_battle` and `dochi_minigames:play`. Existing saved actions and the global dialogue action registry remain supported.

Faction-score actions can target CustomNPCs factions or **DNPC relations**. DNPC relations are player reputation toward a relation group, with add, subtract and set operations. Install current DRM and a DNPC build with the relation API together. An unavailable DNPC provider never falls back to changing CustomNPCs scores.

F7 Admin can inspect trainer progress and reset victory counts on Fabric / NeoForge with a compatible Cobblemon Editor. Batch operations now show progress.

## Remnant Messages and performance

Hidden markers and persistent once-per-player triggers are available. Search, NPC-preview and Admin-list caching and GUI preparation were improved. Server-side conditions, rewards and permission checks still govern actual operations.

## Updating

1. Back up `config/dochi_rpg_maker` and the world together.
2. Install matching 0.2.8 builds on the server and clients.
3. Update Cobblemon Editor with its core: version 0.2.6 requires DRM 0.2.8 or later.
4. Reopen custom dialogue, shops, quests and Remnant content and check real interactions. Customize bundled templates through Save As.

Minecraft 26.3 ports are a separate workstream. This page describes the 1.20.1 and 1.21.1 releases.

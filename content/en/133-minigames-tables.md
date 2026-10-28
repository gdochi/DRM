---
title: Minigame tables
slug: minigames-tables
order: 1305
description: Minigame tables
product: dochi-minigames
category: Minigame tables
section: setup
status: Guide
version: 0.1.3
audience: Creators / server operators
---

## Standalone tables

Minigames 0.1.3 runs on Forge 1.20.1 / Java 17 and Fabric / NeoForge 1.21.1 / Java 21. Tables, built-in editors, card packs and MWENT do not require DRM.

1. Obtain `dochi_minigames:minigame_table` in Creative or craft it with three planks and four sticks.
2. As an operator with permission level 2, right-click a new table. Sneak-right-click a configured table with an empty hand to edit it.
3. Load a preset or saved JSON and set its game, rules, costs, rewards and appearance.
4. Choose **Apply to Table** and wait for success. Save / Save As are separate file operations.
5. Players right-click the table to play.

Each table stores its own rule file at `config/dochi_rpg_maker/minigames/games/table_<key>.json`, including without DRM. Applying a table does not overwrite an NPC’s or another table’s original preset.

## MWENT tables

MWENT tables provide player battles, AI battles and spectating. An operator selects a server card-battle JSON in the table menu’s AI section and applies it. Each table keeps an independent AI assignment.

Player battles retain free-entry rules; profiles with entry fees are used for AI battles. A player cannot start a private AI session while participating in active PvP. Empty an occupied table before changing its configuration.

## Authoring tools

`/minigame editor` and `/minigame packs` work standalone. DRM adds NPC Apply, dialogue actions, DRM currency / conditions and GUI Maker. Documents referencing those integrations need the corresponding mods.

## 0.1.3 mapping and crafting

Craft the eight dedicated tables in a vanilla 3×3 crafting grid. Each retains its own game type. Existing `minigame_table` is the **Creative Table** for changing game types and has no crafting recipe. Check the in-game recipe book for dedicated tables.

With operator level 2, empty-hand Shift-right-click maps a saved game JSON or built-in preset ID. The server rejects a different game type on a dedicated table. Placement does not create a new JSON each time; several tables can share an ID. Explicitly save reusable rule files through `/minigame editor`.

MWENT's built-in AI lets you choose a practice opponent. There is no separate tab for authoring card definitions or AI opponent decks. Configure physical card/pack distribution in [acquisition settings](#dochi-minigames/minigames-acquisition).

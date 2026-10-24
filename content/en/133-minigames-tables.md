---
title: Minigame tables
slug: minigames-tables
order: 1305
description: Minigame tables
product: dochi-minigames
category: Minigame tables
section: setup
status: Guide
version: 0.1.2
audience: Creators / server operators
---

## Standalone tables

Minigames 0.1.2 runs on Forge 1.20.1 / Java 17 and Fabric / NeoForge 1.21.1 / Java 21. Tables, built-in editors, card packs and MWENT do not require DRM.

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

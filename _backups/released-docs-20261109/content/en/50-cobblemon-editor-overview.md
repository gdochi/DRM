---
title: Create Pokémon NPCs
slug: cobblemon-editor-overview
order: 500
description: Choose trainers, Pokémon shops, healers or starter NPCs.
product: drm-cobblemon-editor
category: Overview
section: overview
status: Draft
version: Fabric / NeoForge 0.2.9
audience: Creators building Cobblemon NPCs and shops
tags:
  - cobblemon
  - customnpcs
  - overview
---

## What would you like to make?

| Goal | Tool |
| --- | --- |
| A trainer with a Pokémon party | **Cobblemon Editor → Trainer** |
| A Pokémon that fights directly | **Cobblemon Editor → Pokemon Itself** |
| Pokémon sales, trades and auctions | **PokéMart Editor** |
| Party healing | **Nurse Joy Editor** |
| Choosing a first Pokémon | **Starter Selector Editor** |
| An entrance before a battle | **Battle Presentation Maker** |

Right-click air with the DRM Core and choose a tool under **Add-on**. Create NPCs with DNPC or CustomNPCs.

![Actual editor for the trainer’s Pokémon party.](assets/media/guides/cobble-029-neo1211/cobble-party.png "Choose species and level, configure the battle, then apply it to an NPC. Version 0.2.9 / NeoForge 1.21.1, English UI.")

## Start with one trainer

Follow [installation and the first battle](#drm-cobblemon-editor/cobblemon-editor-setup). Give the trainer one Pokémon, save, apply to an NPC and talk with both hands empty.

Then choose [parties and rounds](#drm-cobblemon-editor/cobblemon-trainer-editor), [AI and mechanics](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items) and [battle rules](#drm-cobblemon-editor/cobblemon-battle-rules).

## Add dialogue and rewards

Add a pre-battle greeting or give rewards after post-battle dialogue. See [conditions and after-actions](#drm-cobblemon-editor/cobblemon-conditions-rewards-pokemon).

Set rematch availability and waiting periods in [encounters and rematches](#drm-cobblemon-editor/cobblemon-encounters-rematches).

## Several roles on one NPC

Empty-hand interaction may open dialogue or a shop first. Use a **go_battle** action in dialogue to start its battle. **Shift+right-click** accesses dedicated roles when another applied role takes the normal interaction.

Using separate NPCs for your first roles makes the interaction easier to follow.

## Platforms

For **Minecraft 1.21.1, Fabric or NeoForge**. DRM and Cobblemon are required; use DNPC or CustomNPCs for NPC roles. See the [installation table](#drm-cobblemon-editor/cobblemon-editor-setup).

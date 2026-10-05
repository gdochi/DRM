---
title: Trainer Victory Quests
slug: cobblemon-trainer-quests
order: 568
description: Trainer Victory Quests
product: drm-cobblemon-editor
category: Trainer Victory Quests
section: trainer
status: Draft
version: Fabric 0.2.1 / NeoForge 0.2.0
audience: Creators
---

## Requirements

Use Cobblemon Editor Fabric 0.2.1 or NeoForge 0.2.0 with DRM 0.2.2 or newer. The addon registers the `Trainer Victory` objective in DRM quests.

## Link a trainer ID

1. Select the `Trainer` battle type in Cobblemon Editor.
2. Open Trainer ID settings below the trainer name.
3. Enter a readable ID such as `gym_brock` and press `Use ID`. An existing ID is reused; a new ID is created and linked in the same action.
4. Save the document and apply it to the battle NPC.

IDs are trimmed and lowercased. They must start with a letter or digit, may contain lowercase letters, digits, `_`, `.`, and `-`, and are limited to 64 characters. NPC names and JSON filenames do not replace trainer identity.

The ID picker lists trainer-victory objectives from currently loaded quests. Search and select an existing quest's trainer ID when building an NPC for a quest you already authored. An NPC does not need to exist in the world before quest design.

## Create the objective

1. Create a quest and objective in DRM Quest Editor.
2. Choose `Trainer Victory`.
3. Link the same trainer identity as the battle document and set the required wins.
4. Save the quest, then test a real battle while the player's quest is active. Quests configured to start on first progress follow that start policy.

A requirement of 3 means three separate victories against the linked trainer. Multiple NPCs sharing one trainer ID count toward the same target. Use distinct IDs to count them separately.

## What counts

Only confirmed player wins in DRM Trainer battles count. Losses, fleeing, cancellation, Pokemon Itself battles, and external RCT trainer battles do not count. Historical wins are not imported. Repeated delivery of the same battle result does not add another win. Identity is captured when the battle starts.

Both current DRM Quest Editors author automatic quests. Reaching the required win count does not finish the whole quest if other objectives remain. See [data migration](#core-fabric/loader-compatibility) when importing older turn-in JSON.

## Storage and backups

The objective type is `cobble_npc:trainer_victory`; documents reference a stable `trainerKey`. Link it through the editor instead of manually substituting a readable ID in JSON.

Authoring data lives under `config/dochi_rpg_maker`. Back up trainer documents, quest packs, `cobblemon/trainer_registry.json`, and `cobblemon/trainer_registry.initialized` together, plus the world containing player progress.

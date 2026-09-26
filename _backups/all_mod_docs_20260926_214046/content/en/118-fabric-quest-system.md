---
title: Quest Editor And Journal
slug: quest-system
order: 100
description: Quest packs, objectives, rewards, NPC dialogue links, and the player journal.
product: core-fabric
category: Quest System
section: quest-editor
status: Stable
version: 0.1.8
audience: Quest creators
tags:
  - quest
  - journal
---

## Storage

Quest packs are stored under `config/dochi_rpg_maker/quests/<pack>/`. `pack.json` owns the pack and category order, while `quests/` contains the individual quests.

The bundled sample pack starts disabled. Use it as a reference and create a separate production pack.

## What A Quest Can Do

| Area | Main Options |
| --- | --- |
| Start | Manual acceptance, automatic start when available, or start on first progress |
| Completion | Turn in after objectives or complete automatically |
| Repeat | Never, always, daily, or after a cooldown |
| Prerequisites | All required quests, any quest, or a required count |
| Objectives | Location, item possession/acquisition/delivery, kills, dialogue signals, faction score |
| Rewards | Items, experience, DRM currency, or server commands |

Create the pack and categories first, then add quests in Quest Editor. After saving, the server keeps each player's progress.

## NPC Dialogue Links

Dialogue Editor actions can start or turn in a quest, send a dialogue objective signal, fail or abandon a quest, and pin it in the journal.

Put the start action on a dialogue choice when an NPC gives the quest. Enable journal acceptance when players should be able to accept it directly from the journal.

## Player Journal

The default key is `U`. Players can search quests, filter by status or category, inspect objectives and rewards, and accept, abandon, track, or turn in quests.

Customize the journal through GUI Maker's `quest_journal` type. Treat `gui/default_quest_journal_gui.json` as a template and create a copy with `Save As`.

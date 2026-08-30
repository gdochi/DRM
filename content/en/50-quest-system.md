---
title: Quest Editor And Journal
slug: quest-system
order: 100
description: Quest packs, objectives, rewards, completion, After Complete actions, and the player journal.
product: core
category: Quest System
section: quest-editor
status: Stable
version: 0.1.4
audience: Quest creators
tags:
  - quest
  - journal
---

## Storage And Runtime

Each quest pack is stored under `config/dochi_rpg_maker/quests/<pack>/`. `pack.json` owns pack/category ordering and the `quests/` folder contains individual quest JSON files. The server owns quest progress and sends a journal view to the client.

The bundled sample pack is disabled. Duplicate or create a separate pack before production use.

## Quest Structure

| Area | Supported Values |
| --- | --- |
| Start policy | `manual_accept`, `auto_when_available`, `first_progress`; legacy-compatible `dialogue` and `journal_accept` are also accepted |
| Accept source | NPC/dialogue through `quest_start`, player Journal accept button |
| Completion | `turn_in`, `automatic` |
| Repeat | `never`, `always`, `daily`, `cooldown` |
| Prerequisites | `all`, `any`, `required_count` |
| Objective groups | `all`, `any`, `sequence`, `required_count` |

Objective leaves support location, item, kill, dialogue signal, and CustomNPCs faction score. Item objectives can represent possession, acquisition, or delivery. Rewards support items, XP points/levels, DRM currency, and commands.

## Dialogue Integration

Dialogue actions provide `quest_start`, `quest_turn_in`, `quest_signal`, `quest_fail`, `quest_abandon`, and `quest_pin`. Use these when an NPC controls the quest flow. A Journal-accepted quest must have its Journal accept source enabled.

## After Complete

The Actions page exposes only `After Complete`. The server follows this order:

1. Confirm the quest is ready and delivery items can be consumed.
2. Grant every pending reward.
3. Set the quest state to `Completed` and mark the completion action as executed.
4. Dispatch the configured `After Complete` actions once.

If a reward fails, the quest remains ready for turn-in and `After Complete` does not run. Resetting quest progress does not reclaim already granted rewards.

## Player Journal

The default key is `U`. The journal supports category/state filters, search, details, objective/reward lists, tracking, acceptance, abandonment, refresh, and close components. Edit `gui/default_quest_journal_gui.json` through GUI Maker and save a production variant with `Save As`.

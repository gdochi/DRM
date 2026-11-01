---
title: Quest Editor And Journal
slug: quest-system
order: 100
description: Quest packs, objectives, rewards, completion, After Complete actions, and the player journal.
product: core
category: Quest System
section: quest-editor
status: Stable
version: 0.3.1
audience: Quest creators
tags:
  - quest
  - journal
---

## Make the first NPC quest

Open **Quest Editor → Create New** from the core's editor list. Use **+ Category** for a chapter, then **+ Quest** for a quest inside it. These are **DRM 0.3.1 / Forge 1.20.1** screenshots.

![Forge Quest Editor Info page with quest identity, acceptance sources and completion mode.](assets/media/guides/drm-031-forge1201/quest-info.png "Title is shown to players. NPC Interaction / Dialogue is on; Player Quest Journal is off. This Forge example uses Completion Mode: Turn in.")

1. Fill **Info → Quest ID / Title / Description** with its reference name, player title and task.
2. With **Start Policy → Manual Accept**, enable the acceptance source: **NPC Interaction / Dialogue** for dialogue, or **Player Quest Journal** for its Accept button.
3. Add a goal with **Objectives → + Add** and choose its type and required count. A new goal may initially be **Dialogue Signal**, as below; check the type.
4. Add rewards with **Rewards → + Add**.
5. For **Completion Mode → Turn in**, provide a submission step after meeting the goals. **Automatic** completes after the goals are met. This differs from the NeoForge guide.
6. **Save As** the pack and connect **quest_start** in the NPC dialogue. For Turn in, connect **quest_turn_in** in the completion dialogue too.

![A new Dialogue Signal objective with Signal and Required fields.](assets/media/guides/drm-031-forge1201/quest-objective-detail.png "This objective does not count held items. It progresses when it receives the matching signal; match Signal with the dialogue quest_signal action.")

Open the journal with **U** to test acceptance, progress, completion and actual reward delivery. The bundled sample pack is disabled; enable and save your own pack.

Packs are saved in `config/dochi_rpg_maker/quests/<pack>/`. Copy the whole pack folder, including `pack.json` and `quests/`, when moving it.

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

## 0.2.8 actions and relation scores

Item, tag, faction-score and advancement actions expose operation-specific fields. Registered JSON pickers select server files of the correct kind; supported quest pickers include other packs and current unsaved quests.

Score actions select CustomNPCs factions or DNPC relation groups. DNPC reputation supports add, subtract and set. Use current DRM and a DNPC build with the relation API together; an absent DNPC provider does not fall back to CustomNPCs.

The quest-only new-action picker excludes `go_stat_builder`, `cobble_npc:go_battle` and `dochi_minigames:play`. Existing saved actions and dialogue registrations remain supported.

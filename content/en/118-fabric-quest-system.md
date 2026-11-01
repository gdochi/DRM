---
title: Quest Editor And Journal
slug: quest-system
order: 100
description: Quest packs, objectives, rewards, NPC dialogue links, and the player journal.
product: core-fabric
category: Quest System
section: quest-editor
status: Stable
version: 0.3.1
audience: Quest creators
tags:
  - quest
  - journal
---

## Name Your First Quest And Choose How To Accept It

Open **Quest Editor → Create New** from the core's editor selector. Use **+ Category**, then **+ Quest** to add a quest to that chapter. These are the English screens from **DRM 0.3.1 / NeoForge 1.21.1**.

![Quest Editor with New Quest selected inside New Chapter. Info contains its title, description and acceptance settings.](assets/media/guides/drm-031-neo1211/quest-info.png "The left tree selects a quest. Work through Info, Objectives and Rewards on the right.")

1. Give **Quest ID** a name you can find later in dialogue. **Title** is the player-facing name; **Description** explains the task.
2. With **Start Policy → Manual Accept**, check **Accept Sources**. Enable **NPC Interaction / Dialogue** for an NPC offer, or **Player Quest Journal** for the journal's Accept button. Only the NPC source is enabled in this example.
3. Add the task under **Objectives**. For “bring three loaves,” choose whether the player only needs to possess them or must actually deliver them.
4. Set **Rewards**, then save the pack with **Save As**. Current editor-authored quests complete automatically when their objectives are met; a title alone does not make a finished quest.

Continue with NPC Dialogue Links below to let an NPC offer the quest. Check the dialogue's selected quest ID, the journal title and the reward received after completing the objective.

## Storage

Quest packs are stored under `config/dochi_rpg_maker/quests/<pack>/`. `pack.json` owns the pack and category order, while `quests/` contains the individual quests.

The bundled sample pack starts disabled. Use it as a reference and create a separate production pack.

## What A Quest Can Do

| Area | Main Options |
| --- | --- |
| Start | Manual acceptance, automatic start when available, or start on first progress |
| Completion | Quests authored by the current editor complete automatically after objectives |
| Repeat | Never, always, daily, or after a cooldown |
| Prerequisites | All required quests, any quest, or a required count |
| Objectives | Location, item possession/acquisition/delivery, kills, dialogue signals, faction score |
| Rewards | Items, experience, DRM currency, or server commands |

Create the pack and categories first, then add quests in Quest Editor. After saving, the server keeps each player's progress.

## NPC Dialogue Links

The current action picker offers `quest_start`, `quest_complete`, `quest_reset`, `quest_objective_complete`, and `quest_objective_reset`, with server-backed quest/objective selectors. Legacy turn-in, signal, fail, abandon, and pin actions remain readable in existing JSON.

The current Fabric and NeoForge editors author automatic quests. Distinguish completion through objectives from the administrator's forced `quest_complete`. See [data migration](#core-fabric/loader-compatibility) for older turn-in JSON.

## Player Journal

The default key is `U`. Players can search quests, filter by status or category, inspect objectives and rewards, and accept, abandon, track, or turn in quests.

Customize the journal through GUI Maker's `quest_journal` type. Treat `gui/default_quest_journal_gui.json` as a template and create a copy with `Save As`.

## Direct controls and trainer victories

See [loader command guidance](#core-fabric/loader-compatibility) for quest/objective start, complete, and reset operations. Whole resets do not reclaim rewards; objective resets retain reward history.

With Cobblemon Editor installed, add a `DRM Trainer Victory` objective, select its trainer identity, and set the required number of wins. Follow [Trainer Victory Quests](#drm-cobblemon-editor/cobblemon-trainer-quests).

Drag dividers between the tree/work area and information/description panels to resize them. Long titles wrap and lists scroll. Widths belong to the current editor instance, not the saved quest JSON.

## Copying a pack with Save As

Enter a new pack ID and save. Each quest needs objectives; invalid or already-used pack IDs must be corrected. Check `pack:quest` references within the copy and references to other packs, then load the saved copy and test acceptance, completion, and rewards. Changing the display name is separate from changing the pack ID.

## 0.2.8 actions and relation scores

Item, tag, faction-score and advancement actions expose operation-specific fields. Registered JSON pickers select server files of the correct kind; supported quest pickers include other packs and current unsaved quests.

Score actions select CustomNPCs factions or DNPC relation groups. DNPC reputation supports add, subtract and set. Use current DRM and a DNPC build with the relation API together; an absent DNPC provider does not fall back to CustomNPCs.

The quest-only new-action picker excludes `go_stat_builder`, `cobble_npc:go_battle` and `dochi_minigames:play`. Existing saved actions and dialogue registrations remain supported.

---
title: Choose Parties, Rounds, Dialogue and Rewards
slug: cobblemon-trainer-editor
order: 520
description: Build a trainer's party and choose what happens before and after battle.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Draft
version: Fabric / NeoForge 0.2.9
audience: Cobblemon battle NPC creators
tags:
  - trainer
  - editor
  - party
---

## Start with one Pokémon

Select a Pokémon in the middle **Pokemon Party** list to edit it on the right. Screens use the English UI of **Cobblemon Editor 0.2.9, DRM 0.3.1 and Cobblemon 1.8.4 on NeoForge 1.21.1**.

![Level 5 Bulbasaur selected, with Basic settings on the right.](assets/media/guides/cobble-029-neo1211/cobble-party.png "Left: categories. Middle: the current round’s party and model. Right: the selected Pokémon.")

1. Use **Add**. Trainers support up to six Pokémon per round; Pokemon Itself uses one.
2. Click the species name under **Basic → Pokemon** to choose a species. The example button says **Bulbasaur**.
3. Set **Level**, then choose supported **Form / Aspects**, **Nature** and **Ability**.
4. Choose a **Held Item**. Potions used by the trainer belong in the separate **Battle Item Inventory** below the party list.
5. **Save As** your own file, then apply it to an NPC. See [the first battle](#drm-cobblemon-editor/cobblemon-editor-setup) for the binding steps.

![Species picker opened from the Bulbasaur button, with search, Filters and pages.](assets/media/guides/cobble-029-neo1211/cobble-pokemon-picker.png "Search by name or narrow the catalog with Filters; you do not need to memorize species IDs.")

## Set stats and moves

**Stats** shows calculated values at the authored level. Use **Edit IV / EV** to change IVs and EVs. Random IVs or nature produce a possible range rather than a single fixed value.

![Level 5 stat ranges with IV Random and EV 0/510.](assets/media/guides/cobble-029-neo1211/cobble-stats.png "Battle-level adjustment and other battle rules can change the values used during a battle.")

| Setting | Range |
| --- | --- |
| Level | 1–100 |
| Moves | Up to 4 |
| IVs | 0–31 per stat |
| EVs | 0–252 per stat; 510 total |

In **Moves**, use each slot’s browse button to select a move. Drag an assigned move to reorder it. Empty slots use the existing moveset rules; four None labels do not mean the Pokémon is unable to use any moves.

![Four move slots with individual selection buttons.](assets/media/guides/cobble-029-neo1211/cobble-moves.png "Set moves here when the trainer needs a particular moveset. The species’ learnset moves appear first in the picker.")

Use **Generate Party** for a party built from filters. Continue to [AI, party generation and mechanics](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items) for more control.

## Connect triggers, rounds and dialogue

Choose **Battle Config** on the left to switch to battle settings.

![General battle settings showing Trainer Battle, battle type, name source and presentation.](assets/media/guides/cobble-029-neo1211/cobble-config.png "General: identity and type. Encounter: triggers. Rounds: round setup. Dialogue: pre-battle conversation. After Actions: what follows a result.")

1. Under **General**, enable **Trainer Battle** and choose **Battle type**. **Name source → Trainer Profile** uses **Trainer Name** here; **Applied NPC Name** uses the applied NPC’s name.
2. In **Encounter**, choose interaction or nearby-player detection. See [encounters and rematches](#drm-cobblemon-editor/cobblemon-encounters-rematches) for conditions and waiting periods.
3. In **Rounds**, use **Add / Duplicate** for up to 16 rounds. Each can have its own party, rules, conditions, dialogue and rewards. Existing progress follows round order, so review changes before reordering an operating trainer. Applying again does not clear win records.
4. In **Dialogue**, select the current round’s dialogue and put **go_battle** on its battle choice. Without a dialogue set, the normal battle confirmation is used.
5. Choose an entrance in **General → Battle presentation**. Set Singles/Doubles and level adjustments in [battle rules](#drm-cobblemon-editor/cobblemon-battle-rules).

![Current-round rules, AI, gimmicks and rematch settings.](assets/media/guides/cobble-029-neo1211/cobble-rounds.png "The round controls are Add / Duplicate. Click the current value beside AI skill on the right to open strategy settings.")

### Watch dialogue start a battle

With the trainer and round dialogue already applied, interact with the NPC and choose **Let's battle!**. The choice runs **go_battle**, plays the configured introduction and opens the Cobblemon battle screen. This is the player experience after setup, rather than the trainer editor.

![Talk to Meadow Trainer, choose Let's battle!, and enter the Pokémon battle after the introduction.](assets/media/guides/runtime-videos-20261106/trainer-battle-start.mp4 "Cobblemon Editor 0.2.9 + DRM 0.3.1 + DNPC 0.1.3 + Cobblemon 1.8.4 / NeoForge 1.21.1, English UI. Prepared round dialogue → go_battle → introduction → battle.")

## Give rewards after dialogue

In **Battle Config → After Actions**, choose **Action Mode → Sequential**. Put the dialogue first and item/currency rewards after it. Select which result triggers the sequence: win, loss or flee.

Sequential execution waits for the dialogue to finish. Cancellation or disconnect stops later rewards; interacting again resumes the remaining actions. Each round allows one dialogue action. Reduce older multi-dialogue setups to one before saving or applying.

**General Item Inventory** holds possession requirements such as Mega keys. It is separate from consumable **Battle Item Inventory**. Copying an item from the player’s inventory does not consume it.

## Create an Alpha Pokémon
This video uses the actual **0.2.9 release JAR**. Select a slot in **Pokemon Party** and enable **Basic → Alpha**. **Aspects** also shows Alpha and the preview's eyes become red. It is separate from **Shiny** and requires installed Cobblemon support for native Alpha Pokémon.

![Enable Alpha in Basic, preview red-eyed Bulbasaur and save your own profile.](assets/media/guides/cobble-release-20261109/pokemon-alpha.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, English UI. Alpha setting → model preview → Save As. Does not show NPC Apply or a completed battle.")

Use **Save As** for your profile, then [NPC Apply](#drm-cobblemon-editor/cobblemon-editor-setup) for its first binding. Development layouts may differ; the switch in this recording is in **Basic**.

Continue with [badge and trophy rewards](#drm-cobblemon-editor/cobblemon-badges) or [RCT → DNPC conversion](#drm-cobblemon-editor/cobblemon-rct-conversion).

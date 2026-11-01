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

## Build a party

Use **Pokemon Party → Add Pokémon**. A Trainer can have up to six Pokémon per round; Pokemon Itself uses one.

Set species, form, level, moves, ability and held item. **Stats** edits IVs/EVs; **Battle Mechanics** sets Tera type, Dynamax and related options. The Pokémon's learnset moves sort first.

| Value | Range |
| --- | --- |
| Level | 1–100 |
| Moves | Up to 4 |
| IVs | 0–31 per stat |
| EVs | 0–252 per stat; 510 total |

**Random Party** generates a party from filters, **Battle Strategy** chooses AI, and **Trainer Items** sets consumable battle items. See [advanced party settings](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items).

## Add rounds

One NPC can have up to 16 rounds. **Add Round** creates one; **Duplicate Round** copies the current one.

Give rounds their own parties, conditions, dialogue and rewards. Reordering also affects how existing player progress refers to the rounds. Applying again does not automatically clear win records.

## Battle triggers and rules

Use **Encounter** for click-to-start or nearby-player detection. **Enabled** must be on.

In **Rounds → Edit battle rules**, choose Singles/Doubles, level adjustment, items and legendary/mechanic permissions. Use shared rules or individual round rules. See [battle rules](#drm-cobblemon-editor/cobblemon-battle-rules).

## Add pre-battle dialogue

Choose a dialogue set in the round's **Dialogue** settings. Add **go_battle** to a choice such as “Let's battle.”

Without a dialogue set, the normal battle confirmation is used. Choose an entrance separately under **General → Battle Presentation**.

## Give rewards after dialogue

1. Open **Battle Config → After Actions**.
2. Choose **Action Mode → Sequential**.
3. Add a dialogue action, then put item/currency rewards below it.
4. Choose the result that triggers it, such as win, loss or flee, then save.

Sequential mode waits for dialogue completion. Cancelling or disconnecting stops later rewards. Interacting with the NPC again continues from the remaining actions.

Each round allows one dialogue action. Reduce older multi-dialogue setups to one before saving/applying.

## Names and mechanic key items

Under **General**, name source **NPC** uses the NPC's current name; **Profile** uses the name in this setup.

Put required possessions, such as Mega keys, in **General Item Inv**. **My Inventory → Add selected** copies the player's item without consuming it. This is separate from consumable **Trainer Items**.

See [the first battle](#drm-cobblemon-editor/cobblemon-editor-setup) for applying a file to an NPC.

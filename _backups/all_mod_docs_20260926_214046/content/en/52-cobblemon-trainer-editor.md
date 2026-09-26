---
title: Cobblemon Editor Functional Guide
slug: cobblemon-trainer-editor
order: 520
description: Understand 0.1.6 party and round editing, level rules, tunable AI, saving, and NPC application behavior.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Draft
version: 0.1.6
audience: Cobblemon battle NPC creators
tags:
  - trainer
  - editor
  - party
---

## What this editor creates

`Cobblemon Editor` defines the battle opponent and encounter policy. Choosing `Trainer` or `Pokemon Itself` changes both the available categories and the server storage domain.

| Battle type | Save domain | Runtime result |
| --- | --- | --- |
| `Trainer` | `cobblemon/trainers/` | Up to 16 trainer rounds with encounters, rematches, conditions, and rewards |
| `Pokemon Itself` | `cobblemon/pokemon_itself/` | One fully specified Pokémon in a Cobblemon PVE battle |

Changing the battle type immediately changes the folder used by `Load` and `Save As`. Choose the type first instead of copying a trainer document into the Pokemon Itself folder.

The current Trainer document schema is `22`; Pokemon Itself uses schema `8`. Supported older documents are normalized when loaded and saved.

## Categories and runtime effects

| Category | Saved values | Runtime effect |
| --- | --- | --- |
| `Pokemon Party` | Species, form, aspects, shiny state, level, nature, ability, moves, ball, held item | The server creates actual Cobblemon Pokémon from these specs. |
| `General` | Enabled state, name, battle type, presentation path | Disabled data cannot start a battle. The presentation is resolved by file path. |
| `Encounter` | Interaction/Vision/Radius, chase, and positioning | Controls target acquisition and where battle startup occurs. |
| `Detection FX` | Marker text and appearance, sound, reaction delay | Runs once when Vision or Radius first acquires a player. |
| `Rounds` | Order, format, AI, party, and start delay | Selects the opponent setup for the first challenge and rematches. |
| `Conditions` | Per-round challenge requirements | Evaluated before automatic acquisition and again before actual battle startup. |
| `Rewards` | Per-round After Actions | Runs on the configured `win`, `loss`, `flee`, or `battle_end` result. |

Pokemon Itself disables the trainer-only categories and edits one Pokémon plus its NPC appearance.

## Pokémon slot behavior

A trainer round supports up to six slots. Species, form, ability, move, and other large pickers provide search and paging. Held Item uses DRM's shared searchable item catalog.

| Value | Processing |
| --- | --- |
| Species | Adds `cobblemon:` when no namespace is supplied. An invalid species can stop battle creation. |
| Form | Blank uses the species default form. |
| Aspects | Comma-separated model or variant aspects supported by the selected species. |
| Shiny | The real Pokémon shiny state; separate from appearance `Shining`. |
| Level | Clamped to 1–100. |
| Nature / Ability | Blank leaves the value to Cobblemon creation defaults; a selected value is explicit. |
| Moves | Duplicates are removed and only four values are saved. A blank list lets Cobblemon use its normal generated moves. |
| Poké Ball | Defaults to `cobblemon:poke_ball` and is also used by the lead-ball presentation. |
| Held Item | Blank means no held item. |

Generation and type filters only narrow picker results. They do not add restrictions to the saved Pokémon.

## Round editing

Add, remove, and drag rounds to change their order. Every round independently stores:

- Singles, Doubles, Triples, or Lead Duel format
- Six 0–100 DRM AI tuning values or another selected AI engine
- Up to six Pokémon
- A non-negative `Battle start delay`
- Up to 32 conditions and 32 rewards

`Edit this round's party` switches `Pokemon Party` to the selected round. Return with the round-editor action so you do not lose track of the active round. The first round also synchronizes the document's legacy-compatible base party, format, and AI fields.

`Battle start delay` begins after the presentation. A 48-tick presentation plus a 20-tick delay makes the server attempt battle startup at about tick 68.

### Battle rules

Open `Battle Rules` from `Rounds`, then select `Common Rules` or an explicit round from 1–16. A round can inherit the common rules or keep its own override. Rules cover battle format, level handling, battle and held-item restrictions, item limits and timing/HP gates, Legendary Pokémon, Mega/Tera/Dynamax permission, and lead selection. Lead Duel forces Singles and creates one-Pokémon battle parties without deleting the authored parties.

NPC gimmick equipment and battle rules are separate: equipment configures the round's NPC and key item, while the rule controls whether the mechanic is permitted for both sides.

### Battle sounds

`Battle Sounds` can play one sound once per battle when the trainer has 1–6 Pokémon remaining, counting active and benched Pokémon together. Define shared rules, then let each round inherit, replace, or disable them. Volume accepts 0–4 and pitch accepts 0.05–4. The optional stop-first setting stops current battle audio and sounds started by these rules before the new sound plays.

## DRM Strategy AI

Version 0.1.6 exposes Decision Quality, Battle Knowledge, Aggression, Defense, Trickery, and Switching as separate 0–100 values. Beginner, Standard, Expert, and Boss presets provide starting points and remain fully editable. The AI assessment summarizes difficulty, information use, temperament, switching style, consistency, strengths, and warnings.

Trainer Items also expose an item-use priority, healing HP threshold, boost-item turn limit, and separate Revive, status-cure, and PP-recovery toggles. These settings apply only to DRM Strategy, not RCT or Cobblemon Strong.

## Save, apply, and reapply

1. Create the first project copy under `custom/` with `Save As`.
2. Open the target CustomNPCs NPC with `Dochi RPG Maker Core`.
3. Choose `Cobblemon Trainer` or `Cobblemon Pokemon Itself`, select the saved document, and press `Apply`.
4. Put the core away, empty both hands, and test the runtime interaction.
5. Saving later edits to the same bound source path updates the next battle request. Apply again only when changing the path or role, or when using a snapshot-only clone.

Direct `Apply to NPC` requires an editor opened for a target NPC. The server rechecks edit permission and distance before accepting the change.

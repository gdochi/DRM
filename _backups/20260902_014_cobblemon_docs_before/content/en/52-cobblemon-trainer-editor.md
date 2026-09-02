---
title: Cobblemon Editor Functional Guide
slug: cobblemon-trainer-editor
order: 520
description: Understand the Cobblemon Editor workspace, party and round editing, AI Skill, saving, and NPC application behavior.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Draft
version: 0.1.0
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

## Categories and runtime effects

| Category | Saved values | Runtime effect |
| --- | --- | --- |
| `Pokemon Party` | Species, form, aspects, shiny state, level, nature, ability, moves, ball, held item | The server creates actual Cobblemon Pokémon from these specs. |
| `General` | Enabled state, name, battle type, presentation path | Disabled data cannot start a battle. The presentation is resolved by file path. |
| `Encounter` | Interaction/Vision/Radius, chase, and positioning | Controls target acquisition and where battle startup occurs. |
| `Detection FX` | Marker text and appearance, sound, reaction delay | Runs once when Vision or Radius first acquires a player. |
| `Rounds` | Order, format, AI, party, and start delay | Selects the opponent setup for the first challenge and rematches. |
| `Conditions` | Per-round challenge requirements | Evaluated before automatic acquisition and again before actual battle startup. |
| `Rewards` | Per-round victory rewards | Runs server-side only after a win; not on loss or flee. |

Pokemon Itself disables the trainer-only categories and edits one Pokémon plus its NPC appearance.

## Pokémon slot behavior

A trainer round supports up to six slots. The separate Pokémon data editor provides search and filters for supported values.

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

- Singles, Doubles, or Triples format
- AI Skill 0–5
- Up to six Pokémon
- A non-negative `Battle start delay`
- Up to 32 conditions and 32 rewards

`Edit this round's party` switches `Pokemon Party` to the selected round. Return with the round-editor action so you do not lose track of the active round. The first round also synchronizes the document's legacy-compatible base party, format, and AI fields.

`Battle start delay` begins after the presentation. A 48-tick presentation plus a 20-tick delay makes the server attempt battle startup at about tick 68.

## AI Skill behavior

AI Skill configures Cobblemon's advanced and switch decision rates; it is not a damage multiplier.

| Skill | Advanced decisions | Switch decisions |
| --- | ---: | ---: |
| 0 | 0% | 0% |
| 1 | 20% | 0% |
| 2 | 40% | 0% |
| 3 | 60% | 20% |
| 4 | 80% | 60% |
| 5 | 100% | 100% |

Higher AI does not repair invalid moves or a party that cannot support the selected battle format. Prepare enough valid Pokémon for Doubles and Triples.

## Save, apply, and reapply

1. Create the first project copy under `custom/` with `Save As`.
2. Open the target CustomNPCs NPC with `Dochi RPG Maker Core`.
3. Choose `Cobblemon Trainer` or `Cobblemon Pokemon Itself`, select the saved document, and press `Apply`.
4. Put the core away, empty both hands, and test the runtime interaction.
5. Apply the document again after later edits. A server JSON file and the copy stored in NPC PersistentData are not live-linked.

Direct `Apply to NPC` requires an editor opened for a target NPC. The server rechecks edit permission and distance before accepting the change.

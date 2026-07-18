---
title: Trainer and Pokemon Itself Editing
slug: cobblemon-trainer-editor
order: 520
description: Configure parties, rounds, encounter detection, rematches, conditions, and victory rewards.
product: drm-cobblemon-editor
category: Trainer
section: trainer
status: Draft
version: 0.1.0
audience: Cobblemon battle NPC creators
tags:
  - trainer
  - battle
  - rewards
---

## Editor structure

`Cobblemon Editor` follows the DRM addon-editor layout: categories on the left, the active workspace in the center, and preview or status information on the right. `Editors`, `Create New`, `Load`, `Save`, `Save As`, `Reset`, and `Close` use the shared DRM workflow.

| Category | Main settings |
| --- | --- |
| `Pokemon Party` | Pokémon slots and full specs for the selected round |
| `General` | Name, enabled state, and `Trainer` or `Pokemon Itself` type |
| `Encounter` | Interaction/Vision/Radius, scan timing, sight, chase, and battle positioning |
| `Detection FX` | Detection marker, color, size, duration, and sound |
| `Rounds` | Add, copy, or delete rounds; format, AI Skill, delay, and rematch progression |
| `Conditions` | Requirements that allow the player to challenge a round |
| `Rewards` | Server-authoritative rewards granted for winning a round |

## Pokémon slots

Each trainer round supports a party of up to six Pokémon. A slot can define Species, Form, Aspects, Shiny, Level, Nature, Ability, up to four Moves, Poké Ball, and Held Item.

The formats are `Singles`, `Doubles`, and `Triples`. AI Skill ranges from `0` to `5`. Invalid species or unusable battle data can make the server reject battle startup, so begin with the working default slot and change one field at a time.

## Trainer versus Pokemon Itself

| Setting | Trainer | Pokemon Itself |
| --- | --- | --- |
| Opponent | Up to six Pokémon per round | One Pokémon |
| Format | Singles/Doubles/Triples | Primarily single-opponent PVE |
| Rounds | Up to 16 | Not used |
| Conditions and rewards | Per round | Not used |
| Encounter focus | Interaction/Vision/Radius, chase, rematches, cooldown | Full single-Pokémon specs and appearance |
| Default presentation | `presets/vs_trainer.json` | `presets/vs_pokemon.json` |

Changing the type also changes the save domain between `trainers/` and `pokemon_itself/`. Check the `Save As` destination after changing it.

## Encounter triggers

| Trigger | Behavior |
| --- | --- |
| `Interaction` | Opens the battle confirmation when the player right-clicks with both hands empty |
| `Vision` | Detects the closest valid player that passes distance, angle, and optional line-of-sight checks |
| `Radius` | Detects the closest valid player within the configured radius |

Vision and Radius do not target Creative or Spectator players. The addon also avoids starting when the player is already in battle or the NPC is reserved for another battle.

After automatic detection, the marker and sound play once. When `Reaction Ticks` elapse, the battle starts immediately or the NPC begins chasing the player. Chase settings include Walking Speed, Stop Distance, Max Distance, Duration, and Return Home.

`Battle Positioning` arranges the NPC and player around the NPC's home position before combat. The NPC is hidden and locked during battle, then restored when the battle ends or startup fails.

## Rounds and rematches

A trainer may have up to 16 rounds. Each round stores its own format, AI Skill, party, start delay, conditions, and rewards.

| Round Mode | Behavior |
| --- | --- |
| `Fixed` | Always uses the configured `Start Round` |
| `Continue` | Advances with clear count and stops at the final round |
| `Loop` | Repeats from `Start Round` through the final round |

`Max Rematches` set to `-1` means unlimited. Cooldown values use ticks; 20 ticks are about one second. `Player` scope tracks each player separately, while `NPC` scope blocks the NPC for everyone.

## Conditions and rewards

Conditions can be grouped with `AND` or `OR`. Each round supports up to 32 conditions and 32 rewards.

| Condition type | Use |
| --- | --- |
| `tag` | Scoreboard tag presence or absence |
| `item` | Item ownership or quantity comparison |
| `stored` | CustomNPCs script storeddata comparison |
| `advancement` | Advancement present or absent |
| `cobblemon_party` | Species or count in the player's active party |

| Reward type | Use |
| --- | --- |
| `item` | Give or remove items |
| `tag` | Add or remove scoreboard tags |
| `stored` | Set, add, subtract, or delete CustomNPCs storeddata |
| `command` | Run a server command |
| `advancement` | Grant or revoke an advancement |
| `currency` | Add, remove, or set DRM currency |
| `cobblemon_give` | Give a Pokémon with a configured species and level |

Reward Mode can attempt `All` entries or choose `Random`. Reward Policy can be `Every Clear`, `First Clear`, or `Once Per Round`. Each reward also has its own Chance.

:::warning Commands and storeddata
A `command` reward can run with server authority, so validate it on a test server. `stored` targets CustomNPCs script storeddata; it is not the general DRM persistent-data system.
:::

## Save and apply

1. Use `Save As` for the first user copy.
2. Save trainers under `cobblemon/trainers/` and Pokemon Itself documents under `cobblemon/pokemon_itself/`.
3. Open the target NPC's DRM apply workflow and select the matching target type.
4. Choose `Apply`, then test the actual runtime with empty hands.
5. Apply the document again after later edits.

Conditions, rematches, and rewards depend on per-player progress. Repeated tests with one player can be affected by existing clear records, tags, items, or cooldown state.

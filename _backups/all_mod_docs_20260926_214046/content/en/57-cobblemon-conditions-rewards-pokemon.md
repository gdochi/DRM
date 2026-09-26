---
title: Conditions, After Actions, and Pokemon Itself
slug: cobblemon-conditions-rewards-pokemon
order: 522
description: Understand round conditions, result-based After Actions, retry behavior, and Pokemon Itself.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Draft
version: 0.1.6
audience: Creators building conditional battles and Pokémon NPCs
tags:
  - conditions
  - rewards
  - pokemon-itself
---

## When conditions run

A round supports up to 32 conditions. An empty group passes. `AND` requires every condition, while `OR` requires at least one.

The server evaluates conditions while acquiring an automatic target and again immediately before the real battle starts. Items or tags changed during presentation playback can therefore cancel startup.

## Exact condition behavior

| Type | Key | Value | Operations |
| --- | --- | --- | --- |
| `tag` | Scoreboard tag | Unused | `has`, `not` |
| `item` | Item ID | Quantity | `has`, `not`, `>=`, `<=`, `==`, `!=`, `>`, `<`; counts matching items across inventory |
| `stored` | storeddata key | Comparison value | Numeric comparison if both values parse as numbers, otherwise string `==` or `!=` |
| `advancement` | Advancement ID | Unused | `has`, `not` based on completion |
| `cobblemon_party` | Species | Quantity | Counts the species in the active party; `cobblemon:` may be omitted |

Item `has` means at least one and `not` means zero. Item NBT is not part of this trainer condition count.

:::note Stored values
`stored` targets the CustomNPCs scripting-oriented storeddata runtime used by DRM dialogue support. It is not an arbitrary JSON-path reader.
:::

## After Action selection order

A round supports up to 32 After Actions. Each action can run on `win`, `loss`, `flee`, or `battle_end`; actions sharing a matching result can run together.

1. Check Grant Policy against player progress.
2. Roll each reward's Chance independently.
3. `All` runs every eligible reward; `One random` chooses one eligible reward.
4. If at least one reward succeeds, record the round as rewarded when the policy needs that state.

| Policy | Behavior |
| --- | --- |
| `Every clear` | Attempts matching actions after every battle result |
| `First clear only` | Only while the NPC clear count is zero |
| `Once per round` | One successful grant record per round |

Chance ranges from 0.0 to 1.0. In `One random`, only entries that passed Chance participate in selection.

## After Action execution

| Type | Operations | Server behavior |
| --- | --- | --- |
| `item` | `give`, `take` | Quantity 1–6400. `take` is transactional and removes nothing unless the full amount exists. Overflow from `give` drops at the player. |
| `tag` | `add`, `remove` | Changes scoreboard tags. |
| `stored` | `set`, `add`, `subtract`, `remove` | Sets a string, performs numeric changes, or deletes the stored key. |
| `command` | `run` | Runs silently at server permission level 4; leading slashes are stripped. |
| `advancement` | `grant`, `revoke` | Changes only the named advancement. |
| `currency` | `add`, `take`, `set` | Changes a DRM Currency balance; negative amounts normalize to zero. |
| `cobblemon_give` | `give` | Creates the selected species at level 1–100 and adds it to the active party. |
| `ftb_complete_quest` / `ftb_complete_task` | `complete` | Completes the selected FTB Quest or Task when FTB Quests is installed. |
| `npc_hide` / `npc_despawn` | — | Hides or removes the NPC after ordinary actions succeed. |

Commands support `{player}`, `{uuid}`, `{npc}`, and `{battle}` replacements. Test every command on a staging server because it executes with elevated server authority.

## Practical condition rows

| Goal | Type | Operation | Key | Value |
| --- | --- | --- | --- | --- |
| Require a badge tag | `tag` | `has` | `badge_boulder` | Blank |
| Require 16 emeralds | `item` | `>=` | `minecraft:emerald` | `16` |
| Require one Pikachu in party | `cobblemon_party` | `>=` | `cobblemon:pikachu` | `1` |
| Require an unfinished advancement | `advancement` | `not` | Advancement ID | Blank |

Groups are flat. To represent `(A AND B) OR C`, precompute a tag or stored value instead of expecting nested groups.

## Pokemon Itself behavior

Pokemon Itself uses one complete Pokémon per round instead of a trainer party. It supports the same round conditions and result-based After Actions; trainer-only AI, inventory, and gimmick controls are disabled.

- Runtime is a single-opponent Cobblemon PVE battle.
- Default presentation is `presets/vs_pokemon.json`.
- Species, form, aspects, shiny state, level, nature, ability, moves, ball, and held item define the opponent.
- Appearance Scale is 0.05–12.0; Pose defaults to `AUTO`; blank Animation uses the automatic state.
- `Shiny` is Pokémon data, while `Shining` is a separate NPC-render highlight.

Applying Pokemon Itself also derives the CustomNPCs Pokémon appearance from species plus form/aspects. Keep final appearance changes in the Pokemon Itself document so a later reapply does not unexpectedly restore older values.

## Recommended build sequence

1. Change only Species and Level on the default and verify battle creation.
2. Add Form and Aspects, then compare the world model and battle model.
3. Lock Nature, Ability, Moves, and Held Item.
4. Tune Scale, Pose, Animation, and Shining.
5. Assign a custom presentation and save. An NPC tracking that source path normally needs no reapply.

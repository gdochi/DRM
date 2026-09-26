---
title: Conditions And Actions
slug: conditions-actions
order: 90
description: Implemented condition and action types used by dialogue nodes, routes, and choices.
product: core-fabric
category: Core Systems
section: dialogue-editor
status: Stable
version: 0.1.8
audience: Script / data creators
tags:
  - condition
  - action
---

## Where Conditions Run

Conditions can be attached to nodes, start routes, and choices. Empty condition arrays pass.

| Location | Field | Mode Field |
| --- | --- | --- |
| Node | `conditions` | `conditionMode` |
| Start route | `conditions` | `mode` |
| Choice | `conditions` | `conditionMode` |

Modes are `and` and `or`. Blank or unknown modes are treated as `and`.

## Condition Types

| type | Main Fields | Behavior |
| --- | --- | --- |
| `tag` | `key`, `tag`, `value`, `op` | Checks whether the player has a tag. `op: "not"` means absent. |
| `stored` | `key`, `value`, `op` | Compares CustomNPCs script storeddata for script-oriented workflows. |
| `item` | `key`, `value`, `op` | Compares player inventory count for an item. |
| `faction_score` | `faction`, `key`, `amount`, `value`, `op` | Compares CustomNPCs faction points. |
| `advancement` | `advancement`, `key`, `op` | Checks advancement completion. |
| `ftb` | `quest`, `key`, `value`, `op` | Checks FTB quest state. |
| `ftb_task` | `quest`, `task`, `op` | Checks FTB task state. |
| `quest_state` | `quest`, `state`, `op` | Compares the current DRM quest state. |
| `quest_can_start` | `quest`, `op` | Checks whether a DRM quest can start now. |
| `quest_can_turn_in` | `quest`, `op` | Checks whether a DRM quest can be turned in now. |
| `quest_objective` | `quest`, `objective`, `value`, `op` | Compares objective progress. |

Numeric comparisons support `>`, `>=`, `<`, `<=`, `==`, and `!=`. Tags and advancements usually use `has` or `not`.

## Action Types

The 0.1.8 shared Condition Editor supports drag-and-drop reordering with edge auto-scroll and an insertion guide. `item`, `faction_score`, `advancement`, `ftb`, `ftb_task`, and DRM quest ID fields provide searchable `Find` flows. FTB discovery and evaluation require FTB Quests and a synchronized client quest file.

| type | Main Fields | Behavior |
| --- | --- | --- |
| `goto` | `value` | Move to a node in the same dialogue document. |
| `go_shop` | `shop`, `value` | Open a bound NPC shop or a file shop from `npc_shops`. |
| `go_teleporter` | `teleporter`, `value` | Open the NPC-bound Teleporter Set or an explicit file from `teleporters`. |
| `close` | none | Close the dialogue screen. |
| `command` | `command`, `value` | Run a server command as/at the player. |
| `tag` | `key`, `op` | Add or remove a player tag. |
| `item` | `itemId`, `count`, `itemOp` | Give, take, or set an item count. |
| `faction_score` | `faction`, `amount`, `factionOp` | Change CustomNPCs faction points. |
| `advancement` | `advancement`, `criterion`, `advancementOp` | Grant or revoke an advancement. |
| `ftb_task` | `quest`, `task` | Complete an FTB task. |
| `ftb_complete` | `quest` | Complete an FTB quest. |
| `quest_start`, `quest_turn_in` | `quest` | Start or turn in a DRM quest. |
| `quest_signal` | `quest`, `signal`, `amount` | Progress a dialogue-signal objective. |
| `quest_fail`, `quest_abandon`, `quest_pin` | `quest` | Fail, abandon, or track a DRM quest. |
| `gecko_animation` | Animation settings | Play a GeckoLib animation on the target NPC. |

`goto`, `go_shop`, `go_teleporter`, and `close` are navigation actions. Other actions are server side effects.

For `go_teleporter`, use `bound` or leave the target blank to use the Teleporter Set applied to that NPC. To open a specific set, store its normalized path in `teleporter` or `value`, for example `town_network.json`.

## Command Action

`command` strips a leading `/` and runs as the player.

```json
{
  "type": "command",
  "command": "title {player} actionbar {\"text\":\"Quest started\",\"color\":\"green\"}"
}
```

Placeholders:

| Placeholder | Replacement |
| --- | --- |
| `{player}` / `%player%` / `${player}` | Player name |
| `{uuid}` / `%uuid%` | Player UUID |

## Item Action

| itemOp | Behavior |
| --- | --- |
| `give` | Gives `count` items. |
| `take` or `remove` | Removes `count` items. |
| `set` | Adjusts the inventory so the player has exactly `count`. |

Item IDs should include namespaces, for example `minecraft:apple`.

:::warning Action Order
If `command` is followed by `goto`, the command runs first and then the node changes. Put state-changing actions before navigation actions.
:::

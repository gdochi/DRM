---
title: Conditions And Actions
slug: conditions-actions
order: 90
description: Implemented condition and action types used by dialogue nodes, routes, and choices.
product: core
category: Core Systems
section: dialogue-editor
status: Stable
version: 0.1.4
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
| `cnpc_stored_data` | `scope`, `key`, `op`, `valueType`, `value` | Reads and compares CustomNPCs player, context entity, or world Stored Data. |
| `item` | `key`, `value`, `op` | Compares player inventory count for an item. |
| `faction_score` | `faction`, `key`, `amount`, `value`, `op` | Compares CustomNPCs faction points. |
| `advancement` | `advancement`, `key`, `op` | Checks advancement completion. |
| `ftb` | `quest`, `key`, `value`, `op` | Checks FTB quest state. |
| `ftb_task` | `quest`, `task`, `op` | Checks FTB task state. |

Numeric comparisons support `>`, `>=`, `<`, `<=`, `==`, and `!=`. Tags and advancements usually use `has` or `not`.

The legacy `stored` condition has been removed. If an older JSON file still contains `"type": "stored"`, DRM interprets it as `cnpc_stored_data` and writes the canonical new type when the condition is saved again. Always use `cnpc_stored_data` for new content.

It supports `player`, `context_entity`, and `world` scopes plus existence, string, and numeric comparisons. See **CustomNPCs Stored Data Condition Integration** in the Script API section for editor steps, legacy JSON migration, execution-context limits, script recipes, and failure rules.

## Action Types

| type | Main Fields | Behavior |
| --- | --- | --- |
| `goto` | `value` | Move to a node in the same dialogue document. |
| `go_shop` | `shop`, `value` | Open a bound NPC shop or a file shop from `npc_shops`. |
| `close` | none | Close the dialogue screen. |
| `command` | `command`, `value` | Run a server command as/at the player. |
| `tag` | `key`, `op` | Add or remove a player tag. |
| `item` | `itemId`, `count`, `itemOp` | Give, take, or set an item count. |
| `faction_score` | `faction`, `amount`, `factionOp` | Change CustomNPCs faction points. |
| `advancement` | `advancement`, `criterion`, `advancementOp` | Grant or revoke an advancement. |
| `ftb_task` | `quest`, `task` | Complete an FTB task. |
| `ftb_complete` | `quest` | Complete an FTB quest. |

`goto`, `go_shop`, and `close` are navigation actions. Other actions are server side effects.

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

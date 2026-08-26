---
title: CustomNPCs Stored Data Condition Integration
slug: script-stored-data-conditions
order: 128
description: Read player, context entity, and world CustomNPCs Stored Data from DRM conditions, with complete setup and script examples.
product: core
category: Script API
section: script-api
status: Stable
version: 0.1.4
audience: CustomNPCs script and DRM condition authors
tags:
  - script
  - customnpcs
  - storeddata
  - condition
---

## What This Integration Does

The `cnpc_stored_data` condition lets DRM read values written through the CustomNPCs script API's `getStoreddata()`. A script can record a quest stage, boss phase, or world chapter, then DRM can use that value to control dialogue, teleporters, quest availability, and Remnant Messages.

This integration is **read-only**. DRM reads and compares a value but never creates, changes, or removes it. Use CustomNPCs script methods such as `put` and `remove` to change the data.

```text
CustomNPCs script writes a value
        ↓
Player / context entity / world Stored Data
        ↓
DRM cnpc_stored_data condition reads and compares it
        ↓
Dialogue route, choice, teleporter, or quest availability is decided
```

:::warning Required Mod
CustomNPCs must be loaded on the server for this condition to evaluate. If the mod or its script API is unavailable, the condition fails closed and quietly returns `false`.
:::

## Quick Start

### 1. Write a value from a CustomNPCs script

Add this to an NPC's `Interact` script. Clicking the NPC stores the number `3` on the player.

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.stage", 3);
    event.player.message("Quest stage changed to 3.");
}
```

### 2. Add a DRM condition

Add `CustomNPCs Stored Data` in a DRM condition editor and enter these values.

| Field | Value |
| --- | --- |
| Type | `CustomNPCs Stored Data` |
| Scope | `Player` |
| Key | `my_pack.quest.stage` |
| Operator | `>=` |
| Value Type | `Number` |
| Expected Value | `3` |

The condition now passes only when `my_pack.quest.stage` can be read as a number greater than or equal to `3`.

:::note Editor Inputs and JSON
Enter only `3` in Expected Value. You do not need to type JSON quotes or a fragment such as `"value": "3"`. The JSON examples later on are references for manual file editing and addon development.
:::

## Supported Editors and Context

Select `CustomNPCs Stored Data` in the shared condition editor.

| Feature | Typical Location | `Player` | `Context Entity` | `World` |
| --- | --- | --- | --- | --- |
| Dialogue | Node, start route, and choice Conditions | Yes | Yes; current dialogue NPC | Yes |
| Teleporter | Interaction Conditions and destination Access Conditions | Yes | Yes; teleporter NPC | Yes |
| Quest | Availability → Additional Conditions → Conditions | Yes | Only when that evaluation path has an NPC context | Yes |
| Remnant Message | Use Conditions and Message Conditions | Yes | No; current runtime paths do not pass a context entity | Yes |

Be careful with `Context Entity` in quests. NPC-driven quest checks can provide an NPC, while automatic refreshes, commands, and background checks can run without one. Use `Player` or `World` when the result must be consistent on every evaluation path.

## Condition Fields

### Scope

`Scope` selects the object whose Stored Data is read.

| Editor Value | JSON Value | Data Owner | Matching Script Access |
| --- | --- | --- | --- |
| Player | `player` | Player being evaluated | `event.player.getStoreddata()` |
| Context Entity | `context_entity` | Entity passed with the condition, normally the current NPC | `event.npc.getStoreddata()` |
| World | `world` | Server world the evaluated player currently occupies | `event.player.getWorld().getStoreddata()` or `event.npc.getWorld().getStoreddata()` |

World Stored Data is dimension-specific. Do not assume that a value written in the Overworld refers to the same data owner in the Nether. DRM reads the evaluated player's current `ServerLevel`.

### Key

The Key must exactly match the string used with `put`, including letter case.

```js
event.player.getStoreddata().put("my_pack.quest.stage", 3);
```

The matching DRM Key is:

```text
my_pack.quest.stage
```

A blank Key always fails. Prefix keys to avoid collisions between script packs.

```text
my_pack.quest.stage
my_pack.boss.defeated
my_pack.dialogue.blacksmith_intro
```

### Operator

| Operator | Meaning | Expected Value Required |
| --- | --- | --- |
| `exists` | Pass when the Key exists | No |
| `not_exists` | Pass when Stored Data was reached successfully and the Key is absent | No |
| `==` | Pass when actual and expected values are equal | Yes |
| `!=` | Pass when actual and expected values differ | Yes |
| `>` | Actual number is greater than expected | Yes |
| `>=` | Actual number is greater than or equal to expected | Yes |
| `<` | Actual number is less than expected | Yes |
| `<=` | Actual number is less than or equal to expected | Yes |

Selecting `exists` or `not_exists` hides Value Type and Expected Value because only Key presence is checked.

### Value Type

| Value Type | Rule | Recommended Use |
| --- | --- | --- |
| Auto | An actual `Number` uses numeric comparison; an actual string uses string comparison | General use when the stored type is reliable |
| String | Exact, case-sensitive comparison; supports only `==` and `!=` | State names, IDs, flags |
| Number | Converts a number or numeric string to a finite double before comparing | Stages, scores, counters, timers |

String comparison is case-sensitive: `READY` and `ready` are different. String ordering with `>`, `>=`, `<`, or `<=` does not pass.

Number mode accepts a numeric value or numeric text such as `"3.5"`. Blank text, `abc`, `NaN`, and infinity are invalid and fail.

:::warning Booleans and Complex Objects
The comparator currently supports `Number` and string values. Boolean, array, map, and other complex objects can be checked with `exists`, but value comparisons fail. Store flags as `1`/`0` or `"yes"`/`"no"` when they need to be compared.
:::

## Script Recipes

### Store a player quest stage

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.stage", 3);
}
```

DRM condition:

```text
Scope: Player
Key: my_pack.quest.stage
Operator: >=
Value Type: Number
Expected Value: 3
```

### Store a string state

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.state", "ready");
}
```

DRM condition:

```text
Scope: Player
Key: my_pack.quest.state
Operator: ==
Value Type: String
Expected Value: ready
```

### Check only whether a value exists

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.intro.seen", 1);
}
```

Use `not_exists` for players who have not seen the introduction and `exists` for players who have. Do not enter an Expected Value for either operator.

### Store an NPC boss phase

```js
function init(event) {
    event.npc.getStoreddata().put("my_pack.boss.phase", 1);
}

function damaged(event) {
    if (event.npc.getHealth() <= event.npc.getMaxHealth() * 0.5) {
        event.npc.getStoreddata().put("my_pack.boss.phase", 2);
    }
}
```

Use this condition on dialogue or a teleporter attached to that NPC:

```text
Scope: Context Entity
Key: my_pack.boss.phase
Operator: >=
Value Type: Number
Expected Value: 2
```

This example does not pass in automatic quest evaluation or Remnant Message paths that have no context entity.

### Store a shared world chapter

```js
function interact(event) {
    event.npc.getWorld().getStoreddata().put("my_pack.world.chapter", "chapter_2");
}
```

DRM condition:

```text
Scope: World
Key: my_pack.world.chapter
Operator: ==
Value Type: String
Expected Value: chapter_2
```

Every player in that same world shares this value.

### Increment a numeric value safely

```js
function interact(event) {
    var data = event.player.getStoreddata();
    var current = data.has("my_pack.kill.count")
        ? Number(data.get("my_pack.kill.count"))
        : 0;

    if (!isFinite(current)) {
        current = 0;
    }

    data.put("my_pack.kill.count", current + 1);
}
```

Use `Value Type: Number`, `Operator: >=`, and `Expected Value: 10` to check for ten or more counts.

### Remove or reset a Key

```js
function interact(event) {
    event.player.getStoreddata().remove("my_pack.quest.stage");
}
```

After removal, `not_exists` passes while `exists` and all value comparisons fail. Setting a value to `0` is not the same as removing its Key.

### Display a value for debugging

```js
function interact(event) {
    var data = event.player.getStoreddata();
    var key = "my_pack.quest.stage";
    var value = data.has(key) ? String(data.get(key)) : "<missing>";
    event.player.message(key + " = " + value);
}
```

## Complete Example: Unlock a Dialogue Choice

The goal is to show a gatekeeper dialogue choice only after the player receives permission from another NPC.

### Permission NPC script

```js
function interact(event) {
    var data = event.player.getStoreddata();
    data.put("my_pack.gate.permission", "granted");
    event.player.message("You received permission to pass the gate.");
}
```

### Gatekeeper dialogue choice condition

```text
Type: CustomNPCs Stored Data
Scope: Player
Key: my_pack.gate.permission
Operator: ==
Value Type: String
Expected Value: granted
```

Attach this condition to an `Ask to open the gate` choice. Only permitted players see it. Attach the same condition to a Teleporter destination's Access Conditions when the actual movement must also be protected.

## Combining Conditions

Condition group modes work as follows.

| Mode | Result |
| --- | --- |
| AND | Every condition must be `true` |
| OR | At least one condition must be `true` |

To require quest stage 3 and a tripwire hook used as a key, place a Stored Data condition and an Item condition in one AND group.

```text
AND
├─ CustomNPCs Stored Data: my_pack.quest.stage >= 3
└─ Item: minecraft:tripwire_hook >= 1
```

A disabled condition group is not applied. Quest saves the enabled state and AND/OR mode under `Availability → Additional Conditions`, so verify that the group was not left disabled.

## JSON Field Reference

Normal editor users do not need to write this JSON. Use it for addon development, file inspection, or manual recovery.

```json
{
  "type": "cnpc_stored_data",
  "scope": "player",
  "key": "my_pack.quest.stage",
  "op": ">=",
  "valueType": "number",
  "value": "3"
}
```

| Field | Required | Allowed Values / Meaning |
| --- | --- | --- |
| `type` | Yes | Must be `cnpc_stored_data` |
| `scope` | Yes | `player`, `context_entity`, or `world` |
| `key` | Yes | Non-blank Stored Data Key |
| `op` | Yes | `exists`, `not_exists`, `==`, `!=`, `>`, `>=`, `<`, `<=` |
| `valueType` | For value comparison | `auto`, `string`, or `number` |
| `value` | For value comparison | Expected Value from the editor |

### Dialogue condition array

```json
{
  "conditionMode": "and",
  "conditions": [
    {
      "type": "cnpc_stored_data",
      "scope": "player",
      "key": "my_pack.quest.stage",
      "op": ">=",
      "valueType": "number",
      "value": "3"
    }
  ]
}
```

### Teleporter condition group

```json
{
  "interactionConditions": {
    "enabled": true,
    "conditionMode": "and",
    "conditions": [
      {
        "type": "cnpc_stored_data",
        "scope": "player",
        "key": "my_pack.gate.permission",
        "op": "==",
        "valueType": "string",
        "value": "granted"
      }
    ]
  }
}
```

Destination-specific conditions use the same group structure in that destination's `accessConditions`.

### Quest prerequisite conditions

```json
{
  "prerequisites": {
    "conditionsEnabled": true,
    "conditionMode": "and",
    "conditions": [
      {
        "type": "cnpc_stored_data",
        "scope": "player",
        "key": "my_pack.quest.stage",
        "op": ">=",
        "valueType": "number",
        "value": "3"
      }
    ]
  }
}
```

## Difference Between `stored` and `cnpc_stored_data`

The names are similar, but the storage systems are separate.

| Type | Editor Label | Storage Read | Connected to CustomNPCs `getStoreddata()` |
| --- | --- | --- | --- |
| `stored` | Legacy DRM Runtime Value | DRM dialogue runtime strings on the player | No |
| `cnpc_stored_data` | CustomNPCs Stored Data | CustomNPCs player, entity, or world Stored Data | Yes |

When a CustomNPCs script writes with `event.player.getStoreddata().put(...)`, select `cnpc_stored_data`. Choosing legacy `stored` by name will read a different location. There is no automatic migration or synchronization between the two stores.

## Fail-Closed Rules

The condition is server-authoritative. Invalid configuration and optional-mod failures do not accidentally grant access.

| Situation | Result |
| --- | --- |
| Key exists after successful access | `exists` is `true`; `not_exists` is `false` |
| Stored Data is accessible but Key is absent | Only `not_exists` is `true` |
| CustomNPCs is missing | Every operator returns `false` |
| CustomNPCs script API is unavailable | Every operator returns `false` |
| `Context Entity` is selected but no entity was supplied | Every operator returns `false` |
| Unknown Scope, Operator, or Value Type | `false` |
| Blank Key | `false` |
| Numeric conversion fails | `false` |
| Actual value is Boolean or a complex object | Value comparisons return `false` |

An unavailable CustomNPCs API is intentionally different from a missing Key. Therefore `not_exists` does not accidentally pass during an integration failure.

## Troubleshooting

### The condition always fails

Check the following in order.

1. Confirm that CustomNPCs is loaded on the server.
2. Confirm that Type is `CustomNPCs Stored Data`, not `Legacy DRM Runtime Value`.
3. Match Scope to the object used by the script.
4. Check Key case, punctuation, underscores, and whitespace.
5. For numeric comparison, use Number and verify that the stored value is numeric.
6. For Context Entity, verify that the current feature and execution path supply an NPC context.
7. Print the actual value from a CustomNPCs debug script.

### Log file

When resolving or reading the CustomNPCs integration API throws an exception, DRM logs each unique failure signature once to avoid log spam.

```text
config/dochi_rpg_maker/debug.log
```

Search for:

```text
CustomNPCs Stored Data access failed
```

A normally missing Key or an ordinary `false` comparison is not logged as an error.

### Common mistakes

| Mistake | Fix |
| --- | --- |
| Script writes Player data but Scope is World | Change Scope to Player |
| Script writes numeric `3` and condition compares String `03` | Compare Number `3` or standardize the stored format |
| Script writes `ready` but condition expects `READY` | Match letter case |
| Remnant Message uses Context Entity | Use Player or World |
| Key is set to `0` and `not_exists` is expected | Call `remove(key)` to delete the Key |
| Boolean `true` is compared with `==` | Store a number or string such as `1` or `"true"` |

## Recommended Conventions

- Prefix keys as `pack_id.system.field` to prevent collisions.
- Store stages and counters as numbers; store state names and IDs as strings.
- Keep one value type for each Key across every script that writes it.
- Prefer Player or World when a condition must work on every evaluation path.
- Remember that a World value is shared by all players in that dimension.
- Prefer the DRM condition editor over manual JSON editing.

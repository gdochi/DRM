---
title: Bombing and Support Timelines
slug: expanded-support-timeline
order: 330
description: Schedule bombing, gun support, vehicle reinforcements, and NPC movement together.
product: dochi-warfare-expanded
category: Combat support
section: support
status: Draft
version: 0.3.0
audience: Map creators and operators
---

## Author a timeline

1. Open the gimmick editor from editor selection.
2. Choose `Create New` for an empty document or `Use Default` for a bombing draft at your position.
3. Set the origin and add action types to the timeline.
4. Configure each action's tick, coordinates, support unit, and lifetime.
5. Name and save the file with `Save As`.
6. Use the run-at-my-position action to invoke the saved layout relative to your position.

Save pending changes first. If another user changed the file, refresh before running it. The editor preview shows the authored layout; test actual navigation and hits in the intended terrain.

| Action | Settings and result |
| --- | --- |
| Bombing | Aircraft, bomb, target, heading, altitude, attack shape, and interval; uses native free-fall weapons. |
| Vehicle support | Vehicle, count, start/destination, spacing, faction, and guard radius; moves to defend the destination. |
| Gun support | Air/ground mode, actual vehicle weapon, approach, firing corridor, duration, and shot cap. |
| NPC movement | Spawns selected DW NPC clones or temporarily directs existing DW NPCs in an area. |

The server supplies eligible gun-support weapons. Bombs, rockets, missiles, and low-speed main guns are excluded. Air support attacks and exits; ground support sweeps a corridor with its turret. Native RPM, ammunition, heat, reload, and safety checks remain active.

Choose NPC clones from the DW library. Area selection requires CustomNPCs with DW AI enabled and excludes riding, hired, or already-directed NPCs. Existing combat takes priority before movement resumes. There is no teleport fallback. Factions use numeric IDs; clone file references differ from display names.

## Timing and origin

20 ticks equal one second at 20 TPS. A bombing action's tick is the **first bomb release**, not impact. Vehicle, gun, and NPC support ticks start spawning or movement. Gun-support duration starts on entering weapon range; exit or lifetime expiry may end it sooner.

`lifetime_ticks` limits temporary support. Spawned NPCs are removed at expiry; existing area-selected NPCs regain their previous movement settings without overwriting edits made during execution. Temporary support vehicles cannot be boarded, cloned, or captured in soul stones.

## Operator commands

Permission level 2 is required. Save `my_support` first and omit `.json` from its command name.

```text
/dw callgimmicks my_support
/dw callgimmicks my_support ~ ~ ~
/dw bombard ~ ~ ~ superbwarfare:ju_87 superbwarfare:sc_250 10
```

Without coordinates, the saved layout runs in place. With coordinates, targets, starts, and destinations shift by the difference from the saved `origin`. The last example releases its first bomb after 10 ticks. Check installed aircraft/payload IDs with command completion. The one-shot command supports points and `area`; author line layouts in the editor/JSON.

## Files and JSON reference

Files live at `config/dochi_warfare/vehicle_ai/gimmicks/<name>.json`. Built-in examples install only when missing, preserving user files.

The current schema is `dochi.warfare.gimmicks.v6`; v1–v5 remain readable. `origin` defines the layout anchor, `steps` holds actions, and `at_tick` schedules them. Each step contains one of `bombard`, `vehicle_support`, `fire_support`, or `npc_move`. Start from editor-generated files when editing JSON.

Bombing fields `explosion_damage` and `direct_damage` are base HP damage values. Zero disables that damage component; an empty editor value retains the native weapon value. Native falloff and armor still affect actual damage. These fields do not change blast radius or terrain destruction.

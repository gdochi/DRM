---
title: SuperbWarfare Vehicle AI
slug: warfare-vehicle-ai
order: 370
description: Configure autonomous SuperbWarfare movement, targets, weapons, ammo, profiles, commands, and soul stones.
product: dochi-warfare
category: Vehicle AI
section: vehicles
status: Draft
version: 0.2.4
audience: Scenario creators and operators
tags:
  - SuperbWarfare
  - vehicle
  - ai
---

## Requirements and editor

Vehicle AI is an optional integration for SuperbWarfare 0.8.9 final build `6effe4385`. In Creative mode, hold `DW Npc Core` and right-click a supported SuperbWarfare vehicle. This opens a vehicle creator editor, not the CustomNPCs NPC editor.

DW drives passengerless vehicles through native `processInput`, engine physics, turret aiming, weapon firing, energy, sound, and collision. It does not create a fake passenger or steer by directly setting velocity. Disable vehicle AI before trying to ride the vehicle.

## Movement modes

| Idle mode | Behavior |
| --- | --- |
| `Stationary` | Remain at the saved position until combat or an explicit order requires action. |
| `Area Patrol` | Select destinations around the saved home position. |
| `Return Only` | Return home, then wait. |
| `Route Patrol` | Follow saved waypoints; if none exist, use generated home-relative points. |

Combat movement is configured separately as `Hold Position`, `Advance`, or `Retreat`. Minimum-range repositioning can temporarily move even a holding vehicle away from a target when the selected reference weapon is too close to fire.

Pathing classifies the native engine as wheeled, tracked, or ship and applies separate footprint, step, slope, support, turn-radius, obstacle, and stuck-recovery rules. It plans only through loaded terrain. This is not autonomous flight support for helicopters or aircraft.

## Awareness and targets

Vehicle targeting can use entity IDs, required/rejected scoreboard tags, faction rules, and friendly-fire protection. Awareness includes detection radius, horizontal field of view, reaction delay, close detection, damage alerts, faction defense, target memory, and sound detection.

`Nearest` priority selects by distance. `Custom` priority weights personnel/living targets, ground or surface vehicles, and air vehicles. Retaliation bonus, current-target retention, distance, and the configured switch gap are still evaluated by the server.

Owners, scoreboard teammates, and entities with the matching `dochi_faction:<factionId>` tag are protected. The explicit `dochi_warfare_vehicle_target` scoreboard tag can mark a target, but it does not bypass owner, team, faction, range, or friendly-fire checks.

## Weapons and ammunition

Each native vehicle weapon can be configured independently:

* Use on/off and a 0-100 preference
* Accuracy
* Personnel, ground/surface vehicle, and air target categories
* Entity, faction, tag, and vehicle-health conditions
* Native/default or manual minimum and maximum range
* One, a configured count, or all eligible weapons per attack opportunity

Ammunition can be global or per weapon and either infinite or limited. Magazine size, reserve rounds, and reload time are DW data; the mod does not create physical ammo or magazine items. Native weapon state and firing remain owned by SuperbWarfare.

## Profiles, soul stones, and clones

`Save As` and `Load` store reusable vehicle AI profiles under:

```text
config/dochi_warfare/vehicle_ai/profiles/
```

Profiles omit live entity identity and world-position state. Empty CustomNPCs soul stones can capture a passengerless SuperbWarfare vehicle and redeploy it while preserving native vehicle data and DW combat settings. The `Clone` button saves a sanitized server-side template; right-click air with `DW Npc Core` to summon it from the clone library.

## Operator commands

The commands require permission level 2. Look directly at a SuperbWarfare vehicle within 24 blocks, then use:

```text
/dochi_warfare vehicle_ai enable
/dochi_warfare vehicle_ai disable
/dochi_warfare vehicle_ai wander
/dochi_warfare vehicle_ai guard
/dochi_warfare vehicle_ai engage
/dochi_warfare vehicle_ai move_to_me
/dochi_warfare vehicle_ai return_home
/dochi_warfare vehicle_ai patrol_add
/dochi_warfare vehicle_ai patrol_clear
/dochi_warfare vehicle_ai status
```

The GUI is the primary creator workflow. Commands are useful for live operation, quick orders, and status diagnostics.

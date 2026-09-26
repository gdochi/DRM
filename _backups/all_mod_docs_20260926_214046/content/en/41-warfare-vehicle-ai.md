---
title: SuperbWarfare Vehicle AI
slug: warfare-vehicle-ai
order: 370
description: Configure SuperbWarfare surface and air movement, targets, weapons, virtual ammo, NPC crew, profiles, and commands.
product: dochi-warfare
category: Vehicle AI
section: vehicles
status: Draft
version: 0.2.7
audience: Scenario creators and operators
tags:
  - SuperbWarfare
  - vehicle
  - ai
---

## Requirements and editor

Vehicle AI is an optional integration for SuperbWarfare 0.8.9-final, Minecraft 1.20.1 build `6effe4385`. In Creative mode, hold `DW Npc Core` and right-click a supported vehicle. This opens a server-authoritative vehicle editor separate from the CustomNPCs NPC editor.

DW uses the native engine's `processInput` or flight controls. SuperbWarfare continues to own engine physics, velocity, collision, energy, turrets, weapons, reloads, projectiles, and sounds; DW does not directly overwrite position, rotation, or velocity. A player who boards an AI vehicle is dismounted for safety, so disable AI before driving it. CustomNPC crew placed through the vehicle editor can remain aboard.

## Movement modes

| Idle mode | Behavior |
| --- | --- |
| `Stationary` | Remain at the saved position until combat or an explicit order requires movement. |
| `Area Patrol` | Distribute destinations across home-area sectors and avoid recently visited sectors. |
| `Return Only` | Return home, then wait. |
| `Route Patrol` | Follow saved waypoints and apply the configured wait time at each point. |

Combat movement is configured separately as `Hold Position`, `Advance`, or `Retreat`. Minimum-range maintenance can temporarily back away when the reference weapon is too close or its turret cannot depress far enough to hit the target.

### Ground and water movement

Wheeled, tracked, and ship profiles use separate footprint, turn-radius, step, slope, support, obstacle, water-boundary, and stuck-recovery behavior. Routes are planned only through loaded terrain with bounded search work.

In 0.2.7, Area Patrol scores eight home-relative sectors instead of repeating a small circle around the current position. Throttle and braking ramp from remaining distance, current speed, stopping distance, turn demand, and obstacle state, avoiding full-power launches for short moves.

### Helicopters and fixed-wing aircraft

Helicopters use native rotor power and mouse input for takeoff, altitude hold, forward acceleration, braking, obstacle climb, destination approach, hover, and geofence return. With enough patrol radius, Area Patrol connects longer arcs rather than fully stopping at every short point.

Fixed-wing aircraft use native throttle, pitch, roll, and landing-gear inputs for ground roll, takeoff, climb, cruise, approach, terrain avoidance, and loiter near a destination. Because fixed-wing aircraft cannot stop in the air, they do not support `Pause movement before fire` and need enough room to turn.

## Awareness and targets

Vehicle targeting combines entity IDs, required/rejected scoreboard tags, faction rules, and owner/team/friendly protection. Awareness includes detection radius, horizontal field of view, reaction delay, close detection, damage alerts, faction defense, target memory, and sound detection.

`Nearest` selects by distance. `Custom` combines personnel/living, ground/surface vehicle, and air-vehicle weights with retaliation bonus, current-target retention, distance, and switch gap. The `dochi_warfare_vehicle_target` tag can mark an explicit target but does not bypass owner, team, faction, range, or friendly-fire checks.

## Weapons and virtual ammunition

The `Weapons` page owns weapon enablement. Every native mount has independent settings for:

- ON/OFF and 0-100 preference
- Accuracy and personnel, ground/surface, and air target categories
- Entity, faction, tag, and vehicle-health conditions
- Native/default or manual minimum and maximum range
- Pause-before-fire behavior (except fixed-wing) and fire-wait ticks
- Global ammo inheritance or per-weapon infinite/limited magazine, reserve, and reload timing
- Always active or require a CustomNPC in the linked control seat

`Weapon use mode` selects only weapons that are ON and currently eligible, then uses one, a configured count, or every eligible weapon per attack opportunity. An OFF weapon does not participate in candidate or reference-range selection.

Ammunition is virtual DW data; no physical ammo or magazine items are created. Version 0.2.7 synchronizes belt-fed virtual rounds with SuperbWarfare's native fire-readiness check, then reflects rounds consumed by the native shot.

## NPC crew

The `Crew` page displays vehicle seats on a top or side map. Selecting a seat shows its local position, occupancy, driver/turret/weapon-station/passenger role, hidden-model state, and held-item visibility.

For an empty seat, `Board NPC` can use:

- An NPC JSON clone from the server Entity Clone Library
- An NPC-filled soul stone in the player's main inventory, armor, or offhand slot

The server revalidates Creative permission, 64-block distance, seat state, NPC type, clone path, soul-stone slot, and faction hostility. A new NPC is sanitized of UUID, position, ownership, and live combat state, then placed in the exact selected seat. Only CustomNPC occupants can be dismounted from this editor.

## Profiles, soul stones, and clones

`Save As` and `Load` store reusable vehicle AI profiles under:

```text
config/dochi_warfare/vehicle_ai/profiles/
```

Profiles omit live entity identity and world-position state. Empty CustomNPCs soul stones can capture supported SuperbWarfare vehicles and redeploy them while preserving native data and DW settings. `Clone` stores a sanitized server vehicle template; right-click air with `DW Npc Core` to summon it from the clone library.

## Operator commands

Commands require permission level 2. Look directly at a SuperbWarfare vehicle within 24 blocks, then use:

```text
/dw vehicle_ai enable
/dw vehicle_ai disable
/dw vehicle_ai wander
/dw vehicle_ai guard
/dw vehicle_ai engage
/dw vehicle_ai move_to_me
/dw vehicle_ai return_home
/dw vehicle_ai patrol_add
/dw vehicle_ai patrol_clear
/dw vehicle_ai status
```

The GUI is the primary creator workflow. Commands are intended for live operation, quick orders, and status diagnostics.

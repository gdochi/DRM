---
title: SuperbWarfare Vehicle AI
slug: warfare-vehicle-ai
order: 370
description: Configure SuperbWarfare surface and air movement, targets, weapons, virtual ammo, NPC crew, profiles, and commands.
product: dochi-warfare
category: Vehicle AI
section: vehicles
status: Draft
version: 0.3.1
audience: Scenario creators and operators
tags:
  - SuperbWarfare
  - vehicle
  - ai
---

On Forge and NeoForge 0.3.1, **DWE** supplies the vehicle functions below. See [DWE setup and files](#dochi-warfare-expanded/expanded-overview), [vehicle reactions](#dochi-warfare-expanded/expanded-vehicle-gimmicks), and [support timelines](#dochi-warfare-expanded/expanded-support-timeline).

Current builds: DW 0.3.1 for Forge 1.20.1 and DW 0.3.1 for NeoForge 1.21.1. Vehicle AI on both loaders requires the separate DWE 0.3.1 addon. Check [loader-specific installation](#dochi-warfare/warfare-setup) for external gun/vehicle dependencies.

## Requirements and editor

Vehicle AI is an optional SuperbWarfare integration. Match the loader and supported version described in the installation guide. In Creative mode, hold `DW Npc Core` and right-click a supported vehicle. This opens a vehicle editor separate from the infantry NPC editor.

DW uses the native engine's `processInput` or flight controls. SuperbWarfare continues to own engine physics, velocity, collision, energy, turrets, weapons, reloads, projectiles, and sounds; DW does not directly overwrite position, rotation, or velocity. A player who boards an AI vehicle is dismounted for safety, so disable AI before driving it. DNPC or CustomNPCs crew placed through the vehicle editor can remain aboard.

![Vehicle Overview summary of detection, memory and friendly protection.](assets/media/guides/warfare-expanded-031-neo1211/dwe-ai.png "DWE 0.3.1 / NeoForge 1.21.1. Overview summarizes current values; vehicle settings are stored separately from infantry NPC Senses.")

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

In 0.2.9, Area Patrol scores eight home-relative sectors instead of repeating a small circle around the current position. Throttle and braking ramp from remaining distance, current speed, stopping distance, turn demand, and obstacle state, avoiding full-power launches for short moves.

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
- Always active or require DNPC/CustomNPCs crew in the linked control seat

`Weapon use mode` selects only weapons that are ON and currently eligible, then uses one, a configured count, or every eligible weapon per attack opportunity. An OFF weapon does not participate in candidate or reference-range selection.

Use DW’s ammo settings for vehicle stock and reloads; you do not need to place ammo or magazines in a crew member’s offhand.

## NPC crew

The `Crew` page displays vehicle seats on a top or side map. Selecting a seat shows its local position, occupancy, driver/turret/weapon-station/passenger role, hidden-model state, and held-item visibility.

For an empty seat, `Board NPC` can use:

- An NPC JSON clone from the server Entity Clone Library
- An NPC-filled soul stone in the player's main inventory, armor, or offhand slot

The server revalidates Creative permission, 64-block distance, seat state, NPC type, clone path, soul-stone slot, and faction hostility. A new NPC is sanitized of UUID, position, ownership, and live combat state, then placed in the exact selected seat. NPC crew can be dismounted from this editor. DNPC uses NPC JSON clones; soulstones are a separate source requiring CustomNPCs.

![The Crew seat map of the base SuperbWarfare M1A2.](assets/media/guides/warfare-expanded-031-neo1211/dwe-crew.png "DWE 0.3.1 / NeoForge 1.21.1. Select a seat number to inspect its role and occupant on the right. This is an empty seat map, not a completed boarding result. It is the base SuperbWarfare vehicle, distinct from MCSP M1A2.")

### Watch the crew and vehicle AI

Two prepared DNPC crew members board the base SuperbWarfare M1A2, which follows a **Move To** order. It then switches to stationary combat and fires at a practice target. This is the runtime result; use the Crew page above to choose NPC sources and seats, and configure movement and target rules before enabling AI.

![Two NPCs board an M1A2, the AI drives it, and its weapons fire at a practice target.](assets/media/guides/runtime-videos-20261106/vehicle-ai-crew-drive.mp4 "DW + DWE 0.3.2 + DNPC 0.1.3 + SuperbWarfare 0.8.9.1 / NeoForge 1.21.1, English UI. Prepared crew and policy → boarding → AI movement → target detection and fire.")

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

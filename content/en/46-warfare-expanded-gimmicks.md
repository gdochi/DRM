---
title: Vehicle Reactions
slug: expanded-vehicle-gimmicks
order: 320
description: Configure firing cues, damage reactions, smoke, dismounts, and bombing.
product: dochi-warfare-expanded
category: Vehicles
section: vehicles
status: Draft
version: 0.3.3
audience: Combat creators
---

## Enable a reaction

Enable an entry in the vehicle editor's gimmick list, set its conditions, and save. All entries default to OFF. The server checks the actual engine, weapons, smoke system, and seats. `Show all` also exposes unsupported saved settings, with editing disabled.

| Gimmick | Behavior and conditions |
| --- | --- |
| Firing cue | Plays when a weapon's firing wait begins; preserves aim, ammunition, and delay rules. |
| Hit retreat | Briefly retreats after sufficient actual HP loss since the last AI update; wheel/track vehicles. |
| Emergency smoke | Requests native smoke on damage, low HP, or retreat start; excludes aircraft flares. |
| Low-health burst | Changes the next burst's length/pause when base burst fire is enabled; preserves native fire rate. |
| NPC combat dismount | Unloads selected transport passengers with a nearby valid target after 10 stable low-speed ticks. |
| Low-health escape | Briefly moves away from the target during a low-health episode. |
| Reload retreat | Retreats while all enabled, crew-eligible weapons reload; ends when a usable weapon finishes or the target is lost. |
| Hit sidestep | Moves perpendicular to the target direction after sufficient damage. |
| Bombing | Uses `LEVEL`, `DIVE`, or `CARPET` on validated fixed-wing aircraft with free-fall weapons. |

1. Open the vehicle with **DW Npc Core**, then select **Gimmicks** on the left.
2. Select a reaction name, configure its conditions and timing on the right, and switch its **OFF** button on.
3. Configure firing cues per weapon under **Weapons → chosen weapon → Fire wait / Preparation cue**. A zero firing wait produces no cue.
4. Check **AI enabled** and the movement mode, then **Save**. The screenshot below is the initial state with AI and reactions still off.

![The M1A2 Gimmicks list and Shot preparation cue instructions.](assets/media/guides/warfare-expanded-031-neo1211/dwe-reactions.png "DWE 0.3.1 / base SuperbWarfare M1A2 / NeoForge 1.21.1. Show: supported only filters reactions for this vehicle. OFF is the unconfigured state, not a running effect.")

## Health and timing

For 500 maximum HP, **2% health loss** means at least 10 actual HP lost since the previous AI update. **25% remaining health** means 125 HP or less. Low-health reactions require recovery above the threshold by 5 percentage points before rearming.

20 ticks equal one second at 20 TPS. Native smoke ammunition and reload rules apply in addition to the reaction cooldown. DWE does not refill smoke or add invulnerability or target-blocking effects.

## Movement and passengers

Simultaneous movement priority is hit retreat → hit sidestep → low-health escape → reload retreat. Reactions use existing home bounds and navigation without teleporting. Disable movement in `STATIONARY` or `HOLD` to block reactions in those modes. Firing during a reaction still respects normal stop-before-fire, aim, and safety rules.

Combat dismounts affect existing DNPC or CustomNPCs transport passengers on wheel/track vehicles. Drivers, gunners, weapon seats, and players are excluded. Unsafe exits prevent dismounting. It neither creates NPCs nor automatically boards them again; per-seat/NPC completion records persist.

## Bombing versus support calls

A vehicle bombing gimmick controls an existing AI aircraft: `LEVEL` for level precision attacks, `DIVE` for dive attacks, and `CARPET` for repeated area drops. Native weapons, ammunition, RPM, and flight physics still apply.

To call temporary aircraft or reinforcements at scheduled times, use the separate [support timeline](#dochi-warfare-expanded/expanded-support-timeline).

## Engine evacuation versus combat dismount

**NPC combat dismount** is the transport-passenger reaction described above. Engine-failure evacuation in 0.3.3 is separate and also includes drivers and gunners. See [vehicle component damage](#dochi-warfare/warfare-vehicle-ai) for stop, exit and recovery conditions.

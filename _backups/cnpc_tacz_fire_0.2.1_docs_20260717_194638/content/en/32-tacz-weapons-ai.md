---
title: Weapons, Stance, and Tactical AI
slug: tacz-weapons-ai
order: 330
description: How to configure firearm stance, movement, awareness, weapon pools, and melee fallback.
product: cnpc-tacz-fire
category: Combat AI
section: combat-ai
status: Draft
version: 0.2.0
audience: Firearm NPC creators
tags:
  - weapon
  - stance
  - ai
---

## Stance modes

`Stance` decides which combat form the managed NPC should use.

| Stance | Behavior |
| --- | --- |
| `Idle` | Stop bridge combat and put away managed weapons. |
| `Ranged` | Use the managed TACZ ranged weapon only. |
| `Melee` | Use the stored melee weapon only. |
| `Auto` | Swap between ranged and melee based on distance. The ranged weapon remains visible during idle. |
| `Auto Hidden` | Swap during combat, but keep empty hands outside combat. |

`Stance Mode: General` uses the normal stance settings. `Stance Mode: Advanced` applies one conditional rule, such as health below a ratio, target entity, target faction, or target tag. Advanced mode intentionally has one active rule to avoid conflicting behavior.

## Fire settings

| Setting | Practical meaning |
| --- | --- |
| `Max Distance` | Maximum target distance for TACZ ranged fire. Targets beyond this are ignored by the addon. |
| `Melee Switch Range` | Distance where `Auto` stance switches to melee. Actual hit reach still comes from CustomNPCs melee behavior. |
| `RPM Override` | Fixed target fire rate. `0` means use the selected TACZ gun's native RPM. |
| `RPM Min` and `RPM Max` | Random target RPM range. When active, it overrides fixed RPM. |
| `Accuracy %` | NPC accuracy percent. `100` adds no extra aim error; lower values add spread. |
| `Burst Fire` | Fires a controlled group of shots, then pauses before the next burst. |

Start with native gun RPM and `Accuracy %` near your desired baseline. Add random RPM only after the gun, target, line-of-sight, and ammo loop are working.

## Damage policies

Version 0.2.0 lets each NPC choose how firearm and melee damage is calculated.

| Location | Policy |
| --- | --- |
| `Gun` | `Gun Spec` keeps the selected TACZ gun's native bullet damage. `Custom` applies fixed damage to this NPC's managed bullet without changing the original gun data. |
| `Melee` | `Weapon Spec` uses the selected item's attack attributes. `Custom` uses fixed melee damage. |
| `Melee` | Knockback and attack speed can independently use weapon attributes or fixed custom values. Custom attack speed is measured in attacks per second. |

CustomNPCs' default melee damage does not override these managed melee policies. Confirm weapon-native behavior first, then add custom values.

## Tactical movement

`Tactical Move` controls how the addon steers ranged combat movement:

| Mode | Use case |
| --- | --- |
| `Hold` | Static guards, turrets, snipers, staged boss phases. |
| `Spread` | Squads that should separate from nearby allies. |
| `Compact` | Squads that regroup instead of scattering. |
| `Advance` | Assault NPCs that press toward the target. |
| `Retreat` | Defensive NPCs that open distance. |

`Engagement` adds target-distance behavior. `Hold` does not reposition for distance, `Advance` approaches until `Approach Distance`, and `Retreat` backs away until `Retreat Distance`.

Useful movement toggles include `Move While Firing`, `Retreat Fire`, and `Keep Distance Fire`. `Keep Distance Fire` tries to maintain a preferred range, but it is ranged-only and locks out melee switching.

## Awareness and idle control

Use awareness settings to decide when the NPC may enter combat:

| Setting | Meaning |
| --- | --- |
| `Detect Distance` | Blocks where idle NPCs first detect a visible target. This is not the same as firing range. |
| `Detect Angle` | Horizontal detection cone. `360` allows all-around detection. |
| `Combat Delay Ms` | Time the NPC watches a detected target before confirmed combat. |
| `Instant Combat Angle` | Front cone that can skip the delay and enter combat immediately. |
| `Close Detection` | Lets targets inside `Close Detect Distance` bypass the horizontal detection angle. Disable it for backstab or assassination-style NPCs. |

`Sound Detection` reacts to explicit player TACZ gunshot, TACZ reload, block-break, and block-place events at separate ranges. Each range is capped by `Detect Distance`, and creative or spectator players do not create stimuli. Investigation can be `Off`, `Look Only`, or `Move To Source`. Active combat takes priority, and a position-locked stance falls back to looking instead of leaving its post.

Idle movement has four modes: `Stationary`, `Area Patrol`, `Return Only`, and `Route Patrol`. Area and Route patrols use the GUI `Default Walk Speed` and keep a valid A* path active. They do not replace failed pathfinding with direct movement into a wall; unreachable points are retried within a bounded limit and then skipped. Patrol coordinates resolve to nearby standable ground, and arrival checks include vertical distance for lower one-block waypoints.

## Weapon and appearance pools

`Gun` reads TACZ gun stacks from the player's inventory. The selected gun can be saved directly, or multiple guns can be added to a random weapon pool. Pool rolls can happen on CustomNPCs init events such as respawn, chunk-load initialization, clone restore, or soul-stone restore.

`Melee` reads non-TACZ items from the player's inventory. If Better Combat support is available, detected attack animation IDs can be used for the selected melee item. Empty-hand melee attack support is also available for melee-capable setups.

`Visual & FX` stores each random skin as a CustomNPCs texture path plus an explicit `Steve` or `Alex` model. It does not alter the supplied texture. `Armor` stores full sets in real head, chest, legs, and feet slots. The Gun, Melee, and Armor previews show the selected model, skin, armor, and weapon together.

## Balancing order

1. Confirm `Ranged` or `Auto` stance with one gun.
2. Tune `Max Distance` and line-of-sight behavior.
3. Tune `Accuracy %` and native RPM.
4. Tune firearm and melee damage policies.
5. Add `Move While Firing` or tactical movement.
6. Add melee switching and empty-ammo fallback.
7. Add random gun, skin, and armor pools.
8. Add advanced stance rules only after the normal behavior is stable.

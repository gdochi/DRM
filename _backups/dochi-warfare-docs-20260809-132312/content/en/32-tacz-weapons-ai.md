---
title: Weapons, Stance, and Tactical AI
slug: tacz-weapons-ai
order: 330
description: How to configure firearm stance, movement, awareness, weapon pools, and melee fallback.
product: cnpc-tacz-fire
category: Combat AI
section: combat-ai
status: Draft
version: 0.2.3
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

`Stance Mode: General` uses the normal stance settings. `Stance Mode: Advanced` applies one conditional rule such as `Always`, health below a ratio, target entity, target faction, or target tag. `Always` and the NPC-health condition can be evaluated without a current combat target; only target entity, faction, and tag conditions require a living target. Advanced mode intentionally has one active rule to avoid conflicting behavior.

## Fire settings

| Setting | Practical meaning |
| --- | --- |
| `Max Distance` | Maximum target distance for TACZ ranged fire. Targets beyond this are ignored by the addon. |
| `Melee Switch Range` | Distance where `Auto` stance switches to melee. Actual hit reach still comes from CustomNPCs melee behavior. |
| `RPM Mode` | Choose exactly one source: `TACZ Native`, `Fixed`, or `Random Range`. Only the values used by that mode are shown. |
| `Fixed RPM` | Fixed target fire rate used by `RPM Mode: Fixed`. |
| `RPM Min` and `RPM Max` | Target fire-rate range used by `RPM Mode: Random Range`. |
| `Fixed Accuracy %` | Accuracy used continuously while `Accuracy Ramp` is disabled. `100` adds no extra aim error. |
| `Ramp Start Accuracy %` | Starting accuracy while `Accuracy Ramp` is enabled. |
| `Ramp Max Accuracy %` | Maximum accuracy after eligible tracking. It must be greater than the starting value. |
| `Ramp Time Ms` | Accumulated eligible tracking time needed to reach maximum accuracy. |
| `Ramp Max Range` | Maximum distance where ramp progress may accumulate. |
| `Min Target Speed` | Minimum horizontal player speed needed to advance the ramp. |
| `Burst Minimum Shots` / `Burst Maximum Shots` | Selects a new inclusive shot count for each configured burst. Equal values create fixed-length bursts. |

`Accuracy Ramp` progresses only while the visible target is a moving player inside the configured range and above the minimum speed. Progress pauses while the player is stationary or out of range, then resets when the target or active General/Advanced profile changes. General and Advanced can use independent ramp settings.

Start with `RPM Mode: TACZ Native` and fixed accuracy. Add random RPM, burst ranges, and accuracy ramping one at a time after the gun, target, line-of-sight, and ammo loop are working.

## Damage policies

Version 0.2.0 lets each NPC choose how firearm and melee damage is calculated.

| Location | Policy |
| --- | --- |
| `Gun` | `Gun Spec` keeps the selected TACZ gun's native bullet damage. `Custom` applies fixed damage to this NPC's managed bullet without changing the original gun data. |
| `Melee` | `Weapon Spec` uses the selected item's attack attributes. `Custom` uses fixed melee damage. |
| `Melee` | Knockback and attack speed can independently use weapon attributes or fixed custom values. Custom attack speed is measured in attacks per second. |

CustomNPCs' default melee damage does not override these managed melee policies. Confirm weapon-native behavior first, then add custom values.

## Better Combat compatibility

Version 0.2.1 adds a per-NPC `Better Combat Compatibility` toggle under `Melee`. It defaults to ON when Better Combat is installed and cannot be used when Better Combat is absent.

When enabled, the NPC resolves the Better Combat attack set and weapon pose registered for the held item. Combo order, attack conditions, two-handed or offhand conditions, and item transforms follow the registered weapon data. Attack intervals and damage timing use the held item's effective `ATTACK_SPEED`. The melee attack-speed policy is shown as `Weapon Spec (locked)`, and a custom attack speed does not apply until this compatibility toggle is disabled.

Exact Better Combat NPC motion playback on the client requires both Better Combat and Mob Player Animator. If Mob Player Animator is absent or the registered weapon motion cannot be played, the addon does not create an imitation motion; it uses a vanilla main-hand swing.

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

`Reposition Minimum Ms` and `Reposition Maximum Ms` control how long one tactical movement plan remains active before the NPC reconsiders it. A new duration between those values is selected for each plan. General and Advanced can use different ranges.

`Suppressive Fire` is different from target tracking. After line of sight is lost during combat, it may fire real TACZ rounds only at the last position the NPC actually saw, for the configured `Suppression Time Ms`. It does not follow the hidden target's current position and still consumes ammunition through the normal gun state. `Post-Fire Watch Ms` keeps the NPC aiming at that point after firing stops without spending more ammunition.

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

`Faction Defense` lets a damaged TACZ Fire NPC alert same-faction TACZ Fire allies inside `Faction Alert Radius`. An assisting ally may move to help before it sees the attacker, but it still needs final line of sight before firing. Mercenary owner-hit tolerance and friendly-target validation remain in force, so faction defense does not bypass contract or target rules.

Idle movement has four modes: `Stationary`, `Area Patrol`, `Return Only`, and `Route Patrol`. Area and Route patrols use the GUI `Default Walk Speed` and keep a valid A* path active. They do not replace failed pathfinding with direct movement into a wall; unreachable points are retried within a bounded limit and then skipped. Patrol coordinates resolve to nearby standable ground, and arrival checks include vertical distance for lower one-block waypoints.

## Non-combat weapon poses

`Non-Combat Weapon Pose` controls how an NPC holds a ranged weapon outside combat.

| Pose | Behavior |
| --- | --- |
| `TACZ Default (Custom Off)` | Disables the custom idle pose and leaves presentation to TACZ. |
| `Low Ready` | Holds the gun in a lowered ready position. |
| `High Ready` | Holds the gun in a raised ready position. |
| `Aim Ready` | Keeps an aiming-ready stance outside combat. |
| `Custom Pose` | Uses a pose JSON saved with `CTF Pose Core`. |

Low Ready and High Ready remain active while standing, Area/Route patrolling, or returning home. With the default action mapping, they yield to TACZ aiming, firing, and reload behavior when a target is detected or combat begins. Use the `Pose` category for finer per-action mapping.

## Weapon and appearance pools

`Gun` reads TACZ gun stacks from the player's inventory. The selected gun can be saved directly, or multiple guns can be added to a random weapon pool. Pool rolls can happen on CustomNPCs init events such as respawn, chunk-load initialization, clone restore, or soul-stone restore.

`Melee` reads non-TACZ items from the player's inventory. Better Combat integration does not save one replacement animation ID. At attack time, it resolves the attack set and pose actually registered for the held weapon. Empty-hand melee attack support is also available for melee-capable setups.

`Visual & FX` stores each random skin as a CustomNPCs texture path plus an explicit `Steve` or `Alex` model. It does not alter the supplied texture. `Armor` stores full sets in real head, chest, legs, and feet slots. The Gun, Melee, and Armor previews show the selected model, skin, armor, and weapon together.

Version 0.2.1 shows chance fields directly on weapon, skin, and armor pool rows. Editing one chance does not redistribute the other entries, and a multi-entry pool must total `100%` before saving. `Equalize` redistributes entries only when pressed, while a one-entry pool stays at `100%`. The armor pool shows up to five rows at once; use the mouse wheel or its internal scrollbar for the remaining entries.

## Balancing order

1. Confirm `Ranged` or `Auto` stance with one gun.
2. Tune `Max Distance` and line-of-sight behavior.
3. Tune fixed accuracy and `RPM Mode: TACZ Native`.
4. Tune firearm and melee damage policies.
5. Add `Move While Firing` or tactical movement.
6. Add melee switching and empty-ammo fallback.
7. Add random gun, skin, and armor pools.
8. Add burst ranges, accuracy ramping, and random reposition timing only after normal behavior is stable.
9. Add advanced stance rules.
10. Add suppressive fire and experimental cover last, after ordinary movement and line-of-sight behavior are confirmed.

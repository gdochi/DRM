---
title: Cover, Suppressive Fire, and Faction Defense
slug: tacz-cover-suppression
order: 335
description: Configure cover triggers, suppressive fire and post-fire watch, faction assistance, limits, and recovery behavior.
product: cnpc-tacz-fire
category: Combat AI
section: combat-ai
status: Draft
version: 0.2.3
audience: Encounter designers
tags:
  - cover
  - suppression
  - faction
---

## Where these settings are edited

These are creator settings, not player runtime screens.

* Open the NPC with `CTF Npc Core`.
* Configure `Suppressive Fire` and `Faction Defense` in the combat and sensing controls.
* Configure strategic cover in the separate `Cover` category.

Cover is experimental. The global server switch and the NPC's own switch must both be enabled:

```toml
[experimentalCover]
enabled = true
```

```text
Cover > Enable Cover: ON
```

Cover can start only while the NPC is in its `COMBAT` phase. It does not replace idle patrols, mercenary formation movement, or ordinary target acquisition.

## Cover triggers

Each trigger is enabled independently per NPC.

| Trigger | When it can start cover |
| --- | --- |
| `On Reload` | A managed reload is active and at least `Reload Left (ms)` remains. |
| `On Damage` | One actual final-damage event reaches `Damage Ratio` of maximum health. |
| `On Low Health` | Health crosses below `Low Health Ratio`; this is a threshold response rather than a permanent cover loop. |
| `On Repeated Hits` | Enough damage-hit clusters occur inside `Damage Window (ms)`. |
| `On Grenade Threat` | A nearby supported LR Tactical fragmentation grenade is landed, or an airborne fragmentation grenade has an imminent fuse. |

Smoke and stun grenades do not activate fragmentation cover. Grenade cover uses the blast origin as the threat direction while preserving the current combat target.

## Search, movement, and timing

| Setting | Practical use |
| --- | --- |
| `Search Radius` | Horizontal cover search radius. The saved range is 3-12 blocks and search work is internally bounded. |
| `Cover Move Speed` | CustomNPCs walking speed used only while entering, peeking, or returning from cover. |
| `Hold Time (ms)` | Minimum hold time for damage and repeated-hit cover. |
| `Low-HP Hold (ms)` | Separate minimum hold for low-health cover. |
| `Cooldown (ms)` | Delay before another cover action may start. |
| `Max Duration (ms)` | Hard limit for one cover action. |
| `Peek After Cover` | Enables movement to a geometry-validated firing side after holding. |
| `Max Peek Cycles` | Maximum peek movements in one cover action, from 0 to 4. |

The cover finder probes bounded candidate geometry and normal NPC navigation. Version 0.2.2 can reacquire an externally cleared path instead of failing after a fixed number of interruptions. Movement progress and the phase timeout remain the authoritative failure guards.

Cover movement does not create a new reload animation. Reloading continues through TACZ's actual gun stack and reload state, and the NPC never equips a physical ammo or magazine item.

## Runtime flow

A normal cover action follows this shape:

1. A configured trigger becomes valid during combat.
2. The server searches a bounded radius for reachable solid cover against the current threat direction.
3. The NPC enters cover using `Cover Move Speed`.
4. It holds for the trigger's minimum time while the hard maximum duration continues to apply.
5. If peeking is enabled and the geometry is valid, the NPC moves to a firing side with line of sight.
6. The NPC returns to ordinary combat or aborts safely when the phase completes, the route fails, or `Max Duration` expires.

Cover does not guarantee that a valid point exists. Open terrain, sealed rooms, unsafe footing, a radius that is too small, or a path the NPC cannot traverse may correctly produce no cover action.

## Suppressive fire

`Suppressive Fire` is a last-seen-position policy, not hidden-target tracking.

* It can run only after the NPC actually saw the target during combat.
* It fires real TACZ rounds at that last visible position.
* It remains allowed only for `Suppression Time Ms`.
* It does not update its aim from the hidden target's current position.
* Final firing, ammo stock, gun mode, reload, and line-of-fire rules still apply.

`Post-Fire Watch Ms` controls the vigilance period after suppressive fire ends. During this time, the NPC keeps aiming at the last seen point without firing or spending ammunition. Set it to `0` to disable the post-fire watch.

Start with the default short window. A long suppression window can waste finite ammunition and make a lost target look as if it is still being tracked.

## Faction defense

`Faction Defense` lets a damaged TACZ Fire NPC broadcast its attacker to same-faction TACZ Fire allies inside `Faction Alert Radius`. Vertical sharing is limited, and an ally still needs final line of sight before firing.

This assistance is not a universal friendly-fire override:

* Explicit selectors and tag rules still apply.
* Passive or unrelated entities do not become targets.
* Mercenary owner protection and owner-hit tolerance still apply.
* Same-faction retaliation requires genuine hostility or a short server-authorized reactive grant.

## Recommended tuning order

1. Confirm ordinary `Ranged` or `Auto` combat in open terrain.
2. Confirm movement and reload behavior without cover.
3. Enable one trigger, usually `On Reload`.
4. Keep `Search Radius` small and verify that a reachable solid obstacle exists.
5. Tune hold time and cooldown.
6. Add peeking only after entry and exit paths work.
7. Add damage, repeated-hit, low-health, and grenade triggers one at a time.
8. Add suppressive fire and faction defense last so their effects are easy to distinguish.

If cover fails, first test with one NPC, one target, one trigger, and a simple wall. This separates cover geometry from target, formation, patrol, and ammo problems.

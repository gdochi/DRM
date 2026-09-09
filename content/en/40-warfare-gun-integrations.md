---
title: Managed Gun Integrations
slug: warfare-gun-integrations
order: 365
description: Use TACZ, PointBlank, and SuperbWarfare guns through the shared Dochi's Warfare combat controller.
product: dochi-warfare
category: Gun Integrations
section: integrations
status: Draft
version: 0.2.7
audience: Firearm NPC creators
tags:
  - TACZ
  - PointBlank
  - SuperbWarfare
---

## One controller, native gun mechanics

Dochi's Warfare 0.2.7 routes supported guns through one managed combat controller. DW owns target selection, stance, tactical movement, accuracy policy, firing opportunities, reload timing, reserve `Ammo Stock`, animation signals, and persistence.

The gun mod keeps the parts that define the weapon itself: item and model rendering, native projectile or hitscan, intrinsic sounds, loaded-ammo state, native reload phases, and gun-specific mechanics. This boundary prevents an external gun from being reduced to a TACZ-looking imitation.

## Supported adapters

| Gun system | Requirement | Native behavior retained |
| --- | --- | --- |
| TACZ | Required 1.1.8 in the supported 1.1.x range | Firing, gun state, reload state, RPM, muzzle/effects, and stack persistence |
| PointBlank | Optional 1.11.1 or 2.1.0; install exactly one | Native projectile or hitscan, multi-pellet rays, headshots, falloff, reload phases, sounds, and renderer |
| SuperbWarfare | Optional 0.8.9 final build `6effe4385` | Native firing, reload, bolt, projectile, sound, heat, recoil, durability, models, attachments, and persistence |

TACZ and Player Animator remain the runtime and animation baseline even when the managed item comes from PointBlank or SuperbWarfare.

In 0.2.7, PointBlank hitscan keeps later pellets from being discarded by vanilla hurt immunity when several pellets rapidly hit the same target, then restores the target's previous immunity state after delivery. Long-range pellet candidates are collected through bounded segments to reduce repeated entity queries in large fights, while knockback and camera-shake intervals can be throttled independently from damage.

:::warning Version gates
PointBlank 1.11.1 and 2.1.0 use different bridges. If both branches are installed, or no supported API is found, PointBlank compatibility disables itself. SuperbWarfare versions other than the verified 0.8.9 ABI fail closed before the compatibility mixins are applied.
:::

## Configure an external gun

1. Confirm a plain TACZ 1.1.8 gun works on the NPC.
2. Install exactly one supported optional gun mod version on both sides.
3. Put the native gun item in the creator's inventory.
4. Open the NPC with `DW Npc Core` and select the item in `Gun`.
5. Keep `Ammo Stock: -1`, `Reload Duration Ms: 0`, and a simple visible target for the first test.
6. Save, verify native rendering and firing, then add finite ammo, pools, custom RPM, or advanced AI.

Supported items can also be mixed in a random ranged-weapon pool. An unsupported special-fire or melee-only gun is rejected rather than partially managed.

## RPM, reload, and ammunition

The UI label `RPM Mode: TACZ Native` is retained for compatibility. For an optional adapter, native mode resolves the operated gun's supported cadence. Fixed and random RPM settings are still bounded by native cooldown behavior; a gun rejecting a shot does not consume an extra DW firing opportunity.

`Reload Duration Ms: 0` uses the operated gun's native empty or tactical reload time. A positive value is a manual override. Reserve ammunition always comes from DW `Ammo Stock`; no TACZ, PointBlank, or SuperbWarfare ammo or magazine item should be placed in the NPC offhand.

## Fail-closed troubleshooting

If TACZ works but an external gun does not:

1. Check the exact adapter version.
2. Remove the other PointBlank branch if both are installed.
3. Test a normal firearm without special-fire or melee-only procedures.
4. Keep native RPM, infinite reserve ammo, and a clear line of sight.
5. Check the server log for one-time adapter or ABI diagnostics.

Do not compensate for an incompatible adapter by raising RPM, adding offhand ammunition, or replacing the native renderer.

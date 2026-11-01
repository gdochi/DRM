---
title: Managed Gun Integrations
slug: warfare-gun-integrations
order: 365
description: Use TACZ, PointBlank, and SuperbWarfare guns through the shared Dochi's Warfare combat controller.
product: dochi-warfare
category: Gun Integrations
section: integrations
status: Draft
version: 0.3.1
audience: Firearm NPC creators
tags:
  - TACZ
  - PointBlank
  - SuperbWarfare
---

Current builds: DW 0.3.1 for Forge 1.20.1 and DW 0.3.1 for NeoForge 1.21.1. Vehicle AI on both loaders requires the separate DWE 0.3.1 addon. Check [loader-specific installation](#dochi-warfare/warfare-setup) for external gun/vehicle dependencies.

## Give an NPC a gun from another mod

With a supported gun mod installed, choose its gun in DW's **Gun** page. Put the real item in the creator's inventory, open the NPC with DW Npc Core, select the item, then confirm both the preview and **Stored gun** before saving.

![Gun selection and a stored M4A1 pool.](assets/media/guides/warfare-031-neo1211/dw-gun.png "DW 0.3.1 / NeoForge 1.21.1, English UI. The upper icon comes from the creator’s inventory; the lower list is the pool to store on the NPC. This example has one M4A1 at 100%.")

DW controls whom the NPC detects and when it fires or reloads. The original gun mod supplies the model, projectile, intrinsic sounds and supported firing mechanics. When switching weapons, check the weapon’s own range, cadence and supported special actions alongside DW settings.

## Supported adapters

| Gun system | Requirement | Native behavior retained |
| --- | --- | --- |
| TACZ | Required 1.1.8 in the supported 1.1.x range | Firing, gun state, reload state, RPM, muzzle/effects, and stack persistence |
| PointBlank | Optional 1.11.1 or 2.1.0; install exactly one | Native projectile or hitscan, multi-pellet rays, headshots, falloff, reload phases, sounds, and renderer |
| SuperbWarfare | Forge 0.8.9 / 0.8.9.1 / 0.8.9.2; NeoForge 0.8.9.1 / 0.8.9.2 | Native firing, reload, bolt, projectile, sound, heat, recoil, durability, models, attachments, and persistence |

TACZ and Player Animator remain the runtime and animation baseline even when the managed item comes from PointBlank or SuperbWarfare.

:::warning Version gates
Install one supported PointBlank branch: 1.11.1 or 2.1.0. Use the loader-specific SuperbWarfare versions above.
:::

## Configure an external gun

1. Confirm a plain TACZ 1.1.8 gun works on the NPC.
2. Install exactly one supported optional gun mod version on both sides.
3. Put the native gun item in the creator's inventory.
4. Open the NPC with `DW Npc Core` and select the item in `Gun`. For multiple guns, make pool chances total 100% or press `Even`.
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
5. Check server messages for an unsupported gun or version.

Do not compensate for an incompatible adapter by raising RPM, adding offhand ammunition, or replacing the native renderer.

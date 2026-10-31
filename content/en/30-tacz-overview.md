---
title: Dochi's Warfare Overview
slug: dochi-warfare-overview
order: 310
description: Forge DW 0.3.1 and NeoForge 0.3.1 NPC combat, DWE ownership, clones, and authoring tools.
product: dochi-warfare
category: Overview
section: overview
status: Draft
version: 0.3.1
audience: Firearm NPC creators
tags:
  - TACZ
  - customnpcs
  - overview
---

## 0.3.1 DNPC and editor updates

DNPC integration includes friendly/hostile relationships, group protection, reload slowdown, stationary fire, poses and event dialogue. External AI control preserves paths, targets and equipment; combat resumes after control returns. Keep native jobs and combat configuration distinct.

Find DW tools in installed DNPC/CNPC Creative tabs. Weapon, armor and skin lists support checkbox selection, Select All and Delete Selected; profile search, scrolling and pose editing/preview layouts were improved. See [DWE compatibility](#dochi-warfare-expanded/expanded-compatibility) for vehicles.

## Forge and NeoForge 0.3.1 update

DW owns NPC combat and the addon core. Vehicle AI, weapons, crew, and profiles now belong to [Dochi's Warfare Expanded](#dochi-warfare-expanded/expanded-overview). NPC combat works with DW alone. Vehicle features require DWE 0.3.1 on both Forge and NeoForge. The shared clone library now provides confirmed deletion and recoverable archived files.

Current builds: DW 0.3.1 for Forge 1.20.1 and DW 0.3.1 for NeoForge 1.21.1. Vehicle AI on both loaders requires the separate DWE 0.3.1 addon. Check [loader-specific installation](#dochi-warfare/warfare-setup) for external gun/vehicle dependencies.

## What Dochi's Warfare is

Dochi's Warfare (`dochi_warfare`) is a Forge 1.20.1 combat-authoring mod. Its main NPC workflow lets selected DNPC or CustomNPCs NPCs use TACZ, PointBlank, or SuperbWarfare guns through one server-authoritative DW combat controller. The operated gun keeps its native item, renderer, projectile or hitscan behavior, sounds, and intrinsic gun state; DW owns target rules, stance, movement, firing cadence, reload policy, reserve ammo, animation signals, and persistence.

In current 0.3.1 builds, DW owns NPC firearm/melee combat, the shared clone library and booby traps. The separate DWE addon owns SuperbWarfare ground, helicopter and fixed-wing vehicle AI, crews and support timelines. Update the pair together and consult [DWE installation and verified vehicles](#dochi-warfare-expanded/expanded-compatibility).

The important per-NPC switch is still labeled `TACZ Fire NPC Mode`. When it is OFF, the NPC keeps normal CustomNPCs behavior. When it is ON and saved, DW controls that NPC's managed firearm behavior. The TACZ wording is retained in this compatibility-facing UI label, but the 0.2.9 managed-gun runtime is not limited to TACZ items.

## Core rules

| Rule | Meaning |
| --- | --- |
| Use a supported native gun | Use a TACZ gun, a supported PointBlank 1.11.1/2.1.0 gun, or a supported SuperbWarfare 0.8.9 gun. Unsupported items fail closed. |
| Keep TACZ installed | TACZ 1.1.8 is the required runtime and animation baseline even when the NPC operates an optional external gun. |
| Do not equip ammo in offhand | Spare ammunition is managed by DW ammo stock and reload policy, not by physical ammo or magazine items in the offhand. |
| Enable per NPC | Only selected NPCs with `TACZ Fire NPC Mode` are controlled. Normal DNPC or CustomNPCs NPCs are left alone. |
| Configure in the GUI first | The in-game per-NPC GUI is the primary setup path. Script and storeddata support is for advanced workflows. |

:::warning Ammo rule
Do not make managed NPCs hold TACZ, PointBlank, or SuperbWarfare ammo or magazine items in the offhand. Reloads use `Ammo Stock`, DW reload state, and the operated gun's native stack state.
:::

## What the addon controls

| Area | Examples |
| --- | --- |
| Managed guns | TACZ plus optional PointBlank and SuperbWarfare native-mechanics adapters under one stance, movement, firing, reload, ammo, and animation controller |
| Fire behavior | `Reload`, `Supply Ammo`, `Max Distance`, native/fixed/random RPM, fixed or moving-target ramp accuracy, and random-length bursts |
| Damage policies | native gun or fixed ranged damage; weapon-based or fixed melee damage, knockback, and attack speed |
| Melee animation integration | per-NPC Better Combat compatibility, registered weapon attacks and poses, and vanilla main-hand swing fallback |
| Stance behavior | `Idle`, `Ranged`, `Melee`, `Auto`, `Auto Hidden`, plus one advanced conditional rule |
| Tactical movement | hold, spread, compact, advance, retreat, keep-distance fire, move-while-firing, random replanning intervals, suppressive fire, and per-NPC cover |
| Awareness | detection distance and angle, close detection, combat delay, last-seen memory, and investigation of gunshot, reload, block-break, and block-place events |
| Ammo policies | normal, fixed forced, or ranged forced reloads; finite or infinite stock, regeneration, melee or unarmed fallback, and optional target-loss rearming |
| Targets | entity ID allow lists, faction-hostility inheritance, required tags, rejected tags, same-faction tag targeting |
| Equipment and visuals | random ranged weapons, melee weapons, skins, armor sets, preview and held-item sync |
| Poses | built-in non-combat gun poses, pose JSON editing, gun render transforms, and per-action pose mapping |
| Combat feedback | alert icons, detected sounds, shoot sounds, detected say text, shoot say text |
| Optional grenades | grenade type, range, search range, health trigger, cooldown, fuse, power, angle |
| Mercenary contracts | hire terms, summon and recall, formations, fire and posture orders, owner-hit responses, and contract release |
| Vehicle AI | optional SuperbWarfare ground, helicopter, and fixed-wing movement; awareness; targets; per-weapon enablement/use mode; virtual ammo; NPC crew; profiles; commands; and soul stones |
| World tools | server-side CustomNPCs/vehicle clone JSON and configurable password, explosion, effect, launch, and LRT grenade traps |

## What it leaves alone

Dochi's Warfare does not globally replace every CustomNPCs ranged or melee NPC. Vanilla CustomNPCs attack output is suppressed only for DW-managed NPCs. A world can mix normal NPCs and managed firearm NPCs.

Optional gun adapters do not replace their native models, projectiles, hitscan, sounds, or intrinsic gun mechanics. An incompatible external ABI or unsupported special-fire/melee-only gun is rejected rather than partially controlled.

## Supported stack

| Mod or loader | Role |
| --- | --- |
| Minecraft 1.20.1 | Target game version for this addon build. |
| Forge 47 or newer | Required loader range. |
| TACZ 1.1.8 through the supported 1.1.x range | Required gun-runtime and animation baseline on client and server. |
| Player Animator 1.0.0 or newer | Required on the client for the shared managed-gun animation controller. |
| DNPC / CustomNPCs | Choose the NPC provider for your workflow. DNPC firearm/melee combat works without CustomNPCs. |
| PointBlank 1.11.1 or 2.1.0 | Optional native gun integration. Install exactly one supported PointBlank version. |
| SuperbWarfare | Forge 0.8.9 / 0.8.9.1 / 0.8.9.2; NeoForge 0.8.9.1 / 0.8.9.2. Native structural checks must also pass. |
| Better Combat | Optional integration for registered melee weapon attacks, poses, and weapon-based attack timing. |
| Mob Player Animator 1.0.0 or newer | Optional client dependency for exact Better Combat NPC motion playback. Without it, the NPC uses a vanilla swing. |
| LesRaisins Tactical Equipments | Optional grenade throws and native LRT grenade booby-trap payloads. |

## Recommended authoring order

1. Create one fresh DNPC or CustomNPCs NPC in a test world.
2. Use `DW Npc Core` to open the per-NPC setup GUI.
3. Turn on `TACZ Fire NPC Mode` and `Enabled`.
4. Use `Easy Build` or `Presets` if you want a quick behavior starting point.
5. Pick one supported gun in the `Gun` tab. A plain TACZ 1.1.8 gun is the smallest baseline test.
6. Start with infinite reserve ammo by leaving `Ammo Stock` at `-1`.
7. Test one target with simple `Auto` stance before adding advanced targets, pools, grenades, or script overrides.

This keeps the first problem small. If the NPC cannot fire in that baseline setup, the issue is usually mode enablement, gun selection, target selection, distance, line of sight, or ammo/reload policy.

## Distribution versions

This guide follows the local DW **0.3.1** source / release set. On 2026-10-24, the [public Modrinth files](https://modrinth.com/mod/dochis-warfare/versions) reached **0.2.9**. Check the downloaded version before following newer features. Vehicle AI requires matching DWE in addition to DW.

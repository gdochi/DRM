---
title: CNPC TACZ Fire Overview
slug: tacz-overview
order: 310
description: What CNPC TACZ Fire controls, what it leaves alone, and the rules every firearm NPC should follow.
product: cnpc-tacz-fire
category: Overview
section: overview
status: Draft
version: 0.1.9
audience: Firearm NPC creators
tags:
  - TACZ
  - customnpcs
  - overview
---

## What CNPC TACZ Fire is

CNPC TACZ Fire is a Forge 1.20.1 addon for building CustomNPCs NPCs that fight with real TACZ guns. It is not a generic ranged attack reskin. The addon drives TACZ firing, reload state, gun state, ammo stock, target rules, tactical movement, awareness, weapon pools, visual pools, armor pools, combat FX, and optional grenade behavior through a per-NPC setup GUI.

The important switch is `TACZ Fire NPC Mode`. When that mode is OFF, the NPC keeps normal CustomNPCs behavior. When it is ON and saved for a CustomNPCs NPC, CNPC TACZ Fire can take over the firearm behavior for that NPC.

## Core rules

| Rule | Meaning |
| --- | --- |
| Use real TACZ guns | The NPC should use an actual TACZ gun item, normally stored or held as the managed ranged weapon. |
| Do not equip ammo in offhand | Spare ammunition is managed by addon ammo stock and reload policy, not by physical ammo or magazine items in the offhand. |
| Enable per NPC | Only selected NPCs with `TACZ Fire NPC Mode` are controlled. Normal CustomNPCs NPCs are left alone. |
| Configure in the GUI first | The in-game per-NPC GUI is the primary setup path. Script and storeddata support is for advanced workflows. |

:::warning Ammo rule
Do not make NPCs hold TACZ ammo or magazine items in the offhand. Reloads are represented by `Ammo Stock`, reload state, and the TACZ gun stack state.
:::

## What the addon controls

| Area | Examples |
| --- | --- |
| Fire behavior | `Reload`, `Supply Ammo`, `Max Distance`, `RPM Override`, random RPM range, accuracy, burst fire |
| Stance behavior | `Idle`, `Ranged`, `Melee`, `Auto`, `Auto Hidden`, plus one advanced conditional rule |
| Tactical movement | hold, spread, compact, advance, retreat, keep-distance fire, move-while-firing |
| Awareness | detection distance, detection angle, combat delay, instant combat angle, last-seen memory |
| Targets | entity ID allow lists, faction rules, required tags, rejected tags, same-faction tag targeting |
| Equipment and visuals | random ranged weapons, melee weapons, skins, armor sets, preview and held-item sync |
| Combat feedback | alert icons, detected sounds, shoot sounds, detected say text, shoot say text |
| Optional grenades | grenade type, range, search range, health trigger, cooldown, fuse, power, angle |

## What it leaves alone

CNPC TACZ Fire does not globally replace every CustomNPCs ranged or melee NPC. Vanilla CustomNPCs attack output is suppressed only for addon-controlled TACZ Fire NPCs. A world can mix normal NPCs and TACZ Fire NPCs safely as long as creators enable the mode only on the NPCs that need firearm behavior.

It also does not require creators to build fake gun animations. TACZ and optional combat-animation integrations should use their own built-in behavior. If a TACZ gun or Better Combat melee animation does not behave correctly, treat that as an integration or setup issue instead of replacing the motion by hand.

## Supported stack

| Mod or loader | Role |
| --- | --- |
| Minecraft 1.20.1 | Target game version for this addon build. |
| Forge 47 or newer | Required loader range. |
| TACZ 1.1.8 or newer | Required firearm system. |
| CustomNPCs 1.20.1 or newer | Needed for the CustomNPCs NPC workflow described in this wiki. |
| playerAnimator 1.0.0 or newer | Optional client-side dependency when animation support is present. |
| Better Combat | Optional melee animation support when available. |
| Supported throwable mods | Optional grenade behavior, only when matching throwable data is available. |

## Recommended authoring order

1. Create one fresh CustomNPCs NPC in a test world.
2. Use `TACZ NPC Core` to open the per-NPC setup GUI.
3. Turn on `TACZ Fire NPC Mode` and `Enabled`.
4. Pick one real TACZ gun in the `Gun` tab.
5. Start with infinite reserve ammo by leaving `Ammo Stock` at `-1`.
6. Test one target with simple `Auto` stance before adding advanced targets, pools, grenades, or script overrides.

This keeps the first problem small. If the NPC cannot fire in that baseline setup, the issue is usually mode enablement, gun selection, target selection, distance, line of sight, or ammo/reload policy.

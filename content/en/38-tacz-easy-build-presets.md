---
title: Easy Build and Combat Presets
slug: warfare-easy-build-presets
order: 325
description: Build NPC behavior quickly with the guided Easy Build flow or five combat presets.
product: dochi-warfare
category: Setup Tools
section: setup
status: Draft
version: 0.2.7
audience: Firearm NPC creators
tags:
  - easy-build
  - preset
  - setup
---

## Two quick-setup tools

`Easy Build` and `Presets` are creator tools in the help area of the `DW Npc Core` editor topbar. Both create a useful combat starting point, but they work differently.

| Tool | Best used when | Result |
| --- | --- | --- |
| `Easy Build` | You want to compose behavior by answering questions | Builds combat settings directly from the answers. It does not apply a named role preset. |
| `Presets` | You want a proven combat type immediately | Applies one of five doctrines: Guard Rifleman, Patroller, Assault, Support Gunner, or Sniper. |

Neither tool locks the result. Every applied value remains editable in the normal categories.

## Easy Build workflow

1. Open the NPC with `DW Npc Core`.
2. Press `Easy Build` in the topbar.
3. Choose the amount of detail you want.
4. Answer the questions. Additional questions may appear only when the related system is enabled.
5. Review the core traits, overall strength, cautions, and conflict warnings.
6. Press `Apply`.
7. Return to the normal editor, inspect the gun and generated values, then press `Save`.

## Detail levels

| Level | Question style |
| --- | --- |
| `Beginner` | Seven broad questions compose idle behavior, combat movement, range, reaction, fire control, and survival. The first temperament question only recommends later answers; it does not assign a role. |
| `Intermediate` | Directly selects grouped idle, awareness, engagement, reposition, fire, accuracy-ramp, suppression, cover, and empty-ammo behavior. |
| `Expert` | Edits field-level distances, timing, speed, burst, suppression, and cover values. Follow-up questions appear only for enabled systems. |

Easy Build is not based on a named combat preset. Beginner temperament choices such as aggressive, balanced, or cautious only change suggestions; they do not silently overwrite later answers.

## Preserved settings

Easy Build composes behavior while preserving content owned by other editors:

* Ranged and melee weapons and their pools
* Target entities, factions, and tag rules
* Skin and armor pools
* Mercenary contracts
* Grenades and combat FX
* Current virtual `Ammo Stock` and its maximum

You can inspect these unchanged values afterward in `Gun`, `Targets`, `Ammo`, `Visual & FX`, and the other normal categories.

## Combat presets

`Presets` applies a complete general combat doctrine in one step.

| Preset | Starting behavior |
| --- | --- |
| `Guard Rifleman` | Defends a position with controlled mid-range burst fire |
| `Patroller` | Patrols an area, investigates sound, and repositions during combat |
| `Assault` | Closes distance quickly and applies moving-fire pressure |
| `Support Gunner` | Maintains squad spacing and uses sustained mid-to-long-range fire and suppression |
| `Sniper` | Uses long detection and firing ranges with high accuracy |

Presets change awareness, idle behavior, engagement distance, tactical movement, fire control, cover, and reload response. They do not replace weapons, armor, skins, targets, faction relationships, grenades, FX, mercenary contracts, or `Ammo Stock`.

## Check the result before saving

Easy Build and presets are starting points. After applying one:

1. Confirm that the current gun suits the selected range and firing style.
2. Check `Max Distance`, detection range, and approach or retreat distance against the encounter terrain.
3. Make sure `RPM Mode`, accuracy, and burst range are reasonable for the available ammo stock.
4. Test movement and cover in simple terrain.
5. Press `Save` when the result is correct, or use `Save As` to keep the full NPC setup as a reusable profile.

---
title: Booby Trap Editor and Manager
slug: warfare-booby-traps
order: 390
description: Configure password access, explosions, effects, launch behavior, LRT grenades, profiles, markers, and lifecycle.
product: dochi-warfare
category: World Tools
section: tools
status: Draft
version: 0.2.4
audience: Map and scenario creators
tags:
  - booby-trap
  - security
  - explosion
---

## Editor and runtime roles

`DW Booby Trap Core` is a Creative-mode creator tool.

* Right-click a block with the core to open the editor for that block.
* Right-click air with the core to open the manager for registered traps.
* Put the core away before testing a configured trap through normal block interaction.

The editor and manager are creator screens. Password prompts and trap effects are player runtime behavior, and the server makes the final validation and trigger decision.

## Trap types

| Type | Target and behavior |
| --- | --- |
| `Password Door` | Vanilla door only; authenticate before opening. |
| `Password Container` | Block with an inventory GUI; authenticate before opening the container. |
| `Immediate Explosion` | Trigger an explosion immediately on interaction. |
| `Delayed Explosion` | Play configured warning feedback, wait, then explode. |
| `LRT Grenade` | Launch a native LesRaisins Tactical Equipments grenade entity when the optional mod is installed. |

Choosing a type applies the required baseline fields, but every result should be reviewed before saving.

## Password and access rules

Password traps support a numeric PIN from 4 to 12 digits or a text password from 1 to 32 characters. You can configure case sensitivity, owner bypass, entrance side, reverse-side behavior, door-closing policy, maximum attempts, attempt window, lockout time, and failure action.

Failure actions can show a warning, deal direct damage, or explode. Password values are not preserved as an editable plain draft after configuration; changing password mode or case policy requires a new password.

## Payloads and effects

Explosion traps expose power, block destruction, fire creation, delay, warning sound, and warning particles. Optional effects can push the triggering player and apply up to eight potion effects to the triggering player, all nearby players, or all nearby living entities.

The LRT grenade payload configures grenade type, fuse, power, count, direction, angle, and fixed yaw/pitch when needed. The editor rejects that payload when LesRaisins Tactical Equipments is unavailable or the selected grenade cannot be created.

## Lifecycle and testing

A trap triggers only while both `Enabled` and `Armed` are on. Other important controls include owner bypass, break protection, redstone behavior, cooldown, single use, state removal after trigger, target-block removal, block destruction, and fire creation.

Test in this order:

1. Save one simple trap with `Enabled` and `Armed` on.
2. Put `DW Booby Trap Core` away.
3. Interact normally as a non-owner test player when owner bypass is enabled.
4. Verify the effect and lifecycle before adding password failures, potion effects, or LRT payloads.

## Manager, markers, and profiles

Right-click air with the core to search registered traps and inspect status such as active, disabled, disarmed, unloaded chunk, stale block, pending delayed explosion, or missing dependency. `Remove Trap` removes only the trap state; `Destroy Block` removes the state and target block. Destructive manager actions require a second confirmation.

While the core is held in Creative mode, nearby configured traps can be shown with server-authoritative outlines and compact markers. Reusable JSON profiles are stored under:

```text
config/dochi_warfare/booby_traps/profiles/
```

Loading a profile applies settings to the current editor draft. The server still validates whether that profile is valid for the selected block type before saving.

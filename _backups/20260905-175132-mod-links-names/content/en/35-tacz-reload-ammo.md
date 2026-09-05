---
title: Reload and Ammo Stock
slug: warfare-reload-ammo
order: 350
description: How DW ammo stock, native reload timing, regeneration, fallback, and reload movement work across supported guns.
product: dochi-warfare
category: Ammo
section: ammo
status: Draft
version: 0.2.5
audience: Firearm NPC creators
tags:
  - reload
  - ammo
  - magazine
---

## Ammo model

Dochi's Warfare does not make managed NPCs carry spare TACZ, PointBlank, or SuperbWarfare ammunition in the offhand. The NPC uses a supported native gun, while reserve ammunition is represented by DW data:

| Data | Meaning |
| --- | --- |
| `Ammo Stock` | Spare rounds for this NPC. `-1` is infinite, `0` is empty, positive values are finite reserve rounds. |
| `Ammo Stock Max` | Maximum spare rounds after regeneration. `-1` means uncapped. |
| `Ammo Regen Amount` | Rounds restored each regeneration interval. `0` disables regeneration. |
| `Ammo Regen Interval Ms` | Time between regeneration ticks. `0` disables regeneration. |
| `Reload Duration Ms` | NPC reload lock duration. `0` uses the operated gun's native empty or tactical reload time. |
| `Reload Speed Multiplier` | Walking speed multiplier only while reloading. `0` stops reload movement, `1` keeps normal speed. |

:::warning Do not use offhand ammo
NPC ammo is managed by `Ammo Stock`, DW reload state, and the operated gun's native stack state. Do not equip physical ammo or magazine items to represent NPC reloads.
:::

## Main toggles

| Toggle | Behavior |
| --- | --- |
| `Reload` | Allows the NPC to reload after the gun becomes empty. |
| `Supply Ammo` | Uses addon ammo stock to refill the NPC gun after the reload delay. |

If `Supply Ammo` is OFF, the addon does not refill from its reserve stock. If `Ammo Stock` is `0`, the NPC has no spare rounds even if reload is enabled.

## Reload types

| `Reload Type` | Behavior |
| --- | --- |
| `Normal` | Reload when the gun becomes empty. |
| `Force Fixed` | Force a reload after `Force Shots` successful shots, even if rounds remain loaded. |
| `Force Range` | After each reload, roll a new successful-shot threshold from inclusive `Force Min` through `Force Max`, then force the next reload at that threshold. |

Forced reload counters use successful shots. Confirm native gun reload compatibility with `Normal` first, then use forced modes only when the encounter needs that rhythm.

## Empty-ammo fallback

`Ammo-Aware Switching` activates only when both the gun's loaded ammunition and the NPC reserve `Ammo Stock` are exhausted.

| Setting | Behavior |
| --- | --- |
| `Fallback To Melee` | Continue combat with the configured melee weapon when one is available. |
| `Fallback To Unarmed` | Allow unarmed melee when no configured melee weapon can be used. |

When the fallback ends and ammunition becomes usable again, the NPC returns to its ranged weapon and reload flow. If fallback is disabled, a fully exhausted NPC is expected to stop firing.

## Automatic rearm after target loss

`Auto Rearm After Target Loss` is an optional recovery path for an NPC that entered ammo-exhaustion fallback and then continuously lost its target.

1. The target must remain absent for `Rearm Start Delay (Seconds)`.
2. Reacquiring a target cancels the pending recovery.
3. After the delay, the configured reload duration still applies.
4. A successful recovery grants one full magazine through the managed adapter and native gun-stack state.

This does not restore `Ammo Stock` and does not create physical ammunition. Use it when a fallback NPC should be ready for the next encounter without receiving unlimited reserve stock.

Reload animation is split by responsibility: the upper body keeps the managed reload action while the lower body continues the NPC's actual walk, run, or crouch movement. `Reload Speed Multiplier` changes movement speed; it does not replace the current lower-body movement state with one fixed full-body pose.

## Recommended setup flow

1. Start with `Ammo Stock: -1`.
2. Confirm that the NPC fires, reloads, and returns to firing.
3. Keep `Reload Type: Normal`, then change `Ammo Stock` to a finite value only after the basic loop works.
4. Decide whether reserve `0` should stop combat or switch to melee/unarmed fallback.
5. Add `Ammo Regen Amount` and `Ammo Regen Interval Ms` if the encounter needs slow resupply.
6. Tune `Reload Duration Ms` only after the held gun's native reload behavior feels wrong for the encounter.
7. Use `Reload Speed Multiplier` to create vulnerability windows during reload.
8. Add `Force Fixed` or `Force Range` last.
9. Add target-loss rearming only if an exhausted NPC should recover between encounters.

This order separates firing problems from economy problems. A finite-ammo NPC that never fires may be empty, but an infinite-ammo NPC that never fires probably has a gun, target, stance, distance, or line-of-sight problem.

## RPM and ammo pressure

`RPM Mode`, random RPM range, burst minimum and maximum shots, and fixed or ramping accuracy all change ammo pressure. A high-RPM NPC with finite ammo can empty its reserve quickly. A low-accuracy NPC may look cinematic but can waste ammunition if `Ammo Stock` is limited.

Balance in this order:

1. `RPM Mode: TACZ Native` with infinite ammo.
2. Fixed accuracy.
3. Burst range, accuracy ramping, or fixed/random RPM.
4. Finite ammo stock.
5. Regeneration or reload movement penalties.

## Script and storeddata reference

The GUI is the primary setup path, but script users can also work with bridge values. The `tacznpcfire.*` storeddata namespace is retained as an internal compatibility contract even though the public mod ID is now `dochi_warfare`.

| Key | Meaning |
| --- | --- |
| `tacznpcfire.supplyAmmo` | Enables or disables addon ammo supply. |
| `tacznpcfire.ammoStock` | `-1` infinite, `0` empty, positive finite rounds. |
| `tacznpcfire.ammoStockMax` | Maximum stock for regeneration. |
| `tacznpcfire.ammoRegenAmount` | Rounds restored each interval. |
| `tacznpcfire.ammoRegenIntervalMs` | Regeneration interval in milliseconds. |
| `tacznpcfire.reloadDurationMs` | Reload duration in milliseconds. |
| `tacznpcfire.reloadWalkSpeedMultiplier` | Reload-only movement multiplier. |
| `tacznpcfire.reloadType` | `0` Normal, `1` Force Fixed, `2` Force Range. |
| `tacznpcfire.forceReload.shots` | Successful-shot count for Force Fixed. |
| `tacznpcfire.forceReload.minShots` / `maxShots` | Inclusive minimum and maximum successful-shot counts for Force Range. |
| `tacznpcfire.combat.ammoAwareSwitching` | Enables switching logic when loaded and reserve ammo are both exhausted. |
| `tacznpcfire.combat.fallbackToMelee` | Allows fallback to the configured melee weapon. |
| `tacznpcfire.combat.fallbackToUnarmed` | Allows unarmed fallback when no melee weapon is available. |

Use storeddata only when the encounter really needs script-side changes. For normal NPC authoring, keep the values in the per-NPC GUI so other creators can inspect them visually.

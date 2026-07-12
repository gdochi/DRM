---
title: Reload and Ammo Stock
slug: tacz-reload-ammo
order: 350
description: How ammo stock, reload timing, regeneration, and reload movement work for TACZ Fire NPCs.
product: cnpc-tacz-fire
category: Ammo
section: ammo
status: Draft
version: 0.1.9
audience: Firearm NPC creators
tags:
  - reload
  - ammo
  - magazine
---

## Ammo model

CNPC TACZ Fire does not make NPCs carry spare TACZ ammo or magazine items in the offhand. The NPC uses a real TACZ gun, while reserve ammunition is represented by addon data:

| Data | Meaning |
| --- | --- |
| `Ammo Stock` | Spare rounds for this NPC. `-1` is infinite, `0` is empty, positive values are finite reserve rounds. |
| `Ammo Stock Max` | Maximum spare rounds after regeneration. `-1` means uncapped. |
| `Ammo Regen Amount` | Rounds restored each regeneration interval. `0` disables regeneration. |
| `Ammo Regen Interval Ms` | Time between regeneration ticks. `0` disables regeneration. |
| `Reload Duration Ms` | NPC reload lock duration. `0` uses the held TACZ gun's own reload time. |
| `Reload Speed Multiplier` | Walking speed multiplier only while reloading. `0` stops reload movement, `1` keeps normal speed. |

:::warning Do not use offhand ammo
NPC ammo is managed by `Ammo Stock`, reload state, and the TACZ gun stack state. Do not equip physical ammo or magazine items to represent NPC reloads.
:::

## Main toggles

| Toggle | Behavior |
| --- | --- |
| `Reload` | Allows the NPC to reload after the gun becomes empty. |
| `Supply Ammo` | Uses addon ammo stock to refill the NPC gun after the reload delay. |

If `Supply Ammo` is OFF, the addon does not refill from its reserve stock. If `Ammo Stock` is `0`, the NPC has no spare rounds even if reload is enabled.

## Recommended setup flow

1. Start with `Ammo Stock: -1`.
2. Confirm that the NPC fires, reloads, and returns to firing.
3. Change `Ammo Stock` to a finite value only after the basic loop works.
4. Add `Ammo Regen Amount` and `Ammo Regen Interval Ms` if the encounter needs slow resupply.
5. Tune `Reload Duration Ms` only after the held gun's native reload behavior feels wrong for the encounter.
6. Use `Reload Speed Multiplier` to create vulnerability windows during reload.

This order separates firing problems from economy problems. A finite-ammo NPC that never fires may be empty, but an infinite-ammo NPC that never fires probably has a gun, target, stance, distance, or line-of-sight problem.

## RPM and ammo pressure

`RPM Override`, random RPM, burst fire, and accuracy all change ammo pressure. A high-RPM NPC with finite ammo can empty its reserve quickly. A low-accuracy NPC may look cinematic but can waste ammunition if `Ammo Stock` is limited.

Balance in this order:

1. Native gun RPM with infinite ammo.
2. Accuracy.
3. Burst fire or fixed RPM.
4. Finite ammo stock.
5. Regeneration or reload movement penalties.

## Script and storeddata reference

The GUI is the primary setup path, but script users can also work with bridge values. Common storeddata keys include:

| Key | Meaning |
| --- | --- |
| `tacznpcfire.supplyAmmo` | Enables or disables addon ammo supply. |
| `tacznpcfire.ammoStock` | `-1` infinite, `0` empty, positive finite rounds. |
| `tacznpcfire.ammoStockMax` | Maximum stock for regeneration. |
| `tacznpcfire.ammoRegenAmount` | Rounds restored each interval. |
| `tacznpcfire.ammoRegenIntervalMs` | Regeneration interval in milliseconds. |
| `tacznpcfire.reloadDurationMs` | Reload duration in milliseconds. |
| `tacznpcfire.reloadWalkSpeedMultiplier` | Reload-only movement multiplier. |

Use storeddata only when the encounter really needs script-side changes. For normal NPC authoring, keep the values in the per-NPC GUI so other creators can inspect them visually.

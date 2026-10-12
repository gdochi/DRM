---
title: Target acquisition, pursuit, and facing
slug: mob-editor-detection-patrol
order: 250
description: Separate hostile targeting, between-pattern pursuit, and stage movement.
product: mob-editor
section: combat
category: BattleWorks
status: Guide
version: 0.1.3
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## 1. Choose who acquires the target

| Method | Setting | Use |
| --- | --- | --- |
| CustomNPCs targeting | Scan Without Target Off | Preserve faction-based hostile targeting |
| BattleWorks fallback scan | Scan Without Target On | Search nearby living entities when no valid target exists |

Fallback scanning is not the same as CustomNPCs faction filtering. Test carefully around villagers or other NPCs. Creative and Spectator players are excluded.

## 2. Test fallback scanning in isolation

In **Combat Rules → Combat**, start with:

| Setting | Value | Meaning |
| --- | --- | --- |
| Scan Without Target | On | Search when no valid target exists |
| Target Scan Range | 16 | Search distance |
| Awareness FOV | 360 | Search in every horizontal direction |
| Require Line of Sight | On | Exclude obscured entities during scanning |

1. Approach in Survival from the front and rear.
2. Reduce FOV to 160 and compare rear detection.
3. Test with a wall between player and NPC.
4. Disable scanning again if using CustomNPCs factions.

The scan's line-of-sight setting affects acquisition. Pattern Core's line-of-sight requirement affects starting that move.

## 3. Configure pursuit between patterns

| Setting | Role | Melee starting value |
| --- | --- | --- |
| Suppress Native Attacks | Reduce conflict with native attacks and combat AI | On |
| Chase Target | Navigate toward the target between patterns | On |
| Face Between Patterns | Face during engagement and reuse waits | On |
| Chase Speed Multiplier | Navigation speed multiplier | 1.0 |
| Approach Distance | Desired spacing | 2.0 |

Desired spacing can be clamped into an available non-mobility attack's range for the current phase. Still align the actual hitbox, pattern range, and terrain.

Disabling native suppression allows CustomNPCs attack AI to interfere. Do not enable competing controllers simply to make a stationary NPC move.

## 4. Stage settings take over during a pattern

Face Target follows the target during that stage. Stop Horizontal stops horizontal motion while retaining vertical physics. Hold is stationary movement; Toward, Away, and Orbit are authored combat movements.

A dedicated timeline movement session can retain control over ordinary stage stopping and pursuit. See [movement actions](#mob-editor/battleworks-movement).

If the NPC faces correctly while waiting but looks away during a hit, inspect the active stage's Face Target. An intentionally fixed-direction attack should keep its intended behavior.

## 5. Engagement and reset timing

| Setting | Meaning | Example |
| --- | --- | --- |
| Engage Delay Min / Max | Wait after acquiring a target before the first pattern | 10–18 ticks |
| Retry Delay | Wait before trying again with no eligible move | 10 ticks |
| Combat Reset Delay | Targetless interval before combat state resets | 100 ticks, about 5 seconds |

A reset clears combat state such as history, cooldowns, phases, and passive state. It is not automatic full healing or teleportation to a home position.

## 6. If pursuit works but attacks do not

1. Confirm the intended target.
2. Check pattern Enabled and phase range.
3. Check horizontal Min/Max Range.
4. Check Max Vertical and line of sight.
5. Compare Approach Distance with the actual hitbox.
6. Inspect cooldowns and repeat score penalties.
7. Check NPC movement speed, disabled AI, and blocked paths.

CustomNPCs still owns ordinary idle/patrol configuration. Orbit is an attack-stage movement around a target, not a world patrol editor.

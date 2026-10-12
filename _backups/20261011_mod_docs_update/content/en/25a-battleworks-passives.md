---
title: Damage and health passive reactions
slug: battleworks-passives
order: 265
description: Create queued reactions and distinguish them from immediate defensive triggers.
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

## Begin with one passive

Ordinary patterns are chosen by the manager. A passive requests a pattern when an event occurs, such as crossing half health or receiving projectile damage.

Add one passive to an NPC whose ordinary attacks already work.

## 1. Choose a basic queued trigger

Open the pattern's **Core → Passive trigger**.

| Trigger | Event |
| --- | --- |
| Manager | Ordinary scored selection |
| Health Below | Cross from above to at/below a health threshold; an initial observation already below also qualifies |
| Melee Damage | Positive damage from a direct living attacker |
| Ranged Damage | Positive projectile/indirect damage with a living owner |
| Any Damage | Other eligible positive damage too |

These four basic passives queue requests instead of interrupting the active timeline inside the damage callback. The additional immediate reaction types are described separately below.

## 2. Announce half health once

1. Create a pattern named Half-health Warning.
2. Choose Health Below.
3. Set the health percentage to 50 and Chance to 100.
4. Enable Once Per Combat.
5. Choose Queue, Queue Ticks 200, Trigger Cooldown 100.
6. Set Windup 0, Action 20, Recovery 10.
7. Add a Title at Action tick 0, addressed to the player target.
8. Leave Combo empty.
9. Save/apply and lower NPC health below half.

Expected result: once the current move finishes and conditions permit, the warning starts. Remaining below half does not trigger it every tick.

## 3. Understand the controls

| Control | Meaning |
| --- | --- |
| Chance | Probability of requesting the reaction |
| Minimum Damage | Ignore hits smaller than this threshold |
| Trigger Cooldown | Limit how frequently this trigger can request a reaction |
| Queue Ticks | Maximum lifetime of a waiting request |
| Queue | Wait when busy |
| Skip | Discard that request when busy |
| Once Per Combat | Prevent another successful start until combat resets |

A repeatable Health Below trigger must heal above the threshold before another downward crossing. Once Per Combat is consumed on successful start and cleared on combat reset.

## 4. Retreat after an arrow hit

1. Create a separate Ranged Damage pattern.
2. Use Minimum Damage 1, Chance 100, Trigger Cooldown 100, Queue Ticks 200.
3. Disable Once Per Combat.
4. Author a 12-tick Away movement using the [movement exercise](#mob-editor/battleworks-movement).
5. Allow the distances at which arrows will hit; do not inherit a melee-only Max Range blindly.
6. Test the reaction after the ordinary attack completes.
7. Only then reduce Chance, for example to 30%.

Conditions are checked again at start. An arrow from 12 blocks away can request a pattern whose Max Range 3 then prevents it from starting.

## 5. Multiple basic passives

- At most eight requests wait per NPC; duplicate requests for the same pattern merge.
- Priority affects waiting requests and replacement when full.
- Phase transitions take precedence.
- Starting a basic passive clears a pending ordinary combo.
- Basic passive starts have a shared minimum 40-tick gap.
- An eligible ordinary move gets a turn after a basic passive.

Use these rules when judging why an on-hit reaction waits or is skipped.

## 6. Immediate defensive triggers are separate

0.1.3 also implements these advanced trigger types:

| Type | Main condition |
| --- | --- |
| hit_count | Number of hits inside a time window |
| damage_sum | Accumulated damage inside a time window |
| evade | Eligible incoming damage |
| guard | Incoming damage plus a frontal-angle check |

Advanced JSON can set `interruptActive`, `cancelDamage`, `windowTicks`, `threshold`, and phase-specific chance/threshold values. An uninterruptible active pattern can prevent forced replacement.

The generic editor controls do not expose every advanced behavior. This path uses separate reaction handling; do not assume the basic queue's Once Per Combat, Queue Ticks, or fairness rules apply identically. Test actual damage cancellation and interruption explicitly.

These triggers are different from the [unconnected posture/riposte fields](#mob-editor/mob-editor-parry).

## Troubleshooting order

1. Confirm the hit is not cancelled, zero, invalid, or lethal for the basic passive path.
2. Test one trigger with Chance 100.
3. Check Enabled, target, range, phase, and health conditions.
4. Check both trigger and pattern cooldowns.
5. Check Skip or expired Queue.
6. Reset combat after consuming Once Per Combat.
7. Remove invalid passive combo or transition links.

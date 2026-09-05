---
title: Parry and Reactive Combat
slug: mob-editor-parry
order: 240
description: Guidelines for reactive combat systems such as parry, stagger, and state transitions.
product: mob-editor
category: Advanced Combat
status: Beta
version: 0.1.x
audience: Advanced combat creators
tags:
  - parry
  - reaction
  - combat
---

## Parry concept

Parry is best treated as a system that **interrupts a specific enemy attack inside a valid timing window and changes state**, rather than just a block.

## Key design questions

| Topic | Question |
| --- | --- |
| Detection | Which attacks are marked as parryable? |
| Timing | Which animation window counts as success? |
| Result | Does success cause stagger, knockback, phase cancel, or a counter window? |
| Compatibility | Does it require Better Combat or a specific animation system? |

## Suggested flow

1. Tag parryable attacks first.
2. Check whether the enemy is currently in an attack state.
3. Apply a short `parried` state on success.
4. Chain into a stagger pattern or counter window.
5. On failure, fall back to default damage or block handling.

:::warning Note
In multiplayer, state transitions and feedback are usually safer than heavy freeze-frame style effects.
:::

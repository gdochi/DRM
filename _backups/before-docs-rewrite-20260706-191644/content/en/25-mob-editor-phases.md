---
title: Phases and Balancing
slug: mob-editor-phases
order: 235
description: How to tune combat phases by HP, distance, pattern frequency, and player response time.
product: mob-editor
category: Combat Authoring
status: Beta
version: 0.1.x
audience: Combat pattern creators
tags:
  - phase
  - balance
  - pattern
---

## How to split phases

A phase is not just a way to add more attacks as HP drops. It is a way to **change the rhythm of the fight**.

| Basis | Example |
| --- | --- |
| HP | change patterns at 70%, 40%, or 15% |
| Distance | separate close-range and long-range patterns |
| Time | force a pattern after a fixed interval |
| State | parried, staggered, enraged, and so on |

## Pattern frequency

- Give powerful patterns longer cooldowns.
- Use readable startup for patterns that require reaction.
- Add intentional recovery windows after chains.
- Avoid instant-kill style patterns immediately after a phase change.

## Test criteria

1. Repeat at least five runs with the same gear.
2. Test both beginner and experienced player assumptions.
3. Confirm it remains dodgeable under server delay.
4. Confirm parry, knockback, or status effects do not break phase transition.

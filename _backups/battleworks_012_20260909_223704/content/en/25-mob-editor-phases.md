---
title: Pattern Selection, Combos, and Health Phases
slug: mob-editor-phases
order: 260
description: Control pattern eligibility, weighted selection, combo links, and latched health phases.
product: mob-editor
section: combat
category: Battleworks
status: Guide
version: 0.1.1
audience: Combat content creators
tags:
  - battleworks
  - combat
---

## Define eligible patterns

Select a pattern and edit its Core and Score properties. Disabled patterns and patterns outside their conditions are excluded from ordinary selection.

| Condition | What to check |
| --- | --- |
| Distance and height | Minimum/maximum distance and allowed vertical difference |
| Health | NPC and target health-ratio bounds |
| Phase | Minimum and maximum allowed phase |
| Visibility and target | Required line of sight and required target |
| Cooldown | Per-pattern reuse delay |

Health ratios use 0–1 values; 0.5 means 50% of maximum health. A melee pattern with maximum distance 2.7 can start only when its target is within that distance. Tune the actual hitbox reach separately.

## Scores and pacing

Use **Combat Rules → Manager** for shared selection rules. Eligible candidates are selected using priorities, scores, a selection floor, and weighting.

- Adjust each pattern's base score and preferred distance.
- Tune multipliers for the same pattern, recent patterns, and repeated roles.
- Adjust mobility urgency and penalties for consecutive stationary patterns.
- Keep per-pattern cooldown, global cooldown, and post-pattern recovery waits distinct.

A high score does not bypass distance or phase eligibility. If no pattern qualifies, the runtime waits and retries; enabled pursuit continues between those attempts.

## Combos

The pattern's Combo properties specify a next pattern ID, chance, and delay. Manager limits combo depth. The next pattern must exist and satisfy its execution conditions.

**Pattern Graph** shows patterns and combo connections. It is not a general-purpose visualization of every possible script flow.

## Health phases

Add phases under **Combat Rules → Phase**.

| Example | Phase Index | Enter Health Ratio |
| --- | --- | --- |
| Opening | 1 | 1.0 |
| Escalation | 2 | 0.6 |
| Final phase | 3 | 0.3 |

A phase latches to the highest index reached during the encounter. Healing does not return the NPC to an earlier phase. A `Transition Pattern` can run when the phase advances; check that pattern's target, distance, and health conditions as well.

Losing the target for Combat Reset Delay resets encounter state. It does not heal the NPC, so a new encounter can immediately enter a later phase if its health is already below that threshold.


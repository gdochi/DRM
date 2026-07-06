---
title: Target Filters
slug: tacz-target-filters
order: 335
description: How to restrict firearm NPC targets by faction, tag, entity, and distance rules.
product: cnpc-tacz-fire
category: Firearm AI
status: Beta
version: 0.1.x
audience: Firearm NPC creators
tags:
  - target
  - filter
  - faction
---

## Why target filters matter

Firearm NPCs often have longer range and higher impact than melee NPCs. If they shoot the wrong target, the issue is much more visible. Define valid targets clearly first.

| Basis | Example |
| --- | --- |
| Faction | do not attack the same side |
| Tag | attack only targets with a specific event tag |
| Entity ID | attack only specific monsters or NPCs |
| Distance | ignore targets outside a configured range |

## Suggested setup

1. Verify default hostility first.
2. Exclude same-faction targets.
3. Add event tag exceptions.
4. Use separate filter presets for boss fights or faction battles.

:::tip Recommendation
Do not build complex filters in one step. Add them gradually in the order faction → tag → entity exceptions.
:::

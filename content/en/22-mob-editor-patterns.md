---
title: Pattern and Hitbox Design
slug: mob-editor-patterns
order: 230
description: A practical workflow for building attack patterns, timelines, and hitboxes.
product: mob-editor
category: Combat Authoring
status: Beta
version: 0.1.x
audience: Combat pattern creators
tags:
  - pattern
  - hitbox
  - timeline
---

## How to split a pattern

Instead of building one large attack blob, it is easier to manage attacks as **startup > active > recovery**.

| Phase | Description | Example |
| --- | --- | --- |
| Startup | warning, pose, wind-up | lifting a weapon, pre-effect cue |
| Active | actual hit detection | hitbox spawn, projectile fire |
| Recovery | return to control | stagger end, movement unlock |

## Timeline tips

- Write animation frames and hitbox start frames together.
- Separate AoE spawn timing from duration.
- Reuse the same pattern with different short-range or long-range conditions.

## Debug points

1. Use playback to verify hitbox location and direction.
2. Confirm model-space and actual collision-space are aligned.
3. Confirm movement or rotation locks are released after the pattern ends.

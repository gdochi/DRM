---
title: Detection and Patrol AI
slug: mob-editor-detection-patrol
order: 225
description: Guidelines for NPC detection angle, sight, patrol movement, and facing direction.
product: mob-editor
category: AI & Detection
status: Beta
version: 0.1.x
audience: Combat AI creators
tags:
  - detection
  - patrol
  - ai
---

## Detection baseline

Detection should combine **distance, angle, and sight state**. If an NPC fails to detect a player standing almost next to it, check Detect Angle and forward-vector calculations first.

| Item | Meaning | Check |
| --- | --- | --- |
| Detect Range | detection distance | verify range and vertical difference handling |
| Detect Angle | forward-facing detection cone | ensure close players do not fall outside the cone |
| Line of Sight | sight blocking | check blocks, height, and transparent block rules |
| Alert State | transition into combat | confirm the NPC is not locked in another state |

## Patrol movement principles

A patrolling NPC should not look like it is being dragged by a vector. Movement must be connected to an actual walking state, and animation speed should match movement speed.

1. Choose the next path target.
2. Calculate movement direction.
3. Rotate the NPC toward movement direction.
4. Play walking animation.
5. On arrival, switch to idle guard state.

## Circular watch versus movement direction

Circular watch should run **only while the NPC is standing still and guarding a position**. While the NPC is moving in patrol, it should face the movement direction.

:::warning Note
If circular watch also runs during movement, both systems may overwrite rotation and make the NPC look sideways or backward.
:::

---
title: Patterns, Actions, and Hitboxes
slug: mob-editor-patterns
order: 230
description: Understand timed action groups and edit individual hitbox contacts on the timeline.
product: mob-editor
section: authoring
category: Battleworks
status: Guide
version: 0.1.1
audience: Combat content creators
tags:
  - battleworks
  - CustomNPCs
  - combat
---

## Start with a pattern

Select a pattern directly in **Pattern Workbench**, or use **Find pattern** to search by name or ID. Choose a stage inside the pattern before adding its actions.

| Stage | Purpose | Example duration |
| --- | --- | --- |
| Windup | Preparation, facing, and telegraphing | 6 ticks |
| Action | Attack motion and hit contacts | 18 ticks |
| Recovery | Recovery and an opening before the next choice | 12 ticks |

At normal tick speed, 20 ticks equal one second. This example lasts 36 ticks. A contact at Action tick 9 appears at tick 15 on the complete pattern timeline.

## What Timed actions and events mean

An **event groups actions that execute together**. It is separate from the animation catalog and pattern list. Its actions share a start tick, repeat interval, execution count, and chance.

For example, put a blade Hitbox and a tip Hitbox in the same `hit` event at Action tick 6. Each action has a separate selectable timeline row. Moving a pin belonging to that event retimes the shared group. Use a separate event group when an action needs different timing or repetition.

| Setting | Example |
| --- | --- |
| First execution | Action tick 6 |
| Repeat interval | 5 ticks |
| Execution count | 3 |
| Resulting executions | Action ticks 6, 11, and 16 |

Repeats beyond the end of the stage do not run. Repeated contacts do not repeatedly restart the attack animation.

## Attach actions

1. Select a stage and choose **+ Action**.
2. Choose Hitbox, Skill, Animation, or a movement/facing control action.
3. Use **Choose from list** for Hitbox and Skill references. Skills come from DRM's exposed catalog and may require their provider mod.
4. Select the named timeline row to edit that individual action.
5. Drag its pin to change the execution tick. Scroll when the timeline contains more rows.

## Edit reusable hitboxes

**Hitbox Library** supports box, capsule, sphere, cylinder, sweep, and polygon shapes. Adjust damage, shape-specific dimensions, XYZ offsets, rotation, and sweep arcs where applicable.

A hitbox definition does not own an execution tick or animation. Editing it changes the geometry used by patterns referencing that ID in the same document. Set contact timing on the pattern's Hitbox action.

The **Pattern:** selector in the hitbox screen chooses a pattern/action location that uses this hitbox. The clip list beside the model selects animation. Use **Edit pattern** to return to the owning pattern.

## Resize the workspace

- Drag vertical dividers to resize the list, central workspace, and inspector.
- Drag the horizontal divider in the hitbox screen to resize the model and timeline heights.
- Drag the model/clip-list divider to change their widths.
- Use **directional header arrows** to fold or unfold panels. **Reset panels** restores the default arrangement.
- Front, Iso, and Side change camera orientation; the model toolbar's − / + buttons control zoom.

Panel layout is saved in client settings and does not alter the NPC's combat document.


---
title: Battle Presentation Maker Functional Guide
slug: cobblemon-battle-presentation
order: 530
description: Understand the Battle Presentation Maker workspace, document limits, preview, saving, assignment, and runtime transition.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Draft
version: 0.1.0
audience: Battle presentation creators
tags:
  - presentation
  - editor
  - workflow
---

## Runtime purpose

`Battle Presentation Maker` builds the full-screen sequence shown before Cobblemon owns the battle. The editor Canvas and timeline are creator previews; they do not directly move entities in the world.

1. The server validates the trainer, conditions, and player party.
2. Optional Battle Positioning aligns the NPC and player.
3. The server sends presentation JSON, opponent name, and player lead-ball data to the client.
4. The client opens a non-pausing full-screen sequence that consumes input.
5. Completion or an allowed skip is returned to the server.
6. Conditions are rechecked and the round's `Battle start delay` elapses before Cobblemon starts.

Presentation success does not replace battle validation. A missing target or invalid party can still cancel the battle.

## Four work areas

| Area | Interaction | Saved result |
| --- | --- | --- |
| Layers | Add, select, remove, and drag Label, Texture, and Color rows | Element list and Z order |
| Canvas | Preview the current tick and directly select or move elements and actors | Element start/end position or actor X/Y |
| Inspector | Switch among Element, Models, Background, and Audio | Content, transforms, motion, actors, and sounds |
| Timeline | Play, pause, restart, scrub, and drag range handles | Per-element active ranges |

Player Model and Opponent Model are special actor rows that cannot be deleted. Disable `Render Selected Model` to hide one. Dragging user rows recalculates Z values so the list, preview, and saved document use the same order.

## Limits and coordinates

| Item | Range |
| --- | ---: |
| Duration | 1–600 ticks, up to 30 seconds |
| Elements | Up to 64 |
| Default Stage | 960×540 logical coordinates |
| Element width / height | 1–3840 / 1–2160 |
| Z | -1000–1000 |
| Label text | Up to 512 characters |
| Font size | 4–128 |
| Motion scale | 0.01–20 |
| Motion rotation | -3600–3600 degrees |
| Alpha and image opacity | 0–1 |

The Stage origin is top-left; X increases right and Y increases down. The default center is X 480, Y 270. Runtime projection maps the Stage into the window and scissors content outside the viewport.

## File actions

| Action | Behavior |
| --- | --- |
| `Create New` | Opens a safe template and the guided tutorial. |
| `Reset` | Restores the trainer presentation default; unsaved changes are lost. |
| `Load` | Switches to a document under `cobblemon/battle_presentations/`. |
| `Save` | Updates the current path. A new draft falls through to `Save As`. |
| `Save As` | Writes a new relative path such as `custom/gym_intro.json`; `.json` is added when omitted. |

Name is display metadata inside the JSON. Trainers reference the `Save As` file path, not the Name value.

## Recommended build order

1. Set Duration and Skippable.
2. Configure World Background and Stage Image.
3. Block out the composition with large Color layers.
4. Place Player and Opponent actors and choose their Z order.
5. Add Label and Texture content.
6. Set active ranges and fades.
7. Add motion and easing.
8. Configure Intro and Battle audio and play the full sequence.
9. Save under `custom/`, then select that path in Cobblemon Editor.
10. Save the battle document and reapply it to the NPC.

The editor preview and runtime share the renderer, but real skins, NPC models, aspect ratio, and sound resources must still be verified in an actual battle.

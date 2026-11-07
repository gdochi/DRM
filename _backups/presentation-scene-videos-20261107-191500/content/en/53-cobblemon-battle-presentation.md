---
title: Battle Presentation Maker Functional Guide
slug: cobblemon-battle-presentation
order: 530
description: Make a trainer entrance with text, pictures, models and sound.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Draft
version: Fabric / NeoForge 0.2.9
audience: Battle presentation creators
tags:
  - presentation
  - editor
  - workflow
---

## Edit the scene at a specific time

Use the middle preview together with the timeline below it. This is the default Trainer entrance at **tick 0**. Use **Play** or drag the ruler to the time when its text, models and effects appear.

![Default entrance canvas and layer timeline at 0/144 ticks.](assets/media/guides/cobble-029-neo1211/cobble-presentation.png "0.2.9 / NeoForge 1.21.1. Layers/categories are left; settings for the selected layer are right. This is the authoring view, before runtime playback.")

## Make an entrance

1. Open **Battle Presentation Maker** from DRM's editor list and load an example.
2. Use **Add Label** for VS text and **Add Texture** for pictures.
3. Arrange text, pictures and models on the canvas.
4. Set their start/end times on the timeline and play the preview.
5. Use **Save As**.
6. Choose the file under the trainer's **General → Battle Presentation**.

The scene plays before battle. **Duration** is its length; the round's **Battle start delay** is extra waiting afterward. **Skippable** lets players skip it.

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
10. Save the battle document; an NPC tracking that source path normally needs no reapply.

Arrange the scene in preview, then play a battle to check the real skins, models, window size and sound.

The image browser pages its results and loads thumbnails as needed, reducing the initial cost in large resource packs.

## Party models and Motion

Choose `Actors` → `Player` or `Opponent` → `Trainer / 1–6`. Each side has six slots with independent Render selected model, Transform, Pose, and Motion settings. Normal presets hide party slots; `presets/vs_party_showcase.json` enables an optional 6+6 example.

Previews use sample Pokémon; actual battles use server-provided party appearance. Missing slots stay empty. Hidden slots do not expose species, moves, stats, or held items. Models are not spawned into the world.

Motion edits start/end, entrance/exit duration, offsets, scale, and drift. JSON reference: `actors.*.animation.fitToModel` fits the full model; `camera` holds up to 64 tick-based position/zoom/rotation keyframes. Edit that list in JSON and check it in the shared preview renderer. Supported easing includes step, linear, ease_in, ease_out, and ease_in_out. Presentation schema is 5, with earlier 1–4 documents readable.

## New presets

| File | Duration at 20 TPS | Purpose |
| --- | --- | --- |
| `presets/vs_trainer.json` | 144 ticks / 7.2 s | Trainer reveal and name |
| `presets/vs_pokemon.json` | 132 ticks / 6.6 s | Wild encounter |
| `presets/vs_boss_trainer.json` | 168 ticks / 8.4 s | Boss trainer |
| `presets/vs_legendary_pokemon.json` | 184 ticks / 9.2 s | Legendary Pokémon |
| `presets/vs_party_showcase.json` | 168 ticks / 8.4 s | Optional 6+6 party reveal |

New general presets use full-screen backgrounds and full-model fitting. Treat defaults as templates and use Save As for custom files. Do not overwrite user scenes wholesale.

Effects include raster_warp, vs_ribbon, versus_mark, iris_shutter, arena_depth, wild_meadow, wild_grass, rift_sky, ground_shadow, light_sweep, and dust_motes. Bind scenes to ordinary wild, RCT, or PvP battles in [Encounter Presentations](#drm-cobblemon-editor/cobblemon-encounter-presentations).

## Block stages, FX and scheduling

See [block stages and FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx) for Region/FX authoring in 0.2.4, and [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler) for clone, scene and battle execution.

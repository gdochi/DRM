---
title: Block Stages and FX
slug: cobblemon-presentation-region-fx
order: 533
description: Capture a world region into presentation JSON and author particle choreography.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Usage guide
version: Fabric / NeoForge 0.2.9
audience: Battle presentation creators
---

## Use world blocks as a stage

Battle Presentation Maker's **Region** embeds selected block states in the presentation JSON. It is a visual stage for the battle entrance, not a tool that places or restores world blocks. The saved shape remains available after the original location changes or the battle happens elsewhere.

1. Load the chunks containing the structure.
2. Set two Region corners or use world-area selection to move and resize the box.
3. Apply the validated selection, then use **Capture region**.
4. Adjust Yaw, Pitch, Zoom, Offset and end rotation to frame the stage.
5. Play the timeline with models and layers, then Save or Save As in the toolbar.

Capture alone does not persist the stage to disk. Capture again after changing the selected area. World selection never changes blocks, and Esc cancels it.

![Captured flooring and pillars saved as a presentation file.](assets/media/guides/cobble-029-neo1211-flow/cobble-region-captured.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. After capturing 31 blocks and two block states, Save As created custom/guide_stage.json. Saved on the right and the bottom status confirm the save.")

## Capture a block stage and add particles on video

![Enter two corners, capture real world blocks, add a particle layer, preview, and save a custom file.](assets/media/guides/tutorial-videos-20261107/battle-region-particles.mp4 "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. The floor and pillars were prepared in the recording world. English UI and annotations; silent.")

1. Start with a small structure. The corners **(4, −61, 4)** and **(8, −58, 8)** belong to the recording world; substitute your own coordinates.
2. Use **Region → Capture region** and check that the block shape appears. Entering coordinates alone does not capture it. Check loaded chunks, bounds and empty regions if nothing appears. If Region preview works but full playback hides the stage, also check opaque backgrounds and Color layers in the preset.
3. Choose **Particles → Add layer → Emit**. The video uses the new layer's default particle. Preview it first, then change the interval, Interval or Samples one setting at a time.
4. **Motion** controls particle motion, **Path** controls its route, and **Cues** handles timed effects. Expand after understanding one Emit layer. The video does not demonstrate detailed edits on those three pages.
5. Use **Play**, then **Save As → custom/tutorial_stage.json → Save**. Capturing blocks and adding particles edit the draft; saving the file is a separate step.

## Capture limits

| Item | Current limit / behavior |
| --- | --- |
| Length per axis | Up to 128 blocks |
| Stored blocks | Up to 32,768 supported non-air blocks |
| Distinct block states | Up to 512 |
| Chunks | Entire region must be loaded |
| Block entities such as chests | Reject capture when present; select a region excluding them |

Oversized regions, too many states or no capturable blocks prevent capture. The visual stage does not tick, so it does not reproduce functional redstone or container behavior.

## Author FX

Add a particle entry in **Particles**, choose its particle ID/options, then use Emit, Motion, Path and Cues to set timing, count/interval, shape, dimensions, position, velocity and path. Copy/Paste transfers entry settings.

Start with one particle and a short interval, then preview it with the actor, block stage and camera. These are presentation visuals, not world attacks or damage hitboxes. External-mod particles require their provider mod.

![A particle layer added under Particles, with the presentation playing.](assets/media/guides/cobble-029-neo1211-flow/cobble-presentation-fx.png "Choose Particles → Add layer, then edit Emit on the right. This entry uses minecraft:end_rod, ticks 0–39, Interval 2 and Samples 24. Play runs the editor’s presentation preview.")

## Connect the result

Use the presentation through trainer bindings, wild/RCT/PvP integration, or the [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler). Presentation JSON remains schema `5`. See [layers and runtime](#drm-cobblemon-editor/battle-presentation-layers-runtime) for text, images, actors, audio and timing.

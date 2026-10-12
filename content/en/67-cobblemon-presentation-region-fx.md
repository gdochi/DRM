---
title: Block Stages and FX
slug: cobblemon-presentation-region-fx
order: 533
description: Capture a world region into presentation JSON and author particle choreography.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Usage guide
version: 0.2.4
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

## Capture limits

| Item | Current limit / behavior |
| --- | --- |
| Length per axis | Up to 128 blocks |
| Stored blocks | Up to 32,768 supported non-air blocks |
| Distinct block states | Up to 512 |
| Chunks | Entire region must be loaded |
| Block entities such as chests | Skipped; inventories, NBT and entities are not stored |

Oversized regions, too many states or no capturable blocks prevent capture. The visual stage does not tick, so it does not reproduce functional redstone or container behavior.

## Author FX

Add a particle entry in **FX**, choose its particle ID/options, then use Emit, Motion, Path and Cues to set timing, count/interval, shape, dimensions, position, velocity and path. Copy/Paste transfers entry settings.

Start with one particle and a short interval, then preview it with the actor, block stage and camera. These are presentation visuals, not world attacks or damage hitboxes. External-mod particles require their provider mod.

## Connect the result

Use the presentation through trainer bindings, wild/RCT/PvP integration, or the [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler). Presentation JSON remains schema `5`. See [layers and runtime](#drm-cobblemon-editor/battle-presentation-layers-runtime) for text, images, actors, audio and timing.

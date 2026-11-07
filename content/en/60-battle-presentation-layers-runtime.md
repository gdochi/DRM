---
title: Text, Pictures, Models and Timing
slug: battle-presentation-layers-runtime
order: 531
description: Place text and models, add movement, and time pictures and sound.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Draft
version: Fabric / NeoForge 0.2.9
audience: Creators arranging battle entrances
tags:
  - layers
  - timeline
  - actors
  - audio
---


## Move one text layer

In Battle Presentation Maker follow **Element → Add Label → Content**. Label sets text, Font Size sets its size and Color its color. Layout controls position and box dimensions; Animation separately controls timing and movement.

![Content properties after adding a Label.](assets/media/guides/cobble-029-neo1211/cobble-layer-content.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. {opponent_name} in Label resolves to the opponent’s name. The cursor is at tick zero, the beginning of Fade In, so the canvas text is not yet visible. Use Play to inspect its active interval.")

![Animation properties for that Label.](assets/media/guides/cobble-029-neo1211/cobble-layer-animation.png "Start/End Tick is the visible interval; Start/Final X are departure and arrival positions. This example runs 0–144 ticks, moves X 280→360 while keeping Y 220, and grows from 0.8 to 1. Check that the same element is selected in the timeline.")

## Set entrance, movement and exit on video

Continue with **RIVAL CHALLENGE** from the [first Label guide](#drm-cobblemon-editor/cobblemon-battle-presentation). In normal playback, **20 ticks = 1 second**. Scene Maker's time fields use seconds instead.

![Set the Label interval, fades and start/final positions, then compare playback and timeline seeks.](assets/media/guides/tutorial-videos-20261107/battle-animation-timing.mp4 "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. Real Animation inputs → Restart → seek before and inside the interval. English UI and annotations; silent.")

| Video value | Meaning |
| --- | --- |
| Start **20**, End **120** | Active from 1 to 6 seconds after the presentation begins |
| Fade In **12**, Fade Out **12** | Fade for 0.6 seconds at each end of the active interval |
| Start X **−300**, Final X **320** | Move from outside the left edge to the final position |
| Start Y / Final Y **70** | Keep the same height while moving horizontally |

1. Select the Label and open **Animation**. Selecting an actor shows different fields.
2. Enter the table's values. Position interpolates across the active interval; Fade multiplies the resulting opacity.
3. Switch **Layout → Animation** to commit the values, then use **Restart**. The default Duration is **144 ticks / 7.2 seconds**, so you can also inspect the time after the Label's exit.
4. Seek to **tick 10** to see the inactive state, then **tick 75** to see the moving Label. Save after editing.
5. Adjust Start/End spacing and Easing for speed. Layer/Z controls overlap; Start/End controls time. A covered Label and a Label that has not started require different fixes.

## Element types

| Type | Rendering | Important fields |
| --- | --- | --- |
| `Label` | Centers text inside its box and clips text that exceeds box width | Text, Font Size, Color, partial text styles |
| `Texture` | Draws a Minecraft resource image; an unresolved texture may fall back to a colored box | Image, Opacity, Fit, Crop |
| `Color` | Draws an ARGB rectangle | Color, box dimensions, Alpha |

Use `{player_name}` to show the player's name and `{opponent_name}` to show the opponent's name.

Image must be a resource ID such as `namespace:textures/gui/file.png`, not an absolute file path. `Stretch` distorts to the full box, while `Contain` preserves aspect ratio and centers the full image. Crop selects the source rectangle before fitting.

## Position and Canvas dragging

Layout X/Y is synchronized with the final motion position. Dragging an element on Canvas moves both Start X/Y and Final X/Y by the same delta, preserving its existing travel distance.

For a slide-in:

1. Place the final position on Canvas.
2. Move only Start X or Start Y outside the Stage.
3. Set start/final scale and rotation.
4. Play the whole active range to judge easing.

Width and Height define the design box. Font Size is separate, so resizing a Label box does not automatically resize its text.

## Timeline calculation

| Field | Runtime calculation |
| --- | --- |
| Start / End Tick | Outside the range, the element is not rendered. End is normalized to at least one tick after Start. |
| From / To | Position, Scale, Rotation, and Alpha interpolate over active progress. |
| Fade In | Multiplies computed Alpha from 0 to 1 after Start. |
| Fade Out | Multiplies Alpha from 1 to 0 before End. |
| Easing | Changes From/To progress; the final Alpha also receives fade multipliers. |

| Easing | Result |
| --- | --- |
| `Linear` | Constant speed |
| `Ease In` | Accelerates from a slow start |
| `Ease Out` | Decelerates into the target |
| `Ease In Out` | Smooth start and finish |
| `Back Out` | Overshoots, then returns |
| `Step` | Holds From until the end, then switches to To |

Dragging the timeline ruler pauses playback. It resumes on release only when playback was running before the drag. To retest Intro Audio, scrub before its Start Tick and play forward.

## Z order with actors

Player and Opponent each have a Z value. Runtime walks normal elements by Z and inserts an actor when the actor Z becomes less than or equal to the next element Z.

A useful stack is background at 1, panels at 5–12, opponent/player at 23–24, name labels at 30–31, VS at 40, and a final flash at 100. If text appears behind a model, inspect Z before moving coordinates.

## Actor models

| Setting | Behavior |
| --- | --- |
| Visible | Disables actor rendering when off |
| `Humanoid` | Uses Steve/Alex rendering plus head, body, arm, and leg pose rotations |
| `Pokemon` | Uses whole-model rotation; limb pose is not applied |
| `Auto` | Legacy compatibility; use an explicit type for new work |
| X/Y | Stage position at the model base |
| Scale and Yaw/Pitch/Roll | Whole-model size and rotation |
| Z | Order relative to normal elements |

Player shows the player with their lead Pokémon’s ball. Opponent shows the target NPC. Both can be positioned and layered with the scene.

When the editor has no target NPC, it may show a sample Bulbasaur. That sample does not prove that the chosen model type matches the final NPC.

## Background and audio

World Background covers the full window behind the Stage and has its own color, opacity, and fades. A Color element is a Stage layer with normal Z and timeline behavior. Stage Image is a single fixed image behind Stage elements with opacity, fit, and crop.

| Audio | Runtime behavior |
| --- | --- |
| Intro | Starts once when playback crosses Start Tick. Skip, missing target, or interruption stops it. Normal completion may let a long tail continue across transition. |
| Battle | Does not play on the presentation timeline. It is passed to battle control after presentation completion. |

Inspector Play/Stop previews only the selected sound and does not move the timeline. Every client must have the referenced Minecraft sound resource.

## Skip and cancellation

When Skippable is enabled, `Esc` or `Space` sends a skipped result. Skipping must be enabled in the saved scene.

Dead or missing players, removed or invalid targets, an interrupted client screen, failed condition recheck, and invalid battle parties may safely cancel startup. Test the first frame, audio trigger, middle, final flash, skip, real battle, and post-battle restore as one complete flow.

## Block stages, FX and scheduling

See [block stages and FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx) for Region/FX authoring in 0.2.4, and [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler) for clone, scene and battle execution.

---
title: Layer, Timeline, Actor, and Audio Behavior
slug: battle-presentation-layers-runtime
order: 531
description: Learn how each presentation field affects frame rendering and the transition into a real Cobblemon battle.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Draft
version: 0.1.4
audience: Creators tuning presentation timing and runtime behavior
tags:
  - layers
  - timeline
  - actors
  - audio
---

## Element types

| Type | Rendering | Important fields |
| --- | --- | --- |
| `Label` | Centers text inside its box and clips text that exceeds box width | Text, Font Size, Color, partial text styles |
| `Texture` | Draws a Minecraft resource image; an unresolved texture may fall back to a colored box | Image, Opacity, Fit, Crop |
| `Color` | Draws an ARGB rectangle | Color, box dimensions, Alpha |

`{player_name}` and `{opponent_name}` bind to runtime participants. A partial style stored over a placeholder token is inherited by the replacement name.

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

The runtime Player actor is the actual player and receives the lead Pokémon's ball as a visual main-hand override. Opponent uses the target CustomNPCs entity. An actor does not render if its entity is not a live LivingEntity.

When the editor has no target NPC, it may show a sample Bulbasaur. That sample does not prove that the chosen model type matches the final NPC.

## Background and audio

World Background covers the full window behind the Stage and has its own color, opacity, and fades. A Color element is a Stage layer with normal Z and timeline behavior. Stage Image is a single fixed image behind Stage elements with opacity, fit, and crop.

| Audio | Runtime behavior |
| --- | --- |
| Intro | Starts once when playback crosses Start Tick. Skip, missing target, or interruption stops it. Normal completion may let a long tail continue across transition. |
| Battle | Does not play on the presentation timeline. It is passed to battle control after presentation completion. |

Inspector Play/Stop previews only the selected sound and does not move the timeline. Every client must have the referenced Minecraft sound resource.

## Skip and cancellation

When Skippable is enabled, `Esc` or `Space` sends a skipped result. The server proceeds only if the authoritative document also allows skipping.

Dead or missing players, removed or invalid targets, an interrupted client screen, failed condition recheck, and invalid battle parties may safely cancel startup. Test the first frame, audio trigger, middle, final flash, skip, real battle, and post-battle restore as one complete flow.

---
title: Battle Presentation Maker
slug: cobblemon-battle-presentation
order: 530
description: Build pre-battle layers, timeline motion, actors, backgrounds, audio, and trainer assignments.
product: drm-cobblemon-editor
category: Battle Presentation
section: presentation
status: Draft
version: 0.1.0
audience: Battle presentation creators
tags:
  - presentation
  - timeline
  - audio
---

## Editor and runtime

`Battle Presentation Maker` is the creator-facing editor for the screen shown immediately before a battle. Its central Canvas previews the selected timeline tick and does not change the world. Players see the runtime version only after the saved presentation is assigned to a trainer and a real battle starts.

Choosing `Create New` opens a guided tutorial. You can reopen it with `Help` while editing.

## Workspace

| Area | Purpose |
| --- | --- |
| Layers on the left | Add, select, remove, and reorder Label, Texture, and Color layers |
| Canvas in the center | Preview the current tick and directly move or resize elements |
| Inspector on the right | Edit Element, Actors, Background, and Audio settings |
| Timeline at the bottom | Scrub playback and edit each layer's active start and end ticks |

Player Model and Opponent Model are special actor layers that cannot be deleted. Turn off `Render Selected Model` when an actor should not be visible. For normal elements, a higher Layer value draws farther forward.

## Basic settings

| Setting | Meaning |
| --- | --- |
| Name | Display name stored in the JSON document |
| Duration | Total sequence length; 20 ticks are about one second |
| Skippable | Allows the player to skip the sequence when supported by the runtime |
| Background | Solid color or texture behind the presentation |

The authoring stage is 960×540. Runtime rendering scales the stage to the player's current window, so test small GUI scales and several aspect ratios.

## Element layers

| Layer type | Common use |
| --- | --- |
| `Label` | Trainer names, versus text, chapter labels, or alerts |
| `Texture` | Logos, frames, portraits, particles, or decorative UI images |
| `Color` | Panels, dim overlays, flashes, bars, and screen wipes |

Every layer has a unique ID, position, size, draw order, active tick range, and type-specific settings. Keep IDs stable after saving; duplicate IDs make timeline edits ambiguous.

## Timing and motion

Set `Start Tick` and `End Tick` to control when a layer is visible. Use the timeline handles for broad timing, then enter exact values in the inspector. Motion settings interpolate the element from its start transform to its end transform during the active range.

Build the sequence in this order:

1. Set the total Duration.
2. Place the background and long-lived color panels.
3. Set the Player and Opponent actor positions.
4. Add names and versus labels.
5. Add short transitions and motion last.

## Actors

The player actor uses the entering player's skin and model at runtime. The opponent actor resolves from the trainer or Pokemon Itself context. The editor preview uses selected preview values, so always verify the final assignment in a real battle.

Actor settings include position, scale, orientation, layer order, render enablement, and active timing. Keep critical text clear of moving models at both the first and last active ticks.

## Audio

Audio settings can play presentation sound and control battle music. Sound values must be valid Minecraft resource IDs available to the client. Test startup, skip, battle transition, victory, loss, and flee paths so music is stopped or restored correctly.

## Save and assign

1. Choose `Save As` and store a user document under `cobblemon/battle_presentations/`, for example `custom/gym_leader.json`.
2. Open the trainer or Pokemon Itself document that should use the sequence.
3. Select the saved presentation path in the battle presentation field.
4. Save the battle document and apply it again to the target NPC.
5. Start a real battle and verify the runtime sequence.

Bundled presets such as `presets/vs_trainer.json`, `presets/vs_pokemon.json`, and `presets/vs_custom.json` are safe starting points. Copy them with `Save As` rather than editing the canonical preset in place.

## Test checklist

- No label, texture, actor, or control overlaps at the first, middle, and final ticks.
- Layer IDs are unique and active ranges stay inside Duration.
- All textures and sounds resolve on a clean client.
- Skip behavior does not leave the screen, mouse, or audio in a locked state.
- The real Cobblemon battle starts afterward and the NPC restores correctly when it ends.

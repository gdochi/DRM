---
title: Pose Editing and Action Mapping
slug: warfare-pose-editor
order: 332
description: Create pose JSON and gun transforms with DW Pose Core, then map them to NPC actions.
product: dochi-warfare
category: Poses
section: combat-ai
status: Draft
version: 0.2.7
audience: NPC creators
tags:
  - pose
  - editor
  - TACZ
---

## Editor and runtime roles

`DW Pose Core` is a Creative-mode pose editor for creators, not an in-combat player screen. Create pose JSON in this editor, then use the `Pose` category in `DW Npc Core` to map saved profiles to the NPC's runtime actions.

In 0.2.7, non-combat pose bindings are persistent authoritative state. They synchronize when a client starts tracking the NPC and resume after combat without replacing the current combat pose. `Save & Apply` writes the authoritative `idle_standing` binding, so the editor preview and spawned NPC use the same profile.

The pose editor currently supports Steve/Alex CustomNPCs player models.

## Open the pose editor

1. Hold `DW Pose Core` in Creative mode.
2. Right-click a CustomNPCs NPC using a Steve or Alex model.
3. Stay within 12 blocks and keep the core in either hand while editing.
4. Edit the pose in `NPC Pose Editor`.

Unsupported models, distant NPCs, and non-CustomNPCs entities cannot be edited.

## NPC preview and body parts

The detached NPC preview is a creator view of the target's skin, armor, and weapon state. Drag to rotate it and use the mouse wheel to zoom. Depending on the selected part and edit mode, direct preview dragging can adjust rotation values or position offsets. Enable `Walking Preview` to inspect how the pose blends with walking motion.

Editable parts are:

* Head
* Body
* Right Arm / Left Arm
* Right Leg / Left Leg
* Gun Render

Each body part exposes X, Y, and Z rotation with two axis modes:

| Axis mode | Meaning |
| --- | --- |
| `Animation` | Keep the axis calculated by TACZ or the player animation. |
| `Custom` | Override that axis with the slider value. |

Keep head tracking and walking legs on `Animation` when they should continue moving. Override only the axes needed for the custom stance.

## Gun render transform

`Gun Render` exposes:

| Value | Use |
| --- | --- |
| Position X / Y / Z | Display position of the gun |
| Pitch / Yaw / Roll | Gun rotation |
| Scale X / Y / Z | Gun scale per axis |

`All Guns` stores a fallback transform for every TACZ gun. `This Gun Only` stores a separate transform for the target NPC's current TACZ gun. A matching per-gun transform takes priority over the all-guns fallback.

## Create, load, and save poses

| Tool | Behavior |
| --- | --- |
| `New` | Creates an empty pose that inherits animation. |
| `Use Base Preset` | Applies a searchable bundled pose as the current draft without loading a JSON file. |
| `Load` | Loads a saved pose JSON. |
| `Save` | Saves the current JSON name. |
| `Save As` | Saves under a new name. Press it again to confirm overwriting an existing name. |
| `Save & Apply` | Saves the profile and applies it as the current NPC's custom idle pose. |
| `Reset` | Reverts all unsaved changes to the last loaded or saved state. |
| Part/value reset | Reverts only the selected part or value. |

Pose files are stored on the server under:

```text
config/dochi_warfare/poses/
```

You do not need to edit this JSON by hand. Its structure is reference material for creators who use external tools or version control.

The 0.2.7 built-in library includes Low Ready, High Ready, and multiple combat, idle, walking, and moving-fire poses. Apply one, adjust only the needed axes and gun transform, then use `Save As` to create a user JSON without modifying the bundled values.

## Map poses to actions

`DW Npc Core > Pose` does not create a pose. It maps built-in or saved poses to actions for the current NPC.

| Group | Actions |
| --- | --- |
| Idle & Awareness | Idle - Standing, Idle - Walking, Alert |
| Ranged Combat | Combat Aim, Firing, Moving Fire |
| Combat Movement | Tactical Advance, Retreat, Reload |
| Equipment & Other Actions | Weapon Switch, Melee Ready, Melee Attack, Grenade Throw |

Each action uses one source:

| Source | Meaning |
| --- | --- |
| `Built-in` | Uses `TACZ Default`, `Low Ready`, `High Ready`, or `Aim Ready`. |
| `Inherit` | Uses the same pose as its linked parent action. |
| `Custom JSON` | Uses a profile saved under `config/dochi_warfare/poses/`. |

The default mapping uses Low Ready for idle standing, with idle walking and Alert inheriting it. Combat aim, reload, weapon switch, melee, and grenade actions default to the shared TACZ-backed DW controller. During reload, the upper-body action remains active while the lower body continues the NPC's actual walk, run, or crouch state. Start by changing only the actions that truly need a custom profile.

## Recommended test flow

1. Create a profile from the Low Ready or High Ready template.
2. Change only the necessary arm and body axes, leaving head and legs on `Animation` when possible.
3. Check both standing and `Walking Preview`.
4. Align the gun with `All Guns`, then correct only unusually shaped guns with `This Gun Only`.
5. Use `Save & Apply` and verify the idle pose in-game.
6. Map one action at a time in `DW Npc Core > Pose`, then separately test firing, reload, movement, and melee switching.

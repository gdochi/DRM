---
title: Save, Simulate, and Run
slug: expanded-support-run
order: 332
description: Save and reload, test real simulations, invoke support, and troubleshoot older files.
product: dochi-warfare-expanded
category: Combat support
section: support
status: Guide
version: 0.3.3
audience: Map creators and operators
---

## Separate saving, testing, and invocation

Finish [timeline placement](#dochi-warfare-expanded/expanded-support-timeline) or [support settings](#dochi-warfare-expanded/expanded-support-actions), then follow these steps.

| Operation | Data | Result |
| --- | --- | --- |
| Save / Save As | Current draft | Named JSON on the server |
| Simulation | Current draft | Temporary actors at normal speed, with terrain and existing actors protected |
| Operator command | Saved file | Actual support with native damage and world effects |
| Tactical order item | Timeline linked by a saved tactic | Actual support at the player-designated point and heading |

**Simulation does not save.** Save the tested draft, then invoke it with an operator command or link it to a [tactical order](#dochi-warfare-expanded/expanded-tactical-orders) and issue items to ordinary players. Older top-down diagrams and run-at-my-position button instructions do not describe this GUI.

## 1. Save a named document

1. Enter a readable title, such as **Road reinforcement**.
2. Click **Save As**.
3. Enter **tutorial_support** as the file name. Title and file name are separate.
4. Click the dialog's save action and wait for server confirmation.
5. Check the document name and modified indicator. Use **Save / Ctrl+S** for subsequent edits.

![Create support, set a title/file name, save, then search and load it.](assets/media/guides/dwe-tutorials-20261109/dwe-files.mp4 "09 · Save As → tutorial_support → confirmation → Load → search → select → load. The server file and reopened arrangement are compared.")

**A click is not confirmation.** Read pending/error status. If another user changed the same file first, reload the latest version and keep your draft under another name.

Read unsaved-change confirmations when creating, resetting, loading, or closing. **Reset restores the saved baseline; Create New creates an empty document.**

## 2. Reload an arrangement

1. Search by file name in **Load**.
2. Select a row and wait for the server summary.
3. Use **Load** inside the dialog.
4. Check event count, times, paths, and center.

**Relative coordinates translates loaded arrangements to the current center.** Switch to **Absolute coordinates first** to retain saved world positions. To reuse the layout elsewhere, set **Center** before loading in relative mode.

## 3. Test with Simulation

1. Begin with a simple document such as one vehicle.
2. Click **Simulation**. Unsaved drafts can be tested.
3. Wait for startup; check the temporary vehicle and elapsed time.
4. Observe routes, start time, lifespan, and reachability.
5. Click **Stop** and check temporary support cleanup.

![Author a route, observe the actual Simulation vehicle, and clean it up with Stop.](assets/media/guides/dwe-tutorials-20261109/dwe-simulation.mp4 "10 · Vehicle support on a real client/integrated server. Separate from command-invoked combat.")

Simulation uses actual temporary entities and native movement at normal speed. Center editing is locked while running; stop before editing.

Terrain and existing actors are protected, so **simulation damage is not a measurement of actual combat damage**. Also check NPC preparation, weapon/aircraft compatibility, server policy, and terrain.

## 4. Invoke actual support

Permission level **2** is required. The example file is **tutorial_support**; omit its extension.

```text
/dw callgimmicks tutorial_support
/dw callgimmicks tutorial_support ~ ~ ~
```

| Invocation | Placement |
| --- | --- |
| No coordinates | Saved world positions |
| Coordinates supplied | Shifts all departures, targets, and destinations from saved origin to invocation coordinates |

Relative command coordinates use the **executor's position**: the player or command block. Y translates the arrangement's height too.

Unsaved edits are not included. Actual invocation differs from protected Simulation; check routes and native weapons in the intended combat area.

A one-shot bombing command is available. Check installed aircraft/payload IDs with completion.

```text
/dw bombard ~ ~ ~ superbwarfare:ju_87 superbwarfare:sc_250 10
```

Here **10 is ticks**, giving the first release after half a second at 20 TPS. The command supports points/areas; author lines in the editor.

## Troubleshoot a stalled step

| Symptom | First check |
| --- | --- |
| Ground click adds nothing | Placement tool, loaded surface, pointer inside world view |
| Missing properties | Event selection, expanded panel, scroll inside properties |
| Number editing blocks another action | Complete empty/unfinished negative inputs and read status |
| Empty vehicle/aircraft/weapon catalog | Actual server catalog and installed combination |
| NPCs do not move | DW AI, prepared Clone or NPCs in departure sphere, riding/hiring/other orders |
| Vehicle cannot spawn/proceed | Clearance, terrain, formation spacing, traversable route |
| Support expires before arrival | Lifetime counts from spawn |
| Load changes placement | Relative/Absolute and current Center |
| Commands differ from draft | Confirmed save, name, invocation coordinates, server policy |
| Save conflict | Load latest file; preserve draft with Save As |

## Files and JSON reference

You do not need to memorize this for the GUI; it is a backup/direct-edit reference.

- Path: `config/dochi_warfare/vehicle_ai/gimmicks/<name>.json`
- Current schema: `dochi.warfare.gimmicks.v6`; v1–v5 remain readable.
- `origin` is the reference, `steps` holds events, and `at_tick` is the start tick.
- A step contains one of `bombard`, `vehicle_support`, `fire_support`, or `npc_move`.
- `lifetime_ticks` is temporary support lifespan. Saved positions remain world coordinates even with relative GUI display.
- `explosion_damage` and `direct_damage` are base explosion/direct-hit HP damage. **Zero sets that component to zero**; blank preserves the native value. They do not change radius or terrain destruction. Native falloff and armor affect damage.

Built-in examples install only when absent. Keep older originals and compare a **Save As** copy.

Return to [your first bombing event](#dochi-warfare-expanded/expanded-support-timeline), or combine [vehicle, gun, and NPC support](#dochi-warfare-expanded/expanded-support-actions).

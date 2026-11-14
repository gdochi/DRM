---
title: Vehicle, Gun, and NPC Support
slug: expanded-support-actions
order: 331
description: Draw support routes and set vehicles, gun support, NPC sources, and timing.
product: dochi-warfare-expanded
category: Combat support
section: support
status: Guide
version: 0.3.3
audience: Map creators and operators
---

## Choose a support tool

Learn the controls in [your first timeline](#dochi-warfare-expanded/expanded-support-timeline) first. These tools can share one document.

| Tool | World input | Start time |
| --- | --- | --- |
| Vehicle support | Drag departure to destination | Vehicle spawn/movement |
| Fire support | Click target and drag approach direction | Support vehicle/aircraft spawn |
| NPC deployment | Drag departure to destination | Clone spawn or selection/movement of existing NPCs |

Test one event of one type before combining several. Finish with [saving, simulation, and invocation](#dochi-warfare-expanded/expanded-support-run).

## 1. Reinforce with one vehicle

1. Choose **Vehicle support** in an empty document.
2. Drag from a traversable ground departure to its destination.
3. Switch to **Select / move** and select the event.
4. Check the vehicle picker. The example retains **one base M1A2**.
5. Enter start **3 seconds**, count **1**, spacing **12**, guard radius **24**, and lifetime **60 seconds**.
6. In **Advanced**, verify that departure and destination differ. Correct them using handles or coordinates.

![Draw a route with start three seconds, one vehicle, spacing 12, guard radius 24, and lifetime 60 seconds.](assets/media/guides/dwe-tutorials-20261109/dwe-vehicles.mp4 "06 · Vehicle route authoring. Video 10 on the save/run page shows actual temporary vehicle spawning, movement, and stopping.")

| Field | Before entering a value |
| --- | --- |
| Count | 1–8 per event; check the route with one first |
| Spacing | Same formation offsets at departure and arrival |
| Faction | Numeric faction ID; normal relationships determine hostility |
| Guard radius | Area defended after arrival |
| Lifetime | Counts from spawn, including travel time |

Units defend the surroundings after arrival. Ground vehicles need a traversable route. Helicopters spawn on terrain and take off with native flight AI; destination Y requests flight height. Fixed-wing aircraft use bombing/gun support.

## 2. Configure gun support

1. Choose **Fire support**, click the target, and drag the approach direction.
2. Check **ground/air mode → vehicle → actual weapon**. Changing mode also resets defaults; check them again.
3. The example uses shot cap **20**, firing window **3 seconds**, distance **48**, and sweep **16**.
4. Set start **5 seconds** and lifetime **30 seconds**.
5. For air support, choose altitude and test approach, firing, and exit over the intended terrain.

![Set gun-support direction, shot cap, duration, distance, and sweep.](assets/media/guides/dwe-tutorials-20261109/dwe-fire.mp4 "07 · Ground support settings. The video does not demonstrate air-mode selection, a different weapon, or actual firing.")

**Start, firing window, and lifetime are separate.** Start schedules spawning; the firing window counts from the **first actual shot**. Firing ends when either the time or shot budget runs out. Terrain, range, safe exit, and lifetime may shorten it.

Only server-supplied machine guns/autocannons are eligible. Bombs, rockets, missiles, and low-speed main guns are excluded. Native RPM, ammo, heat, reload, and safety remain active. Air support attacks and exits; ground support sweeps with its turret.

## 3. Direct existing NPCs

| Source | Preparation and result |
| --- | --- |
| Area | Selects enabled DW NPCs in a sphere around departure at execution time |
| Clone | Spawns copies of an NPC saved in the DW library |

1. Drag departure to destination with **NPC deployment**.
2. Check **Source**. The recording starts in **Area** because its world has no saved clones.
3. Set count **4**, radius **16**, spacing **2**, and DW speed **5**.
4. Set start **2 seconds**, lifetime **30 seconds**. A faction affects selection/spawn conditions.
5. Check departure and destination in **Advanced**, then save.

![Author an area-selected NPC route with count, radius, spacing, speed, and timing.](assets/media/guides/dwe-tutorials-20261109/dwe-npcs.mp4 "08 · Area authoring only; successful movement is not shown. Prepare enabled DW NPCs around departure before running.")

Area uses a **sphere centered on departure at execution time**. Mounted, hired, or already-directed NPCs are excluded. For Clone, enable DW AI on the original before saving it to the library. Complete this preparation if the picker is empty. File IDs may differ from display names.

DW combat takes priority when enemies interrupt movement; the advance resumes afterward. There is no teleport fallback. At expiry, **only newly spawned clones are removed**. Area-selected NPCs recover prior movement settings without blindly overwriting creator edits made during execution.

## Combine support types

Begin with staggered starts: **NPCs at zero seconds → vehicles at three → gun support at five**. Start order does not guarantee arrival order: navigation, physics, and combat still apply.

Review [timing and the center](#dochi-warfare-expanded/expanded-support-timeline), then [save and run](#dochi-warfare-expanded/expanded-support-run). Temporary vehicles cannot be boarded, cloned, or captured in soul stones. Use the [vehicle editor](#dochi-warfare-expanded/expanded-overview) for ordinary vehicles you want to keep.

## Selecting vehicle packs and B-2 support

Vehicle, aircraft, weapon and payload lists depend on server installation and support type. Reselect weapons/payloads after changing aircraft. **B-2 / GBU-57** can be configured when AshVehicle is installed and the catalog allows that combination. Arbitrary aircraft/payload combinations are not supported.

Fixed-wing support needs room to align an attack and depart. 0.3.3 targeting and bombing-route corrections do not guarantee hits over every terrain. Check [compatible vehicles](#dochi-warfare-expanded/expanded-compatibility) and test routes in Simulation first.

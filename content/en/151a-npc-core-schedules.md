---
title: Daily Schedules and Riding
slug: npc-core-schedules
order: 1512
description: Choose working hours, rest periods and vehicles to board.
product: dochi-npc-core
category: Schedules
section: editor
status: Guide
version: 0.1.3
audience: NPC creators
---

## Work by day, rest at night

1. Open **Schedule** on the NPC editor's left rail.
2. Press **Add time** in the middle. Enter a **Time slot name**, such as “Day shift,” on the right and press the **✓** beside it to apply that name.
3. Enter **Start (world ticks) / End (world ticks)** on the right.
4. Use **+** on the time row to add an activity, then select that activity to configure its location and targets.
5. Add a night period with **Rest** or **Sleep in assigned bed**, and assign its resting place or bed.
6. Enable **Enable schedule** above the list, then use **Save to NPC** at the top.

![Schedule immediately after Add time, with a 0–1000 period in the middle and name, start and end fields on the right.](assets/media/guides/dnpc-012-neo1211/dnpc-schedule-add.png "DNPC 0.1.2 / NeoForge 1.21.1. The row's + adds an activity. The name's ✓ applies its name; Save to NPC saves the entire NPC.")

The pictured `0–1000` is the initial period. Change its end time if it should cover a whole working day. A period with no activity, or a disabled schedule, is not a completed worker setup.

| Time | Tick value |
| --- | --- |
| 06:00 | 0 |
| 12:00 | 6000 |
| 18:00 | 12000 |
| 00:00 | 18000 |

Search the action list for jobs such as lumbering, transport or riding. Categories can narrow the search.

![The time row's action picker with categories on the left, specific activities on the right and search above.](assets/media/guides/dnpc-012-neo1211/dnpc-action-picker.png "Movement and waiting contains movement, waiting, riding and patrol. Choose a category, then the actual activity on the right.")

## Assign a bed

![Choose Assign bed in Houses, bind and save the bed, then watch the NPC walk over and sleep.](assets/media/guides/short-videos-color-20261106/dnpc-bed-assignment.mp4 "Recorded in game with DNPC 0.1.3 / NeoForge 1.21.1, English UI. A night schedule was prepared in the capture world; bed binding and actual sleep were verified.")

Choose **Houses → Assign bed**, then **Shift+right-click** the intended bed in the world. Back in the editor, check **Bed assigned** and use **Save to NPC**. Add **Sleep in assigned bed** to the night period and turn on **Enable schedule**. Setting a home's location and assigning its bed are separate steps.

## Start from an example

Use **Load schedule**, pick an example, then change its locations and targets for your world. Filter by general/military schedules and required addons.

![Schedule library opened through Load schedule, showing examples, required addons, category filters and Select.](assets/media/guides/dnpc-012-neo1211/dnpc-schedule-load.png "Read an example, select it and press Select. Cooking examples report unavailable requirements when their addon is missing.")

For example, **Wheat delivery task** collects only wheat, but still needs an output container. **Cooking task** needs a cooking mod and an ingredient source, workstation, output container and recipe. Continue with [cooking](#dochi-npc-core/npc-core-cooking).

On 1.20.1 / 1.21.1, examples also cover DW guard, patrol and escort duties and DWE crews. DW is available on Forge/NeoForge; vehicle duties need DW, DWE and SuperbWarfare. Unavailable examples show what is missing. DW military schedules use one action per period.

An older NPC's **Legacy AI compatibility** keeps its previous behavior. When switching, check both **Schedule type** and the enabled switch.

## Board a boat, horse or vehicle

1. Set a period's activity to **Movement → Ride vehicle**.
2. Find nearby empty vehicles automatically, or select one with 🔍.
3. Set the search center and radius: default 16 blocks, range 1–32.
4. Choose a seat. Start with **-1** automatic selection for vanilla boats, minecarts and horses.
5. Choose whether to dismount when the period ends, then save.

The NPC walks to the vehicle. Attempts default to 600 ticks, adjustable from 20–2400. A vehicle outside the search area or in another dimension cannot be boarded.

Compatible SuperbWarfare vehicles on older targets accept seats 0–63. The ordinary 26.3 vehicle selector uses vanilla vehicles and cannot skip a preceding passenger seat; DW/DWE vehicle features are not available on 26.3. In supported Create environments, **Create seat** is assigned separately as a block.

Dismounting waits until the vehicle stops and a safe exit is available. Configure driving, patrols and weapons in DWE or the vehicle's own settings.

## Create job schedules

Choose crank, valve, polishing, parcel, attendance, processing, ordering, control or inspection from the shift's **+ → Create** category. Follow [Create setup and videos](#dochi-npc-core/npc-core-create-start) for world selection and saving. Seats use **Ride vehicle → Create seat**; counter work uses **Stock Ticker Attendance**.

## Shop opening hours

Connect a DRM shop to a schedule to limit trading hours. Once it closes, trades from an already-open shop screen are also refused.

Check **DRM functions → Use DNPC function schedule** too. When off, directly applied DRM files are used. When on, scheduled bindings take priority; an empty scheduled path disables that function. Enabling this switch alone does not configure opening hours.

![DRM functions with DRM Apply and Use DNPC function schedule.](assets/media/guides/dnpc-012-neo1211/dnpc-drm.png "DRM Apply opens the function-file binding screen. The switch below decides whether scheduled bindings take priority.")

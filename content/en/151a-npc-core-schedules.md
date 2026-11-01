---
title: Daily Schedules and Riding
slug: npc-core-schedules
order: 1512
description: Choose working hours, rest periods and vehicles to board.
product: dochi-npc-core
category: Schedules
section: editor
status: Guide
version: 0.1.2
audience: NPC creators
---

## Work by day, rest at night

1. Open **Daycycle** in the NPC editor.
2. Add a period and name it, such as “Day shift.”
3. Enter its start/end times and choose an activity.
4. Press **✓** beside the period to keep those edits.
5. Add a night period, choose **Rest / Bed**, and assign a resting place or bed.
6. Enable the schedule and save the NPC.

| Time | Tick value |
| --- | --- |
| 06:00 | 0 |
| 12:00 | 6000 |
| 18:00 | 12000 |
| 00:00 | 18000 |

Search the action list for jobs such as lumbering, transport or riding. Categories can narrow the search.

## Start from an example

Use **Load schedule**, pick an example, then change its locations and targets for your world. Filter by general/military schedules and required addons.

On 1.20.1 / 1.21.1, examples also cover DW guard, patrol and escort duties and DWE crews. DW is available on Forge/NeoForge; vehicle duties need DW, DWE and SuperbWarfare. Unavailable examples show what is missing. DW military schedules use one action per period.

An older NPC's **Legacy AI compatibility** keeps its previous behavior. When switching, check both **Schedule type** and the enabled switch.

## Board a boat, horse or vehicle

1. Set a period's activity to **Movement → Ride vehicle**.
2. Find nearby empty vehicles automatically, or select one with 🔍.
3. Set the search center and radius: default 16 blocks, range 1–32.
4. Choose a seat. Start with **-1** automatic selection for vanilla boats, minecarts and horses.
5. Choose whether to dismount when the period ends, then save.

The NPC walks to the vehicle. Attempts default to 600 ticks, adjustable from 20–2400. A vehicle outside the search area or in another dimension cannot be boarded.

Compatible SuperbWarfare vehicles on older targets accept seats 0–63. The 26.3 feature uses vanilla vehicles and cannot skip a preceding passenger seat; DW/DWE vehicle features are not available on 26.3.

Dismounting waits until the vehicle stops and a safe exit is available. Configure driving, patrols and weapons in DWE or the vehicle's own settings.

## Shop opening hours

Connect a DRM shop to a schedule to limit trading hours. Once it closes, trades from an already-open shop screen are also refused.

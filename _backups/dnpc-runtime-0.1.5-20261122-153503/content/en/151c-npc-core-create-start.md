---
title: Create Integration · Cranks, Valves and Seats
slug: npc-core-create-start
order: 1514
description: Add Create jobs to a schedule, assign devices and standing positions, and verify native operation.
product: dochi-npc-core
category: Create integration
section: editor
status: Guide
version: 0.1.3
audience: Creators / server operators
---

## Choose a job

DNPC schedules decide when and where an NPC works. Create owns the actual rotation, stress, recipes and logistics network.

| Goal | Schedule action | Guide |
| --- | --- | --- |
| Supply crank input | Operate hand crank | This page |
| Turn a valve through its configured angle | Operate valve handle | This page |
| Sit during a shift | Mount vehicle → Create seat | This page |
| Polish, deliver parcels or attend a counter | Sandpaper Polishing / Addressed Parcel Delivery / Stock Ticker Attendance | [Logistics](#dochi-npc-core/npc-core-create-logistics) |
| Supply machines and order missing materials | Factory Process / Material Ordering | [Factory processing](#dochi-npc-core/npc-core-create-factory) |
| Respond to sensors and inspect equipment | Conditional Machine Operation / Factory Inspection | [Control and inspection](#dochi-npc-core/npc-core-create-control) |

## Installation and video scope

Install a real Create distribution for your Minecraft version and loader, together with its required dependencies. Match server and client installations. DNPC can create and edit basic NPCs without Create or DRM; add Create for these integration jobs.

Existing integration execution records cover **Forge 1.20.1 / NeoForge 1.21.1 / Fabric 26.3**. They do not establish Create availability or compatibility on Fabric 1.21.1 or NeoForge 26.3. Check the actual distribution and capabilities for your target. CustomNPCs is excluded on 26.3.

These silent recordings use **DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1**. **6.0.10 identifies the recorded environment, not a universal minimum requirement.** Only devices and materials are prepared. Each lesson follows an empty NPC schedule through action selection, world targets, field entry, activation, saving and native execution. The return lesson continues the configuration saved in the preceding delivery lesson. The UI is English, with Korean step captions in a separate panel below the game, field detail cuts and a visible click marker. Replace example coordinates with your own positions. The current step above each player follows playback and seeking and stays readable while paused.

## Common workflow: schedule, action, target, save

1. Open the creator's **NPC editor → Schedule** with the NPC Core item.
2. Choose **Add time**, name the shift and set **Start / End (world ticks)**. Start with a daytime shift of **0 → 12000**.
3. Use the time row's **+** and choose an action from **Create**. Seat riding belongs to **Mount vehicle** in the movement category.
4. Select the action row to open its inspector. Click the target's **🔍**, then **sneak-right-click** the appropriate world block.
5. Check its block name, dimension and coordinates. **Esc** cancels selection.
6. Turn on **Enable schedule**, choose **Save to NPC**, close the editor and observe the job.

World selection changes only the draft. The time-name **✓** is also separate from saving the whole NPC. See [Schedules](#dochi-npc-core/npc-core-schedules) for world time and shift setup.

## Hand crank

First make sure the machine works when a player turns the crank. NPC input still obeys shaft connections, direction and stress limits.

1. Choose **Operate hand crank** and assign a real crank through **Assign hand crank block → 🔍**.
2. Set **Rotation direction → Default direction / Reverse direction**.
3. Choose **Keep turning** throughout the shift or **Turn for a duration**.
4. For timed work, enter **Operating time (seconds)**. **6** means six seconds of operating input; travel and operator waiting do not consume this timer.
5. Choose an automatic or assigned standing position and save.

![Create a crank job from an empty schedule, select its device and standing position, enter six seconds, save and observe native turning.](assets/media/guides/create-lessons-20261108/lesson-crank.mp4 "Click markers and field detail cuts show each input. Enable and save the schedule, close the editor, then observe the worker's hands and the actual crank.")

**Jump points**: 0:04 Empty schedule · 0:36 World targets · 0:47 Operating time · 0:59 Enable/save · 1:13 Native execution.

Operating time accepts **1–1200 seconds**. One NPC owns a device at a time, and a player's manual input has priority. Create controls RPM, capacity and overstress.

## Device position versus standing position

Assign the device itself to **Assign hand crank block / Assign valve handle block**. The standing position is the space for the NPC's feet.

- **Find a reachable position** searches near the device.
- **Assign standing position → 🔍** selects a solid floor block; the empty space immediately above becomes the feet position. Leave room for feet and head.
- **Use my current position** stores your feet position in the device's dimension.
- **X** clears the corresponding assignment. Recheck an old standing position after changing devices.

Keep a flat approach and line of sight. Avoid machinery interiors, blocked platforms and unsupported air positions.

## Valve: angle on the block, count on the NPC

1. Set the Create valve block's angle first: **90°** in this example.
2. Choose **Operate valve handle** and assign that block.
3. Set direction and **Number of operations**. **2** performs the block's 90° operation twice.
4. For multiple operations, set **Pause between operations (seconds)**. Native rotation and cooldown must finish before the next operation starts.
5. Confirm the standing position and save.

![Author a valve job, select its block and standing position, enter two operations and a one-second extra pause, then run it.](assets/media/guides/create-lessons-20261108/lesson-valve.mp4 "The block's 90-degree setting differs from the NPC's operation count. Create handles native rotation and cooldown.")

**Jump points**: 0:04 Empty schedule · 0:36 World targets · 0:44 Quantity/count · 0:50 Extra pause · 1:04 Enable/save · 1:18 Native execution.

The count accepts **1–64 operations** per schedule occurrence; the extra pause accepts **0.2–60 seconds**. Completed finite work is saved. Opening the editor, fighting or reconnecting does not reset the same shift's completed allowance. A new occurrence and a changed job are handled separately.

## Create seats

Add **Mount vehicle**, switch to **Create seat**, assign the real seat block with **🔍**, then check the attempt timeout and scheduled dismount setting before saving.

![Choose Create seat in Mount vehicle, assign a real seat, enter the timeout, save, board and dismount after the shift.](assets/media/guides/create-lessons-20261108/lesson-seat.mp4 "Starts with an empty schedule. The fixture explicitly changes world time to 12500 to demonstrate the end of the shift.")

**Jump points**: 0:04 Empty schedule · 0:36 World targets · 0:47 Boarding timeout · 0:53 Enable/save · 1:07 Native execution · 1:13 Shift end/dismount.

Create seats use a block target rather than the ordinary vehicle seat number. Occupied, missing, unloaded or unreachable seats wait until the attempt times out. Scheduled dismount waits for a stopped seat and safe ground. Tracking supports assembly/disassembly and saved ownership, but this action does not author train driving or movement routes.

## Troubleshooting

| State | Check |
| --- | --- |
| No action starts | Enabled schedule, current world time, action in the shift, saved NPC |
| Work paused | Editing, disabled AI, combat, interaction, sleeping or external AI ownership |
| Choose a device in this dimension | Device assignment and NPC dimension |
| Approaching operating position | Solid floor, headroom, route and line of sight |
| Waiting for another operator | Another NPC using the same device |
| Yielding to manual operation | Player input on that device |
| Device unavailable | Correct block, loaded chunk and available Create capability |
| Device turns but machine stops | Native connections, direction and stress |
| Work complete | Timed allowance or operation count already completed this shift |

Continue with [polishing and logistics](#dochi-npc-core/npc-core-create-logistics) or [factory processing](#dochi-npc-core/npc-core-create-factory).

---
title: Create Conditional Control and Inspection
slug: npc-core-create-control
order: 1517
description: Control native inputs with two thresholds and inspect real equipment without changing its contents.
product: dochi-npc-core
category: Create integration
section: editor
status: Guide
version: 0.1.3
audience: Creators / server operators
---

## Work only when a condition is met

**Conditional Machine Operation** applies crank, valve or Linked Controller input according to a sensor within an active schedule. Read [Create setup](#dochi-npc-core/npc-core-create-start) and [factory processing](#dochi-npc-core/npc-core-create-factory). The silent clips use DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1.

## Example: start at two ingots, stop at six

1. Add **Create → Conditional Machine Operation** to a shift.
2. Choose **Control device → Hand crank** and assign the crank to **Machine control position**.
3. Choose **Sensor reading → Item quantity**, then assign a barrel to **Sensor position**.
4. Set **Counted item → Iron Ingot**. Only that item ID is counted.
5. Turn on **Activate at the lower threshold**. Enter **6** in **Upper threshold** first, then **2** in **Lower threshold** to keep the range valid.
6. Set **Work interval (ticks)**, enable the schedule and save.

![Author conditional control, assign actuator, sensor and iron, enter upper six then lower two, and observe start and stop.](assets/media/guides/create-lessons-20261108/lesson-conditional-control.mp4 "Enter the upper value first to keep a valid range. The fixture's explicit 0→6 stock change is test input; the crank does not produce those ingots.")

**Jump points**: 0:04 Empty schedule · 0:36 Actuator · 0:45 Sensor · 0:56 Item selection · 1:11 Thresholds · 1:19 Enable/save · 1:33 Native execution · 1:40 Stop at six.

## Two thresholds preserve the previous state between them

The upper threshold must exceed the lower one. Both must be finite, nonnegative numbers.

| Activate at the lower threshold | Start | Stop | Between thresholds |
| --- | --- | --- | --- |
| ON | Reading ≤ lower | Reading ≥ upper | Keep previous state |
| OFF | Reading ≥ upper | Reading ≤ lower | Keep previous state |

For ON / 2 / 6, stock **0 → 3 → 6 → 4 → 2** means **run → keep running → stop → stay stopped → run again**. This avoids repeated toggling around one number.

## Sensor types and units

| Sensor reading | Target and value |
| --- | --- |
| Redstone strength | Block's strongest neighboring signal, 0–15 |
| Item quantity | Counted item ID in a supported inventory |
| Tank fill percentage | Supported Create tank, 0–100%, rather than mB |
| Rotation speed in RPM | Absolute speed of a supported kinetic device |
| Overstress (0 or 1) | Normal 0 / overstressed 1 |

For overstress detection, use OFF / lower 0 / upper 1. Do not enter fluid volume as a percentage or RPM as an overstress value. Unreadable or oversized storage systems are not an unlimited inventory scan; unsupported reads report **Sensor reading unavailable**.

## Crank, valve and Linked Controller

| Device | Active | Inactive transition |
| --- | --- | --- |
| Hand crank | Apply native crank input | Stop new input |
| Valve handle | One native operation for the transition | Operate in the opposite direction |
| Linked Controller | Hold the configured channel input | Release it |

Valves respond to state transitions rather than repeating on every sensor poll. Native rotation/cooldown finishes first. **Reverse the active direction** changes the active direction.

For linked operation, put a **real, frequency-configured Create Linked Controller** in the NPC's inventory and select **Linked Controller button (1–6)**. Match Create's receiver frequencies. **Machine control position** is the actual workplace the NPC approaches; DNPC does not create frequencies from typed labels. An empty/unconfigured controller reports **A configured Linked Controller is required in NPC inventory**.

Players retain manual priority. Editing, combat, interaction and disabled AI pause new input; an already started valve operation or machine motion is not rewound.

## Factory Inspection

1. Add **Create → Factory Inspection**.
2. Use **Add inspection position** and sneak-right-click each supported device, up to **16**.
3. Register the desired order and remove unwanted entries with **Delete inspection position**.
4. Set **Work interval (ticks)**. Inspection reads use a minimum interval of **20 ticks**.
5. Optionally assign a Display Board, then save.

![Assign two inspection positions and a real Display Board, enter its first and reserved rows, then observe the route and board report.](assets/media/guides/create-lessons-20261108/lesson-inspection-board.mp4 "The crank and empty tank are selected separately. A powered, assembled native board receives the report and is shown close up.")

**Jump points**: 0:05 Board power · 0:09 Empty schedule · 0:41 Inspection targets · 1:01 Assign board · 1:09 First/reserved rows · 1:14 Enable/save · 1:29 Native execution · 1:41 Board report.

Supported readings include stopped/running rotation, overstress, Burner heat and tank fill. Inspection does not repair devices or change their contents. Use a separate conditional action to respond to measurements.

## Display Board reports

Prepare a correctly assembled Create board and its normal power. The video drives the board with a meshing **Cogwheel** beside it. Receiving report text alone does not make an unpowered board settle into readable characters; check the actual gear connection and running state first. Assign **Display Board (optional)** and set:

| Field | Meaning |
| --- | --- |
| First display row (starting at 1) | First reserved row; 2 leaves row 1 alone |
| Reserved display rows | Consecutive rows; 6 from row 2 reserves rows 2–7 |

The report includes the inspector, current device, nearby working NPCs, completed work and pending parcels. Nearby counting is bounded to roughly **32 blocks**, not server-wide production accounting. Completed work is not the total number of product items.

The complete report wraps within reserved rows. If it cannot fit, **Reserved board rows cannot fit the complete report** leaves the board unchanged; enlarge the board or reservation. Overlapping reservations wait for the other inspector. Rows outside the reservation remain untouched.

## Troubleshooting

| State | Check |
| --- | --- |
| Select valid loaded work positions | Correct device, sensor, dimension and loaded route |
| Sensor reading unavailable | Matching sensor/device type and supported capability |
| Waiting for the activation threshold | Current reading, toggle mode and both thresholds; may be normal |
| Player manual operation has priority | Direct player use |
| Workstation is reserved by another worker | Another NPC's device or board-row reservation |
| Display Board unavailable or not assembled | Assembly, target, loaded chunks and native power |
| Board never changes | Start row, available width/rows and overlapping inspectors |
| NPC waits near equipment | Editing/combat pause, AI, feet position and visibility |

Start with one sensor, one actuator and one NPC. Then add [processing](#dochi-npc-core/npc-core-create-factory) and [logistics](#dochi-npc-core/npc-core-create-logistics) so waiting stages remain easy to identify.

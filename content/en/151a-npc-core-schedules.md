---
title: Schedules, Riding and Military Duty
slug: npc-core-schedules
order: 1512
description: Action search, schedule libraries and target-specific vehicle boarding.
product: dochi-npc-core
category: Schedules
section: editor
status: Guide
version: 0.1.2
audience: NPC creators
---

## Find an action

Select a daycycle period, then add an action or change an existing action type. Search and category filters intersect. Searching all categories preserves the query; Korean and English synonyms and internal IDs are supported. Multiple words must all match.

Choose from movement/waiting, harvesting/production, collection/transport, rest/presentation and interaction. ESC or clicking outside cancels selection. Commit period edits with **✓**, then save the NPC.

## General and military schedules — 1.20.1 / 1.21.1

**Schedule type** selects DNPC's general schedule or a registered military provider. New NPCs default to general schedules. **Legacy AI compatibility** preserves older NPC ownership; the separate schedule-enabled switch controls activation.

**Load schedule** combines general and military examples and provider files. Combine type and addon filters, read requirements, then load a draft. Save the NPC to apply it.

There are 24 examples: 15 existing general examples and nine military examples. DNPC watch and patrol require no extra mod. DW guard, patrol, escort and noncombatant schedules, and DWE crew schedules require their mods and registered APIs. Fabric currently has no DW provider, so those examples display their requirements rather than becoming available.

DW schedules use **one action per period**, separately from general multi-action/probability settings. General and military Rest/Bed settings share residence and bed editing. Sleeping stops walking and movement animation. This military-library workflow does not establish 26.3 provider support.

## Board a vehicle

1. Choose daycycle → add action → **Movement → Ride vehicle**.
2. Automatically find an empty vehicle or use 🔍 to select an actual loaded entity.
3. Set the search center and radius: default 16 blocks, range 1–32.
4. Set the seat and dismount-at-end option, then save the NPC.

Attempts default to 600 ticks, adjustable from 20–2400. Editing, interaction and external-control pauses do not consume that timeout. The NPC walks close before requesting native boarding; it does not spawn vehicles or teleport across the search area.

| Target | Seat policy |
| --- | --- |
| 1.20.1 / 1.21.1 vanilla boats, minecarts and horses | **-1** for automatic selection |
| Compatible SuperbWarfare vehicles on existing targets | Actual seats **0–63**, preserving DW/DWE crew policies |
| 26.3 vanilla vehicles | **-1** or native passenger order; one-seat vehicles use -1/0 and cannot skip the front passenger |

26.3 vanilla boarding works without DRM, DW or DWE. It does not imply 26.3 support for DW/DWE.

Dismounting waits for a stopped vehicle and a safe exit; the NPC stays aboard when none is available. Combat or external-command dismounting prevents immediate reboarding during that occurrence. Configure driving, patrol and weapons in the original vehicle mod or DWE.

## External control and scheduled shops

DNPC jobs preserve another controller's paths and targets, then resume native job/employment handling after control returns. Position locking normally remains active; compatible trainer dash/return requests can temporarily permit movement.

DRM scheduled shops revoke trade authorization when closing, disabled, changed or removed. An old screen may remain visible, but expired trades are rejected. A new interaction during the next opening period and ordinary shops retain their own authorization.

---
title: Your First Support Timeline
slug: expanded-support-timeline
order: 330
description: Use the redesigned world editor for point, line, and area bombing, timing, and the placement center.
product: dochi-warfare-expanded
category: Combat support
section: support
status: Guide
version: 0.3.3
audience: First-time map creators and operators
---

## Follow these three lessons

**Gimmick Editor is a creator tool.** Place support in the actual world view, then use the timeline to choose when each event starts.

| Lesson | What you will do |
| --- | --- |
| 1. This page | Learn the workspace, place point/line/area bombing, edit timing and center |
| 2. [Vehicle, gun, and NPC support](#dochi-warfare-expanded/expanded-support-actions) | Set departure/destination, vehicles, weapons, and NPC sources |
| 3. [Save, simulate, and run](#dochi-warfare-expanded/expanded-support-run) | Save and reload, test with Simulation, then invoke the saved file |

Ten videos sit beside the relevant steps across these lessons. They show **actual DWE 0.3.2 / NeoForge 1.21.1 screens**, English controls, and Korean step captions. The videos are silent; pause to find the matching control and enter each value. Forge and Fabric share this editing flow; the recordings are from NeoForge.

Check [installation and your first vehicle](#dochi-warfare-expanded/expanded-overview), enter a world with operator permissions, and choose **Gimmick Editor → Create New** in editor selection. **Use Default** opens one point-bombing draft at the player's position. Begin with one event in an empty document.

## 1. Learn the workspace

| Area | Purpose |
| --- | --- |
| Top | New, Load, Save, Save As, Reset, title, Simulation, coordinate mode, and Center |
| Left | Placement tools and event selection, duplication, and deletion |
| World | Place positions and paths on actual block surfaces |
| Right | Aircraft/vehicle, time, and quantities; Advanced exposes precise coordinates and additional values |
| Timeline below | Separate rows for NPCs, vehicles/gun support, and bombing; edit start times |

![Create a document, collapse and resize panels, then move the world camera.](assets/media/guides/dwe-tutorials-20261109/dwe-workspace.mp4 "01 · Collapse/restore properties, drag splitters, then pan, rotate, and zoom. DWE 0.3.2 / NeoForge 1.21.1.")

Use corner arrows to collapse and restore panels, and drag boundaries to resize them. Scroll **inside properties** to reach additional fields.

Over the world, the wheel zooms, middle-button drag pans, and right-button drag rotates. **F** focuses the selected event or center being edited. WASD moves the player with view tracking; Jump/Sneak raises/lowers the camera. Camera speed −/+ does not change event execution speed.

## 2. Place your first point bombing

Your goal is **one ground target, with the first release two seconds after invocation**.

1. Choose **Point bombing** on the left.
2. Click a loaded block surface. Check the new event in the list and bombing row.
3. Return to **Select / move** and select its marker or list row.
4. Check **Aircraft / Payload**. The pickers contain server-supplied combinations; an empty list means the installed/support combination needs checking.
5. Set **Start (seconds) 2**, **Altitude 96**, and **Lifetime (seconds) 30**.
6. Inspect coordinates and additional values in **Advanced**; **Basic** returns to compact settings.

![Place a point event with start two seconds, altitude 96, and lifetime 30 seconds.](assets/media/guides/dwe-tutorials-20261109/dwe-point.mp4 "02 · Explosion damage 20 in Advanced means a base 20 HP override. This video does not measure hits or damage.")

**Two seconds is first release, not impact.** Impact happens later according to altitude and native weapon physics. Lifetime is the temporary support lifespan.

Count and interval may be disabled for point events. Use line/area tools for repeated releases. Markers show authored targets and directions; native physics determines actual impacts.

## 3. Draw line and area bombing

1. Choose **Line bombing** and drag along a ground corridor.
2. Set the count and release interval; the example uses **four bombs, 0.5 seconds apart**.
3. Draw another corridor with **Area bombing**. An area adds width.
4. Drag length/width/direction handles in **Select / move**, or enter **Advanced → Width / Heading**.

![Set four bombs at half-second intervals and an area's width and heading.](assets/media/guides/dwe-tutorials-20261109/dwe-corridors.mp4 "03 · Separate line and area events. Area settings: Width 24, Heading 0. Placement and configuration, not a bombing run.")

With first release at two seconds, four releases occur at **2.0 → 2.5 → 3.0 → 3.5 seconds**. An explicit count is per aircraft; areas may use several aircraft lanes. Count, native speed, and interval determine corridor length, so its input may lock. An empty count retains the native loadout.

Heading is **0 south, 90 west, −90 east**. Check the world approach marker before relying on the number.

## 4. Arrange several events

**Changing time and reordering the list are different operations.**

- Basic fields use seconds in **0.05-second increments**. Advanced and saved data use whole ticks; **20 ticks = one second** at 20 TPS.
- Drag timeline markers horizontally to edit starts. Clicking the ruler chooses the time for new placements.
- Timeline −/+ changes the visible span, not execution speed.
- Dragging list rows reorders events while retaining existing time slots. Change time with markers or fields.
- After **Duplicate**, check overlapping positions and starts. Checkboxes allow bulk deletion.

![Place vehicles at two seconds and bombing at five, expand the time span, move a marker, and duplicate/undo.](assets/media/guides/dwe-tutorials-20261109/dwe-timing.mp4 "04 · Start fields, marker dragging, Duplicate, and Ctrl+Z / Ctrl+Y.")

**Ctrl+Z / Ctrl+Y** undo/redo placement edits. **Esc** or releasing outside the allowed drop region cancels a drag. At most 16 events can start at one tick; stagger larger groups.

## 5. Use the center and relative coordinates

New screens start in **Relative coordinates**. Zero on all precise position axes means the **Center** in the top bar.

| Operation | Relative mode | Absolute mode |
| --- | --- | --- |
| Switch display mode | Keeps placement | Keeps placement |
| Change Center | Translates all departures, destinations, and targets | Keeps world positions, changes reference only |
| Enter precise positions | Offsets from center | World coordinates |

![Compare translating the arrangement in relative mode with changing only the absolute reference.](assets/media/guides/dwe-tutorials-20261109/dwe-center.mp4 "05 · Set Center X to 8 and undo. The same center edit in Absolute coordinates preserves the path.")

Enter **Center → X/Y/Z**, use **Use player position**, or click/drag the center in the world. Relative mode moves every path and target together: decide whether you mean to edit one marker or translate the whole arrangement.

Loading in relative mode translates the arrangement to the current center. To retain saved world positions, **switch to Absolute coordinates before Load**. Older files without an origin use the first event target as reference.

Continue with [vehicle, gun, and NPC support](#dochi-warfare-expanded/expanded-support-actions), or [save, test, and run](#dochi-warfare-expanded/expanded-support-run).

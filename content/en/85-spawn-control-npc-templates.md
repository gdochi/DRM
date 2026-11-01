---
title: Spawn Your Saved NPC
slug: spawn-control-npc-templates
order: 838
description: Use a saved DNPC in natural rules or placed spawners.
product: dochi-spawn-control
category: DNPC template spawning
section: editor
status: Guide
version: 0.1.4
audience: Creators / server operators
---

## Save the NPC first

Finish its appearance, equipment and behavior in DNPC, then use **Save to NPC → Save as clone template**. See [saving templates](#dochi-npc-core/npc-core-templates).

This connection needs **DNPC and DRM**. The ordinary DNPC entry in Entity creates a default NPC; choose **NPC clone template** to use your finished guard.

## Spawn it at a location

1. Add an entry in **Spawner Editor → spawn list**.
2. Set its type to **NPC clone template**.
3. Choose your saved NPC.
4. Set conditions/quantities and **Save As**.
5. Right-click the placed spawner with the DRM Core and apply that file.

Follow [spawner placement](#dochi-spawn-control/dochi-spawn-control-spawner). This method is available on older targets and 26.3.

## Natural spawning — 1.20.1 / 1.21.1

Press **K** and find **NPC clone: name** in the catalog. **Add rule**, choose biomes/hours/quantities and save.

Default NPCs and saved templates are separate spawn targets. For 26.3, use the placed-spawner method above.

## Missing entries or wrong appearance

| Problem | Fix |
| --- | --- |
| An old template is missing | Load it onto an NPC and save a new clone template |
| An entry cannot spawn | Check that the server has its file, DNPC and DRM |
| Old equipment still appears | Reload the template and reapply it to the spawner |

Spawn Control manages the spawned NPC's respawning instead of also running its saved native respawn.

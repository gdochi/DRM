---
title: Spawn Mobs Where and When You Want
slug: dochi-spawn-control-overview
order: 810
description: Choose natural spawn rules or placed spawners for mobs and NPCs.
product: dochi-spawn-control
category: Overview
section: overview
status: Draft
version: 0.1.4
audience: Server operators and modpack creators
tags:
  - spawn control
  - natural spawn
  - forge
---

## Choose how they appear

| Goal | Use |
| --- | --- |
| A particular mob appears in forests at night | Natural spawn rules |
| Enemies return at one dungeon location | A placed spawner |
| A finished guard appears at a post | A saved DNPC template |

Natural rules check the area around players. Placed spawners work around their block.

## Change natural spawning

Press default **K**, choose a mob on the left and **Add rule**. Set its locations, hours and quantities, then save.

One zombie can have separate forest-night and cave rules. A rule for pigs does not affect cows.

Follow [your first natural rule](#dochi-spawn-control/dochi-spawn-control-setup).

## Place a spawner

Open **Spawner Editor** from DRM's editor selector. Choose mobs and conditions, use **Get Spawner**, place it and apply the saved setup.

See [create a spawner](#dochi-spawn-control/dochi-spawn-control-spawner).

## Do the original spawns continue?

**Original spawning ON** allows the game's spawns alongside your rules. Set it **OFF** to use only your rules for natural spawning.

This does not block commands, breeding or other spawners.

## NPCs and vehicles

Use an [NPC template](#dochi-spawn-control/spawn-control-npc-templates) to keep a DNPC's appearance and equipment. You can also [spawn saved vehicles](#dochi-spawn-control/spawn-control-vehicles).

Ordinary natural mob rules need neither DRM nor an NPC mod. Add the respective mods for NPCs or vehicles.

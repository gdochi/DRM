---
title: Create Your First Natural Spawn Rule
slug: dochi-spawn-control-setup
order: 820
description: Choose a mob, its conditions and quantities, then apply the rule.
product: dochi-spawn-control
category: Setup
section: setup
status: Draft
version: 0.1.4
audience: First-time server operators
tags:
  - installation
  - first rule
  - permissions
---

## Install and open the editor

Use Spawn Control 0.1.4 for Forge 1.20.1, Fabric/NeoForge 1.21.1 or the separate 26.3 target. Match server/client versions and loaders; Fabric also needs Fabric API.

Ordinary mob rules do not require other Dochi mods. Editing needs permission level 2 or Creative permission.

Press **K**. If another mod uses it, change **Open Spawn Control** in Minecraft's key settings. With DRM, you can also open **Spawn Control** from the editor selector.

## Add a rule for one mob

1. Choose the mob in the left list.
2. In **Selected target** view, press **Add rule**.
3. Give it a name and a unique **Profile ID**.
4. Set dimensions, biomes, time and light. Empty dimension/biome lists allow all.
5. Choose **Ground** for land mobs or **Water** for aquatic mobs.
6. Set chance, check interval, group size and population limits.
7. Enable the rule and press **Save**.

## Check the current location

Use **Advanced diagnostics → Check current position** to see failed conditions. **Spawn one mob** creates a real mob. Use **Clean spawned entities** to remove test spawns.

Land mobs need suitable ground and headroom; aquatic mobs need enough water.

## Replace the original spawns

After checking your rule, turn **Original spawning OFF** to replace natural spawning. Leaving it ON keeps the original spawns too.

## Use a saved NPC

Save it as a **clone template** in DNPC, then choose its name in the catalog. See [template setup](#dochi-spawn-control/spawn-control-npc-templates).

For a block at a fixed location, use a [placed spawner](#dochi-spawn-control/dochi-spawn-control-spawner).

---
title: Use the Core NPC Spawner
slug: npc-spawner
order: 84
description: Choose saved NPCs and spawning conditions for a Core spawner block.
product: core-fabric
category: Core Systems
section: npc-spawner
status: Stable
version: 0.3.1
audience: Creators / Operators
tags:
  - npc
  - spawner
  - world
---

## Which spawner is this?

This is **DRM Core's NPC Spawner**, using Core-format NPC clones readable by its Source list. Cobblemon Editor's Clone Library also connects role-configured DNPCs to this workflow. Importing CustomNPCs Filled Soul Stones on older 1.21.1 targets is a separate provider path.

Starting with DNPC's own Save As template? Use [Spawn Control's NPC-template spawner](#dochi-spawn-control/spawn-control-npc-templates). For Cobblemon-role clones, follow [Clone Library](#drm-cobblemon-editor/cobblemon-clone-library-spawner). Match the template format to its spawner.

## Place and open the block

1. Get `/give @s dochi_rpg_maker:npc_spawner` and place it.
2. Right-click it with the DRM Core.
3. Stay within eight blocks while editing.
4. Add saved NPCs under **Source**. Compatible CustomNPCs Filled Soul Stones appear when carried in inventory.
5. Choose spawning mode, interval and quantities under **Spawn**.
6. Press **Save**.

Save changes the selected world block; it does not create a new file through Save As.

## Pick among several NPCs

Source supports up to 64 entries. **Weights** set their relative frequency: guards at 3 and archers at 1 make guards more common.

A new choice is made for each attempt. **Max Active** caps living NPCs from the whole list.

## Choose when it runs

![Core spawner Spawn settings.](assets/media/guides/drm-031-neo1211/core-npc-spawner-rules.png "DRM 0.3.1 / NeoForge 1.21.1, English UI. Mode selects the trigger, Cooldown the tick interval, Max active the living cap and Wave size the per-attempt count. Assigned sources is zero in this instance: this verifies the settings screen, not successful NPC spawning.")

| Mode | Behavior |
| --- | --- |
| continuous | Attempts at intervals |
| target_nearby | Attempts while a target is nearby |
| target_enter | Attempts when a target enters |
| redstone_pulse | Attempts on a redstone pulse |

For example, Cooldown 200 is about ten seconds between attempts; Max active 1 prevents additional spawning while one remains alive; Wave size 1 attempts one NPC per activation.

Cooldown is 20–72,000 ticks. Active cap and wave size are each 1–32. Target radius is up to 64 blocks; spawn radius is up to 32.

## Effects and appearance

Use **Conditions** for activation requirements and **Effects** for particles, block appearance and size. The NPC to spawn and the spawner's appearance are separate choices.

When moving the world, also include NPC templates from `config/dochi_rpg_maker/npc_spawner/`.

---
title: Spawn Your Saved NPC
slug: spawn-control-npc-templates
order: 838
description: Use a saved DNPC in natural rules or placed spawners.
product: dochi-spawn-control
category: DNPC template spawning
section: editor
status: Guide
version: 0.1.5
audience: Creators / server operators
---

## Spawn a guard wearing its saved helmet

This example connects the DNPC template `guide_guard` to a placed spawner. It needs **DNPC and DRM**. The ordinary DNPC entry under `Entity` creates a default NPC. Choose **NPC clone template** to reuse the appearance and equipment you prepared.

First finish the guard in DNPC, then **Save to NPC → Save As → Name: guide_guard → Save**. See [saving NPC templates](#dochi-npc-core/npc-core-templates) for the two different save operations.

## 1. Choose the saved NPC

1. Open **Spawner Editor → Spawn Target**. Reuse the initial entry; **Add** creates more entries when you want a mixture.
2. Change its **Source** to **NPC clone template**.
3. Press the magnifying glass (**Choose**) beside **Entity / Clone** and search for `guide_guard`.
4. Select **NPC [dochi_npc:actor/guide_guard]**, then press **Select**.

![The saved guide_guard entry in the NPC template picker.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-picker.png "Spawn Control 0.1.4 + DNPC 0.1.3 / NeoForge 1.21.1. Even when its display name is NPC, the bracketed guide_guard identifier distinguishes this template.")

## 2. Save the spawner file

Turn **Enabled** on and keep **Entities per activation** at `1`. With one entry and **Chance** `1.0`, that entry has a 100% selection share. This does not mean it spawns every tick; timing and conditions are separate settings.

Use **Save As**, enter `guide_guard_spawner.json`, then press **Confirm**. Check that **JSON file** at the top shows that name.

![The saved spawner uses NPC clone template and dochi_npc:actor/guide_guard.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. guide_guard is the NPC original; guide_guard_spawner.json contains its spawning rules. These are separate files.")

## 3. Apply it to the world spawner

1. Use **Get Spawner** and place the item in the world.
2. Hold the **DRM Core** and right-click the placed spawner.
3. Select **guide_guard_spawner.json** and press **Apply JSON**. The window closes after applying.
4. Default **Conditions** require a nearby player and leave **Include creative players** off. Test these settings in Survival within 16 blocks.

![guide_guard_spawner.json selected in the placed spawner's Apply Spawner JSON window.](assets/media/guides/spawn-control-014-neo1211/spawn-block-apply.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Save As writes the document; Apply JSON updates this world spawner.")

Following this flow created one new NPC and preserved the original iron helmet. Adjust [timing, owned limits and conditions](#dochi-spawn-control/dochi-spawn-control-spawner-settings) to reuse the same template in other encounters.

![The original and spawned helmet-equipped NPCs beside the spawner.](assets/media/guides/spawn-control-014-neo1211/spawn-template-runtime.png "Spawn Control 0.1.4 + DNPC 0.1.3 / NeoForge 1.21.1. New NPCs retain the saved iron helmet. The default owned limit is 6, so later activations can add more NPCs.")

## Natural spawning — all 0.1.5 targets

In 0.1.5, saved DNPC templates work in natural-spawn rules on Forge 1.20.1, Fabric/NeoForge 1.21.1 and 26.3. Open the editor with **K**, find the saved template, use **Add Rule**, set biome, time, distance and quantities, enable it and save. The default NPC and a saved template are separate targets. A missing template or DRM provider API rejects that spawn instead of creating a blank NPC.

## Missing entries or wrong appearance

| Problem | Check |
| --- | --- |
| An old template is missing | Load it in DNPC, then Save to NPC → Save As under a new name |
| A file exists but is missing from the list | Check the server's config/dochi_npc_core/templates/ and the presence of DNPC and DRM |
| Saving did not update a spawner | Open that world spawner with the Core and Apply JSON again |
| Nothing happens in Creative | Check Include creative players or test in Survival |
| Old equipment still appears | Save the NPC original again, reload its template and reapply the spawner |

Spawn Control manages repeated generation of its NPCs. Their saved native respawn does not run alongside it.

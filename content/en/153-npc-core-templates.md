---
title: Save and Reuse an NPC
slug: npc-core-templates
order: 1530
description: Keep a finished NPC as a template, clone it or load it onto an existing NPC.
product: dochi-npc-core
category: NPC clone templates
section: operations
status: Guide
version: 0.1.3
audience: Creators / server operators
---

## Save a finished NPC

1. Open the NPC and finish its appearance, equipment and behavior.
2. Press **Save to NPC**.
3. Press **Save As**, enter a distinct **Name** such as `guide_guard`, then press **Save**.

![The DNPC editor's Save As dialog with template Name, Save and Cancel.](assets/media/guides/dnpc-012-neo1211/dnpc-templates-save.png "DNPC 0.1.2 / NeoForge 1.21.1. Save to NPC updates the world NPC; Save As keeps a reusable template.")

Files are kept in `config/dochi_npc_core/templates/`. Use Ctrl+C / Ctrl+V for a quick copy; use a template to keep an NPC for later.

![The helmet-equipped NPC after saving its template, with the Saved response.](assets/media/guides/dnpc-013-neo1211/dnpc-template-saved.png "DNPC 0.1.3 / NeoForge 1.21.1. This NPC was saved as guide_guard, selected in Spawn Control and spawned with its iron helmet preserved.")

## What is reused?

Templates reuse appearance, equipment, inventory, behavior and linked dialogue/shop settings. New NPCs start fresh rather than inheriting an active delivery, ride or battle.

Loading a template onto an existing NPC keeps that NPC's location and active cargo. Choose the intended operation: creating a new NPC or applying settings to an existing one.

## Spawn guards in several places

Choose your saved NPC from **NPC clone template** in [Spawn Control](#dochi-spawn-control/spawn-control-npc-templates). Use it for a fixed guard post or scheduled/location-based appearances. This connection also needs DRM.

Saving DNPC templates by itself does not require DRM.

![The original and spawned helmet-equipped NPCs beside the spawner.](assets/media/guides/spawn-control-014-neo1211/spawn-template-runtime.png "Spawn Control 0.1.4 + DNPC 0.1.3 / NeoForge 1.21.1. New NPCs retain the saved iron helmet. The default owned limit is 6, so later activations can add more NPCs.")

## An old file is missing from the list

Load a settings-only or v2 template onto an NPC, then use **Save to NPC → Save As**. Use a new name to keep the old file.

If edited templates still show old equipment, reload and reapply the template in Spawn Control.

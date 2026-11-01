---
title: Save and Reuse an NPC
slug: npc-core-templates
order: 1530
description: Keep a finished NPC as a template, clone it or load it onto an existing NPC.
product: dochi-npc-core
category: NPC clone templates
section: operations
status: Guide
version: 0.1.2
audience: Creators / server operators
---

## Save a finished NPC

1. Open the NPC and finish its appearance, equipment and behavior.
2. Press **Save to NPC**.
3. Choose **Save as clone template** and enter a name.

Files are kept in `config/dochi_npc_core/templates/`. Use Ctrl+C / Ctrl+V for a quick copy; use a template to keep an NPC for later.

## What is reused?

Templates reuse appearance, equipment, inventory, behavior and linked dialogue/shop settings. New NPCs start fresh rather than inheriting an active delivery, ride or battle.

Loading a template onto an existing NPC keeps that NPC's location and active cargo. Choose the intended operation: creating a new NPC or applying settings to an existing one.

## Spawn guards in several places

Choose your saved NPC from **NPC clone template** in [Spawn Control](#dochi-spawn-control/spawn-control-npc-templates). Use it for a fixed guard post or scheduled/location-based appearances. This connection also needs DRM.

Saving DNPC templates by itself does not require DRM.

## An old file is missing from the list

Load a settings-only or v2 template onto an NPC, then use **Save to NPC → Save as clone template**. Use a new name to keep the old file.

If edited templates still show old equipment, reload and reapply the template in Spawn Control.

---
title: NPC Core setup
slug: npc-core-setup
order: 1500
description: NPC Core setup
product: dochi-npc-core
category: NPC Core setup
section: setup
status: Guide
version: 0.1.2
audience: Creators / server operators
---

## Current 0.1.2 patches

Updates address job/external-AI ownership, employment resumption and scheduled-shop authorization. Applying a template to an existing NPC preserves its carried cargo; new clones discard runtime cargo, riding and combat state. See [schedules and riding](#dochi-npc-core/npc-core-schedules) and [cooking jobs](#dochi-npc-core/npc-core-cooking). The existing 1.20.1 / 1.21.1 NPC screen also supports deletion with Delete.

## What it does

Dochi’s NPC Core (DNPC) **0.1.2** creates independent NPCs with appearance, equipment, poses, relations, schedules and work. Basic NPC creation and editing work without DRM.

| Build | Minecraft | Java |
| --- | --- | --- |
| Forge | 1.20.1 | 17 |
| Fabric | 1.21.1 | 21 |
| NeoForge | 1.21.1 | 21 |
| Fabric / NeoForge | 26.3 | 25 |

Install the same loader build of `dochi_npc_core-0.1.2-<loader>-<minecraft>.jar` on server and clients. Fabric also needs Fabric API. DRM is optional; current integration guidance uses DRM 0.3.1. Install matching GeckoLib when using Gecko models.

## Your first NPC

1. Obtain the core from the NPC Core creative tab or `/dnpc core`.
2. Right-click a block with the core to place an NPC.
3. Right-click that NPC with the core to open its creator editor.
4. Set its name, model, skin and equipment, then save.
5. Configure a schedule or job and test the NPC with the tool put away.

## Core controls

| Input | Action |
| --- | --- |
| Right-click a block | Place an NPC |
| Right-click an NPC | Edit that NPC |
| Right-click air | Global settings and poser |
| Left-click | Utility HUD |
| Core in main hand + Ctrl+C / Ctrl+V | Temporary NPC copy / paste |
| Core in main hand + Ctrl+X | Immediately delete the target NPC |

The temporary clipboard is separate from saved templates. Use [v3 clone templates](#dochi-npc-core/npc-core-templates) for reusable content. Going to an original uses its recorded UUID and cannot find a deleted original.

Continue with [NPCs and work](#dochi-npc-core/npc-core-editor) and [files and integrations](#dochi-npc-core/npc-core-files).

26.3 also supports basic NPC creation, editing and storage without DRM, GeckoLib or Curios. Optional integration data is preserved while unavailable external capabilities stay inactive. CustomNPCs is excluded on 26.3. See [target-specific setup](#core-fabric/minecraft-26-3).

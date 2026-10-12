---
title: DWE Setup and Start
slug: expanded-overview
order: 310
description: Install the required-DW addon for vehicles, combat reactions, and support timelines.
product: dochi-warfare-expanded
category: Getting started
section: overview
status: Draft
version: 0.3.0
audience: Creators and server operators
---

**Dochi's Warfare Expanded (DWE)** requires DW 0.3.0 on Forge 1.20.1. It owns vehicle AI, weapons, crew, vehicle reactions, bombing and reinforcement timelines. DW owns NPC gun/melee combat, ammunition, animation, and the shared clone library.

## Installation

| Component | Requirement |
| --- | --- |
| Minecraft / loader | 1.20.1 / Forge 47+, Java 17 |
| DW | Exactly 0.3.0, including its TACZ and client Player Animator requirements |
| DWE | `dochi_warfare_expanded-0.3.0.jar` |
| SuperbWarfare | 0.8.9 or 0.8.9.1; native compatibility checks must pass |
| CustomNPCs | Needed for NPC crew, combat dismounts, and NPC reinforcements |
| DRM | Optional shared editor selection and help integration |

Use identical DW/DWE builds on server and clients. Different builds labeled 0.3.0 can still have incompatible network protocols. Replace the old `dochi_warfare_vehicle-0.3.0.jar`; do not install both names together. The internal mod ID remains `dochi_warfare_vehicle` for compatibility.

The verified DWE project targets Forge. NeoForge DW 0.2.9 retains its earlier vehicle implementation; its installation requirements are separate. See [DW setup](#dochi-warfare/warfare-setup).

## First vehicle

1. Place a supported SuperbWarfare vehicle.
2. In creative mode, right-click it with `DW Npc Core`.
3. Configure AI, movement mode, home, and radius.
4. Start with one weapon and a simple target rule.
5. Add crew from an NPC clone or soul stone in `Crew` when needed.
6. Wait for a successful save, then add [vehicle reactions](#dochi-warfare-expanded/expanded-vehicle-gimmicks).

See [Vehicle AI](#dochi-warfare/warfare-vehicle-ai) for movement, targets, ammunition, and seats. Turn AI off before driving manually. The original mod supplies physics, projectiles, models, and sounds; DWE cannot add a weapon or smoke system absent from the vehicle definition.

## Files and updates

| Data | Server path |
| --- | --- |
| Vehicle profiles | `config/dochi_warfare/vehicle_ai/profiles/` |
| Global vehicle AI | `config/dochi_warfare/vehicle_ai/server-ai.json` |
| Support timelines | `config/dochi_warfare/vehicle_ai/gimmicks/` |
| Shared NPC/vehicle clones | `config/dochi_warfare/entity_clones/` |
| DW global NPC AI | `config/dochi_warfare/server-ai.json` |

Back up configuration and the world together. Older `config/dochi_warfare_vehicle` profiles are validated and imported while preserving their originals. Identical same-name files are not duplicated; different content is imported with a `_dwe_<content hash>` suffix. An old global vehicle policy is imported only when the new policy does not exist.

Turning global vehicle AI off suspends behavior without deleting per-vehicle settings. NPC and vehicle global policies remain separate. `Save As` creates a profile for applying settings to an existing vehicle; a clone creates a new entity.

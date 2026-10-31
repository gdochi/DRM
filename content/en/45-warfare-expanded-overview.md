---
title: DWE Setup and Start
slug: expanded-overview
order: 310
description: Install the required-DW addon for vehicles, combat reactions, and support timelines.
product: dochi-warfare-expanded
category: Getting started
section: overview
status: Draft
version: 0.3.1
audience: Creators and server operators
---

**Dochi's Warfare Expanded (DWE)** requires DW 0.3.1 on Forge 1.20.1 or NeoForge 1.21.1. It owns vehicle AI, weapons, crew, vehicle reactions, bombing and reinforcement timelines. DW owns NPC gun/melee combat, ammunition, animation, and the shared clone library.

## Current patches and crews

Update DW and DWE together to current 0.3.1 patches. See the [compatibility table](#dochi-warfare-expanded/expanded-compatibility) for DNPC crews, relationships, vehicle-destruction handling, ammo/flight fixes and representative tested addon vehicles. Results do not cover every vehicle in a pack.

## Installation

| Component | Requirement |
| --- | --- |
| Minecraft / loader | Forge 1.20.1 / Java 17 or NeoForge 1.21.1 / Java 21 |
| DW | Exactly 0.3.1, including its TACZ and client Player Animator requirements |
| DWE | Forge: `dochi_warfare_expanded-0.3.1.jar`; NeoForge: `dochi_warfare_expanded-0.3.1-neoforge-1.21.1.jar` |
| SuperbWarfare | Forge: 0.8.9 / 0.8.9.1 / 0.8.9.2; NeoForge: 0.8.9.1 / 0.8.9.2. Native checks must pass |
| DNPC / CustomNPCs | Choose the NPC provider; DNPC crews and combat dismounting do not require CNPC |
| DRM | Optional shared editor selection and help integration |

Use identical DW/DWE builds on server and clients. Different builds labeled 0.3.1 can still have incompatible network protocols. Replace older `dochi_warfare_vehicle` JARs; do not install both names together. The internal mod ID remains `dochi_warfare_vehicle` for compatibility.

NeoForge now uses the separated DW/DWE 0.3.1 structure too. Use NeoForge 21.1.216 to below 21.2 and keep Forge JARs out of that instance. See [DW setup](#dochi-warfare/warfare-setup).

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

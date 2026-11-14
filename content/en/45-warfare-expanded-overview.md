---
title: Move Vehicles and Assign Crews
slug: expanded-overview
order: 310
description: Set up DWE vehicle movement, weapons, drivers and gunners.
product: dochi-warfare-expanded
category: Getting started
section: overview
status: Draft
version: 0.3.3
audience: Creators and server operators
---

## What to install

DWE **adds vehicle features to DW**. Move supported SuperbWarfare vehicles, use their weapons and assign NPC drivers/gunners.

| Item | Requirement |
| --- | --- |
| Minecraft / loader | Forge 1.20.1, NeoForge 1.21.1, or Fabric 1.21.1 |
| DW and DWE | DWE 0.3.3 and compatible DW on server and clients; matching version numbers are not required |
| SuperbWarfare | Install the matching loader build. Forge 0.8.9 / 0.8.9.1 / 0.8.9.2; NeoForge 0.8.9.1 / 0.8.9.2. Fabric has an exercised 0.8.9.2 combination |
| NPC crews | DNPC or CustomNPCs |
| DRM | Optional |

DW's TACZ and Player Animator requirements still apply. See [DW setup](#dochi-warfare/warfare-setup).


This guide targets DWE **0.3.3**. DW remains required; DWE checks the actual APIs it uses at startup instead of requiring a matching DW version number. Recorded/tested versions are not minimum requirements for every combination.

**Open the timeline editor:** hold DW Npc Core and right-click air without targeting a block/entity to open the standalone selector. With DRM installed, Gimmick Editor is also available through DRM editor selection. Follow the [new GUI tutorial](#dochi-warfare-expanded/expanded-support-timeline) for workspace, placement, timing, and center.

![DWE vehicle Overview opened for an actual M1A2.](assets/media/guides/warfare-expanded-031-neo1211/dwe-ai.png "DWE/DW 0.3.1, SuperbWarfare 0.8.9.1, NeoForge 1.21.1. Use AI, Targets, Weapons, Gimmicks and Crew on the left; AI enabled at the upper right controls activation. This example is OFF.")

## Set up the first vehicle

1. Place a supported vehicle.
2. Right-click it with **DW Npc Core**.
3. Enable vehicle AI and choose movement, home position and operating range.
4. Choose weapons and targets.
5. Assign driver/gunner seats in **Crew**.
6. Save, then check movement and firing.

Turn off vehicle AI before driving it yourself. Available weapons depend on what that vehicle actually has.

## What to add next

- Retreat, smoke and combat dismounting: [vehicle reactions](#dochi-warfare-expanded/expanded-vehicle-gimmicks)
- Bombing and reinforcements: [support timelines](#dochi-warfare-expanded/expanded-support-timeline)
- Movement, targets and ammunition: [vehicle AI](#dochi-warfare/warfare-vehicle-ai)
- Other vehicle packs: [compatible vehicles](#dochi-warfare-expanded/expanded-compatibility)

## Reuse a setup

**Save As** keeps the settings for **Load** onto another vehicle. A **clone** is for spawning a new copy of the vehicle itself.

Vehicle settings are in `config/dochi_warfare/vehicle_ai/profiles/`; support timelines are in `config/dochi_warfare/vehicle_ai/gimmicks/`.

Replace the old `dochi_warfare_vehicle` JAR rather than keeping it alongside DWE. Older profiles are imported while keeping their originals.

## Request support with a radio or tablet

In 0.3.3, ordinary players can call an administrator-authored support timeline through a tactical order item. [Tactical orders](#dochi-warfare-expanded/expanded-tactical-orders) separates authoring/issuance from player targeting.

Install the **same DWE 0.3.3 build** on server and clients: different builds with the same version label can have different network messages. Fabric Mod Menu opens DWE vehicle AI settings. Tactical definitions live in **config/dochi_warfare/vehicle_ai/tactical_orders/**.

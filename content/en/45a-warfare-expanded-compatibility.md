---
title: Compatible Vehicle Packs
slug: expanded-compatibility
order: 315
description: Check supported representative vehicles and known conflicting combinations.
product: dochi-warfare-expanded
category: Setup
section: overview
status: Guide
version: 0.3.3
audience: Server operators / creators
---

## Choose a vehicle pack

Check vehicle packs by vehicle and weapon in DWE 0.3.3. The table below preserves **movement/firing/reload checks from DW/DWE 0.3.1**; it does not establish Fabric-wide support. The 0.3.2 world editor/simulation was separately exercised on Forge 1.20.1 and Fabric 1.21.1; this tutorial was recorded on NeoForge 1.21.1.

| Pack | Minecraft / loader | Vehicles |
| --- | --- | --- |
| AshVehicle | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley, AH-64, F-22 |
| HaloVehicles | Forge 1.20.1 / NeoForge 1.21.1 | M12 HMG |
| MCSP | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley |
| Vintage Vehicle Pack | Forge 1.20.1 | BMP-2 |
| Frontline Combat Pack | Forge 1.20.1 | BMP-2 |
| Spectacular Machines Addon | Forge 1.20.1 | Type 10 |

Use DWE 0.3.3 with compatible DW. DW is required; matching mod version numbers are not. Follow [vehicle setup](#dochi-warfare-expanded/expanded-overview) for drivers, gunners, and ammo.

## Known problem combinations

- **SuperbAddon 1.0.1 + SuperbWarfare 0.8.9.2:** explosions can crash. The corresponding SW 0.8.9.1 explosion test worked.
- **MCSP M1A2:** not included in this guide's supported vehicles. Start with the listed Bradley instead.

## Changes in current patches

DNPC crews and ally protection are supported, with settings for handling crews when vehicles are destroyed. Ammo duplication and magazine overflow after changing settings during reload have been fixed.

AH-6 ground-target fire, F-22 fixed-weapon aiming and excessive climbing near unloaded terrain were corrected. Automatic landing is not provided.

## Check the vehicle after opening it

After installing a vehicle pack, inspect its actual seats and roles in **Crew**. Continue with [vehicle AI](#dochi-warfare/warfare-vehicle-ai) for boarding sources and per-weapon crew requirements.

![The Crew seat map of the base SuperbWarfare M1A2.](assets/media/guides/warfare-expanded-031-neo1211/dwe-crew.png "DWE 0.3.1 / NeoForge 1.21.1. Select a seat number to inspect its role and occupant on the right. This is an empty seat map, not a completed boarding result. It is the base SuperbWarfare vehicle, distinct from MCSP M1A2.")

## Vehicle packs in 0.3.3 support requests

Reinforcement, gun-run and bombing selectors use actual server-installed vehicle data and weapon capabilities. A pack name does not imply support for every vehicle or weapon. Recheck the weapon/payload after changing aircraft.

With AshVehicle installed, compatible **B-2 / GBU-57** support can be configured. AshVehicle is not required for everyone using DWE. Current DWE includes client compatibility for entering worlds with SuperbWarfare and AshVehicle together. The historical 0.3.1 table does not establish B-2 checks or Fabric-wide compatibility.

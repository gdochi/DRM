---
title: Compatible Vehicle Packs
slug: expanded-compatibility
order: 315
description: Check supported representative vehicles and known conflicting combinations.
product: dochi-warfare-expanded
category: Setup
section: overview
status: Guide
version: 0.3.1
audience: Server operators / creators
---

## Choose a vehicle pack

The following vehicles were checked with NPC crews for movement, firing and reloads in DW/DWE 0.3.1. Unlisted vehicles and special weapons in the same pack need separate checking.

| Pack | Minecraft / loader | Vehicles |
| --- | --- | --- |
| AshVehicle | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley, AH-64, F-22 |
| HaloVehicles | Forge 1.20.1 / NeoForge 1.21.1 | M12 HMG |
| MCSP | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley |
| Vintage Vehicle Pack | Forge 1.20.1 | BMP-2 |
| Frontline Combat Pack | Forge 1.20.1 | BMP-2 |
| Spectacular Machines Addon | Forge 1.20.1 | Type 10 |

Use current 0.3.1 patches of DW and DWE together. Follow [vehicle setup](#dochi-warfare-expanded/expanded-overview) to assign drivers, gunners and ammunition.

## Known problem combinations

- **SuperbAddon 1.0.1 + SuperbWarfare 0.8.9.2:** explosions can crash. The corresponding SW 0.8.9.1 explosion test worked.
- **MCSP M1A2:** not included in this guide's supported vehicles. Start with the listed Bradley instead.

## Changes in current patches

DNPC crews and ally protection are supported, with settings for handling crews when vehicles are destroyed. Ammo duplication and magazine overflow after changing settings during reload have been fixed.

AH-6 ground-target fire, F-22 fixed-weapon aiming and excessive climbing near unloaded terrain were corrected. Automatic landing is not provided.

---
title: Vehicle Addon Compatibility and Fixes
slug: expanded-compatibility
order: 315
description: DNPC crews, SuperbWarfare versions and representative verified addon vehicles.
product: dochi-warfare-expanded
category: Setup
section: overview
status: Guide
version: 0.3.1
audience: Server operators / creators
---

## Update the pair

Install current **DW and DWE 0.3.1 patches together** on server and clients. Targets are Forge 1.20.1 and NeoForge 1.21.1. DNPC crews work without CustomNPCs; existing CNPC integration remains available. DRM is optional.

Current metadata accepts SuperbWarfare **0.8.9 / 0.8.9.1 / 0.8.9.2 on Forge**, and **0.8.9.1 / 0.8.9.2 on NeoForge**. Native structural checks must also pass. A newer release number alone does not invalidate compatible older builds.

## Representative verified vehicles

The following vehicles were checked with actual NPC crews for movement, firing and reloading. This does not establish support for every vehicle or special weapon in a pack.

| Addon | Checked targets | Vehicles |
| --- | --- | --- |
| AshVehicle | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley, AH-64, F-22 |
| HaloVehicles | Forge 1.20.1 / NeoForge 1.21.1 | M12 HMG |
| MCSP | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley |
| Vintage Vehicle Pack | Forge 1.20.1 | BMP-2 |
| Frontline Combat Pack | Forge 1.20.1 | BMP-2 |
| Spectacular Machines Addon | Forge 1.20.1 | Type 10 |

MCSP Bradley results do not establish M1A2 support: inspected M1A2 part definitions did not match the target SW serializer.

**SuperbAddon 1.0.1 with SW 0.8.9.2** failed during native explosions because of an external Mixin conflict; the corresponding SW 0.8.9.1 explosion test passed. Shell-casing generation or a successful shot alone does not establish complete compatibility.

## Current 0.3.1 fixes

- DNPC drivers and gunners use relationship targeting, ally protection and combat dismounting.
- Vehicle-destruction settings control NPC crew handling.
- Restored reload timers no longer wait excessively after moving between world clocks; ammo policy changes during reload no longer duplicate rounds or exceed capacity.
- The firing vehicle no longer blocks itself as a friendly obstacle; other allies remain protected.
- AH-6 ground-target aiming, fixed-wing body weapons and excessive climbing near unloaded terrain were corrected.
- Repeated ammo, weapon and lookup work was reduced. Results depend on the world and fleet.

F-22 firing failed in an earlier report, then passed actual firing checks on both loaders after later fixes. This does not establish automatic landing or complete coverage of every flight path. After updating, check native weapons, seats, stock and targets in [vehicle AI](#dochi-warfare/warfare-vehicle-ai).

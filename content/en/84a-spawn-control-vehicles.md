---
title: Vehicle spawning
slug: spawn-control-vehicles
order: 842
description: Vehicle spawning
product: dochi-spawn-control
category: Vehicle spawning
section: operations
status: Guide
version: 0.1.4
audience: Creators / server operators
---

## Scope

Spawn Control **0.1.4** creates saved modded vehicles and supported vehicle EntityTypes from placed spawners and natural-spawn profiles. DRM and vehicle mods are optional integrations.

| Vehicle mod | Targets |
| --- | --- |
| Immersive Vehicles / MTS | Installed pack vehicle / color variants or saved assembled vehicles; Forge / NeoForge integration |
| Superb Warfare | Registered vehicle EntityTypes or saved templates; Forge / NeoForge integration |
| Immersive Aircraft | Aircraft EntityTypes or saved vehicles; recorded Fabric runtime coverage |
| Automobility | Saved assembled vehicles; recorded Fabric runtime coverage |

Use an actual release for the selected Minecraft version and loader. Create / Valkyrien Skies block contraptions are outside this entity-based integration. Spawning does not add NPC driving AI or automatic crew.

## Example: spawn one saved M1A2

This flow was saved, applied and run with **Spawn Control 0.1.4 / Superb Warfare 0.8.9.1 / NeoForge 1.21.1**. It does not establish the parts or fuel behavior of other vehicle mods.

### 1. Save the original vehicle

Prepare an M1A2 with its own mod, remove all passengers, stand nearby and run:

```text
/spawncontrolvehicle save guide_tank @e[type=superbwarfare:m_1a_2,sort=nearest,limit=1,distance=..32]
```

The success response names **spawncontrol_vehicle:guide_tank**. The original stays in the world and `config/dochi_rpg_maker/spawn_control/vehicles/guide_tank.json` is created. Use `/spawncontrolvehicle list` to check saved IDs or `/spawncontrolvehicle reload` to reread externally edited templates.

For another mod, use its actual vehicle type after `type=`. Save one assembled vehicle instead of selecting an empty MTS `mts:builder_existing` or an unassembled Automobility base vehicle as the spawn target.

### 2. Choose the saved ID under Entity

Open **Spawner Editor → Spawn Target** and leave **Source** as **Entity**. Press the magnifying glass (**Choose**), search `guide_tank`, then select **spawncontrol_vehicle:guide_tank → Select**. Vehicle templates belong here; do not switch to **NPC clone template**.

![spawncontrol_vehicle:guide_tank in the Entity picker.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-picker.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Choose the ID saved by the command. A default vehicle EntityType and a saved vehicle template are separate targets.")

### 3. Set space and quantity, then save

This example uses **Spawn Settings** with owned limit `1`, radius `12` and **Placement: Air**. Vertical range stays at `2`, entities per activation at `1`, and total limit at `0`. Use **Save As → guide_tank_spawner.json → Confirm**.

![guide_tank_spawner.json points to the saved vehicle ID.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-spawner-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Source is Entity. This screen shows the target; placement and quantity are configured separately under Spawn Settings.")

**Why Ground failed here:** this original M1A2 saved a collision box extending slightly below its reference point, intersecting the floor at Ground candidates. Air allowed a clear candidate above the ground and spawning succeeded. Air does not add flight AI; the vehicle mod controls its physics after insertion.

### 4. Apply to a placed spawner

Use **Get Spawner** and place it in a wide, clear area. Right-click it with the **DRM Core**, then **guide_tank_spawner.json → Apply JSON**. Default conditions exclude Creative players, so switch to Survival and remain nearby for the test. Follow the same [placement and Apply window](#dochi-spawn-control/spawn-control-npc-templates).

![The newly spawned M1A2 with its original behind it.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-runtime.png "Spawn Control 0.1.4 / Superb Warfare 0.8.9.1 / NeoForge 1.21.1. The server confirmed one new tank, a different UUID from the original and zero passengers. This is not a crew or driving demonstration.")

The same saved ID can be selected in natural-spawn rules with biome, time, distance and quantity limits. Saving those rules and applying JSON to a placed spawner are separate operations.

## Space and restored state

The complete vehicle needs loaded chunks, world-border clearance and collision space. Radius 0 on an entity anchor uses its center; a block anchor can obstruct that position itself. Match surface, water or air placement to the vehicle.

`maxOwned: 1`, `maxTotal: 0` allows repeated spawning while keeping one live owned vehicle. Driving it far away does not make it absent.

Native NBT parts, inventory, fuel and saved orientation are restored with a new UUID. Passengers are not cloned; fuel and ammo are not automatically replenished. Distribute vehicle mods, content packs and `vehicles/` files with the preset.

## DNPC spawning

Install DNPC and DRM and choose the [NPC clone template](#dochi-spawn-control/spawn-control-npc-templates) to spawn a finished NPC. The default NPC entry does not copy saved appearance or equipment.

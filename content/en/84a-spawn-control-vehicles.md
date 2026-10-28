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

## Save a vehicle

1. Assemble the vehicle with its own mod, including parts, fuel and paint; remove passengers.
2. As an operator, select exactly one actual vehicle root entity.

```text
/spawncontrolvehicle save adventure_car @e[type=mts:builder_existing,sort=nearest,limit=1,distance=..16]
/spawncontrolvehicle list
/spawncontrolvehicle reload
```

For another vehicle mod, replace `type=` with its real vehicle EntityType or use the vehicle UUID as the last argument. Saving does not move or consume the original. The file is `config/dochi_rpg_maker/spawn_control/vehicles/adventure_car.json`; the selectable ID is `spawncontrol_vehicle:adventure_car`.

## Bind a spawner

Choose the saved ID in the existing spawner entity list. Natural-spawn profiles can select it too and retain biome, dimension, time, player-distance and cap settings. Reapply saved settings to a placed spawner after refreshing its target list.

The MTS catalog enumerates installed pack models / colors. Pack defaults do not automatically supply every desired engine, wheel or fuel state: save an assembled vehicle for those. Empty MTS `builder_existing` and unassembled Automobility entities are excluded from direct selection.

## Space and restored state

The complete vehicle needs loaded chunks, world-border clearance and collision space. Radius 0 on an entity anchor uses its center; a block anchor can obstruct that position itself. Match surface, water or air placement to the vehicle.

`maxOwned: 1`, `maxTotal: 0` allows repeated spawning while keeping one live owned vehicle. Driving it far away does not make it absent.

Native NBT parts, inventory, fuel and saved orientation are restored with a new UUID. Passengers are not cloned; fuel and ammo are not automatically replenished. Distribute vehicle mods, content packs and `vehicles/` files with the preset.

## DNPC spawning

Default DNPC EntityType spawning requires DRM NPC API v1 and the DNPC provider. Initialization disables native respawn and sets home to the accepted spawn point. A missing API fails that spawn. This default EntityType path does not clone saved NPCs. Choose the separate [NPC clone template source](#dochi-spawn-control/spawn-control-npc-templates) to reuse authored appearance, equipment and bindings.

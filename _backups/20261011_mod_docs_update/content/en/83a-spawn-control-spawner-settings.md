---
title: Spawner Conditions and Effects
slug: dochi-spawn-control-spawner-settings
order: 845
description: Configure placed-spawner triggers, shared conditions, placement caps, destruction, particles, sounds, and boss bars.
product: dochi-spawn-control
category: Conditions and Effects
section: rules
status: Draft
version: 0.1.2
audience: Spawner creators
tags:
  - spawner
  - conditions
  - effects
---

## Triggers and conditions

Use `Conditions` to set the trigger and additional requirements. A trigger still needs to pass player, time, weather, redstone, and spawn-cap checks.

| Trigger | Behavior |
| --- | --- |
| `Interval` | Repeated attempts using the configured minimum and maximum interval |
| Player entry | Activates on entry into the activation range; leaving beyond the exit distance and returning can rearm it |
| Previous wave cleared | Attempts the next wave after the spawner has no owned entities remaining |
| Time | At most one successful activation per game day within the configured time window |
| `Redstone Rising Edge` | Attempts when the redstone signal changes from off to on |

`Initial delay` is the initial wait. Minimum and maximum intervals control repeated attempts. Values are in ticks; 20 ticks equal one second at normal server speed.

Check whether players are required, whether Creative players count, the minimum player count, and activation/exit distances. `Shared Conditions` opens DRM's common condition editor. Stored-data comparisons refer to CustomNPCs script player/world storeddata, not scoreboard objectives. Each counted player must pass the full shared-condition group.

Time uses `0–23999`. A start greater than the end spans midnight. Weather and the required redstone state can impose further restrictions.

## Counts and placement

| Setting | Purpose |
| --- | --- |
| `Entities per attempt` | Number attempted per activation, 1–64 |
| `Maximum owned entities` | Total owned population cap for this spawner |
| `Total spawn limit` | Cumulative creation cap; 0 means unlimited |
| Radius, vertical range, minimum/maximum Y | Candidate search area |
| Placement | Ground, air, water, or lava placement checks |
| Position attempts per entity | Limits the search for a valid location |
| Biome or `#tag` | Optional biome/tag restriction |
| Light source and minimum/maximum light | Combined, block, or sky light range |

Candidates are checked only in loaded chunks; the spawner does not force-load chunks. World-border and collision checks also apply. Raising the count cannot guarantee that many entities if space or caps prevent spawning. Large operations may be spread across the server's processing budget.

## Destruction

Choose harvesting or health-based destruction in `Destruction`.

| Mode | Settings and result |
| --- | --- |
| Harvest | Configure hardness and tool requirements; remove the spawner by mining |
| Health | Configure maximum health and hitbox; destroy it with attack damage |

You can also choose whether destruction drops the configured spawner item. Health-mode hit effects run only when the server accepts damage. Rejected attacks and attacks within the damage cooldown do not replay them.

## Hit particles and sounds

In `Effects`, enable hit particles, choose the registered particle type, and set particles per hit. Search the list of particles registered in the current instance. Types that require additional data also need matching parameters.

Hit sounds and break sounds have independent enable switches. Choose a sound ID and configure volume and pitch. Referenced modded particles and sounds require the mod supplying those resources in the running environment.

## Spawner boss bar

Enable the boss bar to show the spawner name and remaining health, and choose its color. It is shown to players tracking that spawner and removed when the spawner is destroyed or leaves their tracked set. It is not an always-visible server-wide bar.

## JSON reference: three draws from a 70:30 list

Use the editor for normal authoring. This minimal example is for inspecting or sharing files; omitted settings receive defaults.

```json
{
  "schemaVersion": 1,
  "name": "Mixed encounter",
  "sources": [
    { "kind": "entity", "id": "minecraft:pig", "weight": 70 },
    { "kind": "entity", "id": "minecraft:cow", "weight": 30 }
  ],
  "activation": { "requirePlayer": true, "includeCreative": true },
  "spawn": { "count": 3, "maxOwned": 9, "maxTotal": 0 }
}
```

Save it as `config/dochi_rpg_maker/spawn_control/spawners/examples/mixed.json` and load it in the editor. This test example includes Creative players in activation checks. Apply the saved JSON to a placed spawner to run it.

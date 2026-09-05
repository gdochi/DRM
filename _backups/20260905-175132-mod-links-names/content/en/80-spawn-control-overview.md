---
title: Dochi's Spawn Control Overview
slug: dochi-spawn-control-overview
order: 810
description: Server-authoritative natural-spawn rules, per-target profile ownership, native-spawn policy, and safety boundaries.
product: dochi-spawn-control
category: Overview
section: overview
status: Draft
version: 0.1.0
audience: Server operators and modpack creators
tags:
  - spawn control
  - natural spawn
  - forge
---

## Official name and purpose

**Dochi's Spawn Control** is a server-authoritative natural-spawn editor for Forge 1.20.1. Its internal mod ID is `drm_spawn_control`, and its in-game editor title is `Spawn Control`.

You can create independent natural-spawn rules for registered `Mob` EntityTypes and saved CustomNPCs server clones. The server checks dimensions, biomes, height, light, time, player distance, chance, group size, population caps, and lifecycle settings before it creates an entity.

When DRM Core is present, the mod uses the shared editor selector and DRM UI policy. Without DRM Core, it remains usable through its dedicated key and standalone screen.

## How rules belong to targets

All rules are stored in one active world document, but every profile belongs to exactly one target key.

| Target kind | Example target key | Meaning |
| --- | --- | --- |
| Registered entity | `entity:minecraft:glow_squid` | Rules for that EntityType only |
| CustomNPCs clone | `clone:1:Guard` | Rules for the `Guard` clone in tab 1 only |

One target may have several profiles. A zombie can have separate `forest_day`, `forest_night`, and `rare_cave` profiles without changing the target identity.

:::warning No cross-target inheritance
A Glow Squid rule does not carry over to a Frog. When Frog has no rule, the `Selected Target` view must show an empty rule list and inspector. `All Configured` intentionally shows rules from every target for management, but selecting a row moves the catalog to that rule's real target.
:::

## Native spawning and managed spawning

Each registered entity has a separate native-spawn policy.

| Policy | Behavior |
| --- | --- |
| `Native: ON` | Keep vanilla or the source mod's natural spawning. |
| `Native: OFF` | Block new `NATURAL` and `CHUNK_GENERATION` spawns. |

`Native: OFF` does not globally block commands, spawners, structures, breeding, buckets, or scripted creation. Entities created by Dochi's Spawn Control use a managed-spawn context to pass its native blocker, while a denial from another Forge mod is still respected.

If native spawning and a managed profile are both enabled, both routes may create the same entity. Test the managed rule first, then disable native spawning only when you intend a full replacement.

## Supported targets

| Target | Support path |
| --- | --- |
| Vanilla and ordinary modded `Mob` types | Created through the registered EntityType adapter |
| Saved CustomNPCs clones | Created through the dedicated clone adapter |
| Ender Dragon, Wither, Warden | Listed as experimental targets |
| Projectiles, effects, vehicles, `MISC` types | Excluded from the normal catalog or unsupported |
| Blank CustomNPCs registered EntityTypes | Excluded; saved clones appear in their own catalog entries |

A missing EntityType, missing clone, or target that needs a special adapter does not stop the server. Only the affected profile is disabled, with a reason shown in the editor and validation output.

## Authority and storage

Opening and saving the editor requires permission level 2 or Creative mode. The client does not own a local copy of the active policy: the server validates the draft, stores it under the current world, and applies it immediately.

```text
<world>/serverconfig/dochi_rpg_maker/spawn_control/spawn_control.json
```

The following pages cover installation, a first rule, the editor layout, every rule section, presets, sharing, diagnostics, and operations.

---
title: Forge, Fabric, and NeoForge Boundaries
slug: loader-compatibility
order: 45
description: Current loader requirements and implementation differences.
product: core-fabric
category: Forge, Fabric, and NeoForge Boundaries
section: getting-started
status: Draft
version: 0.2.3
audience: Creators / Operators
---

## Loader requirements

| Loader | Minecraft | DRM | Java | Required NPC mod |
| --- | --- | --- | --- | --- |
| Forge 47+ | 1.20.1 | 0.2.0 | 17 | Compatible CustomNPCs 1.20.1 build |
| Fabric | 1.21.1 | 0.2.3 | 21 | CustomNPCs Fabric 1.0.0 |
| NeoForge 21.1+ | 1.21.1 | 0.2.3 | 21 | Compatible CustomNPCs NeoForge 1.21.1 build |

Fabric also requires Loader 0.18.0+ and Fabric API 0.116.11+1.21.1+. CustomNPCs is required by all three DRM builds. Install matching loader/Minecraft builds of DRM and its addons on the server and clients.

The site's `core` pages target Forge; `core-fabric` pages target Fabric. This page records NeoForge installation and important differences. Fabric behavior is not a blanket guarantee of NeoForge parity.

## Feature boundaries

| Feature | Forge 0.2.0 | Fabric 0.2.3 | NeoForge 0.2.3 |
| --- | --- | --- | --- |
| Dialogue, shops, GUI, currency, HUD, quests | Available | Available | Available |
| Scene Maker | Absent from current Core | Available | Available |
| Core NPC Spawner with clone/lease management | Absent from current Core | Available | Available |
| Separate Spawn Control spawners | Install matching addon | Install matching addon | Install matching addon |
| Quest completion | Turn-in or automatic | Turn-in or automatic | Current implementation completes automatically |
| Direct quest-control commands below | Not available | Available | Available |
| Cobblemon trainer-victory objective | No matching addon build | Added by Cobblemon Editor | Added by Cobblemon Editor |

Core's `dochi_rpg_maker:npc_spawner` is distinct from Spawn Control's `Spawner Editor`. Core clone/lease templates and Spawn Control weighted-list JSON are not interchangeable.

## Installing NeoForge

Use `dochi_rpg_maker-0.2.3-neoforge-1.21.1.jar` with NeoForge CustomNPCs. Gecko models optionally require GeckoLib 4.9+. Animation providers also need compatible NeoForge builds, not Forge 1.20.1 files.

## Moving data

All three loaders use `config/dochi_rpg_maker` for authoring documents. The server owns those files; NPC bindings and player progress are runtime data in the world save.

1. Back up the config directory and world together.
2. Prepare a separate instance with matching loader dependencies.
3. Load a copy of the documents in each editor.
4. Check referenced items, entities, models, animations, and skills on that loader.
5. Test NPC interactions, quest completion/rewards, and reconnect persistence.

Shared JSON paths do not automatically convert Minecraft/mod IDs or NPC saves. Historical release notes retain their original version numbers.

## Direct quest controls

Available on Fabric and NeoForge with permission level 2.

```text
/drm quest @s pack:quest_id start
/drm quest @s pack:quest_id complete
/drm quest @s pack:quest_id reset
/drm quest @s pack:quest_id objective objective_id complete
/drm quest @s pack:quest_id objective objective_id reset
```

`start` bypasses normal availability gates. `complete` forces completion and pays unclaimed rewards. Whole-quest `reset` clears progress and reward records but does not take back granted items or currency. Resetting one objective retains sibling progress and reward-claim history.

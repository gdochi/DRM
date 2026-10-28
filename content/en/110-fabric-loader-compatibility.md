---
title: Loader setup and data migration
slug: loader-compatibility
order: 45
description: Scope of Forge and shared Fabric/NeoForge docs, installation, and moving existing data.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.2.9
audience: Creators / Operators
---

## Documentation scope

**Fabric and NeoForge 1.21.1 share this documentation.** Dialogue, NPC Shop, GUI Maker, currency, HUD, quests, Scene Maker, and Core NPC Spawner use the same normal authoring workflow. Select the matching JAR and platform dependencies for your loader.

Forge 1.20.1 has a separate documentation entry. The existing `core-fabric` route remains for link compatibility and also serves NeoForge readers.

## Installation requirements

| Loader | Minecraft | DRM | Java | Optional NPC integration |
| --- | --- | --- | --- | --- |
| Forge 47+ | 1.20.1 | 0.2.9 | 17 | Compatible CustomNPCs 1.20.1 build (optional) |
| Fabric | 1.21.1 | 0.2.9 | 21 | Compatible CustomNPCs Fabric build (optional) |
| NeoForge 21.1+ | 1.21.1 | 0.2.9 | 21 | Compatible CustomNPCs NeoForge 1.21.1 build (optional) |

Fabric also requires Loader 0.18.0+ and Fabric API 0.116.11+1.21.1+. See [Installation](#core-fabric/installation) for files and optional integrations.

## Moving authoring data

Authoring documents use `config/dochi_rpg_maker`. Server JSON is authoritative; runtime state such as NPC bindings and player progress also lives in the world.

1. Back up config and the world together.
2. Prepare a separate instance with the destination loader's DRM and dependencies.
3. Load copies of your custom documents.
4. Check that referenced items, entities, models, and animations exist on that loader.
5. Test dialogue, buying/selling/restocking, quest rewards, and reconnect persistence.

Shared authoring guidance does not automatically convert Minecraft/mod IDs or CustomNPCs world data. Core's `dochi_rpg_maker:npc_spawner` and the separate Spawn Control addon's spawner documents each use their own data paths.

## Direct quest controls

Available on Fabric and NeoForge with permission level 2.

```text
/drm quest @s pack:quest_id start
/drm quest @s pack:quest_id complete
/drm quest @s pack:quest_id reset
/drm quest @s pack:quest_id objective objective_id complete
/drm quest @s pack:quest_id objective objective_id reset
```

`start` bypasses normal availability gates. `complete` forces completion and grants unclaimed rewards. Whole-quest `reset` clears progress and reward records; it does not reclaim granted items or currency. Resetting one objective retains sibling progress and reward history.

Quests created in the current editor use automatic completion on both loaders. When migrating older JSON with `completionMode: turn_in`, Fabric retains manual turn-in while NeoForge completes automatically. Check the reward timing when importing that legacy data.

Current changes: [DRM 0.2.9](#core-fabric/release-notes-0-2-9).

Minecraft 26.3 uses separate Java 25 builds. See [26.3 setup and exclusions](#core-fabric/minecraft-26-3).

---
title: Loader setup and data migration
slug: loader-compatibility
order: 45
description: Scope of Forge and shared Fabric/NeoForge docs, installation, and moving existing data.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.3.1
audience: Creators / Operators
---

## Documentation scope

**Fabric and NeoForge 1.21.1 share this documentation.** Dialogue, NPC Shop, GUI Maker, currency, HUD, quests, Scene Maker, and Core NPC Spawner use the same normal authoring workflow. Choose files for the same Minecraft version and loader. Follow each guide's loader notes for differences such as apply buttons, quest completion and HUD activation.

Forge 1.20.1 has a separate documentation entry. The existing `core-fabric` route remains for link compatibility and also serves NeoForge readers.

## Installation requirements

| Loader | Minecraft | DRM | Java | Optional NPC integration |
| --- | --- | --- | --- | --- |
| Forge 47+ | 1.20.1 | 0.3.1 | 17 | DNPC or compatible CustomNPCs |
| Fabric | 1.21.1 | 0.3.1 | 21 | DNPC or compatible CustomNPCs |
| NeoForge 21.1+ | 1.21.1 | 0.3.1 | 21 | DNPC or compatible CustomNPCs |

Fabric also requires Loader 0.18.0+ and Fabric API 0.116.11+1.21.1+. See [Installation](#core-fabric/installation) for files and optional integrations.

## Moving authoring data

Authoring documents use `config/dochi_rpg_maker`. Server files provide the shared settings. The world also stores NPC connections and player progress.

1. Back up config and the world together.
2. Prepare a separate instance with the destination loader's DRM and dependencies.
3. Load copies of your custom documents.
4. Check that referenced items, entities, models, and animations exist on that loader.
5. Test dialogue, buying/selling/restocking, quest rewards, and reconnect persistence.

Shared authoring guidance does not automatically convert Minecraft/mod IDs or CustomNPCs world data. Core's `dochi_rpg_maker:npc_spawner` and the separate Spawn Control addon's spawner documents each use their own data paths.

## Check the migrated conversation on its NPC

After moving the files, open the NPC with DRM Core and use **Dialogue JSON → your set → Apply Dialogue**. Empty both hands, speak to the actual NPC and check the text, choices and rewards.

![Applying a moved dialogue set to an NPC.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "DRM 0.3.1 / NeoForge 1.21.1. village_guide was selected and applied; Applied JSON on the right shows the connection. Finding a file and connecting it to an NPC are separate checks.")

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

Current changes: [DRM 0.3.1](#core-fabric/release-notes-0-3-1).

Minecraft 26.3 uses separate Java 25 builds. See [26.3 setup and exclusions](#core-fabric/minecraft-26-3).

---
title: Minecraft 26.3
slug: minecraft-26-3
order: 6
description: Separate 26.3 builds, Java 25, NPC providers and porting limits.
product: core-fabric
category: Minecraft 26.3
section: getting-started
status: Guide
version: 0.2.9 / Minecraft 26.3
audience: Creators / server operators
---

## Choose the target first

26.3 has separate Fabric / NeoForge builds using **Java 25**. Use matching Minecraft and loader builds on the server and clients. Fabric API remains a separate platform installation where required.

This table records **local production artifacts checked on 2026-10-28**. It does not establish public availability or complete port parity.

| Mod | 26.3 version | Integration |
| --- | --- | --- |
| DRM | 0.2.9 | DNPC optional |
| NPC Core | 0.1.1 | Basic creation, editing and storage without DRM |
| BattleWorks | 0.1.6 | DRM required; NPC combat uses the DNPC provider |
| Spawn Control | 0.1.4 | Standalone ordinary spawning; templates need the public provider API |
| Real Armor | 0.1.4 | Optional Easy NPC / DNPC |
| Minigames | 0.1.3 | DRM optional |
| MapIcon Integration | 0.1.2 | DRM required; maps and DNPC individually optional |

Cobblemon Editor was checked on **1.21.1** Fabric / NeoForge. Warfare / Expanded target **1.20.1** Forge and **1.21.1** NeoForge. This table does not announce 26.3 support for those mods.

## NPCs and editors

**CustomNPCs is permanently excluded from 26.3 onward.** Do not wait for a future CustomNPCs release. DRM and DNPC are optional to one another; other addons retain their own dependency contracts.

26.3 DRM removes **Faction Editor, the linked player faction screen and GUI Maker faction components**. Legacy file readers do not restore those features. DNPC's optional relation API remains separate. Fabric also retains its Item Editor / Stat Builder exclusions; do not assume identical editor lists across loaders.

## First integration

1. Install matching DRM and DNPC builds and create an NPC.
2. Save its appearance, equipment and behavior. Create a [v3 clone template](#dochi-npc-core/npc-core-templates) for reuse.
3. Open BattleWorks for the NPC and save/apply its combat file. Six bundled samples install only missing files under `config/dochi_rpg_maker/mobs/patterns/samples/`.
4. In a placed Spawn Control spawner, choose **NPC clone template**. Legacy CustomNPCs clones are not automatically converted.
5. Check interaction, storage, reconnect and the addon features used by your world.

BattleWorks rejects legacy `summon_clone` on 26.3. The Better Combat sample needs compatible providers and motion support; its presence does not establish live playback verification. Changes to MWENT's native 26.3 trade definitions take effect after world reconnect or server restart.

## Verification and existing data

DRM has recorded client, dedicated-server and JSON network checks. Full GUI, transactions and existing-world migration remain incomplete porting gates. Cleanup of retained legacy reflection paths is also incomplete and does not enable CustomNPCs support.

DNPC standalone operation and placed template spawning have actual 26.3 evidence. COMMON natural-template spawning results do not establish the same 26.3 coverage. Back up the world and configuration, and test migration on a copy.

For developers, final 26.3 artifacts remain in loader-local `build/libs/` and that mod's independent `jar-26.3/`. Older targets retain their `jar/` collection.

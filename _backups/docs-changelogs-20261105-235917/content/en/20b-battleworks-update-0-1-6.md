---
title: Choose Your BattleWorks Build
slug: battleworks-update-0-1-6
order: 208
description: Choose DRM and an NPC mod for your Minecraft version.
product: mob-editor
category: 0.1.6 and loader selection
section: start
status: Guide
version: 0.1.6
audience: Creators / server operators
---

## Required mods

BattleWorks **adds NPC combat authoring to DRM**. Create the NPC with DNPC or CustomNPCs.

| Minecraft / loader | Java | Files to choose |
| --- | --- | --- |
| Forge 1.20.1 | 17 | Forge 1.20.1 builds of BattleWorks, DRM and the NPC mod |
| Fabric / NeoForge 1.21.1 | 21 | 1.21.1 builds for the selected loader |
| Fabric / NeoForge 26.3 | 25 | 26.3 builds of BattleWorks, DRM and DNPC for the selected loader |

Match loaders/versions on server and clients. Use DNPC on 26.3; CustomNPCs is unavailable there.

## Make one attack

Place an NPC, make its BattleWorks combat file and apply it. Follow [your first melee attack](#mob-editor/battleworks-first-attack) to build wind-up, hit and recovery. The current tutorial uses a DNPC on NeoForge 1.21.1 and checks saving, applying and actual damage.

DNPC also supports combat, relationships and appearance integration. Extra motion requires its respective animation mods.

The first-attack tutorial was verified with **BattleWorks 0.1.6 + DRM 0.3.1 + DNPC 0.1.3 / NeoForge 1.21.1**. Success with this combination does not establish a minimum DRM version that excludes every older build.

![A saved BattleWorks combat file linked to a DNPC.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. After installation, verify saving, applying and an actual hit as well as opening the editor.")

## Use example patterns

Load examples from `config/dochi_rpg_maker/mobs/patterns/samples/`. Use **Save As** to make your own version.

Better Combat examples need compatible Better Combat and its motion requirements. Legacy CustomNPCs clone summoning is unavailable on 26.3.

Continue with [NPC setup](#mob-editor/mob-editor-setup) or the [learning path](#mob-editor/mob-editor-overview).

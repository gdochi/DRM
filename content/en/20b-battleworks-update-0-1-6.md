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

| Minecraft / loader | Java | DRM requirement |
| --- | --- | --- |
| Forge 1.20.1 | 17 | 0.2.8+ |
| Fabric / NeoForge 1.21.1 | 21 | 0.2.9+ |
| Fabric / NeoForge 26.3 | 25 | 0.2.8+ |

Match loaders/versions on server and clients. Use DNPC on 26.3; CustomNPCs is unavailable there.

## Make one attack

Place an NPC, make its BattleWorks combat file and apply it. Follow [your first melee attack](#mob-editor/battleworks-first-attack) to build wind-up, hit and recovery. That tutorial's NPC setup screens use Forge/CustomNPCs.

DNPC also supports combat, relationships and appearance integration. Extra motion requires its respective animation mods.

## Use example patterns

Load examples from `config/dochi_rpg_maker/mobs/patterns/samples/`. Use **Save As** to make your own version.

Better Combat examples need compatible Better Combat and its motion requirements. Legacy CustomNPCs clone summoning is unavailable on 26.3.

Continue with [NPC setup](#mob-editor/mob-editor-setup) or the [learning path](#mob-editor/mob-editor-overview).

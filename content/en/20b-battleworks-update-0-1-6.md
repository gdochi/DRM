---
title: 0.1.6 and loader selection
slug: battleworks-update-0-1-6
order: 208
description: Current packaged requirements and the 26.3 DNPC combat boundary.
product: mob-editor
category: 0.1.6 and loader selection
section: start
status: Guide
version: 0.1.6
audience: Creators / server operators
---

## DNPC on existing targets

Current 0.1.6 patches integrate DNPC combat editing, friendly/hostile relationships, appearance and control through DRM's public NPC API on Forge 1.20.1 and Fabric/NeoForge 1.21.1. CustomNPCs remains optional. Create an NPC, save/apply its BattleWorks document, then check actual targeting and motion.

Ending combat control no longer cancels another mod's navigation. Existing Forge/CustomNPCs tutorials remain provider-specific examples. Current COMMON native DNPC evidence is centered on NeoForge and does not establish equal runtime coverage on Forge/Fabric or every optional-mod combination.

## Current installation

This table follows local BattleWorks **0.1.6** production metadata, rather than older README instructions or the 0.1.4 distribution bundle.

| Target | Java | Packaged DRM requirement | NPC workflow |
| --- | --- | --- | --- |
| Forge 1.20.1 | 17 | 0.2.8+ | Optional DNPC / CustomNPCs provider |
| Fabric / NeoForge 1.21.1 | 21 | 0.2.9+ | Optional DNPC / CustomNPCs provider |
| Fabric / NeoForge 26.3 | 25 | 0.2.8+ | DNPC provider; CustomNPCs excluded |

DRM is required. CustomNPCs is optional on the older targets too, but the existing [first attack tutorial](#mob-editor/battleworks-first-attack) specifically uses **Forge and CustomNPCs**. It does not establish full DNPC parity.

These are current JAR declarations, not proof that every earlier Core is incompatible. The older Fabric port also needs the `drm:battleworks_api=1` capability.

## Starting on 26.3

Install matching DRM, DNPC and BattleWorks builds, then apply a combat document to a DNPC. Models and motions use DRM's supported stack. See [26.3 setup](#core-fabric/minecraft-26-3) for Java and feature exclusions.

Six samples install only missing files under `config/dochi_rpg_maker/mobs/patterns/samples/`. Use `Save As` for working copies. The Better Combat three-hit sample needs compatible providers, libraries and NPC motion support; live playback of that sample remains unverified.

Legacy `summon_clone` is rejected on 26.3. CustomNPCs clone names are not automatically converted into DNPC templates. Bounded DNPC server/client checks do not establish coverage of all optional spell and animation stacks. Version alignment to 0.1.6 did not repeat all historical gameplay checks.

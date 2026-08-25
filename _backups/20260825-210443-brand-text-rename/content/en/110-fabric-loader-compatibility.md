---
title: Forge And Fabric Boundary
slug: loader-compatibility
order: 45
description: How the Forge 1.20.1 and Fabric 1.21.1 documentation differ, including migration checks.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.1.7
audience: Creators / Server operators
tags:
  - fabric
  - compatibility
  - migration
---

## Build Covered By These Pages

Every page in this product targets `DRM Core 0.1.7`, `Fabric 1.21.1`, and Java 21. The separate `DRM Forge 1.20.1` product remains the documentation for the Forge build.

| Boundary | Forge docs | Fabric docs |
| --- | --- | --- |
| Minecraft | 1.20.1 | 1.21.1 |
| Loader | Forge 47+ | Fabric Loader 0.18.0+ |
| Java | 17 | 21 |
| Metadata | `META-INF/mods.toml` | `fabric.mod.json` |
| Example JAR | `dochi_rpg_maker-0.1.4-1.20.1-forge.jar` | `dochi_rpg_maker-0.1.7-fabric-1.21.1.jar` |

## Preserved Data Contracts

The Fabric port preserves existing DRM data rather than redesigning it. These contracts remain stable.

- Mod ID and namespace `dochi_rpg_maker`
- Official data root `config/dochi_rpg_maker`
- Dialogue, GUI, NPC Shop, currency, HUD, and Remnant Msg JSON keys and folder meanings
- Editor, component, condition, and action IDs
- CustomNPCs NPC binding semantics

This allows copied Forge JSON to be tested on Fabric. Never test the move in the only production folder or world; use a copy first.

## Fabric 0.1.7 Features To Check

- Full wrapped-line dialogue pagination with configurable previous/next controls
- Searchable NPC Shop Item ID picker
- Searchable item, faction, advancement, and FTB Quest fields plus condition drag reordering
- NPC Apply `FUNCTION` search across built-in and addon apply targets; the redundant transient footer label is no longer rendered while switching functions
- Teleporter Set authoring, NPC apply/remove, `go_teleporter`, server-authoritative travel, and a usable non-blurred runtime GUI
- Generic NPC Spawner block editing with weighted template/Soul Stone sources, conditions, spawn modes, and validated display appearance
- Searchable Remnant message/policy files and persisted item/block appearance settings
- Currency balance copying across player replacement plus conversion/death-loss notices
- Optional Mod Menu entry for the shared `Mods Config` screen

## Current 0.1.7 Boundary

The later Forge 0.1.4 option `choiceHideUntilTypingComplete` is not present in the current Fabric 0.1.7 source. Fabric has an FTB Quest picker, but do not assume it includes every later Forge picker refinement such as initial search focus and all distinct empty-state messages.

The 0.1.7 source passed `clean build runPortingRegressionChecks`: all 13 Gradle tasks completed, 35 focused regression test files reported PASS, 54 source JSON files parsed, and all 11 bundled locales had the same 839-key set. Interactive GUI, multiplayer, live optional integrations, and reconnect/restart persistence still need acceptance testing for the actual server modpack.

NPC Spawner ConfigVersion 1 through 3 data and legacy singular sources are migrated into the current ConfigVersion 4 weighted pool. Legacy Cobblemon Editor clone files are accepted for import, but new generic templates should use `dochi_rpg_maker_npc_spawner_template` under the Core path.

## Moving From Forge

1. Back up the Forge `config/dochi_rpg_maker` folder and world.
2. Create a separate Fabric 1.21.1 test instance.
3. Install the Fabric DRM build and Fabric versions of every required dependency.
4. Copy the DRM config folder and validate its JSON files.
5. Test dialogue Load/Save As, shop buy/sell, Teleporter edit/apply/travel, NPC Spawner sources and restart behavior, currency death rules, HUD, and Remnant restart persistence.
6. Do not write Fabric-saved files back over production Forge data until the copied test has passed.

:::warning Match addon loaders
Moving DRM Core to Fabric does not make Forge DRM addons load on Fabric. Every addon and optional dependency must also target Fabric 1.21.1.
:::

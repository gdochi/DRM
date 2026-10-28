---
title: Installation and Your First NPC
slug: cobblemon-editor-setup
order: 510
description: Install Dochi Cobblemon Editor current, verify its folders, and apply your first NPC role.
product: drm-cobblemon-editor
category: Setup
section: setup
status: Draft
version: Fabric / NeoForge 0.2.7
audience: Server operators and first-time creators
tags:
  - setup
  - fabric
  - npc
---

## Supported environment

| Loader | Addon | Platform |
| --- | --- | --- |
| Fabric 1.21.1 | 0.2.7 | Java 21, Fabric Loader / API satisfying DRM |
| NeoForge 1.21.1 | 0.2.7 | Java 21, NeoForge 21.1 series |

Both require **DRM Core 0.2.8+ and Cobblemon >=1.7.3 <1.9.0**. Current Core guidance uses 0.2.9. Its Fabric platform declarations require Loader 0.18.0+ and Fabric API 0.116.11+1.21.1+.

**CustomNPCs is optional.** File editing and DNPC trainers work without it. Pokemon Itself, PokéMart, Nurse Joy, Starter Selector and legacy CNPC clones need their CustomNPCs integration. DNPC, RCT API and CobbleDollars are optional too.

| Loader | File |
| --- | --- |
| Fabric | `dochi_cobblemon_editor-0.2.7-fabric-1.21.1.jar` |
| NeoForge | `dochi_cobblemon_editor-0.2.7-neoforge-1.21.1.jar` |

Install the same build on server and clients. Mod ID remains `cobble_npc`. Both loaders have execution evidence for Cobblemon 1.7.3, 1.8.0, 1.8.2, 1.8.3 and 1.8.4; 1.8.1 was not separately exercised. See [current changes](#drm-cobblemon-editor/cobblemon-editor-current-update).

## Folders created on first launch

Starting a world or server once installs the addon folders below DRM's data root.

```text
config/dochi_rpg_maker/
├─ cobblemon/
│  ├─ trainers/
│  ├─ pokemon_itself/
│  ├─ battle_presentations/
│  ├─ battle_schedulers/
│  ├─ encounter_presentations/
│  ├─ battle_sound/
│  ├─ pokemarts/
│  ├─ nurse_joy/
│  ├─ starter_selectors/
│  ├─ entity_clones/
│  └─ _migration_backups/
├─ npc_spawner/
│  └─ entity_clones/
└─ gui/
```

Addon documents live under `cobblemon/`. PokéMart and Starter Selector screen layouts use DRM's shared `gui/` directory. The addon upgrades only untouched legacy default GUIs to the shared DRM sprite style, backs up the old defaults under `_migration_backups/`, and preserves customized files.

## Open the addon editors

1. Enter Creative mode or use an account with DRM editing permission.
2. Right-click the air with the `Dochi RPG Maker Core` item to open the shared editor selector.
3. Choose `Cobblemon Editor`, `Battle Presentation Maker`, or `PokéMart Editor` from `Add-on`.
4. Choose `Load Existing`, `Use Default`, or `Create New` as the starting source.

| Choice | When to use it |
| --- | --- |
| `Load Existing` | Continue editing a saved user JSON document |
| `Use Default` | Start from a safe, complete structure |
| `Create New` | Start from an empty draft or the guided creation flow |

Defaults and samples are templates. Use `Save As` to create a user path such as `custom/` instead of overwriting a bundled name.

## Create the first trainer

1. Open `Cobblemon Editor` and choose `Use Default`.
2. Keep the battle type set to `Trainer`.
3. Set the species and level in the first `Pokemon Party` slot.
4. Check the trainer name, `Singles` format, and AI Skill.
5. Keep the encounter trigger on `Interaction` until the basic battle works.
6. Choose `Save As` and save a path such as `custom/first_trainer.json`.
7. Right-click the target CustomNPCs NPC with `Dochi RPG Maker Core`.
8. Select `Cobblemon Trainer`, choose the saved document, and press `Apply`.
9. Put the core away, empty both hands, and right-click the NPC.
10. Accept the prompt and verify that the player's real Cobblemon party enters battle.

:::warning Saving and applying are separate
`Save` and `Save As` write the server JSON document. `Apply` binds its source path and a safety snapshot to the NPC. Saving the same source path is picked up on the next runtime request; Apply again when changing the path or role.
:::

## Create the first Pokemon Itself NPC

1. Change the battle type to `Pokemon Itself`.
2. Set species, form, aspects, shiny state, level, nature, ability, moves, ball, and held item.
3. Review Scale, Pose, Animation, and Shining appearance options.
4. Save a user copy such as `custom/first_pokemon.json`.
5. Apply it through the target NPC's `Cobblemon Pokemon Itself` entry.

Pokemon Itself also supports up to 16 rounds, each with one Pokémon, round conditions, and after-battle actions.

## First-launch checks

| Symptom | Check first |
| --- | --- |
| Add-on editors are missing | DRM and addon versions, Fabric loader log, and whether mod ID `cobble_npc` loaded |
| Defaults are missing | Start a world/server once and verify `config/dochi_rpg_maker/cobblemon` |
| NPC apply target is missing | Check the NPC provider and role; DNPC supports Trainer |
| Interaction does not open | Empty both hands and check for DRM Dialogue, DRM NPC Shop, or PokéMart priority |
| Player party error | Put at least one battle-ready Cobblemon Pokémon in the player's active party |

Use one simple NPC in a separate test world first. Combining several runtime roles on one NPC requires a deliberate interaction-priority design.

## Reopening a source-bound NPC

The bound editor initializes from the latest server document and source path. Saving that path updates the next runtime request. Later machine-status responses preserve draft edits, and resizing retains text. If dialogue differs, first compare the NPC's bound path with the file being edited.

## Back and Forward in editors

The shared toolbar arrows follow screen history across DRM Core and addon editors. An arrow remains visible but disabled when there is no destination. Navigation is separate from saving a file or applying it to an NPC; finish with `Save` or `Save As`.

## DNPC trainers

Apply Trainer JSON to DNPC through DRM's public NPC Actor API without CustomNPCs. Reopen the applied trainer profile and configure post-battle dialogue and rewards. This does not extend CNPC-specific roles to DNPC.

---
title: Installation and Your First NPC
slug: cobblemon-editor-setup
order: 510
description: Install Dochi Cobblemon Editor 0.1.4, verify its folders, and apply your first NPC role.
product: drm-cobblemon-editor
category: Setup
section: setup
status: Draft
version: 0.1.4
audience: Server operators and first-time creators
tags:
  - setup
  - fabric
  - npc
---

## Installation checklist

Install the following mods in the same Fabric 1.21.1 environment.

| Mod | Role |
| --- | --- |
| Fabric API | Event and networking foundation |
| DRM Core 0.1.7+ | Shared editor selector, server JSON storage, GUI Maker, and NPC apply workflow |
| Cobblemon 1.7.3 | Pokémon data, player parties, and the actual battle runtime |
| CustomNPCs Fabric 1.0.0 | NPC targets for trainers, Pokémon, and shops |
| `dochi_cobblemon_editor-0.1.4-fabric-1.21.1.jar` | Cobblemon-specific DRM editors and runtime integration |
| CobbleDollars | Optional PokéMart currency provider |

For multiplayer, use the same mod set on the server and every client. The addon includes client editors and renderers as well as server battle, reward, and shop logic.

## Folders created on first launch

Starting a world or server once installs the addon folders below DRM's data root.

```text
config/dochi_rpg_maker/
├─ cobblemon/
│  ├─ trainers/
│  ├─ pokemon_itself/
│  ├─ battle_presentations/
│  ├─ pokemarts/
│  ├─ nurse_joy/
│  ├─ starter_selectors/
│  ├─ entity_clones/
│  └─ _migration_backups/
├─ npc_spawner/
│  └─ entity_clones/
└─ gui/
```

Addon documents live under `cobblemon/`. PokéMart and Starter Selector screen layouts use DRM's shared `gui/` directory. Version 0.1.4 upgrades only untouched legacy default GUIs to the shared DRM sprite style, backs up the old defaults under `_migration_backups/`, and preserves customized files.

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

This type creates a normal Cobblemon PVE battle from one fully specified Pokémon instead of using trainer rounds.

## First-launch checks

| Symptom | Check first |
| --- | --- |
| Add-on editors are missing | DRM and addon versions, Fabric loader log, and whether mod ID `cobble_npc` loaded |
| Defaults are missing | Start a world/server once and verify `config/dochi_rpg_maker/cobblemon` |
| NPC apply target is missing | Confirm the target is a CustomNPCs NPC opened directly with the core item |
| Interaction does not open | Empty both hands and check for DRM Dialogue, DRM NPC Shop, or PokéMart priority |
| Player party error | Put at least one battle-ready Cobblemon Pokémon in the player's active party |

Use one simple NPC in a separate test world first. Combining several runtime roles on one NPC requires a deliberate interaction-priority design.

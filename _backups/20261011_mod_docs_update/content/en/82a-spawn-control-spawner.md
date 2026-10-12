---
title: Creating a Placed Spawner
slug: dochi-spawn-control-spawner
order: 835
description: Author spawner JSON, configure weighted targets, choose a model, and apply the document to a placed spawner.
product: dochi-spawn-control
category: Editor
section: editor
status: Draft
version: 0.1.2
audience: Spawner creators
tags:
  - spawner
  - editor
  - probability
---

## Create a document and apply it

`Spawner Editor` is a creator-facing JSON editor. You can author documents without an installed spawner. Editing and applying require Creative mode or permission level 2.

1. Right-click the air with DRM Core to open the editor selector.
2. Choose `Spawner Editor`, then create a document or load existing JSON.
3. Set the name and target list in `Spawn Target`.
4. Configure activation, entities per attempt, caps, and placement in `Conditions` and `Spawn Settings`.
5. Adjust destruction, effects, and appearance as needed.
6. Use `Save As` to name and save the document. Use `Save` for later edits to that file.
7. Click `Get Spawner` to receive a blank spawner item and place it where needed.
8. Right-click the placed spawner with DRM Core. Select the saved file in `Apply Spawner JSON` and click `Apply JSON`.

**Saving JSON and applying it to the world are separate actions.** A new spawner is inactive until configured. After editing a document, apply the saved file again to each spawner you intend to update.

Documents are stored on the server under `config/dochi_rpg_maker/spawn_control/spawners/`. In singleplayer, the instance's game directory is the root; documents are shared across its worlds. See [Sharing and Operations](#dochi-spawn-control/dochi-spawn-control-presets-operations) for paths and backups.

## Editor layout

Select a category in the left panel and edit values on the right. The JSON path is a label identifying the current document. Use `Save As` to change its destination.

| Category | Contents |
| --- | --- |
| `Spawn Target` | Name, enabled state, entity/clone list, and relative chances |
| `Conditions` | Trigger, interval, players, time, weather, redstone, and shared conditions |
| `Spawn Settings` | Entities per attempt, owned/lifetime caps, placement, terrain, and light |
| `Destruction` | Harvest or health mode, health, hitbox, and item drops |
| `Effects` | Hit particles, hit/break sounds, and spawner boss bar |
| `Appearance` | Model, scale, rotation, offset, and preview |

Click a type or mode button to open a flyout and select an option directly. Long lists support search, the mouse wheel, and a scrollbar. Cancel or Esc keeps the previous selection. `On/Off` controls are toggles.

## Target list and chances

Add entries, select a row, then edit its target and chance. Remove unused entries or set their chance to `0`. A list can contain up to 64 entries and needs at least one positive chance.

| Source | Target |
| --- | --- |
| `Entity` | An entity ID registered on the server |
| `CNPC Clone` | A saved CustomNPCs server clone, identified by tab and name |
| `DW Clone` | A saved Dochi’s Warfare clone template |

Clone sources require their corresponding mod and saved clone. Ordinary entity targets do not make either clone mod a required dependency.

Chance values are relative to the other entries. A higher value makes that target more likely; it does not guarantee that the highest entry wins. The editor displays the effective percentage calculated from the total.

| Input | Selection chance |
| --- | --- |
| Pig 70, cow 30 | Pig 70%, cow 30% |
| Pig 1, cow 1 | 50% each |
| Pig 10, cow 0 | Pig only |

Set `Entities per attempt` to `3` to attempt up to three entities in one activation. Each entity is drawn independently, so repeats are possible. A 70:30 list does not guarantee two pigs and one cow. Placement failures and caps can reduce the number actually spawned.

`Maximum owned entities` limits the spawner's total owned population. `Total spawn limit` limits its cumulative creations; `0` means unlimited. Both caps cover the entire list, not each entry separately.

## Appearance and preview

`Model source` in `Appearance` offers **Item, Entity, and Block**. Appearance is independent of the spawn list: a block-shaped spawner can create zombies.

Use `Choose` to select the model ID, then adjust scale, rotation, and vertical offset. Configure block states with `Block properties (JSON)` and model data with `Model NBT (SNBT)`. CNPC and DW clones are spawn sources, not additional appearance types.

Preview renders inside the editor and does not create an entity in the world. While a changed model is being resolved, it retains the last successful preview and updates from the latest request.

Continue with [Spawner Conditions and Effects](#dochi-spawn-control/dochi-spawn-control-spawner-settings).

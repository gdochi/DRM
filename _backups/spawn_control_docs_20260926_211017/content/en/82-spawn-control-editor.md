---
title: Spawn Control Editor
slug: dochi-spawn-control-editor
order: 830
description: Use the topbar, target catalog, preview, rule manager, inspector, filters, and bulk actions.
product: dochi-spawn-control
category: Editor
section: editor
status: Draft
version: 0.1.0
audience: Spawn-rule creators
tags:
  - editor
  - profiles
  - filters
---

## What this screen is

Spawn Control is an **authoring editor** for the server's active natural-spawn configuration. It is not a player-facing runtime screen. Changes remain in the current draft until you complete `Save` or a preset operation.

## Topbar

| Action | Behavior |
| --- | --- |
| `Editors` | Return to the shared DRM editor selector when DRM Core is available. |
| `Create New` | Start an empty spawn-set draft without changing the active server configuration yet. |
| `Load` | Search for and load a complete set or target preset. |
| `Save` | Store the draft as the active world configuration and apply it immediately. |
| `Save As` | Choose either Complete Set or Current Target Preset before naming the file. |
| `Reset` | Restore the baseline received when the editor opened or last refreshed after save. |
| `Close` | Close the editor. Unsaved edits are not applied. |

## Left: Entity / Clone Catalog

The catalog chooses the target for new rules.

- Search registered mobs and saved CustomNPCs clones together.
- Search by registry ID, display name, or mod name.
- Use `mod:<id>` or `support:<state>` queries.
- Combine entity/clone source, support state, and installed-mod filters.
- Preview the selected target in the middle panel.
- Use the bottom `Native: ON/OFF` action for a registered entity. It does not apply to clones.

Projectiles, effects, vehicles, and other non-Mob EntityTypes are excluded. Special bosses may appear with Experimental support status.

## Middle: preview and Natural Spawn Rules

The upper section previews the selected catalog target. The lower section manages configured rules.

| View | Meaning |
| --- | --- |
| `Selected Target` | Show only rules that belong to the current catalog target. This is the default. |
| `All Configured` | Show rules for every target in one management view. |

Selecting a rule body in `All Configured` selects that profile and moves the catalog to its real target. It does not copy or inherit the rule into the previously previewed entity.

Each part of a rule row has a separate action.

| Row area | Action |
| --- | --- |
| Left checkbox | Select rules for bulk Duplicate, Enable, Disable, or Delete |
| Row body | Select the one profile shown in the inspector |
| Right switch | Toggle that one profile's enabled state |

`Add Rule` always creates a profile for the current catalog target. Bulk actions affect only checked rules. Delete has a confirmation step and remains a draft change until save.

## Search, filter, and sort

Rule search covers names, profile IDs, target keys, EntityTypes, clone tab/name, and validation errors. `Filter & Sort` provides:

- state: All, Enabled, Disabled, or Error
- sort key: Priority, Name, or Target
- direction: Ascending or Descending

A rule hidden by search or filtering has not been deleted. If a target has rules but the result is empty, clear the query and state filter first.

## Right: Rule Inspector

The inspector edits the selected profile under Identity, World Conditions, Spawn Rate and Group, Population Caps, and Lifecycle.

Dimensions and Biomes use searchable multi-select pickers. No selection means unrestricted. Numeric ranges use separate fields; inverted ranges can be normalized into safe order during save.

The EntityType or clone label under the inspector is the **actual target owned by the selected rule**. If it differs from the preview, check whether you intentionally selected a different rule in `All Configured`.

## Advanced Diagnostics

| Action | World impact |
| --- | --- |
| `Check Here` | Evaluate conditions and caps at the current location without creating an entity |
| `Spawn One` | Create one real managed entity after confirmation |
| `Clear Generated` | Remove generated entities currently tracked by this mod |

Diagnostics submit the current draft for temporary server-side evaluation without first replacing the active configuration file.

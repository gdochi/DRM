---
title: Spawn Control Editor
slug: dochi-spawn-control-editor
order: 830
description: Use the topbar, target catalog, preview, rule manager, inspector, filters, and bulk actions.
product: dochi-spawn-control
category: Editor
section: editor
status: Draft
version: 0.1.5
audience: Spawn-rule creators
tags:
  - editor
  - profiles
  - filters
---

This page describes **natural-spawn profiles**. For placed spawners, use the [Spawner Editor guide](#dochi-spawn-control/dochi-spawn-control-spawner). Natural-spawn `Spawn Chance (0-1)` is separate from relative chances in a spawner target list.

## What this screen is

Spawn Control is an **authoring editor** for the server's active natural-spawn configuration. It is not a player-facing in-game screen. Changes remain in the current draft until you complete `Save` or a preset operation.

![Spawn Control with Entity / Clone Catalog on the left, a target preview and Natural Spawn Rules in the middle, and Rule Inspector on the right.](assets/media/guides/spawn-control-014-neo1211/catalog.png "Spawn Control 0.1.4 on NeoForge 1.21.1. Select a target, add a rule with Add Rule, then edit its spawn conditions on the right.")

Find the mob in the left search field. **Selected Target** shows its rules; **All Configured** includes other targets. If the right panel says “No rule is selected,” select a rule in the middle.

## Topbar

| Action | Behavior |
| --- | --- |
| `Editors` | Return to the shared DRM editor selector when DRM Core is available. |
| `Create New` | Start an empty spawn-set draft without changing the active server configuration yet. |
| `Load` | Search for and load a complete set or target preset. |
| `Save` | Store the draft as the active server configuration and apply it immediately. |
| `Save As` | Choose either Complete Set or Current Target Preset before naming the file. |
| `Reset` | Restore the baseline received when the editor opened or last refreshed after save. |
| `Close` | Close the editor. Unsaved edits are not applied. |

## Left: Entity / Clone Catalog

The catalog chooses the target for new rules.

- Search registered mobs and supported saved NPC templates together. See [spawning saved NPCs](#dochi-spawn-control/spawn-control-npc-templates) for DNPC templates.
- Search by ID, display name, or mod name.
- Use `mod:<id>` or `support:<state>` queries.
- Combine entity/clone source, support state, and installed-mod filters.
- Preview the selected target in the middle panel.
- Use the bottom `Native: ON/OFF` action for a registered entity. It does not apply to clones.

Ordinary projectiles, effects and other non-Mob EntityTypes are excluded from standard targets. Supported vehicles and saved vehicle templates appear through dedicated integrations; see [vehicle spawning](#dochi-spawn-control/spawn-control-vehicles). Special bosses may have Experimental support status.

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

Rule search covers names, profile IDs, target keys, EntityTypes, clone tab/name, and validation errors. The inline status, sort-key and direction dropdowns below rule search provide:

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
| `Spawn One` | Create a real managed entity after confirmation, or the complete enabled squad |
| `Clear Generated` | Remove generated entities currently tracked by this mod |

Diagnostics submit the current draft for temporary server-side evaluation without first replacing the active configuration file.

Rule filters change list presentation without saving the document. Escape or an outside click cancels an open dropdown without activating background controls. Narrow panels wrap controls onto the next line.

## Composition and diagnostics in 0.1.5

On Forge 1.20.1, the inspector has World, Spawn, Gear, Squad and Advanced tabs. Open **World → Locations and guard squad → Edit** for location filters. The Squad tab also lets you browse the left catalog, use **Add to squad**, and edit member counts and equipment. Browsing keeps the current squad rule selected.

On Fabric/NeoForge, scroll down the inspector to **Locations and guard squad → Edit**. See [structure guards](#dochi-spawn-control/spawn-control-guards) for the two detail tabs. Apply updates the rule draft; Save in the main editor applies it to the server.

Advanced Diagnostics opens a centered detail window. Read long results with the wheel or scrollbar. With a squad enabled, the confirmed spawn test creates the entire squad. Forge labels that action **Spawn Squad**.

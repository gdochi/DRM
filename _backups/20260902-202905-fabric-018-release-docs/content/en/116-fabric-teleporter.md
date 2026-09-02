---
title: Teleporter
slug: teleporter
order: 82
description: Create destination sets, bind them to NPCs, and configure the player Teleporter runtime.
product: core-fabric
category: Core Systems
section: teleporter
status: Stable
version: 0.1.7
audience: Creators / Operators
tags:
  - teleporter
  - npc
  - gui
---

## Overview

The Teleporter editor creates file-based `teleporter_set` documents under `config/dochi_rpg_maker/teleporters`. A set contains categories, destinations, access conditions, locked-state presentation, media, transition timing, and sound settings.

The protected starter files are:

- `teleporters/default_teleporter_set.json`
- `gui/default_teleporter_gui.json`

Use `Save As` to create production files instead of changing protected defaults.

## Open And Save

1. Right-click air with `dochi_rpg_maker:dialogue_editor`.
2. Choose `Teleporter` in the shared editor selector.
3. Choose `Load Existing`, `Use Default`, or `Create New`.
4. Edit the set, then use `Save As` with a non-default name such as `town_network.json`.

The top bar provides `Editors`, `Create New`, `Load`, `Save`, `Save As`, and `Reset`. The main sections are `Categories`, `Interaction`, `Destinations`, and `Presentation`. Category and destination lists are searchable.

## Categories And Destinations

One schemaVersion 2 set supports up to 256 categories and 1,024 destinations.

| Area | Important Fields |
| --- | --- |
| Set | `setId`, `displayName`, `gui` |
| Category | `id`, `name`, `iconMedia` |
| Destination | `id`, `enabled`, `categoryId`, `name`, `description`, `descriptionStyles`, `iconMedia` |
| Target | `x`, `y`, `z`, `yaw`, `pitch` |
| Access | `accessConditions`, optional locked presentation and transition overrides |

Targets are coordinates and rotation in the player's current dimension. DRM Core 0.1.7 does not provide a destination dimension field, so this system is not a cross-dimension teleporter.

Category and destination media can use an image or item. Image media supports fit and crop settings; item media stores an item ID, count, and display size.

## Conditions, Locked State, And Transitions

`interactionConditions` gates opening the whole set. Each destination also has `accessConditions`. Both use DRM's shared condition model and are checked by the server.

The set-level locked presentation supports `visible`, `dimmed`, `hidden`, `unknown`, and `custom`. A destination can inherit the set value or override it. Presentation controls whether unavailable destinations remain visible and how they appear; it does not bypass the server condition check.

Transitions can set `fadeOutTicks`, `fadeInTicks`, and optional departure/arrival sounds. Sound entries use a registry ID plus volume and pitch. The editor includes a searchable sound picker and preview.

## Bind A Set To An NPC

1. Save the Teleporter Set.
2. Right-click the target CustomNPCs NPC with the core item.
3. In NPC Apply, use the `FUNCTION` search field to find `Teleporter`.
4. Select the set in the JSON list and choose `Apply Teleporter`.
5. Right-click the NPC without the core item to open the player runtime.

The function search covers localized action names, target IDs, server JSON kinds, editor IDs, and binding groups. Switching functions no longer renders the redundant transient loading label at the lower-left; actual apply/load feedback still appears when work is in progress.

Use `Remove Teleporter` in the same target to clear the binding.

## Open From Dialogue

The `go_teleporter` action opens a Teleporter from a dialogue choice.

```json
{
  "type": "go_teleporter",
  "teleporter": "bound"
}
```

Use `bound` or a blank value for the set applied to the current NPC. To open a file directly, put a normalized path such as `town_network.json` in `teleporter` or `value`.

## Player Runtime And GUI

The default Teleporter GUI uses an 800 × 450 stage. GUI Maker registers these Teleporter components:

- `teleporter_search_bar`
- `teleporter_category_list`
- `teleporter_destination_list`
- `teleporter_destination_name`
- `teleporter_destination_description`
- `teleporter_destination_icon`
- `teleporter_action_button`
- `teleporter_close_button`

Generic `image` components can also be used in a `teleporter` layout. The 0.1.7 player runtime does not apply the vanilla blur that previously covered the screen, so search, destination selection, travel, and close controls remain usable.

## Server Validation

The server resolves the NPC binding or explicit path, evaluates interaction conditions, and sends a filtered destination snapshot. A travel request is accepted only while its session is valid and the player is still in the expected dimension and range of the bound NPC. The server then rechecks destination access before applying the transition and teleport.

:::warning Current-dimension targets
Changing only the coordinates does not move a player to another dimension. Build separate travel logic if the destination must cross dimensions.
:::


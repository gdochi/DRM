---
title: NPC Spawner
slug: npc-spawner
order: 84
description: Configure weighted CustomNPC sources, spawn rules, conditions, effects, and block appearance.
product: core-fabric
category: Core Systems
section: npc-spawner
status: Stable
version: 0.1.7
audience: Creators / Operators
tags:
  - npc
  - spawner
  - world
---

## Overview

`dochi_rpg_maker:npc_spawner` is a server-authoritative block that chooses from a weighted pool of full CustomNPC sources. Its settings, pool, and active leases live in the world block entity. Reusable source templates and owned Soul Stone snapshots live under the Core config root.

DRM Core can register the block and open its editor without CustomNPCs because CustomNPCs is a suggested loader dependency. CustomNPCs is still required for Filled Soul Stone discovery, valid CustomNPC source materialization, and actual NPC spawning.

## Open The Editor

1. Obtain and place the block.

```text
/give @s dochi_rpg_maker:npc_spawner
```

2. Hold `dochi_rpg_maker:dialogue_editor` and right-click the placed block.
3. Keep edit permission and stay within eight blocks of the target.

Empty-hand interaction passes through. The server rejects edits for a missing/wrong block, insufficient permission, or a target farther than eight blocks.

The top bar provides `Editors`, `Load`, `Save`, `Reset`, and `Close`. `Create New` and `Save As` are disabled because the editor modifies the selected world block. `Load` opens a searchable template-library flyout; `Reset` restores the current server draft.

## Source Tab

The Source tab has a searchable/classified available-source list and an assigned weighted pool.

| Control | Rule |
| --- | --- |
| Pool size | Maximum 64 sources |
| Weight | 1 through 10,000; default 100 |
| Add / Remove | Changes future weighted selection |
| Clear All | Guarded full-pool removal |
| Apply Weight | Writes the selected source's new weight |

Each spawn attempt normalizes the current weights and selects one source. `Max Active` is not per source; it applies to the entire pool.

### Template Library

New templates use this path and format:

```text
config/dochi_rpg_maker/npc_spawner/entity_clones/<classification>/<name>.json
format: dochi_rpg_maker_npc_spawner_template
```

Source IDs have two parts, for example `npc/test_guard`. A template preserves the full entity NBT payload plus metadata such as classification, entity type, required mods, subject, party size, and level. The library accepts up to 512 templates and 2,000,000 characters per template.

The legacy `config/dochi_rpg_maker/cobblemon/entity_clones` root and `cobble_npc_entity_clone` format remain readable for migration.

### Filled Soul Stones

With CustomNPCs installed, compatible Filled Soul Stones in the player's inventory appear in the available Source list as `soulstone/<slot>`. Adding one creates an atomic server snapshot under:

```text
config/dochi_rpg_maker/npc_spawner/spawner_snapshots
```

Owned snapshots are cleaned when their assigned source is removed or cleared where appropriate. The top-bar `Load` flyout lists library templates only; inventory Soul Stones appear in the Source tab.

## Spawn Tab

The current settings record is ConfigVersion 4.

| Setting | Values / Range |
| --- | --- |
| Spawn mode | `continuous`, `target_nearby`, `target_enter`, `redstone_pulse` |
| Redstone gate | `ignore`, `powered`, `unpowered` |
| Cooldown | 20–72,000 ticks; default 200 |
| Max active | 1–32 across the full pool |
| Wave size | 1–32 spawn attempts |
| Target radius | 1–64 blocks |
| Position offsets | -32 through 32 |
| Spawn radius | 0–32 blocks |
| Other switches | `enabled`, `requireTarget`, `removeWhenInactive` |

The server applies the selected mode, redstone gate, target requirements, cooldown, active limit, wave size, and position rules before materializing a source.

## Conditions Tab

The target condition group supports Disabled, AND, and OR modes with up to 32 shared DRM conditions. Disabled mode preserves the stored condition mode. Rows support add, duplicate, remove, up/down movement, drag reordering, edge auto-scroll, and insertion guidance.

## Effects Tab

| Area | Options |
| --- | --- |
| Spawner model | `visible` plus Default, Item, or Block appearance |
| Scale | 0.05 through 16 |
| Billboard | `fixed`, `vertical`, `horizontal`, `center` |
| Item transform | `none`, first/third-person hands, `head`, `gui`, `ground`, `fixed` |
| Particles | cloud, poof, smoke, large smoke, happy villager, enchant, portal, reverse portal, end rod, flame |

The item/block and particle selectors are searchable. The server validates appearance data and manages the display entity. An invalid custom appearance leaves the default spawner model instead of trusting malformed client data.

## Save, Removal, And Migration

- `Save` writes the draft to the selected block entity after server validation.
- Removing or reweighting a source affects future choices. It does not remove unrelated NPCs that are already active.
- ConfigVersion 1–3 settings, the legacy singular Source field, and legacy classification IDs are migrated into the current weighted-pool model.
- Copy the world save as well as `config/dochi_rpg_maker/npc_spawner` when moving production spawners.

:::warning Full entity payloads
Spawner templates preserve opaque CustomNPC entity tags as an atomic payload. Use the editor or a trusted export path; partial hand edits can invalidate the source.
:::


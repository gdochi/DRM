---
title: NPC clone templates
slug: npc-core-templates
order: 1530
description: Create v3 templates with equipment and understand legacy files.
product: dochi-npc-core
category: NPC clone templates
section: operations
status: Guide
version: 0.1.2
audience: Creators / server operators
---

## 0.1.2 clone versus apply

New clones, including those created from older templates, discard source block cargo, riding sessions/timeouts, spawner runtime markers and combat progress. Applying to an existing NPC preserves that target's real cargo and runtime ownership. Authored equipment, inventory, appearance and integration settings are distinct from active cargo.

## Save an NPC for reuse

Temporary Ctrl+C copies and file templates serve different purposes. **0.1.1 v3 clone templates** preserve authored NPC data, current equipment, inventory, loadouts and supported addon bindings.

1. Open the NPC with NPC Core.
2. Edit appearance, equipment and behavior, then **save to the NPC**.
3. Choose **Save as clone template** and use a new name.
4. Manage files under server `config/dochi_npc_core/templates/`.
5. Select the template in [Spawn Control](#dochi-spawn-control/spawn-control-npc-templates).

DNPC template storage works without DRM. Spawn Control integration needs both DRM's public template API and the DNPC provider. DRM 0.2.9 / DNPC 0.1.1 / Spawn Control 0.1.4 is the checked combination, not a newly inferred minimum.

## What is copied?

| Preserved | Starts fresh |
| --- | --- |
| Appearance, behavior and authored destinations | UUID and actual spawn position |
| Equipment, inventory, loadouts and item data | Transient damage, death, navigation and work state |
| Supported authored addon bindings | Prior spawner membership, employment owner and bed occupancy |

The initial SPAWN equipment pool does not reroll the copied equipment. Authored later day/combat/interval changes still run. A clone does not resume the source NPC's entire live session.

Loading into an existing NPC preserves that target's UUID, location and current spawner membership. Distinguish loading into a target from creating a new entity.

## Older templates

Settings-only and v2 files remain readable through the existing load workflow. Without an exact snapshot they are excluded from Spawn Control's clone list. Load one onto an NPC, **save to the NPC**, then **save as clone template** using a new name. Existing files are not automatically overwritten. Older DNPC versions do not gain v3 reading support.

Missing files or providers fail that clone request; they do not spawn a blank replacement NPC. Prepared snapshots are fixed. Reload through the consuming editor/server workflow after changing the source file.

---
title: Core Concepts
slug: core-concepts
order: 50
description: Core terms for DRM editors, runtime behavior, server JSON, and NPC binding.
product: core-fabric
category: Core Systems
section: getting-started
status: Stable
version: 0.1.7
audience: Creators
tags:
  - concepts
  - glossary
---

## Glossary

| Term | Meaning |
| --- | --- |
| Editor Descriptor | Definition shown in the editor selector: ID, title, sort order, and target requirements. |
| Source Choice | Initial Load Existing, Use Default, or Create New decision. |
| Server JSON Domain | A server-known JSON kind such as `dialogue_set`, `gui`, or `npc_shop`. |
| Layout Profile | Defines storage, default ID, and default file for a GUI type such as `dialogue` or `npc_shop`. |
| Dialogue Document | Root JSON for a dialogue set: nodes, choices, conditions, actions, and GUI reference. |
| Shop Document | NPC shop JSON: trade mode, products, sale offers, currency, and shop GUI reference. |
| Teleporter Set | Server JSON containing categories, destinations, access conditions, presentation, and transitions. |
| Spawner Source Pool | A placed NPC Spawner's weighted list of template or Soul Stone snapshot sources. |
| Currency Definition | JSON for one currency: item icon, pickup conversion, HUD visibility, and death-loss rules. |
| NPC Binding | Either embedded JSON on an NPC or a `source.kind` plus `source.path` reference to server JSON. |
| Apply Manager | Target-aware screen that applies or removes registered functions such as dialogue, shop, and Teleporter bindings. |
| Protected Default | Bundled sample/default data that should be cloned with `Save As` instead of edited in place. |

## Editor vs Runtime

Editors create and save JSON or server-authorized block data. Runtime code reads it when a player interacts with an NPC or spawner and performs dialogue, shop, Teleporter, spawn, HUD, command, item, and currency behavior.

| Stage | Location | Example |
| --- | --- | --- |
| Authoring | Client screen plus server save | Edit a dialogue node and save server JSON. |
| Binding | Server NPC PersistentData | Store `source.kind`, `source.path`, or embedded JSON on an NPC. |
| Runtime | Server logic plus client screen | Filter choices by conditions and open the dialogue screen. |
| Result | Server state | Run commands, give items, change tags, update currency. |
| Block state | Server block entity | Save NPC Spawner sources, rules, conditions, appearance, and active leases. |

## Connection Model

DRM content is normally a chain of linked data. A dialogue choice can open a shop, the shop references a GUI, and the GUI references components and resources.

```text
CustomNPCs NPC
  -> DialogueStorage / NpcShopStorage / Teleporter binding
      -> ServerJsonStorage(kind, path)
          -> Dialogue / Shop / Teleporter / GUI / Currency JSON
              -> Runtime screen
                  -> Condition checks
                  -> Action execution

NPC Spawner block
  -> World block-entity settings and weighted pool
      -> Config template or owned Soul Stone snapshot
          -> Server-side CustomNPC materialization and lease tracking
```

## File-Based vs Embedded NPC Data

| Method | Benefit | Watch Out For |
| --- | --- | --- |
| Server JSON reference | Multiple NPCs can share one file and reload changes. | Keep filenames and IDs stable. |
| Embedded NPC JSON | Simple for one-off NPCs. | Harder to manage as files because data lives inside world/NPC data. |

If a shop has finite stock, runtime updates are saved back to the source file when possible. Embedded shops update the NPC-stored shop data.

## Defaults And Settings

`settings/defaults.json` stores default dialogue GUI, default shop GUI, and default currency settings. Empty GUI references in dialogue or shop documents are filled from these defaults.

`settings/reload_policy.json` controls server JSON cache behavior and reload commands.

| Setting | Default | Meaning |
| --- | --- | --- |
| `reloadOnTrigger` | `true` | Reload fresh JSON when it is used instead of relying on cache. |
| `manualReloadCommand` | `true` | Allows `/drm reload` and `/drm currency reload`. |

:::tip Debugging Tip
When something breaks, first ask which JSON is connected through which path. Most issues are stale or mismatched links rather than malformed screens.
:::

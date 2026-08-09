---
title: Entity Clone Library
slug: warfare-entity-clones
order: 380
description: Save and summon sanitized server-side templates for CustomNPCs NPCs and supported SuperbWarfare vehicles.
product: dochi-warfare
category: World Tools
section: tools
status: Draft
version: 0.2.4
audience: Scenario creators
tags:
  - clone
  - npc
  - vehicle
---

## What a clone is

The Entity Clone Library stores server-owned JSON templates for two domains:

* CustomNPCs NPCs with their current DW settings
* Supported SuperbWarfare vehicles with native data and reusable DW combat settings

This is different from `Save As` in the NPC or vehicle editor. A setup profile copies configuration into an existing target; an entity clone creates a sanitized new entity.

## Save a template

1. Enter Creative mode.
2. Open a CustomNPCs NPC or supported SuperbWarfare vehicle with `DW Npc Core`.
3. Press `Clone` in the editor topbar.
4. Enter a name and confirm. Saving the same name requires a second overwrite confirmation.

The server reads and sanitizes the entity data. Raw entity NBT is never accepted from the client.

## Open and summon

Right-click air with `DW Npc Core` to open `Entity Clone Library`. Search the combined library, filter by `NPC` or `Vehicle`, select a template, then press `Summon`.

The server validates Creative permission, the template, and required mods, then searches for a safe loaded position in front of the player. If the dependency is missing or no safe loaded space exists, the summon is rejected without creating a partial entity.

## What is sanitized

Clones preserve reusable appearance, equipment, native entity data, and DW combat configuration, but remove live-world identity and transient state such as:

* UUID, position, motion, rotation, passengers, leash, and owner identity
* Current brain, anger, fire, air, fall, and other live runtime fields
* Active mercenary owner and movement/hold-fire commands
* Vehicle AI owner, home, ordered destination, and live patrol position state

This prevents a clone from inheriting the original entity's identity, ownership, or current world task.

## Storage

Templates are stored under separate server folders:

```text
config/dochi_warfare/entity_clones/npc/
config/dochi_warfare/entity_clones/vehicle/
```

Treat these files as server content. Use the in-game `Clone` and `Summon` workflow for ordinary authoring so server validation and sanitization remain in effect.

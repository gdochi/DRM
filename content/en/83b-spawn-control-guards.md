---
title: Place a guard squad in each structure
slug: spawn-control-guards
order: 841
description: Set biome and structure filters, squad members, equipment and per-structure respawn delays.
product: dochi-spawn-control
category: Rules
section: rules
status: Guide
version: 0.1.5
audience: Server operators and map creators
---

In 0.1.5, one natural-spawn rule can compose several targets and counts inside existing structures. This applies to Forge 1.20.1, Fabric/NeoForge 1.21.1 and 26.3. Ordinary mobs need neither DRM nor an NPC mod. Saved DNPC templates need DRM and DNPC; CustomNPCs is unavailable on 26.3.

## 1. Open location settings

Press **K**, choose a target and use **Add Rule**. On Forge, open **World → Locations and guard squad → Edit**. On Fabric/NeoForge, scroll down the inspector to **Locations and guard squad → Edit**.

This is a creator tool with **Locations** and **Squad and equipment** tabs. **Apply** updates the rule draft; then **Save** in the main editor applies it to the server. Cancel or Escape discards changes in this detail window.

## 2. Choose biomes and structures

Use 🔍 under Locations to search the server's registered biomes and structures, including mod and datapack entries.

| Selection | Example and meaning |
| --- | --- |
| Included biomes | Match any selected ID/tag, such as `minecraft:plains` |
| Excluded biomes | Reject even when an included selector matches |
| Included structures | An existing instance of, for example, `minecraft:pillager_outpost` |
| Excluded structures | Reject positions within these structure bounds |
| Tags | Select a registered group using `#namespace:tag` |

Empty inclusion lists do not restrict that category; exclusions take priority. Structures use their full registered bounds. This does not recognize hand-built castles or generate structures. Candidate chunks and structure-start information must already be loaded; the rule does not force-load chunks.

![Location filters and per-structure occupancy controls.](assets/media/guides/spawn-control-015-fabric263/guard-locations-en.png "Spawn Control 0.1.5 / Fabric 26.3 / DRM 0.3.1. Actual English settings screen. Included structures is Any in this capture, so no structure limit is active yet.")

## 3. Compose the whole squad

In Squad and equipment, enable **Use squad** and use **Add** to choose members. For example, set **Member count** to 2 for a zombie row and 1 for a skeleton row: three entities in total. For a saved NPC, choose its exact clone template instead of the default EntityType.

The total is at most 64. **Member spread** is 1–32 blocks, default 5. Enabled squads use member counts instead of Minimum/Maximum Group. One probability roll prepares the entire composition; every member must pass position, collision, conditions and population caps before insertion together. Insufficient room or caps fails that attempt rather than filling only part of the group.

This is a natural-spawn feature. A placed spawner still draws individual targets from its probability list. Configure patrol, faction and combat AI in the owning mob or NPC mod.

## 4. Set member equipment

Select a member, then use 🔍 for its head, chest, legs, feet and hand slots. The picker offers all items and **Player inv** without consuming inventory items.

**Keep** preserves original or template equipment. Choosing an item sets that slot. **Clear** empties it; switching Clear off restores the chosen item or Keep when no item is selected. With no member rows, the right side edits base-target equipment.

![Member equipment slots and separate Clear switches.](assets/media/guides/spawn-control-015-fabric263/guard-members-en.png "Spawn Control 0.1.5 / Fabric 26.3 / DRM 0.3.1. Settings screen with one member and Clear on for its head slot. This is not a combat or completed equipment-application scene.")

## 5. Prevent duplicate groups at one structure

**One group per structure instance** defaults on and requires an included structure. Players share the same site identified by dimension, rule, structure type and start chunk. Several arrivals do not create duplicate groups for this rule. Different rules have independent occupancy.

**Respawn delay** starts after the last owned member is removed; default 1200 ticks. Losing only some members does not immediately refill the squad. Chunk unloading, dimension changes and luring guards away do not free the site. Occupancy and delays persist in world saved data. With no included structures, neither this limit nor its delay applies.

## 6. Save and test

Apply, enable the rule and save. Initially try spawn chance 1 and an interval around 200 ticks, with enough population capacity and room for the entire squad. Dimension, time, light and player-distance conditions still apply. The default minimum distance of 24 blocks can make a check at the player's feet fail the distance condition.

Use **Advanced Diagnostics** to inspect failures. A confirmed spawn test creates real entities, including the whole enabled squad; Forge labels this **Spawn Squad**. Check structure bounds, loaded state, space for every member and caps before tuning production values. See [conditions and population caps](#dochi-spawn-control/dochi-spawn-control-rules).

## 7. Move to another server

Natural-spawn schema is 4; existing schemas 2 and 3 remain readable. Avoid resaving new presets in older Spawn Control versions. Supply mods registering targets and items, plus original DNPC templates. Advanced 1.20.1 item NBT and later component data are not automatically converted between versions.

Back up the world with the JSON files to retain structure occupancy and respawn delays. See [presets and operations](#dochi-spawn-control/dochi-spawn-control-presets-operations) for paths and save scopes.

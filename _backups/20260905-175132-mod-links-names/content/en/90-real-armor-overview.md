---
title: Dochi Real Armor Overview
slug: dochi-real-armor-overview
order: 900
description: Purpose, supported NPC mods, armor pipeline, and compatibility boundaries for version 0.1.1.
product: dochi-real-armor
category: Overview
section: overview
status: Stable
version: 0.1.1
audience: Players, server operators, and modpack creators
tags:
  - armor
  - customnpcs
  - easy npc
---

## What the mod does

**Dochi Real Armor** is a Forge 1.20.1 compatibility mod that makes equipped armor participate in vanilla-style damage reduction for supported NPC entities. Its mod ID and command root are `dochi_real_armor`.

The mod supports two optional NPC integrations:

| NPC mod | Detection | Independent switch |
| --- | --- | --- |
| CustomNPCs | Entity registry namespace `customnpcs` | `enableCustomNpcs` |
| Easy NPC | Entity registry namespace `easy_npc` | `enableEasyNpc` |

Neither NPC mod is a hard dependency. Install at least one supported NPC mod to use the armor feature.

## Processing model

Armor is calculated once at Minecraft's armor-absorption stage. Debug messages only report the finished result; turning debug off does not disable armor.

The calculation can use the NPC's armor attributes, scan equipped armor item modifiers, or choose automatically. Armor toughness, Protection enchantments, knockback resistance, and item durability can be controlled separately.

:::note Damage boundaries
Damage tagged as bypassing armor remains unarmored. A weapon or mod that skips Minecraft's normal living-entity armor pipeline may need a dedicated adapter.
:::

## Optional body-part mode

When body-part armor is enabled, the hit position selects equipment slots instead of using every armor piece:

| Hit region | Armor slots |
| --- | --- |
| Head | Helmet |
| Chest | Chestplate |
| Legs | Leggings and boots |
| Unknown | All armor slots |

Easy NPC projectile hits are resolved by tracing the projectile path through the entity box. This improves lower-body classification for fast or externally managed shots, including TACZ-style projectiles.

## Related integration

Dochi RPG Maker 0.1.4 or later is optional. When present, Dochi Real Armor registers a tab in DRM's Mods Config screen. Without DRM, the Forge Mods list opens a matching standalone configuration screen.

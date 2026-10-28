---
title: Dochi's Real Armor Overview
slug: dochi-real-armor-overview
order: 900
description: Purpose, supported NPC mods, armor pipeline, and compatibility boundaries for the current Forge and NeoForge builds.
product: dochi-real-armor
category: Overview
section: overview
status: Stable
version: 0.1.4
audience: Players, server operators, and modpack creators
tags:
  - armor
  - customnpcs
  - easy npc
---

## What the mod does

**Dochi's Real Armor 0.1.4** connects supported NPC equipment, toughness, enchantments and durability to damage calculation. Builds target Forge 1.20.1, Fabric / NeoForge 1.21.1 and separate Fabric / NeoForge 26.3. Mod ID and command root remain `dochi_real_armor`.

| NPC provider | Older targets | 26.3 |
| --- | --- | --- |
| CustomNPCs | Optional | Permanently excluded |
| Easy NPC | Optional | Optional |
| Dochi NPC Core | Optional | Optional |

DRM and NPC providers are optional. Install a supported provider to use NPC armor behavior. DNPC supports whole/body-part armor, durability, Protection and knockback without CNPC-specific resistance ordering or companion rules.

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

On Forge, Dochi RPG Maker 0.1.4 or later is optional. When present, Dochi's Real Armor registers a tab in DRM's Mods Config screen. Without DRM, the Forge Mods list opens a matching standalone configuration screen.

## 0.1.4 and DNPC

Forge, Fabric and NeoForge now use 0.1.4. In addition to CustomNPCs and Easy NPC, DNPC supports whole-body / body-part armor, durability, protection enchantments and knockback. Hit regions use the server AABB; CustomNPCs-specific resistance / companion rules do not apply to DNPC. Standalone configuration remains available without DRM.

0.1.4 includes version/package alignment across five targets; that update did not repeat every gameplay test. See [26.3 installation](#core-fabric/minecraft-26-3).

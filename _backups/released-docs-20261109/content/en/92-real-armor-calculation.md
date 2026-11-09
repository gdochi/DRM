---
title: Armor and Hit-Region Calculation
slug: dochi-real-armor-calculation
order: 920
description: Armor sources, hit-region thresholds, resistance order, enchantments, knockback, and durability.
product: dochi-real-armor
category: Armor Calculation
section: calculation
status: Stable
version: 0.1.4
audience: Server operators and modpack creators
tags:
  - damage
  - body parts
  - toughness
---

## Choose Which Armor Effects Apply

![General Armor in Real Armor 0.1.4 on NeoForge 1.21.1, with separate toughness, Protection and knockback-resistance switches.](assets/media/guides/armor-014-neo1211/armor-config.png "Armor toughness, Protection enchantments and Armor knockback resistance control separate effects. Damage reduction and knockback are not one setting.")

Enable **Body-part armor** to make gaps such as an unhelmeted head matter. Disable it for equipment to protect together. Disable **Damage armor items** for armor that does not wear down while keeping armor calculation enabled.

## File Reference: Armor Stat Source

The following values are for direct configuration-file editing. The basic settings screen does not require entering all of them.

The `armorStatSource` setting controls how armor, toughness, and knockback resistance are read.

| Value | Behavior |
| --- | --- |
| `AUTO` | Prefer usable entity attributes and fall back to equipped-item modifiers when they provide the missing or larger armor value |
| `VANILLA_ATTRIBUTE` | Read the living entity's armor attributes only |
| `INVENTORY_SCAN` | Sum modifiers from helmet, chestplate, leggings, and boots |

`AUTO` is the recommended default because NPC mods do not always expose equipment through vanilla attributes in the same way.

## Hit-region thresholds

For Easy NPC, the resolved impact height is normalized against the entity bounding box.

| Normalized height | Region | Used slots |
| --- | --- | --- |
| `0.75` or higher | Head | Helmet |
| `0.375` to below `0.75` | Chest | Chestplate |
| Below `0.375` | Legs | Leggings and boots |

CustomNPCs uses its dedicated resolver and model data when available. If no reliable hit point exists, the region is `unknown` and all armor slots are used so ordinary damage does not silently lose armor protection.

## Resistance, enchantments, and durability

CustomNPCs resistance order can be set to `CNPC_RESISTANCE_THEN_VANILLA_ARMOR` or `VANILLA_ARMOR_THEN_CNPC_RESISTANCE`. This option affects CustomNPCs processing; Easy NPC uses the normal living-entity path.

Protection enchantments are applied only when their switch is ON. Armor-bypassing damage ignores armor. Durability loss is also optional and applies to the slots that participated in the reduction, so a head hit in split mode does not damage leggings.

Knockback resistance compares the resolved armor value with the entity's vanilla attribute and only supplies the missing amount. It does not double the resistance already present on the entity.

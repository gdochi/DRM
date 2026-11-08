---
title: Make NPC Armor Matter
slug: dochi-real-armor-overview
order: 900
description: Make equipped armor reduce NPC damage and choose body-part and durability settings.
product: dochi-real-armor
category: Overview
section: overview
status: Stable
version: 0.1.5
audience: Players, server operators, and modpack creators
tags:
  - armor
  - customnpcs
  - easy npc
---

## Make armored NPCs tougher

Real Armor uses equipped armor, toughness and protection enchantments to reduce NPC damage. You can also enable durability loss or use only the armor covering the hit region.

It supports DNPC, Easy NPC and CustomNPCs. DRM is optional. CustomNPCs is unavailable on 26.3.

In 0.1.5, configure item drops in the GUI for armor that actually loses durability. See [item drop setup and video](#dochi-real-armor/dochi-real-armor-drops) for per-armor chances, quantities, saving and applying sets.

## Get started

1. Enable your NPC integration in [setup](#dochi-real-armor/dochi-real-armor-setup).
2. Equip the NPC with armor.
3. Compare damage from the same attack before and after equipping it.
4. Choose body-part armor and durability settings.

![A DNPC wearing a full iron armor set, with iron items in Head, Chest, Legs and Feet and the equipped model in the preview.](assets/media/guides/armor-014-neo1211/armor-equipped.png "Example with Real Armor 0.1.4 + DNPC 0.1.3 / NeoForge 1.21.1. Put armor in the equipment slots on the right rather than merely storing it in NPC storage.")

In this setup, a base-damage `10` hit removed `10` health without armor and `6` with the unenchanted iron set. This is a whole-body example; hit-region mode, weapons and enchantments can change the result. If a DNPC takes no damage at all, also check **Combat AI → Invulnerable** and **Allow player damage**.

## Whole-body or body-part armor

| Setting | Armor used |
| --- | --- |
| Whole-body | Equipped armor together |
| Body-part | Helmet for head, chestplate for chest, leggings/boots for legs |

Body-part armor lets equipment gaps matter, such as an unprotected head. Attacks without a recognizable hit region use all equipped slots.

Armor-bypassing damage is not reduced by armor. See [calculation settings](#dochi-real-armor/dochi-real-armor-calculation).

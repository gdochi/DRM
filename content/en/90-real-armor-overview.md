---
title: Make NPC Armor Matter
slug: dochi-real-armor-overview
order: 900
description: Make equipped armor reduce NPC damage and choose body-part and durability settings.
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

## Make armored NPCs tougher

Real Armor uses equipped armor, toughness and protection enchantments to reduce NPC damage. You can also enable durability loss or use only the armor covering the hit region.

It supports DNPC, Easy NPC and CustomNPCs. DRM is optional. CustomNPCs is unavailable on 26.3.

## Get started

1. Enable your NPC integration in [setup](#dochi-real-armor/dochi-real-armor-setup).
2. Equip the NPC with armor.
3. Compare damage from the same attack before and after equipping it.
4. Choose body-part armor and durability settings.

## Whole-body or body-part armor

| Setting | Armor used |
| --- | --- |
| Whole-body | Equipped armor together |
| Body-part | Helmet for head, chestplate for chest, leggings/boots for legs |

Body-part armor lets equipment gaps matter, such as an unprotected head. Attacks without a recognizable hit region use all equipped slots.

Armor-bypassing damage is not reduced by armor. See [calculation settings](#dochi-real-armor/dochi-real-armor-calculation).

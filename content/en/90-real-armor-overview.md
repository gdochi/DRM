---
title: Make NPC and Mob Armor Matter
slug: dochi-real-armor-overview
order: 900
description: Configure armor protection and durability for equipped NPCs, mobs and version-supported animals.
product: dochi-real-armor
category: Overview
section: overview
status: Preview
version: 0.1.7
audience: Players, server operators, and modpack creators
tags:
  - armor
  - customnpcs
  - easy npc
---

## Targets in 0.1.7

Ordinary and modded entities, including zombies, skeletons and piglins, use Real Armor when real armor is equipped in their equipment slots. No NPC mod is needed; each NPC integration switch still takes priority for that NPC. Player handling stays unchanged. Held armor, pumpkins and decorations alone do not activate this support. Ordinary mobs return to their original damage handling after their last armor item is removed or breaks.

0.1.7 also implements animal armor for each supported Minecraft version. All five loader builds and package checks are complete; actual combat verification of the new animal feature is pending. The earlier recordings below do not verify this feature.

## Supported entities by version in 0.1.7

| Minecraft | Loader | Mobs wearing ordinary armor | Animal armor targets | NPC integrations |
| --- | --- | --- | --- | --- |
| 1.20.1 | Forge | Zombies, skeletons, piglins and other mobs actually wearing armor | Horse | DNPC / Easy NPC / CustomNPCs |
| 1.21.1 | Fabric | Zombies, skeletons, piglins and other mobs actually wearing armor | Horse, wolf | DNPC / Easy NPC / CustomNPCs |
| 1.21.1 | NeoForge | Zombies, skeletons, piglins and other mobs actually wearing armor | Horse, wolf | DNPC / Easy NPC / CustomNPCs |
| 26.3 | Fabric | Zombies, skeletons, piglins and other mobs actually wearing armor | Horse, zombie horse, wolf, nautilus, zombie nautilus | DNPC / Easy NPC |
| 26.3 | NeoForge | Zombies, skeletons, piglins and other mobs actually wearing armor | Horse, zombie horse, wolf, nautilus, zombie nautilus | DNPC / Easy NPC |

Support is determined by equipped items, not a fixed whitelist of mob names. Ordinary mobs must wear real armor in head, chest, legs or feet equipment slots. Examples include zombie variants (husks, drowned and zombie villagers), skeleton variants (strays and wither skeletons), and piglins. Other vanilla and modded entities meeting the same condition are included. Ordinary mob support applies to every row. Players retain their existing handling; NPCs follow their integration switches.

## Updating to 0.1.6
These are the 0.1.6 changes. It improves setting switches, focus after server replies and conflicting-save handling. Saving a drop set does not activate it: complete **Save → Apply confirmation**. The earlier 0.1.4 and 0.1.5 recordings below retain their capture versions in captions.

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

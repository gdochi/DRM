---
title: Set Up NPC Armor
slug: dochi-real-armor-setup
order: 910
description: Open settings and choose NPC integrations, body-part armor and durability.
product: dochi-real-armor
category: Install and Configure
section: setup
status: Stable
version: 0.1.4
audience: Players and server operators
tags:
  - installation
  - configuration
  - forge
---

## Install

Put matching Minecraft/loader Real Armor 0.1.4 files on the server and clients.

| Minecraft | Loader | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Fabric also needs Fabric API. Use DNPC, Easy NPC or CustomNPCs on older targets. DRM is optional.

## Open settings

- **Forge / NeoForge:** choose Real Armor's **Config** in the mod list.
- **Fabric:** open its **Config** in Mod Menu.
- **With DRM:** use **Mods Config → Real Armor**.

Changing multiplayer settings needs permission level 2.

These are the standalone settings from **Real Armor 0.1.4 / NeoForge 1.21.1**. Use **General Armor** for armor behavior and **NPC Compatibility** for your NPC integration.

![General Armor with calculation, body-part armor, durability, toughness, Protection and knockback-resistance switches.](assets/media/guides/armor-014-neo1211/armor-config.png "Enable armor calculation controls the whole feature. Body-part armor selects equipment by hit region; Damage armor items enables durability loss.")

![NPC Compatibility with Dochi NPC Core, Easy NPC, CustomNPCs and debug settings.](assets/media/guides/armor-014-neo1211/armor-compatibility.png "Check Dochi NPC Core when using DNPC. This capture is 1.21.1; CustomNPCs is unavailable on 26.3.")

DRM's shared settings show the same options in two columns.

![Dochi Real Armor selected in DRM's shared settings, with armor rules on the left and integrations on the right.](assets/media/guides/armor-014-neo1211/shared-armor.png "Select Dochi Real Armor in Mods Config. Check the main calculation switch as well as the NPC integration.")

## Choose the basics

1. Enable the NPC integration you use.
2. Start with whole-body armor and equip the NPC.
3. Enable **body-part armor** to use equipment covering the hit region.
4. Enable **durability loss** to wear armor down when hit.
5. Apply settings.

DNPC hit regions follow its basic body bounds, which may differ from a custom model's appearance.

## Check whether it is enabled

Use `/dochi_real_armor status`. Commands also autocomplete `split`, `durability` and `debug`.

For direct file management, Forge/NeoForge use `config/dochi_real_armor-common.toml`; Fabric uses `config/dochi_real_armor.json`.

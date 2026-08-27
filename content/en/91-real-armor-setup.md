---
title: Install and Configure Dochi Real Armor
slug: dochi-real-armor-setup
order: 910
description: Installation requirements, config locations, GUI access, defaults, and legacy migration.
product: dochi-real-armor
category: Install and Configure
section: setup
status: Stable
version: 0.1.1
audience: Players and server operators
tags:
  - installation
  - configuration
  - forge
---

## Requirements

- Minecraft 1.20.1
- Forge 47.x
- Java 17
- CustomNPCs or Easy NPC for the NPC entities being protected

Place `dochi_real_armor-0.1.1.jar` in the `mods` folder on both the client and server. A dedicated server needs the mod because damage calculation and config authority are server-side.

## Open the settings

From the title screen or pause menu, open **Mods**, select **Dochi Real Armor**, and press **Config**. If Dochi RPG Maker is installed, open its **Mods Config** screen and select the Dochi Real Armor tab.

The GUI uses ON/OFF switches. Multiplayer changes are sent to the server and require permission level 2. Users without permission can view the screen but cannot apply server-authoritative changes.

## Common config

Forge stores the common file here:

```text
config/dochi_real_armor-common.toml
```

If `config/cnpc_real_armor-common.toml` exists and the new file does not, version 0.1.1 copies the legacy file automatically. The old file is retained as a recovery source.

## Default settings

| Setting | Default | Purpose |
| --- | --- | --- |
| CustomNPCs support | ON | Process entities in the `customnpcs` namespace |
| Easy NPC support | ON | Process entities in the `easy_npc` namespace |
| Armor calculation | ON | Apply vanilla-style armor reduction |
| Armor toughness | ON | Include toughness in the vanilla formula |
| Protection enchantments | ON | Apply compatible Protection enchantments |
| Knockback resistance | ON | Use armor-item resistance when attributes omit it |
| Override companion armor | OFF | Replace the CustomNPCs companion path |
| Body-part armor | OFF | Limit armor to the detected hit region |
| Damage armor items | ON | Reduce durability when armor protects the NPC |
| Debug messages | OFF | Report calculations without controlling them |

Changes are saved immediately. Restart only when replacing the jar or when another mod caches behavior outside this mod's control.

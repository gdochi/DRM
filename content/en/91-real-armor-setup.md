---
title: Install and Configure Dochi's Real Armor
slug: dochi-real-armor-setup
order: 910
description: Current installation and first-use guidance.
product: dochi-real-armor
category: Install and Configure
section: setup
status: Stable
version: 0.1.3
audience: Players and server operators
tags:
  - installation
  - configuration
  - forge
---

## Installation

Real Armor **0.1.3** targets Forge 1.20.1 / Java 17 and Fabric / NeoForge 1.21.1 / Java 21. Install matching `dochi_real_armor-0.1.3-<loader>-<minecraft>.jar` builds on server and clients. Fabric also needs Fabric API.

CustomNPCs, Easy NPC, Dochi NPC Core and DRM are optional integrations. Install a supported NPC mod to use its armor calculations. DNPC supports whole-body / body-part armor, durability, protection enchantments and knockback settings.

## Configuration

| Loader | File | Open through |
| --- | --- | --- |
| Forge | `config/dochi_real_armor-common.toml` | Mods list Config |
| NeoForge | `config/dochi_real_armor-common.toml` | Mods list Config |
| Fabric | `config/dochi_real_armor.json` | Mod Menu Config |

With DRM, use the Real Armor tab in shared Mods Config. Without DRM, the standalone screen remains available. Fabric imports an existing Real Armor TOML on first initialization. Back up the original configuration and world.

## First check

1. Enable the NPC integration you use.
2. Begin with whole-body armor and equip real armor on the NPC.
3. Compare damage from the same attack with and without armor.
4. Enable body-part calculations and durability if needed, then test head / chest / leg hits.
5. Check `/dochi_real_armor status` and the server log.

Changes while connected are checked by the server and require permission level 2. The `/dochi_real_armor` root offers `status`, `split`, `durability` and `debug`; use command completion for arguments.

DNPC hit regions use the real server entity AABB rather than every visual model bone. CustomNPCs-specific resistance ordering and companion options do not apply to DNPC.

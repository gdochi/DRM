---
title: Install and Set Up the First Shot
slug: warfare-setup
order: 320
description: Install the required mods and set up an NPC to fire.
product: dochi-warfare
category: Setup
section: setup
status: Draft
version: 0.3.1
audience: Server operators
tags:
  - setup
  - TACZ
  - gui
---

## Required mods

| Item | Choose |
| --- | --- |
| Minecraft / loader | Forge 1.20.1 or NeoForge 1.21.1 |
| Java | Forge 17 / NeoForge 21 |
| DW | Matching-loader 0.3.1 |
| TACZ | 1.1.8 or newer, below 1.2 |
| Player Animator | Required on clients: Forge 1.0.0+ / NeoForge 2.0+ |
| NPC mod | DNPC or CustomNPCs |

Install matching DW and requirements on server and clients. DRM is optional.

For vehicles, add **DWE 0.3.1** and SuperbWarfare. Supported SuperbWarfare versions are **0.8.9 / 0.8.9.1 / 0.8.9.2 on Forge**, and **0.8.9.1 / 0.8.9.2 on NeoForge**.

## Give an NPC its first gun

1. Place an NPC and get **DW Npc Core** in Creative.
2. Right-click the NPC with it.
3. Enable **TACZ Fire NPC Mode** and **Enabled**.
4. Choose a supported gun under **Gun**.
5. Set **Senses → General → Stance** to **Ranged** or **Auto**.
6. Set **Fire → RPM Mode** to **TACZ Native**.
7. Enable **Ammo → Reload / Supply Ammo**. **Ammo Stock = -1** is unlimited.
8. Choose a target and **Save**.

If it does not fire, check that the NPC considers the target an enemy, is in range and has a clear line of sight. See [troubleshooting](#dochi-warfare/warfare-troubleshooting).

## Find a setting

| Tab | Settings |
| --- | --- |
| Gun / Melee | Weapons and damage |
| Senses | Detection, stance and movement |
| Fire | Range, fire rate and accuracy |
| Targets | Who to attack |
| Ammo | Reloads and ammunition |
| Armor | Armor candidates |
| Cover | Cover behavior |
| Visual & FX / Pose | Appearance, sounds and poses |

**Overview** summarizes settings. Change values in their respective tabs.

For multiple weapon/skin/armor candidates, make their chances total 100%. **Equalize** splits them evenly.

## Reuse settings

Use **Save As**, then **Load** on another NPC. Settings are in `config/dochi_warfare/target_entities/`.

To keep the NPC itself, **right-click air** with the Core and use the [clone library](#dochi-warfare/warfare-entity-clones).

## Other tools

**DW Pose Core** edits poses, **DW Mercenary Core** edits contracts, and **DW Booby Trap Core** edits traps. For vehicles, use [DWE setup](#dochi-warfare-expanded/expanded-overview).

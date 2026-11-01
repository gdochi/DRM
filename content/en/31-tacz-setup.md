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

| Item | Requirement |
| --- | --- |
| Minecraft / loader | Forge 1.20.1 or NeoForge 1.21.1 |
| Java | Forge 17 / NeoForge 21 |
| DW | Matching-loader 0.3.1 |
| TACZ | At least 1.1.8, below 1.2 |
| Player Animator | Required on clients: Forge 1.0.0+ / NeoForge 2.0+ |
| NPC mod | DNPC or CustomNPCs |

Install matching-loader DW and its requirements on server and client. DRM is optional. For vehicles, add **DWE 0.3.1** and SuperbWarfare. Supported SuperbWarfare versions are **0.8.9 / 0.8.9.1 / 0.8.9.2** on Forge and **0.8.9.1 / 0.8.9.2** on NeoForge. Include SuperbWarfare’s own dependencies, such as Kotlin for Forge.

## Choose a gun from the player inventory

These English screens use **DW 0.3.1, DNPC 0.1.3 and NeoForge 1.21.1**.

![M4A1 Carbine selected in Gun with the armed NPC preview.](assets/media/guides/warfare-031-neo1211/dw-gun.png "Choose Gun on the left, then click a firearm in the player inventory catalog. Check Stored gun and the 100% weapon entry below.")

1. Place an NPC. See [DNPC setup](#dochi-npc-core/npc-core-setup) for a first actor.
2. Put a supported firearm in the **player inventory**, then right-click the NPC with **DW Npc Core**.
3. Enable **TACZ Fire NPC Mode** at the upper right. Check the mode and Enabled state in **Overview**.
4. Under **Gun**, select the firearm icon. If the list is empty, check the player inventory for a supported gun.
5. In **Senses → Quick View → Combat Mode**, choose **Stance: Ranged** or **Auto**. Ranged uses the gun; Auto swaps between ranged and melee by distance.
6. Under **Quick View → Fire Rate**, start with **RPM Mode: TACZ Native**. Rate and accuracy are configured here.
7. Enable **Reload / Supply Ammo** in **Ammo** and set **Ammo Stock**. `-1` provides unlimited reserves.
8. Select a target under **Targets**, then use the top **Save** control to save to the NPC.
9. Test against a valid target inside range, with clear sight and the correct detection direction. Check firing and reloading.

## Find the next setting

![Senses Quick View beside Awareness and Combat Mode.](assets/media/guides/warfare-031-neo1211/dw-senses.png "Click a Quick View entry to jump to that section. Detection distance and firing distance are configured separately.")

| Location | Controls |
| --- | --- |
| **Gun / Melee** | Ranged/melee weapons and damage |
| **Senses → Awareness** | Acquisition distance, angle, delay and idle movement |
| **Senses → Combat Mode** | Ranged/melee switching and engagement behavior |
| **Senses → Fire Modes / Fire Rate** | Moving fire and bursts / rate and accuracy |
| **Targets** | Targets to attack |
| **Ammo** | Reloading, reserves and regeneration |
| **Armor / Visual & FX / Pose** | Armor, appearance, sounds and poses |
| **Cover** | Cover during combat |

**Overview** summarizes current values. Multiple weapon, skin or armor candidates must total **100%** in their respective pool. The current UI’s **Even** control distributes probability equally.

## Reuse settings on another NPC

**Save As** a profile, **Load** it on another NPC, then **Save**. Profiles are under `config/dochi_warfare/target_entities/`. To keep the NPC itself, right-click air with the core to open the [clone library](#dochi-warfare/warfare-entity-clones).

Continue to [Easy Build and Presets](#dochi-warfare/warfare-easy-build-presets) for guided behavior setup, or [troubleshooting](#dochi-warfare/warfare-troubleshooting) if it does not fire. Use **DW Pose Core / DW Mercenary Core / DW Booby Trap Core** for poses, hiring or traps, and [DWE](#dochi-warfare-expanded/expanded-overview) for vehicles.

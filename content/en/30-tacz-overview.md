---
title: Make a Firearm NPC
slug: dochi-warfare-overview
order: 310
description: Use Warfare to choose an NPC's gun, targets, reloads and combat behavior.
product: dochi-warfare
category: Overview
section: overview
status: Draft
version: 0.3.1
audience: Firearm NPC creators
tags:
  - TACZ
  - customnpcs
  - overview
---

## What Warfare does

Give an NPC a gun and choose its targets, movement and reloads. You can also make it switch to melee nearby, use cover, patrol or follow mercenary commands.

Create the NPC with **DNPC or CustomNPCs**. Use DW for NPC combat; add **DWE** for vehicles and crews.

## Set up one NPC first

1. Install the requirements in [setup](#dochi-warfare/warfare-setup).
2. Right-click the NPC with **DW Npc Core**.
3. Enable **TACZ Fire NPC Mode** and **Enabled**.
4. Choose a gun under **Gun**.
5. **Save**, then put it in sight of a valid target.

**Easy Build / Presets** provides starting combat settings.

## Choose what to change next

| Goal | Guide |
| --- | --- |
| Use melee nearby and a gun at range | [Weapons and stances](#dochi-warfare/warfare-weapons-ai) |
| Attack chosen enemies | [Target rules](#dochi-warfare/warfare-target-filters) |
| Limit or refill ammunition | [Reloads and stock](#dochi-warfare/warfare-reload-ammo) |
| Take cover or suppress enemies | [Cover and suppression](#dochi-warfare/warfare-cover-suppression) |
| Hire and command NPCs | [Mercenaries](#dochi-warfare/warfare-mercenary) |
| Move vehicles and assign crews | [DWE](#dochi-warfare-expanded/expanded-overview) |

Set spare ammo with **Ammo Stock**. Do not equip ammo or magazine items in the NPC's offhand.

## Supported platforms

DW is for **Forge 1.20.1 / NeoForge 1.21.1**. TACZ and client-side Player Animator are required. Installed compatible PointBlank/SuperbWarfare mods add their supported guns.

See [setup](#dochi-warfare/warfare-setup) for version requirements.

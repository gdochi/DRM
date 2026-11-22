---
title: Create Your First NPC
slug: npc-core-setup
order: 1500
description: Install DNPC, place an NPC and choose its name, skin and equipment.
product: dochi-npc-core
category: NPC Core setup
section: setup
status: Guide
version: 0.1.3
audience: Creators / server operators
---

## Download and install

[Download Dochi’s NPC Core on CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-npc-core)

Choose your Minecraft version and loader. In multiplayer, install matching files on the server and every client. Fabric also needs Fabric API.

| Minecraft | Loader | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

DNPC alone lets you create, customize and assign jobs to NPCs. Add DRM when you want conversations or shops.

### DNPC 0.1.5 runtime checks

- **Forge 1.20.1 / NeoForge 1.21.1** — The production JARs loaded a world, created and saved an NPC, and shut down normally.
- **Fabric 26.3 / NeoForge 26.3** — The production JARs loaded a world with Create, ran integration tasks, and shut down normally.
- **Fabric 1.21.1** — The development JAR loaded a world, created and saved an NPC, and shut down normally. The final production JAR still needs a direct runtime check.

These checks ran in single-player. If you use Create on Minecraft 26.3, see the [tested Create combinations](#dochi-npc-core/npc-core-create-start).

## Place your first NPC

1. Get the Core from the Creative **NPC Core** tab, or use `/dnpc core`.
2. Right-click the ground with it to place an NPC.
3. Right-click that NPC with the Core to edit it.
4. Enter a name, choose a skin and equipment, then save.
5. Put the Core away and look at your NPC.

![Identity in the DNPC 0.1.3 editor, with categories on the left, the preview in the middle and Name and Title on the right.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "English UI on NeoForge 1.21.1. Name your NPC under Identity → Name. Use Appearance & Model for skins and Inventory & Equipment for armor.")

Use the disk-shaped **Save to NPC** control after editing. To keep the NPC for later reuse, also [save a template with Save As](#dochi-npc-core/npc-core-templates).

## Core controls

| Input | Result |
| --- | --- |
| Right-click ground | Place an NPC |
| Right-click an NPC | Edit it |
| Right-click air | Open global settings and the poser |
| Left-click | Open NPC utility controls |
| Hold the Core in your main hand; Ctrl+C / Ctrl+V | Copy / paste an NPC |
| Hold the Core in your main hand; Ctrl+X | Delete the targeted NPC |

For repeated use, [save a template](#dochi-npc-core/npc-core-templates).

## What to try next

- [Appearance, equipment and jobs](#dochi-npc-core/npc-core-editor)
- [Work and rest schedules](#dochi-npc-core/npc-core-schedules)
- [Cooking and food delivery](#dochi-npc-core/npc-core-cooking)
- [DRM conversations, shops and other mods](#dochi-npc-core/npc-core-files)

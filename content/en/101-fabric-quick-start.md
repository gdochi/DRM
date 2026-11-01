---
title: Getting Started
slug: quick-start
order: 1
description: Get the DRM tool and give an NPC its first conversation.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.3.1
audience: First-time users
tags:
  - quick-start
  - setup
---

## Give an NPC a conversation

DRM lets you make NPC conversations, shops and quests. Start with one NPC and a short greeting.

1. In Creative mode, get **Dochi RPG Maker Core**, or enter `/give @s dochi_rpg_maker:dialogue_editor`.
2. Hold the Core and **right-click air**.
3. Open **Dialogue Editor** and choose **Use Default Dialogue Set**.
4. Select a general dialogue node and change its dialogue and choice text.
5. Use **Save As** to save your own conversation.
6. Right-click a DNPC or CustomNPCs NPC with the Core and apply the saved conversation.
7. Empty both hands and right-click the NPC to talk.

Need an NPC first? Follow [Create an NPC](#dochi-npc-core/npc-core-setup). Use DNPC on Minecraft 26.3.

## Choose what you want to make

| Goal | Tool | Guide |
| --- | --- | --- |
| Dialogue and choices | Dialogue Editor | [Conversations](#core-fabric/dialogue-system) |
| An NPC that buys or sells items | NPC Shop | [Shops](#core-fabric/shop-system) |
| A custom dialogue/shop appearance | GUI Maker | [Screen layouts](#core-fabric/gui-system) |
| Money names, icons and balances | Currency Editor | [Currency](#core-fabric/currency-editor) |
| Information that stays on screen | HUD Maker | [HUDs](#core-fabric/hud-maker) |

Quests, travel destinations and popups also open from the editor selector. Installed addons add their own tools.

## When to save and apply

**Save / Save As** keeps your work in a file. **Apply** chooses which NPC uses it. Save a new conversation or shop, then apply it to the NPC.

Use **Save As** to give a bundled example your own name. Use **Save** for later changes to your file.

## Before installing

For 1.21.1, choose Fabric or NeoForge. For 26.3, use its separate files. See [installation](#core-fabric/installation) and [26.3 differences](#core-fabric/minecraft-26-3).

For moving saved work to another server, see [folders](#core-fabric/paths).

---
title: Quick Start
slug: quick-start
order: 20
description: The shortest path into DRM Core 0.2.0 on Fabric 1.21.1.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.2.0
audience: First-time users
tags:
  - quick-start
  - setup
---

## First Launch

1. Prepare Minecraft 1.21.1, Fabric Loader 0.18.0 or newer, Fabric API 0.116.11 or newer, and Java 21.
2. Put the DRM Core 0.2.0 Fabric JAR in the client and server `mods` folders.
3. Install CustomNPCs 1.0.0 on the server and clients. It is required by DRM 0.1.8.
4. Start the world or server once so `config/dochi_rpg_maker` is created.
5. In Creative mode or with edit permission, get the `Dochi RPG Maker Core` item from the CustomNPCs tab or run `/give @s dochi_rpg_maker:dialogue_editor`.

On first launch, the mod installs starter dialogue, GUI, Teleporter, shop, quest, popup, HUD, Remnant Msg, and settings files under `config/dochi_rpg_maker`.

## Opening Editors

| Action | Result |
| --- | --- |
| Right-click air with `Dochi RPG Maker Core` | Opens the shared editor selector. |
| Right-click a CustomNPCs NPC with the item | Opens the target-aware edit flow. |
| Right-click an NPC Spawner block with the item | Opens that block's NPC Spawner editor. |
| Right-click a dialogue NPC without the item | Opens the dialogue runtime. |
| Right-click a shop-only NPC without the item | Opens the NPC shop runtime. |
| Right-click a Teleporter-bound NPC without the item | Opens the Teleporter runtime. |

The core item is also added to the CustomNPCs creative tab. Editing requires creative/edit permission.

The 0.1.8 selector has search plus `Built-in` and `Add-on` categories. It includes Dialogue, NPC Shop, NPC Basic, Currency, GUI Maker, HUD Maker, Popup Maker, Faction, Quest, Teleporter, and Remnant Msg. NPC Spawner opens from its placed block. During the current session, the selector remembers the last editor, sub-screen, and JSON source.

When a target NPC is open in NPC Apply, use the new `FUNCTION` search field to filter built-in and addon apply targets by their localized name, target ID, JSON kind, editor ID, or binding group.

## Shared Editor Shortcuts

Supported editors expose these shortcuts and a `?` help screen.

| Shortcut | Action |
| --- | --- |
| `Ctrl+S` | Save the current document. Protected defaults require `Save As`. |
| `Ctrl+Z` | Undo the latest edit. |
| `Ctrl+Y` or `Ctrl+Shift+Z` | Redo an undone edit. |
| `U` | Open the player Quest Journal. |
| `J` | Open Faction Overview. |
| `F7` | Open DRM Admin for an authorized operator. |

`default_set`, GUI files beginning with `default`, and default/sample shops are read-only protected content. Start from them with `Save As` and a new ID.

## Minimal Dialogue Flow

1. Right-click air to open the editor selector.
2. Choose `Dialogue Editor`, then `Use Default Dialogue Set` or `Create New Dialogue Set`.
3. Edit nodes and choices.
4. Add conditions and actions where needed.
5. Use `Save As` to save server JSON.
6. Right-click the target NPC with the core item and apply the dialogue.
7. The saved dialogue opens as runtime dialogue when the NPC is right-clicked without the core item.

For shops, start from `NPC Shop` in the same selector. File-based shops are saved under `config/dochi_rpg_maker/npc_shops`; NPC-bound shops are copied to NPC PersistentData.

## Suggested Reading Order

| Step | Page | Why |
| --- | --- | --- |
| 1 | Installation | Mod loader, client/server roles, and base folders. |
| 2 | Paths | Where each JSON type is stored. |
| 3 | Dialogue Editor | The main NPC dialogue authoring flow. |
| 4 | Conditions And Actions | Choice gates, rewards, and shop links. |
| 5 | NPC Shop | Buy and sell shops. |
| 6 | Teleporter | Destination sets, NPC binding, and player travel. |
| 7 | NPC Spawner | Weighted sources, spawn rules, and block appearance. |
| 8 | Quest Editor And Journal | Objectives, rewards, NPC links, and player progress. |
| 9 | Factions And Popups | Relationship screens and reusable notices. |
| 10 | GUI Maker | Dialogue/shop/quest/Teleporter/popup screen layout. |
| 11 | HUD Maker | Always-visible player HUDs. |

:::tip Operator Command
If you edit server JSON by hand, run `/drm reload` or review `settings/reload_policy.json`.
:::


## Scene Maker and screen navigation

In 0.1.9, choose **Scene Maker** in the editor selector to build camera scenes. See **Scene Maker** for timeline, world-pin dragging, curves, and playback commands.

In 0.2.0, **Tooltip Maker** is available as a built-in Fabric editor. Use it to design item hover layouts, previews, scrolling content, and entrance effects. Dialogue choices also support per-node text sizing and optional pulse highlights.

The shared topbar always shows back and forward arrows. Hover for their names. They move between previously opened screens and preserve editing state; they are separate from Undo/Redo. An arrow is disabled when there is no screen in that direction. Addon screens need an updated addon build to use these controls.

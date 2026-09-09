---
title: Quick Start
slug: quick-start
order: 20
description: The shortest path through DRM Core editors after installation.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.1.5
audience: First-time users
tags:
  - quick-start
  - setup
---

## First Launch

1. Put the `dochi_rpg_maker` JAR into the Forge 1.20.1 instance `mods` folder.
2. For servers, install the same mod version on both server and connecting clients.
3. Install CustomNPCs 1.20.1 or newer in the same client and server environment. It is a required 0.1.5 dependency.
4. Start the world or server once so `config/dochi_rpg_maker` is created.
5. In creative mode, get the `Dochi RPG Maker Core` item.

On first launch, the mod installs default dialogue, GUI, tooltip, shop, HUD, Remnant Message, quest, stat, item, teleporter, faction, and popup templates under `config/dochi_rpg_maker`.

## Opening Editors

| Action | Result |
| --- | --- |
| Right-click air with `Dochi RPG Maker Core` | Opens the shared editor selector. |
| Right-click a CustomNPCs NPC with the item | Opens the target-aware edit flow. |
| Right-click a dialogue NPC without the item | Opens the dialogue runtime. |
| Right-click a shop-only NPC without the item | Opens the NPC shop runtime. |

The core item is also added to the CustomNPCs creative tab. Editing requires creative/edit permission.

The selector has search and **General**, **Visual**, and **Config** groups. **Visual** contains GUI Maker, Tooltip Maker, HUD Maker, and Popup Maker. General includes the dialogue, NPC, quest, teleporter, faction, message, and item editors; Config contains Currency Editor and Stat Builder. The selector also lists installed add-on tools.

## Shared Editor Shortcuts

Supported editors expose these shortcuts and a `?` help screen.

| Shortcut | Action |
| --- | --- |
| `Ctrl+S` | Save the current document. Protected defaults require `Save As`. |
| `Ctrl+Z` | Undo the latest edit. |
| `Ctrl+Y` or `Ctrl+Shift+Z` | Redo an undone edit. |

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
| 6 | GUI Maker | Dialogue/shop/message screen layout. |
| 7 | HUD Maker | Always-visible player HUDs. |
| 8 | Quest Editor And Journal | Quest state, objectives, rewards, and completion flow. |
| 9 | Stat Builder And Item Editor | Player progression and requirement-based equipment performance. |

:::tip Operator Command
If you edit server JSON by hand, run `/drm reload` or review `settings/reload_policy.json`.
:::

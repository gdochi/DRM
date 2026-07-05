---
title: Quick Start
slug: quick-start
order: 20
description: The shortest path to verify DRM Core editors and runtime after installation.
product: core
category: Getting Started
status: Stable
version: 0.1.2
audience: First-time users
tags:
  - quick-start
  - setup
---

## First Launch

1. Put the `dochi_rpg_maker` JAR into the Forge 1.20.1 instance `mods` folder.
2. For servers, install the same mod version on both server and connecting clients.
3. Install CustomNPCs in the same environment if you are authoring NPC content.
4. Start the world or server once and confirm that `config/dochi_rpg_maker` is created.
5. In creative mode, get the `Dochi RPG Maker Core` item.

On first launch, the mod installs default dialogue sets, default dialogue GUI, default shop GUI, a sample shop, HUD definitions, and settings under `config/dochi_rpg_maker`.

## Opening Editors

| Action | Result |
| --- | --- |
| Right-click air with `Dochi RPG Maker Core` | Opens the shared editor selector. |
| Right-click a CustomNPCs NPC with the item | Opens the target-aware edit flow. |
| Right-click a dialogue NPC without the item | Opens the dialogue runtime. |
| Right-click a shop-only NPC without the item | Opens the NPC shop runtime. |

The core item is also added to the CustomNPCs creative tab. Editing requires creative/edit permission.

## Minimal Dialogue Flow

1. Right-click air to open the editor selector.
2. Choose `Dialogue Editor`, then `Use Default Dialogue Set` or `Create New Dialogue Set`.
3. Edit nodes and choices, then use `Save As` to save server JSON.
4. Right-click the target NPC with the core item and apply the dialogue.
5. Right-click the same NPC without the core item to test runtime dialogue.

For shops, start from `NPC Shop` in the same selector. File-based shops are saved under `config/dochi_rpg_maker/npc_shops`; NPC-bound shops are copied to NPC PersistentData.

## Quick Verification

| Check | Expected | If It Fails |
| --- | --- | --- |
| Mod loading | `Dochi RPG Maker` appears in the mod list. | Check Forge 1.20.1, Java, and JAR location. |
| Data root | `config/dochi_rpg_maker` is created. | Check whether you are looking at the server root or client instance root. |
| Core item | `Dochi RPG Maker Core` is visible. | Check the CustomNPCs tab or use `/give`. |
| Default JSON | `dialogue_sets/default_set`, `gui`, and `npc_shops` exist. | Check first-launch logs and file permissions. |
| Runtime | NPC right-click opens dialogue or shop. | Check NPC `source.kind`, `source.path`, or embedded JSON. |

:::tip Operator Command
If you edit server JSON by hand, run `/drm reload` or review `settings/reload_policy.json`.
:::

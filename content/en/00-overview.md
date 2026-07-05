---
title: Wiki Overview
slug: overview
order: 10
description: A practical overview of the DRM Core runtime, editors, and data storage model.
product: core
category: Getting Started
section: getting-started
hiddenNav: true
status: Stable
version: 0.1.2
audience: Creators / Operators
tags:
  - overview
  - drm
---

## Current DRM Core Scope

DRM Core is a native in-game RPG authoring toolkit for Forge 1.20.1. It targets CustomNPCs workflows and provides editors plus runtime support for dialogue, GUI layouts, NPC shops, currencies, HUDs, and Remnant Msg data.

This documentation follows the current `dochi_rpg_maker` implementation. The primary data root is `config/dochi_rpg_maker`, not the older `customnpcs/dc_data` or HTML GUI flow.

| Area | Runtime Role | Main Classes / Data |
| --- | --- | --- |
| Editor selector | Shared hub opened from the core item. | `EditorSelectScreen`, `DochiEditorRegistry` |
| Dialogue | Edits and runs dialogue sets, nodes, choices, conditions, and actions. | `DialogueEditorScreen`, `DialogueDocument`, `DialogueRuntimeManager` |
| GUI | Builds layout JSON for dialogue, shops, HUD overlays, and Remnant Msg screens. | `GuiMakerScreen`, `LayoutDocument`, `LayoutModeProfile` |
| Shop | Handles NPC shops, buying, selling, stock, and currency payment. | `NpcShopEditorScreen`, `ShopDocument`, `ShopTradeService` |
| Currency / HUD | Defines item-backed currencies, balances, pickup conversion, and HUD display. | `CurrencyDefinition`, `CurrencyBalanceStorage`, `CurrencyHudOverlay` |
| Defaults | Installs bundled sample JSON and default GUI files on startup. | `DefaultContentInstaller`, `dochi_rpg_maker_defaults/**` |

## Built-In Editors

Using the `Dochi RPG Maker Core` item opens the shared editor selector. DRM Core registers these editor IDs.

| Editor | ID | Requires NPC Target | Purpose |
| --- | --- | --- | --- |
| Dialogue Editor | `dialogue` | No | Author dialogue sets and nodes |
| GUI Maker | `gui_maker` | No | Author reusable screen layouts |
| NPC Shop | `npc_shop` | No | Author shop JSON and edit NPC shops |
| NPC Basic | `npc_basic` | Yes | Edit CustomNPCs NPC basics |
| Currency Editor | `currency` | No | Author currency definition JSON |
| HUD Maker | `hud_maker` | No | Author HUD layouts and display settings |
| Remnant Msg Editor | `remnant_msg` | No | Author Remnant Msg messages and policies |

## Documentation Rules

- Prefer implemented storage paths and JSON field names over older design notes.
- Separate defaults, protected defaults, and legacy compatibility behavior.
- List only condition and action types that the current runtime executes.
- Explain GUI behavior through the shared `Layout*` model used by GUI Maker preview and runtime screens.

:::tip Reading Order
Start with Quick Start, Installation, Paths, and Core Concepts. Then jump to the specific system you are building.
:::

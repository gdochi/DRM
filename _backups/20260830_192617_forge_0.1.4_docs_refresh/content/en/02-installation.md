---
title: Installation
slug: installation
order: 30
description: Forge, Minecraft, CustomNPCs, and client/server assumptions for DRM Core.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.1.3
audience: Server operators
tags:
  - install
  - forge
---

## Supported Environment

DRM Core targets Forge 47+, Minecraft 1.20.1 up to but not including 1.21. The mod ID is `dochi_rpg_maker`.

| Item | Requirement | Notes |
| --- | --- | --- |
| Mod Loader | Forge / `javafml` `[47,)` | Forge 1.20.1 family |
| Minecraft | `[1.20.1,1.21)` | Docs assume 1.20.1 |
| DRM Core | `dochi_rpg_maker` 0.1.3 | Required on both client and server |
| Java | 17 | Match the Forge 1.20.1 runtime. |
| CustomNPCs | Optional dependency | Required for the CustomNPCs NPC dialogue, shop, and NPC editor workflows. |

Core editors are native Minecraft `Screen` implementations. Dialogue, shop, and GUI Maker basics do not require HTML GUI, MCEF, or CNPCExtended.

## Install Steps

1. Put the same DRM Core JAR in the client and server `mods` folders.
2. If the server uses CustomNPCs NPCs, align CustomNPCs across the same modset.
3. Start the server so `config/dochi_rpg_maker` is created.
4. After bundled files are installed, review `dialogue_sets`, `gui`, `npc_shops`, `currency`, `hud`, and `remnant_msg`.
5. Prepare the core item and open the editor selector.

Local development builds use the mod folder script:

```powershell
.\build-local.ps1
```

## Client vs Server

| Location | Responsibility |
| --- | --- |
| Server | JSON storage, NPC PersistentData, shop trades, currency balances, command execution. |
| Client | Editor screens, GUI Maker preview, runtime screens, HUD rendering. |

Server JSON is read from the server root `config/dochi_rpg_maker`. In singleplayer, the local game instance acts as the server root.

## Backup Before Updates

Back up these paths before updating:

| Path | Why |
| --- | --- |
| `config/dochi_rpg_maker` | Current official data root. |
| `dochi_rpg_maker` | Legacy root that may be migrated on startup. |
| World save folder | NPC PersistentData contains NPC-bound dialogue and shop data. |

Bundled default dialogue, GUI, shop, and Remnant Msg sample files may be refreshed on startup. Do not edit defaults in place for production content; use `Save As` and point NPCs or settings at the new file. HUD definitions and the Remnant Msg default policy are installed only when missing, and bundled HUD definitions start disabled.

:::warning Version Matching
If the client is newer than the server, editor packets, server JSON kinds, and runtime GUI fields can drift. Keep the same JAR on both sides.
:::

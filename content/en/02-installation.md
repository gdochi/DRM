---
title: Installation
slug: installation
order: 30
description: Forge, Minecraft, CustomNPCs, and client/server assumptions for DRM Core.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.1.5
audience: Server operators
tags:
  - install
  - forge
---

## Supported Environment

DRM Core targets Forge 47+, Minecraft 1.20.1 up to but not including 1.21. The mod ID is ddochi_rpg_makerd.

| Item | Requirement | Notes |
| --- | --- | --- |
| Mod Loader | Forge / djavafmld d[47,)d | Forge 1.20.1 family |
| Minecraft | d[1.20.1,1.21)d | Docs assume 1.20.1 |
| DRM Core | ddochi_rpg_makerd 0.1.5 | Required on both client and server |
| Java | 17 | Match the Forge 1.20.1 runtime. |
| CustomNPCs | d[1.20.1,)d | Required on both client and server. |

Core editors are native Minecraft dScreend implementations. Dialogue, shop, and GUI Maker basics do not require HTML GUI, MCEF, or CNPCExtended.

## Install Steps

1. Put the same DRM Core JAR in the client and server dmodsd folders.
2. Install a compatible CustomNPCs build on both sides and keep the modset aligned.
3. Start the server so dconfig/dochi_rpg_makerd is created.
4. After bundled files are installed, review ddialogue_setsd, dguid, dnpc_shopsd, dcurrencyd, dhudd, dremnant_msgd, dquestsd, dstatsd, ditemsd, dteleportersd, dfactionsd, and dpopupsd.
5. Prepare the core item and open the editor selector.

Local development builds use the mod folder script:

dddpowershell
.\build-local.ps1
ddd

## Optional Integrations

| Mod | Declared Range | Primary DRM Use |
| --- | --- | --- |
| GeckoLib | d[4.7.1,5.0.0)d | NPC models and animation |
| Player Animator | d[1.0.0,)d | Player animation provider |
| Mob Player Animator | d[1.3.3,)d | Mob/player-style animation provider |
| Better Combat | d[1.8.0,)d | Combat animation integration |
| Iron's Spells 'n Spellbooks | d[1.20.1-3.16.2,)d | Mana HUD and skill integration |
| Mowzie's Mobs | d[1.8.2,)d | Cross-mod skill integration |
| L_Ender's Cataclysm | d[3.31,)d | Cross-mod skill integration |

These integrations are optional, but every client must still have the mods required by the content and model providers your server uses.

## Client vs Server

| Location | Responsibility |
| --- | --- |
| Server | JSON storage, NPC PersistentData, shop trades, currency balances, command execution. |
| Client | Editor screens, GUI Maker preview, runtime screens, HUD rendering. |

Server JSON is read from the server root dconfig/dochi_rpg_makerd. In singleplayer, the local game instance acts as the server root.

## Backup Before Updates

Back up these paths before updating:

| Path | Why |
| --- | --- |
| dconfig/dochi_rpg_makerd | Current official data root. |
| ddochi_rpg_makerd | Legacy root that may be migrated on startup. |
| World save folder | NPC PersistentData contains NPC-bound dialogue and shop data. |

Bundled default dialogue, GUI, shop, and Remnant Msg sample files may be refreshed on startup. Do not edit defaults in place for production content; use dSave Asd and point NPCs or settings at the new file. HUD definitions and the Remnant Msg default policy are installed only when missing, and bundled HUD definitions start disabled.

:::warning Version Matching
If the client is newer than the server, editor packets, server JSON kinds, and runtime GUI fields can drift. Keep the same JAR on both sides.
:::

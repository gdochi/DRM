---
title: Installation
slug: installation
order: 30
description: Forge, Minecraft, and CustomNPCs assumptions for DRM Core deployment.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.1.2
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
| DRM Core | `dochi_rpg_maker` 0.1.2 | Required on both client and server |
| CustomNPCs | Optional dependency | Practically required for NPC authoring and runtime |

Core editors are native Minecraft `Screen` implementations. Dialogue, shop, and GUI Maker basics do not require HTML GUI, MCEF, or CNPCExtended.

## Install Steps

1. Put the same DRM Core JAR in the client and server `mods` folders.
2. If the server uses CustomNPCs NPCs, align CustomNPCs across the same modset.
3. Start the server and confirm that `config/dochi_rpg_maker` exists.
4. Confirm that bundled sample files were installed.
5. Test both core item air right-click and NPC right-click in a test world.

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

Default GUI and default dialogue files may be recopied on startup. Do not edit defaults in place for production content; use `Save As` and point NPCs or settings at the new file.

:::warning Version Matching
If the client is newer than the server, editor packets, server JSON kinds, and runtime GUI fields can drift. Keep the same JAR on both sides and test in a staging world first.
:::

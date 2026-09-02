---
title: Installation
slug: installation
order: 30
description: Requirements and client/server roles for DRM Core 0.1.8 on Fabric 1.21.1.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.1.8
audience: Server operators
tags:
  - install
  - fabric
---

## Supported Environment

The Fabric build targets Minecraft `1.21.1` exactly. It is not interchangeable with the Forge 1.20.1 JAR. Both loader builds keep the mod ID and resource namespace `dochi_rpg_maker`.

| Item | Requirement | Current project pin |
| --- | --- | --- |
| DRM Core | `0.1.8` Fabric build | `dochi_rpg_maker-0.1.8-fabric-1.21.1.jar` |
| Minecraft | Exactly `1.21.1` | Do not mix with another 1.21.x version. |
| Fabric Loader | `0.18.0` or newer | Built with `0.19.3` |
| Fabric API | `0.116.11+1.21.1` or newer | Built with `0.116.13+1.21.1` |
| Java | `21` or newer | Use the same runtime on client and server. |

## Required And Optional Integrations

`fabric.mod.json` requires CustomNPCs 1.0.0. The other integrations are optional.

| Mod | When it is needed |
| --- | --- |
| CustomNPCs 1.0.0 | Required on the server and every client. |
| GeckoLib 4.8.4 or newer | Install when using GeckoLib NPC models and animations. |
| Mod Menu | Adds an entry for DRM's shared `Mods Config` screen. |
| FTB Quests | Required for `ftb` and `ftb_task` conditions and quest/task completion actions. |
| CobbleDollars | Needed only when an installed addon or server setup explicitly uses that integration. |

## Installation

1. Put the same DRM Core 0.1.8 Fabric JAR in the client and server `mods` folders.
2. Install Fabric API in the same environments.
3. Install CustomNPCs 1.0.0 for Fabric 1.21.1 on both sides.
4. Start the world or server once so `config/dochi_rpg_maker` is created.
5. In Creative mode or with permission level 2, obtain `dochi_rpg_maker:dialogue_editor`.

With CustomNPCs installed, the Core and Remnant Msg Setter items are added to the CustomNPCs creative tab. You can also obtain them directly.

```text
/give @s dochi_rpg_maker:dialogue_editor
/give @s dochi_rpg_maker:remnant_msg_setter
/give @s dochi_rpg_maker:npc_spawner
```

## Client and Server Responsibilities

| Side | Responsibility |
| --- | --- |
| Server | JSON storage, permissions, NPC bindings, Teleporter sessions and targets, NPC Spawner pools/leases, conditions/actions, shop transactions, stock, currency balances, and Remnant marker persistence |
| Client | Editor screens, searchable pickers, GUI Maker preview, dialogue/shop/Teleporter runtime screens, and HUD rendering |

In multiplayer, the server's `config/dochi_rpg_maker` is authoritative. Editing a similarly named local client file does not change server content.

## Back Up Before Updating

Back up both `config/dochi_rpg_maker` and the world save. NPC-embedded dialogue/shop data, NPC Spawner block state, leases, and Remnant marker saved data live with the world. Spawner templates and snapshots live under `config/dochi_rpg_maker/npc_spawner`.

Bundled dialogue, GUI, shop, Teleporter, and Remnant samples may be refreshed during startup. Treat protected defaults as templates: use `Save As`, then link the new file.

## Development Build

Use Java 21 and the Gradle wrapper from the Fabric source project.

```powershell
.\gradlew.bat clean build
```

The remapped JAR is produced under `build/libs`.

:::warning Do not mix loaders
Use the JAR containing `fabric.mod.json` on Fabric. Do not add the Forge JAR containing `META-INF/mods.toml` to the same instance.
:::

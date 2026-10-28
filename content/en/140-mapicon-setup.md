---
title: Map Icons Setup and First Icon
slug: mapicon-setup
order: 1400
description: Current installation and first-use guidance.
product: dochi-mapicon-integration
category: Start
section: setup
status: Usage guide
version: 0.1.2
audience: Creators / server operators
---

## Purpose

**MapIcon Integration 0.1.2** configures DRM NPC icons by type, JSON file and individual NPC. It supports Xaero’s Minimap / World Map and **JourneyMap 6 / API 2**.

## Installation

| Build | Minecraft / Java | DRM |
| --- | --- | --- |
| Forge | 1.20.1 / 17 | Required |
| Fabric / NeoForge | 1.21.1 / 21 | Required |
| Fabric / NeoForge | 26.3 / 25 | Matching 26.3 loader build required |

Install matching `dochi_mapicon_integration-0.1.2-<loader>-<minecraft>.jar` and DRM on server and clients. DRM has no numeric version floor. The checked older-target Core is 0.2.9, not an inferred minimum.

**Xaero Minimap, World Map and JourneyMap are individually optional.** The editor and server storage work with one map or none. Only an absent map's rendering is disabled. Install each chosen map's own libraries too.

NPC providers are optional. 26.3 permanently excludes CustomNPCs and uses the common Actor API. See [26.3 guidance](#core-fabric/minecraft-26-3).

Compile baselines are Xaero Minimap 26.6.0 / World Map 1.47.0 and JourneyMap 6 / API 2. Those pins do not establish compatibility with every historical map version.

## Your first shop icon

1. Apply DRM NPC Shop JSON to an NPC.
2. With permission level 2, open the map-icon editor from DRM or Mods Config.
3. Enable global display and choose the NPC Shop JSON type.
4. Set image, size, color and minimap / world-map visibility.
5. Use **Save & Apply** and check the installed map.

Use JSON exceptions for a specific file and NPC Basic’s map-icon category for one NPC. The editor has a category sidebar, central work list / preview and right inspector.

JourneyMap uses the same image, color, size and visibility policies and suppresses duplicate ordinary NPC radar faces for managed / hidden NPCs. Successful saves also synchronize while an integrated server is paused.

See [rule priority](#dochi-mapicon-integration/mapicon-editor-rules) and [files / visibility range](#dochi-mapicon-integration/mapicon-files-operations).

For DNPC, individual settings also open through **NPC Editor → Addons → Map Icons**. This is separate from the older CNPC Basic category. Loading a profile opens a draft; **Save & Apply** changes the active policy.

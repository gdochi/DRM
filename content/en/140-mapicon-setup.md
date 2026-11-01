---
title: Show NPC Icons on the Map
slug: mapicon-setup
order: 1400
description: Give shops, trainers and other NPCs recognizable map icons.
product: dochi-mapicon-integration
category: Start
section: setup
status: Usage guide
version: 0.1.2
audience: Creators / server operators
---

## Mark a shop NPC

Install DRM, MapIcon Integration and the map you want: **Xaero’s Minimap / World Map** or **JourneyMap 6**.

1. Apply a DRM shop to an NPC.
2. Open the icon editor from DRM's editor list or **Mods Config**.
3. Enable global display and select **NPC Shop**.
4. Choose the picture, size, color and minimap/world-map visibility.
5. Press **Save & Apply**, then open the map.

Use the same process for dialogue NPCs and trainers. Cobblemon role types appear when Cobblemon Editor is installed.

## Change just one NPC

For DNPC, use **NPC editor → Addons → Map icon**. For CustomNPCs, use **NPC Basic → Map icon**.

Give a special shop its own icon or hide it. See [individual settings and priority](#dochi-mapicon-integration/mapicon-editor-rules).

## Installation

| Minecraft | Loader | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Install matching-loader DRM and MapIcon files on server and clients. Install the map(s) you want and their required libraries. Fabric also needs Fabric API.

You can edit icons without a map installed, but cannot see them on a map. Use DNPC on 26.3; CustomNPCs is unavailable there.

For custom pictures or missing icons, see [images and troubleshooting](#dochi-mapicon-integration/mapicon-files-operations).

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

## Give one NPC a blue icon

Prepare DRM, MapIcon Integration and the map you want to display. These screens were verified with **MapIcon 0.1.2 / DNPC 0.1.3 / NeoForge 1.21.1 / Xaero’s Minimap 26.6.0**. Icon editing also works without a map installed.

1. [Place a DNPC](#dochi-npc-core/npc-core-setup).
2. Open **NPC editor → Addons → Map icon**. The individual editor has only **Selected NPC** on the left.
3. Enable **Icon** and choose an image. This example uses the built-in blue humanoid icon.
4. Use **Size 16**, **Tint 4AB7FF** and enable **Minimap**. Enable **World map** for that map as well.
5. Press **Save** and wait for **Settings saved**.
6. Close the editor and find the NPC icon on the minimap.

![The blue humanoid icon saved for Selected NPC.](assets/media/guides/mapicon-012-neo1211/mapicon-npc-saved.png "Save in this screen saves the selected NPC. The middle panel is an icon preview, not a map. Check Texture resource, Size, Tint and the map switches together.")

![The DNPC displayed as a blue humanoid on the actual Xaero minimap.](assets/media/guides/mapicon-012-neo1211/mapicon-minimap.png "On the upper-left minimap, the blue humanoid just above the white player marker is Oakridge guide. Yellow markers are other animals. The NPC was placed about twenty blocks away to compare its map and world positions.")

## Use one icon for all shops

For a whole category, open the full icon editor from DRM's editor list or **Mods Config**.

1. Enable global display and select **Type defaults → NPC Shop JSON**.
2. Choose the image, size, tint and map visibility.
3. Use **Save & Apply** to save and activate the server profile.
4. Check an NPC with a real DRM shop applied.

Choose the corresponding default for dialogue NPCs or trainers. Cobblemon roles appear when Cobblemon Editor is installed. Individual NPC artwork takes priority; see [icon priority](#dochi-mapicon-integration/mapicon-editor-rules).

## Installation

| Minecraft | Loader | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Install matching-loader DRM and MapIcon files on server and clients. Install the map(s) you want and their required libraries. Fabric also needs Fabric API.

You can edit icons without a map installed, but cannot see them on a map. Use DNPC on 26.3; CustomNPCs is unavailable there.

For custom pictures or missing icons, see [images and troubleshooting](#dochi-mapicon-integration/mapicon-files-operations).

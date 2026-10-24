---
title: Map Icons Setup and First Icon
slug: mapicon-setup
order: 1400
description: Current installation and first-use guidance.
product: dochi-mapicon-integration
category: Start
section: setup
status: Usage guide
version: 0.1.1
audience: Creators / server operators
---

## Purpose

**MapIcon Integration 0.1.1** configures DRM NPC icons by type, JSON file and individual NPC. It supports Xaero’s Minimap / World Map and **JourneyMap 6 / API 2**.

## Installation

| Build | Minecraft / Java | Minimum DRM | Current guide |
| --- | --- | --- | --- |
| Forge | 1.20.1 / 17 | 0.2.1 | 0.2.8 |
| Fabric | 1.21.1 / 21 | 0.2.7 | 0.2.8 |
| NeoForge | 1.21.1 / 21 | 0.2.7 | 0.2.8 |

Install matching-loader `dochi_mapicon_integration-0.1.1-<loader>-<minecraft>.jar` and DRM on server and clients. Add CustomNPCs or DNPC for the NPCs you use. DRM 0.2.8 itself does not require CustomNPCs.

Map mods are optional client integrations. The Xaero baseline is Minimap 26.6.0 / World Map 1.47.0 with required XaeroLib. JourneyMap uses version 6 and API 2; the recorded runtime check used 6.0.9. This does not guarantee every older map-mod version.

## Your first shop icon

1. Apply DRM NPC Shop JSON to an NPC.
2. With permission level 2, open the map-icon editor from DRM or Mods Config.
3. Enable global display and choose the NPC Shop JSON type.
4. Set image, size, color and minimap / world-map visibility.
5. Use **Save & Apply** and check the installed map.

Use JSON exceptions for a specific file and NPC Basic’s map-icon category for one NPC. The editor has a category sidebar, central work list / preview and right inspector.

JourneyMap uses the same image, color, size and visibility policies and suppresses duplicate ordinary NPC radar faces for managed / hidden NPCs. Successful saves also synchronize while an integrated server is paused.

See [rule priority](#dochi-mapicon-integration/mapicon-editor-rules) and [files / visibility range](#dochi-mapicon-integration/mapicon-files-operations).

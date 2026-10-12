---
title: Map Icons Setup and First Icon
slug: mapicon-setup
order: 1400
description: Connect applied DRM NPC JSON to Xaero Minimap and World Map icons.
product: dochi-mapicon-integration
category: Start
section: setup
status: Usage guide
version: 0.1.0
audience: Creators / server operators
---

## What it does

**Dochi's MapIcon Integration 0.1.0** displays DRM NPCs as icons on Xaero's Minimap and World Map. Configure defaults by applied JSON type, exceptions for individual JSON files, and per-NPC overrides.

## Requirements

| Build | Minecraft / Java | Minimum DRM | Current DRM |
| --- | --- | --- | --- |
| Forge | 1.20.1 / 17 | 0.2.1 | 0.2.2 |
| Fabric | 1.21.1 / 21 | 0.2.4 | 0.2.5 |
| NeoForge | 1.21.1 / 21 | 0.2.4 | 0.2.5 |

Install matching-loader MapIcon Integration, DRM and DRM's required CustomNPCs dependency on server and clients. Installable filenames follow `dochi_mapicon_integration-0.1.0-<loader>-<minecraft>.jar`.

Map mods are optional client integrations. The current compile baseline is **Xaero Minimap 26.6.0 / World Map 1.47.0**; also install XaeroLib as required by the map mod. Older Xaero compatibility is not guaranteed. Map display needs a supported map mod, and JourneyMap is currently unsupported.

## Create a shop icon

1. Apply a DRM NPC Shop JSON to the NPC.
2. Open **World Map Icon Editor** from DRM's editor list or the Mods Config addon tab. Editing requires permission level 2 or higher.
3. Enable global display, then select NPC Shop in the JSON-type list.
4. Choose its icon image, size, tint and minimap/world-map visibility.
5. Use **Save & Apply**, then open the Xaero map to check the result.

Use **Add JSON Exception Rule** for a specific shop file. For one NPC, use the **Map Icon** category inside NPC Basic. Continue with [editor settings and priority](#dochi-mapicon-integration/mapicon-editor-rules).

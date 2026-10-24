---
title: Map Files and Troubleshooting
slug: mapicon-files-operations
order: 1420
description: Profile and PNG locations, live NPC display limits and troubleshooting.
product: dochi-mapicon-integration
category: Files and Operations
section: operations
status: Usage guide
version: 0.1.1
audience: Creators / operators
---

## Profiles and images

| Data | Path / example |
| --- | --- |
| Server profiles | `config/dochi_mapicon_integration/*.json` |
| Active profile name | `config/dochi_mapicon_integration/active.txt` |
| DRM server PNGs | `config/dochi_rpg_maker/assets/textures/icons/` |
| Installed bundled PNGs | `config/dochi_rpg_maker/assets/textures/icons/nikoichu/` |

Place custom PNGs in the server texture folder and search **Choose Icon → External Images**. `assets/textures/icons/vendor.png` uses the display ID `dochi_rpg_maker:textures/icons/vendor.png`. Clients use DRM's texture transfer and cache.

For a resource pack's `assets/myserver/textures/icons/vendor.png`, enter `myserver:textures/icons/vendor.png`. Static 32×32 or 64×64 PNGs are recommended; the maximum is 1024×1024. Missing or pending images use the default NPC icon. Server initialization installs only missing bundled PNGs and preserves existing files.

## Live display limits

Only server-loaded NPCs in the player's dimension are displayed: within 4096 blocks, nearest first, up to 512 entries. The server updates every second; clients tracking an entity use its actual position.

Unloading, death, dimension changes and disconnects clear stale entries. Version 0.1.1 does not store fixed POIs or last-known locations for unloaded NPCs. Managed NPCs suppress their normal Xaero radar marker to reduce duplicates. Xaero Fair Play mode does not draw the addon minimap layer.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| No icons | Supported Xaero / XaeroLib or JourneyMap 6, global display, map toggle, loaded NPC, dimension and distance |
| Hidden only for one player | DRM NPC visibility conditions, per-NPC Hide and a matching disabled rule |
| Unexpected icon | Per-NPC override, JSON path, rule priority and type-default order |
| Duplicate markers | Whether the addon manages that NPC and compatibility of the installed Xaero build |
| Save conflict | Reload the server profile, then reapply edits |
| Icons disappear far away | Unloaded NPCs are outside the current live-display scope |

Editing, file browsing and saving require permission level 2, while ordinary players can view map icons. Back up map profiles, DRM assets and the world's NPC data together.

## JourneyMap 6

Version 0.1.1 supports JourneyMap 6 / API 2 with the same icon policies and ordinary-radar suppression. Saves synchronize while paused; unloaded NPCs do not become persistent POIs.

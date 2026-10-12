---
title: Forge 0.2.2 Update
slug: release-0-2-2
order: 6
description: Editor favorites and improvements to external PNG and NPC-model textures.
product: core
category: Start
section: getting-started
status: Usage guide
version: 0.2.2
audience: Creators / operators
---

## Current installation

The current DRM Core for Minecraft 1.20.1 / Forge / Java 17 is **0.2.2**. Fabric and NeoForge 1.21.1 use Core 0.2.5; select the JAR for your loader. Update server and clients together and back up settings and the world.

## Editor favorites

Use ☆/★ in the editor list to add or remove favorite tools. Find them in the Favorites category and at the top of the list. Preferences are local to the game instance at `config/dochi_rpg_maker/editor_favorites.json`; they do not change server documents or NPC bindings.

## External images and NPC textures

Server-asset PNGs and resource-pack textures are resolved separately, with a fallback while loading or downloading. GUI image and Gecko NPC-model texture integration has been improved. Store external images under `config/dochi_rpg_maker/assets/textures/` and reference them as `dochi_rpg_maker:textures/...png`.

## New map addon

[MapIcon Integration 0.1.0](#dochi-mapicon-integration/mapicon-setup) is installed separately. It configures Xaero icons by JSON type, file and NPC; installing Core alone does not provide map icons.

The [0.2.1 record](#core/release-0-2-1) remains available for its NPC Shop stock and GUI tiling changes.

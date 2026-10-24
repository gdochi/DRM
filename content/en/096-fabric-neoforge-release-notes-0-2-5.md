---
title: Fabric and NeoForge 0.2.5 Update
slug: release-notes-0-2-5
order: 6
description: Editor favorites, external NPC textures and new addon connections.
product: core-fabric
category: Start
section: getting-started
status: Usage guide
version: 0.2.5
audience: Creators / operators
---

This is a historical release record. See [DRM 0.2.8](#core-fabric/release-notes-0-2-8) for current guidance.

## Current installation

DRM Core for Minecraft 1.21.1 / Java 21 is now **0.2.5** on Fabric and NeoForge. Both use the shared documentation; choose matching-loader JARs and dependencies. See [installation](#core-fabric/installation).

## Favorites and textures

- Use ☆/★ to manage editor favorites and open them from Favorites. `config/dochi_rpg_maker/editor_favorites.json` is local to the game instance.
- Server-asset PNGs and resource-pack textures are resolved separately, with loading fallbacks. Gecko preview and world-NPC external textures have been improved.
- Fabric NPC Basic's external-texture selection and preview workflow now follows the Forge baseline. Store images in `assets/textures/` and connect their DRM resource IDs.

## Related addons

| Addon | Current guide |
| --- | --- |
| Cobblemon Editor 0.2.4 | [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler), block stages/FX, trainers and service NPCs |
| Minigames 0.1.0 | [Monty Hall, slots and memory](#dochi-minigames/minigames-setup), entry fees/rewards and NPC/dialogue bindings |
| MapIcon Integration 0.1.0 | [Xaero map icons](#dochi-mapicon-integration/mapicon-setup), JSON rules and per-NPC settings |

Install each addon separately and satisfy Core's required CustomNPCs dependency. The earlier [0.2.4 record](#core-fabric/release-notes-0-2-4) remains available for restock-clock and GUI-tiling changes.

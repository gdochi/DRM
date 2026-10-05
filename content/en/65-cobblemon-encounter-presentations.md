---
title: Wild, RCT, and PvP Presentations
slug: cobblemon-encounter-presentations
order: 535
description: Bind saved scenes to encounter categories and individual exceptions.
product: drm-cobblemon-editor
category: Battle presentation
section: presentation
status: Draft
version: Fabric 0.2.2 / NeoForge 0.2.1
audience: Creators and operators
---

## Create a scene, then bind it

`Battle Presentation Maker` authors scenes. **Encounter Presentations** separately binds saved scenes to ordinary wild Pokémon, RCT trainers, and PvP battles. Find it directly below Battle Presentation in the DRM addon editor list.

1. Save a scene in [Battle Presentation](#drm-cobblemon-editor/cobblemon-battle-presentation).
2. Open Encounter Presentations and select Wild, RCT, or PvP.
3. Enable that category's global switch and select a server JSON scene.
4. Add wild-species or RCT-entity exceptions if needed.
5. Save and check the next battle.

New category switches default to OFF. Existing addon NPC trainers retain their own Trainer presentation settings without double playback. RCT API remains optional.

| Setting | Result |
| --- | --- |
| Global OFF | Disabled even when an individual rule is ON |
| Global ON, individual OFF | Disabled for that target |
| Global ON, individual ON or absent | Enabled |
| Individual scene path set | Uses the individual scene |
| Individual path empty | Inherits the global scene |
| Global path also empty | Uses the battle category's default scene |

Wild exceptions use **species IDs**, such as `cobblemon:pikachu`, rather than individual world entities. RCT exceptions use **world entity UUIDs**. PvP provides only a global switch and scene path, without per-player exceptions.

## PvP and skipping

Two-player PvP with one player on each side supports singles and doubles formats. Two-versus-two multi battles are outside this presentation workflow. Each participant sees themselves as Player and their rival as Opponent.

For a skippable scene, one participant skipping does not shorten the other's timer. Both skipping can start the battle early. The server owns timing, blocks overlapping participant requests, and allows independent battles to proceed concurrently.

## Storage and troubleshooting

```text
config/dochi_rpg_maker/cobblemon/encounter_presentations/settings.json
config/dochi_rpg_maker/cobblemon/battle_presentations/
```

The first file stores bindings; the folder stores scenes. Transfer referenced scenes with their bindings and select server paths, not client-local files.

If playback is missing, check category global switch → individual OFF rule → JSON path → actual battle category. Custom images and sounds must also exist in client resource packs. Current builds fix repeated Load-list requests that exhausted the shared read budget. For repeated `rate limited` errors on older builds, align server and clients to the current build for their loader.

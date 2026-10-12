---
title: Fabric and NeoForge 0.2.4 Update
slug: cobblemon-editor-current-update
order: 480
description: Battle schedulers, world selection, block stages/FX and battle-rule updates.
product: drm-cobblemon-editor
category: Getting Started
section: overview
status: Stable
version: Fabric / NeoForge 0.2.4
audience: Creators / Operators
---

## Current requirements

Use **Fabric / NeoForge 0.2.4** on Minecraft 1.21.1 with Java 21. Required integrations are matching-loader DRM Core, CustomNPCs, and Cobblemon. Current DRM is 0.2.5; the addon requires DRM 0.2.4 or newer. Cobblemon must be 1.7.3 or newer and below 1.9.0.

RCT API and CobbleDollars remain optional. See [Setup](#drm-cobblemon-editor/cobblemon-editor-setup) for loader requirements.

## Main changes in 0.2.4

- [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler): connect clone spawning, intro/battle/result scenes and cleanup, with server controls for automatic area entry.
- [Block stages and FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx): capture block states into presentation JSON and author particle emission and motion.
- Move and resize selection boxes in the world, then Apply without changing blocks.
- Expanded battle-rule level settings and flee policies: fixed/player-party-average levels and native/immediate/distance fleeing.
- Trainer schema 23 and Presentation schema 5 remain unchanged.

## General Inventory

- Select default items from `Items` or copy real player stacks from `My Inventory` without consuming them.
- Preserve NBT/components when saving and editing quantity, with distinct entries for different custom stacks sharing an ID.
- Gimmick-key possession is separate from the round AI's battle bag.
- Trainer schema remains `23`.

See [AI, parties, and items](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items) for authoring steps.

## Payments and shared navigation

PokéMart DRM-currency/item payments use Core's payment service. Invalid payment settings or amounts above Core's range are rejected. CobbleDollars uses the selected provider's balance.

Shared Back/Forward arrows navigate visited Core and addon editor screens. Without a destination the icon is disabled. File saving and NPC Apply remain separate operations.

## Trainer-victory quests and updating

Link the same Trainer ID in the battle document and Quest Editor objective. NPC names and filenames do not establish identity. See [Trainer Victory Quests](#drm-cobblemon-editor/cobblemon-trainer-quests).

Back up `config/dochi_rpg_maker` and the world together. Install the same matching-loader addon version on the server and clients. The 0.1.6 notes remain a historical release record.

## Additions in 0.2.2 / 0.2.1

- [Wild/RCT/PvP bindings](#drm-cobblemon-editor/cobblemon-encounter-presentations): category switches, saved scenes, species/UUID exceptions, and both perspectives in two-player PvP.
- [Battle Presentation](#drm-cobblemon-editor/cobblemon-battle-presentation): six party slots per side, per-slot Motion, model fitting and camera keyframes, plus trainer/boss/legendary/party presets. Document schema is now 5.
- After-action item selection can copy `My Inventory` stacks with names, enchantments, gun data, and other components. The action controls the awarded quantity.
- Trainer forfeits produce `flee`; ordinary defeats remain `loss`. Rewards wait for the actual completed battle result.
- Fixed repeated presentation Load-list requests that caused `rate limited` errors.

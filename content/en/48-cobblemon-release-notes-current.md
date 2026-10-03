---
title: Fabric 0.2.1 / NeoForge 0.2.0 update
slug: cobblemon-editor-current-update
order: 480
description: Custom item copying, payment integration, shared navigation, and current requirements.
product: drm-cobblemon-editor
category: Getting Started
section: overview
status: Stable
version: Fabric 0.2.1 / NeoForge 0.2.0
audience: Creators / Operators
---

## Current requirements

Use **Fabric 0.2.1 / NeoForge 0.2.0** on Minecraft 1.21.1 with Java 21. Required integrations are matching-loader DRM Core, CustomNPCs, and Cobblemon. Current DRM is 0.2.4; the addon declares DRM 0.2.2 as its minimum. Cobblemon must be 1.7.3 or newer and below 1.9.0.

RCT API and CobbleDollars remain optional. See [Setup](#drm-cobblemon-editor/cobblemon-editor-setup) for loader requirements.

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

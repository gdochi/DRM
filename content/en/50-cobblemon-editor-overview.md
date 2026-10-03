---
title: Dochi Cobblemon Editor
slug: cobblemon-editor-overview
order: 500
description: Learn the current feature set, supported environment, authoring tools, and runtime rules of Dochi Cobblemon Editor.
product: drm-cobblemon-editor
category: Overview
section: overview
status: Draft
version: Fabric 0.2.1 / NeoForge 0.2.0
audience: Creators building Cobblemon NPCs and shops
tags:
  - cobblemon
  - customnpcs
  - overview
---

## What Dochi Cobblemon Editor is

`Dochi Cobblemon Editor` is a DRM addon for Fabric and NeoForge 1.21.1. It lets creators attach Cobblemon trainer battles or a single Pokémon battle to CustomNPCs NPCs, build full-screen pre-battle presentations, create Pokémon markets, healers, and starter selectors, and reuse NPC clones in the same workflow.

The addon does not imitate Cobblemon with a separate battle engine. Battles use the player's real Cobblemon party and Cobblemon 1.7.3 runtime. The intended authoring path is the DRM editor selector, `Save As`, and the NPC apply screen rather than hand-writing every JSON document.

:::note Display name and internal ID
The addon uses the display name `Dochi Cobblemon Editor` and the JAR name `dochi_cobblemon_editor-<version>-<loader>-1.21.1.jar`. The loader is `fabric` or `neoforge`. For existing-data compatibility, the internal mod ID and resource namespace remain `cobble_npc`. Do not rename existing `cobble_npc:*` IDs or data folders.
:::

## Supported environment

| Loader | Addon version | Required platform |
| --- | --- | --- |
| Fabric 1.21.1 | 0.2.1 | Java 21, Fabric Loader 0.17.2+, Fabric API 0.116.6+1.21.1+, CustomNPCs 1.0.0 |
| NeoForge 1.21.1 | 0.2.0 | Java 21, NeoForge 21.1+, compatible CustomNPCs 1.21.1 |

Both require **Cobblemon 1.7.3 to below 1.9.0 and matching-loader DRM Core 0.2.2+**. Current Fabric and NeoForge Core builds are 0.2.4. Also meet Core's Loader/API requirements where they exceed the addon's minimum.

RCT API and CobbleDollars are optional. DRM Strategy works without RCT. Every optional integration must match the loader.

| Loader | File |
| --- | --- |
| Fabric | `dochi_cobblemon_editor-0.2.1-fabric-1.21.1.jar` |
| NeoForge | `dochi_cobblemon_editor-0.2.0-neoforge-1.21.1.jar` |

Use the same build on the server and all clients. The internal mod ID/resource namespace remains `cobble_npc`. Older live-test results do not establish coverage of every current feature across all supported Cobblemon versions.

## Authoring tools

| Tool | What creators edit | What players see |
| --- | --- | --- |
| `Cobblemon Editor` | Trainer parties, single-Pokémon battles, encounters, rounds, conditions, and rewards | A confirmation prompt and a real Cobblemon battle |
| `Battle Presentation Maker` | Pre-battle layers, models, backgrounds, timeline, and audio | A full-screen presentation before the battle starts |
| `PokéMart Editor` | Sales, trades, auctions, currency, stock, and access conditions | A PokéMart screen when interacting with the NPC |
| `Nurse Joy Editor` | Healing dialogue and healing-machine linkage | A dedicated healing interaction |
| `Starter Selector Editor` | Starter cards, conditions, sounds, and success actions | A server-validated starter selection screen |
| `Clone Library` | Reusable Trainer and Pokemon NPC templates | Clone sources for DRM Core NPC Spawner |
| `Cobblemon NPC Appearance` | The Pokémon appearance of a CustomNPCs NPC | The NPC model shown in the world |

The first six tools are registered as DRM `Add-on` editors. `Cobblemon NPC Appearance` operates on a target NPC, so a CustomNPCs NPC must already exist.

## Trainer and Pokemon Itself

`Cobblemon Editor` provides two battle types.

| Type | Use |
| --- | --- |
| `Trainer` | A party of up to six Pokémon, Singles/Doubles/Triples/Lead Duel, tunable AI, up to 16 rounds, conditions, and post-battle actions |
| `Pokemon Itself` | One Pokémon with species, form, nature, moves, ball, held item, and appearance settings |

They also use different save folders. Keep trainer documents in `trainers/` and single-Pokémon documents in `pokemon_itself/`; match the `Save As` domain to the selected battle type.

## Runtime rules

- Saving a trainer or PokéMart document does not attach it to an NPC. Select the saved document and choose `Apply` in the target NPC workflow.
- Battle prompts and PokéMart screens open when a player right-clicks a CustomNPCs NPC with both hands empty.
- A DRM Dialogue or DRM NPC Shop attached to the same NPC owns normal interaction first. Use a dialogue action or another explicit route if the NPC must also start a battle.
- A PokéMart role takes priority over a normal trainer or Pokemon Itself battle prompt.
- The server is authoritative for battle progress, conditions, rewards, stock, and auctions.
- Level rules can keep authored levels, set a fixed battle level, or match the player's current party average with an offset.
- DRM Strategy exposes six 0–100 AI values plus Beginner, Standard, Expert, and Boss presets.
- Applied file-based documents track their source path; saving the same path updates the next runtime request without another Apply.

## Recommended authoring order

1. Load the basic trainer in `Cobblemon Editor` and finish a one-round, one-Pokémon battle.
2. Save a user copy with `Save As`, then apply it to a test CustomNPCs NPC.
3. Confirm that empty-hand interaction starts a real Cobblemon battle.
4. Add detection, chase, rematches, conditions, and rewards one feature at a time.
5. Build a pre-battle sequence in `Battle Presentation Maker` and assign it to the trainer.
6. Add a separate PokéMart NPC when the project needs sales, trades, or auctions.

Testing the smallest battle first makes it easier to separate party-data, NPC-application, automatic-encounter, and presentation problems.

See [Trainer Victory Quests](#drm-cobblemon-editor/cobblemon-trainer-quests) to link trainer identities and require a number of wins.

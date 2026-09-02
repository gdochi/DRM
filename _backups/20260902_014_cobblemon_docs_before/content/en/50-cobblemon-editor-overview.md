---
title: drm_cobblemon_editor Overview
slug: cobblemon-editor-overview
order: 500
description: Learn the scope, supported environment, authoring tools, and runtime rules of drm_cobblemon_editor.
product: drm-cobblemon-editor
category: Overview
section: overview
status: Draft
version: 0.1.0
audience: Creators building Cobblemon NPCs and shops
tags:
  - cobblemon
  - customnpcs
  - overview
---

## What drm_cobblemon_editor is

`drm_cobblemon_editor` is a DRM addon for Fabric 1.21.1. It lets creators attach Cobblemon trainer battles or a single Pokémon battle to CustomNPCs NPCs, build a full-screen pre-battle presentation, and create Pokémon sales, trade, and auction NPCs in the same DRM workflow.

The addon does not imitate Cobblemon with a separate battle engine. Battles use the player's real Cobblemon party and Cobblemon 1.7.3 runtime. The intended authoring path is the DRM editor selector, `Save As`, and the NPC apply screen rather than hand-writing every JSON document.

:::note Display name and internal ID
The mod list and release JAR use `drm_cobblemon_editor`. For existing-data compatibility, the internal mod ID and resource namespace remain `cobble_npc`. Do not rename `cobble_npc:*` resource IDs to `drm_cobblemon_editor:*`.
:::

## Supported environment

| Component | Requirement |
| --- | --- |
| Minecraft | Java Edition 1.21.1 |
| Fabric Loader | 0.17.2 or newer |
| Fabric API | 0.116.6+1.21.1 or newer |
| Java | 21 or newer |
| DRM | `dochi_rpg_maker` 0.1.3 or newer |
| Cobblemon | 1.7.3 or newer, below 1.8.0 |
| CustomNPCs | Fabric 1.0.0 |
| CobbleDollars | Optional; required only for the PokéMart `cobbledollars` provider |

This release targets Fabric 1.21.1. Do not mix it with Forge builds or another Minecraft version. On a normal multiplayer server, install matching DRM, Cobblemon, CustomNPCs, and `drm_cobblemon_editor` versions on the server and every connecting client.

## Authoring tools

| Tool | What creators edit | What players see |
| --- | --- | --- |
| `Cobblemon Editor` | Trainer parties, single-Pokémon battles, encounters, rounds, conditions, and rewards | A confirmation prompt and a real Cobblemon battle |
| `Battle Presentation Maker` | Pre-battle layers, models, backgrounds, timeline, and audio | A full-screen presentation before the battle starts |
| `PokéMart Editor` | Sales, trades, auctions, currency, stock, and access conditions | A PokéMart screen when interacting with the NPC |
| `Cobblemon NPC Appearance` | The Pokémon appearance of a CustomNPCs NPC | The NPC model shown in the world |

The first three tools are registered as DRM `Add-on` editors. `Cobblemon NPC Appearance` operates on a target NPC, so a CustomNPCs NPC must already exist.

## Trainer and Pokemon Itself

`Cobblemon Editor` provides two battle types.

| Type | Use |
| --- | --- |
| `Trainer` | A party of up to six Pokémon, Singles/Doubles/Triples, AI Skill, up to 16 rounds, conditions, and victory rewards |
| `Pokemon Itself` | One Pokémon with species, form, nature, moves, ball, held item, and appearance settings |

They also use different save folders. Keep trainer documents in `trainers/` and single-Pokémon documents in `pokemon_itself/`; match the `Save As` domain to the selected battle type.

## Runtime rules

- Saving a trainer or PokéMart document does not attach it to an NPC. Select the saved document and choose `Apply` in the target NPC workflow.
- Battle prompts and PokéMart screens open when a player right-clicks a CustomNPCs NPC with both hands empty.
- A DRM Dialogue or DRM NPC Shop attached to the same NPC owns normal interaction first. Use a dialogue action or another explicit route if the NPC must also start a battle.
- A PokéMart role takes priority over a normal trainer or Pokemon Itself battle prompt.
- The server is authoritative for battle progress, conditions, rewards, stock, and auctions.

## Recommended authoring order

1. Load the basic trainer in `Cobblemon Editor` and finish a one-round, one-Pokémon battle.
2. Save a user copy with `Save As`, then apply it to a test CustomNPCs NPC.
3. Confirm that empty-hand interaction starts a real Cobblemon battle.
4. Add detection, chase, rematches, conditions, and rewards one feature at a time.
5. Build a pre-battle sequence in `Battle Presentation Maker` and assign it to the trainer.
6. Add a separate PokéMart NPC when the project needs sales, trades, or auctions.

Testing the smallest battle first makes it easier to separate party-data, NPC-application, automatic-encounter, and presentation problems.

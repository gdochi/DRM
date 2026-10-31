---
title: Fabric / NeoForge 0.2.9 Update
slug: cobblemon-editor-current-update
order: 480
description: Expanded DNPC roles, position-locked movement and Sequential after-actions.
product: drm-cobblemon-editor
category: Getting Started
section: overview
status: Stable
version: Fabric / NeoForge 0.2.9
audience: Creators / Operators
---

## Current 0.2.9 changes

For Fabric / NeoForge 1.21.1 and Java 21. Existing declarations remain DRM 0.2.8+ and Cobblemon >=1.7.3 <1.9.0. The current combined patch baseline is DRM 0.3.1, DNPC 0.1.2 and Cobblemon Editor 0.2.9.

- **Sequential rewards:** choose Trainer Editor → Battle Config → After Actions → Action Mode → **Sequential**. Place rewards after dialogue to wait for normal completion. Cancellation or disconnect stops subsequent grants; interact with the NPC again to continue remaining actions. Progress survives reconnects and server restarts.
- **One dialogue:** each round permits at most one dialogue action. Older multi-dialogue rounds remain preserved but must be reduced to one before saving, applying or executing.
- **DNPC roles:** Trainer, Pokemon Itself, Pokémon appearance/poses/hitboxes, PokéMart, Nurse Joy, Starter Selector, clones, spawners and battle schedulers work without CustomNPCs.
- **Position locking:** trainers can dash and return while DNPC position locking is enabled, then restore the lock. Fixes cover repositioning conflicts, retained dash speed after interruption and NeoForge return after cancelled dialogue.

Use matching current Core, DNPC and addon patches on server and clients for this combined workflow. See [installation](#drm-cobblemon-editor/cobblemon-editor-setup) and [after-action settings](#drm-cobblemon-editor/cobblemon-trainer-editor). Earlier release notes follow.

## Earlier 0.2.7 changes

Fabric / NeoForge builds target Minecraft 1.21.1 / Java 21. They require **DRM 0.2.8+** and **Cobblemon >=1.7.3 <1.9.0**. CustomNPCs is now optional: file editing and DNPC trainers work without it. Pokemon Itself, PokéMart, Nurse Joy, Starter Selector and legacy CNPC clones retain their CustomNPCs-specific boundary.

- **Battle AI:** tracks real stat-stage changes and improves setup, screens, Trick Room, switching, gimmicks and team synergy. Fixes include unnecessary post-setup switches, repeated boosts and doubles-slot reservation errors.
- **Move selection:** choose from all registered moves; normal, event and past learnset moves sort first. Actual execution remains subject to Cobblemon and the installed provider.
- **Cobblemon 1.8.4:** normalizes empty gimmick responses and synchronizes shiny/form preview aspects. The 1.7.3 compile baseline and existing runtime bounds remain unchanged.
- **Post-battle dialogue:** choose a dialogue set in After Actions. DNPC dialogue opens after battle cleanup and return handling; it does not need a battle-start action.
- **Admin:** compatible DRM 0.2.9 exposes **Delete battle history**, separately from count reset. Deletion also removes pending rewards and granted-reward markers.

## Cobblemon versions actually exercised

| Executed on both loaders | Not separately exercised |
| --- | --- |
| 1.7.3, 1.8.0, 1.8.2, 1.8.3, 1.8.4 | 1.8.1 |

An allowed version is not necessarily a tested one. Gimmicks require compatible providers and key items; the checks do not cover every optional-mod combination. Additional fixes retain version 0.2.7, so use a build containing them.

See [setup](#drm-cobblemon-editor/cobblemon-editor-setup), [AI and items](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items) and [Admin](#core-fabric/drm-administration). The sections below describe earlier versions.

## Earlier 0.2.6 changes

Requires **DRM 0.2.8 or later**. Fixes cover post-battle hiding, unhiding on battle-count reset, detection / pursuit / dash and Pokémon appearance previews in Basic settings. An authorized editor holding the DRM Core in either hand can inspect a lifecycle-hidden NPC. This does not clear saved hiding or reveal it to other players.

Choose matching core and addon builds from [Modrinth](https://modrinth.com/mod/drm-cobblemon-editor/versions).

## Previous changes

## Previous 0.2.4 requirements

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

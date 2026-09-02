---
title: Cobblemon Editor 0.1.4 Changes
slug: cobblemon-editor-release-0-1-4
order: 490
description: User-facing changes and update notes from 0.1.3 to 0.1.4.
product: drm-cobblemon-editor
category: Getting Started
section: overview
status: Stable
version: 0.1.4
audience: Creators / Operators
tags:
  - release
  - changelog
---

## At a glance

Version 0.1.4 gives creators finer trainer difficulty controls, player-party level matching, lighter large lists, a consistent DRM interface, and much more complete Korean localization.

## Battle levels

- New `Match player party average` mode targets the player's current party average plus an offset from -99 to 99.
- The trainer party keeps its authored level gaps where possible.
- Fixed mode can affect the trainer only or both battle sides.
- These rules change battle copies only, never the player's real Pokémon levels.

## DRM trainer AI and items

- Tune Decision Quality, Battle Knowledge, Aggression, Defense, Trickery, and Switching independently from 0–100.
- Start with Beginner, Standard, Expert, or Boss, then edit any value.
- The AI profile explains difficulty, information use, style, switching, consistency, strengths, and warnings.
- Existing AI Skill, Temperament, and Knowledge values migrate to equivalent new settings.
- Item use now has presets plus priority, healing threshold, boost turn limit, and separate Revive, status-cure, and PP-recovery controls.
- Invalid AI choices continue with a valid server action instead of stalling the battle.

## Editors and large lists

- Cobblemon screens now share the DRM Core panel, topbar, button, field, card, and scrollbar style.
- Pokémon pickers, item catalogs, Clone Library, RCT imports, and presentation images support search and paging.
- Presentation thumbnails load as needed.
- PokéMart searches and pages products, trades, owned Pokémon, listings, selling choices, and claims on the server.
- Untouched default PokéMart and Starter Selector GUIs upgrade to the DRM sprite style; customized GUI files are preserved.

## Dialogue and clones

- DRM Dialogue can open a specific Starter Selector JSON or the selector bound to the current NPC with `go_starter_selector`.
- Clone Library uses server-side search and paging and asks before overwriting a duplicate Clone ID.

## Update notes

- Requires DRM Core `0.1.7+`.
- Targets Minecraft `1.21.1`, Cobblemon `1.7.3 to below 1.8.0`, and CustomNPCs Fabric `1.0.0`.
- JAR: `dochi_cobblemon_editor-0.1.4-fabric-1.21.1.jar`.
- The internal mod ID and resource namespace remain `cobble_npc` for existing-data compatibility.
- Trainer/Pokemon Itself schema is `20`; Trainer Brain schema is `4`. Supported older documents still load.
- Replaced untouched defaults are backed up under `config/dochi_rpg_maker/cobblemon/_migration_backups/`.

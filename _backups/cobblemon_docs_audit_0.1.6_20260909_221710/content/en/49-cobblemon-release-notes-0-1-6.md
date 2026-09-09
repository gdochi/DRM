---
title: Cobblemon Editor 0.1.6 Changes
slug: cobblemon-editor-release-0-1-6
order: 490
description: Battle rules, compatibility, editor, and runtime changes in version 0.1.6.
product: drm-cobblemon-editor
category: Getting Started
section: overview
status: Stable
version: 0.1.6
audience: Creators / Operators
tags:
  - release
  - changelog
---

## At a glance

Version 0.1.6 reorganizes battle settings into common and per-round rules and supports Cobblemon 1.7.3 and 1.8.0 with one JAR. It also adds trainer battle sounds and corrects learnable-move lists, item enforcement, spread-move AI evaluation, editor state, and shared DRM navigation.

## Installation and compatibility

- Minecraft 1.21.1, Java 21, Fabric Loader 0.17.2+, Fabric API 0.116.6+1.21.1+
- Required: DRM Core 0.1.9+, Cobblemon 1.7.3 to below 1.9.0, CustomNPCs Fabric 1.0.0
- Optional by feature: CobbleDollars, RCT API 0.15.1-beta+, FTB Quests, Mega Showdown, and other compatible integrations
- JAR: `dochi_cobblemon_editor-0.1.6-fabric-1.21.1.jar`

RCT API remains optional. Absence or call failures fall back at the addon's boundary instead of making RCT a required runtime dependency. Replace the 0.1.6 JAR on both the server and all clients.

## Round-focused battle rules

- Open battle rules from `Rounds`, then choose `Common Rules` or an explicit round from 1–16.
- Each round can inherit the common rules or keep an independent override.
- Formats include Singles, Doubles, Triples, and Lead Duel.
- Level modes include authored levels, player-party average plus offset, and fixed levels with scope.
- Item rules cover battle/held-item permission, a searchable blocked list, use limits, minimum turns, and target-HP caps.
- Pokémon and mechanic rules cover Legendary restrictions, lead selection, and Mega/Tera/Dynamax permission.

Clicking an item catalog row immediately blocks or allows it. The server enforces battle items, revives, and capture items before consumption; creative players still follow use limits. Lead Duel creates one-Pokémon Singles parties without deleting the authored parties.

NPC gimmick equipment and battle rules are separate. Equipment configures the round's NPC and key item; the battle rule controls whether the mechanic is permitted for both sides.

## Battle sounds

Trainer battles can play one sound once per battle at each configured remaining-Pokémon count from 1–6. Define common rules, then let each round inherit, replace, or disable them. The editor provides sound-ID search and preview, volume 0–4, pitch 0.05–4, and an option to stop current battle audio before the new sound.

## Pokémon, AI, and editor fixes

- Move pickers show only the server-resolved learnable moves for the selected species, form, and aspects.
- Explicit sets of one to four moves keep their exact count and order in preview and battle.
- DRM AI now evaluates damage, typing, STAB, multiple targets, and ally damage for spread and automatic-target moves such as Earthquake and Rock Slide.
- Battle/general inventory drafts survive search, paging, and resize; long move labels, previews, and page-button states were corrected.
- Shared Back and Forward arrows and hover help now use DRM Core 0.1.9's shared history and UI APIs.

## Data contracts

- Trainer JSON schema: `22`
- Pokemon Itself JSON schema: `8`
- Trainer Brain schema: `4`
- Internal mod ID and resource namespace: `cobble_npc`

Supported older JSON and NBT data are normalized to current fields. Back up `config/dochi_rpg_maker/cobblemon/` together with the world before updating.

---
title: 0.1.2 — unchanged cards and stability
slug: version-0-1-2
order: 1580
description: Zero new or rebalanced cards, UI and server stability work, and later 26.3 uploads.
product: mwent
category: Release history
section: releases
status: Public release record
version: 0.1.2
audience: Players / server operators
---

## Public upload

CurseForge received [Fabric 1.21.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309263), [NeoForge 1.21.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309269) and [Forge 1.20.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309265) on October 24, 2026. The same 0.1.2 release gained [Fabric 26.3](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9317314) and [NeoForge 26.3](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9317311) uploads on October 25.

## Card additions and changes

| Comparison | 0.1.1 → 0.1.2 |
| --- | --- |
| Added / removed cards | Zero / zero |
| Built-in definitions | 263 → 263 |
| Optional-mod definitions | 89 → 89 |
| Regular and animated prints | 704 → 704 |
| Power, provisions, frame or rarity changes | Zero |
| Deploy, Order, keyword or appearance-reference changes | Zero |

These values compare the final built-in and optional catalogs from the **actual uploaded Fabric 1.21.1 JARs**, rather than estimating history from today's source. With no added cards, the [0.1.1 baseline](#mwent/version-0-1-1) continues.

## Gameplay and server stability

The 0.1.2 implementation records confirm repairs to overlapping deck-selection toolbar controls, player-skin display in table lobbies and villager previews on unassigned AI screens. Starting an unassigned AI profile remains disabled.

Server work reduces repeated state copies and duplicate same-tick broadcasts, suppresses unnecessary broadcasts for invalid PvP inputs, distributes AI decisions across ticks and stops unchanged periodic broadcasts after matches finish. These are processing and display improvements rather than card power or provision buffs and nerfs.

The 26.3 upload is a separate Java 25 target. Do not substitute a 1.21.1 file for it. Historical artifact comparison does not establish runtime compatibility with arbitrary external-mod combinations.

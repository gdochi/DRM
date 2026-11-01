---
title: Place a Table and Play
slug: minigames-setup
order: 1300
description: Open a minigame and choose its rules, entry fee and rewards.
product: dochi-minigames
category: Start
section: setup
status: Usage guide
version: 0.1.5
audience: Creators / server operators
---

## Play a round first

Place a [minigame table](#dochi-minigames/minigames-tables) and choose a game. DRM is not required.

Creators can open `/minigame editor`, load a preset and **Apply to table**. Players right-click the table to join.

## Available games

Choose Monty Hall, slots, memory, whack, timing, high-low, shooting or the **MWENT** card game. Use [game rules](#dochi-minigames/minigames-rules-rewards) to set play and rewards. MWENT has its own [getting-started guide](#mwent/start).

## Make it your game

1. Load a preset in the editor.
2. Change its title, time limit and rules.
3. Choose an entry fee and rewards. A fee of 0 is free.
4. Use **Save As** to keep your game.
5. Apply it to the table that will use it.

Payment happens when the player presses **Start** in the entry screen. Cancelling that screen is free; closing an already-started game counts as forfeiting.

## Open it from an NPC or dialogue

With DRM, use **NPC Apply → Minigames** to give an NPC a game.

For dialogue-only access, use a **Go Minigames** choice action instead of applying the game directly. A directly applied game opens before dialogue.

## Choose installation files

| Minecraft | Loader | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

This guide follows 0.1.5. Match versions/loaders on server and clients; Fabric also needs Fabric API. DRM money or Cobblemon rewards need their respective mods.

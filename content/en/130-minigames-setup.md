---
title: Place a Table and Play
slug: minigames-setup
order: 1300
description: Open a minigame and choose its rules, entry fee and rewards.
product: dochi-minigames
category: Start
section: setup
status: Usage guide
version: 0.1.6
audience: Creators / server operators
---

## Play a round first

Place a [minigame table](#dochi-minigames/minigames-tables) and choose a game. DRM is not required.

Creators can open `/minigame editor`, load a preset and **Apply to table**. Players right-click the table to join.

### Try A Round From The Editor

These English screens are from **Minigames 0.1.5 / NeoForge 1.21.1**. Choose an example under **Presets**, then inspect the editor.

![Minigame editor with game types on the left, a Monty Hall preview in the middle, and title, time and fee settings on the right.](assets/media/guides/minigames-015-neo1211/minigames-editor.png "Choose a game on the left and configure its Inspector on the right. The middle is a design preview; Test play opens the playable screen.")

1. Select **Monty Hall** on the left.
2. Set its title and **Time (s)** under **General**. **Entry fee → 0** is free.
3. Choose door rules under **Rules**, items under **Symbols**, and prizes under **Rewards**.
4. Press **Test play** at the top. Pick a closed door; once losing doors are revealed, choose whether to keep your original door or switch.

![Monty Hall's playable Test play screen, showing three closed doors, score and remaining time.](assets/media/guides/minigames-015-neo1211/minigames-test-play.png "Test play uses no entry fee or rewards. After checking gameplay, test entry confirmation and settlement at the actual table separately.")

## Available games

Choose Monty Hall, slots, memory, whack, timing, high-low, shooting or the **MWENT** card game. Use [game rules](#dochi-minigames/minigames-rules-rewards) to set play and rewards. MWENT has its own [getting-started guide](#mwent/start).

**0.1.6 adds [Item Roulette](#dochi-minigames/minigames-roulette)** alongside the existing games, with its own prizes and odds.

## Make it your game

1. Load a preset in the editor.
2. Change its title, time limit and rules.
3. Choose an entry fee and rewards. A fee of 0 is free.
4. Use **Save As** to keep your game.
5. Apply it to the table that will use it.

Payment happens when the player presses **Start** in the entry screen. Cancelling that screen is free; closing an already-started score game counts as forfeiting. Default Spin on block roulette starts and charges on the machine click without an entry window, and retains its draw and prize; follow the [roulette guide](#dochi-minigames/minigames-roulette).

## Open it from an NPC or dialogue

With DRM, use **NPC Apply → Minigames** to give an NPC a game.

For dialogue-only access, use a **Go Minigames** choice action instead of applying the game directly. A directly applied game opens before dialogue.

## Choose installation files

| Minecraft | Loader | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

This guide follows 0.1.6. Earlier 0.1.5 screenshots retain their version captions. Match versions/loaders on server and clients; Fabric also needs Fabric API. DRM money or Cobblemon rewards need their respective mods.

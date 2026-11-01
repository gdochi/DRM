---
title: Game Rules and Rewards
slug: minigames-rules-rewards
order: 1310
description: Game settings, entry confirmation, score thresholds and item or Pokémon rewards.
product: dochi-minigames
category: Authoring
section: rules
status: Usage guide
version: 0.1.6
audience: Game creators
---

## Rules by game

| Game | Player flow | Authoring checks |
| --- | --- | --- |
| Monty Hall | Pick a door → losing doors revealed → stay or switch | Use 3–8 doors and prepare symbols and winning rewards. |
| Slots | Entry confirmation → lever → stop three reels | Set automatic/manual stopping, symbols, spin interval and stop times. |
| Memory | Initial reveal → select two cards → match every pair | Use 2–10 rows/columns and an even card count, with a distinct symbol for each pair. |

The time limit is 5–3600 seconds. Memory's easy, normal and hard presets use 2×2, 6×6 and 10×10 boards. A 10×10 board needs 50 distinct symbols. Use **Find** next to a symbol ID to browse DRM's item catalog.

Automatic slot stop times must increase from the first reel to the third, with the last stop inside the time limit. At normal game speed, 20 ticks equal one second.

### Slot Stop Times

Open **Slots → Rules**. This is the **Minigames 0.1.5 / NeoForge 1.21.1** editor. With **Auto stop** enabled, **Reel 1 tick / Reel 2 tick / Reel 3 tick** controls when each reel stops. The pictured `20 / 40 / 60` means one, two and three seconds at normal speed. **Spin interval** is the delay between symbol changes while spinning.

![Slots Rules with Auto stop enabled and reel stop times of 20, 40 and 60 ticks.](assets/media/guides/minigames-015-neo1211/minigames-slots.png "Increase stop times from the first reel to the third. The slot image in the middle is a design preview.")

### Memory Board Size

Under **Memory → Rules**, **Rows / Columns** sets the board size. The pictured `4 × 4` board needs sixteen cards and eight distinct symbols. **Reveal ticks** sets the initial reveal; **Mismatch ticks** sets how long an incorrect pair stays visible before hiding again.

![Memory Rules with a four-by-four board, Reveal ticks and Mismatch ticks, with eight pairs visible in the design preview.](assets/media/guides/minigames-015-neo1211/minigames-memory.png "Check Symbols after enlarging the board. Card size is adjusted through the board settings in Open GUI Maker below Rules.")

## Roulette uses a separate prize list

[Item Roulette](#dochi-minigames/minigames-roulette) chooses one prize using Prize slots items, quantities and weights. The score thresholds and forfeiting rules below describe the existing score games. Roulette retains an already-started paid draw after closing; Play again starts another draw immediately.

## Entry fee

Set the provider, ID and amount in General.

| Provider | Configuration |
| --- | --- |
| `item` | Item ID to consume |
| `drm` | Currency ID registered in DRM Currency Editor |
| `cobbledollars` | Configuration using the installed CobbleDollars provider |

An amount of `0` is free. Clicking an NPC or Replay does not charge a fee: the player must confirm Start. Cancel is free; insufficient balance prevents starting. Confirmation expires after 60 seconds. Closing a paid, started game abandons it.

## Thresholds and reward policy

Set each reward's required score and quantity, then choose how eligible rewards are selected.

| Policy | Result |
| --- | --- |
| `highest` | All rewards at the highest reached threshold |
| `cumulative` | All rewards at every reached threshold |
| `random` | One randomly selected eligible reward entry |

Item rewards grant the configured item. Symbol rewards use the game's selected result symbol, such as the matching slot symbol. With Cobblemon installed, **Pokémon Settings** provides species, level, shiny, gender, form, nature, ability, ball, held item and extra properties. Levels are 1–100; a full party sends the Pokémon to the PC.

Referenced items, symbols and Pokémon rewards are checked before payment. The server owns scores, hidden answers, payment and grants. Each session settles once. Item rewards that do not fit in the inventory are dropped; inspect notifications and server logs for grant errors. Failed grants are not automatically retried.

After saving, check both free editor test play and the actual entry-confirmation flow. [NPC and dialogue bindings](#dochi-minigames/minigames-setup) are covered on the start page.

## Additional games

| Game | Play and authoring |
| --- | --- |
| Whack-a-Mob | Hit emerging targets, avoid traps; configure models and timing. |
| Timing | Stop inside the success zone; configure rounds, speed and shrinking windows. |
| High-Low | Predict the next card or cash out a streak. Ties retry; wrong guesses / timeouts lose the accumulated score. |
| Shooting Gallery | Aim at differently sized targets and avoid explosive traps; configure weapon models, ammo, reload, fire interval and scores. |
| MWENT | Factions, leaders, decks and round strategy; see [MWENT](#mwent/start). |

Without DRM, use free or item entry and item rewards. DRM currencies / conditions and other integrated rewards require their providers.

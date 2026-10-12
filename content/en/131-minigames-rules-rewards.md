---
title: Game Rules and Rewards
slug: minigames-rules-rewards
order: 1310
description: Game settings, entry confirmation, score thresholds and item or Pokémon rewards.
product: dochi-minigames
category: Authoring
section: rules
status: Usage guide
version: 0.1.0
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

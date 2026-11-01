---
title: 0.1.6 — Use opening tactics
slug: version-0-1-6
order: 1610
description: Choose one of five tactics and use its real first-round battlefield socket.
product: mwent
category: Release history
section: releases
status: Guide
version: 0.1.6
audience: Players / server operators
---

## Choose before the match

An opening tactic is a **one-use tool for the player going first in round one**. Open its list below the leader in the deck builder. From a preset, follow **Use this deck → choose a tactic → Begin match**. Saving your deck preserves its tactic choice for later loading.

![Five opening tactics in the deck builder.](assets/media/guides/minigames-016-neo1211/mwent016-tactic-options.png "Minigames 0.1.6 / NeoForge 1.21.1, English UI. Choose below the leader. The final option, Golem seal core, transforms in its own socket rather than boosting an ally.")

| Tactic | Result | Before using it |
| --- | --- | --- |
| Golden apple altar | Give an ally +5 power | Have an ally on the board first. |
| Guardian shield | Give an ally +2 power and Shield | Prepare points and protection from one damage event. |
| Ironwork cache | Give an ally +4 Armor | Armor itself does not add score. |
| Field supply chest | Gain 4 Supply | Pair it with abilities that spend Supply. |
| Golem seal core | Transform into a 4-power Iron Golem token in the same socket | No separate empty-socket selection is needed. |

## Use it in round one

If the coin toss makes you the first player, the tactic occupies **one of your nine real melee-row sockets**. It adds no score but takes space, leaving eight sockets for other cards while unused. The second player receives no tactic.

![A Golem seal core occupying the center of the first player's melee row.](assets/media/guides/minigames-016-neo1211/mwent016-golem-installed.png "Before transformation in the same 0.1.6 run. Your score is zero and the seal device occupies the center socket. The purple shortcut at bottom-left shows one available use.")

On your turn, click **the tactic on the board or its shortcut at bottom-left**. Boost, Shield and Armor tactics then ask for an ally target. Supply and Golem resolve without another target. This is separate from playing one hand card, but it counts as an action: you cannot immediately pass on the same turn after using it.

![The same socket now contains a 4-power Iron Golem.](assets/media/guides/minigames-016-neo1211/mwent016-golem-transformed.png "After clicking the real tactic shortcut. The center socket in the same row becomes a 4-power Golem, your score becomes four, and the one-use tactic indicator disappears. The hand remains intact.")

The altar, shield, cache and supply chest disappear when used, freeing their socket. Golem **reuses the tactic's occupied socket**, so it can transform even in a full row. The transformed Golem participates in score, damage and Consume as an ordinary unit, but has no Deploy or Order. It is a Doomed token and leaves neither a graveyard card nor Morga remains.

Unused tactics disappear during first-round cleanup. They are not drawn, crafted or stored as collectible cards, so they are excluded from the [424-definition catalog](#mwent/card-catalog).

## Related changes

The 0.1.6 production artifact preserves the 335 built-in and 89 optional definitions recorded in [0.1.5](#mwent/version-0-1-5). Five tactic choices do not mean five new collectible cards. The same Minigames update adds [Item Roulette](#dochi-minigames/minigames-roulette), a separate game that needs no connection to a MWENT deck.

This guide checks local 0.1.6 production files dated November 1. [Release history](#mwent/releases) distinguishes those from verified public uploads. Continue with [how to play](#mwent/how-to-play) or [collections and decks](#mwent/cards-decks).

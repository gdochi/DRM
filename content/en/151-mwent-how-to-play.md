---
title: How to play MWENT
slug: how-to-play
order: 1510
description: Mulligans, placement, Orders, passing, scoring and round transitions.
product: mwent
category: Playing
section: play
status: Guide
version: 0.1.5
audience: Players
---

## Victory and the battlefield

Win **two rounds** in a match lasting up to three rounds. Each player has front and back rows with nine fixed sockets per row. Your score is the current power of units remaining on your board. Armor, Shield and Supply do not directly add points. The scenarios, locations and traps introduced in 0.1.5 occupy sockets without adding unit power.

When both players pass, compare scores. The higher score earns a round win; a tied round gives both players a win. The whole match can therefore finish as a draw.

## 1. Select a deck and mulligan

Check your faction, deck and leader. Draw ten cards at the start. A coin toss chooses the starting player. The first player can replace up to three cards in the opening mulligan; the second can replace up to two. Replacements are optional. Continue starts the battle.

Later rounds draw up to three cards while the deck has cards left. The hand limit is ten. Draws blocked by a full hand add to that round's two base mulligan opportunities. The previous round's winner starts the next round.

## 2. Play a card on your turn

1. Select a hand card. Right-click first to inspect its abilities and current status.
2. Place units in a legal empty socket. Rows and immediate neighbors can affect abilities.
3. Resolve targeted abilities by choosing a highlighted legal target.
4. Use available Orders and leader abilities, then press **End Turn**.

A normal turn plays one card from hand. Summons and additional plays created by abilities follow those abilities. **Playing** a card spends a real hand card; **summoning** puts a unit on the field through an effect. Summons normally do not retrigger Deploy or abilities requiring a card to be played.

## 3. Orders and leaders

**Deploy** triggers when a card is played. **Order** is activated manually on a card already in play. Check charges, Cooldown, Supply costs and Lock. Without Zeal, a unit cannot immediately use its Order on the turn it enters. Leader abilities have separate usage counts and do not count as hand cards.

For example, Crew needs armored allies in both immediately adjacent sockets of the same row. It can recharge an exhausted Order or reduce remaining Cooldown at your turn end. Two armored allies elsewhere in that row are insufficient.

## 4. Decide when to pass

**Pass** gives up your remaining turns for the current round. Your opponent can keep playing; you cannot return on a later turn in that round. Choose it before playing a card or taking another action on your turn.

| Situation | Consider |
| --- | --- |
| Opponent has passed | Gain only the points needed to lead and preserve cards. Turn-end effects can still change the score. |
| Catching up costs many cards | Compare conceding the round with spending resources needed in the next one. |
| Orders or growth engines are ready | Weigh another turn's points against the opponent's removal options. |

Round transitions normally clear the board and preserve the remaining hand. Cards with Resilience and other exceptions follow their own text. Round cleanup is distinct from destruction and does not automatically trigger Deathwish.

## Common statuses

| Status | Effect |
| --- | --- |
| Armor / Shield | Armor normally absorbs damage first; Shield blocks one damage event. |
| Poison | Two Poison applications destroy the unit. |
| Bleeding / Vitality | At the unit owner's turn end, deal one damage / add one power and reduce the duration. Bleeding ignores Armor. |
| Lock / Purify | Lock disables Orders and passive abilities. Purify removes removable statuses rather than Armor. |
| Doomed | The unit does not remain in the graveyard when leaving the board. Check resurrection and token restrictions. |

## Timers and leaving

Normal matches use 60-second turns, 20-second mulligans and five-second round transitions. On timeout, the server resolves pending targets and discards one hand card if none was played, then ends the turn. Lessons have no timer.

Esc closes an open card detail first. Confirming departure from a running match forfeits it. PvP also forfeits on disconnect, death, dimension change or moving more than 64 blocks from the table. Closing a screen or reading guidance does not pause the normal server timer.

Rotation, zoom and 3D / card-display preferences share the same server rules. Continue with [factions](#mwent/factions) and [deck building](#mwent/cards-decks).

## Battle music

Default music follows the player's deck faction from the coin toss and mulligan. An explicit game-profile music choice takes precedence. Play/Stop and volume controls are left of Rulebook. Silent 0% keeps playback position; playing after Stop restarts the track. Preferences are local and do not edit server game JSON or global Minecraft volume.

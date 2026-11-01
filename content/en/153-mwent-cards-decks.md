---
title: Collections and deck building
slug: cards-decks
order: 1530
description: Vault deposits, regular and animated prints, rarities and deck requirements.
product: mwent
category: Factions and cards
section: cards
status: Guide
version: 0.1.6
audience: Players
---

## Acquire and store cards

Collect physical cards and packs distributed by the server. Merchant and chest acquisition depends on server settings; operators can use the [acquisition guide](#mwent/acquisition). Receiving a card is separate from depositing it in the vault.

With an empty cursor, right-click a card stack in your inventory or a chest to deposit its quantity. Open the vault with default key **V**, which can be rebound. Withdraw cards to obtain physical items again.

Deck building adds owned quantities in the vault and player inventory. Chests and other players' cards are excluded. Adding cards to a deck or using them in a match does not consume them. Cards reserved during preparation or play cannot be withdrawn from the vault.

## Regular and animated prints

Regular and animated prints are separate physical items and owned counts, but share the same card's deck-copy limit. Animation does not improve combat stats.

**Rarity** has four values: Common, Rare, Epic and Legendary. The **Bronze / Gold frame** determines the duplicate limit. Do not infer that limit from rarity alone.

## Create a deck

![The preparation deck browser, with preset filters on the left and Companion Chorus cards, counts and provisions on the right.](assets/media/guides/minigames-015-neo1211/minigames-mwent-play.png "Test play in Minigames 0.1.5 / NeoForge 1.21.1. Use this deck opens preparation with the selected deck; My decks finds your saved decks.")

1. Open **My Decks → New Deck** from the vault, encyclopedia or battle preparation.
2. Choose a faction and check the leader and provision limit.
3. Add faction or neutral cards, name the deck and save it.
4. Select the saved deck before a match. Fix incomplete requirements or missing owned copies first.

In 0.1.6 preparation, also choose one of [five opening tactics](#mwent/version-0-1-6). It is separate from hand cards and is placed for the player who wins the first-player coin toss.

| Requirement | Complete deck |
| --- | --- |
| Cards | 25–40 |
| Units | At least 13 |
| Provisions | At most 150 plus the selected leader's bonus |
| Same Gold card | At most one |
| Same Bronze card | At most two |
| Ownership | At most the combined vault and inventory quantity |
| Faction | Chosen faction and neutral |

Save up to sixteen decks. Incomplete drafts can be saved but cannot automatically enter a match. Changing faction clears the composition and requires a new leader; changing only the leader preserves cards and rechecks the new limit.

![Deck preparation with faction, leader and provisions on the left, plus/minus card controls on the right and Begin match above.](assets/media/guides/minigames-015-neo1211/minigames-mwent-mulligan.png "Adjust counts with + / −, check total cards, units and Provisions, then Begin match. This is deck preparation, before the opening-hand redraw.")

## Encyclopedia and inspection

The encyclopedia grants or consumes no cards. Select cards to read names, factions, rarity, power, provisions and abilities. Right-click in battle for details. Distinguish base values from current values affected by damage or boosts.

Unowned cards can still be inspected. An optional card appearing in the list does not mean it can be played without its provider. The current catalog contains 335 built-in definitions and 89 optional-mod definitions; actual availability depends on installed mods and assets. Unused custom-card slots are excluded from these counts.

Use the [specification catalog](#mwent/card-catalog) for card values and abilities and the [release history](#mwent/releases) for additions and changes.

## If a DNPC card model is missing

Since 0.1.5, DNPC Gecko model settings are read and temporary previews created during asset loading are refreshed. The model, assets and optional rendering libraries must be available; a catalog entry does not install the integration.

---
title: MWENT card acquisition
slug: acquisition
order: 1545
description: Configure merchant trades, chest loot, weighted pools and profile activation.
product: mwent
category: MWENT card acquisition
section: authoring
status: Guide
version: 0.1.6
audience: Creators / server operators
---

## Open the editor

Minigames **0.1.6** supports physical cards and packs in villager/wandering-trader offers and generated chest loot. DRM is optional.

1. Open Minigames settings and choose **Edit MWENT**.
2. Choose **General / Merchant trades / Chest rewards / Product pools** on the left.
3. Select a rule and edit its values in the middle.
4. Choose cards, packs or loot-table targets on the right.
5. Use topbar **Apply** to activate the draft.

While connected, you edit server settings with operator level 2. Outside a world, edits target local files for the next startup. Item pickers are unavailable there, but existing IDs, values and weights remain editable.

## Rule types

![Acquisition master switch and separate trade/chest switches.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-general.png "Minigames 0.1.6 / NeoForge 1.21.1. Enabled is the master switch; the next three control villagers, wandering traders and natural chests separately. Server draft means edits still need the topbar Apply.")

| Category | Contents |
| --- | --- |
| Merchant trades | Profession/level, pool, payment item, price range, count, stock and experience |
| Chest loot | Included/excluded loot-table IDs, pool, chance, rolls and count |
| Card pools | Automatic/optional cards, factions, rarity, edition, weighted explicit cards/packs and exclusions |

Payment uses physical items such as emeralds, separately from account-based DRM/CobbleDollars payments. Card/exclusion pickers show MWENT cards only and do not consume inventory items.

## Read a merchant rule

Choose a rule under **Merchant trades**. Set profession, level, product pool and payment item in the middle. Minimum and maximum price are payment-item quantities. **Items per offer** is the product quantity received per trade.

![Profession, price range and quantity for Librarian cards.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-trades.png "Minigames 0.1.6 / NeoForge 1.21.1. This example uses librarian level 2, a price of 6–12, one product per offer and stock 12 before restocking. Cards, Packs and Excluded on the right edit the pool's explicit products and exclusions.")

## Add a card to dungeon loot

1. Enable acquisition and chest loot in General.
2. Add and enable a Chest Loot rule.
3. Choose a pool, chance `0.2`, one roll and count `1–1`.
4. Select loot table `minecraft:chests/simple_dungeon` and Apply.
5. Check a dungeon chest whose loot has not yet been generated.

This adds one pool-selected card or pack with a 20% chance per eligible chest. Previously opened chests do not reroll. Pool weights choose the product; they do not set the chest chance.

`minecraft:chests/village/*` targets vanilla village loot. Modded Pokémon Centers need their own loot-table IDs. `minecraft:chests/` alone is not a recursive match. The default village card rule's 18% is per eligible chest, not per village.

![Editing chest chance and target loot tables.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-chests.png "Minigames 0.1.6 / NeoForge 1.21.1. The pictured default Exploration cards uses 0.18, one roll and count 1–1. Set Chance per roll to 0.2 for the 20% example above. Targets includes tables; Excluded removes them.")

## Choose the available products

Edit the pool referenced by trades and chests under **Product pools**. **Card edition**, **Rarity filter** and **Faction filter** constrain the available cards. Use Cards and Packs on the right for explicit entries. Editing a pool affects every rule using that pool.

![Automatic cards, integrations, edition and filters in Standard cards.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-pools.png "Minigames 0.1.6 / NeoForge 1.21.1. A pool chooses the available products. Chest rewards separately decides the probability and number of rolls from that pool.")

## Profiles versus activation

Files live under `config/dochi_minigames/`.

- `acquisition.json`: active acquisition settings
- `acquisition_profiles/<name>.json`: saved full-rule profile

| Action | Meaning |
| --- | --- |
| Load / Save / Save As | Load a draft or preserve a profile |
| Apply | Validate and store the active policy |
| Cancel / Esc | Discard the editor's unapplied draft |

The bundled `default.json` profile installs only when missing. Save custom profiles under a different name. Loading or saving a profile does not activate it.

For external file edits, use `/minigame acquisition reload`. Ordinary `/reload` does not reread this configuration. Invalid edits retain the last working policy. **On 26.3, native trade definition changes, including prices, stock, professions and new rules, require world reconnect or server restart.**

Existing trades and granted items remain unchanged. New offers join existing candidate pools and are not guaranteed on every merchant. Acquisition settings do not create structures or chests. Granting a physical card does not simultaneously register it in card storage.

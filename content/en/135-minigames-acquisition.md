---
title: MWENT card acquisition
slug: minigames-acquisition
order: 1320
description: Configure merchant trades, chest loot, weighted pools and profile activation.
product: dochi-minigames
category: MWENT card acquisition
section: mwent
status: Guide
version: 0.1.3
audience: Creators / server operators
---

## Open the editor

Minigames **0.1.3** adds physical cards and packs to villager/wandering-trader offers and generated chest loot. DRM is optional.

1. Open Minigames settings and choose **Edit MWENT**.
2. Choose General, Merchant Trades, Chest Loot or Card Pools on the left.
3. Select a rule and edit its values in the middle.
4. Choose cards, packs or loot-table targets on the right.
5. Use topbar **Apply** to activate the draft.

While connected, you edit server settings with operator level 2. Outside a world, edits target local files for the next startup. Item pickers are unavailable there, but existing IDs, values and weights remain editable.

## Rule types

| Category | Contents |
| --- | --- |
| Merchant trades | Profession/level, pool, payment item, price range, count, stock and experience |
| Chest loot | Included/excluded loot-table IDs, pool, chance, rolls and count |
| Card pools | Automatic/optional cards, factions, rarity, edition, weighted explicit cards/packs and exclusions |

Payment uses physical items such as emeralds, separately from account-based DRM/CobbleDollars payments. Card/exclusion pickers show MWENT cards only and do not consume inventory items.

## Add a card to dungeon loot

1. Enable acquisition and chest loot in General.
2. Add and enable a Chest Loot rule.
3. Choose a pool, chance `0.2`, one roll and count `1–1`.
4. Select loot table `minecraft:chests/simple_dungeon` and Apply.
5. Check a dungeon chest whose loot has not yet been generated.

This adds one pool-selected card or pack with a 20% chance per eligible chest. Previously opened chests do not reroll. Pool weights choose the product; they do not set the chest chance.

`minecraft:chests/village/*` targets vanilla village loot. Modded Pokémon Centers need their own loot-table IDs. `minecraft:chests/` alone is not a recursive match. The default village card rule's 18% is per eligible chest, not per village.

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

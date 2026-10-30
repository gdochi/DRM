---
title: Configure tables, cards and packs
slug: authoring
order: 1540
description: Operator table mappings, custom cards, card packs and owned storage paths.
product: mwent
category: Operations and authoring
section: authoring
status: Guide
version: 0.1.5
audience: Creators / server operators
---

## Map a game to a table

Operators can Shift-right-click a table with an empty hand to select a saved MWENT game or built-in profile. Multiple tables can reuse one game ID. Mapping does not require a new JSON for every block. Player deck selection is separate from shared operator game settings.

The current game editor manages rules, start conditions, rewards, presentation and built-in AI selection. Configure victory rewards in the Rewards tab. Default AI practice is free and unrewarded. The server checks start conditions, reward recipients and outcomes. References to DRM currencies, conditions or actions require their provider.

## Create a custom card in 0.1.5

1. Open **MWENT Table → Card Editor** or **Mods Config → Minigames → Custom Cards → Card Editor**. `/minigame cards` is another entry.
2. Create a card or use **Save As** to copy an existing card into the custom library.
3. Set faction, frame, rarity, power, provisions, model and equipment.
4. Configure trigger → conditions → target → operations → costs and limits.
5. Save, connect the card to collections, decks, packs or acquisition pools, and verify it in a battle.

Saving registers a definition; it grants neither physical items nor owned copies. Cosmetic variants of existing cards share the original's ownership and duplicate limits and retain its combat values. Running matches retain the definitions they started with.

Each card supports up to twelve abilities, with eight conditions and eight operations per ability. Connect Deploy, Order, turn end, destruction, movement, healing and card-play events. Direct target selection is used for Deploy and Order; automatic triggers use selections such as all or random. Scenarios, locations, traps and chapters can also be authored.

## Siege models and optional providers

0.1.5 includes original ballista, trebuchet, cannon, autoloader, powered ballista, autocannon and supply-wagon models. Select a machine model in an entity card's appearance. Basic models and abilities work without Create or Big Cannons. Compatible palettes use actual installed assets; card combat does not require world machinery or a power network.

DNPC clone appearances are optional. Save a fallback entity so missing providers or templates restore the default model. Clone AI, jobs, inventories and combat stats do not become card rules.

## Make card packs

The pack editor controls fixed cards, weighted pools, quantities, final card choices and appearance. Check whether recipients can use the selected cards. The server owns opening results. Connect merchant and chest distribution through [acquisition settings](#mwent/acquisition).

## Storage reference

| Location | Content |
| --- | --- |
| `config/dochi_minigames/games/mob_battle/` | Reusable MWENT game / AI mappings |
| `config/dochi_minigames/cards/custom_card_<number>.json` | 0.1.5 custom card definitions |
| `config/dochi_minigames/card_packs/` | Card pack definitions |
| `config/dochi_minigames/acquisition.json` | Active acquisition settings |
| `<world>/data/dochi_minigames/cards/` | Per-player vault quantities |
| `<world>/data/dochi_minigames/decks/` | Per-player saved decks |

Minigames owns games, cards and packs even with DRM installed. Use Save As for custom files before mapping them. Legacy `table_<32 hex>` files remain read-compatible in `config/dochi_minigames/internal/tables/`; new blocks do not automatically create them. DRM GUI Maker layouts are separate from game rules.

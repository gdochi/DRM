---
title: File Paths and Troubleshooting
slug: cobblemon-files-troubleshooting
order: 550
description: Find addon JSON files, protect defaults, understand NPC interaction priority, and run release checks.
product: drm-cobblemon-editor
category: Operations
section: operations
status: Draft
version: 0.1.0
audience: Server operators and content publishers
tags:
  - paths
  - troubleshooting
  - release
---

## Save-path map

All server-edited JSON starts under `config/dochi_rpg_maker`.

| Path | Content |
| --- | --- |
| `cobblemon/trainers/` | Trainer parties, rounds, encounters, conditions, and rewards |
| `cobblemon/pokemon_itself/` | Single-Pokémon battles and NPC appearance |
| `cobblemon/battle_presentations/` | Pre-battle timeline presentations |
| `cobblemon/pokemarts/` | Sales, Trade, and Auction shop documents |
| `gui/` | Role-specific PokéMart runtime layouts |
| `cobblemon/_migration_backups/` | Backups made when canonical defaults are safely upgraded |

`Save As` accepts a relative path within the current domain. Saving trainer path `custom/gym/leader.json` creates:

```text
config/dochi_rpg_maker/cobblemon/trainers/custom/gym/leader.json
```

## Defaults and samples

First launch installs trainer and encounter samples, champion parties, Pokemon Itself samples, battle-presentation presets and samples, PokéMart role samples, and role-specific runtime GUIs.

Missing files are installed without overwriting user content. A known canonical default is upgraded only when its current hash exactly matches a recognized untouched older version. Before replacement, the addon creates:

```text
config/dochi_rpg_maker/cobblemon/_migration_backups/canonical_defaults_<timestamp>/
```

:::warning Keep user content separate
Defaults and samples are starting points. Save project content under a user path such as `custom/` so addon updates and authored content remain clearly separated.
:::

## NPC right-click priority

Normal runtime interaction uses a main-hand right-click while both hands are empty.

| Priority | Attached role | Result |
| --- | --- | --- |
| 1 | DRM Dialogue or DRM NPC Shop | The DRM dialogue or shop owns the interaction |
| 2 | PokéMart | Opens the PokéMart runtime screen |
| 3 | Trainer or Pokemon Itself | Opens the battle confirmation |
| 4 | No addon role | Passes to another mod or normal CustomNPCs interaction |

A core item or another setup tool keeps its own editing path, so it does not open the battle prompt. Empty both main hand and offhand during runtime tests.

## Common problems

### The file saved, but the NPC did not change

Saving server JSON and applying it to an NPC are separate operations. Apply the edited document again and confirm that it was applied to the intended NPC and target type.

### The file is missing from Load

- Match the current editor domain to the actual folder.
- Trainers belong in `trainers/`; Pokemon Itself documents belong in `pokemon_itself/`.
- Confirm the file has a `.json` extension.
- If files were edited outside the game, use DRM's reload workflow or restart the server safely.

### Empty-hand interaction does not open a battle

- Empty both hands.
- Confirm Trainer or Pokemon Itself data is applied to the NPC.
- Check whether DRM Dialogue, DRM NPC Shop, or PokéMart owns the interaction first.
- Confirm the player is not already in a Cobblemon battle.
- Confirm another player's battle has not reserved the NPC.

### Vision or Radius does not trigger

- Creative and Spectator players are excluded from automatic detection.
- Confirm the trigger is not still `Interaction`.
- Check Vision Distance, Vision Angle, Radius, and Line of Sight.
- Check round conditions, rematch limits, and cooldown.
- Check Chase Max Distance and Duration.

### A Battle Presentation does not load

- Use a path relative to `battle_presentations/`.
- Keep layer IDs unique.
- Use valid Minecraft resource IDs for textures and sounds.
- Keep Start Tick at or below End Tick and both inside Duration.

### PokéMart payment fails

- Match Currency Provider to the installed mod or DRM currency.
- Install CobbleDollars before using `cobbledollars`.
- For item currency, match item ID and optional NBT exactly.
- Check whether Interaction Conditions block access.

## Pre-release checklist

1. Start a server and a clean client instance without dependency errors.
2. Confirm defaults and samples install into a fresh config.
3. Save, apply, enter, and finish one Trainer battle and one Pokemon Itself battle.
4. Test Interaction, Vision, and Radius with a Survival-mode player.
5. After win, loss, and flee, verify NPC appearance, position, sound, and player Pokémon state restore correctly.
6. Test presentation playback, skipping, battle music, small GUI Scale, and different aspect ratios.
7. Test Sales, Trade, and Auction before and after a server restart.
8. Include user JSON and `_migration_backups` in the server backup policy.
9. Confirm the release JAR is named `drm_cobblemon_editor-<version>.jar` while the internal mod ID remains `cobble_npc`.

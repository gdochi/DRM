---
title: GUI, Files and Troubleshooting
slug: minigames-files-gui
order: 1320
description: Separate rule files from in-game layouts, edit them with GUI Maker, and diagnose common issues.
product: dochi-minigames
category: Files and Operations
section: operations
status: Usage guide
version: 0.1.6
audience: Creators / operators
---

## Storage

| Data | Path |
| --- | --- |
| Game rules | `config/dochi_rpg_maker/minigames/games/<id>.json` |
| Default runtime GUI | `config/dochi_rpg_maker/gui/minigames/minigames_gui.json` |
| High scores | `<world>/data/dochi_minigames_scores.json` |

Game-rule JSON stores fees, time limits, symbols and rewards. GUI JSON stores the player's board and score-panel layout. NPC bindings persist in NPC data; NPCs using the same game ID share that game's configuration.

Roulette’s default **Spin on block** starts at the machine without a GUI layout file. GUI files arrange existing screen-based games and roulette configured for **Game screen**.

## Edit the screen in GUI Maker

Use **Open GUI Maker** to open the game's linked layout. Edit board and score-panel position and size, then save. To customize a default separately, create a copy with `Save As` and select it in **General → GUI JSON**.

![The minigame editor's General page with GUI JSON, its finder and Open GUI Maker below.](assets/media/guides/minigames-015-neo1211/minigames-editor.png "Minigames 0.1.5 / NeoForge 1.21.1. Set title, time and rewards in the game editor; use Open GUI Maker for board position and appearance.")

**Game Board → Memory Card Size** accepts 16–96px, defaulting to 40px. Large boards shrink cards to fit, and click detection follows the displayed size. `previewGame` changes only GUI Maker's sample screen, not the actual game rules.

An incomplete numeric value blocks tab changes and saving until corrected. Shared Back/Forward navigation and window resizing preserve the draft, but do not save it to the server.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Game missing from Load | Server game folder, schema, supported game type and validation errors |
| NPC opens the game immediately | Remove direct Minigames Apply when entry should happen only through dialogue |
| Starting fails after confirmation | Balance, referenced items, optional integrations and server message |
| Memory configuration cannot save | Even card count and enough distinct pair symbols |
| GUI changes have no effect | Edit and save the GUI actually linked to that game |
| Unexpected reward combination | Score thresholds and `highest`, `cumulative` or `random` policy |

Back up `config/dochi_rpg_maker` and the world before updating. Use ordinary release JARs without development test code.

## JSON reference

For external editors: the rule schema is `dochi.minigames.v1`, with types `monty`, `slots`, `memory`, `whack`, `timing`, `highlow`, `shooting`, `mob_battle` and `roulette`. `guiLayout` is relative to DRM's `gui/` folder and defaults to `minigames/minigames_gui.json`. Rule files do not store hidden answers or live sessions.

## Standalone files and migration

The `config/dochi_rpg_maker/minigames/` and `gui/minigames/` paths remain in use without DRM. Older `dochi_minigames/games/` and `gui/dochi_minigames/` locations are migration inputs; back them up before updating. Client UI settings use `config/dochi_minigames/client.json`; lesson completion uses `<world>/data/dochi_minigames/tutorial/<UUID>.json`.

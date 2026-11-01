---
title: Make an Item Roulette
slug: minigames-roulette
order: 1315
description: Choose prizes and odds, then run one draw from a machine or game screen.
product: dochi-minigames
category: Game creation
section: rules
status: Guide
version: 0.1.6
audience: Players / game creators
---

## One spin, one prize

Item Roulette was added in **Minigames 0.1.6** and works without DRM. Connect a saved game to a Roulette Machine and right-click to play.

**Current bundled presets default to Spin on block**: right-clicking spins the machine without opening a window. For an entry screen showing prizes and odds first, select **Rules → Play mode → Game screen**, save and apply. Check Play mode in existing saved profiles.

![A Roulette Machine placed in the world.](assets/media/guides/minigames-016-neo1211/roulette-native-world-stopped.png "Minigames 0.1.6 / NeoForge 1.21.1. The roulette is in the center; Whack-a-Mole and Slots use separate machines. This original was captured during the project's native client verification.")

In **Game screen** mode, check the prizes, quantities, odds and entry fee, then press **Spin**. The arrow determines one prize. **Hide prizes & odds / Show prizes & odds** controls the right-hand list.

![A paid roulette entry screen before Spin.](assets/media/guides/minigames-016-neo1211/roulette-native-entry.png "Minigames 0.1.6 / NeoForge 1.21.1. This paid example charges one emerald and gives each of eight slots 12.5%. The bundled roulette preset is free, so check your own settings.")

**Play again** immediately starts another draw and charges another fee in a paid game. It is not a result replay button.

## Craft the machine and connect a game

Craft a Roulette Machine with **gold ingot / clock / gold ingot** on the first row, **stick / redstone dust / stick** on the second, and **three planks** on the third. Plank types can be mixed.

1. Place it with one clear block above.
2. Open `/minigame editor` and choose **Item Roulette**.
3. Configure it below, then **Save As** your own name, such as `village_roulette`.
4. **Shift-right-click with empty hands**, choose the profile and apply it to the table. Configuration needs operator permission level 2 or higher.
5. Right-click normally to play. See [table setup](#dochi-minigames/minigames-tables) for the generic Minigame Table.

## Change prizes and odds

Select a row in **Prize slots**. Use the finder beside **Reward ID** to choose an item, then set **Count**. Selecting an inventory item can preserve its custom name and native data without consuming it.

![Editing a selected prize's item, quantity and weight.](assets/media/guides/minigames-016-neo1211/roulette-editor-prizes.png "Minigames 0.1.6 / NeoForge 1.21.1. The blue Diamond row is being edited. Checkboxes mark prizes for batch deletion separately. Chance on the right shows the resulting probability.")

With **Rules → Weighted chances** off, all prize slots are equally likely. With it on, each prize uses its share of total **Weight**. Two weights of 1 and 3 give 25% and 75%. Quantity does not change probability. Wheel sectors follow the actual odds too.

**Spin time (seconds)** ranges from 3 to 8. Set the entry item and amount under **General**; `0` is free. Roulette currently charges physical items. It awards one Prize slots entry rather than using the score-game highest or cumulative reward policy.

![Roulette play mode, duration and weighted-chance switch.](assets/media/guides/minigames-016-final-neo1211/roulette-editor-rules.png "Actual Minigames 0.1.6 / NeoForge 1.21.1 artifact replaced at 15:40 KST on November 1. Defaults are Spin on block, five seconds and Weighted chances OFF, giving eight prizes 12.5% each. The entry-screen photo above is a separate Game screen example.")

## Spin the physical machine without a screen

Choose **Rules → Play mode → Spin on block**. A normal right-click starts the physical wheel without opening the game screen, and pays the fee if configured. Clicking a busy spinning machine does not charge again.

**Game screen** opens the large roulette UI. Save the chosen mode, apply the profile to the machine and check the actual right-click behavior.

Spin on block can start without a GUI layout file. The 26.3 builds also add prize particles and sounds when the wheel stops; the 1.21.1 images above do not establish those effects.

## Closing the window or having a full inventory

An already-started roulette draw continues after closing the screen or walking away. The server retains the draw and prize. A full inventory keeps the prize pending and prevents another paid draw. Make space, confirm receipt of the saved prize, then play again.

This differs from forfeiting a normal score game such as Monty Hall or Slots. Saving a profile and connecting it to a machine are also separate steps; see [files and GUIs](#dochi-minigames/minigames-files-gui).

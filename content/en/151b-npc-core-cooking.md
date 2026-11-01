---
title: Cook and Deliver Food
slug: npc-core-cooking
order: 1514
description: Choose a recipe, ingredient storage and workstation for your cook.
product: dochi-npc-core
category: Jobs
section: editor
status: Guide
version: 0.1.3
audience: NPC creators
---

## Prepare a cooking job

1. Place a reachable workstation and ingredient/output storage.
2. In the NPC editor, use **Schedule → Add time**, then the time row’s **+**. Search for **Cooking**, or find it under **Gathering and production**.
3. Use the browse control beside **Food to cook** to select a recipe. Ingredients are not fetched before a recipe is selected.
4. Assign **Ingredient source / Cooking block / Output**. Scroll the Inspector for lower settings.
5. Provide ingredients, any required tool and fuel, then set **Batch / Repeat**.
6. Enable **Enable schedule** and **Save to NPC**. Check that the current world time falls inside the scheduled period.

![Cooking added to Schedule, with Food to cook and Ingredient source.](assets/media/guides/dnpc-013-neo1211/dnpc-cooking.png "DNPC 0.1.3, Farmer’s Delight 1.3.4, NeoForge 1.21.1. This preparation view has no recipe or station and the schedule is OFF. Assign them, enable the schedule and save.")

Enable **Repeat** for continued cooking. Disable it to finish and deliver one batch, then wait.

## Read the recipe before preparing the station

Search by food name or item ID and select a recipe row on the left. The same steak can have separate furnace and smoker recipes. Read **Cooking block / Recipe cooking time / Ingredients for one recipe batch** on the right before preparing the station and ingredients.

![The selected furnace steak recipe shows one raw beef and a 200-tick cooking time.](assets/media/guides/dnpc-013-neo1211/dnpc-cooking-beef.png "DNPC 0.1.3 / NeoForge 1.21.1. The search is minecraft:cooked_beef. This row requires Furnace, 200 ticks and Raw Beef ×1. Apply updates the editor draft; finish with Save to NPC separately.")

## Available workstations

| Device | What the NPC does |
| --- | --- |
| Furnace/smoker | Adds ingredients and fuel, then collects the result |
| Farmer’s Delight cutting board | Prepares ingredients with the required tool |
| Farmer’s Pizzeria | Rolls dough, adds toppings and collects raw pizza |
| French Delight cheese mold | Fills the mold, waits for aging and collects cheese |
| Supported baskets/cabinets | Moves ingredients, intermediate items and products |

Extra devices need their respective mods. The combined cooking-addon guide above is based on **NeoForge 1.21.1**. On other loaders, choose from installed devices and the available recipe list. This is not a 26.3 cooking guide.

## Ingredients are ready, but cooking does not start

- Supply the required **tool** as well as ingredients.
- Check the assigned ingredient storage and workstation.
- Leave a walkable route and room to stand at the device.
- Furnaces/smokers need **fuel**.
- Full output storage can delay collection or delivery.

Cheese aging takes 1,200 ticks, about one minute at normal speed. If conversation briefly interrupts cooking, the NPC can collect the food after the device finishes.

Choose working hours in [schedules](#dochi-npc-core/npc-core-schedules).

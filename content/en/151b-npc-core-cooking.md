---
title: Cook and Deliver Food
slug: npc-core-cooking
order: 1514
description: Choose a recipe, ingredient storage and workstation for your cook.
product: dochi-npc-core
category: Jobs
section: editor
status: Guide
version: 0.1.2
audience: NPC creators
---

## Prepare a cooking job

1. Place a reachable workstation and ingredient/output storage.
2. Choose **Harvesting/production → Cooking** in Daycycle.
3. Select the food from the recipe list.
4. Assign ingredient storage, the workstation and output storage.
5. Supply ingredients, tools and fuel, then save.

Enable **Repeat** for continued cooking. Disable it to finish and deliver one batch, then wait.

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

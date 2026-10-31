---
title: Cooking Jobs and Ingredient Transport
slug: npc-core-cooking
order: 1514
description: Native recipes, tools, ingredients, fuel and verified optional cooking integrations.
product: dochi-npc-core
category: Jobs
section: editor
status: Guide
version: 0.1.2
audience: NPC creators
---

## Create a cooking job

These jobs belong to the existing Forge 1.20.1 and Fabric/NeoForge 1.21.1 targets. The added devices and addon runtime checks below were exercised on **NeoForge 1.21.1**, independently of 26.3.

1. Select a cooking job under daycycle harvesting/production.
2. Choose an installed device and actual recipe from the server catalog.
3. Assign ingredient storage, the workstation and product storage.
4. Supply the required tools, ingredients and fuel, and provide a reachable route.
5. Choose repetition, save, then check real consumption and delivery.

Tools are displayed separately from ingredients. Repetition defaults to enabled. Disable it to collect and deliver one batch, then wait in the completed state. Selecting a recipe alone does not generate its result.

## Device scope

| Device | Behavior |
| --- | --- |
| Farmer's Delight cutting board | Native tool requirements, ingredients, results and byproducts |
| Vanilla furnace/smoker | Loads actual ingredients and fuel; the original block performs heating |
| Farmer's Pizzeria | Native dough rolling and topping, followed by collection and cooking |
| French Delight cheese mold | Filling, 1,200-tick aging, collection and empty-bucket return |
| Baskets/cabinets | Ingredient, intermediate and product transport; supported cabinet animations |

Runtime checks used Farmer's Pizzeria 1.3.0 and the installed French Delight and related addons. These tested versions do not establish new minimum requirements. DNPC does not require these mods or generate missing workstations or recipes.

## Interruptions and saving

Reservations and uncollected products survive saving. Brief interaction or approach delays do not discard valid workstation contents. Existing loose food nearby is not collected as a newly produced result. External changes to devices, ingredients or products trigger validation.

Current 0.1.2 patches address lost fuel/ingredients, missing cheese buckets and pizza reset failures, alongside lumber/mining target and return improvements. Standalone NeoForge completed a batch using a vanilla smoker and barrel. Every addon combination on the other loaders has not been runtime-tested.

See [schedules](#dochi-npc-core/npc-core-schedules) for military, riding and shop timing, and [v3 templates](#dochi-npc-core/npc-core-templates) for save/clone distinctions.

---
title: Recommended Workflows
slug: workflows
order: 120
description: Practical flows for dialogue, shops, Teleporter, NPC Spawner, and currency/HUD setup.
product: core-fabric
category: Reference / Operations
section: operations
status: Stable
version: 0.3.1
audience: Creators
tags:
  - workflow
  - examples
---

## Build a village NPC in this order

Start with **one conversation scene → real interaction → shop or travel → custom appearance**. Default layouts are enough to test dialogue and transactions.

## Guide NPC: greeting and reply

1. [Place a DNPC](#dochi-npc-core/npc-core-setup).
2. Write a greeting in a general Dialogue Editor node and a question in Choices.
3. Create its reply node and connect Goto. Point start Routes to the greeting.
4. Save As `village_guide` and Apply Dialogue to the NPC.
5. Empty both hands and test question → reply → close.

![An actual NPC reply after selecting the question.](assets/media/guides/drm-031-neo1211/dialogue-npc-reply.png "DRM 0.3.1 / NeoForge 1.21.1. Check the connection between the authored text and the reply the player actually sees.")

Follow the [conversation tutorial](#core-fabric/dialogue-system) for each screen. For a one-time gift, connect a claim tag as shown in [conditions and actions](#core-fabric/conditions-actions).

## Shop NPC: sell one bread bundle

Select Bread in the default NPC Shop. Check Product quantity `3` and price `4`, and use emerald payment under Shop settings. Save As and Apply NPC Shop to the NPC.

In the actual shop, check Bread and press **Buy Selected**. Verify **three bread granted, four emeralds taken and one stock bundle consumed** before adding other reward systems.

![The actual shop after Bread was purchased.](assets/media/guides/drm-031-neo1211/shop-bread-purchased.png "DRM 0.3.1 / NeoForge 1.21.1. Server checks confirmed bread 0→3, emeralds 10→6 and Bread stock 12→11. The footer follows the currently selected product.")

Follow [the shop tutorial](#core-fabric/shop-system). Add [Currency Editor](#core-fabric/currency-editor) when you need account money. Use Go Shop to connect the saved shop from a dialogue choice.

## Travel NPC: save a destination, then Travel

In Teleporter Editor, name a destination and choose coordinates in the same dimension. Save As and Apply Teleporter to the NPC. Open it empty-handed, select the destination and press **Travel**.

![Arrival at the saved Travel destination.](assets/media/guides/drm-031-neo1211/teleporter-arrived.png "DRM 0.3.1 / NeoForge 1.21.1. Server coordinates confirmed arrival at 20.5 / -60 / 0.5. The landmark was prepared beforehand for location checking.")

See [the teleporter guide](#core-fabric/teleporter) for conditions and locked destinations. Use Go Teleporter to connect the saved set from dialogue.

## Extend a working NPC

| Next task | Guide |
| --- | --- |
| Dialogue/shop appearance | [GUI Maker](#core-fabric/gui-system) |
| Persistent health or money display | [HUD Maker](#core-fabric/hud-maker) |
| Reuse an NPC at several spawn points | [DNPC templates and Spawn Control](#dochi-spawn-control/spawn-control-npc-templates) |
| Older Core NPC Spawner | [Its own guide](#core-fabric/npc-spawner); CustomNPCs workflows belong only to older supported targets |
| Move work to another server | [Folders](#core-fabric/paths) and [applying changes](#core-fabric/data-flow) |

After Save As under a new name, select that new file for the NPC too. Bring linked pictures, currencies and shops, and preserve world NPC placement and progress separately.

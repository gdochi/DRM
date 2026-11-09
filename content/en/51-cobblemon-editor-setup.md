---
title: Install and Make Your First Battle
slug: cobblemon-editor-setup
order: 510
description: Give an NPC one Pokémon and start a battle with the player.
product: drm-cobblemon-editor
category: Setup
section: setup
status: Draft
version: Fabric / NeoForge 0.2.9
audience: Server operators and first-time creators
tags:
  - setup
  - fabric
  - npc
---

## Required mods

| Item | Version / choice |
| --- | --- |
| Minecraft | 1.21.1 / Java 21 |
| Loader | Fabric or NeoForge |
| DRM Core | Matching loader; this guide was run with 0.3.1 |
| Cobblemon | This guide was run with 1.8.4 |
| Cobblemon Editor | Matching-loader 0.2.9 |
| NPC | DNPC or CustomNPCs |

Match loader files on server and clients. Fabric also needs the Loader/API versions required by DRM and Cobblemon.

## Make the first trainer

1. Place an NPC. Start with [DNPC](#dochi-npc-core/npc-core-setup) if you need one.
2. Right-click air with **Dochi RPG Maker Core** and open **Add-on → Cobblemon Editor**.
3. Start from the initial party or use **Create New**. Under **Battle Config → General**, enable **Trainer Battle** and choose **Battle type → vs Trainer**.
4. Choose one Pokémon and its level under **Pokemon Party**.
5. Use **Singles** and the **Interaction** trigger.
6. **Save As** `custom/first_trainer.json`.
7. Right-click the NPC with the DRM Core and choose **vs Trainer → your file → Apply vs Trainer**. Check the name under **APPLIED JSON** on the right.
8. Put a battle-ready Pokémon in your own party, empty both hands and talk to the NPC.

![General settings for a first trainer.](assets/media/guides/cobble-029-neo1211/cobble-config.png "Check Trainer Battle and battle type under Battle Config → General. Name source chooses the profile name or the applied NPC name.")

![Trainer file successfully attached in NPC Apply.](assets/media/guides/cobble-029-neo1211-flow/cobble-trainer-applied.png "Cobblemon Editor 0.2.9, DRM 0.3.1 and DNPC 0.1.3 / NeoForge 1.21.1. Applying custom/guide_trainer.json placed guide_trainer under vs Trainer on the right. Saving a document and binding an NPC are separate steps.")

## Battle the Pokémon itself

Choose **Battle type → vs Cobblemon**, then set species, appearance and level. Save under a different name and apply through **vs Cobblemon** in NPC Apply. This Pokemon Itself type uses one Pokémon per round.

## Do changes need another Apply?

Changing Pokémon, levels or other contents in the same file with **Save** updates the next interaction. Apply again after changing the file name or NPC role.

Use `/drm reload` after editing files outside the game.

## If the battle does not open

| Problem | Check |
| --- | --- |
| Editor missing | DRM, Cobblemon and addon installed for the same loader |
| NPC does nothing | Enabled Trainer, saved file applied and both hands empty |
| Dialogue/shop opens first | Connect its dialogue with go_battle or use another NPC |
| Player-party error | A battle-ready Pokémon is in your party |

Continue with [parties, rounds and rewards](#drm-cobblemon-editor/cobblemon-trainer-editor).

## Watch the battle start
![Choose battle in the applied trainer's dialogue, watch its entrance and enter an actual battle.](assets/media/guides/runtime-videos-20261106/trainer-battle-start.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, English UI. A prepared example: dialogue → go_battle → presentation → battle screen.")

Once the first battle opens, add a gym goal with [badge rewards](#drm-cobblemon-editor/cobblemon-badges).

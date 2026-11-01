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
| DRM Core | 0.2.8+ |
| Cobblemon | 1.7.3 or newer, below 1.9.0 |
| Cobblemon Editor | Matching-loader 0.2.9 |
| NPC | DNPC or CustomNPCs |

Match loader files on server and clients. Fabric also needs the Loader/API versions required by DRM and Cobblemon.

## Make the first trainer

1. Place an NPC. Start with [DNPC](#dochi-npc-core/npc-core-setup) if you need one.
2. Right-click air with **Dochi RPG Maker Core** and open **Add-on → Cobblemon Editor**.
3. Choose **Use Default** and keep the type **Trainer**.
4. Choose one Pokémon and its level under **Pokemon Party**.
5. Use **Singles** and the **Interaction** trigger.
6. **Save As** `custom/first_trainer.json`.
7. Right-click the NPC with the DRM Core, choose **Cobblemon Trainer** and **Apply** your file.
8. Put a battle-ready Pokémon in your own party, empty both hands and talk to the NPC.

## Battle the Pokémon itself

Choose **Pokemon Itself**, then set its species, appearance and level. Save under a different name and apply as **Cobblemon Pokemon Itself**. This type uses one Pokémon per round.

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

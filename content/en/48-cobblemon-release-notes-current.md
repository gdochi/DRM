---
title: What's New in 0.2.9
slug: cobblemon-editor-current-update
order: 480
description: Changes to Sequential rewards, DNPC roles and trainer movement.
product: drm-cobblemon-editor
category: Getting Started
section: overview
status: Stable
version: Fabric / NeoForge 0.2.9
audience: Creators / Operators
hiddenNav: true
---

## Rewards after dialogue

![After Actions controls for post-battle ordering.](assets/media/guides/cobble-029-neo1211/cobble-after-actions.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, English UI. Open Battle Config → After Actions and choose Action mode. This photo shows the initial All mode with zero actions, not a completed Sequential dialogue-and-reward run.")

For rewards after dialogue, choose **Sequential** and place the dialogue action before its reward. This coordinates dialogue completion with the later payout.

**Sequential** after-actions wait until dialogue ends before granting later rewards. After cancellation/disconnection, the next NPC interaction can continue the remaining actions.

Each round allows one dialogue action. See [setup steps](#drm-cobblemon-editor/cobblemon-trainer-editor).

## DNPC roles

DNPC supports Trainer, Pokemon Itself, Pokémon appearance, PokéMart, Nurse Joy and Starter Selector, plus clone/spawner/battle-scheduler connections.

Trainers can dash and return while DNPC **Position lock** is enabled. Fixes also address leftover dash speed and failure to return after cancelled dialogue.

## Features carried forward

Includes 0.2.7's battle AI improvements, full move selection and Cobblemon 1.8.4 compatibility work. Additional mechanics such as Mega Evolution need their respective mods and key items.

## Update files

For Fabric/NeoForge on Minecraft 1.21.1. Use current matching-loader patches of DRM Core, DNPC and Cobblemon Editor together for these features. See [installation](#drm-cobblemon-editor/cobblemon-editor-setup).

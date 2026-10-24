---
title: Minigames Setup and First Game
slug: minigames-setup
order: 1300
description: Current installation and first-use guidance.
product: dochi-minigames
category: Start
section: setup
status: Usage guide
version: 0.1.2
audience: Creators / server operators
---

## Installation

**Dochi’s Minigames 0.1.2** runs without DRM. Install the same loader and build on server and clients.

| Loader | Minecraft / Java | File |
| --- | --- | --- |
| Forge | 1.20.1 / 17 | `dochi_minigames-0.1.2-forge-1.20.1.jar` |
| Fabric | 1.21.1 / 21 | `dochi_minigames-0.1.2-fabric-1.21.1.jar` |
| NeoForge | 1.21.1 / 21 | `dochi_minigames-0.1.2-neoforge-1.21.1.jar` |

Fabric needs Loader 0.15.11+ and Fabric API 0.101.2+1.21.1+. Forge needs 47.2.0+; NeoForge needs 21.1+. DRM, CustomNPCs, Cobblemon and CobbleDollars are optional. Add the relevant provider when a document references its currency, conditions or Pokémon rewards.

## Create a game

1. With permission level 2, run `/minigame editor` or edit a [minigame table](#dochi-minigames/minigames-tables).
2. Load a preset or create Monty Hall, Slots, Memory, Whack-a-Mob, Timing, High-Low, Shooting Gallery or MWENT.
3. Set the title, timer and rules. Begin with free entry.
4. Use supported test-play tools and test the actual table interaction.
5. Save custom JSON with Save As, or use **Apply to Table** to bind a placed table.

## DRM NPCs and dialogue

DRM 0.2.8 adds the shared editor selector, NPC Apply, dialogue actions and GUI Maker. Bind a saved game through NPC Apply → Minigames to open it from NPC interaction.

To enter only through dialogue, leave direct Minigames Apply unset and select **Go Minigames** on a dialogue choice. A direct game binding handles interaction before dialogue. The action ID is `dochi_minigames:play`; existing plain IDs and `.json` paths remain readable.

Entry is charged when Start is confirmed. Clicking an NPC or cancelling confirmation does not charge. Leaving an active game forfeits the session.

## Commands

```text
/minigame list
/minigame play monty
/minigame play mob_battle
/minigame scores monty
/minigame editor
/minigame packs
```

See [rules and rewards](#dochi-minigames/minigames-rules-rewards), [MWENT](#dochi-minigames/minigames-mwent) and [files / GUI](#dochi-minigames/minigames-files-gui).

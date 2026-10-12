---
title: Minigames Setup and First Game
slug: minigames-setup
order: 1300
description: Create Monty Hall, slots and memory games, then connect them to NPCs or dialogue.
product: dochi-minigames
category: Start
section: setup
status: Usage guide
version: 0.1.0
audience: Creators / server operators
---

## Install

**Dochi`s Minigames 0.1.0** is a DRM addon for Minecraft 1.21.1 / Java 21. It provides Fabric and NeoForge builds; there is no Forge 1.20.1 build.

| Loader | Installable file | Platform requirements |
| --- | --- | --- |
| Fabric | `dochi_minigames-0.1.0-fabric-1.21.1.jar` | Fabric Loader 0.18.0+, Fabric API 0.116.11+1.21.1+ |
| NeoForge | `dochi_minigames-0.1.0-neoforge-1.21.1.jar` | NeoForge 21.1+ |

Both require matching-loader **DRM 0.2.4 or newer**; the current Core is 0.2.5. Current DRM itself requires CustomNPCs, so install it for the complete runtime. Add Cobblemon for Pokémon rewards and CobbleDollars for its entry-fee provider. Keep the loader and actual build aligned on server and clients.

## Create a first game

1. Open DRM's editor list with the Core tool and select **Minigames**. Editing requires permission level 2 or higher.
2. Start from defaults or a new document, then choose Monty Hall, slots or memory.
3. Set the title, time limit and entry fee in General. Use an amount of `0` for the first trial.
4. Edit Rules, Symbols and Rewards, then use the editor's test play. Test play charges no fee and grants no real rewards.
5. Save a user game JSON with `Save As`. Changing an existing profile ID also uses Save As.
6. Open the target NPC's **NPC Apply Editor**, select Minigames, and bind the saved server JSON.

A player's right-click opens the entry-fee confirmation screen. Payment and the game begin when the player presses **Start**, or pulls the lever for slots. Sneaking or holding an editing tool skips game interaction.

## Open from dialogue

Choose **Go Minigames** in a dialogue choice action or start-node route, then select a file from **Game JSON**. Success closes the dialogue and opens entry confirmation. An unavailable game keeps the dialogue open.

For a dialogue-only entrance, leave the NPC's direct Minigames binding empty: a directly applied game handles right-click before dialogue. The action ID is `dochi_minigames:play`; both legacy `id: "monty"` and file-picker `id: "monty.json"` are supported.

## Commands

```text
/minigame list
/minigame play monty
/minigame scores monty
/minigame editor
```

`monty` is an example saved game ID. Continue with [rules and rewards](#dochi-minigames/minigames-rules-rewards) and [GUI, files and troubleshooting](#dochi-minigames/minigames-files-gui).

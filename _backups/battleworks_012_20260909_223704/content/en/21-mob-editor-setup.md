---
title: Installation and NPC Application
slug: mob-editor-setup
order: 220
description: Install the required mods, create a document, and apply it to a CustomNPCs NPC.
product: mob-editor
section: start
category: Battleworks
status: Guide
version: 0.1.1
audience: Combat content creators
tags:
  - battleworks
  - CustomNPCs
  - combat
---

## Environment

| Component | Requirement |
| --- | --- |
| Minecraft | Java Edition 1.20.1 |
| Loader | Forge 47 or newer for 1.20.1 |
| Java | 17 |
| Dochi's Battleworks | 0.1.0 |
| Dochi's RPG Maker | Forge 1.20.1 version 0.1.4 or newer; required |
| CustomNPCs | A compatible Forge 1.20.1 build; required |

Install matching Battleworks and DRM versions, together with compatible CNPC, on the server and clients. This guide covers the Forge build. Install optional providers and their own dependencies only for the integrations you use.

## Open the editor

1. Obtain DRM's **Dochi RPG Maker Core** item in creative mode.
2. Right-click air to open the editor selector and choose **Battleworks**.
3. To work with a particular NPC, right-click a CustomNPCs NPC with the Core and enter the target-aware workflow.
4. Configure its model and baseline animation bindings in DRM's **NPC Basic**.

Set up factions, hostile targets, and ordinary idle behavior in CNPC. Battleworks applies combat specifications; model asset creation remains a separate task.

## Create the first attack

1. Use **Create New**, or **Load** the starter combat document.
2. Choose **Pattern Workbench → Add**.
3. Set Windup, Action, and Recovery durations; use **Action → + Action** to add a Hitbox action.
4. Use **Choose from list** to select or create a hitbox.
5. Open **Edit this hitbox** and adjust its dimensions and offsets. For an animated attack, select the Action stage, assign a clip, and use **Play**.
6. Use **Save As** with a new name such as `my_boss.json`.
7. In the NPC apply screen, select that Battleworks combat specification and apply it.

The file is stored at `config/dochi_rpg_maker/mobs/my_boss.json`. Preserve the starter document as a template and save your working copy under another name.

## Save versus Save As

- **Save** writes the current document to the selected NPC, if any. It also saves to the loaded file path when one is present.
- **Save As** writes a JSON file with the chosen name. Saving that file alone does not update the NPC's applied combat specification.
- In a new document without an NPC or file path, **Save** opens the filename prompt.

An NPC stores its own applied document copy. After changing the source JSON, apply it again, or open the editor for that NPC and use **Save**.

## Test combat

Close the editor and test with a hostile survival-mode target. Creative and spectator players are excluded from valid Battleworks combat targets. The preview sample has combat disabled; use the [combat sample](#mob-editor/battleworks-files) to test pursuit and damage.


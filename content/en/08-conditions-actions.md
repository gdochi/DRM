---
title: Conditions and Actions
slug: conditions-actions
order: 70
description: Choose who sees a dialogue choice and what happens when they click it.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guide
version: 0.3.1
audience: Dialogue creators
tags:
  - condition
  - action
---

## Who sees the choice, and what it does

Open a general dialogue node's **Choices** and select one choice. **Label** is its button text, **Condition list** controls visibility, and **Choice actions** runs when it is clicked.

“Has not received the gift” is a condition. “Give apples and record the claim” is an action sequence. A condition alone grants nothing; a grant without a claim check can be repeated.

## Load a reward example on Forge

In the tested **DRM 0.3.1 / Forge 1.20.1** build, choosing Item in the Type menu left the action as Goto. If this happens, download the [one-time reward example](#core/dialogue-rewards) and open it with **Load**. Its existing Item and Tag actions load correctly. NPC application, the apple grant and hiding the choice on a repeat visit were verified.

![Item and Tag actions loaded in the Forge dialogue editor.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-actions.png "DRM 0.3.1 / Forge 1.20.1. Receive three apples is selected. The first Item row grants three apples; the following Tag row records the claim. Scroll the right panel down to see Count.")

Check **Item: give**, **ID: minecraft:apple**, **Count: 3**. To change the gift, edit the existing Item row and **Save As** your own set. Apply the original example first to confirm the working grant before changing its settings.

## Hide the button after claiming

Open that choice's **Condition list**. The example uses **Type: tag / Op: not / Tag: welcome_received**, so the choice appears only while the player lacks that tag.

The second **Tag** action uses **add / welcome_received** to record the claim. Change the action and condition names together; different names allow another claim. **has** means the opposite: the player must already have the tag.

No conditions means anyone passes. With several conditions, **and** requires all of them; **or** requires at least one. “Has a permit and at least three emeralds” uses and. “Has either of two permits” uses or.

## Where should the condition go?

| Location | Use it to |
| --- | --- |
| Choices → Condition list | Show or hide one button in the same scene |
| start → Routes | Choose the first scene when conversation begins |
| General node conditions | Restrict entry into that scene |

Use start Routes to change the whole greeting. Use a choice condition to hide just the gift button. See [dialogue creation](#core/dialogue-system) for start and general nodes.

## Common actions

| Desired result | Action | Also choose |
| --- | --- | --- |
| Show another line | Goto | Destination general node |
| End conversation | Close | No additional value |
| Open an NPC shop | Go Shop | Applied or saved shop |
| Grant or take items | Item | give / take / set, item and count |
| Record a claim or permit | Tag | add and a tag name |
| Clear that record | Tag | remove and the same tag name |
| Run a server command | Command | Command without its leading / |
| Connect a quest | Current quest action | Use the matching operation in the [quest guide](#core/quest-system) |

Put grants and records before screen transitions: **Item → Tag → Goto**. The supplied Item-and-Tag example closes after the grant. To show a reply, put Goto and its destination last. After changing an action type, check that the displayed type actually changed.

**Command** runs in the player's context. Use `{player}` for the name or `{uuid}` for the UUID. Start with the built-in action for tasks such as granting a single item.

## Conditions that need another mod

FTB conditions and actions require FTB Quests. **faction_score** refers to CustomNPCs faction points, which differ from DNPC friendly/hostile settings. **CustomNPCs Stored Data** is an [advanced script integration](#core/script-stored-data-conditions). Use the Tag example above for a normal one-time gift.

CustomNPCs integration is limited to supported older Minecraft targets; it is excluded on Minecraft 26.3. Consult the [JSON reference](#core/json-reference) when you need to edit files directly.

---
title: Conditions And Actions
slug: conditions-actions
order: 90
description: Implemented condition and action types used by dialogue nodes, routes, and choices.
product: core-fabric
category: Core Systems
section: dialogue-editor
status: Stable
version: 0.3.1
audience: Script / data creators
tags:
  - condition
  - action
---

## Who sees a choice, and what happens when they click?

**Condition list** controls whether a choice is visible. **Choice actions** controls what clicking it does. “Has not received the gift” is a condition; “give apples and record the claim” is an action.

Select a general node, open **Choices**, then select the choice on the left. **Label** on the right is the player's button text. The two tabs below edit conditions and actions separately.

## Show it only before the gift is claimed

1. Open the choice's **Condition list → Add**.
2. Choose **Type: tag**.
3. Choose **Op: not** and enter **Tag** `welcome_received`.

![A choice requiring the absence of welcome_received.](assets/media/guides/drm-031-neo1211/dialogue-choice-condition-tag.png "DRM 0.3.1 / NeoForge 1.21.1. tag / not / welcome_received passes when the tag is absent. has does the opposite.")

The condition does not record a claim by itself. Add the **same tag through a Tag action** when granting the gift. Follow [one-time rewards](#core/dialogue-rewards) for the full flow.

No conditions means everyone passes. For several conditions, **and** requires all; **or** requires at least one. Use and for “permission tag and at least three emeralds,” or for “either of two permission tags.”

## Give three apples on click

In **Choice actions**, change the action **Type** to **Item**, then set **Item: give**, **ID: minecraft:apple**, **Count: 3**. Use **+ Action** to add another action. If the example already has Goto, decide whether to replace it or keep it after the reward.

![Item give, minecraft:apple and Count 3 on a choice.](assets/media/guides/drm-031-neo1211/dialogue-item-reward-editor.png "DRM 0.3.1 / NeoForge 1.21.1. Label supplies the button text; the Item action grants the actual item. Scroll the right panel to reach Count.")

After **Save As → NPC Apply**, clicking this choice gave three apples in the server inventory. This item-only example closes the window after granting the items. To show a reply afterward, add **Goto last and select the destination general node**.

## Choose a common action

| Goal | Action | Values to choose |
| --- | --- | --- |
| Next dialogue scene | Goto | Destination general node |
| End conversation | Close | No extra values |
| Open an NPC shop | Go Shop | Bound shop or saved shop file |
| Open travel destinations | Go Teleporter | Saved teleporter set |
| Give or take items | Item | give / take / set, item and count |
| Mark a claim | Tag | add and the tag name |
| Remove a mark | Tag | remove and the same tag name |
| Run a command | Command | Server command without its leading / |
| Connect a quest | Current quest action | Follow the current choices in the [quest guide](#core-fabric/quest-system) |

Arrange actions in list order and put **Goto, shop opening or Close last**. For example: Item grant → Tag add → Goto.

## Where should the condition go?

| Location | Purpose |
| --- | --- |
| General node conditions | Restrict access to the whole scene |
| start Routes | Choose the first scene when interaction begins |
| Choices → Condition list | Hide or show individual choices within a scene |

To hide one button, condition that choice. To change the whole greeting, condition a start route leading to another general node. See [creating a conversation](#core-fabric/dialogue-system).

## Conditions needing another mod

Items, tags and advancements compare their corresponding values. FTB quest conditions require FTB Quests. `faction_score` reads CustomNPCs faction points, not DNPC friendship or hostility.

**CustomNPCs Stored Data** is an advanced connection to script-written data. The Tag example is enough for an ordinary one-time gift. CustomNPCs conditions are limited to supported older Minecraft targets and are unavailable on 26.3.

Use the [JSON reference](#core-fabric/json-reference) only when editing files directly.

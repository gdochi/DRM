---
title: Connect Dialogue Scenes and Replies
slug: dialogue-nodes-choices
order: 62
description: Connect the opening route, NPC lines and player replies.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guide
version: 0.3.1
audience: Dialogue creators
---

## Connect a greeting to an answer

Make one general node for the greeting and another for its answer. Point **start → Routes** to the greeting. In the greeting’s **Choices**, write a reply and give it a **Goto** action pointing to the answer. Add a separate **Close** reply to leave the conversation.

![Blueprint linking start, the greeting and the answer.](assets/media/guides/drm-031-forge1201/dialogue-blueprint.png "DRM 0.3.1 / Forge 1.20.1. start is the entrance; general nodes are visible scenes. Connection lines show where routes and replies lead.")

The complete [first dialogue exercise](#core/dialogue-system) covers Save As, NPC Apply and actual reply navigation. On the checked Forge 0.3.1 artifact, some action-type selections fail to change the type; use the tested example-loading path in [conditions and actions](#core/conditions-actions).

## Choose the opening scene

Each set has **one start node**. Its routes are checked from top to bottom, and an eligible route chooses the first scene or another opening action. Put a specific conditional greeting above a general fallback.

| Part | Purpose |
| --- | --- |
| start route | Choose where interaction begins |
| general node | Show an NPC line and player replies |
| choice condition | Decide whether a reply is visible |
| choice action | Decide what happens when it is clicked |

Conditions control availability; they do not perform the reply’s action merely by displaying it.

## Choose what a reply does

| Desired result | Choice action |
| --- | --- |
| Show another scene | Goto |
| Open a shop | Go Shop |
| Finish talking | Close |
| Give a reward, then continue | Reward actions followed by Goto |
| Offer a reply only before a reward is claimed | A tag condition plus the [one-time reward flow](#core/dialogue-rewards) |

Use one clear screen-navigation result per reply. Multiple competing navigation actions can make an earlier action decide the flow.

## Saved-file reference

You can author this in the editor without writing these fields yourself.

| Object | Useful fields |
| --- | --- |
| start route | `goto`, `conditions`, `mode`, `actionType`, `linkMode` |
| general node | `name`, `type`, `text`, `textTranslationKey`, `conditions`, `choice`, `textFx` |
| choice | `label`, `labelTranslationKey`, `conditionMode`, `conditions`, `actions`, `fx` |

The current array name is **`choice`**, singular. `mode` chooses **and / or** for conditions. Translation-key switches interpret text as a key rather than literal prose.

For size, long replies and **Pulse highlight**, see [choice text and emphasis](#core/dialogue-choice-style). These settings change presentation; write the actual reply in **Choices → Label**.

---
title: Create an NPC Conversation
slug: dialogue-system
order: 70
description: Write a greeting, add choices and connect the conversation to an NPC.
product: core-fabric
category: Core Systems
section: dialogue-editor
status: Stable
version: 0.3.1
audience: Dialogue creators
tags:
  - dialogue
  - npc
---

## Make a greeting and a reply

1. Open **Dialogue Editor** and choose **Use Default Dialogue Set**.
2. Select a general node and write a greeting, such as “What brings you to town?”
3. Add a choice: “Tell me about this place.”
4. Create a general node containing the reply and connect the choice to it.
5. Add a closing choice to that reply, such as “Thank you,” with a close action.
6. Connect **start** to the greeting node.
7. Use **Save As**, then right-click an NPC with the Core to apply it. Empty both hands and talk to the NPC.

## What is a node?

A **general node is one conversation scene**: an NPC line and the player's choices. Connecting a choice to another node opens the next scene.

**start** chooses the first scene. It points to a general node rather than displaying its own greeting. Each conversation set has one start node.

## Make choices do something

| Choice | Action |
| --- | --- |
| Hear the next part | Go to another node |
| End the conversation | Close |
| Buy something | Open a shop: `go_shop` |
| Collect a reward | Give an item or currency |
| Remember progress | Add/remove a tag |

A condition can show a choice only to certain players, such as offering a reward after a quest is complete. See [conditions and actions](#core-fabric/conditions-actions).

## Expand and reuse a conversation

Drag node/choice rows to change their order. Select several nodes with Shift+click or dragging and use **Copy / Paste**. Use **Duplicate** to copy an entire set.

For a shop choice, create the [shop](#core-fabric/shop-system) first and select it in the action.

## Change the window

Write content here and design the window in [GUI Maker](#core-fabric/gui-system). You can finish the conversation with the default layout and customize it later.

Saved sets are in `config/dochi_rpg_maker/dialogue_sets/<set name>/`. Copy the whole set folder when moving it to another server.

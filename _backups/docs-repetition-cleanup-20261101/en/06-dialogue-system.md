---
title: Create an NPC Conversation
slug: dialogue-system
order: 70
description: Write a greeting, add choices and connect the conversation to an NPC.
product: core
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

![The first choice opens the reply about the inn.](assets/media/guides/drm-031-forge1201/dialogue-npc-reply.png "DRM 0.3.1 / Forge 1.20.1. The first choice’s Goto opens dialogue_reply_1. Give the reply a closing choice too.")

## What is a node?

A **general node is one conversation scene**: an NPC line and the player's choices. Connecting a choice to another node opens the next scene.

**start** chooses the first scene. It points to a general node rather than displaying its own greeting. Each conversation set has one start node.

## Make choices do something

| Choice | Action |
| --- | ---

## Make a greeting and a reply

Build a village guide: talking opens a greeting, “Tell me about the village” opens a reply, and “Goodbye” closes the conversation.

These captures show **DRM 0.3.1 on Forge 1.20.1, in English**. The editor captures use a prepared example containing the greeting and reply.

### 1. Open the conversation editor

Right-click the air with the Core. Select **Dialogue Editor** in the middle, then **Use Default** on the right. The default example has other nodes; start by selecting **dialogue_1** for your greeting.

![DRM's editor selector with Dialogue Editor selected and Load, Use Default and Create New buttons on the right.](assets/media/guides/drm-031-forge1201/editor-selector.png "Select the tool in the middle, then choose how to start on the right. Use Default opens the supplied example.")

### 2. Write what the NPC says

Select **dialogue_1 / General** on the left and open **Text**. Enter a greeting in **Dialogue Text**, such as “Welcome to Oakridge. What would you like to know?”

![The Text tab for dialogue_1, with the village greeting in Dialogue Text.](assets/media/guides/drm-031-forge1201/dialogue-text.png "Text edits the NPC line for the selected node. Check its name on the left so you are editing the greeting rather than start.")

Use **+ General** to add the reply scene. In **Info → Node name**, enter `dialogue_reply_1` and click **Rename**. Open **Text** and write the reply, such as “The inn is beside the fountain.”

### 3. Connect a player choice to the reply

Return to **dialogue_1** and open **Choices**. Add a choice with **+ Choice** if needed. Select its row on the left, then enter the button wording in **Label** on the right.

![The Choices tab with two choices on the left, a Label field on the right, and Choice actions below.](assets/media/guides/drm-031-forge1201/dialogue-choices.png "Label is the player's button text. Set what that button does in Choice actions below it.")

For “Tell me about the village,” open **Choice actions**, add a **Goto** action and select **dialogue_reply_1** as its destination. Give “Goodbye” a **Close** action. Add a closing choice to the reply node too.

![Choice actions with a Goto action targeting dialogue_reply_1.](assets/media/guides/drm-031-forge1201/dialogue-choice-actions.png "Add the operation with + Action, then choose its Type and destination. This connects the first choice to the reply node.")

When reusing a default choice, check its existing actions. Changing the label alone can leave an example shop-opening or navigation action attached.

### 4. Choose the first scene

Select **start** and open **Routes**. Set the greeting route's **Action** to **Goto** and its **Goto** destination to **dialogue_1**. Begin with one route and no conditions.

![The Routes tab for start, with a Goto route pointing to dialogue_1.](assets/media/guides/drm-031-forge1201/dialogue-start-routes.png "start chooses the opening scene. This example enters start, then dialogue_1.")

### 5. Save and attach the conversation

Click **Save As** at the top. Change **Save As ID** to a new name such as `village_guide`, then save. Replace the protected example name `default_set`.

![The folder and set name after saving village_guide with Save As.](assets/media/guides/drm-031-forge1201/dialogue-save-result.png "DRM 0.3.1 / Forge 1.20.1. After saving, the folder at the top and set name on the left both end in village_guide.")

If you need an NPC first, follow [DNPC setup](#dochi-npc-core/npc-core-setup). Right-click it with the Core, then use **NPC Apply**:

1. Select **Dialogue JSON** on the left.
2. Select **village_guide** in the middle. Use **Refresh** if it is missing.
3. Press **Apply Dialogue** at the bottom.
4. Check that **APPLIED JSON → Dialogue** on the right now shows **village_guide**.

![NPC Apply after applying village_guide, showing the function, saved files, applied name and Apply Dialogue button.](assets/media/guides/drm-031-forge1201/npc-apply-result.png "Selecting a file alone does not apply it. Press Apply Dialogue and check the name in the right panel.")

Empty both hands, talk to the NPC, then check the greeting, reply choice and closing choice in order.

![The player conversation opened by interacting with a DNPC named Oakridge guide, showing the greeting and two choices.](assets/media/guides/drm-031-forge1201/dialogue-npc-player.png "The player's result: Dialogue Text becomes the NPC line, and each Label becomes a choice below it.")

The first choice opens the reply below. Check this connection as well as the initial greeting.


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

A condition can show a choice only to certain players, such as offering a reward after a quest is complete. See [conditions and actions](#core/conditions-actions).

## Expand and reuse a conversation

Drag node/choice rows to change their order. Select several nodes with Shift+click or dragging and use **Copy / Paste**. Use **Duplicate** to copy an entire set.

For a shop choice, create the [shop](#core/shop-system) first and select it in the action.

## Change the window

Write content here and design the window in [GUI Maker](#core/gui-system). You can finish the conversation with the default layout and customize it later.

Saved sets are in `config/dochi_rpg_maker/dialogue_sets/<set name>/`. Copy the whole set folder when moving it to another server.

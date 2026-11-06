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

Build a village guide: talking opens a greeting, “Tell me about the village” opens a reply, and “Goodbye” closes the conversation.

These captures show **DRM 0.3.1 on NeoForge 1.21.1, in English**. The editor captures use a prepared example containing the greeting and reply.

### 1. Open the conversation editor

Right-click the air with the Core. Select **Dialogue Editor** in the middle, then **Use Default** on the right. The default example has other nodes; start by selecting **dialogue_1** for your greeting.

![DRM's editor selector with Dialogue Editor selected and Load, Use Default and Create New buttons on the right.](assets/media/guides/drm-031-neo1211/editor-selector.png "Select the tool in the middle, then choose how to start on the right. Use Default opens the supplied example.")

### 2. Write what the NPC says

Select **dialogue_1 / General** on the left and open **Text**. Enter a greeting in **Dialogue Text**, such as “Welcome to Oakridge. What would you like to know?”

![The Text tab for dialogue_1, with the village greeting in Dialogue Text.](assets/media/guides/drm-031-neo1211/dialogue-text.png "Text edits the NPC line for the selected node. Check its name on the left so you are editing the greeting rather than start.")

Use **+ General** to add the reply scene. In **Info → Node name**, enter `dialogue_reply_1` and click **Rename**. Open **Text** and write the reply, such as “The inn is beside the fountain.”

### 3. Connect a player choice to the reply

Return to **dialogue_1** and open **Choices**. Add a choice with **+ Choice** if needed. Select its row on the left, then enter the button wording in **Label** on the right.

![The Choices tab with two choices on the left, a Label field on the right, and Choice actions below.](assets/media/guides/drm-031-neo1211/dialogue-choices.png "Label is the player's button text. Set what that button does in Choice actions below it.")

For “Tell me about the village,” open **Choice actions**, add a **Goto** action and select **dialogue_reply_1** as its destination. Give “Goodbye” a **Close** action. Add a closing choice to the reply node too.

![Choice actions with a Goto action targeting dialogue_reply_1.](assets/media/guides/drm-031-neo1211/dialogue-choice-actions.png "Add the operation with + Action, then choose its Type and destination. This connects the first choice to the reply node.")

When reusing a default choice, check its existing actions. Changing the label alone can leave an example shop-opening or navigation action attached.

### 4. Choose the first scene

Select **start** and open **Routes**. Set the greeting route's **Action** to **Goto** and its **Goto** destination to **dialogue_1**. Begin with one route and no conditions.

![The Routes tab for start, with a Goto route pointing to dialogue_1.](assets/media/guides/drm-031-neo1211/dialogue-start-routes.png "start chooses the opening scene. This example enters start, then dialogue_1.")

### 5. Save and attach the conversation

Click **Save As** at the top. Change **Save As ID** to a new name such as `village_guide`, then save. Replace the protected example name `default_set`.

![The Save Dialogue Set As dialog with a Save As ID field, storage path and Save As button.](assets/media/guides/drm-031-neo1211/dialogue-save-as.png "Replace default_set with your own set name. After saving, the path above the editor and the set name on the left change to it.")

If you need an NPC first, follow [DNPC setup](#dochi-npc-core/npc-core-setup). Right-click it with the Core, then use **NPC Apply**:

1. Select **Dialogue JSON** on the left.
2. Select **village_guide** in the middle. Use **Refresh** if it is missing.
3. Press **Apply Dialogue** at the bottom.
4. Check that **APPLIED JSON → Dialogue** on the right now shows **village_guide**.

![NPC Apply after applying village_guide, showing the function, saved files, applied name and Apply Dialogue button.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "Selecting a file alone does not apply it. Press Apply Dialogue and check the name in the right panel.")

Empty both hands, talk to the NPC, then check the greeting, reply choice and closing choice in order.

![The player conversation opened by interacting with a DNPC named Oakridge guide, showing the greeting and two choices.](assets/media/guides/drm-031-neo1211/dialogue-npc-player.png "The player's result: Dialogue Text becomes the NPC line, and each Label becomes a choice below it.")

The first choice opens the reply below. Check this connection as well as the initial greeting.

![The reply after selecting Tell me about the village, with directions to the inn and a closing choice.](assets/media/guides/drm-031-neo1211/dialogue-npc-reply.png "Goto opens dialogue_reply_1. Give the reply a way to continue, return or close too.")

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

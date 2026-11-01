---
title: Give a Reward Once
slug: dialogue-rewards
order: 71
description: Grant items, record the claim and hide a choice on the next visit.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guide
version: 0.3.1
audience: Dialogue creators
tags:
  - dialogue
  - reward
---

## Give three apples once per player

Start with [a short conversation](#core/dialogue-system), then open a general node's **Choices**. This example grants three apples, records the claim with player tag `welcome_received`, and hides the gift button on the next visit.

The screens and result below were checked with **DRM 0.3.1 / NeoForge 1.21.1**. The choice is named **Receive three apples**; use your own wording if preferred.

## Forge: start with the saved example

**[Download the one-time reward example](assets/media/dialogue/welcome_reward_once.zip)**

In the tested **DRM 0.3.1 / Forge 1.20.1** build, choosing Item for a new action left it as Goto. Use this saved example and edit its existing values instead of following the NeoForge action-creation steps below.

1. Extract the whole `welcome_reward_once` folder into the game or server's `config/dochi_rpg_maker/dialogue_sets/`. The resulting path must be `dialogue_sets/welcome_reward_once/dialogue_set.json`. Preserve any existing work with that name first.
2. Open **Dialogue Editor → Load → welcome_reward_once → Load**.
3. Select **dialogue_1 → Choices → Receive three apples → Choice actions**. Edit the existing Item row's item and count, or test the example unchanged first.
4. **Save As** your own name, then follow “Save, apply and visit again” below. Change a claim tag in both the condition and the Tag action.

![welcome_reward_once selected in Forge Load Dialogue Set.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-load.png "DRM 0.3.1 / Forge 1.20.1. Put the complete extracted folder under dialogue_sets, then select it here. If missing, check for an extra nested folder.")

![The loaded Item grant and Tag record in Forge.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-actions.png "DRM 0.3.1 / Forge 1.20.1. The existing Item action is give / minecraft:apple / 3. Applying this set to an NPC produced three apples and the claim tag on the server.")

The download contains the complete folder saved by the NeoForge editor. Loading it, applying it, claiming and revisiting were also verified on Forge. The new-action steps below show NeoForge.

## 1. Add the item grant

1. Select the gift choice and enter **Label: Receive three apples**.
2. Open **Choice actions**. Replace the example Goto or use **+ Action** to add a row.
3. Choose **Type: Item → Item: give**.
4. Set **ID: minecraft:apple**, **Count: 3**. Scroll the right panel down if Count is outside the visible area.

## 2. Record the claim

Use **+ Action** on the same choice. Set the new row to **Type: Tag**, **Op: add**, **Tag: welcome_received**. The list is **Item → Tag**.

![An Item grant followed by the welcome_received Tag action.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-actions.png "DRM 0.3.1 / NeoForge 1.21.1. The first action grants three apples; the second records the claim on the player. Match the tag name in the next condition exactly.")

This two-action example closes after granting the gift. To show a reply afterward, create a general node and add **Goto → that node last**, after the grant and claim record.

## 3. Hide the choice after claiming

On the same choice, open **Condition list → Add** and set **Type: tag**, **Op: not**, **Tag: welcome_received**.

![A tag not condition requiring no welcome_received tag.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-condition.png "DRM 0.3.1 / NeoForge 1.21.1. This choice has 2 actions / 1 conditions. The condition controls visibility; it does not grant anything itself.")

**has** requires the tag to be present. Use **not** here so only a player who has not claimed the gift sees the button.

## 4. Save, apply and visit again

1. **Save As** `welcome_reward_once`.
2. Right-click the NPC with DRM Core, select that set under **Dialogue JSON**, then **Apply Dialogue**.
3. Empty both hands and speak to the NPC from nearby.
4. Click the gift choice and check for three apples in your inventory.
5. Speak again and check that the gift choice is gone.

![Only Goodbye remains when the dialogue is reopened after the gift.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-hidden.png "DRM 0.3.1 / NeoForge 1.21.1. After confirming three apples and the welcome_received player tag on the server, interaction was repeated. The gift choice was hidden and Goodbye remained.")

The tag belongs to the player. If several NPCs use the same tag, claiming from one hides that gift on the others too. Use separate names such as `gate_guard_gift` and `innkeeper_gift` for independent gifts, matching each action and condition.

![Only Goodbye remains after claiming the imported gift on Forge.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-hidden.png "DRM 0.3.1 / Forge 1.20.1. This is a second conversation after loading the provided set, applying it to the NPC, clicking the gift and verifying the server grant and claim tag.")

## Test the gift again

With administrator permission, remove your claim tag and speak again:

```text
/tag @s remove welcome_received
```

This does not take back the apples already received. Check inventory quantities separately during repeat tests.

## Continue into a shop or quest

Prepare prices and stock in [NPC Shop](#core/shop-system), then connect **Go Shop**. Use the current actions in the [quest guide](#core/quest-system) for quest acceptance and objectives. See [conditions and actions](#core/conditions-actions) for node, Routes and choice visibility.

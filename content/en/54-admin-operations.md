---
title: DRM Administration
slug: drm-administration
order: 140
description: Player data inspection and controlled operator mutations in the current Admin screen.
product: core
category: Operations
section: operations
status: Stable
version: 0.3.1
audience: Server operators
tags:
  - admin
  - operations
---

## Enable the server tool first

**The tested DRM 0.3.1 file on Forge 1.20.1 has an opening issue.** Applying the policy below succeeded, but opening the Admin inspection screen crashed the client. F7 inspection is not a verified working procedure in that file. The screenshots and successful player/tag operations below are from NeoForge 1.21.1; use the same setup path after obtaining a Forge build that fixes this issue.

A new server policy starts with DRM Admin **OFF**. F7 cannot open it in that state, even for an operator.

1. Join the world or server and right-click air with DRM Core.
2. Open **Default Configs → Admin** at the bottom of the editor selector.
3. Turn on **Enable DRM Admin** and click **Apply**.
4. Wait for **Saved and applied on the server**.
5. Close settings and press **F7**. Editing this policy requires operator permission level 2 or higher.

![Enabling DRM Admin and applying its server policy.](assets/media/guides/drm-031-neo1211/admin-server-policy.png "DRM 0.3.1 / NeoForge 1.21.1. Apply actually saved enabled: true in config/dochi_rpg_maker-admin.json and received the server acknowledgement. This policy is separate from enabling the keyboard shortcut.")

If F7 does nothing, also check **Keyboard shortcuts → Open DRM Admin** and Minecraft's key bindings. The server policy file is `config/dochi_rpg_maker-admin.json`, outside the `config/dochi_rpg_maker/` folder.

## Choose a player and data category

Read the panels left to right: **Players → Data categories → Data list → Edit tools**. Select the player first, then a category such as Tags, DRM Quests or Currency. Clicking a data row opens its details on the right.

![The selected player in DRM Admin Overview.](assets/media/guides/drm-031-neo1211/admin-overview.png "DRM 0.3.1 / NeoForge 1.21.1. This is the single documentation player DocsGuide. Factions, FTB Quests, Trainer battles and Stored data are Unavailable because their integrations are absent in this environment.")

**Checkboxes mark mutation targets**; the blue selected row chooses the details being viewed. Batch deletion and resets act on checked entries. Check the search results and player before selecting all.

## Check a one-time gift record

If the [one-time reward conversation](#core/dialogue-rewards) shows the wrong gift state, find `welcome_received` in that player's **Tags**. Its presence means the claim condition is met. Removing the tag for another test does not take back previously granted apples. No data on a new player means no tags exist yet. Enter a name under Tag to add and click Add to create one; check an existing tag before deleting it.

![welcome_received added through DRM Admin and confirmed by the server.](assets/media/guides/drm-031-neo1211/admin-tag-added.png "DRM 0.3.1 / NeoForge 1.21.1. Entering welcome_received under Tag to add and clicking Add created this row. Server confirmed and the actual server player tag were checked. Delete is disabled because the row is not checked.")

## State resets versus content editing

| Task | Tool or effect |
| --- | --- |
| Change dialogue, products, objectives or rewards | Edit and apply the document in its authoring editor |
| Inspect tags, balances or quest state | Select the player and category in DRM Admin |
| Reset a quest | Changes progress; does not automatically reclaim granted items or money |
| Change FTB Quests progress | May affect the player's team |
| Change DNPC friendly/hostile relationships | Use DNPC relationships; these differ from CustomNPCs Factions here |

CustomNPCs Factions and Stored data apply to supported older Minecraft targets. CustomNPCs is excluded on 26.3.

## 0.2.8 administration

Batch changes show progress. On Fabric / NeoForge, a compatible Cobblemon Editor registers trainer progress inspection and victory-count resets. These tools require the addon. In the current addon, resetting the battle count also unhides a post-battle-hidden NPC. Check the target player, NPC and reset scope.

## Delete trainer battle history — 0.2.9

Use this with a compatible Cobblemon Editor on Fabric/NeoForge 1.21.1. Select the player and records in Trainer Battles, then choose **Delete battle history**.

- **Reset battle count** retains reward markers and history.
- **Delete battle history** removes the selected player's entire progress-ID record, including counts, last result, battle ID, reward markers and pending rewards. Pending rewards can be lost and previously claimed rewards can become claimable again.

Read the confirmation before applying. Active battles or trainer reservations reject deletion. Offline targets use the existing queued-operation workflow. Addons without history deletion leave that button unavailable; count reset remains available.

`Unknown trainer` or ClearCount 0 does not establish an orphan record: the NPC may be unloaded, historical identity data may be missing, or history may remain after a count reset. There is no automatic cleanup. Review permanently retired IDs manually. This operation does not delete NPC entities or trainer JSON.

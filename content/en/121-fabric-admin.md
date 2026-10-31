---
title: DRM Administration
slug: drm-administration
order: 140
description: Inspect player state and perform authorized changes through DRM Admin.
product: core-fabric
category: Operations
section: operations
status: Stable
version: 0.3.1
audience: Server operators
tags:
  - admin
  - operations
---

## Opening DRM Admin

The default key is `F7`. The key does not grant permission; the server checks the operator's access before opening the screen.

Authorized operators can inspect or change:

- Player tags and DRM currency
- DRM quest state
- Advancements
- CustomNPCs faction scores and storeddata
- FTB Quests progress when FTB Quests is installed

Sections for unavailable integrations are disabled.

## Operating Safely

- Recheck the selected player before applying a change.
- Read the confirmation for resets, completion, and other important actions.
- Resetting a quest does not take back rewards that were already granted.
- FTB Quests progress may belong to a team rather than one player.

Create definitions and content in their normal editors. Use DRM Admin for player-state inspection and recovery.

## 0.2.8 administration

Batch changes show progress. On Fabric / NeoForge, a compatible Cobblemon Editor registers trainer progress inspection and victory-count resets. These tools require the addon. In the current addon, resetting the battle count also unhides a post-battle-hidden NPC. Check the target player, NPC and reset scope.

## Delete trainer battle history — 0.2.9

On Fabric / NeoForge 1.21.1, use a Cobblemon Editor 0.2.7 build exposing the deletion API. Select the player and records in Trainer Battles, then choose **Delete battle history**.

- **Reset battle count** retains reward markers and history.
- **Delete battle history** removes the selected player's entire progress-ID record, including counts, last result, battle ID, reward markers and pending rewards. Pending rewards can be lost and previously claimed rewards can become claimable again.

Read the confirmation before applying. Active battles or trainer reservations reject deletion. Offline targets use the existing queued-operation workflow. If the addon lacks the deletion API, only deletion is disabled; count reset remains available.

`Unknown trainer` or ClearCount 0 does not establish an orphan record: the NPC may be unloaded, historical identity data may be missing, or history may remain after a count reset. There is no automatic cleanup. Review permanently retired IDs manually. This operation does not delete NPC entities or trainer JSON.

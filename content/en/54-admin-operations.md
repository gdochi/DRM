---
title: DRM Administration
slug: drm-administration
order: 140
description: Player data inspection and controlled operator mutations in the current Admin screen.
product: core
category: Operations
section: operations
status: Stable
version: 0.2.9
audience: Server operators
tags:
  - admin
  - operations
---

## Opening The Admin Screen

`F7` is the default DRM Admin key. The server still authorizes the request; a keybind does not grant permission.

The screen can inspect and, when authorized, mutate player tags, DRM quest state, optional FTB Quests progress, advancements, CustomNPCs faction points, and CustomNPCs stored data. Available sections depend on installed integrations and server policy.

## Safety Rules

- Select and verify the target player before every mutation.
- Destructive or side-effecting changes require confirmation.
- Resetting a DRM quest does not reclaim rewards that were already granted.
- FTB Quests progress may be team-scoped and can affect other team members.
- Keep server logs/audit data when diagnosing an operator action.

Use editor screens for authoring definitions. Use DRM Admin only for player-state operations and recovery.

## 0.2.8 administration

Batch changes show progress. On Fabric / NeoForge, a compatible Cobblemon Editor registers trainer progress inspection and victory-count resets. These tools require the addon. In the current addon, resetting the battle count also unhides a post-battle-hidden NPC. Check the target player, NPC and reset scope.

## Delete trainer battle history — 0.2.9

On Fabric / NeoForge 1.21.1, use a Cobblemon Editor 0.2.7 build exposing the deletion API. Select the player and records in Trainer Battles, then choose **Delete battle history**.

- **Reset battle count** retains reward markers and history.
- **Delete battle history** removes the selected player's entire progress-ID record, including counts, last result, battle ID, reward markers and pending rewards. Pending rewards can be lost and previously claimed rewards can become claimable again.

Read the confirmation before applying. Active battles or trainer reservations reject deletion. Offline targets use the existing queued-operation workflow. If the addon lacks the deletion API, only deletion is disabled; count reset remains available.

`Unknown trainer` or ClearCount 0 does not establish an orphan record: the NPC may be unloaded, historical identity data may be missing, or history may remain after a count reset. There is no automatic cleanup. Review permanently retired IDs manually. This operation does not delete NPC entities or trainer JSON.

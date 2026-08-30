---
title: DRM Administration
slug: drm-administration
order: 140
description: Player data inspection and controlled operator mutations in the 0.1.4 admin screen.
product: core
category: Operations
section: operations
status: Stable
version: 0.1.4
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


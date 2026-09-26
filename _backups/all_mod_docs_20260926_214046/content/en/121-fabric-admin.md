---
title: DRM Administration
slug: drm-administration
order: 140
description: Inspect player state and perform authorized changes through DRM Admin.
product: core-fabric
category: Operations
section: operations
status: Stable
version: 0.1.8
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

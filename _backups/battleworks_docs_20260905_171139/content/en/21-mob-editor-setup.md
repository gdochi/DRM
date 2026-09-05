---
title: Mob Editor Setup
slug: mob-editor-setup
order: 220
description: Environment and preparation checklist before building content with Mob Editor.
product: mob-editor
category: Overview
status: Beta
version: 0.1.x
audience: Server operators
tags:
  - setup
  - mods
  - environment
---

## Base environment

Mob Editor is usually considered together with the following tools.

| Item | Role |
| --- | --- |
| CustomNPCs | Base NPC and event system |
| DRM Mob Editor | Combat pattern addon |
| GeckoLib stack | Useful when playback of animations matters |
| Better Combat | Helpful when timing melee systems such as parry |

## Pre-build checklist

1. Prepare a dedicated test world.
2. Organize NPC models and animation assets first.
3. Write down combat distance, attack types, and status rules before building.
4. Finish one pattern first, then add phases and branches.

## Suggested order

- Step 1: verify idle and movement state
- Step 2: implement one attack pattern
- Step 3: sync hitboxes with animation timing
- Step 4: add pattern sets and phase switching
- Step 5: add parry, stagger, and reactive logic

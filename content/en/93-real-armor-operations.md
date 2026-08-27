---
title: Commands and Troubleshooting
slug: dochi-real-armor-operations
order: 930
description: Admin commands, status checks, debug use, and common CustomNPCs or Easy NPC problems.
product: dochi-real-armor
category: Commands and Troubleshooting
section: operations
status: Stable
version: 0.1.1
audience: Server operators and modpack creators
tags:
  - commands
  - troubleshooting
  - debug
---

## Commands

All commands require permission level 2.

```mcfunction
/dochi_real_armor status
/dochi_real_armor split true
/dochi_real_armor durability false
/dochi_real_armor debug true
```

`status` reports body-part mode, durability, debug, CustomNPCs support, and Easy NPC support. The other commands update the common config immediately.

## Debug safely

Enable debug temporarily to see the selected body part and reduced damage. Debug is an observer: armor must continue working after `/dochi_real_armor debug false`.

## Troubleshooting checklist

| Symptom | Check |
| --- | --- |
| No armor reduction | Confirm armor calculation and the matching NPC compatibility switch are ON |
| Easy NPC is ignored | Confirm its entity ID uses the `easy_npc` namespace and Easy NPC support is ON |
| Lower-body shots use the wrong armor | Confirm version 0.1.1 is installed on the server and test with body-part mode plus debug |
| Every slot protects every hit | Body-part armor is OFF, or the hit position could not be resolved |
| Protection does nothing | Check the Protection switch and whether the damage type bypasses armor or enchantments |
| GUI changes are rejected | Use an account with permission level 2 |
| Duplicate-mod startup error | Remove older `cnpc_real_armor` and `dochi_real_armor` jars so only one release remains |

When reporting a problem, include `logs/latest.log`, the exact jar filenames, the NPC mod and weapon mod versions, relevant settings, and whether the same hit behaves differently with debug OFF.

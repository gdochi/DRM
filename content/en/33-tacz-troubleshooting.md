---
title: Troubleshooting
slug: tacz-troubleshooting
order: 340
description: Common TaCZ Fire issues and a practical check order.
product: cnpc-tacz-fire
category: Troubleshooting
status: Beta
version: 0.1.x
audience: Operators
tags:
  - troubleshooting
  - reload
  - npc
---

## Symptom guide

| Symptom | Possible cause | Check |
| --- | --- | --- |
| NPC does not fire | no target, unsaved setting, distance rule | confirm target and combat stance |
| Stops after reload | ammo setup or compatibility | check Reload and magazine behavior |
| Cannot damage same side | filter or friendly logic | review faction and tag exceptions |
| Looks like the NPC holds ammo instead of a gun | render or state sync issue | retest on the latest version |

## Fast diagnosis order

1. reproduce with one fresh NPC in a minimal environment
2. keep only one gun and one ammo type
3. disable target filters and test against default hostility
4. compare Reload on versus off
5. separate visual sync issues from actual combat logic issues

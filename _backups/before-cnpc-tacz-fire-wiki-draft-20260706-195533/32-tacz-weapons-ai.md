---
title: Weapon Settings and Combat AI
slug: tacz-weapons-ai
order: 330
description: Key settings such as accuracy, fire frequency, target selection, and melee fallback.
product: cnpc-tacz-fire
category: Firearm AI
status: Beta
version: 0.1.x
audience: Firearm NPC creators
tags:
  - weapon
  - ai
  - targeting
---

## Frequently adjusted settings

| Setting | Meaning | Tip |
| --- | --- | --- |
| Accuracy | actual hit spread | too high and the NPC stops feeling human |
| Fire Frequency | interval between shots | think of it separately from RPM |
| Reload | whether the NPC reloads | test together with magazine mods |
| Stance | combat posture | verify persistence for Auto and Ranged |

## Target selection

Before balancing the NPC, decide whether it should:

- use default hostility only,
- attack same-faction targets through tag exceptions,
- be limited by entity id or faction,
- or coordinate around boss-style team behavior.

## Melee fallback

A firearm NPC may still switch to melee based on range or ammo state. Be careful not to confuse **detection distance** with **melee weapon distance**.

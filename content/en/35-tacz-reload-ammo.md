---
title: Reload and Ammo
slug: tacz-reload-ammo
order: 345
description: Guidelines for reload timing, magazine behavior, ammo consumption, and compatibility checks.
product: cnpc-tacz-fire
category: Firearm AI
status: Beta
version: 0.1.x
audience: Firearm NPC creators
tags:
  - reload
  - ammo
  - magazine
---

## Reload design baseline

Reload is not just refilling ammunition. It controls the rhythm of firearm NPC combat. If it is too fast, players have no breathing room. If it is too slow, the NPC becomes ineffective.

| Item | Meaning |
| --- | --- |
| Ammo Source | where the ammo is consumed from |
| Magazine | whether magazine mods are used |
| Reload Time | vulnerability window during reload |
| Fallback | whether the NPC switches to melee when out of ammo |

## Check order

1. Verify firing logic with infinite ammo first.
2. Enable ammo consumption and count shots.
3. Confirm reload animation or wait time is applied.
4. If using a magazine mod, separate magazine items from ammo items.
5. Decide whether no-ammo state means idle, retreat, or melee fallback.

## Common problems

- NPC appears to hold ammo instead of a weapon
- NPC does not return to firing after reload
- magazine mod and base ammo logic conflict
- client looks loaded but server-side ammo state is empty

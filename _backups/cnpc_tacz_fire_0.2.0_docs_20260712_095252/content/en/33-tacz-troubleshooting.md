---
title: Troubleshooting
slug: tacz-troubleshooting
order: 360
description: A practical diagnosis order for TACZ Fire NPC setup, targets, ammo, visuals, and performance.
product: cnpc-tacz-fire
category: Operations
section: operations
status: Draft
version: 0.1.9
audience: Operators
tags:
  - troubleshooting
  - reload
  - npc
---

## Fast isolation flow

When a firearm NPC fails, reduce the setup before changing many values:

1. Use one fresh CustomNPCs NPC.
2. Use one real TACZ gun.
3. Turn on `TACZ Fire NPC Mode` and `Enabled`.
4. Use `Stance: Ranged` or `Stance: Auto`.
5. Keep `Ammo Stock: -1`.
6. Remove target filters.
7. Test with one visible target inside `Max Distance`.

If this works, the addon and gun loop are fine. Add filters, finite ammo, movement, pools, and FX one step at a time.

## Symptom guide

| Symptom | Likely checks |
| --- | --- |
| `TACZ NPC Core` does not open the GUI | You must be in creative mode and right-click a CustomNPCs NPC. Other living entities are rejected. |
| NPC never fires | Check `TACZ Fire NPC Mode`, `Enabled`, stance, selected TACZ gun, target visibility, `Max Distance`, target rules, and ammo stock. |
| NPC sees the target but waits | Check `Combat Delay Ms`, `Detect Angle`, `Instant Combat Angle`, and line of sight. |
| NPC fires through rhythm incorrectly | Check `RPM Override`, `RPM Min`, `RPM Max`, `Burst Fire`, and the native TACZ gun fire mode. |
| NPC stops after emptying the gun | Check `Reload`, `Supply Ammo`, `Ammo Stock`, `Reload Duration Ms`, and gun reload compatibility. |
| NPC attacks the wrong target | Clear entity ID filters, required tags, rejected tags, and same-faction tag rules, then re-add them gradually. |
| NPC holds the wrong item | Confirm the ranged weapon is a real TACZ gun and that ammo or magazine items are not being used as offhand reload props. |
| Visual alert icons are missing | Check the per-NPC `Alert Icons` setting and the client-side `cnpc_tacz_fire Config` marker visibility settings. |
| GUI looks distorted | Adjust `GUI Scale` in vanilla video settings, then check the screen again. |

## GUI access problems

`TACZ NPC Core` is an editor item. It only works on CustomNPCs NPC entities and editing requires creative mode. If a user can right-click other entities but the TACZ Fire screen never opens, confirm the target entity class is actually a CustomNPCs NPC and that the client and server both have the addon installed.

## Fire and line-of-sight problems

CNPC TACZ Fire performs a final line-of-sight check before shooting. This prevents direct fire through cover. If an NPC detects a target but does not shoot, test in an open flat area before tuning AI. If it works in the open area, the issue is cover, angle, detection delay, or range, not the gun item.

`Detect Distance` controls initial awareness. `Max Distance` controls ranged fire. Do not tune one as if it were the other.

## Ammo and reload problems

The most common ammo issue is mixing physical ammo items with addon ammo stock. Do not put TACZ ammo or magazines in the NPC offhand. Use `Ammo Stock`, `Supply Ammo`, and reload state.

For diagnosis:

1. Set `Ammo Stock` to `-1`.
2. Keep `Reload` and `Supply Ammo` ON.
3. Set `Reload Duration Ms` to `0` to use the held gun's native reload time.
4. Test again with one target.

If infinite stock works but finite stock fails, the NPC probably reaches `0` spare rounds or regeneration is not configured.

## Target rule problems

An empty entity ID list allows normal behavior. A filled entity ID list becomes an allow list. Required tags and rejected tags are additional filters. If all three are active, a target must pass all of them.

When in doubt, export the setup profile, simplify it, and re-import after testing.

## Performance and logging

Large `Detect Distance`, large `Max Distance`, broad target lists, and many managed NPCs can increase scanning and combat work. Keep early tests small. Debug logging can be useful during setup, but turn it down after confirming the encounter so logs stay readable on a live server.

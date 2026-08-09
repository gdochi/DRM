---
title: Troubleshooting
slug: tacz-troubleshooting
order: 360
description: A practical diagnosis order for TACZ Fire NPC setup, targets, ammo, visuals, and performance.
product: cnpc-tacz-fire
category: Operations
section: operations
status: Draft
version: 0.2.3
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
| `CTF Npc Core` does not open the GUI | You must be in creative mode and right-click a CustomNPCs NPC. Other living entities are rejected. |
| NPC never fires | Check `TACZ Fire NPC Mode`, `Enabled`, stance, selected TACZ gun, target visibility, `Max Distance`, target rules, and ammo stock. |
| NPC sees the target but waits | Check `Combat Delay Ms`, `Detect Angle`, `Instant Combat Angle`, and line of sight. |
| NPC misses a nearby target behind it | Check `Close Detection` and `Close Detect Distance`. OFF is expected for an intentional backstab-style NPC. |
| NPC ignores player gunshots or block actions | Check `Sound Detection`, each event range, `Detect Distance`, and `Sound Investigation`. Creative and spectator players are ignored. |
| NPC firing rhythm is wrong | Check `RPM Mode`, the selected `Fixed RPM` or `RPM Min/Max`, burst minimum and maximum shots, and the native TACZ gun fire mode. |
| Accuracy ramp never advances | Confirm the target is a player, visible, inside `Ramp Max Range`, and moving horizontally above `Min Target Speed`. |
| NPC stops after emptying the gun | Check `Reload`, `Supply Ammo`, `Ammo Stock`, `Reload Type`, `Ammo-Aware Switching`, and melee/unarmed fallback. |
| Custom damage, knockback, or attack speed is not used | Check the `Gun Spec`/`Weapon Spec` or `Custom` selection and values in `Gun` and `Melee`. |
| Better Combat weapon motion does not appear | Check Better Combat, Mob Player Animator, the NPC's `Better Combat Compatibility`, and registered attacks for the weapon. A vanilla main-hand swing is expected when the registered motion cannot be played. |
| Custom attack speed is ignored during Better Combat compatibility | Compatibility locks timing to the weapon's effective `ATTACK_SPEED`. Disable `Better Combat Compatibility` to use a `Custom` attack speed. |
| Patrol walks into a wall or pauses every step | Check `Default Walk Speed`, patrol points, vertical height, and A* reachability. Also confirm 0.2.3 is installed on both client and server. |
| NPC attacks the wrong target | Clear entity ID filters, required tags, rejected tags, and same-faction tag rules, then re-add them gradually. |
| NPC keeps showing the previous or wrong weapon | Confirm that both client and server use 0.2.3, then save the NPC again. Also confirm the ranged weapon is a real TACZ gun and that ammo or magazine items are not used as offhand reload props. |
| `CTF Pose Core` does not open the editor | Confirm Creative mode, a Steve/Alex CustomNPCs player model, a distance within 12 blocks, and that the core remains in either hand. |
| A saved custom pose is not visible | In `CTF Npc Core > Pose`, confirm that the action uses `Custom JSON` and the intended profile. The file must exist under `config/cnpc_tacz_fire/poses/`. |
| Pool changes cannot be saved | Make the inline chance total `100%` or press `Equalize`. Editing one row does not automatically redistribute the others. |
| Entries below a long armor pool are not visible | Scroll inside the armor pool with the mouse wheel or drag its right-side internal scrollbar. If the whole screen is clipped, also adjust vanilla `GUI Scale`. |
| Visual alert icons are missing | Check the per-NPC `Alert Icons` setting and the client-side `cnpc_tacz_fire Config` marker visibility settings. |
| GUI looks distorted | Adjust `GUI Scale` in vanilla video settings, then check the screen again. |
| Cover never starts | Check global `[experimentalCover].enabled`, per-NPC `Enable Cover`, the individual trigger, combat phase, search radius, cooldown, and whether a reachable blast/shot-blocking position exists. |
| Cover starts but the NPC never resumes fighting | Check `Max Duration`, `Hold Time`, peek settings, route reachability, and that 0.2.3 is installed. Interrupted cover paths should be reacquired while progress and phase timeouts remain the failure guards. |
| Hire confirmation does not open | The NPC must be a managed TACZ Fire NPC with `Hire available` enabled. Use an empty hand or normal interaction item; `CTF Npc Core`, `CTF Mercenary Core`, and CustomNPCs interaction tools keep their own editor behavior. |
| Mercenary GUI clicks or tooltips are offset | Use 0.2.3 on both sides. The mercenary settings, confirmation screen, and command HUD use fit-to-viewport scaling and translated mouse coordinates. |

## GUI access problems

`CTF Npc Core` is an editor item. It only works on CustomNPCs NPC entities and editing requires creative mode. If a user can right-click other entities but the TACZ Fire screen never opens, confirm the target entity class is actually a CustomNPCs NPC and that the client and server both have the addon installed.

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

## Sound detection problems

Version 0.2.0 hearing does not continuously scan every played sound. It registers short-lived stimuli only for player TACZ gunshots, TACZ reloads, block breaking, and block placement. Each event range is saved at or below `Detect Distance`. Even with `Move To Source`, the NPC should not move when active combat or a position-locked stance has priority.

## Patrol and pathfinding problems

Area and Route patrols keep an active A* path at `Default Walk Speed`. If path creation or completion fails, the NPC retries immediately within a bounded limit and then skips the point. Repeatedly pushing into a wall or trying to break through it is not expected behavior.

For a failed one-block descent, confirm that a direct Route point uses the intended feet Y. Version 0.2.0 resolves nearby standable ground and includes vertical distance in arrival checks, but it does not force movement through fences, sealed gaps, or platforms that have no safe route.

## Damage policy problems

`Gun Spec` preserves native TACZ gun damage, while `Custom` applies fixed damage only to this NPC's managed bullet. Melee `Weapon Spec` uses item attributes; melee `Custom` can independently set damage, knockback, and attacks per second. Switch one policy at a time when isolating an unexpected result.

Enabling `Better Combat Compatibility` locks attack speed to the held item's effective `ATTACK_SPEED`, and `Overview` shows `Weapon Spec (locked)`. If weapon attributes fail to apply on an older build, update both client and server to 0.2.3 before testing again.

## Weapon switching and melee animation problems

The addon synchronizes the server-confirmed main-hand state to clients. If a melee equip readback does not match the requested item, the NPC delays the attack and retries the equip instead of attacking with the wrong weapon. A brief pause during the switch can therefore be expected; a permanently stale weapon should first be checked for mismatched client and server JAR versions.

Exact Better Combat NPC motion requires both Better Combat and Mob Player Animator. Even with `Better Combat Compatibility` enabled, the addon falls back to a vanilla main-hand swing when Mob Player Animator is missing or no usable registered weapon motion is available.

## Pose editor problems

`CTF Pose Core` is a Creative-mode creator tool and currently supports Steve/Alex CustomNPCs player models. Keep the core in the main hand or offhand and remain within 12 blocks of the NPC while editing.

`Save` stores only the pose JSON. `Save & Apply` stores it and applies it as the current NPC's custom idle pose. To use the profile for a specific action, open `CTF Npc Core > Pose`, set that action to `Custom JSON`, select the profile, and save the NPC setup.

Pose files are stored under:

```text
config/cnpc_tacz_fire/poses/
```

Locking head-tracking or walking-leg axes can make motion look frozen. Leave axes that should keep following normal movement on `Animation`, and set only the axes you need to override to `Custom`.

## Target rule problems

An empty entity ID list allows managed CustomNPCs to inherit real CustomNPCs faction hostility. It does not make passive or unrelated entities automatic targets. A filled entity ID list becomes an explicit selector, while required and rejected tags remain additional filters.

When in doubt, export the setup profile, simplify it, and re-import after testing.

## Performance and logging

Version 0.2.0 uses spatial indexes for long `Detect Distance` searches and event-based hearing to reduce repeated scans. Large `Detect Distance`, large `Max Distance`, broad target lists, and many managed NPCs can still increase candidate filtering and combat work. Keep early tests small.

Detailed main-hand, weapon-switch, cover, and animation traces stay behind debug logging. Enable debug only while reproducing a problem, then turn it down so live server logs remain readable.

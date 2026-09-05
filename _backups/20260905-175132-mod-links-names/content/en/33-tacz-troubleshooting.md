---
title: Troubleshooting
slug: warfare-troubleshooting
order: 360
description: Diagnose Dochi's Warfare NPC guns, optional adapters, vehicle AI, clone tools, traps, ammo, visuals, and performance.
product: dochi-warfare
category: Operations
section: operations
status: Draft
version: 0.2.5
audience: Operators
tags:
  - troubleshooting
  - reload
  - npc
---

## Fast isolation flow

When a firearm NPC fails, reduce the setup before changing many values:

1. Use one fresh CustomNPCs NPC.
2. Use one plain TACZ 1.1.8 gun before testing an optional PointBlank or SuperbWarfare adapter.
3. Turn on `TACZ Fire NPC Mode` and `Enabled`.
4. Use `Stance: Ranged` or `Stance: Auto`.
5. Keep `Ammo Stock: -1`.
6. Remove target filters.
7. Test with one visible target inside `Max Distance`.

If this works, the addon and gun loop are fine. Add filters, finite ammo, movement, pools, and FX one step at a time.

## Symptom guide

| Symptom | Likely checks |
| --- | --- |
| `DW Npc Core` does not open the expected GUI | Use Creative mode. Right-click a CustomNPCs NPC for NPC settings, a supported SuperbWarfare vehicle for vehicle settings, or air for the clone library. |
| NPC never fires | Check `TACZ Fire NPC Mode`, `Enabled`, stance, selected supported gun, target visibility, `Max Distance`, target rules, and ammo stock. |
| NPC sees the target but waits | Check `Combat Delay Ms`, `Detect Angle`, `Instant Combat Angle`, and line of sight. |
| NPC misses a nearby target behind it | Check `Close Detection` and `Close Detect Distance`. OFF is expected for an intentional backstab-style NPC. |
| NPC ignores player gunshots or block actions | Check `Sound Detection`, each event range, `Detect Distance`, and `Sound Investigation`. Creative and spectator players are ignored. |
| NPC firing rhythm is wrong | Check `RPM Mode`, `Fixed RPM` or `RPM Min/Max`, burst limits, and the operated gun's native fire mode/cooldown. External adapters cannot exceed a gun's supported native cadence. |
| Accuracy ramp never advances | Confirm the target is a player, visible, inside `Ramp Max Range`, and moving horizontally above `Min Target Speed`. |
| NPC stops after emptying the gun | Check `Reload`, `Supply Ammo`, `Ammo Stock`, `Reload Type`, `Ammo-Aware Switching`, and melee/unarmed fallback. |
| Custom damage, knockback, or attack speed is not used | Check the `Gun Spec`/`Weapon Spec` or `Custom` selection and values in `Gun` and `Melee`. |
| Better Combat weapon motion does not appear | Check Better Combat, Mob Player Animator, the NPC's `Better Combat Compatibility`, and registered attacks for the weapon. A vanilla main-hand swing is expected when the registered motion cannot be played. |
| Custom attack speed is ignored during Better Combat compatibility | Compatibility locks timing to the weapon's effective `ATTACK_SPEED`. Disable `Better Combat Compatibility` to use a `Custom` attack speed. |
| Patrol walks into a wall or pauses every step | Check `Default Walk Speed`, patrol points, vertical height, and A* reachability. Also confirm 0.2.5 is installed on both client and server. |
| NPC attacks the wrong target | Clear entity ID filters, required tags, rejected tags, and same-faction tag rules, then re-add them gradually. |
| NPC keeps showing the previous or wrong weapon | Confirm both sides use 0.2.5, then save again. Verify the item is supported by its TACZ, PointBlank, or SuperbWarfare adapter and remove physical offhand ammo props. |
| `DW Pose Core` does not open the editor | Confirm Creative mode, a Steve/Alex CustomNPCs player model, a distance within 12 blocks, and that the core remains in either hand. |
| A saved custom pose is not visible | In `DW Npc Core > Pose`, confirm that the action uses `Custom JSON` and the intended profile. The file must exist under `config/dochi_warfare/poses/`. |
| Pool changes cannot be saved | Make the inline chance total `100%` or press `Equalize`. Editing one row does not automatically redistribute the others. |
| Entries below a long armor pool are not visible | Scroll inside the armor pool with the mouse wheel or drag its right-side internal scrollbar. If the whole screen is clipped, also adjust vanilla `GUI Scale`. |
| Visual alert icons are missing | Check the per-NPC `Alert Icons` setting and the client-side `dochi_warfare Config` marker visibility settings. |
| GUI looks distorted | Adjust `GUI Scale` in vanilla video settings, then check the screen again. |
| Cover never starts | Check global `[experimentalCover].enabled`, per-NPC `Enable Cover`, the individual trigger, combat phase, search radius, cooldown, and whether a reachable blast/shot-blocking position exists. |
| Cover starts but the NPC never resumes fighting | Check `Max Duration`, `Hold Time`, peek settings, route reachability, and that 0.2.5 is installed. Cover must protect both chest and head; the server retries another reachable candidate after an initial search failure. |
| Hire confirmation does not open | The NPC must be a DW-managed NPC with `Hire available` enabled. Use an empty hand or normal interaction item; `DW Npc Core`, `DW Mercenary Core`, and CustomNPCs interaction tools keep their own editor behavior. |
| Mercenary GUI clicks or tooltips are offset | Use 0.2.5 on both sides. The mercenary settings, confirmation screen, and command HUD use fit-to-viewport scaling and translated mouse coordinates. |
| PointBlank gun is not accepted | Install exactly one supported branch, 1.11.1 or 2.1.0. If both are detected, the bridge disables itself. |
| SuperbWarfare gun or vehicle is unavailable | Use 0.8.9 final build `6effe4385`. Other ABIs fail closed before the compatibility mixins are applied. |
| Vehicle AI is enabled but does not move | Remove player passengers, confirm the exact SuperbWarfare ABI, movement mode, home/destination, and loaded terrain. Helicopters and fixed-wing aircraft need enough climb and turn space. |
| A vehicle turret tracks the target but never fires | In `Weapons`, verify that the mount is ON and included by `Weapon use mode`. Check per-weapon ammo, reload, crew requirement, minimum/maximum range, and turret pitch limits. A very close target may require the vehicle to back away. |
| A vehicle repeats a small circle or launches and stops abruptly | Confirm 0.2.5 is installed on both sides, then check Area Patrol radius, movement speed, and reachable terrain. Version 0.2.5 uses distributed patrol sectors and distance-aware throttle/braking. |
| The Crew page keeps loading or cannot board an NPC | Press `Refresh` and reselect the vehicle/seat. Use a valid server NPC clone or inventory NPC soul stone, stay within 64 blocks with Creative permission, and confirm the NPC is not hostile to the vehicle faction. |
| A trap does not trigger | Put away `DW Booby Trap Core`, verify both `Enabled` and `Armed`, check owner bypass/cooldown, and confirm optional LRT payload dependencies. |

## GUI access problems

`DW Npc Core` is a Creative-mode editor item with three contexts: CustomNPCs NPC, supported SuperbWarfare vehicle, and air for the clone library. If the NPC editor never opens, confirm the target is actually a CustomNPCs NPC and both sides have the addon. If the vehicle editor is unavailable, check the exact SuperbWarfare ABI rather than treating it as an NPC-target failure.

## Fire and line-of-sight problems

Dochi's Warfare performs a final line-of-sight check before shooting. If an NPC detects a target but does not shoot, test a plain TACZ gun in an open flat area. If TACZ works but an optional gun does not, isolate the adapter version, native cooldown, and unsupported special-fire rules before changing AI.

`Detect Distance` controls initial awareness. `Max Distance` controls ranged fire. Do not tune one as if it were the other.

## Ammo and reload problems

The most common ammo issue is mixing physical ammo items with DW ammo stock. Do not put TACZ, PointBlank, or SuperbWarfare ammo or magazines in the NPC offhand. Use `Ammo Stock`, `Supply Ammo`, and reload state.

For diagnosis:

1. Set `Ammo Stock` to `-1`.
2. Keep `Reload` and `Supply Ammo` ON.
3. Set `Reload Duration Ms` to `0` to use the held gun's native reload time.
4. Test again with one target.

If infinite stock works but finite stock fails, the NPC probably reaches `0` spare rounds or regeneration is not configured.

## Sound detection problems

Version 0.2.5 uses one server-authoritative stimulus system for managed gunshots, reloads, block sounds, entity sounds, and position-only world sounds. Survival and Creative players are handled consistently. Each configured range remains bounded, and `Move To Source` still yields to active combat or a position-locked stance.

## Patrol and pathfinding problems

Area and Route patrols keep an active A* path at `Default Walk Speed`. If path creation or completion fails, the NPC retries immediately within a bounded limit and then skips the point. Repeatedly pushing into a wall or trying to break through it is not expected behavior.

For a failed one-block descent, confirm that a direct Route point uses the intended feet Y. Version 0.2.0 resolves nearby standable ground and includes vertical distance in arrival checks, but it does not force movement through fences, sealed gaps, or platforms that have no safe route.

## Damage policy problems

`Gun Spec` preserves the operated gun's native damage behavior, while `Custom` applies the supported DW override for this NPC. Melee `Weapon Spec` uses item attributes; melee `Custom` can independently set damage, knockback, and attacks per second. Switch one policy at a time when isolating an unexpected result.

Enabling `Better Combat Compatibility` locks attack speed to the held item's effective `ATTACK_SPEED`, and `Overview` shows `Weapon Spec (locked)`. If weapon attributes fail to apply on an older build, update both client and server to 0.2.5 before testing again.

## Weapon switching and melee animation problems

The addon synchronizes the server-confirmed main-hand state to clients. If a melee equip readback does not match the requested item, the NPC delays the attack and retries the equip instead of attacking with the wrong weapon. A brief pause during the switch can therefore be expected; a permanently stale weapon should first be checked for mismatched client and server JAR versions.

Exact Better Combat NPC motion requires both Better Combat and Mob Player Animator. Even with `Better Combat Compatibility` enabled, the addon falls back to a vanilla main-hand swing when Mob Player Animator is missing or no usable registered weapon motion is available.

## Pose editor problems

`DW Pose Core` is a Creative-mode creator tool and currently supports Steve/Alex CustomNPCs player models. Keep the core in the main hand or offhand and remain within 12 blocks of the NPC while editing.

`Save` stores only the pose JSON. `Save & Apply` stores it and applies it as the current NPC's custom idle pose. To use the profile for a specific action, open `DW Npc Core > Pose`, set that action to `Custom JSON`, select the profile, and save the NPC setup.

Pose files are stored under:

```text
config/dochi_warfare/poses/
```

Locking head-tracking or walking-leg axes can make motion look frozen. Leave axes that should keep following normal movement on `Animation`, and set only the axes you need to override to `Custom`.

## Target rule problems

An empty entity ID list allows managed CustomNPCs to inherit real CustomNPCs faction hostility. It does not make passive or unrelated entities automatic targets. A filled entity ID list becomes an explicit selector, while required and rejected tags remain additional filters.

When in doubt, export the setup profile, simplify it, and re-import after testing.

## Performance and logging

Version 0.2.0 uses spatial indexes for long `Detect Distance` searches and event-based hearing to reduce repeated scans. Large `Detect Distance`, large `Max Distance`, broad target lists, and many managed NPCs can still increase candidate filtering and combat work. Keep early tests small.

Detailed main-hand, weapon-switch, cover, and animation traces stay behind debug logging. Enable debug only while reproducing a problem, then turn it down so live server logs remain readable.

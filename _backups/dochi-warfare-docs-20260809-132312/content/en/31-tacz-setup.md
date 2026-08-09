---
title: Setup and First NPC
slug: tacz-setup
order: 320
description: Install checks, the CTF Npc Core workflow, and the first safe test configuration.
product: cnpc-tacz-fire
category: Setup
section: setup
status: Draft
version: 0.2.3
audience: Server operators
tags:
  - setup
  - TACZ
  - gui
---

## Install checklist

CNPC TACZ Fire targets Forge 1.20.1. Building firearm NPCs requires TACZ and CustomNPCs. Install optional playerAnimator, Better Combat, and Mob Player Animator only for the animation integrations you use.

| Component | Required for this wiki workflow | Notes |
| --- | --- | --- |
| Forge | Yes | Use a 1.20.1 Forge 47+ environment. |
| TACZ | Yes | NPC guns are real TACZ gun items. |
| CustomNPCs | Yes for NPC setup | The `CTF Npc Core` item only edits CustomNPCs NPC entities. |
| CNPC TACZ Fire | Yes | Add it on both sides for normal modded server play. |
| playerAnimator | Optional | Client-side animation support when present. |
| Better Combat | Optional | Install it for registered melee weapon attacks, poses, and weapon-based attack timing. Keep the server and client mod sets aligned in normal multiplayer. |
| Mob Player Animator | Optional | Client mod required for exact Better Combat NPC motion playback. Without it, the NPC falls back to a vanilla main-hand swing. |

## Open the per-NPC GUI

1. Enter creative mode.
2. Get the item named `CTF Npc Core`.
3. Right-click a CustomNPCs NPC with `CTF Npc Core`.
4. The `cnpc_tacz_fire` setup screen opens for that NPC.
5. Change settings, then press `Save`.

`CTF Npc Core` is intentionally an editor tool. It rejects non-CustomNPCs targets and requires creative mode for editing.

## First safe test

Use this first pass before building a complex combat encounter:

1. Turn on `TACZ Fire NPC Mode`.
2. Keep `Enabled` ON.
3. In `Gun`, choose one TACZ gun from your player inventory.
4. In the `General` settings under `Senses`, use `Stance: Auto` or `Stance: Ranged`.
5. In `Fire`, choose `RPM Mode: TACZ Native` so the gun uses its native RPM.
6. In `Ammo`, keep `Reload` and `Supply Ammo` ON and keep `Ammo Stock` at `-1`.
7. In `Targets`, start with normal behavior or one simple entity ID.
8. Save and test against one clear target in line of sight.

After that works, add finite ammo, random pools, advanced target filters, movement tuning, FX, and grenades one piece at a time.

## GUI category map

| Category | Use it for |
| --- | --- |
| `Overview` | Read-only summary of the effective policy, sensing, combat, damage, equipment, ammo, target, and FX values. |
| `Fire` | firing range, melee switch range, `RPM Mode`, fixed or random RPM, fixed or ramping accuracy, and random-length bursts. |
| `Senses` | `General`/`Advanced` stance, tactical movement, idle movement, visual awareness, close detection, and player sound detection. |
| `Cover` | experimental cover triggers, damage thresholds, search limits, hold/cooldown timing, movement speed, and peek cycles. |
| `Targets` | entity IDs, filters, required/rejected tags, import/export profiles. |
| `Ammo` | reload type, ammo stock and regeneration, reload movement, and empty-ammo fallback. |
| `Gun` | selecting TACZ guns, ranged damage policy, ranged weapon pools with inline chances, and NPC preview. |
| `Melee` | selecting non-TACZ items, damage/knockback/attack-speed policies, `Better Combat Compatibility`, melee pools with inline chances, and NPC preview. |
| `Armor` | scrollable armor set pools using real head, chest, legs, and feet slots, with NPC preview. |
| `Grenade` | optional grenade throws when supported throwable data is available. |
| `Visual & FX` | Steve/Alex skin pools, alert icons, detected/shoot sounds, and CustomNPCs say text. |
| `Pose` | built-in or custom pose mapping for idle, alert, firing, combat movement, reload, weapon switch, melee, and grenade actions. |

`Overview` is read-only; move to the relevant category to edit a value. Long `Senses` pages provide `Quick View` navigation, and the `?` help tour can auto-scroll to controls outside the current viewport.

Version 0.2.1 edits weapon, skin, and armor pool chances directly in each entry row. Changing one entry does not rebalance the others, so make the total `100%` or press `Equalize` to distribute it explicitly. A single entry remains fixed at `100%`.

## Topbar tools and separate editor items

The 0.2.3 topbar separates file actions, help tools, and `TACZ Fire NPC Mode`.

| Area | Tools |
| --- | --- |
| File actions | `Save`, `Close`, `Load`, `Save As` |
| Help | `Help`, `Easy Build`, `Presets`, tutorial, and tooltips |
| Mode | The current NPC's `TACZ Fire NPC Mode` |

The three core items open different creator screens.

| Item | Creator screen |
| --- | --- |
| `CTF Npc Core` | Guns, combat AI, ammo, targets, equipment, FX, and per-action pose mapping |
| `CTF Pose Core` | Custom poses and TACZ gun render transforms for Steve/Alex NPCs |
| `CTF Mercenary Core` | Server-authoritative mercenary contract terms |

The player-facing hire confirmation and `J` command HUD are in-game runtime screens, not creator editors.

## Config file

Global bridge defaults are generated at:

```text
config/cnpc_tacz_fire-common.toml
```

The GUI is still the normal authoring path. Use the config for defaults and script bridge behavior, then override individual NPCs through the GUI or scripts when a specific encounter needs special behavior.

Experimental cover also requires the global switch below. The server switch and the NPC's own `Enable Cover` setting must both allow the behavior.

```toml
[experimentalCover]
enabled = true
```

## Setup profile files

The topbar `Load` and `Save As` controls use JSON profiles under:

```text
config/cnpc_tacz_fire/target_entities/
```

Current `Save As` profiles store the full TACZ Fire setup for the NPC, not just the target list. Configure one NPC, save a profile, then `Load` it on another CustomNPCs NPC to quickly clone the same combat setup. Legacy target-only JSON can still be loaded, but the current authoring flow is best understood as an NPC setup preset.

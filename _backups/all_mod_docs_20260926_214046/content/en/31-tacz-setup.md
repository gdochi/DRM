---
title: Setup and First NPC
slug: warfare-setup
order: 320
description: Install Dochi's Warfare 0.2.7, open the DW creator tools, migrate legacy profiles, and build a first managed NPC.
product: dochi-warfare
category: Setup
section: setup
status: Draft
version: 0.2.7
audience: Server operators
tags:
  - setup
  - TACZ
  - gui
---

## Install checklist

Dochi's Warfare 0.2.7 targets Forge 1.20.1. TACZ is the required gun-runtime baseline, and Player Animator is required on the client. CustomNPCs is required for the NPC workflow; PointBlank, SuperbWarfare, Better Combat, Mob Player Animator, and LesRaisins Tactical Equipments are optional integrations.

| Component | Required for this wiki workflow | Notes |
| --- | --- | --- |
| Forge | Yes | Use a 1.20.1 Forge 47+ environment. |
| TACZ | Yes | Use 1.1.8 through the supported 1.1.x range on client and server. |
| Player Animator | Client required | Required for the shared managed-gun animation controller. |
| CustomNPCs | Yes for NPC setup | Required for managed NPCs, mercenaries, poses, and NPC clones. |
| Dochi's Warfare | Yes | Add the 0.2.7 JAR on both sides for normal modded server play. |
| PointBlank | Optional | Use exactly one supported branch: 1.11.1 or 2.1.0. |
| SuperbWarfare | Optional | Native gun and vehicle support requires 0.8.9 final build `6effe4385`. |
| Better Combat | Optional | Install it for registered melee weapon attacks, poses, and weapon-based attack timing. Keep the server and client mod sets aligned in normal multiplayer. |
| Mob Player Animator | Optional | Client mod required for exact Better Combat NPC motion playback. Without it, the NPC falls back to a vanilla main-hand swing. |
| LesRaisins Tactical Equipments | Optional | Enables supported grenade throws and LRT grenade booby-trap payloads. |

## Open the per-NPC GUI

1. Enter creative mode.
2. Get the item named `DW Npc Core`.
3. Right-click a CustomNPCs NPC with `DW Npc Core`.
4. The DW per-NPC setup screen opens for that NPC.
5. Change settings, then press `Save`.

`DW Npc Core` is a Creative-mode editor tool. Right-click a CustomNPCs NPC for firearm settings, a supported SuperbWarfare vehicle for vehicle AI settings, or air for the NPC/vehicle clone library.

## First safe test

Use this first pass before building a complex combat encounter:

1. Turn on `TACZ Fire NPC Mode`.
2. Keep `Enabled` ON.
3. In `Gun`, choose one supported gun from your player inventory. Start with a plain TACZ gun before testing an optional adapter.
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
| `Gun` | selecting supported TACZ, PointBlank, or SuperbWarfare guns, ranged damage policy, ranged pools, and NPC preview. |
| `Melee` | selecting non-TACZ items, damage/knockback/attack-speed policies, `Better Combat Compatibility`, melee pools with inline chances, and NPC preview. |
| `Armor` | scrollable armor set pools using real head, chest, legs, and feet slots, with NPC preview. |
| `Grenade` | optional grenade throws when supported throwable data is available. |
| `Visual & FX` | Steve/Alex skin pools, alert icons, detected/shoot sounds, and CustomNPCs say text. |
| `Pose` | built-in or custom pose mapping for idle, alert, firing, combat movement, reload, weapon switch, melee, and grenade actions. |

`Overview` is read-only; move to the relevant category to edit a value. Long `Senses` pages provide `Quick View` navigation, and the `?` help tour can auto-scroll to controls outside the current viewport.

Version 0.2.1 edits weapon, skin, and armor pool chances directly in each entry row. Changing one entry does not rebalance the others, so make the total `100%` or press `Equalize` to distribute it explicitly. A single entry remains fixed at `100%`.

## Topbar tools and separate editor items

The topbar separates file actions, help tools, and `TACZ Fire NPC Mode`.

| Area | Tools |
| --- | --- |
| File actions | `Save`, `Close`, `Load`, `Save As` |
| Help | `Help`, `Easy Build`, `Presets`, tutorial, and tooltips |
| Mode | The current NPC's `TACZ Fire NPC Mode` |

The four core items open different creator screens.

| Item | Creator screen |
| --- | --- |
| `DW Npc Core` | Guns, combat AI, ammo, targets, equipment, FX, and per-action pose mapping |
| `DW Pose Core` | Custom poses and TACZ gun render transforms for Steve/Alex NPCs |
| `DW Mercenary Core` | Server-authoritative mercenary contract terms |
| `DW Booby Trap Core` | Password, explosion, effect, launch, lifecycle, profile, and manager tools for blocks |

Right-click air with `DW Npc Core` to open the `Entity Clone Library`. It stores and summons server-side JSON templates for CustomNPCs NPCs and supported SuperbWarfare vehicles. This is separate from the NPC setup `Save As` profile flow.

The player-facing hire confirmation and `J` command HUD are in-game runtime screens, not creator editors.

## Config file

Global bridge defaults are generated at:

```text
config/dochi_warfare-common.toml
```

Client-only visual defaults are stored separately in `config/dochi_warfare-client.toml`.

The GUI is still the normal authoring path. Use the config for defaults and script bridge behavior, then override individual NPCs through the GUI or scripts when a specific encounter needs special behavior.

Experimental cover also requires the global switch below. The server switch and the NPC's own `Enable Cover` setting must both allow the behavior.

```toml
[experimentalCover]
enabled = true
```

## Setup profile files

The topbar `Load` and `Save As` controls use JSON profiles under:

```text
config/dochi_warfare/target_entities/
```

Current `Save As` profiles store the NPC's full DW firearm setup, not just the target list. Configure one NPC, save a profile, then `Load` it on another CustomNPCs NPC to quickly clone the same combat setup. Legacy target-only JSON can still be loaded, but the current authoring flow is best understood as an NPC setup preset.

Reusable JSON now belongs under `config/dochi_warfare/`. On first use, the mod copies missing legacy files from `config/cnpc_tacz_fire/` without overwriting newer destination files or deleting the recoverable originals. Other 0.2.7 libraries use these roots:

```text
config/dochi_warfare/poses/
config/dochi_warfare/vehicle_ai/profiles/
config/dochi_warfare/entity_clones/
config/dochi_warfare/booby_traps/profiles/
```

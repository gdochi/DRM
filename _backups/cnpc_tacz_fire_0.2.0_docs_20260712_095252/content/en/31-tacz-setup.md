---
title: Setup and First NPC
slug: tacz-setup
order: 320
description: Install checks, the TACZ NPC Core workflow, and the first safe test configuration.
product: cnpc-tacz-fire
category: Setup
section: setup
status: Draft
version: 0.1.9
audience: Server operators
tags:
  - setup
  - TACZ
  - gui
---

## Install checklist

CNPC TACZ Fire targets Forge 1.20.1. Building firearm NPCs requires TACZ and CustomNPCs. Optional dependencies such as playerAnimator and Better Combat can make animation and melee behavior more varied.

| Component | Required for this wiki workflow | Notes |
| --- | --- | --- |
| Forge | Yes | Use a 1.20.1 Forge 47+ environment. |
| TACZ | Yes | NPC guns are real TACZ gun items. |
| CustomNPCs | Yes for NPC setup | The `TACZ NPC Core` item only edits CustomNPCs NPC entities. |
| CNPC TACZ Fire | Yes | Add it on both sides for normal modded server play. |
| playerAnimator | Optional | Client-side animation support when present. |
| Better Combat | Optional | Used for melee animation support when available. |

## Open the per-NPC GUI

1. Enter creative mode.
2. Get the item named `TACZ NPC Core`.
3. Right-click a CustomNPCs NPC with `TACZ NPC Core`.
4. The `cnpc_tacz_fire` setup screen opens for that NPC.
5. Change settings, then press `Save`.

`TACZ NPC Core` is intentionally an editor tool. It rejects non-CustomNPCs targets and requires creative mode for editing.

## First safe test

Use this first pass before building a complex combat encounter:

1. Turn on `TACZ Fire NPC Mode`.
2. Keep `Enabled` ON.
3. In `Gun`, choose one TACZ gun from your player inventory.
4. In `Basic`, use `Stance: Auto` or `Stance: Ranged`.
5. In `Fire`, leave `RPM Override` at `0` so the gun uses its native TACZ RPM.
6. In `Ammo`, keep `Reload` and `Supply Ammo` ON and keep `Ammo Stock` at `-1`.
7. In `Targets`, start with normal behavior or one simple entity ID.
8. Save and test against one clear target in line of sight.

After that works, add finite ammo, random pools, advanced target filters, movement tuning, FX, and grenades one piece at a time.

## GUI category map

| Category | Use it for |
| --- | --- |
| `Basic` | Main mode toggles, stance, advanced stance mode, preview behavior. |
| `Fire` | firing range, melee switch range, RPM, random RPM, accuracy, fire modes. |
| `AI` | tactical move, engagement mode, idle movement, awareness, speeds, spacing. |
| `Targets` | entity IDs, filters, required/rejected tags, import/export profiles. |
| `Ammo` | reload, ammo stock, stock max, ammo regeneration, reload movement. |
| `Gun` | selecting player TACZ guns and building ranged weapon pools. |
| `Melee` | selecting non-TACZ melee items and melee weapon pools. |
| `Visual` | skin pools using CustomNPCs texture paths. |
| `Armor` | armor set pools using real head, chest, legs, and feet slots. |
| `FX` | detected/shoot sounds and CustomNPCs say text. |
| `Grenade` | optional grenade throws when supported throwable data is available. |

## Config file

Global bridge defaults are generated at:

```text
config/cnpc_tacz_fire-common.toml
```

The GUI is still the normal authoring path. Use the config for defaults and script bridge behavior, then override individual NPCs through the GUI or scripts when a specific encounter needs special behavior.

## Setup profile files

The `Import` and `Export` controls in `Targets` use JSON profiles under:

```text
config/cnpc_tacz_fire/target_entities/
```

Current exports store the full TACZ Fire setup for the NPC, not just the target list. Configure one NPC, export a profile, then import it on another CustomNPCs NPC to quickly clone the same combat setup. Legacy target-only JSON can still be imported, but the current authoring flow is best understood as an NPC setup preset.

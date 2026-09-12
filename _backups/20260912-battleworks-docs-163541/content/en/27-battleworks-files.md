---
title: Files, Samples, and Troubleshooting
slug: battleworks-files
order: 280
description: Distinguish combat documents from model assets and test the supplied samples.
product: mob-editor
section: reference
category: Battleworks
status: Guide
version: 0.1.2
audience: Combat content creators
tags:
  - battleworks
  - combat
---

## Storage

Paths below are relative to the instance's `config/dochi_rpg_maker` directory.

| Path | Contents |
| --- | --- |
| `mobs/*.json` | Battleworks NPC combat specifications |
| `mobs/battleworks_default.json` | Starter combat template installed when absent |
| `mobs/animations/` | Model animation assets used by DRM |
| `mobs/geometry/` | Model geometry assets used by DRM |
| `settings/battleworks_client.json` | Client settings, including panel sizes and folded state |
| `settings/battleworks_global_rules.json` | Global magic parry, lock-on, and hitbox debug switches |

The legacy hitbox workspace can use `settings/battleworks_hitbox_workspace.json`. Settings remain inside DRM's directory tree. Files from older settings locations are copied only when their current destination does not already exist.

Preserve default files as templates and use **Save As** for working copies. NPC application lists inspect both path and document contents, excluding model and animation JSON from combat candidates.

## Jar Fist samples

The JAR includes two JSON files under `samples/`. Extract the desired files into `config/dochi_rpg_maker/mobs/` and use **Load**. The Jar Fist model, textures, and animation assets are not included in those samples; use a Gecko NPC already configured with compatible assets in NPC Basic.

| File | Purpose |
| --- | --- |
| `battleworks_sample_jar_fist_preview.json` | Combat disabled, zero damage; preview ready pose, sword, multiple contacts, and roll |
| `battleworks_sample_jar_fist_combat.json` | Combat enabled; sword damage 4, multi-contact hitbox damage 2, and a zero-damage retreat roll |

The samples target a Jar Fist setup with `ready_to_fight`, `sword_attack`, `sword_attack2`, and `roll` clips. For another model, select clips from its actual catalog. Geometry and contact ticks are test values, not a finished setup fitted to every weapon.

The combat sample uses CNPC's existing hostile target. Pursuit and facing are enabled, approach spacing is 2.0 blocks, and sword attacks start within 2.7 blocks. Supplementary automatic scanning is disabled.

## Test in the world

1. Apply the combat sample to a test NPC with its model configured.
2. In survival mode, let CNPC acquire a hostile target.
3. Move 6–8 blocks away to test approach, then sideways to check head/body facing.
4. Compare attack contact timing with the individual timeline rows.
5. Test renewed pursuit after retreating, navigation around an obstacle, and pursuit after rolling.

Repeated contacts on the same target are affected by damage immunity and defense. Do not assume every listed damage value will be added unchanged.

## JSON structure reference

This section is for creators who edit JSON directly. Normal authoring can use the editor.

| Field | Contents |
| --- | --- |
| `schema` | `dochi.battleworks.v1` for current combat documents |
| `id`, `displayName`, `enabled` | Identity, name, and combat activation |
| `combat`, `manager`, `phases` | Targeting, pursuit, selection rules, and phases |
| `patterns` | Windup / Action / Recovery, events, and actions |
| `hitboxes` | Reusable contact definitions |
| `death` | Death timeline |
| `drmNpcModel` | Model settings snapshot exported by DRM |

Legacy Mob Profile JSON/NBT remains a compatibility input. The internal mod ID `drm_addon_mob_editor` is retained for saved-data compatibility. Built-in CNPC-Gecko save compatibility means an external CNPC-Gecko-Addon JAR is not required.

## After an upgrade

Close the game, replace the JAR, and restart. Avoid duplicate Battleworks installations. Reapply the combat specification: editing a file does not automatically replace the copy already stored on the NPC.

For combat-start crashes or playback issues, check the Battleworks, DRM, and CNPC versions, the applied combat document, `logs/latest.log`, and any crash report.

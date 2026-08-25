---
title: Presets, Sharing, and Operations
slug: dochi-spawn-control-presets-operations
order: 850
description: Save and load policy, storage paths, target conflicts, commands, sharing, and troubleshooting.
product: dochi-spawn-control
category: Presets and Operations
section: operations
status: Draft
version: 0.1.0
audience: Server operators and content distributors
tags:
  - presets
  - commands
  - troubleshooting
---

## Save behavior

| Action | Result |
| --- | --- |
| `Save` | Store and immediately apply the draft as active `spawn_control.json` |
| `Save As → Complete Set` | Save every rule, native policy, and global scheduler budget as a named set and activate it |
| `Save As → Current Target Preset` | Save every profile for the current entity or clone plus its recommended native policy |
| `Reset` | Return to the baseline received when the editor opened or last refreshed after save |
| `Create New` | Start an empty set draft without changing the active server configuration until save |

A target preset excludes global scheduler budgets. This allows one mob's rules to move between servers without replacing the destination server's operating budget.

## Storage paths

In singleplayer, `<world>` is `saves/<world>/`. On a dedicated server, it is the configured world folder.

```text
<world>/serverconfig/dochi_rpg_maker/spawn_control/
├─ spawn_control.json
├─ spawn_control.json.bak
├─ sets/
│  └─ <set-id>.json
└─ targets/
   └─ <target-preset-id>.json
```

Active configuration and presets are written through a temporary file before replacement. When a destination already exists, its previous version is retained as `.bak`.

## Loading and conflict policy

Loading a Complete Set replaces the active set and requires confirmation. A target preset merges into the unsaved draft currently open in the editor and requires one policy.

| Policy | Behavior |
| --- | --- |
| `Replace Target` | Remove existing rules for the same target, then add the preset rules |
| `Merge by ID` | Replace profiles with the same target and profile ID; retain the others |
| `Keep Both` | Retain existing rules and assign a new unique ID when an imported ID conflicts |

The preset's recommended native policy may be applied for registered entities unless Keep Both is selected. Always recheck `Native: ON/OFF` after import.

## Sharing

Distribute JSON files from `sets/` or `targets/`. Presets record required mod namespaces in `requiredMods`.

- A modded EntityType preset requires the mod that registers that EntityType.
- A CustomNPCs target preset records the `customnpcs` requirement but does not contain clone data.
- Distribute a server clone with the same tab and name separately.
- A missing target does not delete the whole file; only the affected profile is isolated as disabled with an error.

## Administrator commands

Every `/drmspawn` command requires permission level 2.

| Command | Purpose |
| --- | --- |
| `/drmspawn open` | Send the latest server snapshot to the player and open the editor |
| `/drmspawn reload` | Reload the active file from disk and reset scheduling state |
| `/drmspawn validate` | Print profile count and validation issues |
| `/drmspawn stats` | Print tracked generated counts and recent diagnostic statistics |
| `/drmspawn explain <profile>` | Evaluate conditions and caps at the command position |
| `/drmspawn spawn-test <profile>` | Create one real managed entity near the command position |
| `/drmspawn clear-generated [profile]` | Remove all managed generated entities or only those from one profile |

`spawn-test` changes the real world. Use a test world or isolated area before running it on a production server.

## Troubleshooting

### Another entity's rule appears under the selected entity

1. Confirm that the middle view is `Selected Target`; `All Configured` intentionally lists every target.
2. Read the EntityType or clone label under the inspector to identify the selected rule's real target.
3. If the UI has no `Selected Target` and `All Configured` buttons and still shows the older `Target / + / All / P / Name` layout, an old JAR is running.
4. Remove duplicate JARs, install the same current build on client and server, and fully restart both.

The current build clears the previous profile and inspector when a newly selected target has no rule. Profiles never inherit across targets.

### An enabled profile does not spawn

Check in this order:

1. Run `Advanced Diagnostics → Check Here` or `/drmspawn explain <profile>`.
2. Check dimension, time, Y, biome, light, and player distance.
3. Confirm Surface, Cave, Air, or Water placement for the target.
4. Check Spawn Chance and Interval Ticks.
5. Check server, dimension, chunk, player, profile, target, and shared-group caps.
6. Confirm that candidate chunks are loaded.
7. Inspect the server log for a Forge spawn denial from another mod.

### A profile disables itself

- `MISSING ENTITY`: the mod registering that EntityType is absent
- `MISSING CLONE`: the saved CustomNPCs tab/name does not exist
- `CUSTOMNPCS NOT LOADED`: a clone profile is active without CustomNPCs
- `ADAPTER REQUIRED OR UNSUPPORTED`: `MISC`, a blank CustomNPCs EntityType, or a special creation path
- `RUNTIME ERROR`: an isolated target-adapter failure occurred

### Native and managed mobs both appear too often

Check whether native spawning and a managed profile are both enabled. After the managed rule is proven, save `Native: OFF` for that registered entity, then tune its profile, target, and server caps.

## Recommended backup scope

- `<world>/serverconfig/dochi_rpg_maker/spawn_control/`
- the complete world save
- server and client mod version lists
- matching server-clone data when using CustomNPCs targets

Backing up JSON alone does not restore entities already present in the world or data owned by other mods.

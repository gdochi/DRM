# dochi spawn control

**dochi spawn control** is a server-authoritative natural spawn editor for Minecraft Forge 1.20.1. It is designed for modpack creators, server owners, and adventure map makers who need direct control over where, when, and how registered mobs appear.

Create natural spawn profiles from an in-game editor instead of manually maintaining biome modifiers or writing scripts for every spawn rule. Profiles are stored per target, validated by the server, and applied to normal registered mob types or optional CustomNPCs server clones.

## Main Features

### In-Game Spawn Editor

- Open the editor with a configurable key binding. The default key is `K`.
- Browse registered living mob types and supported CustomNPCs clones.
- Search the catalog by entity ID, localized name, mod, or support status.
- Preview supported entities and clones before creating rules.
- View rules for the selected target or switch to an all-configured management view.
- Create, duplicate, enable, disable, search, filter, sort, and delete profiles in-game.
- Keep every profile attached to its own entity or clone target. Rules are not inherited when another target is selected.

### Detailed Spawn Conditions

Each profile can control:

- Dimension and biome allowlists.
- Minimum and maximum Y level.
- Minimum and maximum light level.
- Start and end time.
- Minimum and maximum player distance.
- Spawn chance and evaluation interval.
- Minimum and maximum group size.
- Search radius and position attempts.
- Surface, cave, air, or water placement.
- Priority and enabled state.

### Population Caps And Lifecycle

- Per-profile population cap.
- Per-target population cap.
- Shared group cap across related profiles.
- Per-player, per-chunk, per-dimension, and server-wide caps.
- Optional persistent entities.
- Maximum lifetime controls.
- Automatic despawn when no player remains nearby.

Population caps track entities generated and marked by dochi spawn control. Ordinary unmanaged entities and unrelated command summons are not automatically added to these managed counts.

### Native Spawn Policy

- Keep or block the original natural spawn path for each registered entity type.
- Blocking applies to Forge `NATURAL` and `CHUNK_GENERATION` spawn reasons.
- Commands, spawners, structures, breeding, buckets, and scripted creation are not globally blocked.
- Managed spawns created by this mod can pass its native blocker while still respecting spawn denials from other Forge mods.

### Presets And Sharing

- Save the complete active configuration as a reusable spawn set.
- Save rules for one selected entity or clone as a target preset.
- Load presets with explicit replace, merge-by-ID, or keep-both conflict policies.
- Record required mod IDs in preset data for safer pack sharing.
- Share set and target JSON files between servers or modpacks.

CustomNPCs clone presets store the clone reference, not the clone data itself. Distribute the matching clone separately when sharing a pack.

### Diagnostics And Commands

The editor includes tools for checking the current location, performing a confirmed test spawn, and clearing managed test entities.

Server operators can also use:

```text
/drmspawn open
/drmspawn reload
/drmspawn validate
/drmspawn stats
/drmspawn explain <profile>
/drmspawn spawn-test <profile>
/drmspawn clear-generated [profile]
```

Editing and administrative actions require permission level 2 or creative-mode access.

## Data Folder

The active world configuration is stored at:

```text
<world>/serverconfig/dochi_rpg_maker/spawn_control/spawn_control.json
```

Reusable set and target presets are stored under the neighboring `sets` and `targets` folders. Back up the world `serverconfig/dochi_rpg_maker/spawn_control/` folder before replacing important configurations.

## Requirements

- Minecraft `1.20.1`
- Forge `47.2.0` or later in the Forge 47 series
- Java `17`
- Install the same dochi spawn control build on the client and server

## Optional Integrations

- **Dochi RPG Maker 0.1.4+** — integrates the editor with the shared DRM editor UI and skin.
- **CustomNPCs 1.20.1+** — enables server-clone targets and clone spawning.
- **Dochi Warfare 0.2.5+** — recognized as an optional supported integration.

The base registered-mob workflow does not require these optional mods.

## Who Is This For?

dochi spawn control is intended for:

- Modpack creators balancing modded mob populations.
- Server owners who want server-authoritative spawn rules.
- Adventure map makers building controlled encounters.
- CustomNPCs creators who want clone-based ambient or encounter spawning.
- Creators who prefer an in-game editor over hand-writing every JSON rule.

## Current Status

Version `0.1.0` is the initial release. Configuration formats and editor workflows may evolve as the mod grows, so keep backups when updating production worlds.

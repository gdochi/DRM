# dochi spawn control 0.1.0

## Initial Release

The first public release of **dochi spawn control** for Minecraft Forge 1.20.1.

### Added

- Server-authoritative natural spawn profiles for registered living mob types.
- Optional CustomNPCs server-clone targets and clone spawning.
- In-game editor with entity catalog search, target preview, profile inspector, bulk selection, filtering, and sorting.
- Target-owned profile views that prevent rules from appearing under unrelated entities.
- Dimension, biome, height, light, time, and player-distance conditions.
- Spawn chance, interval, group size, radius, position-attempt, and placement controls.
- Surface, cave, air, and water placement modes.
- Per-profile, target, shared-group, player, chunk, dimension, and server population caps.
- Persistent, maximum-lifetime, and no-nearby-player despawn policies.
- Per-entity native spawn policy for Forge natural and chunk-generation spawns.
- Full-set and per-target presets with replace, merge-by-ID, and keep-both conflict handling.
- Server-side JSON validation, atomic saving, backups, and reusable preset storage.
- Current-location diagnostics, confirmed test spawning, managed-entity statistics, and cleanup tools.
- `/drmspawn` administration commands for opening, reloading, validating, diagnosing, testing, and cleaning generated entities.
- English and Korean interface localization.
- Optional integration with Dochi RPG Maker 0.1.4+, CustomNPCs 1.20.1+, and Dochi Warfare 0.2.5+.

### Fixed Before Release

- Selecting a new entity now clears an unrelated previous profile selection.
- The default profile list only shows rules owned by the selected target.
- Selecting a rule from the all-configured view moves the catalog to that rule's real target.

### Compatibility

- Minecraft: `1.20.1`
- Mod loader: `Forge 47.2.0+`
- Java: `17`
- Environment: client and server
- Release file: `dochi_spawn_control-0.1.0.jar`

### Important Notes

- Install the same JAR on the client and server.
- Editing requires permission level 2 or creative-mode access.
- Native spawn blocking affects `NATURAL` and `CHUNK_GENERATION`; it does not globally block commands, spawners, structures, breeding, buckets, or scripted spawning.
- CustomNPCs clone presets reference existing clone data. The matching clone must be distributed separately.
- Back up `<world>/serverconfig/dochi_rpg_maker/spawn_control/` before replacing an important server configuration.

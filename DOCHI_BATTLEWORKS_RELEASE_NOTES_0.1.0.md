# Dochi's Battleworks 0.1.0 — Forge 1.20.1

- Added the Pattern Workbench, reusable Hitbox Library, and Combat Rules workflow.
- Added named action tracks, searchable selection, draggable timing pins, and resizable panels with arrow controls.
- Added NPC-specific animation catalogs and Play/Stop controls inside the hitbox scene.
- Fixed Gecko scene playback and NPC nameplate orientation.
- Fixed combat-start crashes caused by incorrect runtime field references.
- Added pursuit and head/body facing between patterns while preserving authored attack movement.
- Filtered model/animation JSON out of NPC combat application lists and consolidated files under DRM's folders.
- Included separate Jar Fist preview and combat JSON samples.

**Required:** Forge 1.20.1, CustomNPCs, and DRM 0.1.4+. Animation and skill providers are optional.

**Updating:** Replace the JAR and restart, then reapply edited combat JSON to existing NPCs. The NPC keeps its own document copy.


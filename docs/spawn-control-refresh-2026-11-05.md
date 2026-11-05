# Spawn Control documentation refresh — 2026-11-05

Updated the local documentation to Spawn Control 0.1.5 using the active COMMON and independent 26.3 workspaces. This changes documentation only.

## Content

- Updated all 45 existing Spawn Control pages across Korean, English, Spanish, French and Portuguese.
- Added five localized `spawn-control-guards` pages covering biome/structure ID and tag filters, explicit squad counts, equipment, per-structure occupancy, respawn delays and backup requirements.
- Added two reviewed native Fabric 26.3 screenshots from the 2026-11-04 guard-flyout evidence and registered their actual 854 × 480 dimensions. Captions describe settings, not a completed gameplay scenario.
- Updated Forge inspector tabs/catalog squad additions and the shared diagnostic window, scrolling and full-squad test behavior.
- Updated DNPC natural-template support to include both 26.3 loaders. Retained the permanent 26.3 CustomNPCs exclusion and optional integration boundaries without adding dependency version floors.
- Preserved 0.1.4 screenshot captions and the previously executed 0.1.4 Superb Warfare example as historical capture/runtime evidence.
- Documented schema 4, existing schema 2/3 readers, world-owned occupancy and the absence of automatic cross-version item-data conversion.

## Sources checked

Desktop workspace paths below use their existing literal backticks in the folder names.

- ``[COMMON] Dochi`s Spawn Control``: `AGENTS.md`, root properties, `docs/release-0.1.5/`, `docs/guards-2026-11-03/README.md`, `docs/gui-controls-2026-11-04.md`, `docs/guard-flyout-fix-2026-11-04.md` and `docs/diagnostics-ui-2026-11-04.md`.
- Live COMMON `SpawnProfile`, `SquadSettings`, `EquipmentSettings`, `SpawnLocations`, `GuardEditorScreen`, Forge inspector/catalog handling, loader-owned diagnostic screens and localized labels.
- ``[26.3] Dochi`s Spawn Control``: instructions/properties, release/guard evidence, shared squad model and Fabric scheduler/template adapter dispatch. Retained reports cover both loaders; source review is not a new gameplay test.
- Latest collected production JAR metadata and SHA-256 hashes match `diagnostics-ui-2026-11-04-artifacts.json` for all five targets:

| Loader / Minecraft | Packaged version | SHA-256 |
| --- | --- | --- |
| Forge 1.20.1 | 0.1.5 | 61e66e9c3477eb3380914210fd038ec65528e4bc5d0b25aa15d7a6976a9c2e11 |
| Fabric 1.21.1 | 0.1.5 | 5649f23c96868214069ad5b976e43d27dd461040088401c7a1e98aab7e42301e |
| NeoForge 1.21.1 | 0.1.5 | 783993431d7d42d442374549e3d3145e4bb4ed8dff63f669d3194d47cfe17e1e |
| Fabric 26.3 | 0.1.5 | 31126ea09fcb3d9931c54a8c7cda7a313638af2c5297aaf384e951ef86c5dc11 |
| NeoForge 26.3 | 0.1.5 | 9c8843c015ba88fac277845c6b7516be7ce1f8f97a86f570e6c147fdf0758f2f |

## Recovery and validation

- Backup: `_backups/spawn-control-docs-20261105-210239/`, containing the 45 original pages and the exact pre-existing `src/guide-environments.json`.
- `npm run build`: 935 documents generated.
- `npm run verify`: 935 documents, 12 mod cards and 1797 image references passed, including routes, capture dimensions and distribution mappings.
- `npm run verify:translations`: 561 translations passed metadata, identifiers, code, links, screenshots and section-count checks.
- Scoped `git diff --check`: passed.
- Existing unrelated edits and prior capture metadata were preserved. No site UI code changed, so no new browser layout test was required. No mod code, user instance or world was changed; no new gameplay execution or public deployment is claimed.
- Per the changelog skill's documentation-only exclusion, no mod release changelog was changed. No disposable task scripts or intermediate artifacts were created; recovery backups and the two final screenshots are retained.

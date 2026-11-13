# BattleWorks 0.1.7 — user guide maintenance

Status: documentation complete; additional Minecraft video capture deferred by the user.

## Delivered

- Updated 15 existing guide bodies in each of English, Korean, Portuguese, Spanish and French (75 files). Added one practical authoring guide in each language (5 files).
- Corrected DRM's optional status, standalone Wand/command access, actor-owned NPC settings and the CustomNPCs version boundary.
- Documented Simple/Detailed editing, four recipes, per-player server technique library, independent/shared copies, hitbox detachment, Undo/Redo and save/apply semantics.
- Updated humanoid clip sources, compatible-model selection and temporary preview versus saved linked animation.
- Added linked ground warning and fill controls, cylindrical arena reset setup, native NPC-template summons and server library paths.
- Retained existing sample data/code and actual 0.1.6 capture labels. No new runtime dependency minimums or new schema version were invented.
- Added two unedited, hash-matched 0.1.7 native screenshots from the completed layout verification. Their captions record actual loader, Minecraft, DRM/DNPC versions and the limits of a still image.
- Aligned Korean labels with current ko_kr.json. Fixed a mobile overflow caused by an older screenshot caption; long storage paths are presented separately.

## Validation

- Final docs build: PASS, 940 visible documents.
- Documentation verifier: PASS, 940 documents, 12 mod cards, 1,662 image references and 265 existing video references.
- Translation verifier: PASS, 564 translated documents, matching code, commands, links, media and headings.
- Focused headless Chrome: PASS, 80 updated routes across five languages at 1440 px and 390 px (160 views), 20 checks of the two new image assets, 20 retained desktop/mobile screenshots; no page exceptions or HTTP failures.
- The Korean new-guide desktop/mobile screenshots and the native source images were visually inspected.
- All 83 changed content/media/metadata files match the recorded final SHA-256 values. Original modified-file backups match recorded before hashes.

## Scope and evidence

See change-manifest.json for the timestamped _backups directory and file hashes, source-audit.json for current implementation references, checks.json for command output, browser/results.json for route results, and media-provenance.json for source screenshots.

This changed documentation source and its local dist build. It did not change production mod code, release JARs, distribution metadata, CurseForge release records or the concise 0.1.7 changelog. No Git commit, push or public deployment was performed.

Existing final-JAR verification remains recorded under the paired BattleWorks workspaces' verification/layout-clipping-2026-11-13 directories. This documentation task did not rerun Minecraft combat, dedicated servers or persistence tests.

## Filming deferred

The user's final instruction was: 문서부터 마치고 영상은 보류.

No capture game was launched and no new videos or video references were added. A prepared capture runner, fixture and unvalidated probe remain available for an explicitly resumed filming task. They are preparation code, not evidence of successful execution.

The owned prepared instance and isolated encoder folder were removed from the verified task root. No user game or other Java process was stopped. Process enumeration was unavailable inside the sandbox; the no-launch conclusion comes from the earlier capture guard stopping before launch, rather than an empty process list.

One-off editing payloads, scripts, generated probe stubs and failed intermediate browser captures were removed after preserving the final results. Actual recovery backups and the reusable browser verifier remain.

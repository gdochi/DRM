# Real Armor 0.1.5 changelog documentation

The Real Armor 0.1.5 release is available through the existing changelog selector as author-published notes for Forge 1.20.1, Fabric / NeoForge 1.21.1 and Fabric / NeoForge 26.3.

- Canonical source: `C:/Users/hodu3/Desktop/[LOG] Change Log/리얼아머/0.1.5.md`.
- Release data: `content/changelogs/dochi-real-armor/0.1.5.json`. The prepared record was already present when this pass began; its Markdown matches the canonical source exactly after CRLF normalization and was preserved.
- The publication rule is recorded in `docs/changelog-workflow.md`.
- Global changes appear on all five targets. CustomNPCs resistance-order controls appear only on the three older targets. Configuration-save recovery appears only on Fabric. DNPC-only Curios armor calculations appear only on Forge and NeoForge.
- Author notes display the existing publication date, 2026-11-07 UTC, without inventing CurseForge files or downloads.

## Validation

- `npm.cmd run build`: passed, 885 documents.
- `npm.cmd run verify`: passed, 885 documents, 12 mod cards, 1,667 images and 120 guide videos.
- `npm.cmd run verify:translations`: passed, 531 translations.
- Full `scripts/verify-changelogs.mjs` checks: passed, 212 environment/version routes plus navigation and layout checks. Browser access required execution outside the filesystem sandbox. A concurrent rebuild removed `dist/index.html` during the first browser run, so the successful run used an isolated build under `build/task/realarmor-015/site`; the temporary verifier only redirected its build location and resolved its imports.
- Targeted browser checks: passed all five 0.1.5 environments, existing 0.1.4 download links, latest-version selection in all eight interface languages and 320px layouts; no page errors. See `browser-result.json`.
- Visually inspected the desktop Forge and mobile NeoForge 26.3 captures. The mobile 26.3 notes contain no CustomNPCs entry.
- `git diff --check`: passed. The live preview's Real Armor release data matches the isolated build. The canonical changelog, 0.1.4 and 0.1.5 release JSON and published-file index retained their original hashes.

## Backup and cleanup

Backup: `_backups/docs-refresh-realarmor-015-20261107-194353/`. It preserves the current release JSON, the previous workflow document and hashes of the existing modified files and protected release sources.

Existing guide work was preserved. `scripts/verify-guide-videos.mjs` changed concurrently during validation; this task did not edit or restore it.

The isolated validation build and temporary verifier were removed after the final evidence was saved. Recovery backups and final browser evidence were retained. This documentation task does not introduce mod implementation changes or new mod changelog entries.

# MapIcon 0.1.3 documentation update

Updated the MapIcon release data and the three usage guides in English, Korean, Portuguese, Spanish and French. Japanese, Russian and Chinese retain the site's existing English content fallback.

## Release record

- Canonical source: `C:/Users/hodu3/Desktop/[LOG] Change Log/맵 아이콘 인터그래이션/0.1.3.md`.
- The release JSON preserves the canonical Markdown exactly.
- Registered as `source: author` for Forge 1.20.1, Fabric / NeoForge 1.21.1 and Fabric / NeoForge 26.3.
- No CurseForge file IDs, upload status or download URLs were invented.
- Existing 0.1.2 release data, legacy routes and the verified public-file index remain unchanged.
- Shared changes appear on all five targets. Same-resource-ID JourneyMap fixes appear only on the three older targets; DNPC visibility and unrestricted DRM dependency fixes appear only on Forge 1.20.1.

## Guide changes

- Changed current guide metadata to 0.1.3 while preserving the actual 0.1.2 screenshot versions.
- Clarified independent optional map integrations and editing/saving without installed maps.
- Documented stale NPC save rejection and recovery with **Reload saved settings**, including loss of unsaved edits on reload.
- Added resource-pack image refresh instructions and current live-display limits.
- Kept Minecraft 26.3 documentation free of any CustomNPCs support expectation.
- Updated the MapIcon release-section description in all eight interface languages to cover author release notes.

Implementation references: MapIconEditorScreen, MapIconServer, MapIconClient, ClientIconTextures, JourneyMapCompat and loader resource-reload listeners in the common and independent 26.3 source workspaces. No runtime dependency minimums or compatibility claims were added.

## Validation

- `npm.cmd run build`: passed; 885 documents built.
- `npm.cmd run verify`: passed; 885 documents, 12 mod cards, 1,667 images and 85 videos.
- `npm.cmd run verify:translations`: passed; 531 translations.
- `npm.cmd run verify:changelogs`: passed; 207 environment/version routes plus navigation and layout checks.
- Checked all five built MapIcon 0.1.3 scopes: six bullets on Forge, four on Fabric / NeoForge 1.21.1, three on Fabric / NeoForge 26.3.
- Visually inspected the MapIcon desktop Forge and mobile NeoForge 26.3 captures.
- `git diff --check`: passed.
- Confirmed hashes of existing unrelated edits and public 0.1.2/index files remained unchanged.

## Backup and scope

Backup: `_backups/docs-refresh-mapicon-0.1.3-20261107-055856/`.

Changed source files: fifteen MapIcon guide Markdown files, `site.config.json` (MapIcon section descriptions only), and `content/changelogs/dochi-mapicon-integration/0.1.3.json`. Verification output is kept in this evidence folder. Existing unrelated working-tree changes were preserved.

No staging, commits, deployment or CurseForge publishing was performed.

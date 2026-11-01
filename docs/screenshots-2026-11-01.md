# In-game documentation screenshots — 2026-11-01

## Final illustrated-guide status

The complete documentation refresh now covers **372 pages: 186 Korean and 186 English**, using **255 reviewed original screenshots and 706 image placements**. All pages passed image/link verification and browser layout checks at 1440px and 390px. Original-size links were also exercised in the dialogue guides.

The earlier three user-provided DNPC images remain unchanged in the source archive; the current editor guide uses version-verified DNPC 0.1.3 captures. The notes below describe the initial three-image stage, not the final site coverage. See `illustrated-guides-progress.md` and `evidence/illustrated-guides-20261101/` for current results and limitations.

## Initial three-image stage

Added the user's three real DNPC screenshots to the Korean and English appearance/equipment guide, next to the relevant instructions:

- Identity: find the name field and Save button.
- Weapon & ammunition: distinguish idle hands, combat hands, weapons/ammo and NPC storage.
- Movement AI: find Lock position and Lock rotation.

The source images remain unchanged. Their provenance is listed in `src/media/guides/README.md`. They were captured on 2026-10-28 in English; no Minecraft, loader or mod version is inferred from their capture date.

## Shared image support

All mod guides can now display standalone Markdown images with visible captions. Images fit the available width and link to the original size. Local paths remain relative for GitHub Pages project hosting, and images are copied with the existing media build step. The verifier checks image descriptions, local paths and source/output equality.

Only DNPC currently received screenshots. The general Minecraft screenshot folder inspected during this task contains 2024 captures; they were not used as current mod instructions.

## Validation and recovery

- `npm run build`: 351 documents.
- `npm run verify`: all documents and six image placements passed (three screenshots in two languages).
- The preview served all three PNGs with HTTP 200 and the correct image MIME type.
- `git diff --check`: passed.
- Browser inspection was unavailable: the computer-use connector failed at initialization because it interpreted the bracketed workspace name as a filesystem glob. No browser visual inspection is claimed.

Preview: <http://localhost:4183/#dochi-npc-core/npc-core-editor> (hidden local Node process, PID 40100).

Backup: `_backups/docs-refresh-screenshots-20261101-092009/`. It contains the five edited source files and the original DNPC completion log. Added one screenshot documentation entry to `C:/Users/hodu3/Desktop/[LOG] Change Log/DNPC/0.1.2.md`, preserving existing entries.

No one-time scripts or temporary images were created. The three final PNGs, built site and recovery backup remain. Mod sources, game settings and worlds were not changed.

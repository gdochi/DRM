# DRM Docs Redesign

## Goal
- Replace the marketplace-like landing page with a simple product gateway.
- Use an FTB-style documentation layout for detailed pages.
- Split documentation into product-level branches.

## Main structural changes
1. Home now shows three product branches:
   - DRM Core
   - DRM Mob Editor
   - CNPC TaCZ Fire
2. Detail pages now use a documentation layout with:
   - left sidebar category navigation
   - single-document reading view in the center
   - right-side table of contents
3. The site title and branding were simplified to `DRM`.
4. Content was grouped by `product` and `category` in markdown front matter.
5. Additional starter documents were added for Mob Editor and CNPC TaCZ Fire in both Korean and English.

## Technical changes
- `site.config.json`
  - added `products` metadata
  - updated site title to `DRM`
- `scripts/build.mjs`
  - now parses `product` and `category`
  - outputs cleaner document data for the new UI
- `src/app.js`
  - rewritten as a product-based documentation SPA
  - added home/detail routing with hash routes
  - added product landing cards, grouped sidebar, and per-document TOC
- `src/styles.css`
  - completely redesigned visual system for a cleaner docs look
- `src/template.html`
  - added early theme initialization and theme-color meta
- `content/ko/*`, `content/en/*`
  - existing DRM Core docs were categorized
  - new Mob Editor docs added
  - new CNPC TaCZ Fire docs added

## Routing examples
- Home: `/#home`
- DRM Core: `/#core/overview`
- DRM Mob Editor: `/#mob-editor/mob-editor-overview`
- CNPC TaCZ Fire: `/#cnpc-tacz-fire/tacz-overview`

## Notes
- Push to GitHub is not performed automatically in this environment.
- The `dist` folder has already been rebuilt and is ready for GitHub Pages deployment.

## Phase 2 Redesign

### Information architecture
- Reworked the home page into a product-track selector instead of a marketplace-style card board.
- Added top-level documentation tracks: DRM Core, DRM Mob Editor, CNPC TaCZ Fire.
- Added product tabs to the global top navigation.
- Grouped documents by product-specific categories.

### Detail page improvements
- Detail pages now show one active document instead of stacking every document.
- Left sidebar now works as grouped category navigation.
- Right sidebar shows headings only for the current document.
- Added document metadata pills: status, version, audience, and source link.
- Added previous / next document footer navigation.

### Content additions
- Added DRM Core: Data Flow.
- Added DRM Mob Editor: Detection and Patrol AI.
- Added DRM Mob Editor: Phases and Balancing.
- Added CNPC TaCZ Fire: Target Filters.
- Added CNPC TaCZ Fire: Reload and Ammo.

### Build
- `npm run build` completed successfully.
- `dist` now contains 50 rendered documents.

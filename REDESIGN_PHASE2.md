# DRM Docs Phase 2 Redesign Plan

## Objective
The first redesign fixed the visual direction. Phase 2 fixes the information architecture.

The site should not behave like a marketplace grid. The landing page should only answer one question: **which documentation track do I need?** After that, detailed pages should behave like a clean documentation reader.

## Final structure

### Landing page
The home page is a product-track selector only.

Tracks:
1. DRM Core
2. DRM Mob Editor
3. CNPC TaCZ Fire

Each track card contains:
- product name
- short description
- tags
- category count
- document count
- direct open button

### Detail page
Each product track uses a reader layout similar to FTB documentation.

- Top bar: DRM brand, product tabs, search, language, theme, GitHub
- Left sidebar: product summary and grouped document navigation
- Center: one active document
- Right sidebar: headings inside the current document
- Footer: previous / next document navigation

## Content taxonomy

### DRM Core
- 시작하기 / Getting Started
- 핵심 시스템 / Core Systems
- 레퍼런스 / Reference & Operations

### DRM Mob Editor
- 개요 / Overview
- AI / 탐지 / AI & Detection
- 전투 제작 / Combat Authoring
- 고급 전투 / Advanced Combat

### CNPC TaCZ Fire
- 개요 / Overview
- 총기 AI / Firearm AI
- 문제 해결 / Troubleshooting

## Phase 2 implementation

### New UI features
- Product tabs were added to the top navigation.
- Home page was simplified into a track-selection layout.
- Detail pages now show per-document metadata: status, version, and audience.
- Each document has previous/next navigation.
- Each document exposes its source path as a GitHub source link.
- Search now searches product metadata, categories, document body, and headings.

### New content
Added new documentation pages:

DRM Core:
- Data Flow

DRM Mob Editor:
- Detection and Patrol AI
- Phases and Balancing

CNPC TaCZ Fire:
- Target Filters
- Reload and Ammo

### Build changes
`scripts/build.mjs` now reads additional front matter:
- `status`
- `version`
- `audience`
- `sourcePath`

The generated `dist/assets/docs-data.js` includes these fields for the UI.

## Deployment
The `dist` folder has been rebuilt. For GitHub Pages, commit and push the updated files.

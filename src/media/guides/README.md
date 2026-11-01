# In-game screenshots

Store screenshots under a mod folder here. The build copies them unchanged to `dist/assets/media/guides/`.

Add a screenshot on its own line in a guide. The optional quoted title becomes a visible caption. Readers can click or tap the image to zoom inside the guide, pan or pinch to inspect controls, and close the viewer to return to the same reading position. The viewer also links to the original image.

`src/guide-environments.json` contains the reviewed screenshots' Minecraft version, loader, original dimensions and language where recorded. The build uses it to reserve image space and show which environments the pictures came from. This metadata describes the screenshots, not a mod compatibility matrix. Update it from verified capture records when adding new screenshots.

```markdown
![Describe the visible screen and useful controls.](assets/media/guides/dnpc/identity.png "Explain what to select or change in this screen.")
```

Use relative `assets/media/` paths so images also work on GitHub Pages project sites. Reuse the same capture in both languages when the visible controls match; translate the alt text and caption. Keep screenshots next to the action they explain, and keep editor screens distinct from the screens players see.

## Reviewed documentation captures

The published guides use 255 reviewed original PNGs, with 706 placements across 372 Korean/English pages. Per-image game, loader, language, production-artifact hashes and capture-run provenance are recorded in `docs/evidence/illustrated-guides-20261101/approved-captures.json` at the repository root. The originals are copied unchanged; no generated imitation game screens are used.

Captures come from isolated documentation instances running real production artifacts. The fixture code belongs to this documentation repository and is not part of any production mod. Editor visibility, saved configuration, server binding and completed player actions are separate verification scopes. Captions and the evidence receipts state which scope was checked.

The current Identity, Movement AI and Weapons guide images use verified DNPC 0.1.3 / NeoForge 1.21.1 captures. Historical screenshots identify their version separately.

## Earlier user-provided DNPC captures

The three PNGs in `dnpc/` are unchanged copies of the user's real in-game captures from `C:/Users/hodu3/Desktop/dnpc 사진/`, taken on 2026-10-28:

| File | Original | Screen |
| --- | --- | --- |
| `identity.png` | `스크린샷 2026-10-28 134831.png` | Identity |
| `weapons.png` | `스크린샷 2026-10-28 134858.png` | Weapon & ammunition / Weapons |
| `movement.png` | `스크린샷 2026-10-28 134913.png` | Movement AI |

These show the English interface. The capture date does not establish a Minecraft, loader or mod version. Check current controls before adding version-specific claims or reusing older captures.

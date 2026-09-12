# BattleWorks documentation expansion — 2026-09-12

## Scope

- Docs workspace: `C:\Users\hodu3\Desktop\[DOCHI] DOCS`.
- Read-only source reference: `C:\Users\hodu3\Desktop\[FORGE] dochi_battleworks`.
- Live baseline: BattleWorks 0.1.3, Forge 1.20.1, Java 17; DRM 0.1.7 or newer according to `mods.toml`.
- Preserved the existing nine routes in each language and added nine practical guides per language: 18 Korean and 18 English pages total.
- Backed up the original 18 Markdown files and `site.config.json` before edits.
- Existing `_backups/legacy` working-tree state was not changed.

## Delivered content

- Installation, NPC preparation, exact beginner build-assist choices, save versus apply, expected outcomes, and one-variable exercises.
- Workspace controls, event/action distinction, timing, repeats, probability, hitbox geometry/damage, compatible animation, targeting, and movement.
- Manager scores, cooldown semantics, combos, health phases, queued versus immediate reactions, current parry limitations, and death presentation.
- Step-by-step two-phase boss, skills, sounds, titles, commands, BGM, Particle Maker, delayed-position attacks, projectiles, summons, and conditions.
- Server storage, migration and dependencies, complete JSON reference, troubleshooting, and a live-play checklist.
- Two standalone examples in `src/media/battleworks`: `training_swordsman.json` and `training_ring.json`.
- Navigation descriptions and a Skills and Effects section in the existing data-driven site configuration.

## Source corrections

- Corrected combat storage from `mobs/` to `mobs/patterns/`.
- Corrected full-NBT-copy claims to server file-reference behavior and documented cache refresh after external edits.
- Corrected required DRM version and current `dochi_battleworks` mod ID.
- Replaced old pattern-wide animation limitation with current contiguous-stage and action-lease behavior.
- Distinguished global supported projectile reflection from unconsumed document posture/riposte fields and implemented reactive triggers.
- Distinguished per-action hit memory from a single global per-pattern hit limit.
- Corrected ordinary hitbox Offset Y to use NPC body center.
- Documented separate Particle Maker files, real provider previews, particle layer bounds, and command filenames without `.json`.
- Corrected vanilla music suppression to an independent local preference.
- Included optional `npcStats` attribute overrides found in the live implementation.

## Verification

- `npm.cmd run build`: PASS; 246 total site documents generated.
- Confirmed the build output is the expected non-linked workspace `dist` directory before regeneration.
- Static content checks: 36 BattleWorks pages, 117 links, 10 JSON code blocks; no errors.
- Both language sets contain the same 18 routes with unique page order and configured sections.
- Embedded complete combat examples match the downloadable JSON.
- Freshly compiled live-source model/validator classes into this backup's `validator-classes` using Java 17; `ValidateBattleworksDocs.java` passed with 0 errors and 0 warnings.
- Combat and particle JSON round trips passed; the particle schedule emits 20 times over 40 ticks.
- Built HTML checks: 36 pages, 107 tables, 308 heading anchors, and 22 code blocks; no missing content, malformed table closure, duplicate heading IDs, or replacement characters.
- HTTP 200 with correct content types for the preview page, docs data, and both JSON assets.
- `git diff --check`: PASS.

## Preview and limits

- Preview: `http://localhost:4173/#mob-editor/battleworks-first-attack`.
- Preview helper was launched with a hidden window (PID 32452).
- CUA browser selection returned `No browser is available`; visual browser verification was unavailable. Used generated-HTML and HTTP checks instead.
- No in-game GUI/combat testing was performed. The documents explicitly distinguish structural validation and preview from actual terrain, damage, external spell, and balance testing.
- No publishing, Git commit, or push was performed.

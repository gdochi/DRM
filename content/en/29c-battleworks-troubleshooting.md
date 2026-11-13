---
title: Troubleshooting and live combat checks
slug: battleworks-troubleshooting
order: 290
description: Narrow down targeting, damage, animation, file, skill, and presentation failures.
product: mob-editor
section: reference
category: BattleWorks
status: Guide
version: 0.1.7
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## First checks

1. Match Minecraft, loader and BattleWorks 0.1.7. Match DRM and external providers only when you use their features; DRM is optional.
2. Follow [NPC preparation](#mob-editor/mob-editor-setup). Use DNPC on 26.3 and later; CustomNPCs is excluded there.
3. Confirm that the saved path is the path bound to the NPC.
4. Separate Creative authoring from Survival combat tests.
5. Start with a native humanoid swing and a Hitbox before adding external models or spells.

The [first-attack exercise](#mob-editor/battleworks-first-attack) retains actual 0.1.6 combat captures. Its historical preview warnings are not a current-version restriction. Diagnose file application, model preview and real combat separately.

## The file is missing from the list

1. Check the server's config/dochi_rpg_maker/mobs/patterns folder.
2. Check the .json extension.
3. Check schema dochi.battleworks.v1.
4. Exclude geometry/animation files and asset folders.
5. Parse as strict JSON.
6. Refresh Load / Apply.

Particle files use particles and dochi.particles.v1 instead.

## The NPC still uses the old behavior

1. Check whether you only used Save As.
2. Save with the NPC attached, or apply the new file through its catalog.
3. After external edits, reapply or restart the server.
4. Check similarly named files in subfolders.
5. Inspect any saved model settings that was applied too.

Use separate files when NPCs need independent behavior.

## The NPC never attacks

1. Leave Creative/Spectator mode.
2. Confirm the selected actor supplies a valid target, or enable Scan Without Target in an isolated test area.
3. Check scan range, FOV and line of sight. Fallback scanning is separate from NPC relationship filtering.
4. Check pattern Enabled, range, height, health and phase conditions.
5. Ensure at least one ordinary Manager pattern is eligible; inspect score, repeat multipliers and cooldowns.
6. Check movement ownership and arena boundaries.

Compare a separate NPC using the [simple practice file](./assets/media/battleworks/training_swordsman.json).

## The NPC stops before reaching its attack

Compare Approach Distance, pattern Max Range, hitbox dimensions/offsets, height allowance, and the target's location at contact. Check whether preparation movement pushes the NPC away.

Start range and actual hitbox geometry are separate.

## The animation plays but damage does not

1. Test actual combat, not Simulation.
2. Verify a Hitbox or real damage Skill action is connected.
3. Check event and repeat bounds.
4. Check Damage, multiplier, and chances are nonzero.
5. Inspect hitbox height, offsets, and rotations.
6. Check target restriction.
7. Check armor, effects, invulnerability, and Hit Policy.

Several hitboxes at one tick do not guarantee simple summed damage.

## Animation or attacks overlap

1. Check Suppress Native Attacks and the actor's own combat AI or other controllers.
2. Only on supported older CustomNPCs installations, inspect combat scripts and Suppress CustomNPC Scripts. This is not a DNPC or 26.3 requirement.
3. Avoid competing stage and timeline animation requests.
4. Compare Cast Animation Ticks with later stages and verify the model/provider.

A matching animation can continue across consecutive stages without restarting.

## A skill fails

Choose a real catalog ID, verify provider/dependencies on both sides, and check target, range, line of sight, and provider cooldown. Remove unsupported options and test one simple cast. Read Battleworks skill failed.

## Combos, phases, or passives behave differently

| Symptom | Check |
| --- | --- |
| Combo does not start | Max Combo, destination existence, conditions, cooldown |
| One move dominates | Priority, Selection Floor, eligibility |
| Phase stays high after healing | Expected latching during combat |
| Transition announcement repeats ordinarily | Its manager score and bonuses |
| Basic passive waits | Queue reactions wait for an opening |
| Health trigger does not repeat | Once Per Combat and re-crossing the threshold |
| Reaction disappears | Skip, expired queue, failed start conditions |
| Posture/riposte fields have no effect | Reserved, unconnected document settings |

## Particles are absent or excessive

1. Play the file in Particle Maker.
2. Check required particle options.
3. Try `/drm particle play training_ring ~ ~ ~` without the extension.
4. Verify particleFile exists.
5. Check Target / Saved position origins have valid data.
6. Check you are not restarting a long effect every tick.
7. Reduce samples, count, frequency, and concurrent effects.

## BGM or dialogue is missing

Check hostile-creature volume for ordinary Sound and Music volume for BGM. Verify the registered sound and client resource. Confirm a player recipient, temporarily use 100% chances, and inspect actual popup/GUI/command references.

Another NPC's BGM ownership or overlapping titles/popups can also change the visible result.

## Useful log messages

| Message | Meaning |
| --- | --- |
| Battleworks JSON unavailable | Referenced combat file could not load |
| save rejected | Server refused the save; read the reason |
| Battleworks skill failed | Provider execution failed |
| Battleworks target movement rejected | Target or destination checks failed |
| Particle JSON rejected | Referenced particle file failed to load/validate |

## Record a final test matrix

Test close/medium/far range, front/sides/rear, walls/stairs/height differences, every phase, each passive, death, target loss, and another fight. Reopen files to verify persistence.

For a useful issue report, include mod versions, reproduction steps, the combat and referenced files, expected/actual behavior, latest.log, and any crash report. Remove private tokens or personal data before sharing logs.

## Recipes, library imports and arena resets

| Symptom | Check |
| --- | --- |
| A copied attack changes the original hitbox | Check shared usage; make the hitbox independent or use Independent copy |
| My techniques is empty on another server | The library belongs to a player on that server |
| Technique import is rejected | Required resources, animation-model compatibility, references and document limits |
| Clips are missing or do not play | Actual resources and source description; choose a compatible model/provider |
| Boss returns or heals unexpectedly | Applied Arena bounds, target-leaves reset and Restore boss health |
| Warning appears but no hit occurs | The linked Hitbox action, contact tick and target position |

Use the [authoring workflow](#mob-editor/battleworks-authoring), [animation guide](#mob-editor/battleworks-animation) and [arena instructions](#mob-editor/battleworks-encounters) to check each feature separately.

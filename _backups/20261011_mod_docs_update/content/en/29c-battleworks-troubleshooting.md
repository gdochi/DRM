---
title: Troubleshooting and live combat checks
slug: battleworks-troubleshooting
order: 290
description: Narrow down targeting, damage, animation, file, skill, and presentation failures.
product: mob-editor
section: reference
category: BattleWorks
status: Guide
version: 0.1.3
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## Check these five things first

1. Verify BattleWorks 0.1.3, DRM 0.1.7 or newer, and compatible CustomNPCs are loaded.
2. Confirm the NPC references the file you edited.
3. Check document and pattern Enabled.
4. Test with a Survival player and a valid hostile target.
5. Read validation errors and the server's logs/latest.log.

Then follow the section matching one symptom.

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
5. Inspect any model snapshot that was applied too.

Use separate files when NPCs need independent behavior.

## The NPC never attacks

1. Leave Creative/Spectator mode.
2. Confirm CustomNPCs hostile targeting.
3. If using fallback scanning, check range, FOV, and sight.
4. Temporarily widen pattern range, height, phase, and health conditions to isolate the failure.
5. Ensure at least one ordinary Manager pattern exists.
6. Check Base Score and zero repeat multipliers.
7. Check long movement ownership and cooldowns.

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

1. Check Suppress Native Attacks.
2. Inspect existing CustomNPC combat scripts.
3. Test Suppress CustomNPC Scripts where appropriate.
4. Avoid competing stage and timeline animation requests.
5. Compare Cast Animation Ticks with later stages.
6. Check provider/model compatibility.

Not restarting a matching animation across consecutive stages is expected.

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

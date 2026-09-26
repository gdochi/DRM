---
title: Build a two-phase sword boss
slug: battleworks-encounters
order: 272
description: Combine slash, thrust, retreat, and a half-health transition into one encounter.
product: mob-editor
section: combat
category: BattleWorks
status: Guide
version: 0.1.3
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## What you will build

A sword boss uses slash, thrust, and retreat, then adds an enhanced attack below 50% health. No optional spell mod is needed. The values are teaching starting points, not a guarantee of balanced difficulty.

Begin with the working [first attack](#mob-editor/battleworks-first-attack).

## 1. Make a separate working file

1. Load the first attack.
2. Save As `bosses/training_captain.json`.
3. Set maximum health around 100 in CustomNPCs.
4. Check that old combat scripts are not competing.
5. Keep the player's gear and health consistent between tests.

Keep first_sword as a known working comparison.

## 2. Plan the moves

| Pattern | Start range | Windup / Action / Recovery | Role |
| --- | --- | --- | --- |
| Slash | 0–2.7 | 24 / 16 / 24 | Basic attack |
| Thrust | 0–3.2 | 28 / 16 / 24 | Longer forward attack |
| Short retreat | 0–2.0 | 6 / 12 / 12 | Make space |
| Enhanced slash | 0–2.7 | 18 / 16 / 20 | Phase 2 addition |
| Enrage start | Broad suitable range | 0 / 30 / 10 | Phase announcement |

Outside attack range, Chase Target must bring the NPC closer. A melee boss needs a navigable approach.

## 3. Stabilize slash and thrust

1. Keep the working slash.
2. Create the [thrust Box](#mob-editor/battleworks-hitboxes) and link it to another pattern.
3. Start both at Damage 4.
4. Put the thrust hit at Action tick 3, then adjust to actual contact.
5. Give both Priority 10 and Base Score 10.
6. Confirm both appear in repeated close-range fights.

Resolve selection and range issues before adding phases.

## 4. Add retreat

1. Follow the [Away movement exercise](#mob-editor/battleworks-movement).
2. Mark the pattern Mobility and use a distinct movement role.
3. Initially leave it damage-free.
4. Start Base Score around 6 so it is less prominent than attacks.
5. Verify that pursuit resumes after retreat.

If movement dominates, check whether attacks are failing their range conditions before changing scores.

## 5. Add phase 2

1. Configure phase 1 at 100% and phase 2 at 50%.
2. Create a separate enhanced slash and set Min Phase 2.
3. Keep ordinary attacks available in both phases.
4. Before increasing damage, shorten enhanced Windup from 24 to 18.
5. If too abrupt, tune between 20 and 24.

Change timing, damage, or hit count one at a time.

## 6. Connect the transition

1. Give Enrage Start a Title and Sound at Action tick 0.
2. Keep its trigger on Manager and allow phase 2.
3. For transition-only use, set Base Score and all additive bonuses to zero.
4. Select it as phase 2's Transition Pattern.
5. Reduce health below half and verify one transition.
6. Heal and confirm the phase stays latched.

See [phase details](#mob-editor/mob-editor-phases) for forced-transition conditions and skipped thresholds.

## 7. Optionally add one passive

Use [Ranged Damage retreat](#mob-editor/battleworks-passives) for a response to arrows. If you also want ordinary retreat, keep separate patterns: changing a pattern to passive removes it from manager selection.

Basic queued reactions wait for an opening. Immediate damage cancellation uses a different advanced trigger.

## 8. Optionally add a ground warning

Create a ring in [Particle Maker](#mob-editor/battleworks-particles) and attach it to Windup. Match its size and duration to the actual Hitbox.

For an attack on the player's **previous position**, use [save position → warning → delayed hit](#mob-editor/battleworks-advanced-actions).

## 9. Test a situation matrix

| Situation | Check |
| --- | --- |
| About 1 block | Slash and retreat eligibility |
| About 2.5 blocks | Contact and actual damage |
| About 3 blocks | Thrust or renewed approach |
| About 6–8 blocks | Pursuit leading into an attack |
| Walls and stairs | Navigation, height, and sight conditions |
| Crossing 50% health | Transition and enhanced move |
| Healing in combat | Phase remains latched |
| Target loss and another fight | Intended state reset |
| Death | Presentation, BGM ending, summon cleanup |

## 10. Prepare the package

Reopen the saved file and check the values. Include all combat, particle, model, sound, popup, clone, and provider dependencies.

Use [files and backup guidance](#mob-editor/battleworks-files) and [troubleshooting](#mob-editor/battleworks-troubleshooting) before sharing.

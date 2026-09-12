---
title: Pattern selection, combos, and health phases
slug: mob-editor-phases
order: 260
description: Understand eligibility, score, pacing, and a 50-percent phase transition.
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

## 1. Eligibility comes before preference

Patterns are not simply executed from top to bottom.

| Settings | Question |
| --- | --- |
| Core | May this pattern start now? |
| Score | How much should the manager prefer it? |
| Combat Rules → Manager | How should repetition, movement, and waiting be handled? |

Higher scores do not bypass disabled state, target/range/phase/health requirements, cooldowns, or additional conditions.

## 2. Test two ordinary attacks

1. Finish the [first attack](#mob-editor/battleworks-first-attack).
2. Add a thrust using the [Box exercise](#mob-editor/battleworks-hitboxes).
3. Enable both and initially give both range 0–2.7.
4. Set both Priority 10 and Base Score 10.
5. Start Same Pattern Penalty around 0.5.
6. Fight repeatedly and confirm both can be chosen.

A few trials do not establish exact 50:50 selection. Distance bonuses and history multipliers also matter.

## 3. Common eligibility and score fields

| Field | Purpose |
| --- | --- |
| Min / Max Range | Horizontal start-distance interval |
| Max Vertical | Allowed height difference |
| Min / Max Phase | Allowed phase interval |
| Boss / Target Health ranges | Health-ratio requirements |
| Base Score | Initial preference |
| Ideal Distance / Distance Peak | Distance preference inside the allowed interval |
| Missing HP Score | Bonus proportional to the boss's missing health |
| Phase 2 / Phase 3 Bonus | Preference in those phases |
| Priority | Strong selection tier |

Keep ordinary attacks at the same Priority initially. Priority is not a small probability adjustment.

## 4. Read manager multipliers correctly

| Field | Meaning |
| --- | --- |
| Selection Floor | Exclude candidates below best score × this value |
| Same Pattern Penalty | Multiplier for repeating the last pattern |
| Recent Penalty | Multiplier for repeating the pattern used two turns ago |
| Same Role Penalty | Multiplier for the previous role |
| Random Factor | Score jitter; weighted-random selection still exists at zero |
| Mobility Urgency / Bonus | Increase preference after a long period without mobility |
| Max Stationary / Stationary Penalty | Reduce stationary choices after a streak |

A penalty multiplier of 1 leaves the score unchanged; 0 removes it. With one attack, use Same Pattern Penalty 1 during testing. The legacy `avoidImmediateRepeat` flag alone is not the active selector's repeat control.

## 5. Four different timing settings

| Setting | Meaning |
| --- | --- |
| Recovery stage Ticks | Third segment of choreography |
| Core Recovery Delay | Minimum post-pattern delay |
| Manager Recovery Min / Max | Random post-pattern delay range |
| Core Cooldown / Manager Global Cooldown | Reuse restriction on the completed pattern |

Post-pattern wait is the maximum of Core Recovery Delay and the manager's random delay. For example, Core 8 with manager 10–14 gives 10–14 ticks.

Global Cooldown is not an additional shared lock on every pattern. The completed pattern receives `max(pattern cooldown, global cooldown)`. Other eligible patterns can still be selected after the post-pattern wait.

## 6. Link a slash into a thrust

1. Open the slash's Combo settings.
2. Link the existing thrust pattern.
3. Start with Chance 50% and Delay 6 ticks.
4. Set Manager Max Combo to at least 1.
5. Test at a distance allowed by both moves.

The follow-up still checks its target, range, health, phase, line of sight, and cooldown. Keep outgoing chances at or below 100%; unused probability means no combo. Max Combo 0 disables chains.

Passive patterns cannot own combo links or be combo destinations.

## 7. Add phase 2 at half health

1. Open **Combat Rules → Phase / Boss Phases**.
2. Keep phase 1 at 100%.
3. Add phase 2, name it Enraged, and set **Health At or Below (%) to 50**.
4. Set an enhanced attack's Min Phase to 2.
5. Allow existing attacks in phase 2 if they should remain available.
6. Reduce health below half and verify the new attack becomes eligible.

The editor percentage is **50**; JSON `enterAtHealthRatio` is **0.5**.

Phases latch upward during combat. Healing does not return phase 2 to phase 1. Target loss plus Combat Reset Delay resets combat state, but low remaining health can trigger the higher phase again on re-engagement.

## 8. Add a transition-only announcement

1. Create a short Enrage Start pattern with sound/title.
2. Leave its trigger on Manager.
3. Allow phase 2 and make target/range/height/health conditions suitable.
4. Select it as phase 2's Transition Pattern.
5. Set its Base Score and every additive score bonus to 0 if it should never enter ordinary selection.

Transition execution is separate from score selection. It still checks additional conditions, target, phase, range, and health; the current forced transition can bypass ordinary cooldown and line of sight.

A large hit can skip intermediate phase thresholds. Do not assume every intermediate transition is played in sequence. Continue with [passive reactions](#mob-editor/battleworks-passives).

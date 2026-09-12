---
title: Skills, sounds, dialogue, and battle music
slug: battleworks-skills-effects
order: 247
description: Connect real catalog skills and add presentation without changing reliable damage timing.
product: mob-editor
section: effects
category: BattleWorks
status: Guide
version: 0.1.3
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## 1. Select a real skill

1. Install the provider and dependencies on server and clients.
2. Select a pattern's Action stage and press **+ Skill**.
3. Filter by mod, search by name or ID, and choose one listed skill.
4. Set its event to the intended cast tick.
5. Keep event and action chances at 100.
6. Start with a low skill level and test one cast.

One action holds one skill. Typing an invented ID does not create it. Additional provider assets must also exist.

## 2. Diagnose a rejected cast

| Check | Why it matters |
| --- | --- |
| Provider and real ID | The skill must be available |
| Target, range, line of sight | The action needs a valid cast situation |
| Provider cooldown | Separate from BattleWorks pattern cooldown |
| Caster compatibility | Not every player spell supports a CustomNPC |
| Supported options | Different skills accept different settings |

Simulation does not cast real external spells. Test in the world and inspect `Battleworks skill failed` messages.

## 3. Adjust damage in the correct place

| Attack | Damage control |
| --- | --- |
| Hitbox | Shared Damage × per-action Damage Multiplier |
| DRM Skill | Skill level and provider-supported options |
| Certain integrated skills | Direct damage options exposed by the editor |
| Managed projectile | Its own action Damage |

A generic `damageMultiplier` copied into Skill params is not a supported universal spell multiplier.

## 4. Add repeated casting

1. Keep a working single-cast copy.
2. Add another event or an intentional repeat schedule.
3. Leave enough time for the provider's own cooldown.
4. Use separate Skill actions when each cast needs a different Cast Animation.
5. Match Cast Animation Ticks to the intended duration.

Cast motion is requested on successful casts. No motion may indicate a rejected skill, not a bad animation ID.

## 5. Add an attack sound

1. Add Sound to the hit event or its own event.
2. Use Select to choose a registered sound.
3. Preview with Play / Stop.
4. Start Volume and Pitch at 1.0.
5. Save/apply and listen during combat.

`minecraft:entity.player.attack.sweep` is a basic example. Use a registered `namespace:path` Sound ID, not an OGG filename. Ordinary Sound actions play at the NPC through the hostile-creature category.

## 6. Add a short title warning

1. Add Title at Windup tick 0.
2. Enter a short title and subtitle.
3. Choose current target or nearby players as Audience.
4. Set Radius when using nearby recipients.
5. Start with Fade In 5, Stay 20, Fade Out 5.
6. Check readability and overlap on an actual player's screen.

Frequent titles from several NPCs can overwrite one another.

## 7. Commands and DRM popups

Open **Command → Edit command / arguments**. First verify timing with:

```text
say BattleWorks timing test
```

Use no leading slash inside the Command action. Choose NPC or target as executor.

| Token | Replacement |
| --- | --- |
| `@npc` | NPC UUID text |
| `@target` / `{target}` | Current target UUID text |
| `{player}` | Target player's name |
| `{uuid}` | Target player's UUID |

The @npc/@target tokens are replaced strings, not vanilla selectors. Player tokens need a player target.

Create and test the popup definition and GUI in DRM first. Then use command completion and the actual popup name. Do not assume another distribution's combatv1.json exists locally.

Command actions run with high command permission. Check the recipient and repeat count. A popup normally needs one invocation; its definition can supply a start sound.

## 8. Keep damage reliable and dialogue occasional

Use event 100%, Hitbox 100%, Sound 100%, and dialogue Command 20%. Lowering the whole event chance would also skip the damage.

## 9. Configure BGM

1. Open **Combat Rules → BGM**.
2. Enable it and select a registered track.
3. Begin with Volume 0.7 and Pitch 1.0.
4. Preview and save/apply.
5. Let a Survival player become the NPC's target.
6. Verify stopping on target loss or NPC death.

BGM loops for the **current player target**, not every player inside a radius. When multiple NPCs target the same player, the most recently acquired owner wins.

The player's **Music** volume must be audible. Custom audio resources must exist on each receiving client. Vanilla music suppression uses the independent Disable vanilla music preference.

Add one cast, then sound, title, popup, and BGM in that order. Continue with [Particle Maker](#mob-editor/battleworks-particles).

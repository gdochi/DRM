---
title: Your first melee attack
slug: battleworks-first-attack
order: 225
description: Build one attack with exact settings, save it, apply it, and verify the result.
product: mob-editor
section: start
category: BattleWorks
status: Guide
version: 0.1.3
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## What you will build

A normal humanoid NPC approaches a player, prepares for about 1.2 seconds, sweeps in front, and recovers. Complete [installation and NPC preparation](#mob-editor/mob-editor-setup) first and open BattleWorks with the practice NPC selected.

These values are teaching starting points. Gecko and modded-entity models need their own compatible [animation setup](#mob-editor/battleworks-animation).

## 1. Create the document

1. Select **Create New**.
2. Give the document a recognizable name and enable it.
3. Disable unrelated patterns while doing this exercise.
4. Open **Pattern Build Assist**.

If working on an existing boss, first create a separate practice copy with Save As.

## 2. Answer the build-assist questions

| Question | Choice |
| --- | --- |
| Detail Level | Beginner |
| Attack Shape | Wide Sweep |
| Attack Tempo | Measured |

Choose each answer, continue with Next, and inspect **Review Choices**. Revisit a question if necessary, then press **Create Pattern**.

Completion check: a pattern and a reusable hitbox appear. The assistant adds them without replacing existing patterns.

## 3. Read the generated timing

| Setting | Value | Meaning |
| --- | --- | --- |
| Windup Ticks | 24 | About 1.2 seconds of preparation |
| Action Ticks | 16 | About 0.8 seconds of action |
| Hitbox Event Tick | 3 | Contact 3 ticks into Action |
| Recovery Ticks | 24 | About 1.2 seconds of recovery |
| Hitbox Damage | 4 | Configured damage before defenses |
| Pattern Cooldown | 40 | Reuse delay after this pattern finishes |
| Action Animation | Main-Hand Swing | Basic normal-humanoid swing |

The three stages total **64 ticks**, about 3.2 seconds. The contact marker is at overall tick `24 + 3 = 27`. Reuse and post-pattern delays also affect the time between attacks.

## 4. Match the attack and hitbox ranges

1. Select the new pattern's **Core** settings.
2. Set Min Range `0`, Max Range `2.7`, and Max Vertical `2.5`.
3. Under Score, use Ideal Distance `2.0`.
4. Select its Hitbox action and choose **Edit this hitbox**.
5. Confirm Radius `2.4`, Thickness `0.5`, and Damage `4`.
6. Enable **Locked Target Only** for the practice fight.

Max Range determines when the pattern can start. Hitbox Radius determines its geometry. Raising Max Range to 10 does not make the weapon reach 10 blocks.

## 5. Stop and face the player during the attack

1. Select Windup, Action, and Recovery in turn.
2. Enable **Face Target** in each.
3. Enable **Stop Horizontal** and use **Hold** movement.
4. Keep the generated main-hand swing on Action.
5. Use **Simulation** or Hitbox Library Play to inspect direction and contact.

Completion check: the sweep appears in front of the model. Preview does not damage a real player.

## 6. Configure combat behavior

Open **Combat Rules → Combat**.

| Setting | Value |
| --- | --- |
| Suppress Native Attacks | On |
| Chase Target | On |
| Face Between Patterns | On |
| Chase Speed Multiplier | 1.0 |
| Approach Distance | 2.0 |
| Scan Without Target | Off when CustomNPCs supplies hostile targets |

For an isolated scan test, enable Scan Without Target with Scan Range 16 and FOV 360. This fallback scan does not reproduce CustomNPCs faction filtering; keep unrelated living entities out of the test area.

In **Manager**, set **Same Pattern Penalty to 1.0**. With only one pattern, a value of 0 can remove the only candidate after its first use.

## 7. Save and apply

1. Save As `training/first_sword.json`.
2. With the NPC attached, press **Save** to bind it to that path.
3. If authoring without an NPC, select the practice NPC with Core and apply the file from its catalog.
4. Close the editor.

You can also save the [complete practice JSON](./assets/media/battleworks/training_swordsman.json) into the server's `mobs/patterns/training/` folder and Load it. It disables fallback scanning, so CustomNPCs must supply the hostile target.

## 8. Test in the world

1. Switch to Survival and stand about six blocks away.
2. Let CustomNPCs acquire you as a hostile target.
3. Confirm approach, preparation, contact, and recovery.
4. Move sideways during another attack and observe facing.
5. Move away and confirm pursuit resumes.

| Failure | First checks |
| --- | --- |
| No reaction | Survival mode, hostile target, Enabled, correct applied file |
| Approaches but never attacks | Range, pattern Enabled, cooldown, repeat score |
| Swings without damage | Hitbox link, event time, height, geometry, damage |
| Extra attacks outside timing | Native attack suppression and legacy combat scripts |
| Damage differs from 4 | Armor, invulnerability frames, effects, other mods |

## 9. Change one value at a time

First change Windup from 24 to 40, save/apply, and observe the extra 0.8 seconds. Restore it, then change Damage from 4 to 2. Finally move Event Tick from 3 to 8 and compare contact timing.

Keep the working original. Continue with [workspace and timeline](#mob-editor/mob-editor-patterns).

---
title: Your first melee attack
slug: battleworks-first-attack
order: 225
description: Build one attack with exact settings, save it, apply it, and verify the result.
product: mob-editor
section: start
category: BattleWorks
status: Guide
version: 0.1.7
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

BattleWorks 0.1.7 also offers [Simple edit and attack recipes](#mob-editor/battleworks-authoring). This page keeps the Build Assist exercise so you can learn each value. Open it with the wand or optional DRM Core, and use Detailed edit for the stage settings below. The 0.1.6 captures retain their original versions.

## What you will build

A DNPC using a normal player model approaches a player, prepares for about 1.2 seconds, sweeps in front, and recovers. Complete [installation and NPC preparation](#mob-editor/mob-editor-setup) first and open BattleWorks with the practice NPC selected.

The new captures were verified with BattleWorks 0.1.6, DRM 0.3.1 and DNPC 0.1.3 on NeoForge 1.21.1. These values are teaching starting points. Gecko and modded-entity models need their own compatible [animation setup](#mob-editor/battleworks-animation).

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

Choose **Beginner → Wide Sweep → Measured**. Each answer advances to the next question automatically. Inspect **Review Choices**, revisit a question if needed, then press **Create Pattern**.

Completion check: a pattern and a reusable hitbox appear. The assistant adds them without replacing existing patterns.

![Attack choices in Pattern Build Assist.](assets/media/guides/battleworks-016-neo1211/battleworks-assist.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Start with Beginner, then choose Wide Sweep and Measured. Return to a question to change an earlier answer.")

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

![Generated Wide Sweep pattern with a 24/16/24-tick timeline.](assets/media/guides/battleworks-016-neo1211/battleworks-assist-built.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Compare Windup, Action, Recovery and the Hitbox marker at tick 27. This shows pattern creation; it does not demonstrate a successful hit in combat.")

## 4. Narrow the range after the first test

The generator starts with Max Range `3.5` and Max Vertical `32`. You can save, apply and test those values first. Use the following adjustments afterward to narrow the practice attack.

1. Select the new pattern's **Core** settings.
2. Set Min Range `0`, Max Range `2.7`, and Max Vertical `2.5`.
3. Under Score, use Ideal Distance `2.0`.
4. Select its Hitbox action and choose **Edit this hitbox**.
5. Confirm Reach `2.4`, Thickness `0.5`, and Damage `4`.
6. Enable **Locked Target Only** for the practice fight.

Max Range determines when the pattern can start. Sweep Reach determines the hitbox reach. Raising Max Range to 10 does not make the weapon reach 10 blocks.

## 5. Stop and face the player during the attack

1. Select Windup, Action, and Recovery in turn.
2. Enable **Face Target** in each.
3. Enable **Stop Horizontal** and use **Hold** movement.
4. Keep the generated main-hand swing on Action.
5. Use **Simulation** or Hitbox Library Play to inspect direction and contact.

Check preview warnings or a preview window that fails to open separately from real combat. A visible model alone does not verify its motion or contact. Confirm actual damage in the Survival test below.

## 6. Configure combat behavior

Open **Combat Rules → Combat**.

| Setting | Value |
| --- | --- |
| Suppress Native Attacks | On |
| Chase Target | On |
| Face Between Patterns | On |
| Chase Speed Multiplier | 1.0 |
| Approach Distance | 2.0 |
| Scan Without Target | On for this DNPC exercise |

Use Scan Range 16 and FOV 360 in an isolated arena. The scan can select other living entities; keep friendly NPCs and other mobs out of this test. Supported older CustomNPCs installations can instead supply a faction target with fallback scanning off.

In **Manager**, set **Same Pattern Penalty to 1.0**. With only one pattern, a value of 0 can remove the only candidate after its first use.

## 7. Save and apply

1. Choose **Save As**, enter `training/first_sword.json`, then confirm with **Save** in the flyout.
2. With the NPC attached, press **Save** to bind it to that path.
3. If authoring without an NPC, select the practice NPC with the wand or optional DRM Core and apply the file from its catalog.
4. Close the editor.

You can also download the [UI-saved first_sword.json](./assets/media/battleworks/first_sword.json) into `config/dochi_rpg_maker/mobs/patterns/training/` and Load it. This file was tested in combat with Scan Range 16, FOV 360 and Same Pattern Penalty 1.0. It retains the generated attack values before the optional adjustments in section 4.

## 8. Test in the world

1. Switch to Survival and stand about six blocks away.
2. Confirm Scan Without Target is on and no other living entities are nearby.
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

![Combat settings after saving the file and binding it to the NPC.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Check Saved. Warnings: 0, Scan Without Target, Scan Range 16 and FOV 360. The server file is mobs/patterns/training/first_sword.json.")

![The Survival player facing the DNPC after receiving Wide Sweep damage.](assets/media/guides/battleworks-016-neo1211/battleworks-first-fight.png "BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1. The unarmored player server health fell from 20 to 12. Natural spawning and regeneration were excluded in the owned capture world, and the NPC target was verified as this player. This total is not the damage of one attack.")

![Test Wide Sweep against a Survival player and observe the health change.](assets/media/guides/short-videos-20261106/battleworks-first-attack.mp4 "BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1. Server health changed from 20 to 16.")

## 9. Change one value at a time

First change Windup from 24 to 40, save/apply, and observe the extra 0.8 seconds. Restore it, then change Damage from 4 to 2. Finally move Event Tick from 3 to 8 and compare contact timing.

Keep the working original. Continue with [workspace and timeline](#mob-editor/mob-editor-patterns).

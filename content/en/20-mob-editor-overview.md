---
title: Getting started with BattleWorks
slug: mob-editor-overview
order: 210
description: A learning path from installation to a first attack, boss phases, and particle effects.
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

## Start with one readable melee attack

BattleWorks **0.1.7** authors NPC attack timing, hitboxes, movement and boss phases. Use the matching Forge 1.20.1, Fabric / NeoForge 1.21.1, or separate Fabric / NeoForge 26.3 build.

**DRM is optional.** You can open the editors with the BattleWorks Wand and author files without an NPC. To execute a fight, prepare a supported actor such as DNPC. CustomNPCs remains optional on the older targets; it is excluded on 26.3 and later.

Start with [Simple edit and attack recipes](#mob-editor/battleworks-authoring), or follow the longer first-attack exercise below. A basic humanoid swing and BattleWorks hitbox need no external spell or animation mod.

## Follow this learning path

| Step | Guide | Completion check |
| --- | --- | --- |
| 1 | [Installation and NPC preparation](#mob-editor/mob-editor-setup) | Open BattleWorks with your NPC selected. |
| 2 | [Your first melee attack](#mob-editor/battleworks-first-attack) | The NPC approaches, prepares, hits, and recovers. |
| 3 | [Workspace and timeline](#mob-editor/mob-editor-patterns) | Move an action to another tick. |
| 4 | [Hitboxes](#mob-editor/battleworks-hitboxes) | Adjust damage, size, and placement separately. |
| 5 | [Model animation](#mob-editor/battleworks-animation) | Align contact with the model's motion. |
| 6 | [Targeting](#mob-editor/mob-editor-detection-patrol) and [movement](#mob-editor/battleworks-movement) | Approach and retreat without conflicting movement. |
| 7 | [Selection and phases](#mob-editor/mob-editor-phases), [passives](#mob-editor/battleworks-passives) | Add variety and health reactions. |
| 8 | [Two-phase boss exercise](#mob-editor/battleworks-encounters) | Combine the features into one encounter. |

Continue with [skills and presentation](#mob-editor/battleworks-skills-effects), [Particle Maker](#mob-editor/battleworks-particles), and [advanced actions](#mob-editor/battleworks-advanced-actions) when the basic encounter works.

## Where each setting belongs

![The Simple edit inspector and attack timeline.](assets/media/guides/battleworks-017-20261113/simple-edit.png "BattleWorks 0.1.7 / NeoForge 1.21.1 / DRM 0.3.2 / DNPC 0.1.4. The default Basic Slash is selected. This still shows the editing layout, not recipe generation or live damage.")

Use **Pattern Workbench** for the sequence, **Hitbox Library** for damage geometry, and **Combat Rules** for targeting, phases and the arena. **Simple edit** exposes common attack values; **Detailed edit** preserves and exposes the full conditions, events, movement and animation. [Recipes and My techniques](#mob-editor/battleworks-authoring) provide reusable starting points.

| Task | Editor |
| --- | --- |
| NPC name, base health, equipment, relationships, drops and respawn | The actor's own editor, such as DNPC |
| Actor appearance and model | DNPC Appearance & Model or the installed model provider; DRM NPC Basic when using DRM models |
| Patterns, hitboxes, combat timing, movement and phases | BattleWorks |
| Reusable visual particle files | Particle Maker in the standalone selector or DRM's Visual category |
| DRM popups and dialogue presentation | DRM and its popup/GUI tools |

Imported documents may enable npcStats to override selected combat attributes. Inspect those overrides if applying a boss file unexpectedly changes health or movement.

## Five terms you will use

| Term | Meaning |
| --- | --- |
| Battlework | A combat document. Several NPCs can reference the same server file. |
| Pattern | One move, such as a slash or retreat. |
| Stage | Windup, Action, or Recovery inside a pattern. |
| Timed actions / event | Actions sharing one execution time and repeat schedule. |
| Hitbox | The space tested for damage, authored separately from the visible weapon. |

At normal server speed, **20 ticks are about one second**.

## Remember these three rules

1. Visuals and damage are separate. A particle effect or arm swing does not create a BattleWorks hitbox.
2. Save the file and connect it to the NPC. Save As alone does not bind the NPC to the new path.
3. Test in the world after using Simulation. Rehearsal shows motion and hitbox placement; it does not execute real AI, damage, commands, sounds, or external spells.

Use [troubleshooting](#mob-editor/battleworks-troubleshooting) when a step fails and [files and samples](#mob-editor/battleworks-files) before importing someone else's encounter.

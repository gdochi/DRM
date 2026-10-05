---
title: Getting started with BattleWorks
slug: mob-editor-overview
order: 210
description: A learning path from installation to a first attack, boss phases, and particle effects.
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

## Start with one readable melee attack

BattleWorks is a Forge 1.20.1 addon for DRM that controls how CustomNPCs fight. Build a sequence such as “approach the player, prepare, swing and deal damage, recover, then select another move.”

This guide follows **BattleWorks 0.1.3 and DRM 0.1.7 or newer**. Existing mob-editor page addresses remain available. Start with a normal humanoid NPC; the first exercise does not require an optional spell or animation mod.

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

| Task | Editor |
| --- | --- |
| NPC health, equipment, factions, drops, respawning | CustomNPCs |
| Models, textures, animation assets and behavior mappings | DRM NPC Basic |
| Patterns, hitboxes, combat timing, movement, phases | BattleWorks |
| Reusable visual particle files | Visual → Particle Maker |
| Popup appearance and dialogue presentation | DRM Popup Maker and its GUI |

Advanced imported documents can also enable `npcStats` to override selected combat attributes. The beginner exercises leave that feature disabled and prepare base stats in CustomNPCs.

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

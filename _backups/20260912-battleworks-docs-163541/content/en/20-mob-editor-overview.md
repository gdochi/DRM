---
title: Dochi's Battleworks Overview
slug: mob-editor-overview
order: 210
description: Create and apply NPC combat specifications through the Battleworks editor.
product: mob-editor
section: start
category: Battleworks
status: Guide
version: 0.1.2
audience: Combat content creators
tags:
  - battleworks
  - CustomNPCs
  - combat
---

## What Battleworks creates

Dochi's Battleworks is a **combat authoring addon for Minecraft Forge 1.20.1 and DRM**. Build a combat specification for a CustomNPCs NPC in-game: create a pattern, then place hitbox contacts, skills, movement, and animation timing inside it.

This guide covers the creator-facing Battleworks 0.1.2 editor. It is separate from player HUDs and GUI Maker layouts. Existing Mob Editor documentation addresses remain available, but the current mod and editor are called Battleworks.

## The three workspaces

| Workspace | Purpose |
| --- | --- |
| Pattern Workbench | Select a pattern and place actions in its Windup, Action, and Recovery stages. |
| Hitbox Library | Edit reusable hitbox geometry, damage, and offsets; preview the NPC with its clip list and Play/Stop controls. |
| Combat Rules | Configure pattern scoring, engagement and pursuit, health phases, and death timelines. |

The model preview belongs to **Hitbox Library**. Pattern Workbench uses its central space for the action timeline.

## Authoring units

| Unit | Meaning |
| --- | --- |
| Battlework | One NPC combat document containing patterns, hitboxes, and combat rules. |
| Pattern | An action with eligibility conditions and three execution stages. |
| Stage | Windup, Action, or Recovery, with duration, movement, facing, and animation settings. |
| Timed actions | A group of actions sharing an execution tick and repeat settings. |
| Hitbox | Reusable geometry and damage data referenced by patterns, separate from animation assets. |

Reuse one hitbox in several patterns with different timings. Simultaneous actions remain individually selectable as named timeline rows.

## Start here

1. [Installation and NPC application](#mob-editor/mob-editor-setup)
2. [Patterns and hitboxes](#mob-editor/mob-editor-patterns)
3. [Model-specific animation](#mob-editor/battleworks-animation)
4. [Pursuit and facing](#mob-editor/mob-editor-detection-patrol)
5. [Files and test samples](#mob-editor/battleworks-files)

**CustomNPCs and DRM are required.** Better Combat, GeckoLib, Player Animator, Iron's Spells 'n Spellbooks, and other providers are optional integrations.


## Battleworks 0.1.2

Combine spells, walking, dashes, teleports, passive reactions, dialogue and battle music. See [Boss Encounter Guide](#mob-editor/battleworks-encounters) for practical setup, action chances and applying updated files.

Version 0.1.2 adds **Pattern Build Assist**, a draggable **Simulation** panel with preview-speed controls, and bundled combat, GUI, and popup training samples. It also improves editor sizing, flyouts, sound controls, combat facing, target tracking, hitbox previews, and animation playback. Client and server must use the same 0.1.2 build.

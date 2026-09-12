---
title: Target Pursuit and Facing
slug: mob-editor-detection-patrol
order: 250
description: Separate target acquisition, between-pattern pursuit, and stage movement.
product: mob-editor
section: combat
category: Battleworks
status: Guide
version: 0.1.2
audience: Combat content creators
tags:
  - battleworks
  - combat
---

## Establish a target first

Applying a combat specification is separate from choosing enemies. Configure CNPC factions and hostile targets first. The Jar Fist combat sample disables automatic scanning and uses CNPC's current target.

**Combat Rules → Combat → Scan Without Target** enables a supplementary search for nearby living targets when no current target exists. It uses range, field of view, and optional visibility checks, and excludes creative/spectator players.

This supplementary search is not equivalent to CNPC's faction hostility filter. Leave it disabled when CNPC should decide who is an enemy.

## Movement between patterns

A Battlework with native attacks suppressed uses its own pursuit goal. It can approach even when DRM has locked the NPC's native melee attack goal.

| Setting | Behavior |
| --- | --- |
| Chase Target | Find a path toward the target between patterns. |
| Face Between Patterns | Keep looking at the target during engagement and cooldown waits. |
| Chase Speed Multiplier | Navigation multiplier applied to the NPC's movement speed; defaults to 1.0. |
| Approach Distance | Desired approach spacing; defaults to 2.0 blocks and is adjusted into an available attack window. |

When native attack suppression is disabled, CNPC's existing attack AI retains movement and look control. Its settings are separate from the dedicated Battleworks pursuit settings.

## Movement inside a stage

Once a pattern starts, its current stage controls movement.

- A stage with **Face Target** enabled turns the head and body toward the target.
- **Stop Horizontal** or `hold` stops horizontal motion.
- `away`, `dash`, `orbit`, `left`, `right`, `zigzag`, and `jump` are authored stage movements.
- Between-pattern facing does not automatically enable facing in a stage that has it disabled. A movement's own tracking or dash behavior can still request facing.
- Pursuit navigation does not overwrite an authored retreat or roll velocity.

After target loss and the end of any target-dependent pattern, the dedicated goal releases movement to CNPC's idle AI. Configure normal patrol routes in CNPC.

## If the NPC does not move

1. Confirm that combat is enabled and that you applied the combat sample, not the preview file.
2. Confirm that the NPC has a target. Use survival mode for player testing.
3. Reapply edited JSON to the NPC.
4. Check between-pattern pursuit separately from the stage's hold and facing controls.
5. Check pattern distance, phase, and health eligibility.
6. Check CNPC movement speed, disabled AI settings, and blocked paths. Motion inside a model animation does not itself move the entity through the world.

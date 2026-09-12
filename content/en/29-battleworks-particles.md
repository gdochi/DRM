---
title: Create effects with Particle Maker
slug: battleworks-particles
order: 274
description: Build a two-second ring, test it with a command, and attach it to a combat stage.
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

## What this exercise produces

A visual file emits a ring for about two seconds. You will play it through a command and a boss Windup. Damage remains a separate Hitbox or Skill.

The shared 0.1.3 Particle Maker uses **separate `dochi.particles.v1` files**. Older inline particleEffects documents remain a compatibility path.

## 1. Open without an NPC

1. Use DRM Core in Creative mode.
2. Choose **Visual → Particle Maker**.
3. Create an effect or Load `particle_sample.json`.
4. Save As a working copy.

A BattleWorks Particle Shape action can also open the same editor with **Open Particle Maker**, then connect the saved file.

## 2. Build a ring layer

| Control | Value |
| --- | --- |
| Effect name | Training Ring |
| Duration (ticks) | 40 |
| + Layer | One layer |
| Start / End tick | 0 / 39 |
| Interval | 2 |
| Particle | minecraft:end_rod |
| Origin | Caster |
| Shape / Radius | Ring / 2.4 |
| Sample points / Count per point | 24 / 1 |
| Spread / Speed | 0 / 0 |
| Local Y | 0.05 |

1. Set timing under **Timing / names**.
2. Choose the particle and origin under **Particle / origin**.
3. Set shape and dimensions under **Shape / size**.
4. Move slightly above the floor under **Starting position / rotation**.
5. Inspect Play / Pause and Reset.

A particle layer's End tick is inclusive but must be **less than Duration**. A 40-tick effect uses ticks 0–39. This differs from combat stage-event bounds.

At interval 2, this example emits at 0, 2, 4 through 38: 20 emissions of 24 particles, requesting 480 total.

## 3. Animate the radius

1. Open **End values (linear)** and enable Animate to end values.
2. Use starting Radius 1 and End Radius 2.4.
3. Match the other ending coordinates to the starting coordinates.
4. Play and watch the ring expand.

For multiple time points, seek the timeline, open **Motion keyframes**, press **Add key**, and set position, radius, and yaw. Values interpolate linearly between keys.

Keys take precedence for their X/Y/Z, radius, and yaw values. They animate the **emitter**, not the positions of every particle already created.

## 4. Select valid particle options

The picker lists registered vanilla and mod particles. Additional options appear only when needed.

Examples: `minecraft:dust` can use `1 0.3 0.1 1`; a block particle can use `minecraft:stone`. Mod-specific options must match their real decoder. Begin with end_rod before changing types.

## 5. Preview controls and limits

Drag the canvas to rotate and use the wheel to zoom. Front / Perspective changes the view.

**End: Hold** keeps the preview's final frame. **End: Clear** clears the preview after playback. These are not commands to override every world particle's lifespan.

Preview uses real particle providers, textures, and render types. Some CUSTOM renderers need a separate world-render stage and cannot be embedded; NO_RENDER particles are intentionally invisible. Check actual world lighting, depth, and appearance too.

## 6. Save and run one command

1. Save As `training_ring.json`.
2. Confirm the save result.
3. Verify it is in `config/dochi_rpg_maker/particles/`.
4. With permission level 2 or above, run once:

```mcfunction
/drm particle play training_ring ~ ~ ~
```

**Do not include .json in the command.** Subfolders use names such as effects/training_ring. Completion suggests extensionless names.

One command schedules the entire effect. Repeating it every tick is unnecessary. Relative coordinates use the command's execution position.

You can also save the [practice particle file](./assets/media/battleworks/training_ring.json) into that folder.

## 7. Attach it to Windup

1. Select a BattleWorks pattern's Windup.
2. Add **Particle Shape** from the presentation category.
3. Use **Choose particle JSON** and select training_ring.json.
4. Choose Origin Caster.
5. Set Event Tick 0, Interval 0, Repeat Count 1.
6. For this exercise, use a 40-tick Windup before contact.
7. Save/apply the combat document.

The action stores a particleFile reference. Editing that shared particle file affects other encounters using it.

Caster/Target effects can keep following their origin's position and facing while emitting. For a fixed warning at the player's earlier location, record a position and choose Saved position.

## 8. Emission limits

| Scope | Current limit |
| --- | --- |
| Effect duration | 600 ticks |
| Layers / keys per layer | 32 / 64 |
| Single geometry samples / count | 512 / 32 |
| Combat NPC concurrent effects / per-tick budget | 8 / 2,048 |
| Command effects per dimension / per-tick budget | 64 / 4,096 |

If output is skipped, reduce samples, count, frequency, or simultaneous effects. Inspect `Particle JSON rejected` for file failures. Use the world command when preview reports unsupported rendering.

A visible ring without damage is expected until a separate [hitbox](#mob-editor/battleworks-hitboxes) is connected.

---
title: Animation by NPC Model Type
slug: battleworks-animation
order: 240
description: Choose clips from the actual NPC model and preview them in Hitbox Library.
product: mob-editor
section: authoring
category: Battleworks
status: Guide
version: 0.1.0
audience: Combat content creators
tags:
  - battleworks
  - combat
---

## Configure the model in NPC Basic

Use DRM's **NPC Basic** to set the NPC type, model, texture, and animation file. Battleworks selects that NPC's animations for combat patterns. An animation JSON file is not an NPC combat specification.

| DRM NPC type | Clip catalog |
| --- | --- |
| Normal NPC | Humanoid motions provided by Better Combat |
| Gecko NPC | Clips in the animation file configured for that NPC |
| Modded entity model | Native animations exposed by its DRM integration |

A modded entity's private animation system is not automatically enumerable. Available clips depend on what its DRM integration exposes. GeckoLib, Better Combat, and Player Animator are optional providers for their respective animation workflows. Hitbox editing and patterns with no animation remain usable without those providers.

## Preview in Hitbox Library

1. Select a hitbox and choose its use location with **Pattern:**.
2. Select a stage, such as **Action**, above the model.
3. Search the **Clips** list beside the model and select a clip.
4. Press **Play** below the model. **Stop** ends playback; another Play starts it again.
5. Align contact ticks with the model pose on the timeline.

Unattached hitboxes also support clip previews. Attach the hitbox to a pattern to author its saved combat timing.

## Animation versus contact timing

A hitbox owns geometry and damage; a stage owns the clip mapping. During one server-side pattern execution, the first successfully started animation plays once. Repeated hit contacts and stage transitions do not continually restart that attack motion.

For a first attack, **assign one clip to Action and leave Windup/Recovery animation empty**. This makes motion and contact timing easier to compare. Do not assume that assigning different clips to several stages creates a sequence of animations; the attack uses a one-shot playback policy.

Gecko preview uses an independent editor clock, so it can advance while the game is paused. A selected clip longer than its pattern may extend preview playback to show its ending, without changing the saved pattern duration.

## Empty lists or missing playback

- Check the NPC Basic model type and the actual animation file.
- Distinguish a geometry `.geo.json` file from a clip-containing `.animation.json` file.
- After assets finish loading, refresh the list.
- Check that the optional provider is installed and compatible with the model. A Gecko clip is not silently replaced by an unrelated humanoid motion.
- The **Pattern:** dialog lists uses of a hitbox. Select animations in Clips beside the model.
- Play is an editor preview. Save/apply the document and test combat to change the real NPC's attacks.

Documents with a model snapshot can restore DRM model settings when applied. Older documents without one, and the Jar Fist samples, preserve the target NPC's existing model configuration.


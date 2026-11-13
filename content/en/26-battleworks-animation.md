---
title: Connect models and combat animation
slug: battleworks-animation
order: 240
description: Choose compatible clips and align stage, timeline, and cast animation timing.
product: mob-editor
section: authoring
category: BattleWorks
status: Guide
version: 0.1.7
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## 1. Prepare the actor's model

Configure the real actor first: for DNPC use **Appearance & Model**; for a DRM model use **DRM NPC Basic** and its assets. **DRM is optional**. Without DRM, BattleWorks can use its native humanoid swing and supported optional animation providers; with DRM installed, DRM retains animation ownership.

| Model or method | Appropriate source |
| --- | --- |
| Normal humanoid | Main-Hand Swing, or a compatible installed Player Animator / PAL motion source |
| Better Combat weapon motion | Compatible Better Combat resources and a supported weapon |
| Gecko model | A real clip exposed by the installed model provider and animation file |
| DRM modded entity / Behavior | Clips or semantic mappings exposed by the DRM integration |
| Geometry-only test | Explicit No Animation / None |

Custom humanoid clips can appear under their own namespace; they are not limited to Better Combat IDs. A Gecko clip and a humanoid pose layer are not interchangeable. CustomNPCs actors are only an optional legacy integration below 26.3.

## 2. Select a clip in Hitbox Library

1. From the pattern's action, open **Edit this hitbox**.
2. Use **Pattern:** to select the linked usage and choose its stage, such as Action.
3. Read the source description above **Clips**, then search by name or ID.
4. Select a compatible clip, press Play, inspect contact, then Stop.
5. Adjust the pattern's hit event to match contact and save/apply.

A selection without a linked pattern is temporary preview state. Select the intended usage to save its stage animation. A detached preview uses the attached NPC's copied appearance, saved preview settings, or a default actor; reopen with the real NPC if the model differs.

![Clip source, search and long clip names in Hitbox Library.](assets/media/guides/battleworks-017-20261113/animation-clips.png "BattleWorks 0.1.7 / Fabric 1.21.1 / DRM 0.3.2 / DNPC 0.1.4, with Better Combat resources installed. The source description wraps above search and a long clip name is exposed on hover. No compatible stage motion is assigned in this still; it does not demonstrate playback.")

Long clip names stay on one row and reveal their full text while hovered. Drag the model/list divider for more width, or refresh after resources finish loading.

## 3. Three animation locations

| Location | Purpose |
| --- | --- |
| Stage Animation | Start a mapping on stage entry |
| Timeline Animation action | Start a specific motion at an event tick |
| Skill Cast Animation | Request a motion on each successful cast |

Start with one Action-stage animation. A configured stage animation takes precedence over ordinary Animation actions inside that stage. To schedule several explicit motions, intentionally set stage animation to None first.

## 4. Stage changes in 0.1.5

- Consecutive stages using the same mapping share a continuous playback span.
- A different stage mapping can start on stage entry.
- Recovery may wait while an authored action/cast animation still owns its specified playback time.
- Action Duration and Cast Animation Ticks use their authored durations instead of being stretched to the entire remaining pattern.
- Repeated hitbox checks do not restart the stage animation.

Do not apply the old 0.1.2 “one first-stage animation for the whole pattern” limitation to this version.

## 5. Tune speed and contact separately

1. Start with Animation Speed 1.0.
2. Match Event Tick to the contact posture.
3. Increase animation speed slightly only when needed.
4. Recheck contact and stage length after changing it.
5. Save/apply and compare actual combat.

Preview speed controls observation. Animation Speed is saved and affects real motion. Arbitrary frame seeking is not guaranteed for every Gecko clip; also inspect normal playback and restart.

## 6. Preserve an intentional None selection

The following is a **stage animation object**, not a complete combat file:

```json
{
  "explicitSelection": true,
  "provider": "none",
  "id": "",
  "playback": "once",
  "speed": 1.0,
  "fadeTicks": 0
}
```

Without an explicit choice, older hitbox-only stages may migrate to the basic swing.

## 7. Diagnose an empty or incompatible clip list

1. Check the real actor's model and the source description above Clips.
2. For Gecko, distinguish geometry `.geo.json` from animation `.animation.json` and check the linked animation asset.
3. For humanoid clips, check the matching Player Animator / PAL provider and actual client resources. Better Combat is needed only for its motions.
4. Refresh after asynchronous resources load. Use clips offered for the current model instead of inventing IDs.
5. With DRM installed, verify its model mappings and playback; without DRM, test a native swing before adding optional clips.

A visible catalog entry is not proof that an incompatible model can play it. Compare the real NPC after saving and applying.

## Model snapshots

A document with `drmNpcModel` can restore model configuration when applied. `previewNpcModel` and `previewTexture` are detached-preview data. Check snapshots before applying an imported encounter to a different model.

Finally, verify that the real NPC plays the same intended motion during combat.

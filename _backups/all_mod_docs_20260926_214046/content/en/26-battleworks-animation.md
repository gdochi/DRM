---
title: Connect models and combat animation
slug: battleworks-animation
order: 240
description: Choose compatible clips and align stage, timeline, and cast animation timing.
product: mob-editor
section: authoring
category: BattleWorks
status: Guide
version: 0.1.3
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## 1. Prepare the model in NPC Basic

BattleWorks uses DRM's model and playback APIs. Configure geometry, textures, animation assets, and semantic mappings in **DRM NPC Basic** first.

| Model or method | Appropriate source |
| --- | --- |
| Normal humanoid | Main-Hand Swing or installed humanoid motion provider |
| DRM Gecko model | A real clip from that model's animation file |
| DRM modded entity | Native clips exposed by its DRM integration |
| DRM Behavior | A configured semantic mapping such as attack |
| Geometry-only test | Explicit No Animation / None |

A Gecko clip and a humanoid Better Combat pose layer are not interchangeable.

## 2. Select a clip in Hitbox Library

1. Open **Edit this hitbox** from the action.
2. Choose the use under **Pattern:**.
3. Select Action in the model's stage toolbar.
4. Search **Clips** and select a real clip.
5. Press Play, inspect contact, then Stop.
6. Change the pattern's Event Tick to match contact.

Pattern selects a usage; Clips selects animation. A detached preview can use a model snapshot or a default mannequin. Reopen with the real NPC if the preview model does not match.

## 3. Three animation locations

| Location | Purpose |
| --- | --- |
| Stage Animation | Start a mapping on stage entry |
| Timeline Animation action | Start a specific motion at an event tick |
| Skill Cast Animation | Request a motion on each successful cast |

Start with one Action-stage animation. A configured stage animation takes precedence over ordinary Animation actions inside that stage. To schedule several explicit motions, intentionally set stage animation to None first.

## 4. Stage changes in 0.1.3

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

## 7. Diagnose an empty clip list

1. Check NPC Basic's model provider.
2. Distinguish geometry `.geo.json` from animation `.animation.json`.
3. Confirm the model references the intended animation asset.
4. Check optional providers and client resources.
5. Refresh after asynchronous assets load.
6. Verify that DRM actually exposes the needed native clip.

Use the current NPC's list instead of inventing IDs.

## Model snapshots

A document with `drmNpcModel` can restore model configuration when applied. `previewNpcModel` and `previewTexture` are detached-preview data. Check snapshots before applying an imported encounter to a different model.

Finally, verify that the real NPC plays the same intended motion during combat.

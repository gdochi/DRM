---
title: Scene Maker
slug: scene-maker
order: 150
description: Create and edit camera scenes in the world.
product: core-fabric
category: Scene Maker
section: scene-maker
status: Stable
version: 0.3.1
audience: Creators / Operators
---

## Make your first scene

Scene Maker is a creator tool for arranging camera movement and screen effects. Players see the saved scene when it is played, not the editing timeline.

![Scene Maker with a ten-second scene. Addition tools are on the left, preview and timeline in the middle, and selected Properties on the right.](assets/media/guides/drm-031-neo1211/scene-maker.png "DRM 0.3.1 / NeoForge 1.21.1. Add on the left, select a timeline card, then edit Properties. Use Apply Fields, followed by Play to inspect the result.")

1. Open the DRM editor selector and choose **Scene Maker**.
2. Choose your scene settings, name, and length. Use **Player** to place the scene relative to the player, or **Fixed Position** for a specific world location. Choose the dimension and origin as needed. NPC anchors are not offered.
3. Add a camera track and any subtitles, images, sound, fade, letterbox, shake, or event elements you need.
4. Select a card to edit its properties. Use **Apply Fields** for field changes. Right-click a card for its available actions. Some card types cannot be split.
5. Open **World positions** to place and adjust camera points.
6. Use **Play** to preview, then save your own scene with **Save As**. **Run Saved** plays the saved version, so save again after making changes.

## Complete one scene in three videos

These sequential videos show real **DRM 0.3.1 / NeoForge 1.21.1** screens, with English tutorial captions and click markers. They are silent. The gate and lamps were prepared in the test world to make camera movement visible.

### 1. Scene length and subtitle

![Configure a ten-second scene and edit a subtitle visible from one to five seconds.](assets/media/guides/tutorial-videos-20261107/scene-settings-subtitle.mp4 "Scene Settings → + Subtitle → Edit Subtitle → Apply Fields. Time fields use seconds.")

1. In **Scene Settings**, enter ID **tutorial_gate**, Name **Village gate**, and keep Duration **10**. Use **Apply Fields**. The video keeps the **Player** anchor, so playback is relative to the player. To shorten a scene, first bring existing camera/effect end times inside the new duration.
2. Choose **+ Subtitle**, enter Start **1** and End **5**, then **Apply Fields**. The subtitle is active during seconds 1–5 of the ten-second scene.
3. Open **Edit Subtitle**, enter **Welcome to the village!**, and use that window's **Apply Fields** to return. Cancel discards its text changes.
4. Move the red playhead to **3 seconds** to inspect the text. Selecting a card selects an editing target; it does not seek. The default opening/closing fades can make time zero black.

### 2. Build the camera path in the world

![Select the camera, move the work camera in World positions, mark points, apply, and preview.](assets/media/guides/tutorial-videos-20261107/scene-world-camera-path.mp4 "Camera card → World positions → WASD/Space → P/N → Enter to Apply → Play. Real world-position editing.")

1. Click the **body of the Camera card**, then **World positions**. A subtitle or effect card is not a camera selection.
2. Scroll the mouse wheel down to reduce speed, then move the work camera with **WASD / Space / Shift**. **P** records its position at the current time. Moving the camera alone does not record a path point.
3. Move elsewhere and use **N** to add the next point. P records the current time; N adds a point at a later time. Timeline times determine travel duration.
4. Use **Enter or Apply** to return the edited positions to the scene draft. Cancel discards changes made in this window.
5. Use **Stop → Play** to inspect camera and subtitle together. Keep both the position window's Apply and the scene file save in your workflow.

### 3. Effects, saving and real playback

![Set Letterbox timing, save the scene, and use Run Saved to verify server playback and completion.](assets/media/guides/tutorial-videos-20261107/scene-effects-save-run.mp4 "+ Letterbox → Apply Fields → Save As → Run Saved. The final playback uses the saved file rather than the editor preview.")

1. Choose **+ Letterbox**, enter Start **0**, End **10**, then **Apply Fields**. Effects have their own cards and active intervals.
2. Use **Save As** with **tutorial_gate**. The file is **config/dochi_rpg_maker/scene/tutorial_gate.json**. Neither position Apply nor Apply Fields saves the file.
3. Use **Run Saved** to play the saved file through the server. Save again after further edits.
4. To replay with a command, use **/drm scene tutorial_gate.json**. See the command section below for player selectors.
5. Check subtitle removal and the return to normal gameplay. The recorded runtime result was verified in the isolated single-player test world.

## Move through the timeline

The red pin is the playback position. Drag it deliberately to seek. Selecting a card does not seek. The bottom horizontal scrollbar moves the visible time range independently; use the minus/plus controls to adjust zoom. Use the Loop switch when you want repeated preview playback.

In the screenshot, **Camera** contains the camera clip, while **opening / closing** in **Effects** marks the beginning and ending effects.

## Work with camera points

| Control | Action |
| --- | --- |
| WASD / Space / Shift | Move the editing camera. |
| Right-drag empty space | Look around. |
| Mouse wheel | Adjust movement speed. |
| Ctrl + wheel | Adjust the camera field of view. |
| Left-click a pin | Select the point without teleporting. |
| Hold left mouse and drag a pin | Move the point on the current view plane. |
| Release after dragging | Keep the move in the working scene. |
| Esc or right-click during a drag | Cancel that move. |
| Right-click a pin | Open point actions. |
| Right-click a connecting line | Open path actions. |
| P / Mark position | Put the selected point at the editing camera. |
| N / New point | Add a point at the current camera position and the next available time chosen by the editor. |
| Ctrl + Z | Undo a completed edit inside this window. |
| Apply | Keep the edited positions and return to Scene Maker. |
| Cancel | Return without applying this window’s changes. |

Dragging keeps the point’s original depth relative to the view. To move it in another direction, release, move the editing camera, and drag again. A click with a small hand movement only selects. Pins must remain in the loaded part of the world. The camera stays still while a pin is being dragged.

Use **Move camera here (TP)** to view a selected point, or **Move point to camera** to relocate it to your current view. These are separate actions. **Walk in world** lets you move as the player and mark positions; follow the on-screen return controls.

## Shape the route

Right-click the connecting line or choose **Edit outgoing path** on a pin. Pick a straight or smooth route, add a midpoint, or place a bend at your camera. Move the added pins to shape the curve. The drawn path shows the camera route used for playback.

Orbit scenes use their own distance and angle settings. Moving an orbit point can change the shared orbit distance. Straight/smooth path editing is for ordinary camera paths, not orbit routes.

## Play a saved scene

With operator permission:

```text
/drm scene
/drm scene <scene-file>
/drm scene <scene-file> play @a
/drm scene <scene-file> stop @a
```

Use the suggestions after `/drm scene ` to choose a playable saved scene. Replace `<scene-file>` with that name; it is not a literal part of the command. The second form plays for you, the third for the selected players, and the fourth stops that scene for them.

If a scene is not listed, check that it was saved and that its anchor and referenced content are valid. World-position Apply updates the editing document; save the scene afterward to keep it for later playback.

## Stop all active scenes

`/drm scene stop @a` stops the selected players' current scenes without naming a file. Use the `/drm scene` root; there is no separate `/drmscene` command.

## Cameras Following A Moving Target

Use Follow, Orbit or Path+LookAt for moving targets. The 1.21.1 and separate 26.3 builds follow their movement more smoothly without requiring existing scene files to change. Forge 1.20.1 does not include Scene Maker.

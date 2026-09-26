---
title: Scene Maker
slug: scene-maker
order: 150
description: Create and edit camera scenes in the world.
product: core-fabric
category: Scene Maker
section: scene-maker
status: Stable
version: 0.1.9
audience: Creators / Operators
---

## Make your first scene

Scene Maker is a creator tool for arranging camera movement and screen effects. Players see the saved scene when it is played, not the editing timeline.

1. Open the DRM editor selector and choose **Scene Maker**.
2. Choose your scene settings, name, and length. Use **Player** to place the scene relative to the player, or **Fixed Position** for a specific world location. Choose the dimension and origin as needed. NPC anchors are not offered.
3. Add a camera track and any subtitles, images, sound, fade, letterbox, shake, or event elements you need.
4. Select a card to edit its properties. Use **Apply Fields** for field changes. Right-click a card for its available actions. Some card types cannot be split.
5. Open **World positions** to place and adjust camera points.
6. Use **Play** to preview, then save your own scene with **Save As**. **Run Saved** plays the saved version, so save again after making changes.

## Move through the timeline

The red pin is the playback position. Drag it deliberately to seek. Selecting a card does not seek. The bottom horizontal scrollbar moves the visible time range independently; use the minus/plus controls to adjust zoom. Use the Loop switch when you want repeated preview playback.

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

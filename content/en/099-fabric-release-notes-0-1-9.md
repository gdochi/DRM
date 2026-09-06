---
title: Fabric 0.1.9 Update
slug: release-notes-0-1-9
order: 9
description: Scene Maker and easier editing in Fabric 0.1.9.
product: core-fabric
category: Getting Started
section: getting-started
status: Stable
version: 0.1.9
audience: Creators / Operators
---

## Change Log 0.1.9

### Added

- **Scene Maker** — Create camera tours and story scenes inside Minecraft. Arrange camera movement, subtitles, images, sounds, fades, cinematic bars, and camera shake on a timeline.
- **World camera points** — Place points while looking around your world. Grab a diamond-shaped pin with the mouse to move it directly.
- **Editable camera routes** — Use straight or smooth paths and add points between existing ones to shape the camera’s journey.
- **Scene playback commands** — Use `/drm scene` to see playable scenes. The next argument suggests saved scenes, making them easier to start.
- **Back and forward arrows** — Move between editor screens from the shared topbar. Hover over an arrow to see what it does.

### Improved

- **Timeline browsing** — A separate bottom scrollbar lets you look through a long scene without moving its playback marker.
- **Card editing** — Right-click a timeline card to find actions such as split and delete. Available actions depend on the card type.
- **Easier settings** — Choose options from lists, use switches for on/off settings, and select colors with the color picker.
- **World editing** — Camera movement feels smoother, camera paths are clearer, and solid diamond pins are easier to recognize.
- **Point controls** — Clicking a pin selects it. Right-click it to move the camera there, move the point to the camera, edit its outgoing path, or delete it.
- **Safe dragging** — Release the mouse to keep a point move, or press Esc/right-click to cancel that move. A completed drag can be undone in one step.

### Fixed

- Clicking timeline cards no longer makes the playback marker jump.
- Adding scene elements is more reliable.
- Dimension names and timeline time labels stay within their intended areas.
- Applying world-position edits keeps the points you arranged instead of moving the selected point to the viewing camera.
- The Save As toolbar action uses its proper icon.

### Updating

Back up your world and `config/dochi_rpg_maker/`, then update DRM on the server and clients. CustomNPCs remains required. Existing quests, factions, popups, and admin tools from 0.1.8 remain available.

Scene anchors use **Player** or **Fixed Position**. If you have an older experimental scene using an NPC anchor, change it before saving or playing it. For back/forward arrows in Cobblemon addon editors, also install the updated addon build.

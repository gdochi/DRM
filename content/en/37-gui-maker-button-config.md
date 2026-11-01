---
title: Change Button Appearance
slug: gui-maker-button-config
order: 103
description: Choose Minecraft button rendering or the DRM custom style for a screen.
product: core
category: GUI Maker
section: gui-maker
status: Guide
version: 0.3.1
audience: GUI creators
---

## Use Minecraft-style choice buttons

1. Open the dialogue layout in [GUI Maker](#core/gui-system).
2. Choose **Button Config** at the top.
3. Turn on the switch for **Choice / choice_box** to use vanilla rendering. **Custom** uses DRM’s custom style.
4. Return with **Done** and inspect **Preview**.
5. **Save As** your layout and select it in Dialogue Editor’s GUI settings.

![Choice / choice_box set to Custom in Button Config.](assets/media/guides/drm-031-forge1201/gui-button-config.png "DRM 0.3.1 / Forge 1.20.1. The list contains button kinds supported by the current layout. Each switch changes that kind’s rendering.")

![Choice / choice_box switched to Vanilla.](assets/media/guides/drm-031-forge1201/gui-vanilla-buttons.png "Return with Done and check choice size and long replies in Preview. This is the actual switched editor state.")

Button Config changes appearance. Set whether a reply opens a shop or another scene under **Dialogue Editor → Choice actions**.

| Change | Where |
| --- | --- |
| Reply text | Dialogue Editor → Choices → Label |
| Choice area position and size | GUI Maker canvas |
| Text size, long replies and pulses | [Choice styling](#core/dialogue-choice-style) |
| Vanilla/custom button rendering | Button Config |

Opening a shop layout shows its own supported button kinds. Changing one dialogue layout does not change every screen’s buttons.

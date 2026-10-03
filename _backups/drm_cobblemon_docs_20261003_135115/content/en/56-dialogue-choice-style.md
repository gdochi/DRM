---
title: Choice Text And Pulse
slug: dialogue-choice-style
order: 63
description: Size dialogue choices and highlight an answer when it appears.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Stable
version: 0.1.5
audience: Dialogue creators
tags:
  - dialogue
  - choice
---

## Change choice text size

Open a dialogue node's **Choices** section. **Choice text px (0 = GUI)** sets the choice text size for that node. A value of **0** uses the linked GUI's setting; a positive value overrides it.

For a shared appearance, open the dialogue layout in **GUI Maker**, select its **Choice** component, and adjust **Text size (px)**. The available text sizes are 6–32 GUI pixels. These are Minecraft GUI units, so the on-screen size also depends on GUI scale.

## Make long answers fit

Use automatic button width when answers have different lengths. DRM measures the displayed text, including resource-pack translations, and uses the available width before wrapping. A long answer can grow to the choice area's inner width; short answers keep a compact width.

If text still needs more than one line, the button grows vertically. A crowded choice list can be scrolled. For compact buttons, use an automatic minimum height of **0**. The default adds about **5 GUI pixels above and below the text**. A larger minimum height you set yourself still applies.

To use resource-pack translations, mark the label as a translation key and provide that key in your language file. The translated words are what count when calculating the button size.

## Highlight a choice with a pulse

1. Open **Dialogue Editor → Choices** and select an answer.
2. Turn **Pulse highlight** on.
3. Set the following controls.

| Control | Meaning |
| --- | --- |
| Total ticks | Total time for all pulses. 20 ticks is one second. |
| Pulse count | Number of brightening-and-fading cycles within that time. |
| Color (RGB) | Choose a color using the color field, swatch, or color palette. |
| Intensity | Strength from 0 to 100. Use the arrows or enter a number in the middle field. 0 makes the effect invisible. |

For example, **60 ticks / 3 pulses** plays three pulses over three seconds. Intensity changes how strong the highlight looks; it does not change the chosen color or text size.

The effect starts when that choice first becomes visible. A choice waiting for the dialogue typing effect, or waiting below the scroll area, does not use up its pulse early. Scrolling away and back does not restart a finished effect. Opening the dialogue scene again gives it a new playback.

## Existing dialogue files

Old dialogues continue without a pulse. Enable it only on the choices you want to emphasize. Turning it off keeps its settings for later use. Save the dialogue after editing.

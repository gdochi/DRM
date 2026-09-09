---
title: Dialogue Choice And Gecko Presentation
slug: dialogue-presentation
order: 63
description: Size choices, add pulse highlights, and connect Gecko animation routes in Fabric 0.2.0.
product: core-fabric
category: Dialogue Editor
section: dialogue-editor
status: Stable
version: 0.2.0
audience: Dialogue creators
---

## Choice text and pulse

In a dialogue node's **Choices** section, use **Choice text px (0 = GUI)** to override the linked GUI layout's text size for that node. A value of `0` keeps the GUI setting.

Enable **Pulse highlight** on an individual choice to draw attention when it first becomes visible. Configure its total ticks, pulse count, RGB color, and intensity. Hidden or off-screen choices do not spend their pulse time before they become visible.

Long translated choices use their displayed text when DRM calculates button width and wrapping. The runtime choice area can scroll when the full list does not fit.

## Gecko animation routes

A Start Route using `gecko_animation` can include a Goto target. DRM sends the animation request and then moves to the selected valid node.

Dialogue actions are evaluated in document order during the same server tick. The first navigation result remains authoritative, but later side effects such as Gecko animation, commands, tags, and item actions still run.

Gecko playback uses a synchronized server timeline. A player who begins tracking an NPC after playback starts receives the active animation and catches up to its current position.

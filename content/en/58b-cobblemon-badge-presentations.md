---
title: Badge Presentations and Collection Layouts
slug: cobblemon-badge-presentations
order: 581
product: drm-cobblemon-editor
section: trainer
category: Badges and Trophies
status: Usage guide
version: Fabric / NeoForge 0.2.9
description: Assign separate acquisition and selection effects, then customize collection and notice GUIs.
---

## Acquisition and selection are separate
Select an entry saved in [creating badges](#drm-cobblemon-editor/cobblemon-badges) and open **Presentation**. Assign one effect for acquisition and another for selection in the collection. Use set defaults or override an individual badge.

## Copy and save a presentation on video
![Copy the acquisition presentation, save Meadow Shine and save the badge catalog binding.](assets/media/guides/cobble-release-20261109/badge-presentation.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, English UI, silent. Real Copy and Edit → rename → Restart → Save → return → catalog Save.")

1. Press **Copy and Edit** for the event in **Presentation**. **Edit** changes the shared presentation itself; make a copy for a single-badge change.
2. Set **Name** on the right and preview from the start with **Restart**. **Template** offers **Soft Shine**, **Golden Ring** and **Gentle Rise**.
3. Select a track on the left. **Transform** controls start/end ticks, position, scale, rotation and opacity. **Effect** controls the effect's own properties. **Add Key** inserts a key at the current time.
4. **Save** in the presentation editor, then **Cancel** back to the badge editor. Finally press the badge editor's **Save** to commit the binding.

## Set defaults and individual bindings
The scope selector distinguishes the current badge from set defaults. Inheriting a default follows changes to the set. **None** explicitly disables that event's presentation. Acquisition and selection bindings are independent.

![Assign acquisition and selection presentations separately in the Presentation tab.](assets/media/guides/cobble-release-20261109/badge-presentation-bindings.png "The upper Copy and Edit belongs to acquisition; the lower one belongs to selection. Distinguish shared editing from editing a copy.")

Importing a battle presentation converts it to a badge document. It does not reuse a battle NPC binding.

## Collection screens and layout
**Display** controls collection arrangement and placement. **GUI** links the **Collection / Detail / Acquisition** GUI Maker screens. In GUI Maker, place badge lists, images, names and descriptions; runtime supplies actual player ownership. Edit animation keyframes in the presentation editor and screen text placement in GUI Maker.

## Player display settings
Acquisition notices queue in order; default automatic notices remain visible for at least eight seconds. Badge settings provide confirmation popups, reduced motion and sound controls. The video is silent and does not verify audible playback. Distinguish editor previews from real acquisition notices, and check ownership with **/badges** after awarding.

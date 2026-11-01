---
title: Hide Vanilla HUD Parts
slug: hud-maker-vanilla
order: 112
description: Control default hearts, experience, hotbar and supported mod HUDs when adding replacements.
product: core
category: HUD Maker
section: hud-maker
status: Guide
version: 0.3.1
audience: HUD creators
---

## Prevent two health displays from overlapping

Adding a custom health bar does not automatically hide Minecraft’s hearts. Expand **HUD Maker → Inspector → Vanilla HUD Guide** to control the default display separately.

![Visible switches for health, food, XP, hotbar and other vanilla HUD parts.](assets/media/guides/drm-031-forge1201/forge-hud-guide.png "DRM 0.3.1 / Forge 1.20.1. These switches currently read Visible. They control Minecraft’s existing HUD; Added HUD Types on the left contains DRM’s additions.")

1. Save [your new HUD](#core/hud-maker) and check that it actually appears.
2. Expand **Vanilla HUD Guide → HUD Guide +**.
3. Turn off the relevant **Visible** switch. Start with **HP Health** to replace hearts alone.
4. Save, activate and inspect the player screen. On the checked Forge 0.3.1 artifact, an activation error means this step did not finish; see [the limitation](#core/hud-maker).

| Label | Default display |
| --- | --- |
| HP Health / AR Armor / FD Food / O2 Air | Hearts, armor, hunger and air |
| XP XP Bar / LV Level | Experience bar and level |
| HB Hotbar / + Crosshair / BB Bossbar | Hotbar, crosshair and boss bar |

Hiding hearts does not create a replacement bar. Leave the original visible while building a replacement that has not yet been checked.

## Supported mod HUDs

**Mod HUD Guide** controls supported providers’ existing displays. A left-side button such as **+ Iron’s Mana** creates a new DRM display. Set whether the old display is visible and where the new display goes separately.

---
title: Installation and Your First Spawn Rule
slug: dochi-spawn-control-setup
order: 820
description: Install dochi spawn control, open the editor, satisfy permissions, and create a first working rule.
product: dochi-spawn-control
category: Setup
section: setup
status: Draft
version: 0.1.0
audience: First-time server operators
tags:
  - installation
  - first rule
  - permissions
---

## Requirements

| Component | Requirement or role |
| --- | --- |
| Minecraft | 1.20.1 |
| Forge | 47 or newer |
| Java | 17 |
| dochi spawn control | Install the same build on client and server |
| DRM Core | Optional, version 0.1.4 or newer; provides shared editor selection and DRM UI integration |
| CustomNPCs | Optional, version 1.20.1 or newer; required for saved-clone spawning |
| Dochi’s Warfare | Optional, version 0.2.5 or newer |

CustomNPCs is not required when you only manage ordinary registered mobs. Clone profiles require CustomNPCs on client and server and a saved server clone with the same tab and name.

## Install

1. Stop the server and all connecting clients.
2. Place `drm_spawn_control-<version>.jar` in both the server and client `mods/` folders.
3. Remove duplicate or older JARs with the same mod ID.
4. Restart the server and client.
5. Check the server log for `dochi spawn control loaded` and any loading errors.

When DRM Core links correctly, the log also reports integrated UI mode and editor registration. If the optional DRM API cannot link, the dedicated key remains available.

## Open the editor

| Route | How to use it |
| --- | --- |
| Dedicated key | Press `K` by default. Change `Open Spawn Control` in Minecraft key settings. |
| DRM editor selector | Open `Spawn Control` when DRM Core and its editor API are available. |

Editing requires permission level 2 or Creative mode. The server rejects open and save requests from players without that permission.

## Create a first rule

Keep native spawning enabled while you test a simple managed rule.

1. Select a target in the left `Entity / Clone Catalog`.
2. Confirm that the middle manager is in `Selected Target` view.
3. If the target has no rule, click `Add Rule`.
4. Give it a clear name and a unique `Profile ID` in the right inspector.
5. Leave Dimensions and Biomes empty at first; empty means unrestricted.
6. Choose a visible test value for `Spawn Chance` and a sensible `Interval Ticks` value.
7. Choose the placement that matches the target. Use `Surface` for land mobs and `Water` for aquatic mobs such as Glow Squid.
8. Enable the rule with its row switch or the bulk `Enable` action.
9. Click `Save` to validate and apply it on the server.
10. Use `Advanced Diagnostics → Check Here` to inspect the current position.

`Spawn One` creates a real managed entity after a confirmation step. Use `Clear Generated` when the test is complete.

## Safely replace native spawning

1. Save the managed rule while `Native: ON` remains selected.
2. Verify conditions and placement with Check Here and a test spawn.
3. Let the managed spawn run long enough to confirm normal behavior.
4. Change to `Native: OFF` and save only when you intend a full replacement.

:::warning Duplicate spawning
If native spawning and an enabled managed profile are both active, both systems can create the same target. The duplicate warning describes that policy combination; it is not a parsing error.
:::

## First CustomNPCs clone rule

1. Save the server clone in CustomNPCs first.
2. Find its tab and name in the clone portion of the catalog.
3. Select the clone and click `Add Rule`.
4. Configure conditions and caps like an ordinary mob profile.
5. Save, then verify the clone preview and diagnostics.

A target preset does not contain the CustomNPCs clone body. Distribute the matching server clone separately when sharing the preset.

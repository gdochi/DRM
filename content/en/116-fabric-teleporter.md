---
title: Teleporter
slug: teleporter
order: 82
description: Create destination sets, bind them to NPCs, and configure the player Teleporter runtime.
product: core-fabric
category: Core Systems
section: teleporter
status: Stable
version: 0.3.1
audience: Creators / Operators
tags:
  - teleporter
  - npc
  - gui
---

## Make a destination back to town

Let players interact with an NPC, choose a destination and travel. Finish one destination before adding access conditions or presentation. These are English screenshots from **DRM 0.3.1 / NeoForge 1.21.1**.

1. Stand at the destination and note its **F3** coordinates. Check the floor and headroom.
2. Right-click the air with the core and open **Teleporter Editor → Create New**.
3. In **Category Settings**, rename **Towns** or use **Add** for a new category. **Display name** names the whole destination list.

![Category Settings for the list display name and the Towns category.](assets/media/guides/drm-031-neo1211/teleporter-editor.png "The middle contains list settings and categories; the right edits the selected category name and icon. Set destination coordinates in Destination Settings next.")

### Name and arrival position

Open **Destination Settings**. Use **Add** or select the sample **Spawn**, then configure **Info** on the right.

| Control | What to enter |
| --- | --- |
| **Name / Description** | A location name and directions players can recognize |
| **Enabled** | Whether this destination is available |
| **Category** | The category prepared above |
| **Position → X / Y / Z** | Arrival coordinates; Y is the player's feet height |
| **Yaw / Pitch** | Facing direction and vertical view angle after arrival |

![The Spawn Info page with its name, description, category, position and rotation.](assets/media/guides/drm-031-neo1211/teleporter-destinations.png "Replace the sample 0.5 / 64 / 0.5 with a safe position in your world. Renaming the destination does not change its coordinates.")

Travel stays **in the current dimension**. Entering Nether coordinates alone does not move the player into the Nether.

### Choose who may use it

Leave conditions empty for the first test. After travel works, configure these separately:

- **Interaction Conditions:** who may open the entire list.
- **Destination Settings → destination → Conditions:** who may use that destination.

For example, everyone can open the list while only players who finished a quest can visit the ruins. **Category Settings → Locked destination presentation** controls whether locked entries appear dimmed, hidden or otherwise styled. It does not grant access.

![Interaction Conditions with Enabled, Mode AND and Add.](assets/media/guides/drm-031-neo1211/teleporter-conditions.png "Use Add to configure a condition and check Enabled. This screenshot is the initial state with no conditions.")

### Screen transitions and sounds

In **Travel Presentation**, **Fade out / Fade in** set the darkening and return durations in ticks. At normal speed, 20 ticks equal one second; the shown value of 10 is about half a second each. Choose **Departure sound / Arrival sound** with the search buttons and audition them with Play.

![Travel Presentation with fade durations and separate departure and arrival sounds.](assets/media/guides/drm-031-neo1211/teleporter-presentation.png "Choose each sound separately. If a destination also runs commands, configure their timing in its Commands tab.")

## Save and connect the NPC

1. **Save As** a new name such as `guide_travel`. The editor adds the extension and saves `guide_travel.json`.
2. Right-click a **DNPC or CustomNPCs NPC** with the core.
3. In **NPC Apply**, choose **Teleporter JSON** on the left and your file in the middle. Use **Refresh** if needed.
4. Click **Apply Teleporter** and check the applied list on the right.
5. Interact with both hands empty, select a destination and travel. Check opening the list, arrival coordinates and facing separately.

![The player teleporter shows Village gate after applying the set to the NPC.](assets/media/guides/drm-031-neo1211/teleporter-npc-player.png "Select a destination in the middle, then press Travel at the lower right. This example leaves the large image region empty.")

![After Travel, the player arrives at the preplaced oak entrance.](assets/media/guides/drm-031-neo1211/teleporter-arrived.png "The server confirmed arrival at the saved X 20.5 / Y -60 / Z 0.5. The floor and oak posts were prepared in the capture world to identify the arrival point. Use your own destination coordinates.")

Use **Remove Teleporter** on that NPC to remove the connection. Apply again when switching to a file saved under another name.

To open it from a regular dialogue choice, add **go_teleporter** in [Choice actions](#core-fabric/dialogue-system). Choose **bound** for this NPC's applied list or select a saved file for another list.

## Layout and saved files

Edit destinations and conditions here; edit list placement, artwork and buttons in [GUI Maker](#core-fabric/gui-system). The connection is **Category Settings → GUI JSON / Open GUI Maker**. Keep a destination list, travel button and close button in the custom layout.

Sets are saved in `config/dochi_rpg_maker/teleporters/`. `default_teleporter_set.json` and `gui/default_teleporter_gui.json` are starting templates. Keep your work separately with **Save As**.

For a missing destination, check Enabled, category, search text and conditions. If the list opens but travel is rejected, check distance to the NPC and changed conditions, then interact again to reopen it.

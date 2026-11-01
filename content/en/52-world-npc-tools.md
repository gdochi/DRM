---
title: Factions, Teleporters, And Popups
slug: world-npc-tools
order: 120
description: Configure faction presentation, destination flows, and reusable runtime popups.
product: core
category: World And NPC Tools
section: world-tools
status: Stable
version: 0.3.1
audience: World and NPC creators
tags:
  - faction
  - teleporter
  - popup
---

## Show faction relationships to players

**Faction Editor** controls how CustomNPCs factions appear in DRM. CustomNPCs owns the faction IDs and actual player points. Create DNPC relationship groups separately in the [DNPC editor](#dochi-npc-core/npc-core-editor).

![Faction Editor relationship names, colors, descriptions and Sample points preview.](assets/media/guides/drm-031-forge1201/registry-faction.png "DRM 0.3.1 / Forge 1.20.1. Statuses styles the relationship labels. Sample points previews a value; it does not change a player’s actual reputation.")

1. In **Statuses**, set the names, colors and descriptions of Unfriendly, Neutral and Friendly.
2. In **Manage Factions**, check that CustomNPCs is installed and its faction catalog is available.
3. Set order, categories, names, icons and banners in **Presentation**, and the player layout in **Runtime Screen**.
4. Save and open **J** to check the player list and points.

Presentation is saved in `config/dochi_rpg_maker/factions/settings.json`. Check this editor for incorrect labels or colors; check the original faction and point-granting conditions/actions for an incorrect score.

## Give an NPC a destination list

Use **Teleporter Editor** to create destinations and apply the set to an NPC. Travel stays **in the current dimension**.

![Teleporter Editor Spawn destination with arrival coordinates.](assets/media/guides/drm-031-forge1201/teleporter-destinations.png "DRM 0.3.1 / Forge 1.20.1. Destination Settings → Info contains X/Y/Z. Replace sample 0.5 / 64 / 0.5 with a safe position in your world.")

1. Create the list name and categories in **Category Settings**.
2. Use **Destination Settings → Add**, then set name, description, X/Y/Z and Yaw/Pitch.
3. Add access rules in the destination’s **Conditions** and commands before/after arrival in **Commands**. Forge also exposes destination **Effects**.
4. Set fade durations and departure/arrival sounds in **Travel Presentation**.
5. **Save As** a new name such as `town_network`. Open the NPC with the core and choose **Teleporter JSON → your file → Apply Teleporter**.
6. Interact with both hands empty, select the destination and click **Travel**. Check arrival position and facing.

Sets are saved in `config/dochi_rpg_maker/teleporters/`. **bound** in the `Go Teleporter` dialogue action opens this NPC’s applied set. To customize the layout, copy it in GUI Maker and connect it through the set’s **GUI JSON**.

## Display an area title or quest notification

Set temporary text and timing in **Popup Maker**. Design placement and artwork in the Popup layout of [GUI Maker](#core/gui-system).

![Popup Maker content, fade/hold timings, channel and opening sound.](assets/media/guides/drm-031-forge1201/popup-maker.png "DRM 0.3.1 / Forge 1.20.1. The lower middle panel is a preview. Fade In 10 / Hold 80 / Fade Out 20 totals 5.5 seconds at normal speed.")

1. Write **Title / Subtitle / Text**.
2. Set **Fade In / Hold / Fade Out** durations in ticks; 20 ticks equal one second.
3. Choose how overlapping notifications behave on the same **Channel**, and set **Priority** where needed.
4. Choose **Opening Sound** and audition it with Play.
5. **Save As** your popup and test actual display through a `/drm popup` command or dialogue action.

Definitions are saved in `popups/definitions/`, policies in `popups/policies/`. Copy default files with Save As. If notices pile up, check channel conflicts together with simultaneous-display and queue limits in the policy.


## Display the saved popup with a command

Set **ID** to `village_entry` and **Title** to `Village Gate`, then choose **Save As → village_entry → Save As**. Close the editor and run this as a player with management permission:

```mcfunction
/drm popup show @s village_entry
```

![Popup Maker saved as village_entry with the Village Gate title.](assets/media/guides/drm-031-forge1201/popup-village-save.png "DRM 0.3.1 / Forge 1.20.1. Check Saved: village_entry.json and the title. The lower middle panel is the editor preview.")

![The saved popup displayed in the actual game.](assets/media/guides/drm-031-forge1201/popup-village-runtime.png "DRM 0.3.1 / Forge 1.20.1. This is the file displayed with the command above. Entering a village does not trigger it automatically until region detection is connected separately.")

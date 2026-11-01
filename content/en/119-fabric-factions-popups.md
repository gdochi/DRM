---
title: Factions And Popups
slug: factions-popups
order: 120
description: CustomNPCs faction presentation and reusable on-screen popups.
product: core-fabric
category: World And NPC Tools
section: world-tools
status: Stable
version: 0.3.1
audience: World and NPC creators
tags:
  - faction
  - popup
---

## Change faction state names and colors

**Faction Editor** controls how supported CustomNPCs factions appear in DRM. CustomNPCs owns the faction IDs and player scores. Configure DNPC relationship groups separately in the [DNPC editor](#dochi-npc-core/npc-core-editor). These captures show **DRM 0.3.1 / NeoForge 1.21.1**.

![Statuses and Sample points in Faction Editor.](assets/media/guides/drm-031-neo1211/faction-editor.png "Select Unfriendly, Neutral or Friendly and edit its name, color and relationship description. Sample points 850 tests the display; it does not grant reputation to a player.")

1. Select a relationship under **Statuses**.
2. Set **Display name / Color / Relationship description** on the right.
3. Change **Sample points** to inspect the result at different scores.
4. Check that the original factions are available in **Manage Factions**.
5. Use **Presentation** for order, categories and icons; use **Runtime Screen** for the player interface.
6. Save and inspect the player list with the default **J** key.

Presentation is stored in `config/dochi_rpg_maker/factions/settings.json`. For incorrect scores, check the original faction and score-granting behavior before editing presentation. This CustomNPCs workflow does not apply to [Minecraft 26.3 and later](#core-fabric/minecraft-26-3).

## Save a popup and display it in the world

This example briefly displays **Village Gate**. Region detection needs a separate trigger; this exercise displays the saved popup with a command.

![Popup Maker saved as village_entry with the Village Gate title.](assets/media/guides/drm-031-neo1211/popup-village-save.png "Check ID on the left and Saved: village_entry.json at the bottom. The lower middle panel is the editor preview. Fade In 10 / Hold 80 / Fade Out 20 ticks gives a total of 5.5 seconds at normal speed.")

1. Open **Popup Maker** from the Core and set **ID** to `village_entry`.
2. Enter `Village Gate` in **Title** and your description in **Text**. Add a **Subtitle** if needed.
3. Set **Fade In / Hold / Fade Out**. At normal speed, 20 ticks is one second.
4. Choose **Channel** and **Conflict** for overlapping notices. The example's `replace` replaces the previous notice in that channel.
5. Optionally select **Opening Sound** and listen with the play button.
6. Choose **Save As → village_entry → Save As** to save your own copy.
7. Close the editor and run this command as a player with management permission:

```mcfunction
/drm popup show @s village_entry
```

![The saved Village Gate popup displayed in the actual game.](assets/media/guides/drm-031-neo1211/popup-village-runtime.png "Shown with /drm popup show @s village_entry using the definition saved above. @s targets the executing player. This does not automatically bind it to a region or NPC.")

Change text, timing and channel in **Popup Maker**. Change position, background and artwork in [GUI Maker](#core-fabric/gui-system)'s Popup GUI. Assign a copied layout in the popup's **GUI JSON** field.

| File to transfer | Location |
| --- | --- |
| Text, timing and channel | `config/dochi_rpg_maker/popups/definitions/village_entry.json` |
| Screen layout | The assigned GUI under `config/dochi_rpg_maker/gui/` |
| Operational display and duration limits | `config/dochi_rpg_maker/popups/policies/` |

If nothing appears, check the saved ID, Enabled and GUI file. If notices queue or replace one another, inspect Conflict for the same Channel and the policy's active/queued limits.

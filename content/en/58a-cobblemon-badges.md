---
title: Create and Award Badges and Trophies
slug: cobblemon-badges
order: 580
product: drm-cobblemon-editor
section: trainer
category: Badges and Trophies
status: Usage guide
version: Fabric / NeoForge 0.2.9
description: Save a badge set, award a badge and check it in the player collection.
---

## Enable badges
Included in Cobblemon Editor **0.2.9 / Fabric·NeoForge 1.21.1**. In DRM settings, enable **Badges → Enable badges**. Only server operators can change this; it defaults to OFF in a new world. Once enabled, bind **Badge Case** in Controls or open the collection with **/badges**.

## Follow the first badge video
The video starts with a copy of the sample set. It renames the set to **Meadow League**, the selected badge to **Meadow Badge**, and saves to the real server.

![Rename the sample set and badge, then save the catalog.](assets/media/guides/cobble-release-20261109/badge-create.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, English UI. Real editor input and server saving. Badges were enabled before recording.")

1. Open DRM **Add-on → Badge Editor**, or use the operator command **/badges edit**.
2. Choose a sample with **Select Set** and make your own with **Save Set As Copy**. This creates a set with new IDs rather than asking for a filename.
3. In **Basic**, change **Set Name** to **Meadow League** and the badge **Name** to **Meadow Badge**. Use **Add Count → Add** for more entries.
4. Choose **Badge** or **Trophy**. Use the finder beside **Front Texture** to select a DRM asset. An empty back texture reuses the front.
5. Check the description and **Enabled**, then press **Save**. Renaming preserves identity; copying or creating makes different IDs.

## Award and check the collection
Run these commands with operator permission level 2 or higher. The last argument is the badge name; Tab suggests names and IDs. Use a unique ID if names are duplicated.

```mcfunction
/drm badge give @s Meadow Badge
/badges
/drm badge take @s Meadow Badge
```

For trophies, use **/drm trophy give** and **/drm trophy take**. Select **Meadow League** in the collection using the set selector. Giving an already owned badge does not increase its ownership count.

![The saved Meadow League badge definitions in the editor.](assets/media/guides/cobble-release-20261109/badge-editor-saved.png "This editor screen confirms the saved definition. Check player ownership separately with /badges.")

## Connect trainer rewards, dialogue and quests
In **Battle Config → After Actions**, add **Badge** or **Trophy** and find the saved entry. Restrict the result to victory for a victory badge. To award after dialogue, put the dialogue first in **Sequential** mode.

Dialogue grant/removal actions also have searchable badge and trophy targets. **Badge owned / Trophy owned** checks ownership; **Badge count** counts badges in a selected set; **Badge set complete** checks all required badges. Trophies do not count as badges. Choose completion requirements with **Required for Completion**. A set with no required badges does not pass the completion condition.

For a quest, select the badge acquisition objective and its target. Giving an already owned badge is not a new acquisition event. See [post-battle actions](#drm-cobblemon-editor/cobblemon-conditions-rewards-pokemon).

## Presentations and saved data
Configure acquisition notices and selection animations in [badge presentations and collection GUI](#drm-cobblemon-editor/cobblemon-badge-presentations).

Definitions live in **config/dochi_rpg_maker/cobblemon/badges/catalog.json**; the world switch lives in **serverconfig/cobble_npc/badges.json**. Ownership is separate world player data. Copying definitions does not transfer ownership. Back up definitions, presentations, textures and player data together. If deleting a referenced badge is rejected, update its reward and condition references first.

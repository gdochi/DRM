---
title: Reuse Trainers with Clone Library
slug: cobblemon-clone-library-spawner
order: 560
description: Save an applied trainer as a clone and connect it to a Core NPC Spawner.
product: drm-cobblemon-editor
category: Clones and Spawners
section: world-tools
status: Usage guide
version: Fabric / NeoForge 0.2.9
audience: Creators reusing battle NPCs
tags:
  - clone-library
  - npc-spawner
---

## Save a finished trainer for reuse

**Clone Library** saves an NPC that already has a Trainer or Pokemon Itself role. Choose that clone as a source in **DRM Core NPC Spawner**. DNPC’s own Save As templates use a different format; use [Spawn Control](#dochi-spawn-control/spawn-control-npc-templates) for those templates.

The following save-and-apply flow was checked with **Cobblemon Editor 0.2.9, DRM 0.3.1 and DNPC 0.1.3 on NeoForge 1.21.1**.

1. Build a party in [Trainer Editor](#drm-cobblemon-editor/cobblemon-trainer-editor) and **Save As** your own file.
2. Open the NPC with the DRM Core. Choose **vs Trainer → your file → Apply vs Trainer**. Check the file name under **APPLIED JSON** on the right.
3. Open **Clone Library** for that NPC and choose **Save As**.
4. Enable **Follow applied JSON source** if new clones should follow edits to the original file. Check the name and press **Confirm**.
5. Find the NPC under **Saved Clones**. Select its row for details and **Test Spawn**.

![NPC Apply with guide_trainer connected under vs Trainer.](assets/media/guides/cobble-029-neo1211-flow/cobble-trainer-applied.png "vs Trainer on the left selects a category; Apply vs Trainer at the bottom performs the binding. The server acknowledged custom/guide_trainer.json and the file name appeared on the right.")

![Saved Oakridge guide trainer in Clone Library.](assets/media/guides/cobble-029-neo1211-flow/cobble-clone-library.png "The server returned Saved clone: trainer/guide_trainer_clone and created its file. The stored entityType is dochi_npc:npc and bindingPolicy is follow_source. This shows clone saving, not a completed spawner run.")

## Choose how edits affect clones

| Setting | Use it when |
| --- | --- |
| **Follow applied JSON source** enabled | Newly created NPCs should read changes to the applied source file |
| Disabled: **Snapshot** | The saved NPC should keep its captured content without following later source edits |

Saving an existing clone ID requires overwrite confirmation. Before deleting a clone, check which spawners use its ID; those entries cannot spawn after their source is removed.

The **Filled Soul Stones** tab imports legacy CustomNPCs sources through that provider on supported older Minecraft targets. It is separate from saving a DNPC target.

## Connect a Core NPC Spawner

1. Place `dochi_rpg_maker:npc_spawner`.
2. Hold the DRM Core item, `dochi_rpg_maker:dialogue_editor`, and right-click the block.
3. In **Source**, add one saved clone.
4. In **Spawn**, begin with **Wave size 1** and **Max active 1**, then **Save** to the block.
5. Test target detection in Survival: Creative and Spectator players are excluded.

![Core NPC Spawner timing and quantity settings.](assets/media/guides/drm-031-neo1211/core-npc-spawner-rules.png "Mode selects the trigger, Cooldown the interval, Max active the living limit and Wave size the count per activation. This separate capture has Assigned sources 0 and shows settings only; it does not establish that the saved clone was spawned.")

Use the Core block for new placements. The old addon block `cobble_npc:clone_spawner` remains for existing-world compatibility. This is a fixed block spawner; biome and chunk generation belong to a separate natural-spawn system.

### Trigger and quantity reference

| Setting | Choices / range |
| --- | --- |
| Mode | Continuous, Target Nearby, Target Enter, Redstone Pulse |
| Cooldown | 20–72,000 ticks |
| Max Active / Wave Size | 1–32 each |
| Target Radius | 1–64 blocks |
| Offset | −32–32 blocks per axis |
| Random Radius | 0–32 blocks |
| Source pool | Up to 64 clones; each weight 1–10,000 |
| Conditions | Up to 32 server-checked rules |

Weights influence random selection for each spawn slot; they do not define a fixed sequence. **Require Target**, **Remove Inactive** and redstone Ignore/Powered/Unpowered control when the block may operate. **Effects** changes spawn particles and the block’s appearance; the NPC’s appearance comes from its clone.

## Keep the required files together

| Folder | Contents |
| --- | --- |
| `config/dochi_rpg_maker/npc_spawner/entity_clones/` | Core clone storage |
| `config/dochi_rpg_maker/cobblemon/entity_clones/` | Cobblemon Clone Library compatibility storage |

Current Core reads both locations. Avoid duplicate IDs and keep the source `cobblemon/trainers/` and `pokemon_itself/` files with follow-source clones. Preserve the world as well when moving installed spawners.

## Check battle cleanup before adding waves

Cobblemon Editor registers battle-aware cleanup with Core. An NPC reserved for battle is not immediately removed by **Remove Inactive** or wave cleanup; removal waits until the reservation ends.

Start with one clone. Confirm its appearance and battle role with **Test Spawn**, then test the installed spawner, leaving its detection area during a battle, cleanup afterward and a server restart. Check weighted distributions over repeated activations rather than judging a single result.

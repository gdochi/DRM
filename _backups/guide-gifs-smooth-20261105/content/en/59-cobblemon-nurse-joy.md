---
title: Link Nurse Joy to a Healing Machine
slug: cobblemon-nurse-joy
order: 550
description: Write a healing greeting, apply the NPC role and connect its Cobblemon healing machine.
product: drm-cobblemon-editor
category: Service NPCs
section: services
status: Draft
version: Fabric / NeoForge 0.2.9
audience: NPC creators and server operators
tags:
  - nurse-joy
  - healer
  - dialogue
---

## Make an NPC that heals the party

After a player asks for treatment, the NPC walks to its linked Cobblemon healing machine, heals the party and returns. Apply the role to a DNPC or CustomNPCs NPC on **Minecraft 1.21.1, Fabric or NeoForge**.

![Nurse Joy name, distance, dialogue and treatment/close labels.](assets/media/guides/cobble-029-neo1211/cobble-nurse.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, English UI. No NPC is selected here; save and apply the profile before linking a machine.")

1. Open **Nurse Joy Editor → Use Default** from DRM’s editor list.
2. Set **Display Name** so you can recognize this profile.
3. Write the greeting under **Dialogue Text** and the two choices under **Treatment Choice Text / Close Choice Text**.
4. **Save As** a user file such as `custom/village_healer.json`.
5. Open the intended NPC with the DRM Core and **Apply** that file to **Nurse Joy**.
6. Link a machine using the steps below. Saving the profile does not link a machine.

The treatment and close actions have fixed behavior and order. Renaming a choice does not turn it into a reward button. Use [DRM dialogue](#core-fabric/dialogue-system) for general branches or rewards.

![User path and Saved status after Save As.](assets/media/guides/cobble-029-neo1211/cobble-nurse-save.png "The example path saved through Save As. Creating the file and applying the NPC role are separate steps.")

## Link the healing machine

![A Nurse Joy skin, role application, machine linking and treatment followed by the NPC returning home.](assets/media/guides/short-gifs-20261105/nurse-joy-treatment.gif "Captured in game: Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 / NeoForge 1.21.1, English UI. Bulbasaur recovered from 1 to its full 19 HP and the NPC returned to her starting position.")

The recording uses [AcidFlounder391's Nurse Joy skin](https://www.minecraftskins.com/skin/22531361/nurse-joy/).

1. In the applied NPC’s editor, choose **Link Healing Machine**.
2. Within **60 seconds**, **Shift+right-click** a Cobblemon healing machine in the same dimension.
3. Keep it within **Max Distance**, from 1 to 16 blocks; this example uses 16.
4. Leave safe ground and space beside the machine for the NPC to stand and return.
5. Interact with the NPC with both hands empty and choose treatment.

A linked machine is used through Nurse Joy. Keep a separate machine for direct public use. Two Nurse Joy NPCs cannot own the same machine; breaking it removes the link.

## Update dialogue or change machines

**Save to the same referenced file** to update wording or distance for the next interaction. Apply again after saving under a different name. Machine links belong to individual NPCs: applying one shared profile does not share its machine link.

| Problem | Check |
| --- | --- |
| Another dialogue or shop opens | Use empty-hand **Shift+right-click** to access Nurse Joy. |
| Link request expired | Choose Link Healing Machine again and link within 60 seconds. |
| NPC cannot reach the machine | Same dimension, allowed distance, safe ground and a free adjacent space. |
| Treatment will not start | Player within 12 blocks, no active battle, and a charged/usable machine. Wait for any treatment already in progress. |
| Old wording remains | Save to the path actually applied to the NPC. |

Profiles are under `config/dochi_rpg_maker/cobblemon/nurse_joy/`. Keep the world too when moving a server: the NPC’s machine link is world data.

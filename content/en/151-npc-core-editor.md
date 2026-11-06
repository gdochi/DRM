---
title: Appearance, Equipment and Jobs
slug: npc-core-editor
order: 1510
description: Dress your NPC and choose its tools, workplace and routine.
product: dochi-npc-core
category: NPCs, schedules and employment
section: editor
status: Guide
version: 0.1.3
audience: Creators / server operators
---

## Change appearance and equipment

Right-click an NPC with the Core. Choose its name, skin, proportions and equipment, then save. Installed models add appearance choices; Gecko models need GeckoLib.

![DNPC's Identity screen, with categories on the left, an NPC preview in the middle, and name and title fields on the right.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "DNPC 0.1.3 / NeoForge 1.21.1, English UI. Select Identity → Information, edit Name on the right and Save to NPC at the top. Style changes the appearance of name and title text.")

### Change The Skin And Size

Select **Appearance & Model**. With **Humanoid**, use the finder beside **Skin**, change **Scale** for overall size, and choose **Slim arms** if needed. Use **Part scales** for individual body proportions and **Hitbox** for collision dimensions.

![DNPC 0.1.2 on NeoForge 1.21.1, showing Appearance & Model with Humanoid, Skin, Scale and Slim arms.](assets/media/guides/dnpc-012-neo1211/dnpc-appearance.png "Check appearance in the middle preview. Scale changes the model's overall size, rather than its workplace or attack range.")

![Change Scale to 1.15, save the NPC and check the result in the world.](assets/media/guides/short-videos-20261106/npc-appearance.mp4 "DNPC 0.1.3 / NeoForge 1.21.1, English UI. Appearance & Model → Scale → Save to NPC.")

Use the poser to make poses and join them into animations. For randomized equipment, choose candidates and chances for each slot.

### Find the weapon and ammunition slots

Equip armor under **Inventory & Equipment → Equipment**, using **Head / Chest / Legs / Feet**. Armor stored in **NPC storage** is not equipped armor.

![DNPC Inventory & Equipment with NPC storage and Player inventory in the middle and armor slots on the right.](assets/media/guides/dnpc-012-neo1211/dnpc-inventory.png "DNPC 0.1.2 / NeoForge 1.21.1. Separate stored items from equipped armor. See Real Armor for additional armor behavior.")

Select **Weapon & ammunition** on the left. **Idle hands** sets what the NPC holds outside combat; **Combat hands** sets what it holds during combat. Choose its ranged weapon and ammo in **Ranged weapon** and **Ammunition**.

![DNPC's Weapon & ammunition screen. The Weapons tab on the right shows idle and combat hand slots, a ranged weapon slot, and an ammunition slot.](assets/media/guides/dnpc-013-neo1211/dnpc-weapons.png "DNPC 0.1.3 / NeoForge 1.21.1, English UI. Use the slots in the Weapons tab. NPC storage in the middle is the inventory, separate from the hand and weapon slots on the right.")

## Give the NPC a job

1. Add working hours under **Schedule** on the left.
2. Choose mining, farming, lumbering, collecting, transport or another job.
3. Set its workplace/range, tools and input/output storage.
4. Supply the needed tools and items, then save.

If the NPC does not work, check the active hours, tools and walkable routes to the workplace and storage. Mining filters let you choose blocks or tags.

See [schedules](#dochi-npc-core/npc-core-schedules) for hours and [cooking](#dochi-npc-core/npc-core-cooking) for food production.

### Watch a hauling job

This runtime example uses a prepared transport job: the NPC collects 32 wheat from the left chest, carries it to the right chest and returns. Set a walkable work origin beside the input chest and keep the route to the output chest clear.

![An NPC carries wheat between two chests and returns to the input.](assets/media/guides/runtime-videos-20261106/npc-haul.mp4 "DNPC 0.1.3 / NeoForge 1.21.1, English UI. Runtime result of a saved job; the editor setup is described above.")

## Make a stationary guide

![DNPC's Movement AI screen, with Lock position and Lock rotation switches near the bottom right.](assets/media/guides/dnpc-013-neo1211/dnpc-movement.png "DNPC 0.1.3 / NeoForge 1.21.1, English UI. Select Movement AI on the left. Lock position fixes the NPC's location; Lock rotation fixes its facing direction.")

Enable **Movement AI → Lock position** to keep the NPC in place. **Lock rotation** separately fixes its body/head direction and overrides looking at nearby players.

**Combat AI → Invulnerable** blocks all damage. Disable **Allow player damage** to block only damage caused by players.

![DNPC 0.1.2 on NeoForge 1.21.1, showing Combat AI with health, melee damage, attack interval, Invulnerable and Allow player damage.](assets/media/guides/dnpc-012-neo1211/dnpc-combat.png "Invulnerable blocks all damage. Allow player damage separately controls damage caused by players.")

Compatible Cobblemon trainers can still perform their configured dash/return while locked, then return to position.

## Let players hire NPCs

This feature needs **DRM**.

1. Finish and save the worker's appearance, equipment and jobs.
2. Create a recruitment entry in DRM's **employment editor**.
3. Choose the NPC, starting location, price, duration and jobs the employer may edit.
4. Apply it to the recruiting NPC through **NPC Apply → Function → NPC employment**.
5. Players talk to the recruiter to hire. Default **H → My employment** provides stop, return, renew, dismiss and cargo collection.

An expired NPC remains available until its remaining cargo is collected.

### Choose The Worker And Contract

These are the **DNPC 0.1.2 + DRM 0.3.1 / NeoForge 1.21.1** employment screens. In **NPC**, use the finder beside **Prepared NPC JSON set** to choose a [saved NPC template](#dochi-npc-core/npc-core-templates). Select your worker in place of **Default NPC** to use its appearance and prepared jobs in the offer.

![Employment Editor's NPC tab with Prepared NPC JSON set, NPC display name and the hire switch.](assets/media/guides/dnpc-012-neo1211/employment-npc.png "Select the NPC being hired here, rather than the recruiter's dialogue or shop.")

Set payment, cost and duration under **Contract**. This example uses ten emeralds, **20 Minutes** and **Real Ticks**. Real Ticks follows running server ticks; World Ticks follows world time, including sleep and time commands.

![Contract with an emerald cost of ten, a twenty-minute period, Real Ticks and Renew contract.](assets/media/guides/dnpc-012-neo1211/employment-contract.png "Read Period unit and Duration clock along with the number. Renew contract controls whether renewal is allowed.")

**Allowed Work** controls which roles the employer may assign. A switch does not create a new job that the prepared NPC does not support.

## Make a musician

With **Immersive Melodies** on 1.20.1 / 1.21.1, add an instrument performance to the schedule. Choose a song, instrument and location.

**Use equipped instrument only** needs an actual equipped instrument. **Provide a temporary instrument if missing** shows one during the performance. Temporary instruments do not become death drops.

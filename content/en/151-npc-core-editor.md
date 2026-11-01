---
title: Appearance, Equipment and Jobs
slug: npc-core-editor
order: 1510
description: Dress your NPC and choose its tools, workplace and routine.
product: dochi-npc-core
category: NPCs, schedules and employment
section: editor
status: Guide
version: 0.1.2
audience: Creators / server operators
---

## Change appearance and equipment

Right-click an NPC with the Core. Choose its name, skin, proportions and equipment, then save. Installed models add appearance choices; Gecko models need GeckoLib.

Use the poser to make poses and join them into animations. For randomized equipment, choose candidates and chances for each slot.

## Give the NPC a job

1. Add working hours in **Daycycle**.
2. Choose mining, farming, lumbering, collecting, transport or another job.
3. Set its workplace/range, tools and input/output storage.
4. Supply the needed tools and items, then save.

If the NPC does not work, check the active hours, tools and walkable routes to the workplace and storage. Mining filters let you choose blocks or tags.

See [schedules](#dochi-npc-core/npc-core-schedules) for hours and [cooking](#dochi-npc-core/npc-core-cooking) for food production.

## Make a stationary guide

Enable **Movement AI → Position lock** to keep the NPC in place. Rotation locking separately fixes its body/head direction and overrides looking at nearby players.

**Combat AI → Invulnerable** blocks all damage. Disable **Allow player damage** to block only damage caused by players.

Compatible Cobblemon trainers can still perform their configured dash/return while locked, then return to position.

## Let players hire NPCs

This feature needs **DRM**.

1. Finish and save the worker's appearance, equipment and jobs.
2. Create a recruitment entry in DRM's **employment editor**.
3. Choose the NPC, starting location, price, duration and jobs the employer may edit.
4. Apply it to the recruiting NPC through **NPC Apply → Function → NPC employment**.
5. Players talk to the recruiter to hire. Default **H → My employment** provides stop, return, renew, dismiss and cargo collection.

An expired NPC remains available until its remaining cargo is collected.

## Make a musician

With **Immersive Melodies** on 1.20.1 / 1.21.1, add an instrument performance to the schedule. Choose a song, instrument and location.

**Use equipped instrument only** needs an actual equipped instrument. **Provide a temporary instrument if missing** shows one during the performance. Temporary instruments do not become death drops.

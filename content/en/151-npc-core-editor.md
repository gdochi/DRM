---
title: NPCs, schedules and employment
slug: npc-core-editor
order: 1510
description: NPCs, schedules and employment
product: dochi-npc-core
category: NPCs, schedules and employment
section: editor
status: Guide
version: 0.1.2
audience: Creators / server operators
---

## Updated job workflows

See [schedules](#dochi-npc-core/npc-core-schedules) for action search, general/military duty, riding and scheduled shops, and [cooking](#dochi-npc-core/npc-core-cooking) for tools, ingredients, fuel and optional addons. Immersive Melodies patches correct song selection and resumption.

## Appearance and equipment

Choose Steve/Alex, a Gecko model or a supported installed entity’s visual model. Skin sources include resources, server PNGs, URLs and supported player-skin lookup. Configure nameplates, bossbars, body proportions, equipment and death drops separately.

The poser handles keyframes, interpolation, loops and contextual pose mappings. Per-slot weighted equipment pools are creator settings, separate from transactions with a player’s real inventory.

## Schedules and work

1. Add time ranges and actions in the day cycle.
2. Select a job, location, area and target filters.
3. Prepare tools, carried-item storage and destination containers.
4. Test mining, farming, lumber, gathering, hauling, hunting, patrol or follow behavior at the scheduled time.

Mining filters use block IDs and `#tags` with include/exclude modes. Tools, `mobGriefing` policy, path access and destination capacity affect real work. A work animation alone does not mean items were produced or delivered.

Residence, sleep and Rest behavior belong to schedules. When an external combat integration leases AI control, that integration’s ownership rules apply.

## Recruitment NPCs and employment

This workflow needs DRM payment, time and Function APIs.

1. Save a complete DNPC set with its work, appearance and equipment.
2. Open the employment editor from DRM and create recruitment JSON.
3. Configure each entry’s DNPC set, start location, price, duration, allowed work and employer permissions.
4. Apply the JSON to a recruitment DNPC through **NPC Apply → Function → NPC Employment**. Saving a file alone does not bind it.
5. Players interact with that NPC, review the price and location, and hire.
6. Use **My Employment**, default `H`, to manage work, pause, return, renewal, dismissal and cargo recovery.

Employer controls do not grant operator NPC-editor permissions. An ended contract retains its NPC until remaining real cargo is recovered. Editing recruitment JSON does not retroactively change existing contract snapshots.

## Position, rotation and damage controls

Movement AI's **Position lock** keeps the saved current position and blocks wandering, gravity, pushing, knockback and sleep/riding movement. Compatible trainer dash/return can temporarily permit movement and restore the lock afterward. Rotation locking is independent. Body/head yaw support -180.0 to 180.0 degrees and head pitch -90.0 to 90.0, with one decimal place. Locked rotation overrides automatic looking.

Combat AI's **Invulnerable** blocks Creative attacks too. With it off, disabling **Allow player damage** still blocks player melee and player-caused projectiles/explosions. Save and test the actual NPC. Idle nearby-player looking remains below work, combat, interaction and sleep priorities.

## Schedule times and names

Start/end values use daily ticks `0–23999`: `0=06:00`, `6000=12:00`, `12000=18:00` and `18000=00:00`. The **✓** beside the slot name updates the list from the form. Finish the normal Save workflow to persist the NPC.

## Instrument performance — 1.20.1 / 1.21.1

With optional **Immersive Melodies**, schedule an instrument performance. **Use equipped instrument only** needs an actual instrument in the chosen hand. **Provide a temporary instrument if missing** displays the selected instrument only during performance, preferring real equipped instruments. The picker shows instruments only and does not take player items.

Ending the song/schedule, interaction, editing or death clears temporary visuals and sound. Temporary instruments are not saved as equipment or dropped. Evidence uses Immersive Melodies 0.8.0 on the older three targets; it does not establish 26.3 instrument integration.

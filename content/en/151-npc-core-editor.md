---
title: NPCs, schedules and employment
slug: npc-core-editor
order: 1510
description: NPCs, schedules and employment
product: dochi-npc-core
category: NPCs, schedules and employment
section: editor
status: Guide
version: 0.1.0
audience: Creators / server operators
---

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

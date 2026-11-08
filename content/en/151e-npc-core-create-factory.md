---
title: Create Factory Processing and Material Orders
slug: npc-core-create-factory
order: 1516
description: Connect four inventory roles, choose batch quantities and order missing stock through native Create logistics.
product: dochi-npc-core
category: Create integration
section: editor
status: Guide
version: 0.1.3
audience: Creators / server operators
---

## Start with a working machine

**Factory Process** supplies a real machine and collects its real result. First verify the recipe manually. Create owns power, shaft direction, stress, heat, fluids and processing. The example is **Iron Ingot → Mechanical Press + Depot → Iron Sheet**; its Creative Motor is an example power source.

Read [Create setup](#dochi-npc-core/npc-core-create-start) and [parcel delivery](#dochi-npc-core/npc-core-create-logistics). Recordings use DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1 and are silent.

## Four inventory roles

| Field | Role | Press example |
| --- | --- | --- |
| Source inventory | Withdraw raw batch materials | Left barrel |
| Machine input inventory | Insert materials into the machine | Depot under press |
| Finished output inventory | Collect the machine's actual finished items | Same Depot |
| Finished items inventory | Deliver collected goods | Right barrel |

Input and machine result can share the same Depot. Source must differ from machine input, and final destination must differ from the machine result storage. Opposite double-chest halves are one inventory. Begin with two barrels and one Depot.

## Configure Factory Process

1. Add **Schedule → shift + → Create → Factory Process**.
2. Assign the four positions with **🔍**. Check native insertion/extraction sides and filters.
3. Choose **Material item** and **Material quantity**. **Add material** supports up to **8 distinct items**, each **1–64** per batch.
4. Choose **Finished item** and **Finished quantity per batch** according to the real recipe.
5. Initially leave **Order missing materials automatically** off and manually stock the source.
6. Enable **Repeat throughout shift**, or turn it off and choose a finite **Batch size**. Here that means the number of batches.
7. Set **Processing timeout in ticks / Work interval (ticks)**, enable the schedule and save.

![Setting two iron ingots and two finished sheets per batch and saving the prepared machine setup.](assets/media/guides/create-tutorials-20261108/create-factory-settings.mp4 "Positions and item types are prepared. The runtime example below instead uses two batches of one item each.")

## Batch quantities

| Settings | Per batch | Finite total |
| --- | --- | --- |
| Material 1, result 1, Batch size 2 | 1 ingot → 1 sheet | 2 ingots → 2 sheets |
| Material 2, result 2, Batch size 3 | 2 ingots → 2 sheets | 6 ingots → 6 sheets |

These totals assume a guaranteed 1:1 recipe. Chance outputs can leave the NPC waiting for an unattainable configured result. **Raw and finished item IDs must differ** so input cannot be mistaken for completed work.

## Gather, insert, wait, deliver

![Two batches: fetch iron, insert into the Depot, wait for the real press and deliver sheets.](assets/media/guides/create-tutorials-20261108/create-factory-process.mp4 "One ingot and one sheet per batch, Batch size 2. The final barrel receives two native Mechanical Press results.")

Clear any existing configured finished item from the machine result inventory before starting. The NPC gathers the batch, inserts it, waits for the required actual result and delivers it. Input/result positions are reserved by one worker; another NPC sharing them may wait with **Workstation is reserved by another worker**.

## Timeouts retain owned goods

The default processing timeout is **1200 ticks**, about 60 seconds at 20 TPS; allowed range **20–24000 ticks**. **Processing timed out; existing materials remain owned** preserves the existing batch rather than erasing it and inserting a duplicate.

Check machine power/stress, recipe ingredients, required heat/fluids, actual result position, result ID and quantity. A full final destination leaves finished goods with the NPC; a full NPC inventory blocks collection. Inspect reserved goods before replacing machines or moving cargo manually. Reconnecting or changing settings is not a safe cancellation button for an in-flight batch.

## Material Ordering maintains target stock

**Material Ordering** checks **Receiving inventory to maintain** and requests only its shortage through a real Stock Ticker network. A target of **4 iron ingots** orders four from empty storage or one when three are present. Its quantity means **target stock**; Factory Process uses quantity **per batch**.

Prepare the native logistics side:

1. Stock a supplier inventory and configure a **Packager**.
2. Connect **Stock Link** and **Stock Ticker** to the same Create logistics network. Verify its visible stock manually.
3. Build the actual addressed delivery and unpacking route so loose materials reach the receiving inventory. Ordering does not teleport materials.
4. If NPCs carry sealed packages along the route, configure [Addressed Parcel Delivery](#dochi-npc-core/npc-core-create-logistics) separately. Storing a sealed package is distinct from unpacking ingredients.

Then add **Material Ordering**, assign the receiving inventory, materials and target counts, **Stock Ticker**, **Delivery address** and work interval. Save.

![Requesting four iron ingots through a prepared native logistics network and waiting on one accepted order.](assets/media/guides/create-tutorials-20261108/create-material-order.mp4 "Supplier stock changes 16→12 and one persistent request remains. The example has no connected delivery route, so arrival and unpacking are not demonstrated.")

## Pending orders are not resent automatically

Accepted requests survive saves and reconnects and wait for arrival. Time passing does not resend them. Original receiving storage and observed stock matter; putting unrelated items directly in the NPC's inventory does not complete a missing delivery.

| State | Check |
| --- | --- |
| Native logistics network has insufficient stock | Supplier stock, Stock Link and Ticker summary |
| Native logistics network rejected the order | Native network/request conditions |
| Accepted order is waiting for delivery | Packager, address, transport, unpacking and original receiver |
| Order result uncertain; automatic resend stopped | Whether Create already reserved or dispatched the goods |
| Target stock is available | Normal idle state: the target is satisfied |

Changing the receiving inventory does not make an old order arrive in the replacement storage.

## Add automatic supply to processing

After manual processing works, enable **Factory Process → Order missing materials automatically** and assign the revealed **Stock Ticker / Delivery address**. Missing batch materials are ordered and processing resumes after they reach the source. Start with one ordering owner rather than overlapping independent ordering and processing roles. Continue with [condition control and inspection](#dochi-npc-core/npc-core-create-control).

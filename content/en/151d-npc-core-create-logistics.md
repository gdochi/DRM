---
title: Create Polishing, Parcels and Order Counters
slug: npc-core-create-logistics
order: 1515
description: Configure sandpaper work, addressed NPC and inventory delivery, returns and Stock Ticker attendance.
product: dochi-npc-core
category: Create integration
section: editor
status: Guide
version: 0.1.3
audience: Creators / server operators
---

## Before starting

These lessons follow creator-side **Schedule** authoring through native execution. Read [Create setup](#dochi-npc-core/npc-core-create-start) for installation and saving. Silent DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1 recordings use English UI and Korean step captions. Each task starts with an empty schedule and ends with its result; the return lesson continues the configuration saved in the preceding storage-delivery lesson.

## Sandpaper polishing

1. Choose **Sandpaper Polishing**. Put real Create **Sand Paper / Red Sand Paper** and polishable materials in **Source inventory**.
2. Assign **Finished items inventory** for the results.
3. Assign **Working position and facing** through the world picker or **Use my position and facing**. The latter saves both feet position and viewing direction.
4. Choose **Repeat throughout shift**, or **Finish one batch per shift** with a finite **Batch size**. This example polishes two Rose Quartz into two Polished Rose Quartz.
5. Set **Work interval (ticks)**, enable the schedule and save. **20 ticks** is one second at 20 TPS.

![Inspect the ingredients, author an empty schedule, assign source, output and workplace, polish two items and open the result storage.](assets/media/guides/create-lessons-20261108/lesson-polish.mp4 "Sandpaper and two rose quartz are prepared. The task uses Create's actual recipe and tool wear; the final inventory contains two Polished Rose Quartz.")

**Jump points**: 0:09 Ingredients · 0:12 Empty schedule · 0:44 Source · 0:53 Finished storage · 1:01 Workplace · 1:10 Quantity/count · 1:17 Enable/save · 1:32 Native execution · 1:53 Inventory result.

Sandpaper loses real durability. A full result storage leaves finished goods with the NPC, and the NPC needs inventory space. Assigning a work position alone does not supply paper, materials or a destination.

## Addresses and destinations

**Addressed Parcel Delivery** carries a sealed Create package intact. It does not package loose ingredients or automatically unpack a delivered parcel.

| Field | Purpose |
| --- | --- |
| Source inventory | Collect prepared, addressed packages |
| Return inventory | Store undeliverable packages after pickup |
| Address routes → Address | Match the package's Create address |
| Recipient: NPC / inventory | Actual receiving actor or storage |
| Recipient wait (ticks) | Wait after an in-transit destination becomes unavailable/full; default 400 ticks |

Start with separate source, destination and return storage. Source and destination must differ; opposite halves of the same double chest are still one inventory.

There are up to **32 routes**. Finite delivery **Batch size 1–64 counts sealed packages**, not the items inside them. **Repeat throughout shift** continues delivery during the shift. **Work interval** accepts **4–1200 ticks**; **Recipient wait** accepts **20–24000 ticks**. Seconds quoted here assume 20 TPS.

## Route to an NPC

1. Place a real Create package addressed **Workshop A** in the source.
2. Select **Addressed Parcel Delivery** and assign source and return storage.
3. Choose **Add address route**, then a loaded DNPC within **64 blocks**.
4. Replace the generated address with **Workshop A**. Check the recipient, or reselect it with **🔍**.
5. Configure waiting time, repeat/finite work, batch and interval. Save the NPC.

A route stores the recipient's **UUID**, not its display name. Recreating or cloning a same-named NPC does not replace that identity. Reselect a replacement recipient; see [NPC templates](#dochi-npc-core/npc-core-templates).

![Author a route from an empty schedule, assign source and returns, choose the real recipient and Workshop A, then deliver the parcel.](assets/media/guides/create-lessons-20261108/lesson-parcel-npc.mp4 "Receiving Clerk is selected in the native recipient picker. One sealed package reaches that NPC; the unmatched Unknown package remains at the source.")

**Jump points**: 0:10 Empty schedule · 0:42 Source/returns · 0:58 Recipient NPC · 1:08 Address · 1:11 Quantity/count · 1:22 Enable/save · 1:36 Native execution · 1:52 Inventory result.

## Route to an inventory

Choose **Add inventory delivery route**, sneak-right-click the receiving storage and enter its address. Existing rows can switch through **Choose a receiving inventory / Choose an NPC recipient**.

![Add a storage-delivery route, assign source, returns, destination and address, then open the receiving inventory.](assets/media/guides/create-lessons-20261108/lesson-parcel-container.mp4 "Starts with an empty schedule. The final blue barrel contains the sealed package; packing ordinary items is a separate Create operation.")

**Jump points**: 0:10 Empty schedule · 0:42 Source/returns · 0:58 World targets · 1:06 Address · 1:10 Quantity/count · 1:21 Enable/save · 1:35 Native execution · 1:52 Inventory result.

A package must match **exactly one** route. Create address patterns apply: overlapping **Workshop *** and **Workshop A** routes can match the same package. DNPC leaves ambiguous packages at the source instead of choosing the first row. Start with distinct exact addresses.

## Waiting and returns

If the recipient is already missing/full before pickup, the package stays at the source. If that happens after pickup, the courier waits, then carries it to **Return inventory**. A full return storage leaves the parcel in the courier's inventory.

![Reopen the preceding lesson's saved route, change recipient wait, then inspect obstruction, waiting and the returned parcel.](assets/media/guides/create-lessons-20261108/lesson-parcel-return.mp4 "The fixture explicitly fills the destination with stone just after pickup. Both the full destination and the returned sealed package are shown in real inventories.")

**Jump points**: 0:15 Extra pause · 0:19 Enable/save · 0:33 Obstruction · 0:53 Destination check · 0:58 Returned parcel.

| State | Action |
| --- | --- |
| Waiting for a uniquely addressed package | Compare the address against every route |
| Recipient unavailable; keeping the package | Check the original identity, dimension, loaded area and route |
| Recipient full; keeping the package | Free receiver inventory space |
| Returning the undelivered package | Keep the return path reachable |
| Output full; keeping the item | Free delivery/return space; check retained NPC cargo |

Ending a shift does not erase cargo. An already collected package can retain its original saved destination after settings change. Inspect in-flight goods before redirecting work.

## Stock Ticker attendance

1. Place a **stationary Create Seat** with **exactly one Stock Ticker** beside it.
2. Configure its real Create logistics network and stock.
3. Choose **Stock Ticker Attendance** and separately assign **Stock Ticker** and **Create seat**.
4. Save, close the editor and wait for **Attending the Stock Ticker**.
5. Ordinary NPC interaction opens Create's native ordering screen. NPC editing tools retain editing priority.

![Author a counter job, assign Stock Ticker and Create seat separately, then open Create's ordering screen with connected stock.](assets/media/guides/create-lessons-20261108/lesson-stock-ticker.mp4 "A supplier Packager and Stock Link are connected. The lesson includes approach, seating, empty-hand interaction and the native ordering screen.")

**Jump points**: 0:08 Empty schedule · 0:40 World targets · 0:56 Enable/save · 1:10 Native execution · 1:23 Order screen.

The recorded counter connects a supplier Packager, Stock Link and real iron stock on the same network. Empty-hand interaction opens Create's ordering screen with that stock visible. Payment and completed delivery to a receiving address are outside this lesson.

This is Create's player-facing menu, distinct from a DRM shop editor. Missing/ambiguous tickers or an occupied seat prevent attendance. The NPC leaves safely after the shift. Sitting, attendance and [automatic material ordering](#dochi-npc-core/npc-core-create-factory) are separate actions.

## Blaze Burner fuel transport

Existing item transport can deliver accepted fuel to a supported Create Blaze Burner and retain returned containers such as buckets. Keep space for these returns. Configure filters, quantities and delivery using [NPC work and hauling](#dochi-npc-core/npc-core-editor). These new clips do not separately demonstrate Burner fueling. Heating a burner does not supply every machine's power, plumbing or recipe requirements.

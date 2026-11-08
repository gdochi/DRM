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

These are creator-side **Schedule** settings followed by their in-world execution. Read [Create setup](#dochi-npc-core/npc-core-create-start) for installation and saving. The silent clips use DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1. Runtime examples have prepared devices and shifts; editor clips show the stated field edits.

## Sandpaper polishing

1. Choose **Sandpaper Polishing**. Put real Create **Sand Paper / Red Sand Paper** and polishable materials in **Source inventory**.
2. Assign **Finished items inventory** for the results.
3. Assign **Working position and facing** through the world picker or **Use my position and facing**. The latter saves both feet position and viewing direction.
4. Choose **Repeat throughout shift**, or **Finish one batch per shift** with a finite **Batch size**. This example polishes two Rose Quartz into two Polished Rose Quartz.
5. Set **Work interval (ticks)**, enable the schedule and save. **20 ticks** is one second at 20 TPS.

![Collecting real sandpaper and rose quartz, polishing at the assigned position and delivering two results.](assets/media/guides/create-tutorials-20261108/create-polish.mp4 "Prepared schedule using Create's actual recipe and tool wear. Counters are read from server inventories.")

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

![Editing Workshop A and an 80-tick recipient wait, then saving the prepared route.](assets/media/guides/create-tutorials-20261108/create-parcel-routes.mp4 "The recipient and storage are preassigned. 80 ticks is four seconds at 20 TPS, rather than the 400-tick default.")

A route stores the recipient's **UUID**, not its display name. Recreating or cloning a same-named NPC does not replace that identity. Reselect a replacement recipient; see [NPC templates](#dochi-npc-core/npc-core-templates).

![Delivering Workshop A to the recipient while Unknown remains at the source.](assets/media/guides/create-tutorials-20261108/create-parcel-npc.mp4 "One sealed package reaches the recipient's inventory; the unmatched package stays at the source.")

## Route to an inventory

Choose **Add inventory delivery route**, sneak-right-click the receiving storage and enter its address. Existing rows can switch through **Choose a receiving inventory / Choose an NPC recipient**.

![Delivering an addressed sealed package to a receiving barrel.](assets/media/guides/create-tutorials-20261108/create-parcel-container.mp4 "This clip demonstrates intact storage delivery, without Packager unpacking or downstream transport.")

A package must match **exactly one** route. Create address patterns apply: overlapping **Workshop *** and **Workshop A** routes can match the same package. DNPC leaves ambiguous packages at the source instead of choosing the first row. Start with distinct exact addresses.

## Waiting and returns

If the recipient is already missing/full before pickup, the package stays at the source. If that happens after pickup, the courier waits, then carries it to **Return inventory**. A full return storage leaves the parcel in the courier's inventory.

![Returning a package when its destination fills after pickup.](assets/media/guides/create-tutorials-20261108/create-parcel-return.mp4 "The capture fixture deliberately fills the destination with stone after pickup to demonstrate obstruction. The courier returns the package intact.")

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

![The NPC sits at the counter and opens Create's actual ordering screen.](assets/media/guides/create-tutorials-20261108/create-stock-keeper.mp4 "Shows attendance and native menu entry, without completing payment or logistics delivery.")

**No Packagers Linked** appears because this counter example has no supplier Packager connection. Connect a real Create logistics network and stock for usable orders. The material-ordering guide uses a separate connected network.

This is Create's player-facing menu, distinct from a DRM shop editor. Missing/ambiguous tickers or an occupied seat prevent attendance. The NPC leaves safely after the shift. Sitting, attendance and [automatic material ordering](#dochi-npc-core/npc-core-create-factory) are separate actions.

## Blaze Burner fuel transport

Existing item transport can deliver accepted fuel to a supported Create Blaze Burner and retain returned containers such as buckets. Keep space for these returns. Configure filters, quantities and delivery using [NPC work and hauling](#dochi-npc-core/npc-core-editor). These new clips do not separately demonstrate Burner fueling. Heating a burner does not supply every machine's power, plumbing or recipe requirements.

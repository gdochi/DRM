---
title: Configure Armor Item Drops in the GUI
slug: dochi-real-armor-drops
order: 915
description: Choose per-armor drop items, chances and quantities in Armor Drop Editor, then save and apply a set.
product: dochi-real-armor
category: Item Drops
section: drops
status: Stable
version: 0.1.6
audience: Server operators and modpack authors
tags:
  - armor
  - drops
  - editor
---

## When do items drop?

Use Real Armor 0.1.5's **Armor Drop Editor** to choose what each armor item drops. A roll happens when an NPC takes a hit and **the armor actually loses durability**, including the final hit that breaks it. The NPC can still be alive when the items drop.

There are no rules or active sets initially. In [armor settings](#dochi-real-armor/dochi-real-armor-setup), enable **Enable armor calculation**, your NPC integration and **Damage armor items**, then equip the NPC. DRM is optional; Real Armor provides its own editor.

## Create your first drop in the GUI

This example drops **1–3 Iron Nuggets with a 100% chance when an Iron Chestplate is damaged**.

1. Join a world and open Real Armor's **Config → Armor Drop Editor**. With DRM installed, you can also choose **Armor Drop Editor** in the shared editor selector. Multiplayer editing requires permission level 2.
2. Choose **Create New** for a new draft. **Use Default** also starts empty; **Load Existing** opens a saved set.
3. Choose **Armor rules → Add** on the left, search for and select **Iron Chestplate**, then press the item picker's **Apply**.
4. Choose **Drop items → Add** in the center, search for and select **Iron Nugget**, then press the picker's **Apply**.
5. In the right-hand **Drop** tab, enable **Enable drop**, set **Drop chance (%)** to **100**, **Minimum quantity** to **1** and **Maximum quantity** to **3**. Keep **Enable rule** on in the **Armor** tab.
6. Use **Save As**, name the set **iron_salvage** and press **Save**. Wait for the server's save confirmation.
7. Press the editor's **Apply** to activate the set. Check the edited and applied set names at the top.

![Actual Real Armor GUI workflow adding an Iron Chestplate rule and Iron Nugget drop, entering chance and quantity, then using Save As and Apply.](assets/media/guides/armor-drops-015-20261108/armor-drop-editor.mp4 "GUI setup example in Real Armor 0.1.5 / NeoForge 1.21.1. Confirm each item with the picker's Apply, save the set with Save As → Save, then activate it for the world with the editor's Apply.")

The picker offers **All items**, creative categories and **Player inv**. Use **Player inv** for an item with a custom name, enchantments or other data. Selection copies the item data without consuming or moving the original inventory stack. The picker's **Cancel** cancels that selection.

The left panel holds armor rules, the lower center lists **Item / Chance / Quantity**, and the right panel edits the selected entry. The armor stand in the center is a static preview and does not spawn world items.

## Choose chances and quantities

| Setting | Behavior |
| --- | --- |
| Drop chance (%) | Per-item chance from 0–100%. Zero never drops; 100 always succeeds |
| Minimum / Maximum quantity | On success, choose an integer uniformly between the limits. Both are 1–64; minimum ≤ maximum |
| Enable rule / Enable drop | Enable or disable a whole armor rule or one drop entry |
| Horizontal spread / Upward speed | Horizontal spread and upward launch speed of dropped items, each from 0–2 |

Each enabled drop rolls **independently**. With Iron Nuggets at 100% and Emeralds at 25%, nuggets drop every time and emeralds get their own 25% roll. Chances do not need to total 100%. One armor rule supports up to 16 drop entries.

Losing several durability points in one hit still rolls each entry once per damaged armor stack. If several armor pieces actually lose durability, each rolls separately. The server spawns collectible items near the affected equipment slot, splitting quantities according to each item's native maximum stack size.

## Separate saving, loading and applying

| Action | Result |
| --- | --- |
| Save / Save As | Save a named set while keeping the world's current live rules |
| Load / Load Existing | Open a saved set as an editing draft without activating it |
| Apply | Replace all active rules for the world with the saved set |
| Unapply | Disable the active set while keeping saved sets and the editing draft |

**Only one set can be active per world.** Applying another set replaces the previous rules rather than merging them. Saving over the active name also keeps **the previously applied contents until you press Apply again**. Save any pending draft changes before applying.

The active selection or disabled state survives a server restart. Permission failures, invalid values, concurrent editing conflicts and failed saves keep the previous live rules. Read the status message and reload the current server state before revising your draft.

## Storage and troubleshooting

Files belong to the **current server world**. Single-player example:

```text
saves/<world>/serverconfig/dochi_real_armor/
  armor_drops.json
  armor_drop_presets/
    iron_salvage.json
```

On a dedicated server, the same structure sits inside the server's world folder. Set names use 1–64 ASCII letters, digits, underscores or hyphens. Item data serialization depends on the Minecraft version; check compatibility before moving sets between versions.

| Symptom | Check |
| --- | --- |
| Saved but nothing drops | Check the editor's Apply, applied set name, rule/drop switches and actual equipped armor item |
| Hits produce no drops | Enable durability loss and confirm durability actually decreases. Unbreakable equipment and armor-bypassing damage may not meet the trigger |
| Apply is unavailable | Save the draft first and wait for server confirmation |
| Editing is read-only | Check world connection, OP permissions, server response and support for explicit set application |
| No items appear in the preview | The preview is static. Real drops spawn on the server when equipment durability decreases |

Curios accessories use their own durability handling. Do not treat them as armor drop targets for this feature.

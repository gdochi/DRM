---
title: Currency Editor
slug: currency-editor
order: 85
description: How to configure digital and physical currency, item conversion, balances, and death rules.
product: core-fabric
category: Core Systems
section: currency-editor
status: Stable
version: 0.3.1
audience: Creators / Operators
tags:
  - currency
  - editor
---

## Create Money For Your Shop

Open **Currency Editor** from the core's editor selector. The following English screens are from **DRM 0.3.1 / NeoForge 1.21.1**.

![Currency Editor with currency identity, icon, amount display, death rules and HUD settings.](assets/media/guides/drm-031-neo1211/currency-editor.png "Define a kind of money here. Set product prices separately in NPC Shop.")

1. Set the display **Name**, such as `Town Coin`. The saved ID `town_coin` is separate.
2. Open the magnifying glass beside **Item Icon**, choose a real item such as emerald, then **Apply** in the picker. An empty icon can block saving with `Invalid item icon`.
3. Set the amount display, choose **Save As**, enter `town_coin` in **Currency ID**, then confirm with **Save As**. Shops and HUDs use this saved ID.
4. Select the currency in [NPC Shop](#core-fabric/shop-system) and set product prices. Direct item exchange and payment from a DRM balance use different payment sources.
5. To display its balance, add the same currency in [HUD Maker](#core-fabric/hud-maker).

### Set one emerald to ten currency units

Open **Convert items on pickup → Item Prices → Add Item** and search `minecraft:emerald`. Check only the emerald row and choose **Add Selected (1)**. Check it in the conversion list, set **Value / Item 10**, then press **Apply Selected**. Close the list and save the currency.

![Saved town_coin conversion list with one emerald entry at Value / Item 10.](assets/media/guides/drm-031-neo1211/currency-emerald-prices.png "DRM 0.3.1 / NeoForge 1.21.1. The saved list was reopened here. Select the exact minecraft:emerald row rather than emerald ores or blocks. Verify pickup and the balance change separately.")

### Money Players Can Carry

Open **Physical currency** to configure a currency item. A value of `10` means one item represents ten units of that currency; it is separate from the number of products sold by a shop.

![Currency Editor's Physical currency page with an item name, identity and value per item.](assets/media/guides/drm-031-neo1211/currency-physical.png "Configure the wallet balance and carried currency separately, then check which payment method the shop uses.")

## Where Currency Is Used

Use Currency Editor to choose money names, icons, pickup conversion and death losses. Select that currency in shops, rewards and HUDs.

Currencies are not only display labels. They connect to shop payments, item pickup conversion, HUD display, and death behavior.

| Item | Meaning |
| --- | --- |
| Currency ID | Unique ID used by the file name and balance key. |
| Display name | Name shown in HUDs, shops, and messages. |
| Icon | Item or texture used as the currency icon. |
| Format | Display format for balances. |
| Item conversion | Whether picked-up items become currency balance. |
| Death rule | Whether the player keeps or loses balance on death. |

## Physical Currency Items

In 0.1.8, enabling `physicalItem` creates a currency form that can be carried and traded in the inventory.

| Setting | Meaning |
| --- | --- |
| Name | Display name or translation key shown on the item. |
| ID | Unique value that distinguishes this currency on the shared physical-currency item. |
| Unit value | Currency value represented by one item. |

Shops can accept physical currency as payment or pay it out when configured to do so. Keep each physical ID unique.

## Storage

Currency files are saved under the server-side path below.

```text
config/dochi_rpg_maker/
  currency/
    definitions/
      <currency_id>.json
```

The server JSON `kind` is `currency`. Currency list and preview reads use `currency_index`.

## Basic Workflow

1. Right-click the `Dochi RPG Maker Core` item.
2. Open `Currency Editor`.
3. Choose a currency ID.
4. Set display name, icon, and formatting.
5. If pickup conversion is needed, configure the item and amount.
6. Set the death rule to `KEEP` or `LOSE`.
7. Save, then run `/drm currency reload` or `/drm reload`.

DRM copies wallet and compatible bank balance keys when Minecraft replaces the player entity after death. `KEEP` preserves the balance, while `LOSE` carries forward the post-deduction value. Automatic item conversion and death loss notify the affected player in chat. Ordinary pickup conversion processes only the newly picked-up stack, not unrelated currency stacks already in the inventory.

## Command Checks

Saved currencies can be checked through server commands.

| Command | Purpose |
| --- | --- |
| `/drm currency list` | Lists registered currencies. |
| `/drm currency create <id>` | Creates a basic currency definition. |
| `/drm currency give <player> <id> <amount>` | Gives currency to a player. |
| `/drm currency take <player> <id> <amount>` | Removes currency from a player. |
| `/drm currency set <player> <id> <amount>` | Sets the balance directly. |
| `/drm currency get <player> <id>` | Reads the current balance. |

## Shop Connection

NPC Shop prices are calculated by currency ID. If the currency ID used by a shop item does not exist in `currency/definitions`, payment or display can fail.

When a shop uses multiple currencies, create all currencies first, then connect price fields in NPC Shop.

## HUD Connection

Add a Currency component in [HUD Maker](#core-fabric/hud-maker) and select the saved currency. Configure its amount format, position and visibility in the HUD. Do not add obsolete display-permission fields to the currency definition.

The server balance is authoritative. If the client display does not update, check `/drm currency reload` and the active HUD set.

## Checklist

| Symptom | Check |
| --- | --- |
| Currency does not appear in the list | File path and JSON syntax. |
| Pickup does not convert to balance | Item ID, conversion amount, and server reload. |
| Shop payment fails | Currency ID in shop price and definition file. |
| Balance after death is unexpected | Whether death rule is `KEEP` or `LOSE`. |

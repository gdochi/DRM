---
title: Currency Editor
slug: currency-editor
order: 85
description: How to configure currency definitions, item pickup conversion, balances, and death rules in Currency Editor.
product: core-fabric
category: Core Systems
section: currency-editor
status: Stable
version: 0.1.6
audience: Creators / Operators
tags:
  - currency
  - editor
---

## Role

Currency Editor creates the currency definition JSON used by DRM Core. Definitions are stored in `config/dochi_rpg_maker/currency/definitions`, and runtime balances are tied to player PersistentData keys.

Currencies are not only display labels. They connect to shop payments, item pickup conversion, HUD display, and death behavior.

| Item | Meaning |
| --- | --- |
| Currency ID | Unique ID used by the file name and balance key. |
| Display name | Name shown in HUDs, shops, and messages. |
| Icon | Item or texture used as the currency icon. |
| Format | Display format for balances. |
| Item conversion | Whether picked-up items become currency balance. |
| Death rule | Whether the player keeps or loses balance on death. |

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

Fabric 0.1.6 copies DRM wallet and compatible bank balance keys when Minecraft replaces the player entity after death. `KEEP` preserves the balance, while `LOSE` carries forward the post-deduction value. Automatic item conversion and death loss notify the affected player in chat. Ordinary pickup conversion processes only the newly picked-up stack, not unrelated currency stacks already in the inventory.

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

For a currency to appear in HUD, two things must match.

- The currency definition must allow display.
- The active HUD set must contain a currency display component.

The server balance is authoritative. If the client display does not update, check `/drm currency reload` and the active HUD set.

## Checklist

| Symptom | Check |
| --- | --- |
| Currency does not appear in the list | File path and JSON syntax. |
| Pickup does not convert to balance | Item ID, conversion amount, and server reload. |
| Shop payment fails | Currency ID in shop price and definition file. |
| Balance after death is unexpected | Whether death rule is `KEEP` or `LOSE`. |

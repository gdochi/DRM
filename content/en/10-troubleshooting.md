---
title: Troubleshooting
slug: troubleshooting
order: 110
description: Quick checks for install, path, JSON, runtime, shop, and currency issues.
product: core
category: Reference / Operations
status: Stable
version: 0.1.2
audience: Operators
tags:
  - troubleshooting
  - errors
---

## Symptoms

| Symptom | Possible Cause | Fix |
| --- | --- | --- |
| Core item right-click does nothing | Missing creative/edit permission or missing client mod | Check creative mode, OP permission, and client JAR. |
| NPC right-click acts like a normal CustomNPCs tool | Target is not a CustomNPCs NPC, or item is not the core item | Verify the `Dochi RPG Maker Core` item and target NPC. |
| `config/dochi_rpg_maker` is missing | Server has not started or you are checking the wrong root | Compare server root and client instance root. |
| Dialogue choices are hidden | Choice conditions all fail | Temporarily clear `conditions` and retest. |
| Dialogue closes immediately | Start route target is missing or target node conditions fail | Check `current`, the `start` node, and route `goto`. |
| GUI falls back or looks default | `dialogueDefaultGui` or `shopDefaultGui` path is wrong | Confirm the file exists under `config/dochi_rpg_maker/gui`. |
| Shop says no shop exists | NPC has no bound shop and dialogue has no `go_shop` target | Apply a shop to the NPC or set `go_shop.shop`. |
| Buy fails | Stock is 0, inventory is full, or currency is insufficient | Check runtime message, `stock`, price, and balance. |
| Sell fails | `sellItems` is empty or NBT/unit count mismatch | Check sell offer `item`, `nbt`, `count`, and `price`. |
| Currency is not visible | Definition disabled, HUD hidden, or balance not synced | Check `/drm currency list`, HUD settings, login/pickup sync. |

## Fast Isolation

1. Test the same flow with bundled sample JSON.
2. Confirm you are looking at the server `config/dochi_rpg_maker`.
3. Validate JSON syntax if you edited files by hand.
4. Clear conditions and actions temporarily to separate connection issues from rule issues.
5. Run `/drm reload` and `/drm currency reload`.
6. Read `config/dochi_rpg_maker/debug.log`, server logs, and client logs together.

## Path Issues

GUI and shop paths use different storage domains.

| Target | Correct Example | Common Mistake |
| --- | --- | --- |
| Dialogue GUI | `default_dialogue_gui.json` | `npc_shops/default_dialogue_gui.json` |
| Shop GUI | `default_shop_gui.json` | `dialogue_sets/default_shop_gui.json` |
| Shop file | `blacksmith.json` or `blacksmith` | `gui/blacksmith.json` |
| Dialogue set | `my_set` | Using `my_set/dialogue_set.json` as the set name |

Dialogue sets are folders. GUI and shop documents are files.

## Cache And Reload

When `settings/reload_policy.json` has `reloadOnTrigger: true`, JSON loads read fresh files. When it is `false`, cache may be used and manual edits need reload.

| Command | Purpose |
| --- | --- |
| `/drm reload` | Clears server JSON cache and reloads currencies. |
| `/drm currency reload` | Reloads currency definitions and syncs online players. |
| `/drm currency list` | Shows loaded currency IDs. |

:::warning Editing Defaults
Default GUI and sample shop files may be protected defaults. Save a new file and point settings or NPCs at it instead of overwriting defaults.
:::

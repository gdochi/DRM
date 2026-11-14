---
title: Tactical Order Radios and Tablets
slug: expanded-tactical-orders
order: 333
description: Create and issue tactics, hold to designate targets, and configure presets, cooldowns, HUD and sounds.
product: dochi-warfare-expanded
category: Combat Support
section: support
status: Guide
version: 0.3.3
audience: Creators and players
---

## What does the item do?

These are **consumable player items** in DWE 0.3.3. Administrators link a saved gimmick timeline in the authoring Tactical Orders editor; players aim a radio or tablet at the ground to request it. The appearance differs, but both devices can use the same tactic.

Server and clients need the same DWE build, compatible DW and the original vehicle/weapon mods. Tactical calls are **actual combat**, without Simulation terrain protection. Native weapons can damage allies, the caller and terrain.

## Administrator: create and issue a tactic

1. As an administrator with permission level 2, open the command below or **Tactical Orders** in the Warfare editor selector.
2. Load a tactic or create a document. Under **General**, link a saved gimmick ID. Editing the linked gimmick opens the existing world editor.
3. Under **Use & Target**, set distance, hold time and movement permission. Under **Limits**, set the cooldown group, active-request limit and dimensions.
4. Under **Item & HUD**, choose appearance, gauge direction and colors, then save. Enable the tactic and issue the item. Ordinary players do not need OP permission to use issued items.

```text
/dw tactical editor
/dw tactical give @s light_bombardment ww2_radio 1
/dw tactical give @s tank_reinforcement rugged_tablet 1
```

## Player: designate and request support

1. Hold the item in the main hand and aim at the top of loaded ground. Read the tooltip’s range, hold time and movement rule.
2. Hold the use button. Ground guides are previews; coordinates and heading are confirmed **when the hold completes on the server**.
3. Body movement cancels movement-restricted tactics; looking around remains allowed. Releasing early or changing item, slot or dimension before acceptance cancels the request.
4. Wait for the server acceptance effect and sound. A local 100% gauge is not acceptance. Acceptance consumes one item even in Creative and starts the cooldown.
5. Release before retrying. Acceptance does not guarantee a hit; accepted support continues after switching items or logging out.

Tactics in the same group share a **per-player cooldown**, retained across reconnects/server restarts. Changing appearance or item does not reset it.

## New-install presets

These are freshly generated defaults. Existing user files are preserved, so the actual item tooltip and server configuration take precedence. Precision, line and combined support share air_support; tanks use ground_support. Examples use base SuperbWarfare vehicles; edit factions and routes in the linked gimmick.

| Tactic ID | Support | Hold | Range | Movement | Cooldown |
| --- | --- | --- | --- | --- | --- |
| light_bombardment | Precision bombing, one MK-82 | 1 s | 128 | Allowed | 60 s |
| line_bombardment | Line bombing, four MK-82 | 2 s | 192 | Cancels on movement | 90 s |
| tank_reinforcement | Two M1A2 reinforcements | 2 s | 96 | Allowed | 180 s |
| combined_support | Bombing followed by two M1A2 | 3 s | 128 | Cancels on movement | 240 s |

## Customize HUD and sounds

Under **Item & HUD**, choose **Bar: Vertical / Bar: Horizontal**, **Guide color** and **Bar color**. Colors are separate opaque RGB values. Click **Apply** in the color picker, then save the tactic. Only one gauge orientation is displayed. Acceptance/failure uses short visual/audio effects; do not wait for a chat notification.

Radios and tablets have separate equip/use/acceptance/failure sounds. Custom sounds use the JSON sounds configuration; there is no sound-editing GUI. Use sound IDs registered by a resource pack, not file paths or URLs.

## When a request fails

| Symptom | Check |
| --- | --- |
| Unassigned/unavailable tactic | Tactic ID, enabled state, linked gimmick and native mod installation |
| Aim/route rejected | Loaded ground, range/visibility, dimension and approach space |
| Hold canceled | Tooltip movement rule, slot/dimension changes and button release |
| Cooldown/active-request limit | Other tactics in the same group and ongoing support |
| File edits not reflected | Saved ID and reload command below |
| Full gauge but no support | Server acceptance/failure effects; native aircraft/weapons and linked gimmick |

## File and scripting reference

JSON fields are reference material for direct edits/integrations, not required GUI knowledge.

Tactics are stored in **config/dochi_warfare/vehicle_ai/tactical_orders/<id>.json**; linked timelines are in **config/dochi_warfare/vehicle_ai/gimmicks/**. Defaults install only when absent. Set enabled to false to disable a preset: deleting it can restore it on next start. Use Save As with a separate ID for a custom tactic. Run reload below after direct edits.

```text
/dw tactical reload
```

Configure hold_ticks/allow_movement in activation, max_distance in targeting, and cooldown_group/cooldown_ticks in limits. At 20 TPS, 20 ticks equal one second. hud uses bar_style/guide_color/bar_color; sounds uses equip/use/cast/fail per appearance. Only use sounds can loop.

HUD integration developers can draw the tactical gauge with client-only TacticalOrderHud.renderGauge. This renders a display; it does not replace server acceptance, item consumption or support execution.

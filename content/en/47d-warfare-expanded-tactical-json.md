---
title: Tactical Order JSON Reference
slug: expanded-tactical-json
order: 334
description: A complete tactic JSON example, file IDs, reload/issuance commands and configuration limits.
product: dochi-warfare-expanded
category: Combat Support
section: support
status: Guide
version: 0.3.3
audience: Server administrators and integration authors
---

## Before editing files

Start with the [tactical order GUI guide](#dochi-warfare-expanded/expanded-tactical-orders) for ordinary authoring. This page is reference material for direct server-file edits. Build support arrangements with the [timeline tutorial](#dochi-warfare-expanded/expanded-support-timeline).

## Complete file example

Save this complete file as **config/dochi_warfare/vehicle_ai/tactical_orders/tutorial_air_support.json**. The ID is **tutorial_air_support**, matching the file name. It links the bundled precision-strike gimmick, so that default gimmick and SuperbWarfare must be available. This separate file does not overwrite an automatically installed default tactic.

```json
{
  "schema": "dochi.warfare.tactical_order.v1",
  "id": "tutorial_air_support",
  "enabled": true,
  "name": "Tutorial air support",
  "description": "Request precision support at the designated point.",
  "gimmick": "sample_a10_point_strike",
  "appearance": {
    "default": "ww2_radio",
    "allowed": [
      "ww2_radio",
      "rugged_tablet"
    ]
  },
  "targeting": {
    "mode": "ground_point",
    "max_distance": 128,
    "require_line_of_sight": true,
    "heading": "caller_yaw"
  },
  "activation": {
    "hold_ticks": 20,
    "consume_self": 1,
    "allow_movement": true
  },
  "limits": {
    "cooldown_group": "air_support",
    "cooldown_ticks": 1200,
    "max_active_per_player": 1,
    "allowed_dimensions": [
      "minecraft:overworld"
    ]
  },
  "hud": {
    "bar_style": "horizontal",
    "guide_color": "#68D0DE",
    "bar_color": "#21AA41"
  },
  "sounds": {
    "rugged_tablet": {
      "cast": {
        "id": "minecraft:block.note_block.pling",
        "volume": 0.27,
        "pitch": 1.33,
        "loop": false
      }
    }
  }
}
```

## Reload and issue items

Run these commands with permission level 2. Check the reload result before issuing items. The first give grants one item with the definition’s default appearance; the second grants two tablets. Follow the [player targeting guide](#dochi-warfare-expanded/expanded-tactical-orders) to use them.

```text
/dw tactical reload
/dw tactical give @s tutorial_air_support
/dw tactical give @s tutorial_air_support rugged_tablet 2
```

## Accepted values and limits

An ID contains 1–64 lowercase letters, digits, underscores or hyphens and starts with a lowercase letter or digit. Extensions, path separators and Windows reserved names are rejected. A catalog holds at most 256 files; each file is at most 32 KiB. A file-name/ID mismatch or unknown field is rejected.

Times assume 20 TPS. Values within these ranges still require compatible native vehicles/weapons, loaded terrain and a valid support route.

| Field | Accepted values and meaning |
| --- | --- |
| `schema` | Exactly dochi.warfare.tactical_order.v1 |
| `id` | Tactic ID matching the JSON file name |
| `gimmick` | Saved gimmick timeline ID without an extension |
| `targeting.mode` | Only ground_point |
| `targeting.max_distance` | 8–512 blocks |
| `targeting.heading` | Only caller_yaw; heading sampled when the hold completes |
| `activation.hold_ticks` | Integer 1–200 ticks, 0.05–10 seconds |
| `activation.consume_self` | Always 1; acceptance consumes one even in Creative |
| `activation.allow_movement` | true permits body movement during the hold |
| `limits.cooldown_group` | Tactics in the same group share a per-player cooldown |
| `limits.cooldown_ticks` | Integer 0–72000 ticks, up to one hour |
| `limits.max_active_per_player` | Integer 1–8; applies to all ongoing tactical requests for that player |
| `limits.allowed_dimensions` | Nonempty list of 1–32 explicit dimension IDs |

## HUD and sound settings

Gauge orientation is horizontal or vertical. Colors use opaque #RRGGBB; alpha channels are not supported. Omitting hud selects the default vertical gauge and default guide/bar colors.

sounds configures equip/use/cast/fail per ww2_radio or rugged_tablet. The example replaces only tablet acceptance audio; other cues keep device defaults. Volume is 0–1 and pitch is 0.5–2; only use can loop. An empty id or volume 0 mutes that cue. A sound ID refers to a registered resource-pack sound definition, not an OGG path or URL.

To disable a bundled preset, save enabled as false. Deleting it can restore it at next startup. Put custom settings under a separate ID and preserve original files.

---
title: Encounter, Chase, and Rematch Behavior
slug: cobblemon-encounters-rematches
order: 521
description: Follow Interaction, Vision, Radius, chase, positioning, cooldown, and round progression in server execution order.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Draft
version: 0.1.0
audience: Creators building automatic encounters and rematch trainers
tags:
  - encounter
  - chase
  - rematch
---

## Trigger evaluation

| Trigger | Server check | Typical use |
| --- | --- | --- |
| `Interaction` | Empty-hand main-hand right-click | Baseline tests and player-initiated challenges |
| `Vision` | Distance, NPC-facing half-angle, and optional line of sight | Trainers that notice and approach a visible player |
| `Radius` | Distance around the NPC | Direction-independent acquisition; sight angle and line of sight are not used |

Vision and Radius reject Creative or Spectator players, dead or removed players, players already in battle, players reserved or chased by another encounter, and players blocked by progress, cooldown, or current-round conditions. If several valid players qualify, the closest one is selected.

## Ranges and scan cost

| Setting | Range | Meaning |
| --- | ---: | --- |
| Detection interval | 5–200 ticks | New-target scan interval. Lower values react faster but cost more with many trainers. |
| Vision distance | 1–64 blocks | Maximum Vision range |
| Vision half-angle | 5–180 degrees | Allowed angle on each side of the NPC's forward direction |
| Detection radius | 1–64 blocks | Radius trigger range |
| Line of Sight | On/Off | Requires the NPC to actually see the player in Vision mode |

After acquiring a target, the NPC delays another acquisition attempt by at least 40 ticks or the configured scan interval, whichever is longer.

## Detection feedback

Detection feedback runs once for Vision or Radius, never for Interaction.

| Field | Range or behavior |
| --- | --- |
| Marker Text | Up to 32 characters; line breaks removed |
| Reaction Ticks | 1–200 ticks before chase or immediate battle startup |
| Marker Color | `#RRGGBB` or `#AARRGGBB` |
| Scale | 0.25–4.0 |
| Y Offset | 0–3 blocks |
| Display Distance | 4–256 blocks |
| Hold Ticks | 0–600 ticks after target release |
| Sound Volume / Pitch | 0–4 / 0.05–4 |

The NPC waits through Reaction Ticks. It then starts immediately if Chase is off, or transitions to chase when enabled.

## Chase termination

| Setting | Range | Behavior |
| --- | ---: | --- |
| Walking Speed | 0–100 | CustomNPCs walking-speed scale; navigation multiplier is `Walking Speed ÷ 5` |
| Stop Distance | 0.5–8 blocks | Battle startup is attempted inside this target distance |
| Max Distance | At least Stop Distance, up to 96 | Maximum distance the NPC may travel from its captured home point, not from the player |
| Duration | 10–1200 ticks | Maximum chase time |
| Return Home | On/Off | Navigates back to the captured home point after failure or cancellation |

Logout, death, another battle, reservation changes, timeout, and leaving Max Distance all end the chase. Return navigation ends on arrival or an internal 1200-tick safety timeout.

## Positioning and NPC lock

`Battle Positioning` captures the NPC home point and places the player 1–16 blocks away before presentation playback.

1. Capture NPC home position and orientation.
2. Align the NPC and player.
3. Send the presentation to the client.
4. Recheck conditions after the presentation and round start delay.
5. Hide and reserve the NPC while Cobblemon owns the battle.
6. Restore position, visibility, and lock state on win, loss, flee, or startup failure.

A presentation that plays without a following battle can therefore indicate invalid target state, failed condition recheck, or party creation failure.

## Rematches and round selection

The first challenge always uses round 1. `Start Round` and `Round Mode` apply only after the first win.

| Setting | Behavior |
| --- | --- |
| Rematch Off | A player who has won once cannot challenge again; loss and flee do not increase clear count |
| Max Rematches `0` | No rematches |
| Max Rematches `3` | Up to three additional clears after the first win |
| Max Rematches `-1` | Unlimited |
| `Fixed` | Every rematch uses Start Round |
| `Continue` | Advances from Start Round and stays at the final round |
| `Loop` | Cycles from Start Round through the final round |

With four rounds and Start Round 2, the first challenge is round 1. `Continue` then uses 2→3→4→4; `Loop` uses 2→3→4→2.

## Cooldown

Cooldown accepts 0 ticks through one day (1,728,000 ticks).

- `Player` stores a separate NPC/player cooldown, so other players may challenge immediately.
- `NPC` shares the cooldown across everyone using that NPC.

Clear count, cooldown, and rewarded-round state persist server-side. Repeated testing on one account can reuse old state even after the document changes.

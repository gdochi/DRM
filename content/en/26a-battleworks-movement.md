---
title: Walk, dash, teleport, and move targets
slug: battleworks-movement
order: 245
description: Author movement with clear direction, duration, cancellation, and live-test steps.
product: mob-editor
section: authoring
category: BattleWorks
status: Guide
version: 0.1.3
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## Decide what should move

| Intent | Feature |
| --- | --- |
| Approach between attacks | Chase Target |
| Step toward or away during preparation | Stage Toward / Away |
| Move at a specific event tick | Timeline Movement |
| Pull the player toward the boss | Pull Target |
| Relocate the target to boss-local or world coordinates | Move Target Relative / Absolute |
| Move to an earlier recorded location | [Saved positions](#mob-editor/battleworks-advanced-actions) |

## 1. Build a short retreat

1. Add a pattern named Short Retreat.
2. Use Min Range 0, Max Range 3, and enable Mobility.
3. Set Windup 6, Action 12, Recovery 12 ticks.
4. In Action, disable Stop Horizontal and choose Away at speed 0.08.
5. Keep preparation and recovery on Hold.
6. Add no damage initially.
7. Save/apply and confirm retreat followed by renewed pursuit.

Mobility tells the manager how to record the pattern. It does not create movement by itself.

## 2. Understand the three dedicated movement actions

| Type | Behavior | Values |
| --- | --- | --- |
| Walk | Navigate to a destination calculated at start | Speed multiplier, distance, timeout |
| Impulse Dash | Apply one velocity impulse | Horizontal speed, vertical power, ownership duration |
| Teleport | Relocate after destination checks | Direction and distance |

Forward/back/left/right use the NPC's initial facing. Toward/away use the target's initial location and require a target. Walk destinations and impulse directions do not keep retargeting.

The older stage `dash` refreshes velocity continuously; `impulse_dash` applies a single impulse.

## 3. Make a physical dash

1. Set Windup 12, Action 24, Recovery 16.
2. Add Movement at Action tick 0.
3. Select Impulse Dash toward the target.
4. Start with Speed 0.6, Vertical Power 0.1, Duration 12.
5. Test without damage first.
6. Add Hold at Action tick 12 if an explicit stop is needed.
7. Add a separate Hitbox at the intended contact tick.

This is an **event fragment**, not a whole document:

```json
{
  "id": "dash_start",
  "at": 0,
  "interval": 0,
  "count": 1,
  "chancePercent": 100,
  "actions": [
    {
      "type": "dochi_battleworks:movement",
      "chancePercent": 100,
      "params": {
        "movementType": "impulse_dash",
        "direction": "toward",
        "speed": 0.6,
        "verticalPower": 0.1,
        "durationTicks": 12
      }
    }
  ]
}
```

Duration is control ownership, not guaranteed flight time or travel distance. Gravity, friction, and collision still apply. Dash itself has no damage.

## 4. Avoid overlapping movement

A new dedicated movement replaces the previous session. It can override ordinary stage stopping and pursuit, cross a stage boundary, and postpone the next pattern while ownership remains. An explicit Hold action cancels it.

Repeating a movement event starts a new movement each occurrence. Keep the initial duration inside its stage; extend it only deliberately.

## 5. Test NPC teleportation

Start with Back, Distance 3 on loaded flat ground. Compare open space with a wall, water, and an edge.

NPC Teleport searches for landing ground and checks loading, border, collision, and liquid conditions. Failure leaves the NPC in place.

## 6. Pull the target physically

1. Add Pull Target to a target-required pattern.
2. Begin with Strength 0.08 and Duration 40 ticks.
3. Test approximately two seconds of pulling.
4. Adjust gradually around 0.03–0.12.
5. Check walls, height changes, and existing knockback.

Strength adds velocity every tick; large values accumulate force quickly. Pulling does not rewrite coordinates, and momentum remains afterward. A new pull replaces the old session; invalid entities, death, dimension changes, or combat interruption can end it.

## 7. Relocate the target exactly

| Action | Inputs | Origin |
| --- | --- | --- |
| Move Target Relative | Offset X/Y/Z | Boss feet and facing at execution |
| Move Target Absolute | X/Y/Z | Absolute world coordinates |

Relative X 0, Y 0, Z 3 places the target's feet three blocks ahead of the boss. Positive X is left, Y up, and Z forward.

These actions stay in the same dimension and require loaded, in-border, in-height, collision-free destinations. They do **not** search downward for ground. Airborne Y stays airborne. Check `Battleworks target movement rejected` on failure.

A successful relocation does not automatically cancel an active pull.

## Live-test order

Test flat ground, walls, corners, stairs, and height changes. Simulation's flat-floor rehearsal does not validate real navigation, collision, or landing.

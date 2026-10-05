---
title: Hitbox geometry, damage, and repeat policies
slug: battleworks-hitboxes
order: 235
description: Build a thrust, align its center, and distinguish shared damage from per-action settings.
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

## A hitbox is the space tested for damage

A visible sword or animation does not create BattleWorks damage on its own. Connect a Hitbox Library definition to a pattern's Hitbox action.

## 1. Open the definition from its action

1. Select the pattern and Action-stage Hitbox row.
2. Press **Edit this hitbox**.
3. Confirm its name and usage.
4. Use **Pattern:** to choose the relevant use.
5. Return with **Edit pattern**.

Unattached hitboxes can be previewed, but actual execution timing belongs to a linked action.

## 2. Choose a shape

| Shape | Main controls | Typical use |
| --- | --- | --- |
| Box | Width, Height, Depth | Forward thrust |
| Sphere | Radius | Surrounding burst |
| Cylinder | Radius, Height | Ground area |
| Capsule | Thickness, Height | Rounded vertical volume |
| Sweep | Radius, Thickness, angles, Sweep Steps | Curved slash |
| Polygon | At least three vertices and Height | Irregular area |

Sweep Steps samples the arc; it is not a hit count. Custom Sweep points replace the automatically generated arc.

## 3. Adjust size before offsets

| Setting | Meaning |
| --- | --- |
| Width / Height / Depth | Shape dimensions |
| Radius | Radius or Sweep reach; a radius of 2 gives a sphere diameter near 4 |
| Thickness | Sweep tube radius or Capsule radius |
| Offset X | Local sideways shift; positive is the NPC's left |
| Offset Y | Vertical shift from the ordinary NPC hitbox center |
| Offset Z | Local forward shift |
| Yaw / Pitch | Horizontal rotation / tilt |

Ordinary hitbox center height is **NPC feet Y + half NPC height + Offset Y**. Offset Y 0 already starts around body center. Setting it to 1 moves it another block upward.

### Build a thrust

1. Create a Box hitbox.
2. Enter Width `0.8`, Height `1.5`, Depth `2.8`.
3. Use offsets X `0`, Y `0`, Z `1.8`.
4. Start with Damage `4` and Locked Target Only On.
5. Connect it to an Action event and preview the forward volume.
6. Test in front and at the side of the NPC.

These are starting values for a normal humanoid. Recheck geometry after changing model size or weapon length.

## 4. Shared damage and action multiplier

```text
configured damage = library Damage × action Damage Multiplier
4 × 1.5 = 6
```

Changing library Damage changes all references to that hitbox. To strengthen only one use, change that action's multiplier or create another hitbox.

This is configured damage **before** armor, resistance, invulnerability frames, and other mod rules. Knockback is applied after a successful damage hit.

## 5. Target restriction and effects

Locked Target Only narrows hits to the current target when one exists. Disabling it can include nearby living entities. An action can add this restriction but cannot loosen a true library setting.

For a verified effect such as `minecraft:slowness`, Amplifier `0` means level I, and duration `40` requests about two seconds. Zero damage can still be used with an effect. A zero-damage hitbox may produce a warning.

## 6. Choose the repeat policy

| hitPolicy | Behavior |
| --- | --- |
| unlimited | No extra BattleWorks repeat restriction |
| once_per_pattern | This action can successfully affect each target once during the pattern |
| once_per_repeat | Each occurrence of this action can affect each target once |
| cooldown | Enforce targetCooldownTicks before this action affects that target again |

Only successful damage/effect applications are remembered. Memory is **per action**, so separate Hitbox actions remain independent attempts. These policies do not remove vanilla damage immunity.

For a lingering area, begin with cooldown and targetCooldownTicks `10`, then test actual hits before increasing repeat frequency.

## 7. Align contact

1. Choose the hitbox's Pattern usage and Action stage.
2. Select a compatible clip and Play at a slower preview speed.
3. Find the contact posture.
4. Return to the pattern and move Event Tick.
5. Save/apply and test front, sides, rear, and different heights.

If too high, check Offset Y. If sideways, check Offset X and Yaw. If short, compare Offset Z, dimensions, and start range. Continue with [animation](#mob-editor/battleworks-animation).

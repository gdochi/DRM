---
title: Saved positions, projectiles, summons, and conditions
slug: battleworks-advanced-actions
order: 276
description: Build delayed attacks and manage grouped entities and encounter state.
product: mob-editor
section: combat
category: BattleWorks
status: Guide
version: 0.1.3
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## Add one advanced feature at a time

Start after the [two-phase boss](#mob-editor/battleworks-encounters) works. Keep a known-good file. Choose an action through its purpose category, then edit its properties and Modifiers.

JSON keys below are reference material for direct authoring.

## 1. Attack the player's earlier position

1. Create a Cylinder hitbox with ID warning_blast, Radius 2.4, Height 3, Damage 4.
2. Create a pattern with Windup 40, Action 10, Recovery 20.
3. Add **Save Position** at Windup tick 0.
4. Set Position ID blast_spot, Source Target, Mode Exact.
5. At Windup tick 1, add **Particle Shape**.
6. Use Saved position, Position ID blast_spot.
7. Use Ring, Radius 2.4, Samples 24, Particle minecraft:end_rod. Keep any repeats within Windup.
8. Add **Hitbox At Position** at Action tick 0.
9. Link warning_blast and blast_spot.
10. Use compatible stage animation or an explicit None.

Expected result: moving away after the warning starts leaves the hit at the earlier location. Saved-position hitboxes use the anchor as their center; check height instead of assuming ordinary NPC body-center offsets apply identically.

## 2. Manage position names

| Action | Purpose |
| --- | --- |
| save_position | Record caster/target position |
| hitbox_at_position | Execute a hitbox at an anchor |
| move_to_position | Move caster/target to an anchor |
| clear_position | Delete one or all anchors |

Saving the same name updates it. Keep save/use/clear order deliberate. Anchors are encounter-local and clear on combat reset; the current limit is 32.

Random Ring and Random Box choose random locations. Safe searches nearby heights for loaded, in-border, collision-free space; it does not guarantee a supporting ground block. Test destinations in the world.

## 3. Begin with one managed projectile

1. Add **Spawn Projectile**.
2. Start with the editor's basic minecraft:snowball ID.
3. Set Group ID training_shots and Count 1.
4. Use Spawn At Caster and Direction Target.
5. Try Speed 0.5, Damage 2, Lifetime 60 ticks.
6. Verify creation, travel, impact, and cleanup before increasing count.

| Field | Meaning |
| --- | --- |
| Group ID | Name used by later release/remove actions |
| Fan / Radial | Direction arrangement |
| Point / Line / Ring / Arc / Grid | Spawn placement |
| Hold Ticks | Delay before automatic launch |
| Lifetime Ticks | Maximum lifespan |
| Hit Radius | Managed collision radius |
| Trail Particle | Registered trail ID |

Not every registered mod entity supports generic creation. Use a real Skill integration first for complex external spells.

## 4. Release a held group

1. Spawn training_shots with Hold Ticks 40.
2. Add **Release Projectiles** 20 ticks later.
3. Use the same Group ID.
4. Add **Remove Projectiles** when remaining entities should be removed.

Choose between automatic launch and an earlier explicit release. Limits are 64 per action and 128 live managed projectiles per caster. Start small.

Item visuals used for constructs are not pickup loot. Configure loot separately in CustomNPCs.

## 5. Summon a CustomNPC clone

1. Save a real clone with CustomNPCs tools.
2. Record its exact tab and name.
3. Add **Summon Clone** with those values.
4. Use Group ID guards and Count 1.
5. Configure spawn location and lifetime.
6. Optionally connect an existing child Battlework File.
7. Add **Dismiss Summons** for guards and test cleanup.

A clone name is not an arbitrary entity ID. The clone and optional child file must exist on the server. Child files use paths relative to mobs/patterns.

Summons are parent-managed and can inherit the target. Limits are 32 per action and 64 live summons per parent. Review child files to avoid uncontrolled summon chains.

## 6. Gate later events with conditions

Conditions can inspect health, phase, counts, positions, state, and action results. Multiple conditions are combined with AND.

For an event's **conditions array**, this checks that the anchor exists:

```json
[
  {
    "type": "position_exists",
    "key": "blast_spot",
    "operator": "eq",
    "value": 1
  }
]
```

This is a fragment, not a complete file. Position existence is a boolean check; operator/value primarily apply to numeric comparison conditions.

| Type | Purpose |
| --- | --- |
| boss_health / target_health | Health ratio comparison |
| missing_boss_health | Missing-health ratio |
| summon_count / projectile_count | Count in the group named by key |
| position_exists | Anchor existence |
| state | Compare a stored encounter number |
| action_succeeded / action_failed | Inspect a named action result |
| skill_available | Provider availability, not guaranteed cast success |
| target_distance / target_vertical | Distance or height |
| phase / on_ground / random | Phase, grounding, or chance |

Numeric operators are eq, neq, gt, gte, lt, and lte. Health 50% is 0.5. Negate reverses the result.

## 7. State numbers and optional NPC attributes

**Set State** supports Set, Add, Multiply, Random, and Clear. It can track charges for a later move. This is encounter state, not permanent player data or CustomNPCs storeddata.

Advanced `npcStats.enabled` can apply maximum health, movement speed, phase-specific speeds, follow range, and idle/combat regeneration. It is disabled by default. Zero health/speed/range values do not apply a new attribute value; zero regeneration adds no automatic healing.

The first exercise prepares base stats in CustomNPCs. Inspect npcStats when an imported boss unexpectedly changes health or speed.

## 8. Other status and control actions

Heal restores the caster. Apply Effect targets Self or Target with a registered effect. Ignite sets a target on fire. Launch and Tether control target movement; Cancel Skill and Cancel Tether stop their corresponding activities.

Shield Punish can request cooldown or destruction for the supported vanilla shield-use case. It is not the generic parry option. Test recipient, probability, and repeats on a practice setup.

After each addition, use the [troubleshooting sequence](#mob-editor/battleworks-troubleshooting).

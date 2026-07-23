---
title: Target Rules
slug: tacz-target-filters
order: 340
description: Restrict firearm NPC targets by entity ID, faction, scoreboard tag, and advanced stance rules.
product: cnpc-tacz-fire
category: Targets
section: targets
status: Draft
version: 0.2.1
audience: Encounter designers
tags:
  - target
  - filter
  - faction
---

## Why targets need extra care

Firearm NPCs can attack from farther away than most melee NPCs, so a wrong target rule is immediately visible. Build target rules in small steps: first confirm the NPC can fire, then add entity IDs, then tags, then advanced faction or stance behavior.

## Entity ID target list

The `Targets` tab can select allowed target entity IDs. The list includes search, checked-only, unchecked-only, entity type filtering, and mod ID filtering. This is the cleanest way to make a guard attack only a specific group of mobs or only entities from a specific mod.

| Control | Use |
| --- | --- |
| Search | Filter registry IDs such as `minecraft:zombie`. |
| View filter | Show all, checked only, or unchecked only entries. |
| Type filter | Narrow broad living entity groups. |
| Mod filter | Show entity IDs from selected mod IDs. |
| Select all / none | Apply to the currently visible filtered list. |

An empty target entity list means the NPC falls back to normal behavior instead of a strict entity allow list.

Version 0.2.0 narrows long-distance living-target searches through a spatial index before applying entity ID, tag, faction, distance, angle, and line-of-sight rules. Creative and spectator players are rejected before sound or combat target processing.

## Scoreboard tag rules

Tag rules use entity scoreboard tags:

| Field | Behavior |
| --- | --- |
| Required tags | If set, a target must have at least one required tag. |
| Rejected tags | If set, a target with any rejected tag is rejected. |
| Attack same faction by tag | Allows same-faction CustomNPCs to be attacked when a required tag matches. |

Tags are useful for scripted events. For example, a dungeon script can add an `intruder` tag to players or NPCs during an alarm phase, then remove it after the encounter.

## Factions and advanced stance

Advanced stance rules can match target factions, target tags, or target entity IDs. Add target IDs and tags in `Targets` first, then use them from `Stance Mode: Advanced`.

Advanced mode supports one active conditional rule. This keeps the result predictable. Use `Default` behavior if the NPC should fall back to normal `General` settings when the advanced condition does not match.

## Import and export profiles

`Import` and `Export` profiles are stored under:

```text
config/cnpc_tacz_fire/target_entities/
```

Current profiles are not just target-entity files. They work more like cloning presets that connect one NPC's TACZ Fire setup to another CustomNPCs NPC. Configure guns, AI, targets, ammo, and pools on one NPC, `Export` the profile, then `Import` it on another NPC to apply the same combat setup quickly. Legacy target-only JSON can still be imported.

## Practical examples

| Scenario | Suggested rule |
| --- | --- |
| Zombie guard | Select zombie-like entity IDs in the entity list. |
| Event phase | Use required tag `phase2_target`, then remove the tag when the phase ends. |
| Same-faction duel | Use required tags and enable same-faction tag targeting only for the event participants. |
| Boss anti-add rifle | Allow only the add entity IDs and leave players out of the list. |

## Debugging target rules

If the NPC does not fire, remove filters temporarily and test with a basic hostile target. Then add one rule at a time. Most target issues come from mixing an entity allow list, required tags, rejected tags, and same-faction rules before confirming the baseline.

A patrolling NPC should not immediately discard a living target after a momentary loss of sight. Managed NPCs use short combat memory and the last known position to survive brief occlusion. The final line-of-sight check still prevents direct fire through a wall during that memory window.

---
title: Target Rules
slug: warfare-target-filters
order: 340
description: Restrict firearm NPC targets by entity ID, faction, scoreboard tag, and advanced stance rules.
product: dochi-warfare
category: Targets
section: targets
status: Draft
version: 0.2.5
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

An empty target entity list means there is no strict entity allow list. A managed CustomNPCs shooter still scans so it can inherit genuine CustomNPCs faction hostility toward NPCs or players. The candidate must still match an explicit selector, the same-faction tag exception, or a real hostile faction rule; passive and unrelated entities do not become automatic targets.

Long-distance living-target searches use a spatial index before applying entity ID, tag, faction, distance, angle, and line-of-sight rules. In 0.2.5, every newly discovered target must pass configured range, line of sight, and awareness angle even while the NPC is already fighting. Only valid damage, self-defense, close-detection, or faction-defense reactions can grant the documented exception; a silent target behind the NPC is not acquired merely because combat is active.

## Scoreboard tag rules

Tag rules use entity scoreboard tags:

| Field | Behavior |
| --- | --- |
| Required tags | If set, a target must have at least one required tag. |
| Rejected tags | If set, a target with any rejected tag is rejected. |
| Attack same faction by tag | Allows same-faction CustomNPCs to be attacked when a required tag matches. |

Tags are useful for scripted events. For example, a dungeon script can add an `intruder` tag to players or NPCs during an alarm phase, then remove it after the encounter.

## Factions and advanced stance

Advanced stance rules can use `Always`, NPC health below a ratio, target faction, target tag, or target entity ID. `Always` and the NPC-health condition can be evaluated without a current combat target. Target faction, tag, and entity conditions require a living target, so add the needed IDs and tags in `Targets` before using them from `Stance Mode: Advanced`.

Advanced mode supports one active conditional rule. This keeps the result predictable. Use `Default` behavior if the NPC should fall back to normal `General` settings when the advanced condition does not match.

## Load and Save As profiles

Topbar `Load` and `Save As` profiles are stored under:

```text
config/dochi_warfare/target_entities/
```

Current profiles are not just target-entity files. They work as setup presets that connect one NPC's DW firearm configuration to another CustomNPCs NPC. Configure guns, AI, targets, ammo, and pools on one NPC, store the profile with `Save As`, then `Load` it on another NPC. Legacy target-only JSON can still be loaded from the migrated legacy root.

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

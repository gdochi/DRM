---
title: Boss Encounter Guide
slug: battleworks-encounters
order: 270
description: Build mobile bosses with spells, passive reactions, dialogue and battle music.
product: mob-editor
section: combat
category: Battleworks
status: Guide
version: 0.1.1
audience: Combat content creators
tags:
  - battleworks
  - combat
  - boss
---

# Battleworks 0.1.1 — Combat Creation Guide

## Build an encounter

Open Battleworks from DRM's editor selector. Configure the NPC model in **NPC Basic**, create a pattern in **Pattern Workbench**, and arrange its **Windup**, **Action**, and **Recovery** stages.

Use **Hitbox Library** for weapon reach and damage. Use **Combat Rules** for pattern selection, phases, targeting, death events and BGM.

Save the combat file, then apply it to the NPC. Updating a file does not automatically update NPCs that already have an older copy applied.

## Choose skills and animations

Use **+ Skill** and the mod filter to find a supported spell. Each skill action controls one spell. Add separate actions for different spells and give them their own timings.

Repeated casts must leave enough time for the spell's own cooldown. To alternate casting motions during a volley, place individual shots on the timeline and assign different compatible motions.

All animations and previews use DRM. Better Combat provides compatible humanoid motions; other models need clips supported by their DRM integration. A spell effect may continue after its opening motion ends.

## Make movement readable

Walking uses navigation. An impulse dash gives the NPC momentum once, allowing gravity and collisions to affect the movement. Teleport moves to a safe destination when one is available.

Combine lateral movement, approach and retreat instead of repeatedly reversing a tiny sidestep. Keep walking active through appropriate attack gaps. Leave room for beam/breath attacks, melee contact moments and recovery openings.

Increasing the number of movement actions does not guarantee the same distance on every map: NPC movement settings and terrain still affect the result.

## Chances and passive reactions

An individual action's **Chance (%)** field defaults to 100 when omitted or cleared. For example, keep an attack guaranteed while giving a routine speech a 20% chance.

An event's chance applies to its whole group. Individual action chances are separate rolls; setting two actions to 20% does not make them happen together.

Passive patterns respond to melee damage, ranged damage, any damage or health thresholds. Give repeatable reactions cooldowns, and choose how they behave when another pattern is busy. Use a once-per-combat setting for a last-stand reaction. Health phase transitions and passive reactions are distinct tools.

## Boss dialogue

Add a Command action and use **Edit command / arguments**. Supported placeholders include `@npc`, `@target`, `{player}` and `{uuid}`.

The supplied encounters use DRM Popup Maker for their English speeches. Configure the opening sound in the popup definition: it plays directly to the recipient when the popup appears. This keeps the sound together with the speech even when a command has a reduced chance.

`combatv1.json` is a shared popup definition. Changing its opening sound also affects other content that uses that definition.

## Mob's BGM

In **Combat Rules → BGM**, enable the feature, select a sound and set its volume.

- Use a sound event ID, such as `minecraft:bgm.dread_march`, rather than an OGG filename. That example requires the corresponding resource pack.
- Only the current player target hears the track.
- The track loops and stops when the target is lost.
- Vanilla background music is suspended while encounter BGM is active; normal scheduling returns afterward.
- Music volume controls boss BGM. At zero, it is silent.
- Death, disconnects and dimension changes clear playback. With multiple bosses, one encounter track plays at a time.

## Damage and content files

Hitbox damage is edited in **Hitbox Library**. Spell damage depends on the provider, spell level and supported options; there is no universal damage override for every mod skill.

Combat JSON files belong in `config/dochi_rpg_maker/mobs/`. Popup definitions belong in `config/dochi_rpg_maker/popups/definitions/`.

The separately supplied encounters are:

| File | Boss |
| --- | --- |
| `battleworks_boss_fire.json` | Veyr, the Cinder Crown |
| `battleworks_boss_ice.json` | Ilyra, the Winter Regent |
| `battleworks_boss_elemental.json` | Astra, the Prismatic Sovereign |
| `battleworks_boss_lightning.json` | Kael, the Stormbound King |
| `battleworks_boss_arkel.json` | Arkel, Warden of the Dying Sun |

These files, custom music and popup assets are separate from the mod update. Configure NPC health, equipment, hostility, drops and respawn separately.

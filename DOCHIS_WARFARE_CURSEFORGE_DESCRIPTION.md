# Dochi's Warfare

An FPS/RPG combat-authoring toolkit for Minecraft Forge 1.20.1.

Dochi's Warfare lets map makers and server creators build configurable firearm NPCs, tactical squads, autonomous SuperbWarfare vehicles, reusable entity templates, mission controllers, and interactive traps with in-game creator tools.

Current release: **0.2.7**

Only NPCs and vehicles explicitly enabled in Dochi's Warfare are managed. Ordinary CustomNPCs NPCs and unconfigured SuperbWarfare vehicles keep their normal behavior.

## Managed Firearm NPCs

Use `DW Npc Core` in Creative mode to configure a selected CustomNPCs NPC.

- TACZ, PointBlank, SuperbWarfare, melee, and empty-hand combat roles
- Idle, Ranged, Melee, Auto, Auto Hidden, and conditional Advanced stances
- Native, fixed, or randomized RPM with configurable burst length
- Detection, hearing, awareness, combat memory, faction defense, suppression, grenades, and cover
- Hold, Spread, Compact, Advance, Retreat, patrol, and route behavior
- Entity ID, faction, and scoreboard-tag target rules
- Finite or infinite DW ammunition, native/custom reload timing, regeneration, and fallback weapons
- Weighted gun, melee weapon, armor, local skin, and HTTP/HTTPS skin pools
- Ready-made presets, reusable JSON profiles, and a full NPC preview

Managed NPCs use real supported gun items. The gun mod keeps its native model, renderer, projectile or hitscan, muzzle effects, sounds, and loaded-round state. Dochi's Warfare controls the managed NPC's target, stance, tactical movement, firing opportunity, reload policy, reserve ammunition, animation signal, and persistence.

> Do not place ammunition or magazine items in a managed NPC's offhand. Reserve ammunition is handled by DW `Ammo Stock`, DW reload state, and the operated adapter's loaded-round state.

## Native Gun Integrations

- **TACZ:** Required 1.1.8 baseline within the supported 1.1.x range.
- **PointBlank:** Optional. Supports the 1.11.1 and 2.1.0 compatibility branches; install exactly one.
- **SuperbWarfare:** Optional. Verified against SuperbWarfare 0.8.9-final for Minecraft 1.20.1, build `6effe4385`.
- **Better Combat:** Optional native melee animation integration.

Across every gun integration, Dochi's Warfare owns managed NPC stance, movement, shot, reload, transition animation, and pose mapping. External gun mods keep their native weapon mechanics and assets.

## SuperbWarfare Vehicle AI

Right-click a supported vehicle with `DW Npc Core` to open the server-authoritative vehicle editor.

- Ground, water, helicopter, and fixed-wing movement support
- Stationary, Area Patrol, Return Only, and Route Patrol behavior
- Roam, Guard, Engage, Move To, Patrol, and Return Home orders
- Detection, hearing, factions, tags, target priorities, and combat memory
- Independent weapon rules, accuracy, ranges, virtual ammunition, reloads, and crew requirements
- Loaded-terrain path planning, vehicle footprint checks, terrain/water safety, and bounded stuck recovery
- Live top/side seat map with CustomNPC crew placement
- Reusable vehicle profiles, clone templates, and vehicle soul stones

DW sends native control inputs. SuperbWarfare remains responsible for vehicle physics, engines, collision, turrets, weapons, projectiles, and sounds.

## Server AI Controls

Version 0.2.7 adds server-wide controls for optional NPC systems, including idle behavior, custom targeting, advanced rules, hearing, awareness, combat memory, tactical movement, cover, suppression, grenades, faction assistance, and booby traps. Vehicle AI and mercenary AI have separate global controls.

These controls are server-authoritative, synchronized to clients, and editable only by authorized operators. Disabling an optional system does not remove saved NPC contracts or configurations.

## Mission Core Planner

`Mission Core Planner` is a redstone-controlled mission block for map makers. It can select configured vehicles inside a radius, issue an Area Mission, track the controlling planner, and cancel only missions owned by that planner when disabled or destroyed.

Operator commands use the `/dw` root. The legacy `/dochi_warfare` command root is no longer used in 0.2.7.

## Mercenaries, Poses, Clones, and Traps

- `DW Mercenary Core`: hire contracts, summon/recall, formations, Fire At Will/Hold Fire, Defensive/Aggressive posture, and the hold-`J` command HUD
- `DW Pose Core`: Steve/Alex pose editing, gun transforms, built-in presets, JSON profiles, and action mappings
- Entity Clone Library: sanitized server-owned CustomNPCs NPC and supported SuperbWarfare vehicle templates
- `DW Booby Trap Core`: password doors/containers, explosions, step or interaction triggers, launch force, effects, redstone rules, and optional LRTactical grenade payloads

## Installation

Install the same Dochi's Warfare build on both client and server.

Required:

- Minecraft 1.20.1
- Forge 47+
- TACZ 1.1.8 or a supported later 1.1.x release
- Player Animator 1.0.0+ on the client

CustomNPCs is required for NPC-centered workflows. PointBlank, SuperbWarfare, Better Combat, Mob Player Animator, and LesRaisins Tactical Equipments are optional integrations.

## Data Locations

- NPC profiles: `config/dochi_warfare/target_entities/`
- Pose profiles: `config/dochi_warfare/poses/`
- Vehicle AI profiles: `config/dochi_warfare/vehicle_ai/profiles/`
- Entity clones: `config/dochi_warfare/entity_clones/`
- Booby-trap profiles: `config/dochi_warfare/booby_traps/profiles/`
- Server AI policy: `config/dochi_warfare/server-ai.json`

Missing legacy reusable files under `config/cnpc_tacz_fire/` are copied into the current namespace when needed without overwriting newer files or deleting the recoverable originals.

## Languages

- English
- Korean
- Simplified Chinese
- Japanese
- Russian

## Community

Discord: https://discord.gg/ryvWyRkr4c

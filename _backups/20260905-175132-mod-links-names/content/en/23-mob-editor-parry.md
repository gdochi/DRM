---
title: Combat Options and Parry Support
slug: mob-editor-parry
order: 270
description: Distinguish working global combat integrations from per-pattern parry settings.
product: mob-editor
section: combat
category: Battleworks
status: Guide
version: 0.1.0
audience: Combat content creators
tags:
  - battleworks
  - combat
---

## Combat Rules pages

| Page | Contents |
| --- | --- |
| Manager | Selection modifiers, global cooldown, combo depth, and recovery waits |
| Combat | Native attack suppression, targeting, pursuit, facing, and encounter delays |
| Phase | Health thresholds and transition patterns |
| Death | Death timeline, timed actions, and corpse movement lock |
| Parry | Stored parry settings; see the 0.1.0 support boundary below |

Native CNPC attacks and Battleworks hitbox damage are separate damage sources. Enable native attack suppression when patterns are intended to own the NPC's attacks.

## Global features

The optional **Iron's Spells 'n Spellbooks** integration can deflect supported spell projectiles. It does not promise universal parrying for every projectile from every mod.

Player lock-on and hitbox debug presentation also use global combat settings. Their file is `config/dochi_rpg_maker/settings/battleworks_global_rules.json`. Defaults enable magic parry and lock-on and disable hitbox debug. Debug rendering does not create additional damage contacts.

## Per-pattern parry limits in 0.1.0

Detailed **Parry** page fields, including input windows, posture, and riposte multipliers, are currently stored in the document but are not connected to the Battleworks pattern runtime. Setting a pattern's `parryable` flag or posture damage alone does not implement posture loss, melee parries, or riposte combat.

Do not make those fields essential to a working 0.1.0 encounter. Global spell-projectile deflection and a per-pattern posture system are separate capabilities.

## Death presentation

Enable Death to run a separate action timeline after the NPC dies. Place execution ticks and repetitions within its duration. Horizontal corpse locking can prevent sliding. Damage actions or skills still depend on their target and provider requirements.

## Validate an encounter

Test one attack, pursuit, repeated contacts, phases, and death presentation in that order. Establish that damage and cooldowns behave correctly on the server before relying on additional reactive combat features.


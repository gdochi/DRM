---
title: Combat ownership, parry scope, and death
slug: mob-editor-parry
order: 270
description: Prevent overlapping controllers and understand which combat options are active.
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

## 1. Suppress overlapping native attacks

Enable **Combat Rules → Combat → Suppress Native Attacks** when authored hitboxes should own attack timing.

1. Start with a working hitbox attack.
2. Enable suppression and save/apply.
3. Check for extra hits during preparation or recovery.
4. If overlap remains, inspect CustomNPC combat scripts.

## 2. Handle legacy scripts deliberately

0.1.3's **Suppress CustomNPC Scripts** stops legacy script execution from competing with BattleWorks. It preserves the stored script data.

This is useful when porting a scripted boss. Check any noncombat behavior supplied by those scripts before relying on suppression. A new practice NPC normally does not need it.

## 3. Current parry support

| Feature | 0.1.3 source behavior |
| --- | --- |
| Global Magic Projectile Parry | Reflection integration for supported Iron's Spellbooks projectiles |
| Global Lock-on | Global permission with local presentation settings |
| Hitbox Debug | Visualization, not additional damage |
| Document Parry Window / Posture / Riposte | Editable and persisted, but no corresponding BattleWorks pattern-runtime consumer was found |
| Pattern Parryable / Posture Damage On Parry | These fields alone do not implement posture loss, melee parry, or riposte |
| guard / evade reactions | Separate implemented damage-reaction path; see [passives](#mob-editor/battleworks-passives) |

Projectile reflection is not universal support for every mod projectile. Do not make an encounter require the reserved posture/riposte fields to become beatable.

## 4. Global versus local settings

| File | Purpose |
| --- | --- |
| `config/dochi_rpg_maker/settings/battleworks_global_rules.json` | Shared magic-parry, lock-on, and hitbox-debug flags |
| `config/dochi_rpg_maker/settings/battleworks_client.json` | Panels, lock-on appearance, trails, audio, and local preferences |

Global defaults enable magic parry and lock-on and disable hitbox debug.

**Disable vanilla music** is an independent local audio preference. It suppresses vanilla music regardless of combat state and does not overwrite the music volume value. See [BGM setup](#mob-editor/battleworks-skills-effects).

## 5. Make a short death sequence

1. Open **Combat Rules → Death**.
2. Enable it and set Duration 40 ticks.
3. Enable Lock Corpse if horizontal movement should be held.
4. Add a Sound or Title at tick 0.
5. Add another event at tick 20 if needed.
6. Keep every event and final repeat within Duration.
7. Kill the actual NPC and observe the entire sequence.

The killer can become the sequence's target. Player-directed titles and dialogue need a suitable recipient. Skills requiring a living caster can fail after death, so start with sound, title, and compatible motion.

Lock Corpse stops navigation and horizontal movement. Drops, respawning, and all corpse physics are not configured by this switch.

## Completion checks

Verify that no extra native/script hits overlap the timeline, reserved parry fields are not required for victory, death presentation finishes correctly, and the intended file remains connected after respawn or another fight.

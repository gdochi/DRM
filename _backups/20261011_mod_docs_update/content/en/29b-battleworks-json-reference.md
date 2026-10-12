---
title: Combat JSON reference and complete sample
slug: battleworks-json-reference
order: 285
description: Copy a full example and check fields, references, timing, and limits.
product: mob-editor
section: reference
category: BattleWorks
status: Reference
version: 0.1.3
audience: Creators editing JSON directly
tags:
  - battleworks
  - json
---

## Read this when editing JSON directly

Beginners can follow the [editor exercise](#mob-editor/battleworks-first-attack) without memorizing the schema. This page is for inspecting or modifying external files.

Download the [complete combat sample](./assets/media/battleworks/training_swordsman.json) and [particle sample](./assets/media/battleworks/training_ring.json). They use different schemas and folders.

## 1. Top-level fields

| Field | Purpose |
| --- | --- |
| schema | dochi.battleworks.v1 for combat |
| id / displayName / enabled | Identity, display name, runtime enable flag |
| combat | Attack/script suppression, targeting, waiting, BGM |
| npcStats | Optional combat attribute overrides; disabled by default |
| manager | Ordinary selection, repetition, combos, pacing |
| phases | Health phases and transition links |
| hitboxes | Reusable geometry |
| patterns | Conditions, score, stages, events, combos |
| death | Death timeline |
| authoring | Preserved creator notes |
| drmNpcModel | DRM model snapshot applied to a real NPC |
| previewNpcModel / previewTexture | Detached-preview data |
| particleEffects | Older inline effect compatibility data |

New particle work should use a separate particleFile reference. Prepare name, equipment, factions, drops, and respawn in CustomNPCs. Imported npcStats can override selected health/speed/regeneration behavior. Preserve unknown data and opaque model snapshots when editing existing documents.

## 2. Apply the sample

1. Save the complete object below or download it.
2. Place it at config/dochi_rpg_maker/mobs/patterns/training/training_swordsman.json.
3. Prepare a normal humanoid NPC, sword, base stats, and hostile target in CustomNPCs.
4. Load and check validation.
5. Apply and test in Survival.

The sample needs no optional spell or animation provider. Main-hand swing targets normal humanoids, not Gecko or modded-entity models. Fallback scanning is disabled, so CustomNPCs must supply the target.

## 3. Complete combat document

This is one complete JSON object with no comments or omissions. Damage 4 is configured before defenses.

```json
{
  "schema": "dochi.battleworks.v1",
  "id": "training_swordsman",
  "displayName": "Training Swordsman",
  "enabled": true,
  "description": "Beginner Forge 1.20.1 / BattleWorks 0.1.3 example. Normal humanoid NPC; CustomNPCs supplies the hostile target.",
  "combat": {
    "suppressNativeAttacks": true,
    "suppressCustomNpcScripts": false,
    "engageDelayMin": 10,
    "engageDelayMax": 18,
    "combatResetDelayTicks": 100,
    "retryDelayTicks": 10,
    "targeting": {
      "scanWhenNoTarget": false,
      "scanRange": 16,
      "requireLineOfSight": true,
      "fovDegrees": 360,
      "chaseTarget": true,
      "faceTarget": true,
      "chaseSpeed": 1,
      "preferredDistance": 2
    },
    "parry": {
      "mode": "off",
      "magicProjectileDeflect": false,
      "betterCombatMelee": false
    },
    "bgm": {
      "enabled": false,
      "soundId": "",
      "volume": 0.7,
      "pitch": 1
    }
  },
  "manager": {
    "globalCooldownTicks": 0,
    "maxCombo": 0,
    "selectionFloor": 0.65,
    "samePatternPenalty": 1,
    "recentPatternPenalty": 1,
    "sameRolePenalty": 1,
    "randomFactor": 0,
    "stationaryChainPenalty": 1,
    "recoveryMin": 8,
    "recoveryMax": 14
  },
  "phases": [
    {
      "index": 1,
      "id": "phase_1",
      "name": "Training",
      "enabled": true,
      "enterAtHealthRatio": 1,
      "transitionPatternId": ""
    }
  ],
  "hitboxes": [
    {
      "id": "training_sweep",
      "name": "Training Sweep",
      "shape": "sweep",
      "damage": 4,
      "radius": 2.4,
      "width": 1.5,
      "height": 1.8,
      "depth": 1.5,
      "thickness": 0.5,
      "yaw": 0,
      "pitch": 0,
      "offsetX": 0,
      "offsetY": 0,
      "offsetZ": 0,
      "sweepSteps": 6,
      "arcStartYaw": 90,
      "arcStartPitch": 20,
      "arcEndYaw": -90,
      "arcEndPitch": -20,
      "lockedTargetOnly": true,
      "effectId": "",
      "points": []
    }
  ],
  "patterns": [
    {
      "id": "basic_slash",
      "name": "Basic Slash",
      "enabled": true,
      "role": "melee",
      "trigger": {
        "type": "manager"
      },
      "priority": 10,
      "minPhase": 1,
      "maxPhase": 16,
      "minDistance": 0,
      "maxDistance": 2.7,
      "maxVertical": 2.5,
      "minBossHealth": 0,
      "maxBossHealth": 1,
      "minTargetHealth": 0,
      "maxTargetHealth": 1,
      "requiresLineOfSight": true,
      "targetRequired": true,
      "mobility": false,
      "stationary": true,
      "cooldownTicks": 40,
      "recoveryTicks": 8,
      "score": {
        "base": 10,
        "idealDistance": 2,
        "distancePeak": 0
      },
      "windup": {
        "id": "windup",
        "ticks": 24,
        "faceTarget": true,
        "stopHorizontal": true,
        "movement": {
          "type": "hold",
          "speed": 0
        },
        "animation": {
          "explicitSelection": true,
          "provider": "none",
          "id": "",
          "playback": "once",
          "speed": 1,
          "fadeTicks": 0
        },
        "events": []
      },
      "action": {
        "id": "action",
        "ticks": 16,
        "faceTarget": true,
        "stopHorizontal": true,
        "movement": {
          "type": "hold",
          "speed": 0
        },
        "animation": {
          "explicitSelection": true,
          "provider": "vanilla_swing",
          "id": "main_hand",
          "playback": "once",
          "speed": 1,
          "fadeTicks": 0
        },
        "events": [
          {
            "id": "strike",
            "at": 3,
            "interval": 0,
            "count": 1,
            "chancePercent": 100,
            "actions": [
              {
                "type": "dochi_battleworks:hitbox",
                "chancePercent": 100,
                "params": {
                  "hitboxId": "training_sweep",
                  "damageMultiplier": 1,
                  "knockback": 0.2,
                  "hitPolicy": "once_per_pattern"
                }
              },
              {
                "type": "dochi_battleworks:sound",
                "chancePercent": 100,
                "params": {
                  "soundId": "minecraft:entity.player.attack.sweep",
                  "volume": 1,
                  "pitch": 1
                }
              }
            ]
          }
        ]
      },
      "recovery": {
        "id": "recovery",
        "ticks": 24,
        "faceTarget": true,
        "stopHorizontal": true,
        "movement": {
          "type": "hold",
          "speed": 0
        },
        "animation": {
          "explicitSelection": true,
          "provider": "none",
          "id": "",
          "playback": "once",
          "speed": 1,
          "fadeTicks": 0
        },
        "events": []
      },
      "combos": []
    }
  ],
  "death": {
    "enabled": false,
    "durationTicks": 40,
    "lockCorpse": true,
    "events": []
  }
}
```

## 4. First values to edit

| JSON path | Change |
| --- | --- |
| patterns[0].windup.ticks | Preparation length |
| patterns[0].action.events[0].at | Contact time inside Action |
| patterns[0].recovery.ticks | Recovery stage length |
| patterns[0].cooldownTicks | Reuse after completion |
| patterns[0].minDistance / maxDistance | Horizontal start interval |
| hitboxes[0].damage | Shared damage |
| hitboxes[0].radius / thickness | Sweep reach and tube radius |
| combat.targeting.preferredDistance | Between-pattern spacing |

Change one value, save, reapply, and compare. Array index 0 means the first entry.

## 5. Validate references and timing

1. Every hitboxId must resolve to a hitbox.
2. Combo patternId and transitionPatternId must resolve to patterns.
3. Passives cannot own combos or be combo/transition destinations.
4. Keep IDs unique; event IDs must also be unique within their stage.
5. Event at must be within the stage.
6. Require `at + interval × (count - 1) ≤ stage.ticks`.
7. A hitbox stage needs a compatible animation or explicitSelection true with provider none.
8. Use only real skill, animation, sound, and particle IDs.

Use strict JSON without comments, trailing commas, or ellipses. Do not treat automatic clamping as proof that the original input was correct.

## 6. Particle reference fragment

This is one action for an event's actions array. particles/training_ring.json must already exist.

```json
{
  "type": "dochi_battleworks:particle_shape",
  "chancePercent": 100,
  "params": {
    "particleFile": "training_ring.json",
    "origin": "caster"
  }
}
```

One action starts the whole effect. Damage remains separate.

## 7. Important limits

| Item | Limit |
| --- | --- |
| Combat network JSON string | 524,288 characters |
| Phases | 16 |
| Patterns / hitboxes | 256 each |
| Events per stage | 128 |
| Actions per event | 32 |
| Params entries per action | 64 |
| Custom hitbox points | 12 |

The string limit is not the same as a universal 512-KiB file-size rule for all encodings. Compressed/chunked transport in 0.1.3 does not remove the document limit.

## 8. Source baseline and test scope

These guides were checked against the Forge 0.1.3 source on 2026-09-12: BattleworkDocument, BattleworkValidator, BattleworkRuntimeController, BattleworkStore, BattleworkNetwork, BattleworkAnimationPolicy, ParticleDocument, ParticleFiles, ParticleCommands, and editor controls/translations.

Current storage, animation, and additional-action behavior supersede the older 0.1.2 guide. Syntax/reference validation does not establish visual contact, provider compatibility, terrain behavior, or encounter balance. Use the [live-test checklist](#mob-editor/battleworks-troubleshooting).

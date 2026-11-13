---
title: Combat JSON référence et échantillon complet (Avancé)
slug: battleworks-json-reference
order: 285
description: Copiez un exemple complet et vérifiez les champs, les références, le calendrier et les limites.
product: mob-editor
section: reference
category: BattleWorks
status: Référence
version: 0.1.6
audience: Créateurs éditant directement JSON
tags:
  - battleworks
  - json
translationSource: en
translationMethod: assisted
---

## Lisez ceci lors de l'édition JSON directement

Les débutants peuvent suivre le [Éditeur Exercice](#mob-editor/battleworks-first-attack) Sans mémoriser le schéma. Cette page permet d'inspecter ou de modifier des fichiers externes.

Télécharger le [Échantillon complet de combat](./assets/media/battleworks/training_swordsman.json) et [échantillon de particules](./assets/media/battleworks/training_ring.json). Ils utilisent différents schémas et dossiers.

![Une première attaque enregistrée via l'écran BattleWorks.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Enregistrez d'abord un modèle dans l'éditeur, puis comparez son fichier et ses champs. Il n'est pas nécessaire d'entrer le JSON complet pour commencer.")

Pour une sauvegarde native courte avec des dégâts DNPC vérifiés, utilisez le first_sword télécharger en [première attaque ](#mob-editor/battleworks-first-attack). Continuer avec l'exercice [boss](#mob-editor/battleworks-encounters) pendant deux phases.

## 1. Champs de premier niveau

| Terrain | Objet |
| --- | --- |
| Schéma | dochi.battleworks.v1 pour le combat |
| id / displayName / activé | Identité, nom d'affichage, indicateur d'activation d'exécution |
| combat | Suppression d'attaque/script, ciblage, attente, BGM |
| npcStats | Attribut de combat facultatif ; désactivé par défaut |
| manager | Sélection ordinaire, répétition, combos, stimulation |
| phases | Phases de santé et liens de transition |
| hitboxes | Géométrie réutilisable |
| patrons | Conditions, score, étapes, événements, combos |
| décès | Chronologie des décès |
| création | Notes de créateur conservées |
| drmNpcModel | DRM instantané de modèle appliqué à un PNJ réel |
| previewNpcModel / previewTexture | Données à prévisualisation individuelle |
| particleEffects | Anciennes données de compatibilité des effets en ligne |

Le nouveau travail sur les particules devrait utiliser une référence particleFile distincte. Préparez le nom, l'équipement, les factions, les drops et les respawn dans l'éditeur appartenant à votre PNJ : l'éditeur propre de DNPC ou l'éditeur d'héritage supporté CustomNPCs. Importé npcStats peut remplacer le comportement santé/vitesse/régénération sélectionné. Conservez les données inconnues et les instantanés de modèles opaques lors de la modification de documents existants.

## 2. Appliquer l'échantillon

1. Enregistrez l'objet complet ci-dessous ou téléchargez-le.
2. Placez-le à config/dochi_rpg_maker/mobs/patterns/training/training_swordsman.json.
3. Préparez un humanoïde normal DNPC ou un acteur soutenu CustomNPCs, une épée et des statistiques de base.
4. Charger et vérifier la validation.
5. Appliquer et tester dans Survival.

L'échantillon n'a pas besoin de fournisseur optionnel de sorts ou d'animation. Le swing main-main cible les humanoïdes normaux, pas les modèles de Gecko ou d'entités modifiées. L'analyse de repli est activée dans cet exemple. Après l’édition dans Creative, passez à Survival pour vérifier l’acquisition de la cible, la visibilité, la portée et les attaques réelles.

## 3. Document de combat complet

Il s'agit d'un objet JSON complet sans commentaire ni omission. Les dégâts 4 sont configurés avant les défenses.

```json
{
  "schema": "dochi.battleworks.v1",
  "id": "training_swordsman",
  "displayName": "Training Swordsman",
  "enabled": true,
  "description": "BattleWorks 0.1.6 teaching sample. Normal humanoid DNPC or supported legacy actor; fallback target scanning enabled.",
  "combat": {
    "suppressNativeAttacks": true,
    "suppressCustomNpcScripts": false,
    "engageDelayMin": 10,
    "engageDelayMax": 18,
    "combatResetDelayTicks": 100,
    "retryDelayTicks": 10,
    "targeting": {
      "scanWhenNoTarget": true,
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

## 4. Les premières valeurs à éditer

| Chemin JSON | Changement |
| --- | --- |
| 0[modifier modifier le code] | Longueur de préparation |
| patterns[0].action.events[0].at | Temps de contact à l'intérieur Action |
| patterns[0].recovery.ticks | Longueur de l'étape de récupération |
| modèles 0].cooldownTicks | Réutiliser après achèvement |
| modèles 0].minDistance / maxDistance | Intervalle de démarrage horizontal |
| [0][modifier le code] | Dommages partagés |
| hitboxes0].radius / epaisseur | Portée et rayon du tube |
| combat.targeting.preferredDistance | Espacement entre les motifs |

Modifiez une valeur, enregistrez, réappliquez et comparez. L'index de tableau 0 signifie la première entrée.

## 5. Valider les références et le timing

1. Chaque hitboxId doit se résoudre à une hitbox.
2. Combo patternId et transitionPatternId doivent se résoudre à des modèles.
3. Les passifs ne peuvent pas posséder de combos ou être des destinations de transition.
4. Gardez les identifiants uniques; les identifiants d'événement doivent également être uniques dans leur scène.
5. L'événement doit être dans la scène.
6. Nécessite `at + interval × (count - 1) ≤ stage.ticks`.
7. Un stade hitbox a besoin d'une animation compatible ou explicitSelection vrai avec aucun fournisseur.
8. N'utilisez que des identifiants réels de compétences, d'animation, de son et de particules.

Utilisez un JSON strict sans commentaires, virgules traînantes ou ellipses. Ne traitez pas le serrage automatique comme une preuve que l'entrée originale était correcte.

## 6. Fragment de référence des particules

Il s'agit d'une action pour le tableau d'actions d'un événement.training_ringLe .json doit déjà exister.

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

Une action déclenche l'effet complet. Les dommages restent séparés.

## 7. Limites importantes

| Poste | Limite |
| --- | --- |
| Chaîne JSON du réseau de combat | 524,288 caractères |
| Phases | 16 |
| Motifs / hitboxes | 256 chaque |
| Evénements par étape | 128 |
| Actions par événement | 32 |
| Entrées de paramètres par action | 64 |
| Points de hitbox personnalisés | 12 |

La limite de chaîne n'est pas la même qu'une règle universelle de taille de fichier 512-KiB pour tous les encodages. Le transport compressé en 0.1.5 ne supprime pas la limite de document.

## 8. Source de référence et portée de l ' essai

L'audit détaillé original utilisait la source Forge 0.1.3 sur 2026-09-12 : BattleworkDocument, BattleworkValidator, BattleworkRuntimeController, BattleworkStore, BattleworkNetwork, BattleworkAnimationPolicy, ParticleDocument, ParticleFiles, ParticleCommands, et les contrôles/traductions des éditeurs. Le guide d'installation a été mis à jour à 0.1.4 le 2026-10-11, puis au courant 0.1.5 avec l'installation Fabric sur 2026-10-24.

Le stockage actuel, l'animation et le comportement d'action supplémentaire remplacent l'ancien guide 0.1.2. La validation de la syntaxe/référence n'établit pas de contact visuel, de compatibilité avec les fournisseurs, de comportement du terrain ou d'équilibre des rencontres. Utilisez la [liste de contrôle du test en direct](#mob-editor/battleworks-troubleshooting).

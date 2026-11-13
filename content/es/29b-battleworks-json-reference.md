---
title: Referencia JSON de combate y muestra completa (Avanzado)
slug: battleworks-json-reference
order: 285
description: Copia un ejemplo completo y comprueba los campos, las referencias, el tiempo y los límites.
product: mob-editor
section: reference
category: BattleWorks
status: Referencia
version: 0.1.7
audience: Creadores editando JSON directamente
tags:
  - battleworks
  - json
translationSource: en
translationMethod: assisted
---

## Lea esto al editar JSON directamente

Los principiantes pueden seguir el ejercicio [editor](#mob-editor/battleworks-first-attack) sin memorizar el esquema. Esta página es para inspeccionar o modificar archivos externos.

Descargue la [muestra de combate completa](./assets/media/battleworks/training_swordsman.json) y [muestra de partículas](./assets/media/battleworks/training_ring.json). Utilizan diferentes esquemas y carpetas.

![Un primer ataque guardado a través de la pantalla BattleWorks.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Guarde un patrón a través del editor primero, luego compare su archivo y campos. Ingresar el JSON completo a continuación no es necesario para comenzar.")

Para un corto salvamento nativo con daño verificado DNPC, usa la descarga first_sword en [primer ataque](#mob-editor/battleworks-first-attack). Continúe con el ejercicio [boss](#mob-editor/battleworks-encounters) durante dos fases.

## 1. Campos de nivel superior

| Campo | Finalidad |
| --- | --- |
| esquema | dochi.battleworks.v1 para el combate |
| id / displayName / habilitado | Identidad, nombre de visualización, indicador de habilitación en tiempo de ejecución |
| combate | Supresión de ataque/script, focalización, espera, BGM |
| npcStats | Anulaciones de atributos de combate opcionales; deshabilitadas por defecto |
| gerente | Selección ordinaria, repetición, combos, ritmo |
| fases | Fases de salud y enlaces de transición |
| Cajas de éxito | Geometría reutilizable |
| patrones | Condiciones, puntuación, etapas, eventos, combos |
| muerte | Muerte línea de tiempo |
| autoría | Notas conservadas del creador |
| drmNpcModel | DRM snapshot del modelo aplicado a un NPC real |
| previewNpcModel / previewTexture | Datos de vista previa separada |
| particleEffects | Datos de compatibilidad de efecto en línea más antiguos |

El nuevo trabajo de partículas debe usar una referencia particleFile separada. Prepara el nombre, el equipo, las facciones, las gotas y reaparece en el editor perteneciente a tu NPC: el editor propio de DNPC o el editor heredado compatible CustomNPCs. Importado npcStats puede anular el comportamiento de salud/velocidad/regeneración seleccionado. Conservar datos desconocidos e instantáneas de modelos opacos al editar documentos existentes.

## 2. Aplicar la muestra

1. Guarde el objeto completo abajo o descárguelo.
2. Ponlo en config/dochi_rpg_maker/mobs/patterns/training/training_swordsman.json.
3. Preparar un humanoide normal DNPC o apoyado legado CustomNPCs actor, una espada y estadísticas de base.
4. Carga y comprobación de validación.
5. Aplicar y probar en Supervivencia.

La muestra no necesita ningún hechizo opcional o proveedor de animación. El swing de la mano principal se dirige a los humanoides normales, no a los modelos Gecko o entidades modificadas. En este ejemplo, se habilita el análisis de respaldo. Después de editar en Creative, cambia a Survival para comprobar la adquisición de objetivos, la visibilidad, el alcance y los ataques reales.

## 3. Documento de combate completo

Este es un objeto JSON completo sin comentarios u omisiones. El daño 4 se configura antes de las defensas.

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

## 4. Primeros valores a editar

| Ruta JSON | Cambiar |
| --- | --- |
| patrones0.windup.ticks | Longitud de preparación |
| patrones0.action.events[0].at | Tiempo de contacto dentro de Acción |
| patrones0 .recuperación.ticks | Longitud de la etapa de recuperación |
| 0]. cooldownTicks | Reutilización después de la finalización |
| patrones[0].minDistance / maxDistance | Intervalo de inicio horizontal |
| Hitboxes[0. daños | Daño compartido |
| cajas de golpe[0.radius / grueso | Alcance de barrido y radio del tubo |
| combate.targeting.preferredDistance | Espaciamiento entre patrones |

Cambie un valor, guarde, vuelva a aplicar y compare. El índice de matriz 0 significa la primera entrada.

## 5. Validar referencias y tiempos

1. Cada hitboxId debe resolver a un hitbox.
2. Combo patternId y transitionPatternId debe resolver a los patrones.
3. Los pasivos no pueden poseer combos o ser destinos de combinación/transición.
4. Mantenga los ID únicos; Los ID de eventos también deben ser únicos dentro de su etapa.
5. El evento debe estar dentro de la etapa.
6. Requerir `at + interval × (count - 1) ≤ stage.ticks`.
7. Un escenario hitbox necesita una animación compatible o explicitSelection true con proveedor ninguno.
8. Usa solo habilidades reales, animación, sonido y identificadores de partículas.

Usa JSON estricto sin comentarios, comas o elipses. No trate la sujeción automática como prueba de que la entrada original era correcta.

## 6. Fragmento de referencia de partículas

Esta es una acción para la matriz de acciones de un evento. particles/training_ring.json ya debe existir.

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

Una acción inicia todo el efecto. El daño permanece separado.

## 7. Límites importantes

| Artículo | Límite |
| --- | --- |
| Cadena JSON de red de combate | 524,288 caracteres |
| Fases | 16 |
| Patrones / Hitboxes | 256 cada uno |
| Eventos por etapa | 128 |
| Acciones por evento | 32 |
| Parámetros entradas por acción | 64 |
| Puntos de hitbox personalizados | 12 |

El límite de cadena no es el mismo que una regla de tamaño de archivo universal 512-KiB para todas las codificaciones. El transporte comprimido/troquelado en 0.1.5 no elimina el límite del documento.

## 8. Fuente de referencia y alcance de la prueba

La auditoría detallada original utilizó la fuente Forge 0.1.3 en 2026-09-12: BattleworkDocument, BattleworkValidator, BattleworkRuntimeController, BattleworkStore, BattleworkNetwork, BattleworkAnimationPolicy, ParticleDocument, ParticleFiles, ParticleCommands y controles / traducciones del editor. La guía de instalación se actualizó a 0.1.4 en 2026-10-11, luego a actual 0.1.5 con Fabric instalación en 2026-10-24.

El almacenamiento actual, la animación y el comportamiento de acción adicional reemplazan a la guía anterior 0.1.2. La validación de sintaxis/referencias no establece contacto visual, compatibilidad con el proveedor, comportamiento del terreno o equilibrio del encuentro. Utilice la [lista de verificación de prueba en vivo](#mob-editor/battleworks-troubleshooting).

La guía actual de 0.1.7 también cubre edición independiente, recetas, técnicas reutilizables, avisos vinculados y reinicio de arena. El combate sigue usando dochi.battleworks.v1; no inventes otra versión de esquema para estas funciones. Las descripciones de ejemplos y versiones de capturas antiguas indican su origen histórico.

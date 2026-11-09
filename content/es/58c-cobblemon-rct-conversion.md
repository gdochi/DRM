---
title: Convierte entrenadores RCT a DNPC
slug: cobblemon-rct-conversion
order: 582
product: drm-cobblemon-editor
section: trainer
category: Trainer Conversion
status: Usage guide
version: Fabric / NeoForge 0.2.9
description: Elige la IA original RCT o DRM y distingue creación, sustitución y exportación.
translationSource: en
translationMethod: assisted
---

## ¿Qué hace la conversión?
Cobblemon Editor 0.2.9 lee los datos activos de **Radical Cobblemon Trainers** del servidor y los convierte en entrenadores DNPC o perfiles editables. RCT es opcional para crear entrenadores normales. Conservar su IA exige una RCT API compatible; crear o sustituir entidades DNPC también requiere DNPC.

## Abre la conversión
1. Abre **Add-on → Cobblemon Editor** en DRM.
2. Pulsa **Port Radical Trainers** para abrir **Radical Trainer Porting**.
3. Busca por nombre o ID y marca los entrenadores. La lista usa los datapacks activos del servidor y tiene paginación.
4. Elige **Battle AI** y **Conversion target** antes de convertir. Empieza con uno para comparar el resultado.

## Elige la IA
| Opción | Resultado |
| --- | --- |
| **Keep original RCT AI** | Conserva la IA, bolsa de objetos y reglas RCT originales. Es el valor predeterminado. |
| **Convert to DRM AI** | Usa el equipo y objetos importados con decisiones y políticas DRM. |

RCT conservado es independiente de las políticas de objetos y mecánicas de DRM Strategy. Consulta [IA y objetos](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items).

## Elige creación, sustitución o archivos
| **Conversion target** | Uso |
| --- | --- |
| **Create DNPC trainers** | Crea DNPC cercanos con apariencias predeterminadas, hasta 64 por operación. |
| **Replace matching RCT NPCs within 64 blocks** | Sustituye NPC RCT a 64 bloques cuyo ID coincide con la selección. Omite los que están en combate y otros casos no válidos. |
| **Save trainer profiles only** | Guarda JSON sin crear ni sustituir entidades. |

Los perfiles van en **config/dochi_rpg_maker/cobblemon/trainers/radical_ported/**. Antes de sustituir un NPC, su tipo, dimensión y NBT originales se guardan en **config/dochi_rpg_maker/cobblemon/rct_conversion_backups/**. Es un registro original, no una interfaz de deshacer automática.

## Comprueba el resultado
Revisa las cantidades de éxito y fallo y el nombre, equipo, objetos equipados y modo de IA del nuevo NPC. Personaliza su aspecto en el [editor de NPC](#dochi-npc-core/npc-core-editor). Para perfiles exportados, continúa con NPC Apply en [primer entrenador](#drm-cobblemon-editor/cobblemon-editor-setup).

Si falta un entrenador, revisa los datapacks activos. Si se rechaza conservar RCT, instala una API compatible o elige DRM. Pasos verificados en el código; el entorno de grabación no tenía RCT, así que no se incluye un vídeo de conversión RCT completada.

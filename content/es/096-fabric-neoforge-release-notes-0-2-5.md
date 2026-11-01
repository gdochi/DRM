---
title: Fabric y NeoForge 0.2.5 Actualización
slug: release-notes-0-2-5
order: 6
description: Favoritos del editor, texturas NPC externas y nuevas conexiones de complementos.
product: core-fabric
category: Inicio
section: getting-started
status: Guía de uso
version: 0.2.5
audience: Creadores / operadores
translationSource: en
translationMethod: assisted
---

Este es un registro de liberación histórico. Ver [ DRM 0.3.1 ](#core-fabric/release-notes-0-3-1) para la dirección actual.

## Volver a través de Favoritos

Haz clic en la estrella junto a un editor y búscalo en Favoritos. Favorites te ayuda a reabrir las herramientas; aplicar una conversación o una tienda a un NPC es un paso aparte. Continuar con el [guía actual](#core-fabric/quick-start) para guardarlo y aplicarlo.

![Volver a través de Favoritos.](assets/media/guides/drm-031-neo1211/editor-selector.png "DRM 0.3.1 / NeoForge 1.21.1. Esta es la característica relacionada en la compilación de producción actual, no una captura de la interfaz de usuario histórica descrita a continuación.")

## Instalación en esta versión

DRM Núcleo para Minecraft 1.21.1 / Java 21 fue **0.2.5** en Fabric y NeoForge. Ambos usan la documentación compartida; elija los JAR y las dependencias del cargador coincidente. Ver [instalación](#core-fabric/installation).

## Favoritos y texturas

- Utilice ☆/★ para administrar los favoritos del editor y abrirlos desde Favoritos. `config/dochi_rpg_maker/editor_favorites.json` es local a la instancia de juego.
- Los PNGs del activo del servidor y las texturas del paquete de recursos se resuelven por separado, con la carga de las reservas. Se ha mejorado la vista previa de Gecko y las texturas externas de world-NPC.
- Fabric El flujo de trabajo de selección de textura externa y vista previa de NPC Basic ahora sigue la línea de base Forge. Almacenar imágenes en `assets/textures/` y conectar sus identificadores de recursos DRM.

## Complementos relacionados

| Addon | Guía actual |
| --- | --- |
| Cobblemon Editor 0.2.4 | [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler), etapas en bloque/FX, entrenadores y NPCs de servicio |
| Minijuegos 0.1.0 | [Monty Hall, ranuras y memoria](#dochi-minigames/minigames-setup), entradas/recompensas y encuadernaciones NPC/diálogo |
| MapIcon Integración 0.1.0 | [ Iconos del mapa Xaero](#dochi-mapicon-integration/mapicon-setup), reglas JSON y configuraciones por NPC |

Instale cada complemento por separado y satisfaga la dependencia requerida de Core CustomNPCs. El registro anterior [0.2.4](#core-fabric/release-notes-0-2-4) permanece disponible para el reloj de reabastecimiento y los cambios en la GUI.

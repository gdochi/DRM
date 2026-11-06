---
title: Qué hay de nuevo en 0.2.9
slug: cobblemon-editor-current-update
order: 480
description: Cambios en las recompensas secuenciales, DNPC roles y el movimiento de los entrenadores.
product: drm-cobblemon-editor
category: Primeros pasos
section: overview
status: Estable
version: Fabric / NeoForge 0.2.9
audience: Creadores / Operadores
translationSource: en
translationMethod: assisted
hiddenNav: true
---

## Recompensas después del diálogo

![Después de los controles de acciones para el pedido posterior a la batalla.](assets/media/guides/cobble-029-neo1211/cobble-after-actions.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, Inglés UI. Abre Configuración de batalla → después de acciones y elige el modo Acción. Esta foto muestra el modo Todo inicial con cero acciones, no una ejecución de diálogo y recompensa secuencial completa.")

Para obtener recompensas después del diálogo, elija **Sequential** y coloque la acción de diálogo antes de su recompensa. Esto coordina la finalización del diálogo con el pago posterior.

**Sequential** después de las acciones esperar hasta que el diálogo termina antes de otorgar recompensas posteriores. Después de la cancelación/desconexión, la siguiente interacción NPC puede continuar las acciones restantes.

Cada ronda permite una acción de diálogo. Véase [configurar los pasos](#drm-cobblemon-editor/cobblemon-trainer-editor).

## DNPC Funciones

DNPC es compatible con Entrenador, Pokémon mismo, Pokémon apariencia, PokéMart, Enfermera Joy y Selector de inicio, además de conexiones clon / spawner / programador de batalla.

Los entrenadores pueden correr y regresar mientras DNPC **Position lock** está habilitado. Las correcciones también abordan la velocidad del tablero sobrante y la falta de retorno después de un diálogo cancelado.

## Características llevadas a cabo

Incluye mejoras de IA de batalla de 0.2.7, selección de movimiento completo y Cobblemon 1.8.4 trabajo de compatibilidad. Mecánicas adicionales como Mega Evolution necesitan sus respectivos mods y elementos clave.

## Actualizar archivos

Para Fabric/NeoForge en Minecraft 1.21.1. Utilice parches de cargador coincidentes actuales de DRM Core, DNPC y Cobblemon Editor juntos para estas características. Ver [instalación](#drm-cobblemon-editor/cobblemon-editor-setup).

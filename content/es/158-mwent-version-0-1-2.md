---
title: 0.1.2 — tarjetas sin cambios y estabilidad
slug: version-0-1-2
order: 1580
description: Cero tarjetas nuevas o reequilibradas, la interfaz de usuario y el trabajo de estabilidad del servidor, y más tarde 26.3 cargas.
product: mwent
category: Historial de lanzamientos
section: card-history
status: Registro de liberación pública
version: 0.1.2
audience: Jugadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Carga pública

CurseForge recibió [Fabric 1.21.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309263), [ NeoForge 1.21.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309269) y [Forge 1.20.1 ](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309265) en octubre 24, 2026. La misma 0.1.2 versión ganada [ Fabric 26.3 ](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9317314) y [ NeoForge 26.3 ](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9317311) subidas en octubre 25.

## Adiciones y cambios de tarjetas

| Comparación | 0.1.1 → 0.1.2 |
| --- | --- |
| Tarjetas añadidas/eliminadas | Cero / cero |
| Definiciones incorporadas | 263 → 263 |
| Definiciones de modificaciones opcionales | 89 → 89 |
| Grabados regulares y animados | 704 → 704 |
| Cambios de potencia, provisiones, marco o rareza | Cero |
| Despliegue, orden, palabra clave o cambios de referencia de apariencia | Cero |

Estos valores comparan los catálogos finales incorporados y opcionales de los **actuales subidos Fabric 1.21.1 JAR**, en lugar de estimar el historial de la fuente actual. Sin tarjetas añadidas, la línea de base [0.1.1](#mwent/version-0-1-1) continúa.

## Gameplay y estabilidad del servidor

![Barra de herramientas actual de la cubierta y controles de cantidad.](assets/media/guides/minigames-016-neo1211/mwent016-deck-catalog.png "Pantalla actual 0.1.6 / NeoForge 1.21.1. Cambiar mazo, Default match y Begin match están separados de los controles de cantidad de cartas. Las notas de estabilidad debajo se refieren a 0.1.2; esta no es una captura de pantalla capturada en esa versión.")

Para los controles actuales, siga [colecciones y mazos](#mwent/cards-decks) desde la edición hasta el inicio del partido.

Los registros de implementación 0.1.2 confirman las reparaciones de los controles de la barra de herramientas de selección de mazos superpuestos, la visualización de la piel del jugador en los vestíbulos de las tablas y las vistas previas de los aldeanos en las pantallas de IA no asignadas. El inicio de un perfil de IA no asignado permanece desactivado.

El trabajo del servidor reduce las copias de estado repetidas y duplica las transmisiones del mismo tick, suprime las transmisiones innecesarias para entradas PvP no válidas, distribuye las decisiones de IA a través de ticks y detiene las transmisiones periódicas sin cambios después de que finalicen las coincidencias. Estos son mejoras de procesamiento y visualización en lugar de potencia de tarjeta o aprovisionamiento de mejoras y nerfs.

La carga 26.3 es un objetivo separado de Java 25. No lo sustituyas por un archivo 1.21.1. La comparación histórica de artefactos no establece compatibilidad en tiempo de ejecución con combinaciones arbitrarias de mods externos.

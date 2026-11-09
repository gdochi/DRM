---
title: Crear Pokémon NPCs
slug: cobblemon-editor-overview
order: 500
description: Elija entrenadores, Pokémon tiendas, curanderos o NPC de inicio.
product: drm-cobblemon-editor
category: Sinopsis
section: overview
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Edificio de creadores Cobblemon PNJs y tiendas
tags:
  - cobblemon
  - customnpcs
  - overview
translationSource: en
translationMethod: assisted
---

## Novedades de 0.2.9: sigue los vídeos
| Objetivo | Guía |
| --- | --- |
| Crear y entregar medallas o trofeos | [Medallas y condiciones de posesión](#drm-cobblemon-editor/cobblemon-badges) |
| Personalizar efectos de obtención y selección | [Presentaciones y GUI](#drm-cobblemon-editor/cobblemon-badge-presentations) |
| Convertir entrenadores RCT a DNPC | [Conversión RCT](#drm-cobblemon-editor/cobblemon-rct-conversion) |
| Configurar Pokémon Alpha y estadísticas | [Vídeo del equipo](#drm-cobblemon-editor/cobblemon-trainer-editor) |

![Renombra una copia del conjunto de ejemplo y guarda en el servidor.](assets/media/guides/cobble-release-20261109/badge-create.mp4 "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, inglés. La guía explica activación, copia y recompensas.")

## ¿Qué te gustaría hacer?

| Objetivo | Herramienta |
| --- | --- |
| Un entrenador con un equipo Pokémon | **Cobblemon Editor → Trainer** |
| A Pokémon que lucha directamente | **Cobblemon Editor → Pokemon Itself** |
| Pokémon ventas, comercios y subastas | **PokéMart Editor** |
| equipo de curación | **Nurse Joy Editor** |
| Elegir una primera Pokémon | **Starter Selector Editor** |
| Una entrada antes de una batalla | **Battle Presentation Maker** |

Haga clic con el botón derecho del ratón en DRM Core y elija una herramienta en **Add-on**. Crear NPCs con DNPC o CustomNPCs.

![Editor real para el equipo del entrenador Pokémon.](assets/media/guides/cobble-029-neo1211/cobble-party.png "Elige especies y niveles, configura la batalla y luego aplícala a un NPC. Versión 0.2.9 / NeoForge 1.21.1, Inglés UI.")

## Comience con un entrenador

Sigue [instalación y la primera batalla](#drm-cobblemon-editor/cobblemon-editor-setup). Dar al entrenador uno Pokémon, guardar, aplicar a un NPC y hablar con las dos manos vacías.

A continuación, elija [ equipos y rondas](#drm-cobblemon-editor/cobblemon-trainer-editor), [AI y mecánicas](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items) y [reglas de batalla](#drm-cobblemon-editor/cobblemon-battle-rules).

## Añadir diálogo y recompensas

Agregue un saludo antes de la batalla o dé recompensas después del diálogo posterior a la batalla. Ver [ condiciones y post-acciones](#drm-cobblemon-editor/cobblemon-conditions-rewards-pokemon).

Establece la disponibilidad de revancha y los períodos de espera en [encuentros y revanchas](#drm-cobblemon-editor/cobblemon-encounters-rematches).

## Varios roles en un PNJ

La interacción mano-vacío puede abrir el diálogo o una tienda primero. Usa una acción **go_battle** en el diálogo para comenzar su batalla. **Shift+right-click** accede a roles dedicados cuando otro rol aplicado toma la interacción normal.

El uso de NPC separados para sus primeros roles hace que la interacción sea más fácil de seguir.

## Plataformas

Para **Minecraft 1.21.1, Fabric or NeoForge**. DRM y Cobblemon se requieren; uso DNPC o CustomNPCs para funciones de NPC. Vean el [mesa de instalación](#drm-cobblemon-editor/cobblemon-editor-setup).

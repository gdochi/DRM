---
title: Empezando con BattleWorks
slug: mob-editor-overview
order: 210
description: Una ruta de aprendizaje desde la instalación hasta un primer ataque, fases de jefe y efectos de partículas.
product: mob-editor
section: start
category: BattleWorks
status: Guía
version: 0.1.7
audience: Principiantes y creadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## Empieza con un ataque cuerpo a cuerpo claro

BattleWorks **0.1.7** permite crear tiempos de ataque, hitboxes, movimiento y fases de jefes para NPC. Usa el archivo correspondiente: Forge 1.20.1, Fabric / NeoForge 1.21.1 o las compilaciones separadas de Fabric / NeoForge 26.3.

**DRM es opcional.** Abre los editores con BattleWorks Wand y crea archivos sin un NPC conectado. Para ejecutar un combate necesitas un actor compatible, como DNPC. CustomNPCs sigue siendo opcional en versiones anteriores y está excluido desde 26.3.

Empieza por [edición simple y recetas](#mob-editor/battleworks-authoring), o sigue el ejercicio detallado de abajo. El movimiento básico del brazo y una hitbox no necesitan mods externos de magia o animación.

## Siga este camino de aprendizaje

| Paso | Guía | Comprobación de finalización |
| --- | --- | --- |
| 1 | [Instalación y preparación de PNJ](#mob-editor/mob-editor-setup) | Abre BattleWorks con tu NPC seleccionado. |
| 2 | [Tu primer ataque cuerpo a cuerpo](#mob-editor/battleworks-first-attack) | El PNJ se acerca, prepara, golpea y se recupera. |
| 3 | [Espacio de trabajo y tiempo](#mob-editor/mob-editor-patterns) | Mueva una acción a otra marca. |
| 4 | [Equipos de juego](#mob-editor/battleworks-hitboxes) | Ajusta el daño, el tamaño y la ubicación por separado. |
| 5 | [Modelo de animación](#mob-editor/battleworks-animation) | Alinear el contacto con el movimiento del modelo. |
| 6 | [Objetivo](#mob-editor/mob-editor-detection-patrol) y [movimiento](#mob-editor/battleworks-movement) | Aproximación y retirada sin movimiento conflictivo. |
| 7 | [Selección y fases](#mob-editor/mob-editor-phases), [pasivos](#mob-editor/battleworks-passives) | Añade variedad y reacciones de salud. |
| 8 | [Ejercicio de jefe en dos fases](#mob-editor/battleworks-encounters) | Combina las características en un solo encuentro. |

Continúe con [habilidades y presentación](#mob-editor/battleworks-skills-effects), [Particle Maker](#mob-editor/battleworks-particles) y [acciones avanzadas](#mob-editor/battleworks-advanced-actions) cuando el encuentro básico funcione.

## Dónde configurar cada función

![Inspector Simple edit y cronología del ataque.](assets/media/guides/battleworks-017-20261113/simple-edit.png "BattleWorks 0.1.7 / NeoForge 1.21.1 / DRM 0.3.2 / DNPC 0.1.4. Basic Slash predeterminado seleccionado. La imagen muestra la distribución del editor, no la creación mediante receta ni daño real.")

Usa **Pattern Workbench** para la secuencia, **Hitbox Library** para la geometría de daño y **Combat Rules** para objetivos, fases y arena. **Simple edit** reúne los valores habituales; **Detailed edit** conserva y muestra todas las condiciones, eventos, movimiento y animación. [Recetas y My techniques](#mob-editor/battleworks-authoring) proporcionan puntos de partida reutilizables.

| Tarea | Editor |
| --- | --- |
| Nombre, salud base, equipo, relaciones, botín y reaparición | Editor del propio actor, como DNPC |
| Apariencia y modelo | DNPC Appearance & Model o proveedor instalado; DRM NPC Basic para modelos DRM |
| Patrones, hitboxes, tiempos, movimiento y fases | BattleWorks |
| Archivos reutilizables de efectos visuales | Particle Maker en el selector independiente o en Visual de DRM |
| Popups y diálogos DRM | DRM y sus herramientas de popup/GUI |

Los documentos importados pueden activar npcStats para sustituir atributos de combate. Revísalos si aplicar un jefe cambia su salud o movimiento.

## Cinco términos que usarás

| Plazo | Significado |
| --- | --- |
| Trabajos de batalla | Un documento de combate. Varios NPC pueden hacer referencia al mismo archivo de servidor. |
| Patrón | Un movimiento, como un corte o una retirada. |
| Etapa | Caída, acción o recuperación dentro de un patrón. |
| Acciones / eventos programados | Acciones que comparten un tiempo de ejecución y repiten la programación. |
| Caja de golpeo | El espacio probado en busca de daños, creado por separado del arma visible. |

A la velocidad normal del servidor, **20 las marcas son de aproximadamente un segundo**.

## Recuerda estas tres reglas

1. Las imágenes y los daños están separados. Un efecto de partícula o oscilación del brazo no crea una caja de golpe BattleWorks.
2. Guarde el archivo y conéctelo al NPC. Save As solo no vincula el NPC a la nueva ruta.
3. Prueba en el mundo después de usar la simulación. El ensayo muestra el movimiento y la ubicación de la caja de golpe; no ejecuta IA real, daños, comandos, sonidos o hechizos externos.

Utilice [ troubleshooting](#mob-editor/battleworks-troubleshooting) cuando un paso falla y [ archivos y muestras](#mob-editor/battleworks-files) antes de importar el encuentro de otra persona.

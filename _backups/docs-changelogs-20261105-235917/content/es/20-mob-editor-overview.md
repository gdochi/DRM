---
title: Empezando con BattleWorks
slug: mob-editor-overview
order: 210
description: Una ruta de aprendizaje desde la instalación hasta un primer ataque, fases de jefe y efectos de partículas.
product: mob-editor
section: start
category: BattleWorks
status: Guía
version: 0.1.6
audience: Principiantes y creadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## Comience con un ataque cuerpo a cuerpo legible

BattleWorks **0.1.6** es el complemento de combate NPC de DRM para Forge 1.20.1, Fabric / NeoForge 1.21.1 y compilaciones separadas 26.3. Tiempo de combate del autor, hitboxes, movimiento y fases.

Los ejercicios a continuación usan **Forge 1.20.1 and CustomNPCs**. Verifique [0.1.6 los límites de instalación](#mob-editor/battleworks-update-0-1-6) para otros cargadores y 26.3 DNPC.

Comience con un ataque cuerpo a cuerpo lento en un NPC humanoide normal; los mods opcionales de hechizo y animación son innecesarios para el primer ejercicio.

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

## A dónde pertenece cada escenario

![BattleWorks Banco de trabajo de patrón con patrones a la izquierda, Windup/Action/Recovery en el centro y propiedades de patrón/etapa seleccionadas a la derecha.](assets/media/guides/battleworks-016-neo1211/workbench.png "El ejemplo por defecto de Basic Slash en BattleWorks 0.1.6 en NeoForge 1.21.1. Seleccione un patrón a la izquierda, una etapa en el medio y luego edite sus propiedades a la derecha.")

Usa **Pattern Workbench** para la secuencia de ataque, **Hitbox Library** para la forma que inflige daño y **Combat Rules** para perseguir y seleccionar patrones. Para construir un primer ataque respondiendo preguntas, comience con **Create New → Pattern Build Assist**. La asistencia se desactiva después de cargar un ejemplo existente.

| Tarea | Editor |
| --- | --- |
| PNJ salud, equipo, facciones, caídas, reaparición | CustomNPCs |
| Modelos, texturas, activos de animación y mapeos de comportamiento | DRM PNJ básico |
| Patrones, hitboxes, tiempo de combate, movimiento, fases | BattleWorks |
| Archivos de partículas visuales reutilizables | Visual → Creador de partículas |
| Apariencia emergente y presentación de diálogo | DRM Popup Maker y su GUI |

Los documentos importados avanzados también pueden habilitar `npcStats` para anular los atributos de combate seleccionados. Los ejercicios para principiantes dejan esa función desactivada y preparan estadísticas base en CustomNPCs.

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

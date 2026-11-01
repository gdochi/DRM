---
title: Conectar escenas de diálogo y respuestas
slug: dialogue-nodes-choices
order: 62
description: Conecta la ruta de apertura, las líneas NPC y las respuestas del jugador.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guía
version: 0.3.1
audience: Creadores de diálogo
translationSource: en
translationMethod: assisted
---

## Conectar un saludo a una respuesta

Haga un nodo general para el saludo y otro para su respuesta. Punto **comienzo → Rutas** al saludo. En el saludo de **Choices**, escriba una respuesta y darle una **Goto** acción que apunta a la respuesta. Agrega una respuesta **Close** por separado para dejar la conversación.

![Plano de inicio de vinculación, el saludo y la respuesta.](assets/media/guides/drm-031-forge1201/dialogue-blueprint.png "DRM 0.3.1 / Forge 1.20.1. start es la entrada; los nodos generales son escenas visibles. Las líneas de conexión muestran a dónde conducen las rutas y las respuestas.")

El [primer ejercicio de diálogo completo](#core/dialogue-system) abarca Save As, NPC Apply y la navegación de respuesta real. En el artefacto verificado Forge 0.3.1, algunas selecciones de tipo de acción no pueden cambiar el tipo; use la ruta de carga de ejemplo probada en [ condiciones y acciones](#core/conditions-actions).

## Elige la escena de apertura

Cada conjunto tiene ** un nodo de inicio**. Sus rutas se comprueban de arriba a abajo, y una ruta elegible elige la primera escena u otra acción de apertura. Ponga un saludo condicional específico por encima de un fallback general.

| Parte | Finalidad |
| --- | --- |
| Inicio de ruta | Elige dónde comienza la interacción |
| nodo general | Mostrar una línea NPC y las respuestas del jugador |
| condición de elección | Decida si una respuesta es visible |
| acción de elección | Decide qué sucede cuando se hace clic en él |

Las condiciones controlan la disponibilidad; no realizan la acción de la respuesta simplemente mostrándola.

## Elige lo que hace una respuesta

| Resultado deseado | Acción de elección |
| --- | --- |
| Mostrar otra escena | Goto |
| Abrir una tienda | Ir de compras |
| Terminar de hablar | Cerrar |
| Da una recompensa, luego continúa | Acciones de recompensa seguidas por Goto |
| Ofrecer una respuesta solo antes de que se reclame una recompensa | Una condición de etiqueta más el flujo de recompensa de [ una sola vez ](#core/dialogue-rewards) |

Utilice un resultado de navegación de pantalla claro por respuesta. Múltiples acciones de navegación competitivas pueden hacer que una acción anterior decida el flujo.

## Referencia de archivo guardado

Puede escribir esto en el editor sin escribir estos campos usted mismo.

| Objeto | Campos útiles |
| --- | --- |
| Inicio de ruta | `goto`, `conditions`, `mode`, `actionType`, `linkMode` |
| nodo general | `name`, `type`, `text`, `textTranslationKey`, `conditions`, `choice`, `textFx` |
| elección | `label`, `labelTranslationKey`, `conditionMode`, `conditions`, `actions`, `fx` |

El nombre actual de la matriz es **`choice` **, singular. `mode` elige ** y / o ** para las condiciones. Los interruptores de las teclas de traducción interpretan el texto como una clave en lugar de una prosa literal.

Para ver tamaño, respuestas largas y **Pulse highlight**, véase [elección de texto y énfasis](#core/dialogue-choice-style). Esta configuración cambia la presentación; escriba la respuesta real en **Choices → Label**.

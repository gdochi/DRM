---
title: Condiciones y acciones
slug: conditions-actions
order: 90
description: Implementado los tipos de condición y acción utilizados por los nodos de diálogo, rutas y opciones.
product: core-fabric
category: Sistemas de núcleo
section: dialogue-editor
status: Estable
version: 0.3.1
audience: Script / creadores de datos
tags:
  - condition
  - action
translationSource: en
translationMethod: assisted
---

## ¿Quién ve una opción y qué sucede cuando hacen clic?

**Condition list** controla si una elección es visible. **Choice actions** controla lo que hace al hacer clic. “No ha recibido el regalo” es una condición; “dar manzanas y registrar la reclamación” es una acción.

Seleccione un nodo general, abra **Choices** y, a continuación, seleccione la opción de la izquierda. **Label** a la derecha está el texto del botón del jugador. Las dos pestañas a continuación editan las condiciones y acciones por separado.

## Muéstralo solo antes de que se reclame el regalo

1. Abra la opción **Condition list → Add**.
2. Elija **Type: tag**.
3. Elija **Op: not** e introduzca **Tag** `welcome_received`.

![Una elección que requiere la ausencia de welcome_received.](assets/media/guides/drm-031-neo1211/dialogue-choice-condition-tag.png "DRM 0.3.1 / NeoForge 1.21.1. tag / not / welcome_received pasa cuando la etiqueta está ausente. ha hecho lo contrario.")

La condición no registra una reclamación por sí misma. Añada la misma etiqueta ** a través de una acción de etiqueta ** al otorgar el regalo. Sigue [recompensas de una sola vez](#core/dialogue-rewards) para el flujo completo.

Ninguna condición significa que todos pasen. Para varias condiciones, ** y** requiere todo; ** o** requiere al menos uno. Use y para "etiqueta de permiso y al menos tres esmeraldas", o para "cualquiera de las dos etiquetas de permiso".

## Dar tres manzanas en clic

En **Choice actions**, cambie la acción **Type** a **Item**, luego establezca **Item: give**, **ID: minecraft:apple**, **Count: 3**. Usa **+ Acción** para añadir otra acción. Si el ejemplo ya tiene Goto, decida si reemplazarlo o mantenerlo después de la recompensa.

![El objeto da, minecraft:apple y cuenta 3 en una elección.](assets/media/guides/drm-031-neo1211/dialogue-item-reward-editor.png "DRM 0.3.1 / NeoForge 1.21.1. La etiqueta proporciona el texto del botón; la acción Elemento otorga el elemento real. Desplácese por el panel derecho para llegar a Count.")

Después de **Save As → NPC Apply**, hacer clic en esta opción dio tres manzanas en el inventario del servidor. Este ejemplo solo de elemento cierra la ventana después de conceder los elementos. Para mostrar una respuesta después, agregue **Goto last and select the destination general node**.

## Elige una acción común

| Objetivo | Medidas adoptadas | Valores a elegir |
| --- | --- | --- |
| Próxima escena de diálogo | Goto | Nodo general de destino |
| Terminar la conversación | Cerrar | Sin valores adicionales |
| Abrir una tienda NPC | Ir de compras | Tienda encuadernada o archivo de tienda guardado |
| Destinos de viaje abiertos | Ir Teletransportador | Conjunto de teletransportador guardado |
| Dar o recibir artículos | Artículo | dar / tomar / conjunto, artículo y contar |
| Marcar una reclamación | Etiqueta | añadir y el nombre de la etiqueta |
| Eliminar una marca | Etiqueta | eliminar y el mismo nombre de etiqueta |
| Ejecutar un comando | Comando | Comando del servidor sin su líder |
| Conectar una misión | Acción de misión actual | Siga las opciones actuales en la guía [quest](#core-fabric/quest-system) |

Organizar las acciones en orden de lista y poner **Goto, shop opening or Close last**. Por ejemplo: Item grant → Tag add → Goto.

## ¿Dónde debe ir la condición?

| Ubicación | Finalidad |
| --- | --- |
| Condiciones generales del nodo | Restringir el acceso a toda la escena |
| Inicio Rutas | Elige la primera escena cuando comience la interacción |
| Opciones → Lista de condiciones | Ocultar o mostrar opciones individuales dentro de una escena |

Para ocultar un botón, condicione esa opción. Para cambiar todo el saludo, condicione una ruta de inicio que conduzca a otro nodo general. Ver [crear una conversación](#core-fabric/dialogue-system).

## Condiciones que necesitan otro mod

Elementos, etiquetas y avances comparan sus valores correspondientes. Las condiciones de búsqueda FTB requieren misiones FTB. `faction_score` lee CustomNPCs puntos de facción, no DNPC amistad u hostilidad.

**CustomNPCs Stored Data** es una conexión avanzada a datos escritos en script. El ejemplo de la etiqueta es suficiente para un regalo ordinario de una sola vez. CustomNPCs las condiciones se limitan a los objetivos Minecraft más antiguos admitidos y no están disponibles en 26.3.

Utilice la referencia [JSON](#core-fabric/json-reference) solo cuando edite archivos directamente.

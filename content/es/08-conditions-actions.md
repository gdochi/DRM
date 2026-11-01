---
title: Condiciones y acciones
slug: conditions-actions
order: 70
description: Elija quién ve una opción de diálogo y qué sucede cuando hacen clic en ella.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guía
version: 0.3.1
audience: Creadores de diálogo
tags:
  - condition
  - action
translationSource: en
translationMethod: assisted
---

## ¿Quién ve la elección, y lo que hace

Abra un nodo de diálogo general **Choices** y seleccione una opción. **Label** es su texto de botón, **Condition list** controla la visibilidad y **Choice actions** se ejecuta cuando se hace clic.

“No ha recibido el regalo” es una condición. “Dar manzanas y registrar la reclamación” es una secuencia de acción. Una condición por sí sola no otorga nada; una subvención sin un cheque de reclamo puede repetirse.

## Cargar un ejemplo de recompensa en Forge

En la compilación **DRM 0.3.1 / Forge 1.20.1** probada, al seleccionar Elemento en el menú Tipo dejó la acción como Goto. Si esto sucede, descargue el ejemplo de recompensa de [ una sola vez ](#core/dialogue-rewards) y ábralo con **Load**. Sus acciones Item y Tag existentes se cargan correctamente. Se verificaron la solicitud de NPC, la subvención de manzana y la opción de ocultar en una visita repetida.

![Acciones de elemento y etiqueta cargadas en el editor de diálogo Forge.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-actions.png "DRM 0.3.1 / Forge 1.20.1. Recibir tres manzanas está seleccionado. La primera fila de Objetos otorga tres manzanas; la siguiente fila de Etiqueta registra la reclamación. Desplázate hacia abajo para ver Count.")

Compruebe **Item: give**, **ID: minecraft:apple**, **Count: 3**. Para cambiar el regalo, edite la fila de elementos existente y **Save As** su propio conjunto. Aplique primero el ejemplo original para confirmar la subvención de trabajo antes de cambiar su configuración.

## Ocultar el botón después de reclamar

Abre esa opción **Condition list**. El ejemplo usa **Type: tag / Op: not / Tag: welcome_received**, por lo que la opción solo aparece mientras el jugador carece de esa etiqueta.

La segunda acción **Tag** utiliza **add / welcome_received** para registrar la reclamación. Cambie los nombres de acción y condición juntos; diferentes nombres permiten otra reclamación. **has** significa lo contrario: el jugador ya debe tener la etiqueta.

Sin condiciones significa que nadie pasa. Con varias condiciones, ** y ** requiere todos ellos; ** o ** requiere al menos uno. “Tiene un permiso y al menos tres usos de esmeraldas” y. “Tiene uno de dos usos de permisos” o.

## ¿Dónde debe ir la condición?

| Ubicación | Utilízalo para |
| --- | --- |
| Opciones → Lista de condiciones | Mostrar u ocultar un botón en la misma escena |
| Inicio → Rutas | Elige la primera escena cuando comience la conversación |
| Condiciones generales del nodo | Restringir la entrada en esa escena |

Utilice Rutas de inicio para cambiar todo el saludo. Use una condición de elección para ocultar solo el botón de regalo. Ver [creación de diálogo](#core/dialogue-system) para nodos de inicio y generales.

## Acciones comunes

| Resultado deseado | Medidas adoptadas | También elija |
| --- | --- | --- |
| Mostrar otra línea | Goto | Nodo general de destino |
| Terminar la conversación | Cerrar | Sin valor adicional |
| Abrir una tienda NPC | Ir de compras | Tienda aplicada o guardada |
| Otorgar o tomar artículos | Artículo | dar / tomar / conjunto, artículo y contar |
| Registrar una reclamación o permiso | Etiqueta | añadir y un nombre de etiqueta |
| Borra ese récord | Etiqueta | eliminar y el mismo nombre de etiqueta |
| Ejecutar un comando de servidor | Comando | Mando sin su líder |
| Conectar una misión | Acción de misión actual | Utilice la operación de coincidencia en la guía [quest](#core/quest-system) |

Poner concesiones y registros antes de las transiciones de pantalla: **Item → Tag → Goto**. El ejemplo Item-and-Tag suministrado se cierra después de la concesión. Para mostrar una respuesta, ponga Goto y su destino último. Después de cambiar un tipo de acción, compruebe que el tipo mostrado haya cambiado realmente.

**Command** se ejecuta en el contexto del jugador. Utilice `{player}` para el nombre o `{uuid}` para el UUID. Comience con la acción integrada para tareas como la concesión de un solo elemento.

## Condiciones que necesitan otro mod

Las condiciones y acciones de FTB requieren misiones de FTB. **faction_score** se refiere a CustomNPCs puntos de facción, que difieren de DNPC configuraciones amistosas/hostiles. **CustomNPCs Stored Data** es un [Integración avanzada de scripts](#core/script-stored-data-conditions). Utilice el ejemplo de etiqueta anterior para un regalo normal de una sola vez.

CustomNPCs la integración se limita a los objetivos más antiguos Minecraft compatibles; se excluye en Minecraft 26.3. Consulte la referencia [JSON](#core/json-reference) cuando necesite editar archivos directamente.

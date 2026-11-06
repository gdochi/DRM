---
title: Crear una conversación NPC
slug: dialogue-system
order: 70
description: Escribe un saludo, añade opciones y conecta la conversación a un NPC.
product: core
category: Sistemas de núcleo
section: dialogue-editor
status: Estable
version: 0.3.1
audience: Creadores de diálogo
tags:
  - dialogue
  - npc
translationSource: en
translationMethod: assisted
---

## Haz un saludo y una respuesta

Construir un guía de la aldea: hablar abre un saludo, “Háblame de la aldea” abre una respuesta, y “Adiós” cierra la conversación.

Estas capturas muestran **DRM 0.3.1 on Forge 1.20.1, in English**. El editor captura el uso de un ejemplo preparado que contiene el saludo y la respuesta.

### 1. Abrir el editor de conversaciones

Haga clic derecho en el aire con el núcleo. Seleccione **Dialogue Editor** en el medio, luego **Use Default** a la derecha. El ejemplo predeterminado tiene otros nodos; comience seleccionando **dialogue_1** para su saludo.

![DRM el selector del editor con Dialogue Editor seleccionado y los botones Cargar, Use Default y Create New a la derecha.](assets/media/guides/drm-031-forge1201/editor-selector.png "Seleccione la herramienta en el medio y, a continuación, elija cómo comenzar a la derecha. Use Default abre el ejemplo suministrado.")

### 2. Escribe lo que dice el NPC

Seleccione **dialogue_1 / General** a la izquierda y abra **Text**. Escribe un saludo en **Dialogue Text**, como “Bienvenido a Oakridge. ¿Qué te gustaría saber?”

![La ficha Texto para dialogue_1, con el saludo de la aldea en Dialogue Text.](assets/media/guides/drm-031-forge1201/dialogue-text.png "El texto edita la línea NPC para el nodo seleccionado. Marque su nombre a la izquierda para que esté editando el saludo en lugar de comenzar.")

Utilice **+ General** para añadir la escena de respuesta. En **Info → Node name**, escriba `dialogue_reply_1` y haga clic en **Rename**. Abra **Text** y escriba la respuesta, como "La posada está al lado de la fuente".

### 3. Conectar una opción de jugador a la respuesta

Volver a **dialogue_1 ** y abrir **Choices**. Añade una opción con **+ Choice** si es necesario. Seleccione su fila a la izquierda, luego ingrese la palabra del botón en **Label** a la derecha.

![La pestaña Opciones con dos opciones a la izquierda, un campo Etiqueta a la derecha y Choice actions abajo.](assets/media/guides/drm-031-forge1201/dialogue-choices.png "La etiqueta es el texto del botón del jugador. Establezca lo que hace ese botón en Choice actions debajo de él.")

Para “Háblame de la aldea”, abre **Choice actions**, agrega una acción **Goto** y selecciona ** dialogue_reply_1 ** como su destino. Dar “Adiós” a una acción **Close**. Agregue una opción de cierre al nodo de respuesta también.

![Choice actions con un objetivo de acción Goto dialogue_reply_1.](assets/media/guides/drm-031-forge1201/dialogue-choice-actions.png "Agregue la operación con + Acción, luego elija su Tipo y destino. Esto conecta la primera opción al nodo de respuesta.")

Al reutilizar una opción predeterminada, compruebe sus acciones existentes. Cambiar la etiqueta por sí sola puede dejar adjunta una acción de apertura de tienda o de navegación de ejemplo.

### 4. Elige la primera escena

Seleccione **start** y abra **Routes**. Fije la ruta de saludo **Action** en **Goto** y su destino **Goto** en **dialogue_1**. Comience con una ruta y sin condiciones.

![La pestaña Rutas para comenzar, con una ruta Goto que apunta a dialogue_1.](assets/media/guides/drm-031-forge1201/dialogue-start-routes.png "Inicio elige la escena de apertura. Este ejemplo entra en inicio, luego dialogue_1.")

### 5. Guardar y adjuntar la conversación

Haga clic en **Save As** en la parte superior. Cambie **Save As ID** a un nuevo nombre como `village_guide` y, a continuación, guarde. Reemplace el nombre del ejemplo protegido `default_set`.

![La carpeta y el nombre de conjunto después de guardar village_guide con Save As.](assets/media/guides/drm-031-forge1201/dialogue-save-result.png "DRM 0.3.1 / Forge 1.20.1. Después de guardar, la carpeta en la parte superior y el nombre de conjunto a la izquierda ambos terminan en village_guide.")

Si necesitas un NPC primero, sigue [DNPC setup](#dochi-npc-core/npc-core-setup). Haga clic con el botón derecho en él con el núcleo, luego use **NPC Apply**:

1. Seleccione **Dialogue JSON** a la izquierda.
2. Seleccione **village_guide** en el medio. Usa **Refresh** si falta.
3. Pulse **Apply Dialogue** en la parte inferior.
4. Compruebe que **APPLIED JSON → Dialogue** en la derecha ahora muestra ** village_guide **.

![NPC Apply después de aplicar village_guide, mostrando la función, archivos guardados, nombre aplicado y Apply Dialogue botón.](assets/media/guides/drm-031-forge1201/npc-apply-result.png "Seleccionar un archivo por sí solo no lo aplica. Pulse Apply Dialogue y compruebe el nombre en el panel derecho.")

Vacíe ambas manos, hable con el NPC, luego verifique el saludo, la opción de respuesta y la opción de cierre en orden.

![La conversación del jugador se abrió interactuando con una guía DNPC llamada Oakridge, mostrando el saludo y dos opciones.](assets/media/guides/drm-031-forge1201/dialogue-npc-player.png "El resultado del jugador: Dialogue Text se convierte en la línea NPC, y cada etiqueta se convierte en una opción debajo de ella.")

La primera opción abre la respuesta a continuación. Compruebe esta conexión, así como el saludo inicial.


## ¿Qué es un nodo?

Un nodo general ** es una escena de conversación**: una línea NPC y las elecciones del jugador. Conectar una opción a otro nodo abre la siguiente escena.

**start** elige la primera escena. Señala a un nodo general en lugar de mostrar su propio saludo. Cada conjunto de conversación tiene un nodo de inicio.

## Tomar decisiones hacer algo

| Elección | Medidas adoptadas |
| --- | --- |
| Escucha la siguiente parte | Ir a otro nodo |
| Terminar la conversación | Cerrar |
| Comprar algo | Abrir una tienda: `go_shop` |
| Recoger una recompensa | Dar un artículo o moneda |
| Recuerde el progreso | Agregar/eliminar una etiqueta |

Una condición puede mostrar una elección solo a ciertos jugadores, como ofrecer una recompensa después de que se complete una misión. Ver [ condiciones y acciones](#core/conditions-actions).

## Expandir y reutilizar una conversación

Arrastre las filas de nodo/elección para cambiar su orden. Seleccione varios nodos con Mayús+clic o arrastre y use **Copy / Paste**. Utilice **Duplicate** para copiar un conjunto completo.

Para una elección de tienda, crear el [tienda](#core/shop-system) primero y seleccionarlo en la acción.

## Cambiar la ventana

Escribe el contenido aquí y diseña la ventana en [GUI Maker](#core/gui-system). Puede terminar la conversación con el diseño predeterminado y personalizarlo más tarde.

Los conjuntos guardados están en `config/dochi_rpg_maker/dialogue_sets/<set name>/`. Copie toda la carpeta del conjunto cuando la mueva a otro servidor.

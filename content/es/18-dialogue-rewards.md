---
title: Dar una recompensa una vez
slug: dialogue-rewards
order: 71
description: Otorgar elementos, registrar la reclamación y ocultar una opción en la próxima visita.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guía
version: 0.3.1
audience: Creadores de diálogo
tags:
  - dialogue
  - reward
translationSource: en
translationMethod: assisted
---

## Dar tres manzanas una vez por jugador

Comience con [ una conversación corta ](#core/dialogue-system), luego abra un nodo general **Choices**. Este ejemplo otorga tres manzanas, registra la reclamación con la etiqueta de jugador `welcome_received` y oculta el botón de regalo en la próxima visita.

Las pantallas y el resultado a continuación se comprobaron con **DRM 0.3.1 / NeoForge 1.21.1**. La elección se llama **Receive three apples**; use su propia redacción si lo prefiere.

## Forge: comienza con el ejemplo guardado

**[ Descargue el ejemplo de recompensa única](assets/media/dialogue/welcome_reward_once.zip)**

En la versión **DRM 0.3.1 / Forge 1.20.1** probada, elegir el elemento para una nueva acción lo dejó como Goto. Utilice este ejemplo guardado y edite sus valores existentes en lugar de seguir los pasos de NeoForge acción-creación a continuación.

1. Extraiga toda la carpeta `welcome_reward_once` en el juego o servidor `config/dochi_rpg_maker/dialogue_sets/`. La ruta resultante debe ser `dialogue_sets/welcome_reward_once/dialogue_set.json`. Preservar cualquier trabajo existente con ese nombre primero.
2. Abrir **Dialogue Editor → Load → welcome_reward_once → Load**.
3. Seleccione **dialogue_1 → Opciones → Recibir tres manzanas → Choice actions **. Edite el elemento de la fila Elemento existente y cuente, o pruebe el ejemplo sin cambios primero.
4. **Save As** su propio nombre, luego siga “Guardar, aplicar y visitar de nuevo” a continuación. Cambie una etiqueta de reclamación tanto en la condición como en la acción Etiqueta.

![welcome_reward_once seleccionado en Forge Cargar conjunto de diálogo.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-load.png "DRM 0.3.1 / Forge 1.20.1. Ponga la carpeta completa extraída en dialogue_sets, luego selecciónela aquí. Si falta, busque una carpeta anidada adicional.")

![La concesión de artículo cargado y el registro de etiqueta en Forge.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-actions.png "DRM 0.3.1 / Forge 1.20.1. La acción del elemento existente es dar / minecraft:apple / 3. La aplicación de este conjunto a un NPC produjo tres manzanas y la etiqueta claim en el servidor.")

La descarga contiene la carpeta completa guardada por el editor NeoForge. La carga, la aplicación, la reclamación y la revisión también se verificaron en Forge. Los pasos de nueva acción a continuación muestran NeoForge.

## 1. Añadir el elemento de subvención

1. Seleccione la opción de regalo e introduzca **Label: Receive three apples**.
2. Abrir **Choice actions**. Reemplace el ejemplo Goto o use **+Action** para agregar una fila.
3. Elija **Type: Item → Item: give**.
4. Establecer **ID: minecraft:apple**, **Count: 3**. Desplácese hacia abajo en el panel derecho si Count está fuera del área visible.

## 2. Registrar la reclamación

Utilice **+ Acción** en la misma opción. Establezca la nueva fila en **Type: Tag**, **Op: add**, **Tag: welcome_received**. La lista es **Item → Tag**.

![Una concesión de elemento seguida de la acción de etiqueta welcome_received.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-actions.png "DRM 0.3.1 / NeoForge 1.21.1. La primera acción otorga tres manzanas; el segundo registra la reclamación sobre el jugador. Coincidir exactamente con el nombre de la etiqueta en la siguiente condición.")

Este ejemplo de dos acciones se cierra después de otorgar el regalo. Para mostrar una respuesta después, cree un nodo general y agregue **Goto → that node last**, después del registro de concesión y reclamación.

## 3. Ocultar la elección después de reclamar

En la misma opción, abrir **Condition list → Add** y establecer **Type: tag**, **Op: not**, **Tag: welcome_received**.

![Una etiqueta que no requiere ninguna etiqueta welcome_received.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-condition.png "DRM 0.3.1 / NeoForge 1.21.1. Esta opción tiene 2 acciones / 1 condiciones. La condición controla la visibilidad; no otorga nada por sí misma.")

**tiene** requiere que la etiqueta esté presente. Utilice **not** aquí para que solo un jugador que no ha reclamado el regalo vea el botón.

## 4. Guardar, aplicar y visitar de nuevo

1. **Save As** `welcome_reward_once`.
2. Haga clic con el botón derecho en el NPC con DRM Core, seleccione ese conjunto en **Dialogue JSON**, luego **Apply Dialogue**.
3. Vacía ambas manos y habla con el PNJ desde cerca.
4. Haga clic en la opción de regalo y compruebe si hay tres manzanas en su inventario.
5. Hable de nuevo y compruebe que la elección del regalo se ha ido.

![Solo queda el adiós cuando el diálogo se vuelve a abrir después del regalo.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-hidden.png "DRM 0.3.1 / NeoForge 1.21.1. Después de confirmar tres manzanas y la etiqueta de jugador welcome_received en el servidor, se repitió la interacción. La elección del regalo estaba oculta y el adiós permaneció.")

La etiqueta pertenece al jugador. Si varios NPC usan la misma etiqueta, reclamar de uno esconde ese regalo en los otros también. Use nombres separados como `gate_guard_gift` y `innkeeper_gift` para regalos independientes, que coincidan con cada acción y condición.

![Solo queda el adiós después de reclamar el regalo importado en Forge.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-hidden.png "DRM 0.3.1 / Forge 1.20.1. Esta es una segunda conversación después de cargar el conjunto proporcionado, aplicándolo al NPC, haciendo clic en el regalo y verificando la etiqueta de concesión y reclamación del servidor.")

## Vuelve a probar el regalo

Con permiso de administrador, elimine la etiqueta claim y vuelva a hablar:

```text
/tag @s remove welcome_received
```

Esto no recupera las manzanas ya recibidas. Verifique las cantidades de inventario por separado durante las pruebas repetidas.

## Continuar en una tienda o búsqueda

Prepare precios y stock en [NPC Shop](#core/shop-system), luego conecte **Go Shop**. Usa las acciones actuales en la guía [quest](#core/quest-system) para la aceptación y los objetivos de la misión. Consulte [condiciones y acciones](#core/conditions-actions) para el nodo, Rutas y visibilidad de opciones.

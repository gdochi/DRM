---
title: Cocinar y entregar comida
slug: npc-core-cooking
order: 1514
description: Elige una receta, el almacenamiento de ingredientes y la estación de trabajo para tu cocinero.
product: dochi-npc-core
category: Empleos
section: editor
status: Guía
version: 0.1.3
audience: Creadores de NPC
translationSource: en
translationMethod: assisted
---

## Preparar un trabajo de cocina

1. Coloque una estación de trabajo accesible y almacenamiento de ingredientes / salida.
2. En el editor de NPC, use **Schedule → Add time**, luego la fila de tiempo **+**. Busque **Cooking**, o encuéntrelo en **Gathering and production**.
3. Utilice el control de exploración al lado de **Food to cook** para seleccionar una receta. Los ingredientes no se obtienen antes de seleccionar una receta.
4. Asignar **Ingredient source / Cooking block / Output**. Desplácese por el Inspector para obtener una configuración más baja.
5. Proporcione los ingredientes, cualquier herramienta requerida y combustible, luego establezca **Batch / Repeat**.
6. Habilitar **Enable schedule** y **Save to NPC**. Compruebe que la hora mundial actual cae dentro del período programado.

![Cocinar añadido a Schedule, con comida para cocinar y fuente de ingredientes.](assets/media/guides/dnpc-013-neo1211/dnpc-cooking.png "DNPC 0.1.3, Delicia del agricultor 1.3.4, NeoForge 1.21.1. Esta vista de preparación no tiene receta ni estación y el horario está APAGADO. Asignelos, habilite la programación y ahorre.")

Habilitar **Repeat** para continuar cocinando. Deshabilitar para terminar y entregar un lote, luego esperar.

## Lee la receta antes de preparar la estación

Busca por nombre de alimento o ID de artículo y selecciona una fila de recetas a la izquierda. El mismo bistec puede tener recetas separadas de horno y ahumador. Lea **Bloque de cocción / Tiempo de cocción de la receta / Ingredientes para un lote de receta** a la derecha antes de preparar la estación y los ingredientes.

![La receta de bistec de horno seleccionada muestra una carne cruda y un tiempo de cocción 200-tick.](assets/media/guides/dnpc-013-neo1211/dnpc-cooking-beef.png "DNPC 0.1.3 / NeoForge 1.21.1. La búsqueda es minecraft:cooked_beef. Esta fila requiere horno, 200 garrapatas y carne cruda × 1. Aplicar actualizaciones al borrador del editor; terminar con Save to NPC por separado.")

## Estaciones de trabajo disponibles

| Dispositivo | Lo que hace el NPC |
| --- | --- |
| Horno/fumador | Añade ingredientes y combustible, luego recoge el resultado |
| Tabla de cortar del deleite del agricultor | Prepara los ingredientes con la herramienta necesaria |
| Pizzería del granjero | Rollos de masa, añade ingredientes y recoge la pizza cruda |
| Molde de queso French Delight | Llena el molde, espera el envejecimiento y recoge el queso |
| Cestas/cabinetes soportados | Mueve ingredientes, artículos intermedios y productos |

Los dispositivos adicionales necesitan sus respectivos mods. La guía combinada de cocina-addon anterior se basa en **NeoForge 1.21.1**. En otros cargadores, elija entre dispositivos instalados y la lista de recetas disponibles. Esto no es una guía de cocina 26.3.

## Los ingredientes están listos, pero la cocción no comienza

- Suministrar la **herramienta requerida**, así como los ingredientes.
- Compruebe el almacenamiento de ingredientes y la estación de trabajo asignados.
- Deje una ruta transitable y espacio para pararse en el dispositivo.
- Los hornos/fumadores necesitan **combustible**.
- El almacenamiento de salida completa puede retrasar la recolección o entrega.

El envejecimiento del queso toma 1,200 garrapatas, aproximadamente un minuto a velocidad normal. Si la conversación interrumpe brevemente la cocción, el PNJ puede recoger la comida después de que el dispositivo termine.

Elija horas de trabajo en [horas](#dochi-npc-core/npc-core-schedules).

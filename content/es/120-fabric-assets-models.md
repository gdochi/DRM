---
title: Añade tus fotos y modelos de NPC
slug: assets-models
order: 130
description: Importe un PNG para sus pantallas y elija modelos y animaciones de NPC.
product: core-fabric
category: Herramientas de mundo y NPC
section: world-tools
status: Estable
version: 0.3.1
audience: Creadores de GUI y NPC
tags:
  - assets
  - geckolib
  - animation
translationSource: en
translationMethod: assisted
---

## Elegir un PNG para una pantalla

En GUI Maker siga ** + Imagen → Activo: en el inspector derecho → elija una imagen → Aplicar**. Desplácese dentro del inspector si la propiedad está debajo de la vista. Busque por nombre de archivo o reduzca el selector por mod y carpeta principal.

![El selector de activos de imagen real GUI Maker.](assets/media/guides/drm-031-neo1211/gui-custom-png-search.png "DRM 0.3.1 / NeoForge 1.21.1, Inglés UI. Buscando guide_icon encuentra el PNG colocado en la carpeta del servidor. Este ejemplo copia el icono existente de DNPC sin cambios. Seleccione la fila y pulse Aplicar en la parte superior.")

**Aplicar asigna la imagen al elemento Image seleccionado.** Guardar toda la GUI es un paso separado. Después de cerrar el selector, ajuste la posición, el ancho, la altura y el ajuste; use Save As para un nuevo archivo. Para mostrarlo en un diálogo o tienda, seleccione esa GUI guardada en la característica correspondiente.

![El PNG seleccionado aplicado y guardado como guide_image.](assets/media/guides/drm-031-neo1211/gui-custom-png-applied.png "Real Aplicar y Save As en el mismo 0.3.1 ejecutar. Compruebe la imagen de lienzo seleccionada y guide_image.json en la parte superior. Esto verifica la edición y el almacenamiento de la GUI, aparte de reproducir un diálogo usándolo.")

## Si falta su PNG

1. Ponlo debajo del servidor `config/dochi_rpg_maker/assets/textures/`. Se permiten subcarpetas.
2. Pulse **Refresh** en el selector y busque su nombre de archivo.
3. Restablezca los filtros de mod o carpeta a **All** si es necesario.
4. Compruebe la vista previa de la fila y pulse Aplicar.

Las imágenes propiedad del servidor se envían a los jugadores que se unen. Cada PNG debe ser **8 MiB o menos**, **4096 píxeles o menos por lado** y **16,777,216 píxeles o menos en total**. Al transferir una GUI, incluya tanto su JSON como las imágenes a las que hace referencia.

## Dónde cambiar un modelo de NPC

Para DNPC, ** haz clic con el botón derecho en el NPC con Dochi Npc Core → Appearance & Model ** para elegir su modelo, piel y escala. Un elemento de imagen GUI coloca una imagen en una pantalla; no cambia el cuerpo del NPC.

![DNPC Appearance & Model.](assets/media/guides/dnpc-012-neo1211/dnpc-appearance.png "DNPC 0.1.2 / NeoForge 1.21.1, Inglés UI. Compara Humanoid, Skin y Scale con la vista previa central. Esta es la pantalla de apariencia de DNPC, separada de la CustomNPCs pantalla NPC Basic de DRM.")

Los proyectos existentes 1.20.1 y 1.21.1 que utilizan CustomNPCs configuran DRM modelos en **NPC Basic**. CustomNPCs se excluye de Minecraft 26.3 en adelante. Sigue [DNPC la apariencia y el equipo](#dochi-npc-core/npc-core-editor) para el camino que coincida con tu actor.

Un modelo Gecko necesita combinar los activos de modelo, textura y animación más el GeckoLib correcto. Un PNG por sí solo no crea movimientos de caminar o atacar. **loop** repite, **una vez** juega una vez, y **hold-last** mantiene la pose final. Elija un movimiento realmente suministrado por el modelo.

## PNG animados

Para una imagen de marco vertical, incluya resource-pack-style `.png.mcmeta`: por ejemplo, `priest.png` y `priest.png.mcmeta`. Los metadatos establecen el tamaño de la trama, el orden y el tiempo. Continúe con [GUI Maker ](#core-fabric/gui-system) para el diseño y [ la creación de diálogo ](#core-fabric/dialogue-system) para conectarlo.

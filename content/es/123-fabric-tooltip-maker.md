---
title: Tooltip Maker
slug: tooltip-maker
order: 105
description: Organice el nombre, la descripción y el modelo que se muestran al pasar el cursor sobre un elemento.
product: core-fabric
category: GUI Maker
section: gui-maker
status: Estable
version: 0.3.1
audience: Creadores
translationSource: en
translationMethod: assisted
---

## Lo que hace Tooltip Maker

Tooltip Maker diseña el panel que se muestra cuando un jugador se cierne sobre un elemento. Organice dónde aparecen su nombre, información y vista previa del elemento.

Abra el selector del editor con el **Dochi RPG Maker Core**, elija **Tooltip Maker**, luego cargue un diseño de la descripción o cree uno. Los paquetes predeterminados son plantillas protegidas, así que use `Save As` antes de personalizarlas.

Los diseños de la sugerencia de herramientas se almacenan en `config/dochi_rpg_maker/gui/`. El diseño inicial agrupado es `default_tooltip_gui.json`.

![Tooltip Maker es el diseño predeterminado, con el icono de elemento, nombre y áreas de información en el centro y lienzo y dimensiones de elementos a la derecha.](assets/media/guides/drm-031-neo1211/tooltip-maker.png "DRM 0.3.1 / NeoForge 1.21.1. El panel negro es la punta de la herramienta. El espacio de trabajo azul circundante está fuera de su lienzo de salida.")

1. Seleccione un elemento en el medio. El icono de la espada, un **Rendered Item**, se selecciona aquí.
2. Cambia su posición **X / Y** y **W / H** dimensiones a la derecha. Establezca el tamaño de toda la información con **Tooltip W / H → Apply** arriba.
3. Agregue pantallas con **+ Texto de información sobre herramientas**, **+ Divisor**, **+ Elemento renderizado** o las otras herramientas de la izquierda.
4. Verifique **Preview**, luego **Save As** su diseño. Utilice **Use Globally** cuando lo seleccione como el diseño para todos los elementos.

Configure las estadísticas y la descripción reales de un elemento en el Editor de elementos. Tooltip Maker establece cómo se presenta esa información.

## Controles principales

- Establezca el tamaño del lienzo y organice el texto, los valores, los divisores, las imágenes y la vista previa del elemento.
- Elija un icono 2D o un modelo de elemento 3D ajustado y ajuste la escala, la rotación y el giro.
- Configure efectos de entrada de superficie, marco, texto y elementos y luego reprodúzcalos en el editor.
- Mantenga los elementos completamente dentro del lienzo de salida si deben incluirse al guardarlos.

La información sobre herramientas de tiempo de ejecución utiliza el elemento flotante real y sus datos de elemento. Si el resultado es más alto que la pantalla, los jugadores pueden desplazar su contenido mientras el marco exterior permanece en su lugar.

Los elementos de inventario creativos pueden usar la información de herramientas de elementos personalizados. Las sugerencias de botones ordinarios y las tarjetas de ayuda de hover del editor usan su propio renderizado y no se reemplazan por Tooltip Maker.

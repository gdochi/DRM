---
title: Tooltip Maker
slug: tooltip-maker
order: 105
description: Diseñe información sobre herramientas de elementos, controle vistas previas de elementos y agregue efectos de entrada.
product: core
category: Tooltip Maker
section: gui-maker
status: Estable
version: 0.3.1
audience: Creadores
tags:
  - tooltip
  - item
  - editor
translationSource: en
translationMethod: assisted
---

## Lo que hace

Tooltip Maker diseña el panel de información que los jugadores ven cuando se desplazan sobre un elemento. Es un editor separado de GUI Maker, que diseña pantallas como diálogos y tiendas. El nombre del elemento, las estadísticas y otra información en vivo provienen del elemento suspendido; el diseño decide dónde aparecen.

## Iniciar un diseño

1. Haga clic derecho en el aire con el **Dochi RPG Maker Core**.
2. Abrir **Visual → Tooltip Maker**.
3. Utilice **Load** para abrir una descripción de herramientas existente o iniciar un nuevo diseño. Utilice **Save As** para personalizar una copia de una plantilla incluida.
4. Establezca el ancho y la altura del lienzo, luego organice la vista previa del elemento, el texto, las secciones, las imágenes y los divisores.
5. Ajuste el elemento seleccionado en el Inspector y guarde su diseño.

Los diseños de punta de herramienta viven en `config/dochi_rpg_maker/gui`. La plantilla predeterminada es `default_tooltip_gui.json`. Comparten esta carpeta con otros archivos GUI, pero la lista de carga de Tooltip Maker muestra diseños de información de herramientas.

## Lienzo y ahorro

El lienzo de salida es el área que se guardará. Mover un elemento no agranda automáticamente el lienzo. Cambie las dimensiones del lienzo cuando necesite una descripción más grande.

Puede colocar temporalmente elementos alrededor del lienzo mientras los organiza. **Un elemento debe estar completamente dentro del lienzo para ser incluido en Guardar o Save As.** Los elementos externos siguen siendo parte del espacio de trabajo de edición, pero se omiten de la salida guardada.

## Controles de vista previa del artículo

| Control | Uso |
| --- | ---

## Lo que hace Tooltip Maker

Tooltip Maker diseña el panel que se muestra cuando un jugador se cierne sobre un elemento. Organice dónde aparecen su nombre, información y vista previa del elemento.

Abra el selector del editor con el **Dochi RPG Maker Core**, elija **Tooltip Maker**, luego cargue un diseño de la descripción o cree uno. Los paquetes predeterminados son plantillas protegidas, así que use `Save As` antes de personalizarlas.

Los diseños de la sugerencia de herramientas se almacenan en `config/dochi_rpg_maker/gui/`. El diseño inicial agrupado es `default_tooltip_gui.json`.

![Tooltip Maker es el diseño predeterminado, con el icono de elemento, nombre y áreas de información en el centro y lienzo y dimensiones de elementos a la derecha.](assets/media/guides/drm-031-forge1201/tooltip-maker.png "DRM 0.3.1 / Forge 1.20.1. El panel negro es la punta de la herramienta. El espacio de trabajo azul circundante está fuera de su lienzo de salida.")

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

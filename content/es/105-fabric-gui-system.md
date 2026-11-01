---
title: Personalizar las pantallas de diálogo y tienda
slug: gui-system
order: 60
description: Copie un diseño predeterminado y organice texto, imágenes y botones en GUI Maker.
product: core-fabric
category: Sistemas de núcleo
section: gui-maker
status: Estable
version: 0.3.1
audience: Creadores de GUI
tags:
  - gui
  - layout
translationSource: en
translationMethod: assisted
---

## Crea tu propia pantalla predeterminada

1. Haga clic con el botón derecho del ratón en aire con el núcleo y abra **GUI Maker**.
2. Elija el tipo de pantalla y cargue un valor predeterminado: **diálogo** para conversaciones o **npc_shop** para tiendas.
3. Seleccione elementos en el lienzo y cambie la posición, el tamaño y los colores.
4. Utilice **Save As** para guardar su diseño.
5. Seleccione ese archivo en el diálogo o en la configuración de la interfaz gráfica de usuario de la tienda.
6. Interactúa con el NPC para ver la pantalla orientada al jugador.

El texto de vista previa y los productos le ayudan a organizar el diseño. Escribe el diálogo real en Dialogue Editor y establece los productos/precios en NPC Shop.

![GUI Maker con Herramientas a la izquierda, Canvas en el medio y la posición y tamaño del elemento seleccionado en Inspector a la derecha.](assets/media/guides/drm-031-neo1211/gui-maker.png "DRM 0.3.1 el NeoForge 1.21.1. Añade elementos a la izquierda, selecciónalos en el lienzo y edítalos en Inspector.")

El diseño de conversación predeterminado ya contiene áreas de diálogo y elección. Manténgalos mientras comienzas y selecciona el elemento que deseas cambiar. **X / Y** establece la posición, **W / H** establece la anchura y la altura, y **Layer #** establece el orden de dibujo. Utilice **Preview** en la parte superior para inspeccionar el resultado.

## Elige un elemento

| Lo que quieres | Elemento |
| --- | --- |
| NPC diálogo | **Dialog** |
| Opciones de jugador | **Choice** |
| Tu propio texto o el nombre del PNJ | **Text** |
| Un fondo o sección | **Panel** |
| Un logotipo o una imagen | **Image** |
| Apariencia del NPC | **Entity** |
| Tienda de productos | **Item Slot** |
| Botones de compra/venta | **Shop Action Button** |
| Exhibición del dinero | **Currency Display** |

Utilice elementos funcionales, como productos para la tienda y botones de transacción, con su tipo de pantalla coincidente.

## Agregar nombres y etiquetas

Agregue **Text** a un diseño de diálogo y elija **Content**.

![Se agregó un cuadro de texto con + texto, con configuración de contenido, entrada directa, texto y clave de traducción en Inspector.](assets/media/guides/drm-031-neo1211/gui-text.png "Use + texto para una etiqueta separada. El contenido elige entre una etiqueta fija y el nombre actual del NPC.")

- **Direct input:** ingrese una etiqueta fija, como "Herrero".
- **NPC name:** muestra el nombre del interlocutor actual.

Para su propia redacción, ingrese en **Text** y cambie **Translation Key** a **Literal Text** si es necesario. Utilice la clave de traducción para un nombre registrado en un archivo de idioma.

Agregue varios cuadros de texto para etiquetas separadas. Cada uno tiene su propia posición, tamaño, relleno y borde.

## Repetir o cambiar el tamaño de una imagen

Seleccione una imagen y elija **Fit**. **Stretch** llena su área, **Contain** mantiene las proporciones de la imagen, y **Tile** la repite.

Para Tile, **Tile W % / H %** controla el tamaño de cada imagen repetida: por defecto 100%, rango 10 – 800%, por separado para ancho y alto. El ancho/alto del elemento controla el área completa que cubre.

**Default UI Settings → Sprite Scale %** cambia el tamaño del patrón panel/botón: por defecto 100%, rango 50–400%. No cambia el tamaño de las herramientas del editor.

## El diseño guardado no se muestra

Compruebe que el diálogo o la tienda seleccione la interfaz gráfica de usuario guardada. Guardar un diseño por sí solo no reemplaza una pantalla existente.

Los diseños se almacenan en `config/dochi_rpg_maker/gui/`. Utilice la referencia [JSON](#core-fabric/json-reference) cuando edite archivos directamente.

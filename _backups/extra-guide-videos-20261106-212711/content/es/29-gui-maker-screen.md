---
title: Organizar y guardar una interfaz gráfica
slug: gui-maker-screen
order: 101
description: Seleccione un tipo de pantalla, mueva sus partes y guarde un diseño reutilizable.
product: core
category: GUI Maker
section: gui-maker
status: Guía
version: 0.3.1
audience: Creadores de GUI
translationSource: en
translationMethod: assisted
---

## Mover una parte de la ventana

Abra el diseño previsto en [GUI Maker](#core/gui-system), haga clic en un elemento de lienzo y edite sus propiedades a la derecha. Utilice **X / Y** para la posición y **W / H** para el tamaño. **Layer # / Layer − / Layer +** controlar qué elemento superpuesto está delante.

![Elemento de texto seleccionado y su inspector.](assets/media/guides/drm-031-forge1201/gui-text.png "DRM 0.3.1 / Forge 1.20.1. Selecciona en el lienzo, luego edita el elemento correspondiente a la derecha. El texto aquí puede ser la decoración; las líneas de diálogo actuales vienen de Dialogue Editor.")

| Zona | Uso |
| --- | --- |
| Barra de herramientas | Nuevo, cargar, guardar, Save As y restablecer |
| Tipo selector | Elija lo que mostrará el diseño |
| Herramientas | Agregar componentes soportados por ese tipo |
| Canvas / Screen Editor | Seleccionar, arrastrar, redimensionar e inspeccionar superposiciones |
| Inspector | Posición, tamaño, colores, texto, imágenes y roles de datos |

El diálogo de muestra de Canvas, los productos y las cantidades ayudan con la colocación. Los datos reales del jugador provienen del diálogo conectado, la tienda o la moneda. La transparencia de fondo y el estilo heredado son configuraciones separadas; anula solo los elementos que deseas cambiar.

## Elige primero el tipo de pantalla

| Tipo | Pantalla |
| --- | --- |
| diálogo | Conversación NPC |
| npc_shop | Compra y recompra |
| currency_hud | Diseño de moneda HUD |
| remnant_msg | Mensaje remanente |

Otros perfiles de diseño como `player_status`, `custom_hud` y `generic` pueden ser utilizados por herramientas conectadas. Para un diálogo o tienda normal, seleccione su tipo de coincidencia. Un componente de elección necesita datos de diálogo; colocarlo en otro tipo no crea una conversación.

## Guardar y conectar el diseño

**Create New** comienza un borrador para el tipo actual. **Load** Listas que coinciden con los diseños guardados. **Save** escribe el archivo existente; **Save As** le da otro nombre. **Reset** restaura el diseño predeterminado del tipo.

Utilice **Save As** para un valor predeterminado personalizado. Los diseños regulares viven bajo `config/dochi_rpg_maker/gui/`; los HUD de moneda pueden usar la tienda establecida en HUD. Seleccione el archivo guardado en la función que lo usa y, a continuación, vuelva a abrir la pantalla del reproductor real.

Para las partes que cada tipo puede mostrar, vea [componentes GUI](#core/gui-maker-components). Para imágenes e importación de un PNG, véase [assets](#core/assets-models).

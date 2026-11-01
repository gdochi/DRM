---
title: Elija las partes correctas de la GUI
slug: gui-maker-components
order: 102
description: Elija componentes que muestren diálogos, productos, saldos y mensajes reales.
product: core
category: GUI Maker
section: gui-maker
status: Guía
version: 0.3.1
audience: Creadores de GUI
translationSource: en
translationMethod: assisted
---

## Mantener las partes funcionales en el diseño

Para una conversación, coloca el **diálogo** y **elección** áreas antes de agregar texto o imágenes decorativas. El editor de diálogos proporciona la línea real y las respuestas; GUI Maker proporciona su posición y apariencia.

![Cuadro de diálogo con vista previa de NPC, diálogos y opciones.](assets/media/guides/drm-031-forge1201/gui-maker.png "DRM 0.3.1 / Forge 1.20.1. Mantenga las áreas de diálogo/elección reales separadas del texto decorativo. Escribe la conversación en Dialogue Editor.")

## Partes del diálogo

| Componente | Muestra |
| --- | --- |
| diálogo | Línea NPC del nodo actual |
| elección | Respuestas que pasan por sus condiciones de visibilidad |
| entidad | Vista previa de NPC o entidad |
| elemento | Icono de elemento de presentación |
| Imagen / panel | Imágenes, fondo y encuadre |

Eliminando `dialog` o `choice` elimina el lugar utilizado para esas partes de la conversación.

## Piezas de la tienda

| Componente | Muestra o realiza |
| --- | --- |
| item_slot | Filas de productos |
| player_inventory | Player inventory en modo venta |
| shop_transaction_viewer | Resumen de la transacción prevista |
| shop_action_button | Compra o venta |
| shop_item_description | Descripción del producto seleccionado |
| shop_search_bar / shop_page_selector | Búsqueda y navegación por página |
| currency_display | Saldo del jugador o tenencias de pago |

Los diseños de compra y venta pueden compartir partes, pero el modo activo determina el significado de la fila y la acción. Hacer productos en [NPC Shop](#core/shop-system).

## Divisa y partes del estado del jugador

`currency_list` proporciona el área de lista. `currency_icon`, `currency_amount`, `currency_delta` y `currency_name` muestran un icono, saldo, cambio reciente y nombre. `player_health`, `player_food`, `player_armor`, `player_air` y `player_xp_level` muestran el estado del jugador.

Un componente de cantidad de moneda no otorga dinero. Los saldos cambian a través de las acciones del servidor, las transacciones y la conversión de recolección. Véase [divisa y HUD](#core/currency-hud-shop).

## Piezas remanentes

Utilice `dialog` para el cuerpo del mensaje y `panel / image` para el encuadre. Los mensajes remanentes no utilizan una lista de opciones de conversación. Conecte el diseño a través del mensaje [Remnant](#core/remnant-msg).

Si un componente está en blanco, compruebe si la característica proporciona sus datos y si el componente tiene un área visible. Para la posición y las capas, véase [edición de lienzo](#core/gui-maker-screen).

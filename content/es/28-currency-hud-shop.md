---
title: Use una moneda en tiendas y HUD
slug: currency-hud-shop
order: 92
description: Conecte la misma moneda guardada para realizar pagos y mostrar el saldo del jugador.
product: core
category: Currency Editor
section: currency-editor
status: Guía
version: 0.3.1
audience: Creadores y operadores
translationSource: en
translationMethod: assisted
---

## Seleccione la misma moneda guardada

Guardar `town_coin` en [Currency Editor](#core/currency-editor). Su archivo define el tipo de dinero; una tienda acepta ese dinero y un HUD muestra el saldo del jugador. Seleccione la misma identificación en los tres lugares.

## Aceptar su equilibrio en una tienda

1. Abrir **NPC Shop → Shop settings**.
2. Elija **Shop currency → Currency** y la moneda guardada.
3. Utilice **Payment → Payment method → Inherit Shop** para los productos que lo siguen.
4. Establecer **Price**, guardar y aplicar la tienda al NPC.
5. Pruebe una compra con un jugador que tenga un saldo en esa moneda.

![Configuración de la tienda para el pago común.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. Esta foto utiliza el pago del artículo; cambiar la moneda de la tienda a Moneda para un saldo DRM. Las anulaciones de productos tienen prioridad sobre la configuración común.")

| Pago | Lo que el jugador necesita |
| --- | --- |
| Artículo | Artículos de inventario reales, como cuatro esmeraldas |
| Moneda | Una balanza almacenada, como town_coin 4 |

Una esmeralda **Item Icon** no hace que la tienda acepte artículos esmeralda. Elija el pago por separado. Véase [productos](#core/shop-editor-items) para las anulaciones.

## Mostrar el saldo en un HUD

1. Abrir **HUD Maker → + Currency**.
2. Buscar `town_coin` en **Apply Currency HUD**.
3. Compruebe el ID debajo del nombre y pulse este selector **Apply**.
4. Seleccione el elemento añadido **Currency** y establezca la posición, el tamaño y el formato de cantidad.
5. **Save As** el conjunto HUD y utilizar la barra de herramientas **Apply** para activarlo.

![Moneda de la ciudad / town_coin seleccionada en Aplicar moneda HUD.](assets/media/guides/drm-031-forge1201/hud-currency-picker.png "DRM 0.3.1 / Forge 1.20.1. Aplicar dentro de este selector agrega el componente. Aplicar en la barra de herramientas detrás de él activa el conjunto.")

Configure el formato y la visibilidad de la cantidad en HUD Maker en lugar de agregar campos HUD obsoletos al archivo de moneda. El artefacto comprobado Forge 0.3.1 puede rechazar la segunda salvada de la activación debido a un límite de solicitud; véase la nota de activación de [HUD Maker](#core/hud-maker).

## Preparar dinero para un cheque de transacción

Con permiso administrativo, use el ID guardado real:

```mcfunction
/drm currency give @s town_coin 20
/drm currency get @s town_coin
```

Para una compra de precio cuatro, compare el saldo y el recuento de productos antes y después. Si el comercio funciona pero falta la pantalla, compruebe las reglas activas de HUD, ID de moneda y visibilidad. Utilice [conversión de recolección](#core/currency-fields) para convertir los elementos recopilados en un saldo.

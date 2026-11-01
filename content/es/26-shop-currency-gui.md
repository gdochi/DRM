---
title: Conectar Tienda Moneda y diseños
slug: shop-currency-gui
order: 82
description: Elija artículos de pago o saldos DRM y conecte un escaparate personalizado.
product: core
category: NPC Shop
section: npc-shop
status: Guía
version: 0.3.1
audience: Creadores de tiendas
translationSource: en
translationMethod: assisted
---

## Tome artículos de esmeralda o un saldo de moneda de ciudad

Abrir **NPC Shop → Shop settings → Shop currency**. Un artículo de inventario y un saldo guardado DRM son diferentes métodos de pago.

| Pago | Elegir | Preparar primero |
| --- | --- | --- |
| Artículos de esmeralda | Mismo artículo requerido → Artículo de pago: minecraft:emerald | No se necesita una definición de moneda |
| Balanza de monedas de ciudad | Moneda → guardada town_coin | Guardalo en [Currency Editor](#core/currency-editor) |

![Compra moneda y elementos de pago en la configuración de la tienda.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. Este ejemplo toma elementos esmeralda a través del mismo elemento requerido. Un producto puede anularlo en Pago.")

## Utilice un pago diferente para un producto

Seleccione el producto y abra **Payment**. **Inherit Shop** usa la configuración común; un elemento o una moneda anulan los cambios de ese producto solo. Cambiar el número en Precio no selecciona un método de pago diferente.

![Configuración de pago de pan.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "Compruebe tanto el método de pago como el precio. La cantidad del producto es el paquete entregado; el precio es el costo de ese paquete.")

## Conecta tu propio diseño de tienda

1. Abrir un diseño **npc_shop** en **GUI Maker**.
2. Organice filas de productos, precios y controles de acción; **Save As** su propio diseño.
3. En **NPC Shop → Shop settings → Shop interface**, elija el modo de interfaz personalizada.
4. Utilice el botón de exploración al lado de **Interface JSON** para seleccionar el diseño guardado.
5. Guarde la tienda, aplíquela al NPC y vuelva a abrir la tienda real.

Los diseños separados de compra/venta deben usar **npc_shop**. Un diseño de diálogo no proporciona las áreas de producto y transacción esperadas.

![Tienda NPC real con Pan comprobado y el total del pago a continuación.](assets/media/guides/drm-031-forge1201/shop-bread-selected.png "DRM 0.3.1 / Forge 1.20.1. El ejercicio cuesta cuatro esmeraldas por tres panes. Compruebe los productos seleccionados y el total antes de comprar seleccionados.")

| Cambiar | Editor |
| --- | --- |
| Productos, cantidades, precios, stock | NPC Shop → Producto / Reposición |
| Artículo o saldo de pago | Configuración de la tienda o producto Pago |
| Filas de productos y colocación de botones | GUI Maker → npc_shop |
| Nombre de la moneda, icono y conversión | Currency Editor |
| Un equilibrio siempre visible durante el juego | HUD Maker |

Un componente de saldo muestra dinero; dibujar un icono no lo otorga. Continúe con [currency y HUD](#core/currency-hud-shop) o con el ejercicio [completo de compra](#core/shop-system).

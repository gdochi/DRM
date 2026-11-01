---
title: Productos, recompra y stock
slug: shop-editor-items
order: 81
description: Haga un producto de tres panes que cuesta cuatro esmeraldas, luego configure el stock y reabastezca.
product: core
category: NPC Shop
section: npc-shop
status: Guía
version: 0.3.1
audience: Creadores de tiendas
translationSource: en
translationMethod: assisted
---

## Elija en qué dirección va el comercio

Abre la tienda predeterminada desde [NPC Shop setup](#core/shop-system). **Buy items** contiene productos que el jugador compra; **Sell items** contiene artículos que el jugador vende al NPC. El modo de comercio de la tienda también debe permitir la dirección seleccionada.

| Ejemplo | Lista | El jugador recibe |
| --- | --- | --- |
| NPC vende pan | Comprar artículos | Pan después de pagar |
| NPC compra trigo | Vender artículos | El pago configurado después de dar trigo |

## Haz un paquete de tres panes

![Pan seleccionado en Comprar artículos, con configuración del producto.](assets/media/guides/drm-031-forge1201/shop-bread-product.png "DRM 0.3.1 / Forge 1.20.1. Cantidad 3 es pan por compra; Stock 12 significa doce compras, no doce panes.")

1. Seleccione **Bread** o utilice **Buy items → Add**.
2. Elija el pan debajo de **Product → Item** y configure la pantalla **Name**.
3. Establecer **Quantity 3**, **Stock 12** y **Maximum stock 12**.
4. Añadir un producto **Description** si es necesario. Es independiente del nombre y los efectos del artículo entregado.

Utilice **Duplicate** para una variación y **Delete** para una fila no deseada. El pan común no necesita NBT personalizado; la coincidencia de artículos especiales puede necesitarlo.

## Cargue cuatro esmeraldas por todo el paquete

![Pestaña de pago de pan con precio cuatro y pago de esmeralda.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "Precio 4 compra todo el paquete Cantidad 3. item:minecraft:emerald identifica el elemento de pago.")

Abra **Payment**, configure **Price 4** y utilice **Payment method → Inherit Shop** para seguir la moneda predeterminada de la tienda. Lea **Preview** antes de guardar. Elija **Override: Item / Override: Currency** para un pago específico del producto; use **Required items** para múltiples materiales. Ver [ conexiones de moneda](#core/shop-currency-gui).

## Reposición de un producto limitado

![Pestaña de reabastecimiento con controles de intervalo y cantidad.](assets/media/guides/drm-031-forge1201/shop-restock.png "Habilitar reposición de existencias y establecer el intervalo de reposición de existencias, la cantidad de reposición de existencias y el stock máximo. El reabastecimiento se detiene al máximo.")

| Configuración | Significado |
| --- | --- |
| Existencias 12 / 0 / −1 | Doce compras / agotadas / ilimitadas |
| Cantidad máxima de existencias 12 | Tapón de recarga |
| Importe de reposición 2 | Restaurar dos compras cada intervalo |
| Intervalo de reposición 24000 | Un día normal Minecraft a 20 garrapatas por segundo |

Utilice la cantidad positiva, el intervalo y el máximo para la reposición finita. La tienda **Timer basis** determina cómo se cuenta el tiempo de sueño omitido; ver [ configuración de la tienda ](#core/shop-system). Dos NPC que usan un archivo de tienda mantienen el stock restante separado.

## Comprar artículos del jugador

Utilice **Sell items → Add**, elija el elemento y **Quantity**, luego su pago. Por ejemplo, una cantidad de trigo de tres requiere un paquete completo de tres trigos por venta. Las entradas de recompra no utilizan existencias de productos de venta. Pruebe el elemento exacto al agregar requisitos de NBT.

## Guardar y comprobar una compra

**Save As** `village_shop`, luego abra el NPC con el DRM Núcleo y use **NPC Shop JSON → file → Apply Shop**. Abra el NPC con las manos vacías, compruebe el producto y pulse **Buy Selected**. El ejemplo comprobado entrega tres panes, elimina cuatro esmeraldas y reduce el stock en uno.

Editar la colocación de las filas y la apariencia del botón en [GUI Maker](#core/gui-system); los productos, las cantidades y los precios permanecen en NPC Shop.

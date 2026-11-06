---
title: Crear un NPC Shop
slug: shop-system
order: 80
description: Elige productos, precios y pago, luego dale una tienda a un NPC.
product: core-fabric
category: Sistemas de núcleo
section: npc-shop
status: Estable
version: 0.3.1
audience: Creadores de tiendas
tags:
  - shop
  - economy
translationSource: en
translationMethod: assisted
---

## Hacer una tienda que vende pan

Este ejemplo vende **tres panes por cuatro esmeraldas**. Las capturas muestran **DRM 0.3.1 on NeoForge 1.21.1, in English**.

### 1. Elija el producto y la cantidad

Abra **NPC Shop → Use Default** desde el selector del editor. Seleccione **Bread** en **Buy items** a la izquierda, luego abra **Product** a la derecha. Utilice **Add** para un nuevo producto.

![Pan seleccionado en la lista Comprar artículos, con minecraft:bread y Cantidad 3 en la pestaña Producto.](assets/media/guides/drm-031-neo1211/shop-bread-product.png "El producto define lo que recibe el cliente. Cantidad 3 significa tres panes por compra.")

Utilice la lupa al lado de **Item** para seleccionar el elemento. Ajuste **Quantity** al tamaño del paquete. **Stock** es el número restante de compras: el ejemplo tiene 12; uso **-1** para ventas ilimitadas. **Display name** y **Description** controlan el nombre y la descripción del producto.

### 2. Establecer el precio y el pago

Con el mismo producto seleccionado, abra **Payment**. **Price** es el precio por compra. Con **Quantity 3 + Price 4**, cada compra intercambia cuatro esmeraldas por tres panes.

![Pestaña de pago del pan que muestra la tienda heredada, el precio 4 y el pago del artículo esmeralda.](assets/media/guides/drm-031-neo1211/shop-bread-payment.png "Inherit Shop utiliza el pago predeterminado de la tienda. item:minecraft:emerald a continuación confirma el elemento de pago.")

Establezca ese valor predeterminado en **Shop settings**: elija **Shop currency → Item** y esmeraldas como **Payment item**, por ejemplo. Para usar DRM dinero, crearlo en [ Currency Editor ](#core-fabric/currency-editor) primero.

![Configuración de la tienda con el nombre de la tienda, el archivo de interfaz y la configuración de pago predeterminada.](assets/media/guides/drm-031-neo1211/shop-settings.png "La configuración de la tienda se aplica a toda la tienda. El pago se aplica al producto seleccionado; cambie el método de pago para una anulación específica del producto.")

### 3. Vista previa y guardar

Haga clic en **Preview** en la parte superior para inspeccionar el diseño de la tienda del jugador. Consultar cantidades, precios y descripciones. Regresa con **Close**, elige **Save As**, ingresa `village_shop`, luego confirma con **Save As** en el volante.

![La tienda orientada al jugador se abrió con el botón Vista previa del editor, mostrando productos, precios, una descripción y un resumen de la compra.](assets/media/guides/drm-031-neo1211/shop-player-preview.png "Esta es la vista previa del editor. Pruebe una compra real después de aplicar la tienda guardada a un NPC y traer el artículo de pago.")

Haga clic con el botón derecho en el NPC con el núcleo y elija **NPC Shop JSON → village_shop → Apply NPC Shop**. Vacía ambas manos y habla con él. Para abrirla desde una conversación, siga **Open a shop from dialogue** a continuación.

### 4. Hacer una compra real

Traiga diez esmeraldas y marque solo la casilla al lado **Bread**. Confirme que el resumen muestra tres panes para cuatro esmeraldas, luego presione **Buy Selected**.

![Pan comprobado en la tienda real aplicado al NPC.](assets/media/guides/drm-031-neo1211/shop-bread-selected.png "Esmeralda 10 en la parte superior izquierda es el inventario de pago disponible. El 3 en el icono de pan es el tamaño del paquete; el 1 en el medio es el número de paquetes a comprar.")

![Después de la compra, la esmeralda es 6 y el stock de pan es 11/12.](assets/media/guides/drm-031-neo1211/shop-bread-purchased.png "El inventario del servidor recibió tres panes y las esmeraldas cayeron de diez a seis. El stock de pan cayó de 12/12 a 11/12 y comenzó su temporizador de reabastecimiento. El resumen inferior sigue a la selección actual; no es un recibo de la compra anterior.")

![Seleccionar Bread y comprar un lote; el pago y las existencias se actualizan.](assets/media/guides/extra-videos-20261106/shop-purchase.mp4 "DRM 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1, interfaz en inglés. Tres panes recibidos, esmeraldas 10→6, existencias 12→11.")

## Vender y comprar de nuevo

| Objetivo | Configuración |
| --- | --- |
| NPC vende al jugador | Añadir productos a la lista de compra |
| NPC compra artículos al jugador | Añádelos a la lista de venta/recompra |
| Ambos | Usar el modo de compra y venta |

El NPC solo vuelve a comprar los artículos listados. Puede enumerar el mismo artículo varias veces con diferentes cantidades o precios.

## Existencias y reposición

Stock **0** significa agotado; **-1** significa ilimitado. Para ventas limitadas, use un stock positivo. Configure **Restock** para rellenarlo automáticamente.

![La pestaña Restock del ejemplo de linterna, con Habilitar reposición, base de temporizador, intervalo de reposición y cantidad de reposición.](assets/media/guides/drm-031-neo1211/shop-restock.png "Establecer stock y stock máximo en el producto primero. Restock controla si, cuándo y cuántas compras rellenar. Esta captura utiliza el ejemplo de la linterna.")

**Maximum stock is in Product**; **Restock quantity and interval are in Restock**. Un máximo de ocho con una cantidad de recarga de dos agrega el valor de dos compras cada vez, hasta ocho.

**Timer basis** Se aplica a toda la tienda.

| Configuración | Tiempo contado |
| --- | --- |
| **Real ticks** | El tiempo realmente jugó; los saltos hechos durmiendo se excluyen |
| **World ticks** | Tiempo mundial, incluyendo el tiempo saltado por dormir |

A velocidad normal, 20 las garrapatas son un segundo y 24,000 las garrapatas son aproximadamente 20 minutos. Los ticks reales no cuentan el tiempo mientras el servidor está apagado. Las entradas ilimitadas y de recompra no reabastecen.

Diferentes NPC tienen existencias separadas incluso cuando usan el mismo archivo de producto. Los jugadores que visitan el mismo NPC comparten sus acciones.

## Pago diferente para un producto

**Inherit Shop** usa el dinero de la tienda. **Override: Item** elige un elemento de pago separado. **Override: Currency** elige una moneda separada DRM.

Seleccione un artículo personalizado del inventario cuando su nombre exacto, encantamientos o variantes importen.

## Abrir una tienda desde el diálogo

Agregue una acción **open shop / go_shop** a una opción de diálogo y elija la tienda guardada. Usa **bound** para la tienda ya aplicada a ese NPC.

Utilice [GUI Maker](#core-fabric/gui-system) para el diseño y las imágenes de la ventana. Los productos y los precios todavía se editan en NPC Shop.

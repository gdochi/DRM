---
title: Nombres de divisas, valores y conversión
slug: currency-fields
order: 91
description: Establezca los nombres de las divisas, el formato de la cantidad, los valores de recogida y la moneda física.
product: core
category: Currency Editor
section: currency-editor
status: Guía
version: 0.3.1
audience: Creadores y operadores
translationSource: en
translationMethod: assisted
---

## Nombre y muestra la moneda

Utilice **Currency Editor → General settings** para las reglas de la moneda. Fije los precios de los productos por separado en [NPC Shop → Pago](#core/shop-system).

![Nombre de la moneda, formato de visualización, reglas de defunción y configuración de conversión de artículos.](assets/media/guides/drm-031-forge1201/currency-editor.png "DRM 0.3.1 / Forge 1.20.1. Esto define un tipo de dinero; no establece directamente el precio de un producto o el saldo actual de un jugador.")

| Configuración | Elegir |
| --- | --- |
| Habilitado | Si la moneda se utiliza |
| Nombre | Nombre visible para el jugador |
| Formato de visualización | Formato de la cantidad; `%s G` muestra 1200 como `1200 G` |
| Configuración de muerte | Si y cuánto dinero se pierde |
| Utilizar como moneda compartida | Si se utiliza como moneda compartida |
| Icono del elemento | La imagen representativa de la moneda |

El ID guardado está separado del nombre. **Save As** `town_coin`, luego seleccione la misma moneda en tiendas, recompensas y HUD. Cambiar el nombre del nombre mostrado es diferente de crear otro ID.

## Convertir artículos recogidos en dinero

Habilitar **Convert items on pickup**, luego abrir **Item Prices**. Al seleccionar un icono no se agrega una regla de conversión.

![Artículos abiertos a partir de los precios de los artículos.](assets/media/guides/drm-031-forge1201/currency-item-prices.png "Comience con Agregar elemento, luego asigne valor / elemento a las filas de conversión marcadas y use Aplicar seleccionado.")

1. En **Add Item**, busque y verifique el elemento; use **Add Selected**.
2. Compruebe la fila de conversión de ese elemento.
3. Establecer **Value / Item → 10**, luego **Apply Selected**. Un artículo a juego vale diez unidades de saldo.
4. Cierre la ventana y **Save / Save As** la moneda.
5. Recoge el artículo real y compara su cantidad de inventario con el cambio de saldo.

![town_coin salvo con solo Esmeralda asignado un valor de diez.](assets/media/guides/drm-031-forge1201/currency-emerald-prices.png "DRM 0.3.1 / Forge 1.20.1. La esmeralda vale 10 y el camino salvado es town_coin.json. Esto verifica las reglas guardadas; la conversión de recolección real es una verificación separada.")

Buscando `emerald` también encuentra minerales y bloques. Verifique **Emerald / minecraft:emerald** solo y use **Add Selected (1)** para este ejercicio. **Select Visible** selecciona todos los resultados de búsqueda visibles.

## Moneda física

**Physical currency** define el dinero que se puede entregar como un artículo. Establezca su nombre, ID único y valor por elemento, y luego guarde. El icono, la lista de conversión y la moneda física tienen diferentes usos. Continúe con [currency setup](#core/currency-editor) para conectar una tienda.

---
title: Vender y comerciar Pokémon
slug: pokemart-sales-trade-behavior
order: 541
description: Cree Pokémon productos y ofertas comerciales, luego administre precios y existencias.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Creadores construyendo tiendas de ventas y centros comerciales
tags:
  - sales
  - trade
  - stock
translationSource: en
translationMethod: assisted
---

## Hacer un producto Pokémon

Elija **Sales** y un método de pago en [PokéMart setup](#drm-cobblemon-editor/cobblemon-pokemart), luego abra **Pokémon Catalog → Add**. Seleccione el producto y use **Edit Detailed Pokémon Data** para las especies, el nivel y los movimientos. Establezca su precio y stock, **Save As** su propio archivo, luego aplíquelo al NPC de la tienda.

![Bulbasaur producto con precios y campos de stock.](assets/media/guides/cobble-029-neo1211/cobble-catalog.png "Pantalla del creador en Cobblemon Editor 0.2.9 / NeoForge 1.21.1. Precio 5000, Inicial 3, Máximo 3, Reposición 1 e Intervalo 72000 reponer uno Pokémon por hora hasta tres. Este es un ejemplo de edición, no una compra completada.")

**Los compradores necesitan una ranura de equipo activo gratuita.** Las compras no se envían automáticamente al PC. Consulta el método de pago y entrega Pokémon antes de ampliar el catálogo.

![Tienda NPC real después de una compra, con saldo 60 y stock 2.](assets/media/guides/cobble-029-neo1211-player/cobble-sales-purchased.png "En la misma versión, el producto ahorrado y aplicado cuesta cuatro esmeraldas. Comprar · 4 cambió las esmeraldas 64→60 y las existencias 3→2, y agregó un nivel 5 Bulbasaur al equipo del servidor.")

### Precio y referencia de stock

Un documento de ventas admite hasta 256 productos. Agregue, duplique o elimine filas y, a continuación, utilice el editor detallado Pokémon para la entrega Pokémon.

| Campo | Comportamiento |
| --- | --- |
| ID de producto | Clave de inventario y búsqueda de compra; manténgalo único dentro del documento |
| Pokémon | Especie completa, forma, aspectos, brillante, nivel, naturaleza, habilidad, bola, elemento retenido y hasta cuatro movimientos |
| Descripción | Texto de detalle en tiempo de ejecución, hasta 512 caracteres |
| Precio | Número entero no negativo en la moneda seleccionada |
| Existencias iniciales | Recuento inicial del servidor; `-1` significa ilimitado |
| Stock máximo | Límite de reposición de existencias; normalizado al menos a la acción inicial |
| Cantidad de reposición | Unidades restauradas por intervalo; cero deshabilita el reabastecimiento |
| Intervalo de reposición | 20 cumple 30 días; normalizado a cero cuando la cantidad de reposición es cero |

Si los ID están duplicados, la búsqueda del servidor utiliza la primera coincidencia. Es posible que el editor no presente eso como un error de validación, por lo que los creadores deben mantener los ID únicos.

## Identidad de stock

Las acciones finitas están tecleadas por `NPC UUID + Product ID`. Dos NPC que usan el mismo documento tienen un stock separado. Renombrar Product ID en el mismo NPC crea una nueva clave de stock que comienza en Initial Stock.

El reabastecimiento usa el tiempo del mundo del servidor. El tiempo de reloj de pared sin conexión no rellena el inventario. Cuando las marcas del mundo avanzan y se vuelve a consultar el stock, los intervalos perdidos se aplican juntos hasta el stock máximo.

## Si una compra falla

La entrega o pago fallido restaura el stock y el pago. Reportar errores persistentes y detalles de la transacción a un administrador.

Las compras van al equipo activo. ** Mantenga una ranura de equipo libre antes de comprar.** Las ventas no envían automáticamente las compras al PC.

## Ofertas comerciales

Elija **General → Trade**, luego **Pokémon Trades → Add**. El modelo medio es el Pokémon dado por el NPC; **Requests** debajo identifica lo que el jugador debe dar.

![Bulbasaur ← Rattata oferta con los niveles solicitados, stock y ambos Pokémon botones del editor.](assets/media/guides/cobble-029-neo1211-flow/cobble-mart-trades.png "Un resultado real en 0.2.9 / NeoForge 1.21.1: el jugador da Rattata y recibe Bulbasaur. Ofrecido y solicitado se editan por separado. Esto no muestra un intercambio completo.")

1. Utilice **Edit NPC Offered Pokémon** para elegir la recompensa Pokémon.
2. Utilice **Edit Requested Pokémon** para elegir la especie, forma y aspectos requeridos.
3. Establecer **Minimum / Maximum level**, **Shiny rule** y **NPC Stock** a la derecha.
4. **Save As** y aplicar el archivo al NPC comercial. Los jugadores seleccionan una oferta y una propiedad elegible Pokémon, luego confirman el intercambio.

Un documento comercial admite hasta 128 ofertas. Las siguientes reglas coinciden con el jugador ** Pokémon **.

| Campo de solicitud | Regla de partido |
| --- | --- |
| Especies | Debe coincidir |
| Formulario | Blank permite todas las formas; de lo contrario, coincidencia exacta |
| Aspectos | El Pokémon del jugador debe contener todos los aspectos solicitados separados por comas. |
| Brillante `Any` | Cualquiera de los estados |
| Brillante `Required` | Solo brillante |
| Brillante `Forbidden` | Solo no brillante |
| Mínimo / máximo nivel | Inclusive 1–100 |

La naturaleza, la habilidad, los movimientos, la bola y el elemento retenido afectan a los Pokémon ofrecidos, pero no son campos de coincidencia de solicitudes.

## Completar un intercambio

1. El jugador selecciona una oferta.
2. Elija un Pokémon elegible del equipo activo o PC.
3. Verifique el Pokémon ofrecido y confirme el intercambio permanente.

![Rattata, propiedad del jugador, fue seleccionada para el intercambio.](assets/media/guides/cobble-029-neo1211-player/cobble-trade-player.png "Elija su Pokémon abre la lista de propietarios elegibles. Compruebe el mensaje de requisito individual y verde y, a continuación, presione Confirmar operación.")

![El comercio se completa con la oferta cero y el mensaje de éxito.](assets/media/guides/cobble-029-neo1211-player/cobble-trade-completed.png "Después de la actual Confirm Trade, Rattata fue eliminado del equipo de servidores, se agregó un nivel 5 Bulbasaur y se cambió la oferta de acciones 1→0. Este intercambio no utiliza moneda.")

Si la entrega falla, el servidor intenta restaurar el stock original y restaura la oferta. Si la restauración inmediata falla, el Pokémon se mantiene en [Pokémon Reclamaciones](#drm-cobblemon-editor/pokemart-auction-gui-runtime).

El Pokémon ofrecido va al **equipo activo**. Dar un equipo Pokémon libera su ranura, pero intercambiar un PC Pokémon con un equipo completo puede fallar la entrega. Mantenga una ranura de equipo libre.

Las acciones comerciales usan `NPC UUID + Trade ID` y las mismas reglas de Inicial/Máximo/Reposición. Las identificaciones comerciales también deben ser únicas.

## Casos de prueba

El complemento obtiene productos de ventas, ofertas comerciales y coincidencias propiedad de Pokémon por búsqueda y página. Los catálogos grandes y el almacenamiento de PC ya no tienen que enviarse como una lista.

- Dos jugadores haciendo clic en la última fila de acciones finitas deben producir un éxito.
- Pruebe la compra y la recuperación de operaciones con capacidad limitada de equipo o PC.
- Confirmar la moneda del artículo rechaza NBT no coincidente.
- Formulario de prueba y solicitudes de aspecto contra tanto ordinario y variante Pokémon.
- Tratar las identificaciones de producto y comercio publicadas como identificadores de existencias persistentes.

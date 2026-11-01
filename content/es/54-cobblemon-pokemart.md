---
title: Crear una tienda Pokémon o NPC comercial
slug: cobblemon-pokemart
order: 540
description: Crear NPCs que vendan, negocien o subasten Pokémon.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Pokémon creadores de tiendas y operadores de servidores
tags:
  - pokemart
  - editor
  - runtime
translationSource: en
translationMethod: assisted
---

## Elige un rol

**PokéMart Editor** hace NPCs de comercio Pokémon. Utilice DRM's **NPC Shop** para tiendas de artículos ordinarios.

| Función | Actividad del jugador |
| --- | --- |
| **Sales** | Comprar Pokémon a precios fijos |
| **Trade** | Cambiar una propiedad coincidente Pokémon |
| **Auction** | Enumerar, ofertar y cobrar asentamientos |

Un NPC usa un rol. Utilice NPCs separados para una tienda y un servicio comercial.

![PokéMart Rol general y configuración de pago.](assets/media/guides/cobble-029-neo1211/cobble-pokemart.png "Elija Papel y moneda de NPC a la derecha. El proveedor predeterminado es CobbleDollars; cámbielo a un proveedor de pago disponible si ese mod está ausente. Versión 0.2.9 / NeoForge 1.21.1.")

## Hacer la primera tienda

1. Abra **Add-on → PokéMart Editor** de la lista de editores DRM.
2. Cargue un valor predeterminado y elija **General → NPC Role → Sales**.
3. Defina el nombre y el pago en **General**.
4. Utilice **Pokémon Catalog → Add**, luego **Edit Detailed Pokémon Data** en la parte inferior derecha para elegir especie, nivel, forma y otros detalles.
5. Establece su precio y **NPC Stock → Initial**. **-1** es ilimitado.
6. **Save As** su propio archivo.
7. Abra un DNPC o CustomNPCs NPC con el DRM Core y aplique **PokéMart**.
8. Interactúa con las manos vacías. Los compradores necesitan una ranura de equipo gratis.

![Pokémon Edición de catálogo a nivel 5 Bulbasaur producto, precio y stock.](assets/media/guides/cobble-029-neo1211/cobble-catalog.png "Selecciona un producto a la izquierda para editarlo a la derecha. Este ejemplo cuesta 5000, comienza / limita en 3 y reabastece 1 cada 72000 garrapatas: una hora a 20 garrapatas por segundo.")

## Elija el pago

**Currency Provider / ID** selecciona DRM moneda, artículos o CobbleDollars. Crea DRM dinero en Currency Editor primero; CobbleDollars necesita su mod instalado.

El comercio utiliza una coincidencia Pokémon en lugar de dinero. Ver [ventas y comercios](#drm-cobblemon-editor/pokemart-sales-trade-behavior).

## Cambiar la pantalla

Seleccione el diseño orientado al jugador en **Runtime GUI**. Los campos de entrada del editor y la pantalla de la tienda del jugador son diseños separados.

Véase [ registro de subastas, ofertas y colección](#drm-cobblemon-editor/pokemart-auction-gui-runtime) para las subastas.

## Actualizar la tienda

**Save** cambios de producto/precio en el mismo archivo para la siguiente interacción. **Apply** de nuevo después de cambiar el nombre de archivo o rol.

Las acciones, las subastas y los datos de recolección permanecen en el mundo. Mueve configuración y mundo juntos. La eliminación del enlace de la tienda del NPC no elimina las subastas en curso.

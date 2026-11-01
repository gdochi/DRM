---
title: Forge 0.2.1 Actualización
slug: release-0-2-1
order: 7
description: Por NPC tienda stock, relojes de reposición de existencias, y controles de mosaico GUI.
product: core
category: Primeros pasos
section: getting-started
status: Estable
version: 0.2.1
audience: Creadores / Operadores
translationSource: en
translationMethod: assisted
---

:::note Registro histórico de lanzamientos
Esta página registra la versión anterior. Utilice la guía de instalación actual 0.3.1.
:::

## Encuentra el reloj de reabastecimiento

Seleccione un producto en NPC Shop y, a continuación, abra Restock. Las garrapatas reales ignoran el tiempo que se salta al dormir; las garrapatas del mundo siguen el tiempo del mundo. Establezca primero el stock finito y máximo bajo Producto. Continuar con el [guía actual](#core/shop-system) para guardarlo y aplicarlo.

![Encuentra el reloj de reposición.](assets/media/guides/drm-031-forge1201/shop-restock.png "DRM 0.3.1 / Forge 1.20.1. Esta es la característica relacionada en la compilación de producción actual, no una captura de la interfaz de usuario histórica descrita a continuación.")

## Medio ambiente en esta versión

Minecraft 1.20.1 · Forge · DRM **0.2.1**. Actualice el servidor y todos los clientes juntos y haga una copia de seguridad `config/dochi_rpg_maker` y el mundo.

## NPC Shop

- El stock de tiempo de ejecución y los plazos persisten por NPC en NBT. Los diferentes NPC que usan el mismo JSON tienen un stock separado.
- JSON mantiene la configuración inicial de existencias, productos y reposición de existencias; la definición ahorra/exporta omitiendo los plazos de ejecución.
- Elija `Real ticks` o `World ticks` en los detalles del producto en `RESTOCK > Timer basis`. La opción se aplica en toda la tienda y controla si los saltos de sueño cuentan.

Ver [NPC Shop ](#core/shop-system) para configuración y migración de stock heredado.

## GUI Maker

- Tile/Stretch y entrada directa `Sprite Scale %` en `Default UI Settings`, con escala 50– 400 %.
- Ancho/altura de mosaico por componente desde 10–800% cuando la imagen `Fit` es `Tile`.
- Dialogue runtime lee la configuración de Tile, con mejor representación y visibilidad de imágenes repetidas.

Véase [GUI Maker](#core/gui-system) para la autoría y la referencia JSON. Utilice `Save As` para las copias personalizadas de las plantillas agrupadas.

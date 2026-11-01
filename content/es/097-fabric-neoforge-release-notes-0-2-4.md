---
title: Fabric y NeoForge 0.2.4 actualización
slug: release-notes-0-2-4
order: 7
description: Flujo de trabajo de creación compartido, relojes de reabastecimiento y configuración de mosaicos de GUI.
product: core-fabric
category: Primeros pasos
section: getting-started
status: Estable
version: 0.2.4
audience: Creadores / Operadores
translationSource: en
translationMethod: assisted
---

Este es un registro de liberación histórico. Ver [ DRM 0.3.1 ](#core-fabric/release-notes-0-3-1) para la dirección actual.

:::note Registro histórico de lanzamientos
Esta página registra la versión anterior. La línea base actual de la instalación Core es 0.2.5.
:::

## Buscar opciones de reposición

Abrir NPC Shop Reabastecimiento para Habilitar reabastecimiento y base de temporizador. Establezca primero el stock finito y máximo bajo Producto. El 24000 ticks de la imagen es un ejemplo, así que elija un período adecuado para su servidor. Continuar con el [guía actual](#core-fabric/shop-system) para guardarlo y aplicarlo.

![Encuentra opciones de reposición.](assets/media/guides/drm-031-neo1211/shop-restock.png "DRM 0.3.1 / NeoForge 1.21.1. Esta es la característica relacionada en la compilación de producción actual, no una captura de la interfaz de usuario histórica descrita a continuación.")

## Documentación e instalación compartidas

**Fabric and NeoForge DRM 0.2.4 for Minecraft 1.21.1** Comparte esta documentación. Las herramientas de creación y los flujos de trabajo normales son los mismos; elija el JAR y las dependencias de su cargador en [Instalación](#core-fabric/installation).

## NPC Shop

Elija `Real ticks` o `World ticks` en los detalles del producto en `RESTOCK > Timer basis`. La configuración se aplica en toda la tienda. Las garrapatas reales cuentan las garrapatas reales del juego; Las garrapatas mundiales incluyen el tiempo mundial saltado por el sueño.

Cambiar el reloj o retroceder el tiempo vuelve a basar el tiempo de reutilización restante. El estado de stock/restock en tiempo de ejecución basado en archivos conserva la persistencia JSON existente. Véase [NPC Shop ](#core-fabric/shop-system).

## GUI Maker

- Tile/Stretch y entrada directa `Sprite Scale %`, 50–400%.
- Por componente `Tile W %` y `H %` cuando `Fit` es `Tile`, cada 10–800%.
- Ajustes consistentes de Tile entre la vista previa y el diálogo en vivo, con una mejor representación de la imagen repetida.

Véase [GUI Maker ](#core-fabric/gui-system). La anchura/altura de los mosaicos son ajustes de componentes, no los valores predeterminados de la interfaz de usuario global.

## Misiones y complementos

Ambos editores de misiones actuales crean misiones automáticas. Agregue la construcción Dochi Cobblemon Editor correspondiente para los objetivos de la victoria del entrenador. Ver [Quests](#core-fabric/quest-system) y [Trainer Victory Quests](#drm-cobblemon-editor/cobblemon-trainer-quests).

Haga una copia de seguridad `config/dochi_rpg_maker` y el mundo, luego instale matching-loader 0.2.4 en el servidor y en cada cliente. Utilice `Save As` para versiones personalizadas de valores predeterminados protegidos.

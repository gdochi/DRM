---
title: Forge 0.2.2 Actualización
slug: release-0-2-2
order: 6
description: Favoritos del editor y mejoras en las texturas externas de PNG y NPC.
product: core
category: Inicio
section: getting-started
status: Guía de uso
version: 0.2.2
audience: Creadores / operadores
translationSource: en
translationMethod: assisted
hiddenNav: true
---

## Buscar favoritos del editor

Usa una estrella junto a un editor para marcarla como favorita y luego regresa a través de Favoritos a la izquierda. Cargar, Use Default y Create New iniciar el trabajo en el editor seleccionado. Continuar con el [guía actual](#core/quick-start) para guardarlo y aplicarlo.

![Buscar favoritos del editor.](assets/media/guides/drm-031-forge1201/editor-selector.png "DRM 0.3.1 / Forge 1.20.1. Esta es la característica relacionada en la compilación de producción actual, no una captura de la interfaz de usuario histórica descrita a continuación.")

## Instalación en esta versión

El núcleo actual DRM para Minecraft 1.20.1 / Forge / Java 17 es ** 0.2.2 **. Fabric y NeoForge 1.21.1 usan Core 0.2.5; seleccione el JAR para su cargador. Actualice el servidor y los clientes juntos y respalde la configuración y el mundo.

## Favoritos del editor

Utilice ☆/★ en la lista del editor para agregar o quitar herramientas favoritas. Encuéntralos en la categoría Favoritos y en la parte superior de la lista. Las preferencias son locales a la instancia del juego en `config/dochi_rpg_maker/editor_favorites.json`; no cambian los documentos del servidor ni las vinculaciones NPC.

## Imágenes externas y texturas NPC

Los PNGs del activo del servidor y las texturas del paquete de recursos se resuelven por separado, con una reserva durante la carga o descarga. Se ha mejorado la integración de la imagen GUI y la textura del modelo Gecko NPC. Guarde las imágenes externas bajo `config/dochi_rpg_maker/assets/textures/` y remítalas como `dochi_rpg_maker:textures/...png`.

## Nuevo complemento de mapa

[MapIcon La integración 0.1.0](#dochi-mapicon-integration/mapicon-setup) se instala por separado. Configura los iconos de Xaero por tipo JSON, archivo y NPC; la instalación de Core por sí sola no proporciona iconos de mapa.

Los [0.2.1 registro](#core/release-0-2-1) sigue estando disponible para su NPC Shop cambios en las existencias y los mosaicos de la GUI.

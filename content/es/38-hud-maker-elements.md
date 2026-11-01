---
title: Agregar y colocar elementos HUD
slug: hud-maker-elements
order: 111
description: Agregue salud, saldos y otra información, luego ajuste el tamaño y las capas.
product: core
category: HUD Maker
section: hud-maker
status: Guía
version: 0.3.1
audience: Creadores de HUD
translationSource: en
translationMethod: assisted
---

## Añade la información que quieres ver

Abrir [HUD Maker ](#core/hud-maker). Usa **+ Salud**, **+ Alimentos** o **+ Moneda** en **HUD TYPE**. A continuación, seleccione esa entrada en **ADDED HUD TYPES** para editarla a la derecha.

![Salud seleccionada en el lienzo HUD y en el Inspector.](assets/media/guides/drm-031-forge1201/forge-hud-health.png "DRM 0.3.1 / Forge 1.20.1. La entrada añadida seleccionada tiene un . Este ejemplo se posicionó en X 400 / Y 250 y se guardó como guide_hud.")

| Añadir | Muestra |
| --- | --- |
| + Moneda | Saldo de una moneda ahorrada |
| + Salud / Alimentos / Armadura / Aire / Nivel | Supervivencia del jugador y valores de experiencia |
| + Cabeza del jugador | Rostro del jugador |
| Integraciones opcionales de maná/resistencia | Valores del proveedor instalado |

Un botón deshabilitado puede indicar la moneda faltante o los datos del proveedor. **CNPC Tempdata / Storeddata** requiere CustomNPCs en un objetivo más antiguo compatible.

## Mover, cambiar el tamaño y duplicar

Desplácese por el inspector hasta **Box ID / Layer # / X / Y / W / H**. El ID de caja distingue el elemento; Layer controla el orden frontal/trasero. Posición de ajuste X/Y y tamaño de ajuste W/H. También puede seleccionar y mover elementos en el lienzo.

Los ajustes de texto, barra e icono disponibles dependen del elemento. **Duplicate** copia el elemento seleccionado; mueve la copia para que no cubra el original.

Si la información de supervivencia está oculta en Creative, comprueba **Render survival HUD** e inspecciona Survival también. La eliminación de un elemento DRM está separada de [ocultar corazones de vainilla](#core/hud-maker-vanilla).

**Save As** su conjunto. La limitación de activación-guardar marcada Forge 0.3.1 se describe en [HUD setup](#core/hud-maker); un archivo guardado por sí solo no prueba que la activación haya tenido éxito.

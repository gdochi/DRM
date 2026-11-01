---
title: Primeros pasos
slug: quick-start
order: 1
description: Consigue la herramienta DRM y crea el primer diálogo de un NPC.
product: core
category: Primeros pasos
section: getting-started
status: Estable
version: 0.3.1
audience: Creadores y operadores de servidores
translationSource: en
translationMethod: assisted
---

## Crear el primer diálogo de un NPC

Con DRM puedes crear diálogos, tiendas y misiones para NPCs. Empieza con un NPC y un saludo breve.

1. En modo Creativo, consigue **Dochi RPG Maker Core** o escribe `/give @s dochi_rpg_maker:dialogue_editor`.
2. Sostén el Core y **haz clic derecho en el aire**.
3. Selecciona **Dialogue Editor** y elige **Use Default** a la derecha.
4. Selecciona un nodo de diálogo normal y cambia la frase y el texto de las opciones.
5. Usa **Save As** para guardar tu propio diálogo.
6. Con el Core en la mano, haz clic derecho en un NPC de DNPC o CustomNPCs y aplica el diálogo guardado.
7. Deja las dos manos vacías y haz clic derecho en el NPC para hablar.

¿Necesitas crear primero un NPC? Sigue [Crear un NPC](#dochi-npc-core/npc-core-setup). Utilice DNPC en Minecraft 26.3.

![Selector de editores de DRM, con Dialogue Editor seleccionado y Use Default a la derecha.](assets/media/guides/drm-031-forge1201/editor-selector.png "DRM 0.3.1 sobre Forge 1.20.1, en inglés. Crea los diálogos en Dialogue Editor y configura los productos de la tienda en NPC Shop.")

Para crear tus primeros nodos y opciones, sigue [la guía ilustrada de diálogo](#core/dialogue-system). La guía explica cómo escribir la frase, conectar la respuesta, usar Save As y probar el diálogo en el NPC.

## Elige lo que quieres hacer

| Objetivo | Herramienta | Guía |
| --- | --- | --- |
| Diálogo y opciones | Dialogue Editor | [Conversaciones](#core/dialogue-system) |
| Un NPC que compra o vende artículos | NPC Shop | [Tiendas](#core/shop-system) |
| Un diálogo personalizado/apariencia de tienda | GUI Maker | [Diseño de pantallas](#core/gui-system) |
| Nombres de dinero, iconos y saldos | Currency Editor | [Monedas](#core/currency-editor) |
| Información que permanece en la pantalla | HUD Maker | [HUDs](#core/hud-maker) |

Las misiones, los destinos de viaje y las ventanas emergentes también se abren desde el selector del editor. Los complementos instalados añaden sus propias herramientas.

## Cuándo guardar y aplicar

**Save / Save As** guarda tu trabajo en un archivo. **Apply** define qué NPC utiliza ese archivo. Guarda el nuevo diálogo o la nueva tienda y después aplica el archivo al NPC.

Usa **Save As** para guardar una copia del ejemplo con el nombre que elijas. Usa **Save** para los cambios posteriores en tu archivo.

## Antes de instalar

Esta guía es para Forge 1.20.1. Véase [instalación](#core/installation), o usar el [Fabric/NeoForge guía](#core-fabric/quick-start) Para esos cargadores.

Para mover el trabajo guardado a otro servidor, vea [carpetas](#core/paths).

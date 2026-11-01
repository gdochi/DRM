---
title: Elija Fabric o NeoForge Archivos
slug: installation
order: 2
description: Instale el archivo DRM y los requisitos correspondientes para 1.21.1.
product: core-fabric
category: Primeros pasos
section: getting-started
status: Estable
version: 0.3.1
audience: Creadores / Operadores
translationSource: en
translationMethod: assisted
---

## Coincidir con el cargador

| Artículo | Fabric | NeoForge |
| --- | --- | --- |
| Minecraft | 1.21.1 | 1.21.1 |
| Java | 21 | 21 |
| Cargador | Fabric Cargador 0.18.0+ | NeoForge 21.1+ |
| Fabric API | 0.116.11+1.21.1+ | No utilizado |
| DRM archivo | 0.3.1 Fabric 1.21.1 | 0.3.1 NeoForge 1.21.1 |

**26.3 necesita diferentes archivos.** Véase [26.3 instalación](#core-fabric/minecraft-26-3) para Java 25 y sus compilaciones. Forge 1.20.1 utiliza la guía [Forge ](#core/installation).

Coloque los archivos en **mods**. Coincidir Minecraft, archivos de cargador y mod en el servidor y los clientes.

## Añade las funciones que desees

| Característica | Mod adicional |
| --- | --- |
| Crear NPCs | DNPC o de carga coincidente CustomNPCs |
| Gecko modelos | Coincidiendo con GeckoLib |
| Conexiones de búsqueda FTB | Misiones FTB |
| Pokémon Entrenadores, tiendas y curación | Cobblemon Editor y Cobblemon |
| Botón de ajustes en la lista de mods de Fabric | Menú Mod |

DRM solo abre sus herramientas de edición. Véase [DNPC Cómo empezar](#dochi-npc-core/npc-core-setup) para crear un personaje.

## Inicio en el juego

1. Obtén **Dochi RPG Maker Core** en Creativo, o ingresa `/give @s dochi_rpg_maker:dialogue_editor`.
2. Haga clic derecho en aire con él.
3. Abre **Dialogue Editor** y haz [ tu primera conversación ](#core-fabric/quick-start).

Los ejemplos y las carpetas de configuración se crean en la primera ejecución. Fabric excluye el editor de elementos y el generador de estadísticas.

![El selector de editor se abre con Core después de la instalación.](assets/media/guides/drm-031-neo1211/editor-selector.png "DRM 0.3.1 / NeoForge 1.21.1. Seleccionando Dialogue Editor expone Carga, Use Default y Create New. Comience con Use Default, luego Save As su propio trabajo. Los complementos instalados cambian la lista disponible.")

## Mover un servidor

Mantener `config/dochi_rpg_maker/` y el mundo juntos. La configuración por sí sola no incluye los NPC colocados, el progreso de la misión o el estado del generador.

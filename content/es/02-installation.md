---
title: Elija Forge Archivos de instalación
slug: installation
order: 2
description: Instale DRM y el NPC mod elegido en Forge 1.20.1.
product: core
category: Primeros pasos
section: getting-started
status: Estable
version: 0.3.1
audience: Operadores de servidor
tags:
  - install
  - forge
translationSource: en
translationMethod: assisted
---

## Archivos requeridos

| Artículo | Elegir |
| --- | --- |
| Minecraft | Edición de Java 1.20.1 |
| Java | 17 |
| Cargador | Forge 47+ |
| DRM | Forge 1.20.1 versión 0.3.1 |

Coloque el archivo mod en **mods**. En un servidor, instale archivos coincidentes en el servidor y en cada cliente.

Utilice la [Guía separada](#core-fabric/installation) por Fabric/NeoForge.

## ¿Quieres NPCs también?

Instalar [DNPC](#dochi-npc-core/npc-core-setup) o compatible CustomNPCs. DRM en sí no requiere un mod NPC, pero necesitas uno para crear los personajes que reciben conversaciones o tiendas.

Agregue mods opcionales para las características que utiliza, como GeckoLib para modelos Gecko o FTB Quests para conexiones de misiones FTB.

## Abrirlo después de la instalación

1. Entra en un mundo en modo creativo.
2. Obtén **Dochi RPG Maker Core**, o usa `/give @s dochi_rpg_maker:dialogue_editor`.
3. Haga clic derecho en aire con él.
4. Una vez que se abra la lista del editor, siga [ su primera conversación ](#core/quick-start).

Los ejemplos agrupados se preparan en la primera ejecución; no se necesita JSON escrito a mano para comenzar.

![El selector de editor se abre con Core después de la instalación.](assets/media/guides/drm-031-forge1201/editor-selector.png "DRM 0.3.1 / Forge 1.20.1. Seleccionando Dialogue Editor expone Carga, Use Default y Create New. Comience con Use Default, luego Save As su propio trabajo. Los complementos instalados cambian la lista disponible.")

## Actualizaciones y servidores móviles

Reemplace los archivos mod antiguos en lugar de mantener ambas versiones. Mantenga `config/dochi_rpg_maker/` junto con el mundo, que también almacena los NPC colocados y el progreso del jugador.

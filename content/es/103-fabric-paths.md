---
title: Carpetas y rutas
slug: paths
order: 40
description: Las reglas de ruta JSON raíz y servidor de datos principales DRM reales.
product: core-fabric
category: Primeros pasos
section: getting-started
status: Estable
version: 0.3.1
audience: Creadores / Operadores
tags:
  - paths
  - files
translationSource: en
translationMethod: assisted
---

## ¿Dónde está la conversación que guardé?

En el modo de un jugador, abre la carpeta ** del juego para tu instancia actual del lanzador**. En el modo multijugador, utilice la carpeta del servidor conectado ****. Los archivos de autoría viven bajo `config/dochi_rpg_maker/` allí.

Para **Dialogue Editor → Save As → village_guide**, mira en `config/dochi_rpg_maker/dialogue_sets/village_guide/`. Un conjunto de conversaciones es una carpeta: copie la carpeta **completo** al moverla a otro servidor.

![Dialogue Editor muestra la ruta de la carpeta de la conversación guardada.](assets/media/guides/drm-031-neo1211/dialogue-save-result.png "DRM 0.3.1 / NeoForge 1.21.1. Después de Save As, SET FOLDER / TOOLS muestra la carpeta establecida actual. Utilice esa ruta para identificar la instancia correcta.")

## Archivos a traer para cada tarea

Todos los caminos de abajo están dentro de `config/dochi_rpg_maker/`. Encuentra el nombre que guardaste en el editor.

| Lo que hiciste | Ubicación | Traer consigo |
| --- | --- | --- |
| NPC diálogo | `dialogue_sets/village_guide/` | Carpeta de todo el conjunto y GUI vinculado, tienda o misiones |
| Tienda NPC | `npc_shops/village_shop.json` | Moneda, GUI y mods de elementos que utiliza |
| Diseño de diálogo/tienda | `gui/` | Imágenes y texturas de referencia |
| Tipo de moneda | `currency/definitions/town_coin.json` | Tiendas y HUD que usan esa moneda |
| HUD | `hud/sets/guide_hud/` | Total hud_set.json y componentes/. Selección activa: hud/active_set.json |
| Misiones | `quests/<pack-name>/` | pack.json y misiones individuales en misiones/ |
| Estadísticas | `stats/sets/` | Selección activa stats/active_set.json |
| Elementos de la base de datos | `items/definitions/` | Reglas de autor items/editor_settings.json |
| Destinos de viaje | `teleporters/` | Conjunto de destino y GUI vinculado |
| Popups | `popups/definitions/` | Mostrar políticas en ventanas emergentes/políticas/ si se utilizan |
| Mensajes mundiales | `remnant_msg/messages/` | remnant_msg/políticas/ y GUI vinculada |
| Creador PNGs | `assets/textures/` | Coincidencia .png.mcmeta para texturas animadas |
| Pantalla de facción | `factions/` | Ajustes y preajustes requeridos |
| Ajustes predeterminados/compartidos | `settings/` | Revisa la configuración que cambiaste antes de moverla |

Las propias plantillas NPC de DNPC usan una carpeta separada ****, `config/dochi_npc_core/templates/`. Ver [ salvar NPCs](#dochi-npc-core/npc-core-templates). Compruebe la guía de almacenamiento de cada addon para BattleWorks, Spawn Control y otros archivos addon.

## El archivo se movió, pero el NPC no cambió

Los archivos de autoría y los NPC mundiales están separados. En el servidor de destino, compruebe el archivo y, a continuación, ** haga clic con el botón derecho en el NPC con DRM Core → seleccione el archivo → Apply**. Traiga imágenes y tiendas referenciadas también.

Véase [saving y NPC application](#core-fabric/core-concepts) para los botones. Copia de seguridad **config y world save juntos** al mover o restaurar un servidor completo; los archivos de creación por sí solos no restauran la ubicación de NPC, los reproductores y el progreso.

## Falta un archivo guardado en la lista

1. Compruebe la carpeta de juego real del servidor. Una copia solo de cliente no aparece en la lista de servidores.
2. Utilice la carpeta correcta para una conversación, tienda o archivo GUI.
3. Abra **Load / Refresh** y borre los filtros de búsqueda.
4. Usa **Save As** con tu propio nombre cuando personalices un ejemplo incluido.

Introduzca nombres como `village_shop.json` en los campos de nombre de archivo del editor; el editor ya selecciona su propia carpeta de almacenamiento. Para ver las ediciones de archivos externos, consulte [recargar el trabajo guardado](#core-fabric/data-flow).

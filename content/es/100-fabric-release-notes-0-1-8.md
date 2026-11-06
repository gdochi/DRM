---
title: Fabric 0.1.8 Actualización
slug: release-notes-0-1-8
order: 10
description: Las principales adiciones en Fabric 0.1.8 desde la versión pública 0.1.7, además de los requisitos de actualización.
product: core-fabric
category: Primeros pasos
section: getting-started
status: Estable
version: 0.1.8
audience: Jugadores / Creadores / Operadores
tags:
  - release
  - changelog
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Este es un registro de liberación histórico. Ver [ DRM 0.3.1 ](#core-fabric/release-notes-0-3-1) para la dirección actual.

0.1.8 es una actualización importante construida sobre las herramientas de diálogo, tienda, Teletransportador y Spawner NPC de 0.1.7. Agrega misiones, facciones, ventanas emergentes, administración y un conjunto de herramientas de presentación de NPC y activos mucho más grande.

## Encontrar objetivos y recompensas

Agregue una categoría y una búsqueda en Quest Editor, luego complete Información, Objetivos y Recompensas. El diario del jugador es una pantalla separada. Este editor actual NeoForge no establece todas las reglas de finalización en histórico Fabric. Continuar con el [guía actual](#core-fabric/quest-system) para guardarlo y aplicarlo.

![Encuentra objetivos y recompensas.](assets/media/guides/drm-031-neo1211/quest-info.png "DRM 0.3.1 / NeoForge 1.21.1. Esta es la característica relacionada en la compilación de producción actual, no una captura de la interfaz de usuario histórica descrita a continuación.")

## Nuevo de un vistazo

| Característica | Lo que hace | Cómo abrir |
| --- | --- | --- |
| Quest Editor | Crea paquetes de misiones con objetivos, requisitos previos, recompensas, reglas de repetición y enlaces de diálogo NPC | Selector de editor del elemento principal |
| Diario de misiones | Busca, rastrea, acepta y entrega misiones de jugadores | Tecla por defecto `U` |
| Faction Editor | Agrega nombres, iconos, descripciones, categorías y presentación de relaciones a CustomNPCs facciones | Selector de editor del elemento principal |
| Resumen de facción | Muestra las puntuaciones de la facción del jugador y sus relaciones | Tecla por defecto `J` |
| Creador de popups | Crea anuncios con texto, imágenes, sonidos, tiempo y prioridad | Selector de editor del elemento principal |
| DRM Admin | Gestiona etiquetas de jugador, moneda, misiones, avances, puntos de facción y datos almacenados | `F7` para operadores autorizados |

## Creación y presentación de NPC

- Las barras superiores del editor, los paneles, las listas, la alineación y el enfoque de entrada son más claros y coherentes.
- Los archivos PNG en `config/dochi_rpg_maker/assets/textures` se pueden buscar, filtrar y previsualizar.
- Un archivo `.png.mcmeta` coincidente puede animar una textura PNG.
- NPC Basic añade una textura más profunda, modelo, animación, vista previa de la cámara, y los controles hitbox.
- La instalación de GeckoLib permite modelos NPC personalizados, animaciones y acciones de animación de diálogo.

## Mejoras de características existentes

- Una moneda puede tener un formulario de artículo físico y un valor por artículo.
- Los HUD pueden mostrar CustomNPCs valores de datos almacenados y valores de tempdata.
- Los comandos de teletransportador pueden ejecutarse en los momentos elegidos alrededor del fundido y el teletransporte.
- Dialogue, tiendas, NPC Apply, NPC Spawner y Remnant Msg recibieron correcciones de búsqueda, desplazamiento, entrada y vista previa.
- Las grandes listas de activos y las pantallas del editor evitan la carga repetida innecesaria.

## Antes de actualizar

:::warning CustomNPCs Ahora es necesario
0.1.8 requiere CustomNPCs `1.0.0`. Instale DRM 0.1.8, Fabric API y CustomNPCs en el servidor y en cada cliente de conexión.
:::

GeckoLib, FTB Quests, Mod Menu y CobbleDollars siguen siendo integraciones opcionales. Respaldar el mundo y `config/dochi_rpg_maker` antes de la actualización.

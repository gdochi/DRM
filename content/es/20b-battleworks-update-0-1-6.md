---
title: Seleccione su BattleWorks Construir
slug: battleworks-update-0-1-6
order: 208
description: Elija DRM y un mod NPC para su versión Minecraft.
product: mob-editor
category: 0.1.6 y selección de cargador
section: start
status: Guía
version: 0.1.6
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Mods requeridos

BattleWorks **agrega autoría de combate NPC a DRM**. Crea el NPC con DNPC o CustomNPCs.

| Minecraft / cargador | Java | Archivos a elegir |
| --- | --- | --- |
| Forge 1.20.1 | 17 | Forge 1.20.1 compilaciones de BattleWorks, DRM y el mod NPC |
| Fabric / NeoForge 1.21.1 | 21 | 1.21.1 compilaciones para el cargador seleccionado |
| Fabric / NeoForge 26.3 | 25 | 26.3 compilaciones de BattleWorks, DRM y DNPC para el cargador seleccionado |

Coinciden con cargadores / versiones en el servidor y los clientes. El uso DNPC en 26.3; CustomNPCs no está disponible allí.

## Haz un ataque

Coloque un NPC, haga su archivo de combate BattleWorks y aplíquelo. Sigue [ tu primer ataque cuerpo a cuerpo](#mob-editor/battleworks-first-attack) para construir el viento, el golpe y la recuperación. El tutorial actual utiliza un DNPC en NeoForge 1.21.1 y comprueba el ahorro, la aplicación y el daño real.

DNPC también apoya el combate, las relaciones y la integración de apariencia. El movimiento adicional requiere sus respectivos mods de animación.

El primer ataque tutorial fue verificado con **BattleWorks 0.1.6 + DRM 0.3.1 + DNPC 0.1.3 / NeoForge 1.21.1**. El éxito con esta combinación no establece una versión mínima DRM que excluya todas las versiones antiguas.

![Un archivo de combate guardado BattleWorks vinculado a un DNPC.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Después de la instalación, verifique el guardado, la aplicación y el éxito real, así como la apertura del editor.")

## Usar patrones de ejemplo

Cargar ejemplos desde `config/dochi_rpg_maker/mobs/patterns/samples/`. Usa **Save As** para hacer tu propia versión.

Los ejemplos de Better Combat necesitan un Better Combat compatible y sus requisitos de movimiento. La invocación del clon heredado CustomNPCs no está disponible en 26.3.

Continuar con [Configuración de NPC](#mob-editor/mob-editor-setup) o el [ruta de aprendizaje](#mob-editor/mob-editor-overview).

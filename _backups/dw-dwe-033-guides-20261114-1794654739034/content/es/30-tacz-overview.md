---
title: hacer un arma de fuego NPC
slug: dochi-warfare-overview
order: 310
description: Usa Warfare para elegir el arma, los objetivos, las recargas y el comportamiento de combate de un PNJ.
product: dochi-warfare
category: Sinopsis
section: overview
status: Proyecto
version: 0.3.1
audience: Creadores de PNJ con armas de fuego
tags:
  - TACZ
  - customnpcs
  - overview
translationSource: en
translationMethod: assisted
---

## El editor de armas de fuego NPC

Abre el NPC con **DW Npc Core**. Las categorías de la izquierda contienen armas, sentidos, municiones y selección de objetivos. Esta interfaz de usuario Inglés utiliza **DW 0.3.1, DNPC 0.1.3 and NeoForge 1.21.1**.

![Visión general con el modo de arma de fuego habilitado y la detección actual, combate y configuración de daños.](assets/media/guides/warfare-031-neo1211/dw-overview.png "Resumen resume la configuración. Usa pistola para el arma, munición para las recargas y sentidos para la detección y la velocidad de disparo.")

## Lo que hace la guerra

Dale a un NPC un arma y elige sus objetivos, movimiento y recargas. También puede hacer que cambie a cuerpo a cuerpo cerca, usar cobertura, patrullar o seguir órdenes mercenarias.

Crea el NPC con **DNPC or CustomNPCs**. Utilice DW para el combate NPC; añadir **DWE** para vehículos y tripulaciones.

## Configurar un NPC primero

1. Instalar los requisitos en [setup](#dochi-warfare/warfare-setup).
2. Haga clic derecho en el NPC con **DW Npc Core**.
3. Habilitar **TACZ Fire NPC Mode** y **Enabled**.
4. Elija un arma debajo de **Gun**.
5. **Save**, luego póngalo a la vista de un objetivo válido.

**Easy Build / Presets** proporciona ajustes de combate iniciales.

## Elige qué cambiar a continuación

| Objetivo | Guía |
| --- | --- |
| Use cuerpo a cuerpo cerca y un arma a distancia | [Armas y posturas](#dochi-warfare/warfare-weapons-ai) |
| Ataque enemigos elegidos | [Reglas de destino](#dochi-warfare/warfare-target-filters) |
| Limitar o recargar municiones | [Recargas y existencias](#dochi-warfare/warfare-reload-ammo) |
| Encubrimiento o supresión de enemigos | [Cubierta y supresión](#dochi-warfare/warfare-cover-suppression) |
| Contratar y comandar NPCs | [Mercenarios](#dochi-warfare/warfare-mercenary) |
| Mueva vehículos y asigne tripulaciones | [DWE](#dochi-warfare-expanded/expanded-overview) |

Establecer munición de repuesto con **Ammo Stock**. No equipe munición o artículos de revistas en la mano del PNJ.

## Plataformas soportadas

DW es para **Forge 1.20.1 / NeoForge 1.21.1**. TACZ y el animador del jugador del lado del cliente son necesarios. Los mods compatibles instalados PointBlank/SuperbWarfare añaden sus armas compatibles.

Véase [setup](#dochi-warfare/warfare-setup) para los requisitos de la versión.

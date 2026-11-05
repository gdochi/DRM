---
title: Engendrar criaturas donde y cuando quieras
slug: dochi-spawn-control-overview
order: 810
description: Elige reglas de reproducción natural o coloca reproductores para criaturas y NPCs.
product: dochi-spawn-control
category: Sinopsis
section: overview
status: Proyecto
version: 0.1.4
audience: Operadores de servidores y creadores de modpack
tags:
  - spawn control
  - natural spawn
  - forge
translationSource: en
translationMethod: assisted
---

![Spawn Control para las reglas de reproducción natural.](assets/media/guides/spawn-control-014-neo1211/spawn-rule.png "Spawn Control 0.1.4 / NeoForge 1.21.1. DNPC 0.1.2. La izquierda selecciona el objetivo, el medio enumera sus reglas y la derecha edita la regla seleccionada. Colocado Spawners abre el editor separado colocado-spawner.")

## Elige cómo aparecen

| Objetivo | Uso |
| --- | --- |
| Una criatura en particular aparece en los bosques por la noche | Reglas de engendro natural |
| Los enemigos regresan en una mazmorra | Un reproductor colocado |
| Un guardia terminado aparece en un puesto | Una plantilla guardada DNPC |

Las reglas naturales controlan el área alrededor de los jugadores. Los generadores colocados trabajan alrededor de su bloque.

## Cambiar el aparición natural

Pulse por defecto **K**, elija una criatura a la izquierda y **Add rule**. Establezca sus ubicaciones, horas y cantidades, luego ahorre.

Un zombie puede tener reglas separadas de bosque-noche y cueva. Una regla para los cerdos no afecta a las vacas.

Sigue [ tu primera regla natural](#dochi-spawn-control/dochi-spawn-control-setup).

## Colocar un reproductor

Abra **Spawner Editor** desde el selector del editor DRM. Elija criaturas y condiciones, use **Get Spawner**, colóquelo y aplique la configuración guardada.

Ver [crear un generador](#dochi-spawn-control/dochi-spawn-control-spawner).

## ¿Continúan los cambios originales?

**Original spawning ON** permite que el juego genere junto con tus reglas. Establece **OFF** para usar solo tus reglas para el aparición natural.

Esto no bloquea los comandos, la cría u otros generadores.

## PNJ y vehículos

Utilice una plantilla [NPC](#dochi-spawn-control/spawn-control-npc-templates) para mantener la apariencia y el equipo de un DNPC. También puedes [spawn vehículos guardados ](#dochi-spawn-control/spawn-control-vehicles).

Las reglas ordinarias de criaturas naturales no necesitan ni DRM ni un mod NPC. Añadir los respectivos mods para NPCs o vehículos.

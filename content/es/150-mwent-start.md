---
title: MWENT Introducción y configuración
slug: start
order: 1500
description: Instale MWENT a través de Minigames, aprenda las reglas e inicie partidos de AI o jugadores.
product: mwent
category: Cómo empezar
section: play
status: Guía
version: 0.1.6
audience: Jugadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## ¿Qué es MWENT?

**MWENT** es un juego de cartas táctico que utiliza Minecraft criaturas y ejércitos. Implemente cartas en tomas fijas delanteras/traseras, combine vecinos, órdenes y habilidades de líder, y administre su mano restante para ganar dos rondas. Sus estrategias de facción se inspiran en lo independiente en línea **GWENT: The Witcher Card Game**, con tarjetas originales e interacciones construidas alrededor Minecraft campos de batalla y tomas fijas.

MWENT es **Incluido en Dochi`s Minigames**. Esta documentación dedicada no representa una descarga de mod separada. Su primer lanzamiento público de Minigames fue **0.1.1 **. Elija el archivo correcto Minecraft y el cargador usando la guía de configuración de [Minigames](#dochi-minigames/minigames-setup).

![MWENT batalla con diez cartas de mano, filas delanteras / traseras, puntuaciones y el control de pase.](assets/media/guides/minigames-015-neo1211/mwent-battle.png "Minijuegos 0.1.5 / NeoForge 1.21.1, Inglés UI. Las puntuaciones y los marcadores redondos quedan, su mano está debajo, y las cubiertas, los cementerios y el pase redondo están a la derecha. Cada lado tiene dos filas de nueve tomas.")

## Línea base de instalación y documentación

Instalar Minigames coincidentes se basa en el servidor y el cliente. Batallas básicas, mesas y lecciones funcionan sin DRM. Instale los requisitos de la plataforma como la API Fabric por separado. DRM agrega NPC, diálogo e integraciones de divisas. Las tarjetas de modificación opcional requieren su proveedor y activos reales. Minecraft 26.3 utiliza Java 25 y excluye CustomNPCs.

Esta guía explica 0.1.6 el juego. Vean el [Historial de lanzamientos](#mwent/releases) para cambios de tarjeta anteriores.

## Aprender jugando

1. Haga clic con el botón derecho en una tabla MWENT y seleccione **AI Battle → Learn by Playing**, o utilice Aprender jugando en la pantalla de inicio MWENT.
2. Identificar el campo de batalla, la mano, la puntuación y los marcadores redondos. Haga clic con el botón derecho en una tarjeta para inspeccionarla.
3. Practica la colocación, los turnos finales, las órdenes, los líderes, la adyacencia y el paso por acciones reales.
4. Practica una transición de ronda y mulligan, luego juega un partido completo.

Las lecciones no requieren tarjetas propias y no tienen tarifas de entrada, recompensas o límite de tiempo. Seleccione lecciones libremente. Continue Learning abre la primera lección inconclusa; las lecciones interrumpidas reanudan su estado de práctica. Anterior / Siguiente revisa las explicaciones sin rebobinar tarjetas o puntuaciones.

## Práctica de IA y partidos de jugadores

| Modo | Inicio |
| --- | --- |
| Práctica de IA | Selecciona un oponente incorporado en una mesa y prepara tu mazo. La lista actual tiene dos oponentes por facción, doce en total. |
| Partido de jugador | Dos jugadores se unen a la misma mesa, eligen mazos y ambos presionan Listo. El servidor revisa las barajas de cartas. |
| Espectante | Unirse a una mesa completa o un partido en ejecución para ver el campo público y anotar. Las manos ocultas y el orden de la cubierta no se revelan. |

Crea un **MWENT table** a partir de dos libros, uno de lana verde y cinco tablas: libro / lana verde / libro; tres tablas; tabla / vacía / tabla. Comenzar un partido no consume la mesa o las cartas utilizadas en el mazo.

Continuar con [cómo jugar](#mwent/how-to-play), [seis facciones](#mwent/factions) y [colecciones y barajas](#mwent/cards-decks).

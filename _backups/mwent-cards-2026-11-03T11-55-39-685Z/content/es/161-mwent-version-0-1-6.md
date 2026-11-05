---
title: 0.1.6 — Usar tácticas de apertura
slug: version-0-1-6
order: 1610
description: Elige una de las cinco tácticas y usa su verdadera toma de campo de batalla de primera ronda.
product: mwent
category: Historial de lanzamientos
section: releases
status: Guía
version: 0.1.6
audience: Jugadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Elige antes del partido

Una táctica de apertura es un **Herramienta de un solo uso para el jugador que va primero en la primera ronda**. Abre la lista debajo del líder en el constructor de mazos. Desde un preset, siga **Use this deck → choose a tactic → Begin match**. Guardar su cubierta conserva su elección táctica para la carga posterior.

![Cinco tácticas de apertura en el constructor de mazos.](assets/media/guides/minigames-016-neo1211/mwent016-tactic-options.png "Minijuegos 0.1.6 / NeoForge 1.21.1, Inglés UI. Elige debajo del líder. La última opción, el núcleo de sello Golem, se transforma en su propio zócalo en lugar de impulsar a un aliado.")

| Táctica | Resultado | Antes de usarlo |
| --- | --- | --- |
| Altar de manzana dorada | Dar un aliado +5 poder | Ten un aliado en el tablero primero. |
| Escudo de guarda | Dar un aliado +2 poder y escudo | Prepare puntos y protección contra un evento de daño. |
| Caché de herrajes | Dar un aliado +4 Armadura | La armadura en sí no agrega puntaje. |
| Cofre de suministro de campo | Ganancia 4 Suministro | Combínalo con las habilidades que gastan el suministro. |
| Núcleo de sello golem | Transfórmate en un token 4-power Iron Golem en el mismo zócalo | No se necesita ninguna selección separada de socket vacío. |

## Utilízalo en la primera ronda

Si el lanzamiento de la moneda te convierte en el primer jugador, la táctica ocupa ** uno de tus nueve zócalos reales de fila cuerpo a cuerpo**. No agrega puntuación, pero ocupa espacio, dejando ocho sockets para otras tarjetas sin usar. El segundo jugador no recibe ninguna táctica.

![Un núcleo de sello Golem ocupando el centro de la fila cuerpo a cuerpo del primer jugador.](assets/media/guides/minigames-016-neo1211/mwent016-golem-installed.png "Antes de la transformación en la misma carrera 0.1.6. Su puntuación es cero y el dispositivo de sellado ocupa el enchufe central. El acceso directo púrpura en la parte inferior izquierda muestra un uso disponible.")

En su turno, haga clic en ** la táctica en el tablero o su atajo en la parte inferior izquierda **. Aumentar, Escudo y Armadura tácticas a continuación, pedir un objetivo aliado. El suministro y el golem se resuelven sin otro objetivo. Esto es independiente de jugar una carta de mano, pero cuenta como una acción: no se puede pasar inmediatamente en el mismo turno después de usarlo.

![El mismo zócalo ahora contiene un Golem de Hierro de 4 potencia.](assets/media/guides/minigames-016-neo1211/mwent016-golem-transformed.png "Después de hacer clic en el atajo de táctica real. La toma central en la misma fila se convierte en un Golem de 4 poder, su puntuación se convierte en cuatro, y el indicador de táctica de un solo uso desaparece. La mano permanece intacta.")

El altar, el escudo, el escondite y el cofre de suministros desaparecen cuando se usan, liberando su enchufe. Golem **reutiliza el socket ocupado de la táctica**, para que pueda transformarse incluso en una fila completa. El Golem transformado participa en la puntuación, daño y consumo como una unidad ordinaria, pero no tiene despliegue u orden. Es una ficha condenada y no deja ni una carta del cementerio ni restos de Morga.

Las tácticas no utilizadas desaparecen durante la limpieza de la primera ronda. No se dibujan, ni se elaboran ni se almacenan como tarjetas coleccionables, por lo que se excluyen del catálogo de [424-definición](#mwent/card-catalog).

## Cambios relacionados

El artefacto de producción 0.1.6 conserva las definiciones 335 incorporadas y 89 opcionales registradas en [ 0.1.5 ](#mwent/version-0-1-5). Cinco opciones tácticas no significan cinco nuevas cartas coleccionables. La misma actualización de Minigames agrega [Item Roulette](#dochi-minigames/minigames-roulette), un juego separado que no necesita conexión a un mazo MWENT.

Esta guía comprueba los archivos de producción locales 0.1.6 con fecha de noviembre 1. [Historial de lanzamientos](#mwent/releases) distingue a los de las cargas públicas verificadas. Continúe con [cómo jugar](#mwent/how-to-play) o [colecciones y mazos](#mwent/cards-decks).

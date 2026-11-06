---
title: Cómo jugar MWENT
slug: how-to-play
order: 1510
description: Mulligans, colocación, órdenes, pases, anotaciones y transiciones redondas.
product: mwent
category: Jugando
section: play
status: Guía
version: 0.1.6
audience: Jugadores
translationSource: en
translationMethod: assisted
---

## La victoria y el campo de batalla

Gana **dos rondas** en un partido que dura hasta tres rondas. Cada jugador tiene filas delanteras y traseras con nueve tomas fijas por fila. Tu puntuación es la potencia actual de las unidades que quedan en tu tablero. La armadura, el escudo y el suministro no añaden puntos directamente. Los escenarios, ubicaciones y trampas introducidos en 0.1.5 ocupan zócalos sin agregar potencia unitaria.

Cuando ambos jugadores pasen, compare los puntajes. La puntuación más alta gana una ronda; una ronda empatada da a ambos jugadores una victoria. Por lo tanto, todo el partido puede terminar como empate.

![MWENT batalla con diez cartas de mano, filas delanteras / traseras, puntuaciones y el control de pase.](assets/media/guides/minigames-015-neo1211/mwent-battle.png "Minijuegos 0.1.5 / NeoForge 1.21.1, Inglés UI. Las puntuaciones y los marcadores redondos quedan, su mano está debajo, y las cubiertas, los cementerios y el pase redondo están a la derecha. Cada lado tiene dos filas de nueve tomas.")

## 1. Selecciona un mazo y mulligan

Compruebe su facción, cubierta y líder. Dibuja diez cartas al principio. Un lanzamiento de moneda elige al jugador inicial. El primer jugador puede reemplazar hasta tres cartas en el mulligan de apertura; el segundo puede reemplazar hasta dos. Los reemplazos son opcionales. Continúa iniciando la batalla.

Las rondas posteriores dibujan hasta tres cartas mientras que el mazo tiene cartas restantes. El límite de la mano es de diez. Los empates bloqueados por una mano completa se suman a las dos oportunidades de Mulligan base de esa ronda. El ganador de la ronda anterior comienza la siguiente ronda.

## 2. Juega una carta en tu turno

El primer jugador puede usar el **Táctica de apertura** elegido durante la preparación una vez. Está separado de jugar una carta de mano, y 0.1.6 ofrece cinco opciones. Ver [selección y uso real](#mwent/version-0-1-6) para el núcleo del sello Golem que se convierte en un Golem de cuatro potencias en el mismo zócalo.

![Usar Golem seal core y ver un Golem de cuatro puntos en la misma casilla.](assets/media/guides/extra-videos-20261106/mwent-golem.mp4 "Minigames 0.1.6 / NeoForge 1.21.1, interfaz en inglés. Táctica inicial del primer jugador; la fuerza del tablero pasa de 0 a 4.")

1. Seleccione una tarjeta de mano. Haga clic con el botón derecho primero para inspeccionar sus habilidades y estado actual.
2. Coloque las unidades en un enchufe vacío legal. Las filas y los vecinos inmediatos pueden afectar las habilidades.
3. Resolver habilidades específicas eligiendo un objetivo legal destacado.
4. Usa las órdenes y habilidades de líder disponibles, luego presiona **End Turn**.

Un turno normal juega una carta de la mano. Los invocadores y las jugadas adicionales creadas por las habilidades siguen esas habilidades. **Playing** una carta gasta una carta de mano real; **convocar** pone una unidad en el campo a través de un efecto. Los invocadores normalmente no vuelven a activar el despliegue o las habilidades que requieren que se juegue una carta.

## 3. Ordenes y líderes

**Deploy** se activa cuando se juega una carta. **Order** se activa manualmente en una carta que ya está en juego. Verifique los cargos, el tiempo de reutilización, los costos de suministro y el bloqueo. Sin Zeal, una unidad no puede usar inmediatamente su Orden en el giro en el que entra. Las habilidades de líder cuentan por separado y no cuentan como cartas de mano.

Por ejemplo, la tripulación necesita aliados blindados en los dos zócalos inmediatamente adyacentes de la misma fila. Puede recargar un pedido agotado o reducir el tiempo de reutilización restante al final de tu turno. Dos aliados blindados en otras partes de esa fila son insuficientes.

## 4. Decidir cuándo pasar

**Pass** renuncia a tus turnos restantes para la ronda actual. Tu oponente puede seguir jugando; no puedes regresar en un turno posterior en esa ronda. Elija antes de jugar una carta o tomar otra acción en su turno.

| Situación | Considere |
| --- | --- |
| El oponente ha pasado | Gane solo los puntos necesarios para liderar y conservar las cartas. Los efectos de giro aún pueden cambiar la puntuación. |
| Ponerse al día cuesta muchas tarjetas | Compare la concesión de la ronda con los recursos de gasto necesarios en la siguiente. |
| Los pedidos o los motores de crecimiento están listos | Pesar los puntos de otro turno contra las opciones de eliminación del oponente. |

Las transiciones redondas normalmente limpian el tablero y preservan la mano restante. Las tarjetas con Resiliencia y otras excepciones siguen su propio texto. La limpieza redonda es distinta de la destrucción y no desencadena automáticamente Deathwish.

## Situación común

| Situación | Efecto |
| --- | --- |
| Armadura / Escudo | La armadura normalmente absorbe el daño primero; el escudo bloquea un evento de daño. |
| Veneno | Dos aplicaciones de veneno destruyen la unidad. |
| Sangrado / Vitalidad | Al final del turno del propietario de la unidad, inflige un daño / agrega una potencia y reduce la duración. El sangrado ignora la armadura. |
| Cerradura / Purificar | Bloqueo desactiva las órdenes y las habilidades pasivas. Purify elimina los estados extraíbles en lugar de Armor. |
| Condenado | La unidad no permanece en el cementerio al salir del tablero. Revisa la resurrección y las restricciones simbólicas. |

## Temporizadores y partidas

Los partidos normales usan 60-segundos turnos, 20-segundos mulligans y transiciones de ronda de cinco segundos. En el tiempo de espera, el servidor resuelve los objetivos pendientes y descarta una carta de mano si no se jugó, luego finaliza el turno. Las lecciones no tienen temporizador.

Esc cierra primero un detalle de tarjeta abierta. Confirmar la salida de un partido en ejecución lo pierde. PvP también pierde en la desconexión, la muerte, el cambio de dimensión o mover más de 64 bloques de la tabla. Cerrar una pantalla o una guía de lectura no detiene el temporizador normal del servidor.

Las preferencias de rotación, zoom y 3D / tarjeta de visualización comparten las mismas reglas del servidor. Continúe con [facciones](#mwent/factions) y [construcción de cubierta](#mwent/cards-decks).

## Música de batalla

La música por defecto sigue a la facción de la baraja del jugador desde el lanzamiento de la moneda y el Mulligan. Una elección explícita de música de perfil de juego tiene prioridad. Los controles de reproducción/parada y volumen se dejan en el libro de reglas. Silencioso 0% mantiene la posición de reproducción; la reproducción después de detener reinicia la pista. Las preferencias son locales y no editan el JSON del juego servidor o el volumen global Minecraft.

---
title: Encuentro, persecución y comportamiento de revancha
slug: cobblemon-encounters-rematches
order: 521
description: Siga Interacción, Visión, Radio, persecución, posicionamiento, tiempo de reutilización y progresión redonda en orden de ejecución del servidor.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Creadores que construyen encuentros automáticos y entrenadores de revancha
tags:
  - encounter
  - chase
  - rematch
translationSource: en
translationMethod: assisted
---

## Encontrar disparadores y revanchas

Elige el disparador de batalla en **Battle Config → Encounter**. El ejemplo **Trigger: Interaction** comienza cuando el jugador interactúa. Para la detección automática, cambie Trigger y revise la vista, la distancia y la búsqueda juntos.

![Encuentro de gatillo, vista, persecución y posicionamiento de batalla.](assets/media/guides/cobble-029-neo1211/cobble-encounter.png "0.2.9 / NeoForge 1.21.1. La distancia de inicio de batalla y la distancia de visión son diferentes configuraciones. Configurar revanchas en la política de revancha de las rondas →.")

## Evaluación del disparador

| Disparador | Comprobación del servidor | Uso típico |
| --- | --- | --- |
| `Interaction` | Vacío-mano principal-mano derecha-clic | Pruebas de línea de base y desafíos iniciados por jugadores |
| `Vision` | Distancia, medio ángulo orientado a NPC y línea de visión opcional | Entrenadores que notan y se acercan a un jugador visible |
| `Radius` | Distancia alrededor del PNJ | Adquisición independiente de la dirección; no se utilizan el ángulo de visión y la línea de visión |

Visión y Radio rechazan a los jugadores creativos o espectadores, a los jugadores muertos o eliminados, a los jugadores que ya están en batalla, a los jugadores reservados o perseguidos por otro encuentro, y a los jugadores bloqueados por el progreso, el tiempo de reutilización o las condiciones actuales de la ronda. Si varios jugadores válidos califican, se selecciona el más cercano.

## Rangos y costos de escaneo

| Configuración | Rango | Significado |
| --- | ---: | --- |
| Intervalo de detección | 5–200 ticks | Intervalo de exploración de nuevo objetivo. Los valores más bajos reaccionan más rápido, pero cuestan más con muchos entrenadores. |
| Distancia de visión | 1–64 bloques | Rango máximo de visión |
| Visión de medio ángulo | 5– 180 grados | Ángulo permitido a cada lado de la dirección de avance del PNJ |
| Radio de detección | 1–64 bloques | Rango de activación de radio |
| Línea de visión | Encendido/apagado | Requiere que el NPC vea realmente al jugador en modo Visión |

Después de adquirir un objetivo, el NPC retarda otro intento de adquisición por al menos 40 marcas o el intervalo de exploración configurado, lo que sea más largo.

## Retroalimentación de detección

La retroalimentación de detección se ejecuta una vez para Visión o Radio, nunca para Interacción.

| Campo | Rango o comportamiento |
| --- | --- |
| Texto del marcador | Hasta 32 caracteres; se eliminaron los saltos de línea |
| Garrapatas de reacción | 1–200 tics antes de la persecución o el inicio inmediato de la batalla |
| Color del marcador | `#RRGGBB` o `#AARRGGBB` |
| Escala | 0.25–4.0 |
| Y Desplazamiento | 0–3 bloques |
| Distancia de visualización | 4–256 bloques |
| Mantenga las garrapatas | 0–600 garrapatas después de la liberación del objetivo |
| Volumen de sonido / tono | 0–4 / 0.05–4 |

El NPC espera a través de las garrapatas de reacción. A continuación, se inicia inmediatamente si Chase está desactivado o realiza una transición para perseguir cuando esté habilitado.

## Terminación de Chase

| Configuración | Rango | Comportamiento |
| --- | ---: | --- |
| Velocidad de marcha | 0–100 | CustomNPCs escala de velocidad a pie; multiplicador de navegación es `Walking Speed ÷ 5` |
| Distancia de parada | 0.5–8 bloques | El inicio de batalla se intenta dentro de esta distancia objetivo |
| Distancia máxima | Al menos distancia de parada, hasta 96 | Distancia máxima permitida entre las posiciones actuales del NPC y el jugador objetivo, recalculada cada marca de servidor |
| Duración | 10–1200 ticks | Máximo tiempo de persecución |
| Regreso a casa | Encendido/apagado | Navega de vuelta al punto de inicio capturado después de un fallo o cancelación |

Cierre de sesión, muerte, otra batalla, cambios de reserva, tiempo de espera y la distancia actual del jugador NPC que excede la distancia máxima terminan la persecución. La navegación de retorno finaliza a la llegada o un tiempo de espera de seguridad interno de 1200.

El punto de inicio capturado solo se utiliza para el regreso a casa y el posicionamiento de batalla. No se utiliza para el control de distancia máxima.

## Posicionamiento y bloqueo NPC

`Battle Positioning` captura el punto de inicio NPC y coloca el reproductor 1–16 bloques de distancia antes de la reproducción de la presentación.

1. Captura la posición y orientación del hogar del NPC.
2. Alinear el NPC y el jugador.
3. Envía la presentación al cliente.
4. Vuelva a verificar las condiciones después de la presentación y el retraso del inicio de la ronda.
5. Ocultar y reservar el NPC mientras Cobblemon es dueño de la batalla.
6. Restaura la posición, visibilidad y estado de bloqueo en caso de ganar, perder, huir o iniciar un fallo.

Por lo tanto, una presentación que se juega sin una batalla siguiente puede indicar un estado objetivo no válido, una nueva comprobación de condición fallida o un fallo de creación de equipo.

## Reglas de nivel de batalla

| Modo | Comportamiento |
| --- | --- |
| `Keep` | Utiliza niveles de autoría. |
| `Fixed` | Establece el lado del entrenador, o ambos lados de la batalla, a un nivel de 1–100. |
| `Match player party average` | Se dirige al promedio actual del equipo del jugador más un desplazamiento de -99 a 99 mientras preserva las brechas de nivel creadas por el equipo entrenador cuando sea posible. |

Los niveles fijos y coincidentes solo afectan a las copias de batalla. No cambian permanentemente el Pokémon del jugador. Los ajustes fijos más antiguos se cargan con ambos lados seleccionados para preservar su comportamiento anterior.

## Revancha y selección de rondas

El primer desafío siempre usa la ronda 1. `Start Round` y `Round Mode` se aplican solo después de la primera victoria.

| Configuración | Comportamiento |
| --- | --- |
| Rematch Off | Un jugador que ha ganado una vez no puede desafiar de nuevo; la pérdida y la huida no aumentan la cuenta clara |
| Max Rematches `0` | Sin revancha |
| Max Rematches `3` | Hasta tres clears adicionales después de la primera victoria |
| Max Rematches `-1` | Ilimitado |
| `Fixed` | Cada revancha utiliza Start Round |
| `Continue` | Avanza desde la ronda de inicio y se mantiene en la ronda final |
| `Loop` | Ciclos desde la ronda de inicio hasta la ronda final |

Con cuatro rondas y la Ronda de Inicio 2, el primer desafío es la Ronda 1. `Continue` entonces utiliza 2→3→4→4; `Loop` usos 2→3→4→2.

## Enfriamiento

El tiempo de reutilización acepta 0 garrapatas durante un día (1,728,000 garrapatas).

- `Player` almacena un tiempo de reutilización de NPC/jugador separado, por lo que otros jugadores pueden desafiar inmediatamente.
- `NPC` comparte el tiempo de reutilización entre todos usando ese NPC.

El conteo claro, el tiempo de reutilización y el estado de ronda recompensada persisten en el lado del servidor. Las pruebas repetidas en una cuenta pueden reutilizar el estado antiguo incluso después de que el documento cambie.

---
title: Trainer Los sonidos de batalla
slug: cobblemon-battle-sounds
order: 525
description: Reglas de sonido actuales comunes y por ronda desencadenadas por el recuento restante Pokémon del entrenador.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Estable
version: Fabric / NeoForge 0.2.9
audience: Creadores autor entrenador batalla audio
tags:
  - battle-sounds
  - rounds
  - audio
translationSource: en
translationMethod: assisted
---

## Qué es esta característica

`Battle Sounds` son reglas de tiempo de ejecución que juegan mientras una batalla de Entrenador está activa, según la cuenta restante del entrenador Pokémon.

- Están separados del audio de la línea de tiempo Battle Presentation Maker.
- Corren durante la batalla real Cobblemon, no durante la presentación previa a la batalla.
- Funcionan independientemente de DRM Estrategia, RCT o Cobblemon IA fuerte.
- Se aplican a las batallas de Entrenadores, no a los encuentros de Pokemon.

![Sonidos de batalla con recuento restante Pokémon y selección global.](assets/media/guides/cobble-029-neo1211/cobble-sounds.png "Configuración de batalla → Sonidos de batalla. Para cambiar la música en un Pokémon restante, seleccione 1, active Reproducir en este recuento y elija Sound ID. Aplique y, a continuación, guarde el documento principal. 0.2.9 / NeoForge 1.21.1.")

## Flujo de trabajo de creación

1. Abra un documento Trainer en `Cobblemon Editor`.
2. Elige `Battle Sounds` en la parte superior de la sección Entrenador. `Battle Strategy` también puede abrir el mismo editor mientras conserva la ronda actual.
3. Seleccione `Global (all rounds)` o una ronda específica a la izquierda.
4. Seleccione un número de desencadenadores de 1 a 6.
5. Habilite `Play at this count`, luego elija un ID de sonido, volumen y tono.
6. Utilice `Play` y `Stop` para obtener una vista previa del sonido en el cliente.
7. Elija `Apply` y, a continuación, guarde el documento Trainer del editor principal con `Save` o `Save As`.

`Close` no aplica el borrador del editor. Si los valores cambian o los números no válidos permanecen, una confirmación pregunta si se deben descartar.

## Modos globales y por ronda

| Objetivo | Modo | Comportamiento |
| --- | --- | --- |
| Todas las rondas | Mundial | Línea de base para cada ronda heredada |
| Una ronda | `Use global` | Resuelve las reglas globales actuales durante el juego |
| Una ronda | `Custom` | Usar un conjunto independiente de reglas de conteo |
| Una ronda | `Off` | No reproducir ninguno de estos sonidos incluso cuando existen reglas globales. |

La primera vez que una ronda cambia a `Custom`, utiliza las reglas globales actuales como su borrador inicial. Las ediciones posteriores afectan solo a esa ronda.

## Comportamiento desencadenante

- El recuento incluye a todos los entrenadores activos y en banca Pokémon.
- El primer recuento observado después del inicio de la batalla puede desencadenarse. Por lo tanto, un entrenador de seis Pokémon puede jugar la regla `6` al principio.
- Un evento débil marca el conteo de otra verificación del lado del servidor.
- Cada cuenta juega como máximo una vez en una batalla.
- Cero significa que la batalla ha terminado, por lo que no hay regla de conteo cero.
- Una revancha crea una nueva sesión de batalla con un nuevo estado de disparo.

## Ajustes de sonido

| Configuración | Rango o comportamiento |
| --- | --- |
| ID de sonido | Un sonido namespaced disponible a través de los paquetes de recursos del cliente activo |
| Volumen | 0– 4; cero no es jugable |
| Pitch | 0.05–4 |
| `Stop sounds first` | Detenga la música de batalla actual y los sonidos iniciados por estas reglas antes de reproducir el nuevo sonido |

El selector busca nombres e ID traducidos. Si la vista previa falla, primero confirme que el sonido existe en los paquetes de recursos activos. Navegar o seleccionar un sonido no habilita automáticamente `Play at this count`.

El botón de previsualización `Stop` detiene solo el sonido reproducido por este editor. No cambia la política de tiempo de ejecución `Stop sounds first`.

## Limpieza en tiempo de ejecución

Cuando termina la batalla o se limpia su sesión, el servidor le dice al cliente que detenga el audio asociado con esta batalla de entrenador. Esto no actúa como una parada global para sonidos de juego no relacionados.

## Referencia JSON

Esta es información de referencia para herramientas externas y control de versiones. En el esquema de Entrenador 22, las reglas globales se almacenan en `trainerOptions.battleSound.rules[]`; los ajustes por ronda usan `rounds[].battleSoundOverride`. Cada regla contiene `remainingPokemon`, `enabled`, `sound`, `volume`, `pitch` y `stopBeforePlay`. Se recomienda escribir a través del editor.

---
title: Reglas de batalla
slug: cobblemon-battle-rules
order: 524
description: Formatos comunes y por ronda, niveles, elementos, Legendario Pokémon, mecánica y reglas de plomo en las compilaciones actuales.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Estable
version: Fabric / NeoForge 0.2.9
audience: Creadores que configuran las reglas de batalla del entrenador
tags:
  - battle-rules
  - rounds
  - items
  - gimmicks
translationSource: en
translationMethod: assisted
---

## Abra el editor

Abre un documento de Entrenador o Pokemon en `Cobblemon Editor`, luego elige **Battle Config → Rounds → Edit** para abrir Reglas de batalla. Esta es una pantalla de creación infantil, no un editor JSON independiente. Elija `Done`, vuelva al editor principal y use `Save` o `Save As` allí para escribir el documento de Entrenador/Pokémon.

Las flechas hacia atrás y hacia delante compartidas DRM siempre permanecen visibles; se desactivan cuando no hay historial disponible. Los números no válidos o los identificadores de elementos bloquean la navegación y la finalización para que el borrador actual no se pierda silenciosamente.

![Primera ronda de batalla.](assets/media/guides/cobble-029-neo1211/cobble-battle-rules.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. Común y 1 en la parte superior eligen alcance; El uso de reglas comunes en la parte inferior izquierda muestra herencia. Distinguir los mecánicos permitidos a la derecha del equipo de trucos de NPC, actualmente Ninguno.")

## Reglas comunes y por ronda

Seleccione `Common Rules` o una ronda explícita de 1–16.

- Las reglas comunes solo afectan a las rondas que aún las heredan.
- Una anulación de ronda almacena la configuración de batalla completa de esa ronda de forma independiente.
- `Use Common Rules` elimina solo la anulación de la ronda seleccionada.
- La edición de una ronda no sobrescribe otras rondas independientes.

## Configuración de batalla

### Formatos

| Formato | Comportamiento |
| --- | --- |
| `Inherit` | Utilice el formato creado en `Rounds` |
| `Singles` | Un activo Pokémon por lado |
| `Doubles` | Dos activos Pokémon por lado |
| `Triples` | Tres activos Pokémon por lado |
| `Lead Duel` | Individuales usando solo el plomo seleccionado en cada lado |

Los dobles y triples requieren suficiente Pokémon listo para la batalla en ambos lados. El Duelo de plomo limita solo a los equipos de batalla temporales; no elimina a los equipos creados. Pokemon usa Singles y oculta los controles de entrenador-líder sin sentido.

### Niveles

| Modo | Comportamiento |
| --- | --- |
| `Keep` | Usar los niveles creados en el documento |
| `Player party average` | Objetivo de la media actual del jugador-equipo más un desplazamiento de -99 a 99 |
| `Fixed` | Establecer batalla temporal Pokémon a un nivel de 1 a 100 |

El modo fijo puede afectar solo al entrenador o a ambos lados de la batalla. Estas transformaciones se aplican a las copias de batalla temporales y no cambian los niveles originales Pokémon del jugador.

### Mecánica de batalla

El permiso Mega, Tera y Dynamax es una regla de servidor para ambos lados. El permiso no instala ni garantiza un mecánico. La activación real todavía necesita un complemento compatible, el equipo NPC de la ronda y el elemento clave, y cualquier elemento o propiedad requerido Pokémon.

`Trainer Gimmick` configura el equipo del NPC; las Reglas de Batalla controlan el permiso para ambos lados. Si una regla bloquea el mecánico, el NPC no lo elegirá incluso cuando esté equipado.

## Temas

| Configuración | Efecto de tiempo de ejecución |
| --- | --- |
| Permitir artículos | Cuando esté apagado, bloquee todas las acciones de elementos de batalla cubiertos |
| Artículos prohibidos | Bloquear los ID individuales elegidos a través de la búsqueda de nombre/ID |
| Límite de uso | Por actor y por batalla, 0–999 usos o ilimitados |
| Giro mínimo | Permitir el uso solo en o después de este turno |
| Tapa HP de destino | Permitir el uso solo cuando el porcentaje de HP actual del objetivo está en o por debajo del valor |
| Permitir elementos retenidos | Cuando está apagado, rechace el inicio de batalla si un Pokémon participante contiene un elemento |

La lista prohibida acepta hasta 128 identificaciones únicas. Compruebe las entradas en el catálogo de la derecha, a continuación, pulse **Add (selected count)**. Para volver a permitir un elemento, compruébalo en la lista central prohibida y presiona **Remove**. Los ID de un mod que falta actualmente permanecen visibles sin un icono en lugar de ser eliminados silenciosamente.

El servidor vuelve a revisar los artículos de la bolsa de batalla, revive y captura los artículos antes de su consumo. Un tiro de captura permitido cuenta hacia el límite. Cuando varios oponentes están activos, cada objetivo debe cumplir con la regla de HP. Los jugadores creativos también siguen los límites de uso.

![Pantalla de elementos con selección y Agregar controles.](assets/media/guides/cobble-029-neo1211/cobble-battle-rules-items.png "Busca a la derecha, comprueba las entradas y, a continuación, agrega. Sumar (0) significa que no se selecciona nada; la lista prohibida en el centro también está vacía. Permitir objetos de batalla está separado de las prohibiciones individuales.")

## Legendario Pokémon

Cuando Legendary Pokémon está desactivado, el servidor comprueba ambos equipos participantes antes del inicio y rechaza la batalla si uno está presente. Esto sigue: Cobblemon's `isLegendary()` clasificación; no es una regla separada que automáticamente incluye cada Pokémon.

## Plomo

Configurar jugadores y entrenadores de forma independiente:

- `Selected`: mantener la selección de plomo original
- `Random`: elige entre el equipo saludable del jugador o el equipo de entrenadores generado
- `Slot`: usa la ranura 1–6

Una ranura faltante, una ventaja de jugador seleccionada desmayada o un tamaño de equipo insuficiente para el formato elegido rechaza el inicio en lugar de cambiar silenciosamente la regla.

## Pokemon en sí encuentra las reglas

Pokemon mismo también expone natural-drop y permiso de captura en esta pantalla. Desactivar los bloques de captura captura captura para ese encuentro independientemente de las reglas del elemento. Inhabilitar las gotas naturales evita que el encuentro del complemento permita caídas normales.

## Huir de las políticas

Las políticas de huida son el comportamiento nativo Cobblemon (`native`), la huida inmediata (`immediate`), o el movimiento de una distancia configurada desde la posición inicial (`distance`, 1–512 bloques). En el modo de distancia, el botón explica la distancia requerida; en realidad, moverse fuera desencadena la huida. Estas reglas se aplican a las batallas propiedad de addons y producen el resultado `flee`.

## Solución de problemas

| Síntoma | Comprobar |
| --- | --- |
| Una regla no ha cambiado | Seleccione `Done`, guarde en el editor principal y compruebe si la ronda hereda Reglas comunes |
| Startup es rechazado | Tamaño del equipo, clientes potenciales explícitos, restricción de elementos retenidos y restricción legendaria |
| Un mecánico no se activa | Complemento compatible, equipo NPC, elemento clave de inventario general, requisitos Pokémon y reglas de batalla |
| Un artículo es rechazado | El permiso general, la identificación prohibida, el recuento de uso, los turnos y la HP objetivo deben permitirlo |

## Referencia JSON

Esta es información de referencia para herramientas externas y control de versiones, no la ruta de autoría recomendada. El esquema de entrenador 23 almacena configuraciones comunes en `trainerOptions.battleConfig` y una anulación de ronda en `rounds[].battleConfigOverride`. Una ronda sin la anulación utiliza la configuración común.

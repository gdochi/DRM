---
title: Fácil construcción y combate Presets
slug: warfare-easy-build-presets
order: 325
description: Crea comportamientos de NPC rápidamente con el flujo guiado Easy Build o cinco ajustes preestablecidos de combate.
product: dochi-warfare
category: Herramientas de configuración
section: setup
status: Proyecto
version: 0.3.1
audience: Creadores de PNJ con armas de fuego
tags:
  - easy-build
  - preset
  - setup
translationSource: en
translationMethod: assisted
---

## Dos herramientas de configuración rápida

`Easy Build` y `Presets` son herramientas de creación en el área de ayuda de la barra superior del editor `DW Npc Core`. Ambos crean un punto de partida de combate útil, pero funcionan de manera diferente.

| Herramienta | Mejor utilizado cuando | Resultado |
| --- | --- | --- |
| `Easy Build` | Quieres componer el comportamiento respondiendo preguntas | Construye configuraciones de combate directamente a partir de las respuestas. No aplica un ajuste preestablecido de rol nombrado. |
| `Presets` | Quieres un tipo de combate probado inmediatamente | Aplica una de las cinco doctrinas: Rifleman Guardia, Patrullero, Asalto, Artillero de Apoyo o Francotirador. |

Ninguna herramienta bloquea el resultado. Cada valor aplicado permanece editable en las categorías normales.

## Flujo de trabajo de construcción fácil

1. Abre el NPC con `DW Npc Core`.
2. Pulse `Easy Build` en la barra superior.
3. Elige la cantidad de detalles que quieras.
4. Responde las preguntas. Pueden aparecer preguntas adicionales solo cuando el sistema relacionado está habilitado.
5. Revise los rasgos básicos, la fuerza general, las precauciones y las advertencias de conflicto.
6. Presione `Apply`.
7. Vuelva al editor normal, inspeccione el arma y los valores generados, luego presione `Save`.

![Apertura fácil de construir con principiante, intermedio y experto.](assets/media/guides/warfare-031-neo1211/dw-easy.png "DW 0.3.1 / NeoForge 1.21.1. Comience con siete preguntas de principiante, aplique el comportamiento resultante y luego guarde la configuración de NPC.")

## Niveles de detalle

| Nivel | Estilo de pregunta |
| --- | --- |
| `Beginner` | Siete preguntas amplias componen el comportamiento inactivo, el movimiento de combate, el alcance, la reacción, el control del fuego y la supervivencia. La primera pregunta de temperamento solo recomienda respuestas posteriores; no asigna un rol. |
| `Intermediate` | Selecciona directamente el comportamiento de grupo inactivo, conciencia, compromiso, reposición, fuego, rampa de precisión, supresión, cubierta y ammo vacía. |
| `Expert` | Edita valores de distancia, tiempo, velocidad, ráfaga, supresión y cobertura a nivel de campo. Las preguntas de seguimiento solo aparecen para los sistemas habilitados. |

Easy Build no se basa en un preajuste de combate con nombre. Las elecciones de temperamento para principiantes, como agresivas, equilibradas o cautelosas, solo cambian las sugerencias; no sobrescriben silenciosamente las respuestas posteriores.

## Ajustes conservados

Easy Build compone el comportamiento mientras conserva el contenido propiedad de otros editores:

* Armas a distancia y cuerpo a cuerpo y sus piscinas
* Entidades objetivo, facciones y reglas de etiqueta
* Piscinas de piel y armadura
* Contratos de mercenarios
* Granadas y FX de combate
* Virtual actual `Ammo Stock` y su máximo

Puede inspeccionar estos valores sin cambios posteriormente en `Gun`, `Targets`, `Ammo`, `Visual & FX` y las otras categorías normales.

![Guarda las cartas preestablecidas Rifleman, Patroller y Assault con desplazamiento horizontal.](assets/media/guides/warfare-031-neo1211/dw-presets.png "Haga clic en una tarjeta preestablecida para aplicarla. Desplácese horizontalmente para las cartas de artillero y francotirador de apoyo. Verifique el arma, los objetivos y el stock de munición actual por separado.")

## Preajustes de combate

`Presets` aplica una doctrina de combate general completa en un solo paso.

| Preestablecido | Comportamiento de inicio |
| --- | --- |
| `Guard Rifleman` | Defiende una posición con fuego reventado de rango medio controlado |
| `Patroller` | Patrulla un área, investiga el sonido y cambia de posición durante el combate. |
| `Assault` | Cierra la distancia rápidamente y aplica presión de fuego móvil |
| `Support Gunner` | Mantiene el espaciamiento de la escuadra y utiliza fuego y supresión sostenidos de medio a largo alcance |
| `Sniper` | Utiliza largos rangos de detección y disparo con alta precisión |

Los ajustes preestablecidos cambian la conciencia, el comportamiento inactivo, la distancia de compromiso, el movimiento táctico, el control de disparo, la cobertura y la respuesta de recarga. No reemplazan armas, armaduras, pieles, objetivos, relaciones de facciones, granadas, FX, contratos mercenarios o `Ammo Stock`.

## Compruebe el resultado antes de guardar

Easy Build y presets son los puntos de partida. Después de aplicar uno:

1. Confirme que la pistola actual se adapte al rango y estilo de disparo seleccionados.
2. Compruebe `Max Distance`, rango de detección y aproximación o distancia de retroceso contra el terreno de encuentro.
3. Asegúrese de que `RPM Mode`, la precisión y el rango de ráfaga sean razonables para el stock de munición disponible.
4. Prueba de movimiento y cobertura en terreno sencillo.
5. Presione `Save` cuando el resultado sea correcto, o use `Save As` para mantener la configuración completa de NPC como un perfil reutilizable.

---
title: Recarga y stock de munición
slug: warfare-reload-ammo
order: 350
description: Cómo funcionan el stock de munición DW, la sincronización de recarga nativa, la regeneración, la recuperación y el movimiento de recarga en las armas compatibles.
product: dochi-warfare
category: Ammo
section: ammo
status: Proyecto
version: 0.3.1
audience: Creadores de PNJ con armas de fuego
tags:
  - reload
  - ammo
  - magazine
translationSource: en
translationMethod: assisted
---

## Comience con un guardia que recarga

En **Ammo**, habilite **Reload** y **Supply Ammo**, luego comience con **Reload Type: Normal**. **Ammo Stock** es munición de reserva, separada de las rondas ya cargadas en el arma.

![Ammo recarga, reservas, regeneración y ajustes de agotamiento.](assets/media/guides/warfare-031-neo1211/dw-ammo.png "DW 0.3.1 / NeoForge 1.21.1. Stock -1 da reservas ilimitadas; Duración de recarga 0 utiliza el tiempo de recarga nativo del arma. Estas reservas no requieren un accesorio de cargador improvisado.")

![Ver a un guardia disparar tres veces, recargar y volver a disparar.](assets/media/guides/extra-videos-20261106/warfare-fire-reload.mp4 "DW 0.3.2 / TACZ 1.1.8 / DNPC 0.1.3 / NeoForge 1.21.1. Ejemplo preparado: recargar cada tres disparos. Muestra disparos y recarga.")

## Modelo de munición

Dochi's Warfare no hace que los NPC administrados lleven municiones de repuesto TACZ, PointBlank o SuperbWarfare en el remate. El NPC utiliza un arma nativa compatible, mientras que la munición de reserva está representada por datos de DW:

| Datos | Significado |
| --- | --- |
| `Ammo Stock` | Rondas de repuesto para este PNJ. `-1` es infinito, `0` es vacío, los valores positivos son rondas de reserva finitas. |
| `Ammo Stock Max` | Máxima munición de reserva después de la regeneración. `-1` significa sin tapa. |
| `Ammo Regen Amount` | Las rondas restauraban cada intervalo de regeneración. `0` Desactiva la regeneración. |
| `Ammo Regen Interval Ms` | Tiempo entre garrapatas de regeneración. `0` Desactiva la regeneración. |
| `Reload Duration Ms` | Duración del bloqueo de recarga NPC. `0` usa el tiempo de recarga táctico o vacío nativo del arma operada. |
| `Reload Speed Multiplier` | Multiplicador de velocidad de marcha solo mientras se recarga. `0` detiene el movimiento de recarga, `1` mantiene la velocidad normal. |

:::warning No utilice munición improvisada
La munición NPC es administrada por `Ammo Stock`, el estado de recarga DW y el estado de pila nativo del arma operada. No equipar munición física o artículos de revistas para representar recargas NPC.
:::

## Alternadores principales

| Cambiar | Comportamiento |
| --- | --- |
| `Reload` | Permite que el NPC se recargue después de que el arma se vacía. |
| `Supply Ammo` | Utiliza munición adicional para recargar la pistola NPC después del retraso de recarga. |

Si `Supply Ammo` está APAGADO, el complemento no se rellena de su reserva. Si `Ammo Stock` es `0`, el NPC no tiene munición de reserva incluso si la recarga está habilitada.

## Recargar tipos

| `Reload Type` | Comportamiento |
| --- | --- |
| `Normal` | Recargar cuando el arma se vacía. |
| `Force Fixed` | Forzar una recarga después de `Force Shots` disparos exitosos, incluso si las rondas permanecen cargadas. |
| `Force Range` | Después de cada recarga, lance un nuevo umbral de disparo exitoso desde `Force Min` hasta `Force Max`, luego fuerce la siguiente recarga en ese umbral. |

Los contadores de recarga forzada utilizan disparos exitosos. Confirma la compatibilidad nativa de recarga de armas con `Normal` primero, luego usa los modos forzados solo cuando el encuentro necesite ese ritmo.

## Repliegue de ammo vacío

`Ammo-Aware Switching` se activa solo cuando tanto la munición cargada del arma como la reserva NPC `Ammo Stock` están agotadas.

| Configuración | Comportamiento |
| --- | --- |
| `Fallback To Melee` | Continúa el combate con el arma cuerpo a cuerpo configurada cuando haya una disponible. |
| `Fallback To Unarmed` | Permitir cuerpo a cuerpo desarmado cuando no se puede utilizar ningún arma cuerpo a cuerpo configurada. |

Cuando termina la reserva y la munición se vuelve utilizable de nuevo, el NPC vuelve a su arma a distancia y vuelve a cargar el flujo. Si la reserva está desactivada, se espera que un NPC completamente agotado deje de disparar.

## Rearme automático después de la pérdida del objetivo

`Auto Rearm After Target Loss` es una ruta de recuperación opcional para un NPC que entró en modo alternativo de agotamiento de munición y luego perdió continuamente su objetivo.

1. El objetivo debe permanecer ausente para `Rearm Start Delay (Seconds)`.
2. La readquisición de un objetivo cancela la recuperación pendiente.
3. Después del retraso, la duración de recarga configurada todavía se aplica.
4. Una recuperación exitosa otorga un cargador completo a través del adaptador administrado y el estado nativo de la pila de armas.

Esto no restaura `Ammo Stock` y no crea munición física. Utilízalo cuando un NPC de reserva esté listo para el próximo encuentro sin recibir reservas ilimitadas.

La animación de recarga se divide por responsabilidad: la parte superior del cuerpo mantiene la acción de recarga administrada mientras que la parte inferior del cuerpo continúa el movimiento real de caminar, correr o agacharse del NPC. `Reload Speed Multiplier` cambia la velocidad de movimiento; no reemplaza el estado de movimiento de la parte inferior del cuerpo actual con una pose fija de cuerpo completo.

## Flujo de configuración recomendado

1. Comience con `Ammo Stock: -1`.
2. Confirme que el NPC dispara, recarga y vuelve a disparar.
3. Mantenga `Reload Type: Normal`, luego cambie `Ammo Stock` a un valor finito solo después de que el bucle básico funcione.
4. Decidir si reserva `0` debe detener el combate o cambiar a cuerpo a cuerpo / fallback desarmado.
5. Suma `Ammo Regen Amount` y `Ammo Regen Interval Ms` si el encuentro necesita un reabastecimiento lento.
6. Sintonice `Reload Duration Ms` solo después de que el comportamiento de recarga nativo del arma retenida se sienta mal para el encuentro.
7. Utilice `Reload Speed Multiplier` para crear ventanas de vulnerabilidad durante la recarga.
8. Añada `Force Fixed` o `Force Range` por último.
9. Añada rearme de pérdida de objetivo solo si un NPC agotado debe recuperarse entre encuentros.

Este orden separa los problemas de fuego de los problemas económicos. Un NPC de munición finita que nunca dispara puede estar vacío, pero un NPC de munición infinita que nunca dispara probablemente tenga un problema de arma, objetivo, postura, distancia o línea de visión.

## RPM y presión de munición

`RPM Mode`, rango aleatorio de RPM, disparos mínimos y máximos de ráfaga, y precisión fija o en rampa, todo cambio de presión de munición. Un NPC de alto RPM con munición finita puede vaciar su reserva rápidamente. Un NPC de baja precisión puede parecer cinematográfico, pero puede desperdiciar munición si `Ammo Stock` es limitado.

Equilibrio en este orden:

1. `RPM Mode: TACZ Native` con munición infinita.
2. Corregido la precisión.
3. Rango de ráfaga, aumento de precisión o RPM fijas/aleatorias.
4. Existencias de munición finita.
5. Sanciones de movimiento de regeneración o recarga.

## Referencia de script y datos almacenados

La GUI es la ruta de configuración principal, pero los usuarios de scripts también pueden trabajar con valores de puente. El `tacznpcfire.*` espacio de nombres de datos almacenados se mantiene como un contrato de compatibilidad interna a pesar de que el ID de mod público es ahora `dochi_warfare`.

| Clave | Significado |
| --- | --- |
| `tacznpcfire.supplyAmmo` | Habilita o deshabilita el suministro de munición adicional. |
| `tacznpcfire.ammoStock` | `-1` infinito, `0` vacío, rondas finitas positivas. |
| `tacznpcfire.ammoStockMax` | Máximo stock para la regeneración. |
| `tacznpcfire.ammoRegenAmount` | Las rondas se restauran cada intervalo. |
| `tacznpcfire.ammoRegenIntervalMs` | Intervalo de regeneración en milisegundos. |
| `tacznpcfire.reloadDurationMs` | Duración de la recarga en milisegundos. |
| `tacznpcfire.reloadWalkSpeedMultiplier` | Multiplicador de movimiento de solo recarga. |
| `tacznpcfire.reloadType` | `0` Normal, `1` Fuerza Fija, `2` Rango de fuerza. |
| `tacznpcfire.forceReload.shots` | Conteo de disparos exitosos para la Fuerza Fija. |
| `tacznpcfire.forceReload.minShots` / `maxShots` | El rango de fuerza incluye el mínimo y el máximo de disparos exitosos. |
| `tacznpcfire.combat.ammoAwareSwitching` | Habilita la lógica de conmutación cuando se carga y la munición de reserva se agota. |
| `tacznpcfire.combat.fallbackToMelee` | Permite la recuperación del arma cuerpo a cuerpo configurada. |
| `tacznpcfire.combat.fallbackToUnarmed` | Permite la recuperación sin armas cuando no hay ningún arma cuerpo a cuerpo disponible. |

Use datos almacenados solo cuando el encuentro realmente necesite cambios en el lado del script. Para la creación normal de NPC, mantenga los valores en la GUI por NPC para que otros creadores puedan inspeccionarlos visualmente.

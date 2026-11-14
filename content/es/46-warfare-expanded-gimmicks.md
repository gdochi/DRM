---
title: Reacciones del vehículo
slug: expanded-vehicle-gimmicks
order: 320
description: Configure señales de disparo, reacciones de daño, humo, desmontajes y bombardeos.
product: dochi-warfare-expanded
category: Vehículos
section: vehicles
status: Proyecto
version: 0.3.3
audience: Creadores de combate
translationSource: en
translationMethod: assisted
---

## Habilitar una reacción

Habilitar una entrada en la lista de trucos del editor de vehículos, establecer sus condiciones y guardar. Todas las entradas están por defecto en OFF. El servidor comprueba el motor real, las armas, el sistema de humo y los asientos. `Show all` también expone las configuraciones guardadas no compatibles, con la edición desactivada.

| Gimmick | Comportamiento y condiciones |
| --- | --- |
| Indicador de disparo | Juega cuando comienza la espera de disparo de un arma; preserva las reglas de puntería, munición y retardo. |
| Golpear retiro | Brevemente retrocede después de una pérdida real de HP suficiente desde la última actualización de IA; vehículos de rueda / pista. |
| Humo de emergencia | Pide humo nativo en caso de daño, bajo HP o inicio de retirada; excluye las bengalas del avión. |
| Explosión de baja salud | Cambia la duración/pausa de la siguiente ráfaga cuando el disparo de ráfaga base está habilitado; conserva la velocidad de disparo nativa. |
| Desmontaje de combate NPC | Descarga pasajeros de transporte seleccionados con un objetivo válido cercano después de 10 ticks estables a baja velocidad. |
| Escapada de baja salud | Brevemente se aleja del objetivo durante un episodio de baja salud. |
| Recargar retiro | Retiros mientras todas las armas habilitadas y elegibles para la tripulación se recargan; termina cuando un arma utilizable termina o el objetivo se pierde. |
| Hit sidestep | Se mueve perpendicularmente a la dirección del objetivo después de un daño suficiente. |
| Bombardeos | Usa `LEVEL`, `DIVE` o `CARPET` en aeronaves validadas de ala fija con armas de caída libre. |

1. Abra el vehículo con **DW Npc Core**, luego seleccione **Gimmicks** a la izquierda.
2. Seleccione un nombre de reacción, configure sus condiciones y tiempo a la derecha y encienda su botón **OFF**.
3. Configure las señales de disparo por arma bajo **Weapons → chosen weapon → Fire wait / Preparation cue**. Una espera de disparo cero no produce ninguna señal.
4. Verifique **AI enabled** y el modo de movimiento, luego **Save**. La captura de pantalla a continuación es el estado inicial con IA y las reacciones aún apagadas.

![La lista de Gimmicks M1A2 y las instrucciones de preparación del disparo.](assets/media/guides/warfare-expanded-031-neo1211/dwe-reactions.png "DWE 0.3.1 / base SuperbWarfare M1A2 / NeoForge 1.21.1. Mostrar: solo se admiten filtros de reacciones para este vehículo. OFF es el estado no configurado, no un efecto de ejecución.")

## Salud y tiempo

Para 500 máximo de HP, **2% de pérdida de salud** significa al menos 10 HP real perdido desde la actualización de IA anterior. **25% restante de salud** significa 125 HP o menos. Las reacciones de baja salud requieren una recuperación por encima del umbral de 5 puntos porcentuales antes del rearme.

20 ticks igual a un segundo a 20 TPS. Se aplican las reglas de munición y recarga de humo nativas además del tiempo de reutilización de la reacción. DWE no rellena el humo ni añade efectos de invulnerabilidad o bloqueo de objetivos.

## Movimiento y pasajeros

La prioridad del movimiento simultáneo es la retirada → golpee el sidestep → Escapada de baja salud → Recarga la retirada. Las reacciones utilizan los límites de la casa existente y la navegación sin teletransportarse. Desactivar el movimiento en `STATIONARY` o `HOLD` para bloquear las reacciones en esos modos. Disparar durante una reacción sigue respetando las reglas normales de parada antes del fuego, el objetivo y la seguridad.

Los desmontajes de combate afectan a los pasajeros de transporte existentes DNPC o CustomNPCs en vehículos de ruedas o de vía. Se excluyen los conductores, artilleros, asientos de armas y jugadores. Las salidas inseguras evitan el desmontaje. No crea NPCs ni los vuelve a subir automáticamente; los registros de finalización por asiento/NPC persisten.

## Bombardeo versus llamadas de soporte

Un truco de bombardeo de vehículos controla un avión de IA existente: `LEVEL` para ataques de precisión de nivel, `DIVE` para ataques de buceo y `CARPET` para caídas de área repetidas. Las armas nativas, municiones, RPM y física de vuelo todavía se aplican.

Para llamar a aeronaves temporales o refuerzos a horas programadas, use el [línea de tiempo de apoyo](#dochi-warfare-expanded/expanded-support-timeline).

## Evacuación del motor frente a desembarco de combate

**NPC combat dismount** es la reacción de pasajeros descrita arriba. La evacuación por fallo de motor de 0.3.3 es distinta e incluye conductores y artilleros. Consulta [daños de componentes](#dochi-warfare/warfare-vehicle-ai) para parada, salidas y recuperación.

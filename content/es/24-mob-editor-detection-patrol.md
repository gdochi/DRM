---
title: Adquisición, persecución y enfrentamiento de objetivos
slug: mob-editor-detection-patrol
order: 250
description: Separar el objetivo hostil, la búsqueda entre patrones y el movimiento de la etapa.
product: mob-editor
section: combat
category: BattleWorks
status: Guía
version: 0.1.7
audience: Principiantes y creadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Elige quién adquiere el objetivo

| Método | Configuración | Uso |
| --- | --- | --- |
| Usar el objetivo existente del mod NPC | Escanear sin objetivo apagado | Usar DNPC objetivos de IA de combate u CustomNPCs objetivos en versiones anteriores Minecraft |
| BattleWorks análisis de reserva | Escanear sin objetivo encendido | Buscar entidades vivientes cercanas cuando no exista un objetivo válido |

El análisis de retroceso no es lo mismo que la relación DNPC o el filtrado de facciones CustomNPCs. Prueba cuidadosamente alrededor de los aldeanos u otros NPCs. Los jugadores creativos y espectadores están excluidos.

## 2. Prueba de escaneo alternativo en aislamiento

En **Combat Rules → Combat**, comience con:

| Configuración | Valor | Significado |
| --- | --- | --- |
| Escanear sin objetivo | En marcha | Buscar cuando no existe un objetivo válido |
| Rango de exploración de destino | 16 | Distancia de búsqueda |
| Conciencia FOV | 360 | Buscar en cada dirección horizontal |
| Requiere línea de visión | En marcha | Excluir entidades oscurecidas durante el escaneo |

1. Aproximación en Supervivencia desde la parte delantera y trasera.
2. Reduce el FOV a 160 y compara la detección trasera.
3. Prueba con un muro entre el jugador y NPC.
4. Inhabilite la exploración de nuevo si usa CustomNPCs facciones.

La configuración de línea de visión del escaneo afecta la adquisición. El requisito de línea de visión de Pattern Core afecta el inicio de ese movimiento.

![Exploración de objetivos, línea de visión y persecución en Reglas de combate → Combate.](assets/media/guides/battleworks-016-neo1211/battleworks-combat.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Escanea sin objetivo y el rango de escaneo del objetivo encuentra un objetivo. Chase Target y enfoque de control de distancia después de adquirirlo.")

## 3. Configurar la búsqueda entre patrones

| Configuración | Función | Valor de partida del cuerpo |
| --- | --- | --- |
| Suprimir los ataques nativos | Reducir los conflictos con ataques nativos y combatir la IA | En marcha |
| Objetivo Chase | Navegar hacia el objetivo entre patrones | En marcha |
| Cara entre patrones | Cara durante el compromiso y esperas de reutilización | En marcha |
| Multiplicador de velocidad Chase | multiplicador de velocidad de navegación | 1.0 |
| Distancia de aproximación | Espacio deseado | 2.0 |

El espaciado deseado se puede fijar en un rango de ataque de no movilidad disponible para la fase actual. Sigue alineando el hitbox real, el rango de patrones y el terreno.

Desactivar la supresión puede permitir que la IA de ataque del actor u otro controlador compita con BattleWorks. Evita controladores simultáneos al diagnosticar movimiento.

## 4. Los ajustes de escenario toman el control durante un patrón

Face Target sigue al objetivo durante esa etapa. Stop Horizontal detiene el movimiento horizontal mientras retiene la física vertical. Hold es movimiento estacionario; Toward, Away y Orbit son movimientos de combate de autoría.

Una sesión de movimiento de línea de tiempo dedicada puede mantener el control sobre la detención y la persecución de la etapa ordinaria. Ver [acciones de movimiento](#mob-editor/battleworks-movement).

Si el PNJ mira correctamente mientras espera, pero mira hacia otro lado durante un golpe, inspeccione el objetivo de cara de la etapa activa. Un ataque de dirección fija intencionalmente debe mantener su comportamiento previsto.

## 5. Compromiso y reajuste de tiempo

| Configuración | Significado | Ejemplo |
| --- | --- | --- |
| Engage Delay Min / Max | Esperar después de adquirir un objetivo antes del primer patrón | 10–18 ticks |
| Reintentar el retraso | Espere antes de volver a intentarlo sin un movimiento elegible | 10 garrapatas |
| Reinicio de combate Retraso | Intervalo sin objetivo antes de reiniciar el estado de combate | 100 garrapatas, aproximadamente 5 segundos |

Un reinicio borra el estado de combate, como la historia, los tiempos de reutilización, las fases y el estado pasivo. No es la curación completa automática o teletransportación a una posición de casa.

## 6. Si la persecución funciona pero los ataques no

1. Confirmar el objetivo previsto.
2. Comprobar patrón Habilitado y rango de fase.
3. Compruebe el rango Min/Max horizontal.
4. Compruebe Max Vertical y línea de visión.
5. Compare la distancia de aproximación con el hitbox real.
6. Inspeccione los tiempos de reutilización y repita las penalizaciones por puntuación.
7. Compruebe la velocidad de movimiento del NPC, la IA desactivada y las rutas bloqueadas.

Configura reposo y patrulla en el editor del propio actor, como DNPC. Orbit es movimiento de etapa alrededor de un objetivo; no edita rutas de patrulla del mundo.

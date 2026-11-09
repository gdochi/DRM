---
title: SuperbWarfare Vehículo AI
slug: warfare-vehicle-ai
order: 370
description: Configurar SuperbWarfare movimiento de superficie y aire, objetivos, armas, munición virtual, tripulación NPC, perfiles y comandos.
product: dochi-warfare
category: Vehículo AI
section: vehicles
status: Proyecto
version: 0.3.2
audience: Creadores y operadores de escenarios
tags:
  - SuperbWarfare
  - vehicle
  - ai
translationSource: en
translationMethod: assisted
---

**DWE 0.3.2** ofrece vehículos en Forge 1.20.1, NeoForge 1.21.1 y Fabric 1.21.1. Consulta [instalación y archivos](#dochi-warfare-expanded/expanded-overview), [reacciones](#dochi-warfare-expanded/expanded-vehicle-gimmicks) y la [timeline renovada](#dochi-warfare-expanded/expanded-support-timeline).

DW sigue siendo el núcleo obligatorio. Se comprueban las API utilizadas sin exigir números DW/DWE iguales. Revisa la [instalación por cargador](#dochi-warfare/warfare-setup) para dependencias externas.

## Requisitos y editor

La IA del vehículo es una integración opcional SuperbWarfare. Haga coincidir el cargador y la versión compatible que se describen en la guía de instalación. En el modo creativo, mantén presionado `DW Npc Core` y haz clic con el botón derecho en un vehículo compatible. Esto abre un editor de vehículos separado del editor de NPC de infantería.

DW utiliza los controles de vuelo o `processInput` del motor nativo. SuperbWarfare continúa siendo dueño de la física del motor, velocidad, colisión, energía, torretas, armas, recargas, proyectiles y sonidos; DW no sobrescribe directamente la posición, rotación o velocidad. Un jugador que sube a un vehículo de IA se desmonta por seguridad, así que desactive la IA antes de conducirlo. DNPC o CustomNPCs La tripulación colocada a través del editor de vehículos puede permanecer a bordo.

![Resumen de detección, memoria y protección amigable.](assets/media/guides/warfare-expanded-031-neo1211/dwe-ai.png "DWE 0.3.1 / NeoForge 1.21.1. Visión general resume los valores actuales; la configuración del vehículo se almacena por separado de los sentidos NPC de infantería.")

## Modos de movimiento

| Modo inactivo | Comportamiento |
| --- | --- |
| `Stationary` | Permanezca en la posición guardada hasta que el combate o una orden explícita requiera movimiento. |
| `Area Patrol` | Distribuya los destinos en todos los sectores del área de origen y evite los sectores visitados recientemente. |
| `Return Only` | Regresa a casa y espera. |
| `Route Patrol` | Siga los waypoints guardados y aplique el tiempo de espera configurado en cada punto. |

El movimiento de combate se configura por separado como `Hold Position`, `Advance` o `Retreat`. El mantenimiento de alcance mínimo puede retroceder temporalmente cuando el arma de referencia está demasiado cerca o su torreta no puede presionar lo suficiente como para golpear el objetivo.

### Movimiento de tierra y agua

Los perfiles con ruedas, rastreados y de barco utilizan un comportamiento de huella, radio de giro, paso, pendiente, soporte, obstáculo, límite de agua y recuperación atascada. Las rutas se planifican solo a través de un terreno cargado con trabajo de búsqueda limitado.

En 0.2.9, Area Patrol anota ocho sectores familiares en lugar de repetir un pequeño círculo alrededor de la posición actual. Acelerador y rampa de frenado desde la distancia restante, la velocidad actual, la distancia de parada, la demanda de giro y el estado del obstáculo, evitando lanzamientos a plena potencia para movimientos cortos.

### Helicópteros y aeronaves de ala fija

Los helicópteros utilizan la potencia nativa del rotor y la entrada del ratón para el despegue, la retención de altitud, la aceleración hacia adelante, el frenado, el ascenso de obstáculos, el enfoque de destino, el vuelo estacionario y el retorno de la geovalla. Con suficiente radio de patrulla, la Patrulla de Área conecta arcos más largos en lugar de detenerse por completo en cada punto corto.

Los aviones de ala fija utilizan entradas nativas de acelerador, cabeceo, balanceo y aterrizaje para balanceo, despegue, ascenso, crucero, aproximación, evitación del terreno y merodeo cerca de un destino. Debido a que los aviones de ala fija no pueden detenerse en el aire, no soportan `Pause movement before fire` y necesitan suficiente espacio para girar.

## Conciencia y objetivos

La segmentación de vehículos combina identificadores de entidad, etiquetas de marcador requeridas/rechazadas, reglas de facción y protección del propietario/equipo/amigable. La conciencia incluye el radio de detección, el campo de visión horizontal, el retraso de la reacción, la detección cercana, las alertas de daños, la defensa de las facciones, la memoria del objetivo y la detección de sonido.

`Nearest` selecciona por distancia. `Custom` combina personal / vida, vehículos de tierra / superficie y pesos de vehículos aéreos con bonificación de represalia, retención de objetivo actual, distancia y espacio de conmutación. La etiqueta `dochi_warfare_vehicle_target` puede marcar un objetivo explícito, pero no pasa por alto los controles de propietario, equipo, facción, rango o fuego amigo.

## Armas y munición virtual

La página `Weapons` posee habilitación de armas. Cada montura nativa tiene configuraciones independientes para:

- ON/OFF y preferencia 0-100
- Precisión y personal, categorías de objetivos tierra/superficie y aire
- Entidad, facción, etiqueta y condiciones de salud del vehículo
- Rango mínimo y máximo nativo/predeterminado o manual
- Comportamiento de pausa antes del fuego (excepto de ala fija) y garrapatas de espera de fuego
- Herencia de munición global o cargador infinito/limitado por arma, reserva y temporización de recarga
- Siempre activo o requiera tripulación DNPC/CustomNPCs en el asiento de control vinculado

`Weapon use mode` selecciona solo las armas que están activadas y actualmente son elegibles, luego usa una, un conteo configurado o cada arma elegible por oportunidad de ataque. Un arma OFF no participa en la selección de candidatos o rango de referencia.

Use los ajustes de munición de DW para el stock y las recargas de vehículos; no necesita colocar munición o cargadores en la mano de un miembro de la tripulación.

## NPC tripulación

La página `Crew` muestra los asientos del vehículo en un mapa superior o lateral. La selección de un asiento muestra su posición local, ocupación, función de conductor/torreta/estación de armas/pasajero, estado de modelo oculto y visibilidad de artículos retenidos.

Para un asiento vacío, `Board NPC` puede usar:

- Un clon de JSON NPC desde el servidor Entidad Clone Library
- Una piedra del alma llena de PNJ en el inventario principal, armadura o ranura improvisada del jugador

El servidor revalida el permiso creativo, la distancia de bloque 64, el estado del asiento, el tipo de NPC, la ruta de clonación, la ranura de piedra del alma y la hostilidad de la facción. Se desinfecta un nuevo NPC de UUID, posición, propiedad y estado de combate en vivo, y luego se coloca en el asiento seleccionado exacto. La tripulación del PNJ se puede desmontar de este editor. DNPC usa clones NPC JSON; las piedras del alma son una fuente separada que requiere CustomNPCs.

![El mapa de asientos de la tripulación de la base SuperbWarfare M1A2.](assets/media/guides/warfare-expanded-031-neo1211/dwe-crew.png "DWE 0.3.1 / NeoForge 1.21.1. Seleccione un número de asiento para inspeccionar su función y ocupante a la derecha. Este es un mapa de asientos vacío, no un resultado de embarque completado. Es el vehículo base SuperbWarfare, distinto de MCSP M1A2.")

### Mira la tripulación y la IA del vehículo

Dos tripulantes DNPC ya preparados suben al M1A2 básico de SuperbWarfare, que sigue una orden **Move To**. Después, el vehículo cambia al combate estacionario y dispara a un blanco de práctica. El vídeo muestra el resultado en juego; usa la página Crew anterior para elegir las fuentes de NPCs y los asientos, y configura las reglas de movimiento y objetivos antes de activar la IA.

![Dos NPCs suben a un M1A2, la IA lo conduce y sus armas disparan a un blanco de práctica.](assets/media/guides/runtime-videos-20261106/vehicle-ai-crew-drive.mp4 "DW + DWE 0.3.2 + DNPC 0.1.3 + SuperbWarfare 0.8.9.1 / NeoForge 1.21.1, interfaz en inglés. Tripulación y reglas preparadas → embarque → movimiento por IA → detección y disparo.")

## Perfiles, piedras del alma y clones

`Save As` y `Load` almacenan los perfiles de IA del vehículo reutilizable en:

```text
config/dochi_warfare/vehicle_ai/profiles/
```

Los perfiles omiten la identidad de la entidad viva y el estado de la posición mundial. Las piedras de alma vacías CustomNPCs pueden capturar vehículos compatibles SuperbWarfare y volver a desplegarlos mientras se conservan los datos nativos y la configuración de DW. `Clone` almacena una plantilla de vehículo de servidor desinfectada; haga clic con el botón derecho en el aire con `DW Npc Core` para invocarla desde la biblioteca de clones.

## Comandos del operador

Los comandos requieren nivel de permiso 2. Mire directamente un vehículo SuperbWarfare dentro de los bloques 24, luego use:

```text
/dw vehicle_ai enable
/dw vehicle_ai disable
/dw vehicle_ai wander
/dw vehicle_ai guard
/dw vehicle_ai engage
/dw vehicle_ai move_to_me
/dw vehicle_ai return_home
/dw vehicle_ai patrol_add
/dw vehicle_ai patrol_clear
/dw vehicle_ai status
```

La GUI es el flujo de trabajo principal del creador. Los comandos están destinados a operaciones en vivo, órdenes rápidas y diagnósticos de estado.

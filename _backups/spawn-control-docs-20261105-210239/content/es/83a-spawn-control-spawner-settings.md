---
title: Condiciones y efectos del spawner
slug: dochi-spawn-control-spawner-settings
order: 845
description: Configura activadores de spawner colocado, condiciones compartidas, tapas de colocación, destrucción, partículas, sonidos y barras de jefe.
product: dochi-spawn-control
category: Condiciones y efectos
section: rules
status: Proyecto
version: 0.1.4
audience: Creadores spawner
tags:
  - spawner
  - conditions
  - effects
translationSource: en
translationMethod: assisted
---

## Desencadenantes y condiciones

Utilice `Conditions` para establecer el disparador y los requisitos adicionales. Un gatillo aún necesita pasar el jugador, el tiempo, el clima, la piedra roja y las verificaciones de la capa de reproducción.

| Disparador | Comportamiento |
| --- | --- |
| `Interval` | Intentos repetidos usando el intervalo mínimo y máximo configurado |
| Entrada del jugador | Se activa al entrar en el rango de activación; salir más allá de la distancia de salida y regresar puede rearmarlo |
| Ola anterior borrada | Intentos de la siguiente ola después de que el generador no tiene entidades propias restantes |
| Hora | A lo sumo una activación exitosa por día de juego dentro de la ventana de tiempo configurada |
| `Redstone Rising Edge` | Intentos cuando la señal de redstone cambia de apagado a encendido |

`Initial delay` es la espera inicial. Los intervalos mínimo y máximo controlan los intentos repetidos. Los valores están en ticks; 20 ticks equivalen a un segundo a la velocidad normal del servidor.

Comprueba si se requieren jugadores, si los jugadores creativos cuentan, el recuento mínimo de jugadores y las distancias de activación/salida. `Shared Conditions` abre el editor de condiciones comunes de DRM. Las comparaciones de datos almacenados se refieren a CustomNPCs script player/world storeddata, no a los objetivos del marcador. Cada jugador contado debe pasar el grupo completo de condición compartida.

El tiempo usa `0–23999`. Un comienzo mayor que el final abarca la medianoche. El clima y el estado de redstone requerido pueden imponer más restricciones.

![Activación del jugador e intervalo en condiciones.](assets/media/guides/spawn-control-014-neo1211/spawn-conditions.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Requiere que el jugador esté activado e Incluir jugadores creativos está desactivado aquí. Un autor creativo cercano no cuenta para la activación en este estado. A velocidad normal, 200 garrapatas son unos diez segundos.")

## Cuentas y colocación

| Configuración | Finalidad |
| --- | --- |
| `Entities per activation` | Número de intentos por activación, 1–64 |
| `Maximum owned entities` | Límite total de población para este reproductor |
| `Total spawn limit` | Límite de creación acumulativo; 0 significa ilimitado |
| Radio, rango vertical, Y mínimo/máximo | Área de búsqueda de candidatos |
| Colocación | Controles de colocación en tierra, aire, agua o lava |
| Intentos de posición por entidad | Limita la búsqueda de una ubicación válida |
| Bioma o `#tag` | Restricción opcional de bioma/etiqueta |
| Fuente de luz y luz mínima/máxima | Combinado, bloquear o rango de luz del cielo |

Los candidatos se comprueban solo en fragmentos cargados; el generador no fuerza los fragmentos de carga. También se aplican controles fronterizos y de colisión. Aumentar la cuenta no puede garantizar que muchas entidades si el espacio o las tapas evitan el aparición. Las grandes operaciones pueden ser distribuidas a través del presupuesto de procesamiento del servidor.

![Límites de propiedad y colocación en Spawn Settings.](assets/media/guides/spawn-control-014-neo1211/spawn-settings.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Las entidades de propiedad máxima 6 limitan las entidades de propiedad viviente; el límite total de aparición 0 elimina el límite acumulativo. Las entidades grandes también necesitan suficiente espacio vertical y de colisión.")

## Destrucción

Elija cosecha o destrucción basada en la salud en `Destruction`.

| Modo | Configuración y resultado |
| --- | --- |
| Cosecha | Configure la dureza y los requisitos de la herramienta; elimine el generador mediante minería |
| Salud | Configure la salud máxima y el hitbox; destrúyalo con daño de ataque |

También puede elegir si la destrucción deja caer el elemento de generación configurado. Los efectos de golpe en modo de salud solo se ejecutan cuando el servidor acepta daños. Los ataques rechazados y los ataques dentro del tiempo de reutilización de daño no los reproducen.

![Destrucción con la cosecha seleccionada.](assets/media/guides/spawn-control-014-neo1211/spawn-destruction.png "Spawn Control 0.1.4 / NeoForge 1.21.1. La cosecha utiliza la dureza minera y la herramienta requerida. La salud máxima y Hitbox son grises porque la destrucción basada en la salud no está seleccionada.")

## Golpear partículas y sonidos

En `Effects`, habilite las partículas de impacto, elija el tipo de partícula registrado y establezca las partículas por impacto. Busque la lista de partículas registradas en la instancia actual. Los tipos que requieren datos adicionales también necesitan parámetros coincidentes.

Los sonidos de golpe y los sonidos de rotura tienen interruptores de activación independientes. Elija un ID de sonido y configure el volumen y el tono. Partículas y sonidos modificados referenciados requieren que el mod suministre esos recursos en el entorno en ejecución.

![Golpear partículas, golpear sonido y sonido de destrucción en Efectos.](assets/media/guides/spawn-control-014-neo1211/spawn-effects.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Los interruptores están apagados, por lo que las entradas relacionadas son grises. Introducir un ID por sí solo no permite el efecto. Habilitelo, luego establezca el tipo y el recuento o el volumen.")

## Spawner jefe bar

Habilite la barra de jefe para mostrar el nombre del generador y la salud restante, y elija su color. Se muestra a los jugadores el seguimiento de ese aparición y se elimina cuando el aparición es destruido o deja su conjunto de seguimiento. No es una barra de todo el servidor siempre visible.

## Referencia JSON: tres dibujos de una 70:30 lista

Utilice el editor para la autoría normal. Este ejemplo mínimo es para inspeccionar o compartir archivos; la configuración omitida recibe los valores predeterminados.

```json
{
  "schemaVersion": 1,
  "name": "Mixed encounter",
  "sources": [
    { "kind": "entity", "id": "minecraft:pig", "weight": 70 },
    { "kind": "entity", "id": "minecraft:cow", "weight": 30 }
  ],
  "activation": { "requirePlayer": true, "includeCreative": true },
  "spawn": { "count": 3, "maxOwned": 9, "maxTotal": 0 }
}
```

Guárdelo como `config/dochi_rpg_maker/spawn_control/spawners/examples/mixed.json` y cárguelo en el editor. Este ejemplo de prueba incluye reproductores creativos en las comprobaciones de activación. Aplica el JSON guardado a un generador colocado para ejecutarlo.

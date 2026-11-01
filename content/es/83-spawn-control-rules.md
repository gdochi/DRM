---
title: Condiciones de spawn y tapas de población
slug: dochi-spawn-control-rules
order: 840
description: Comprender las condiciones del mundo, el momento de los intentos, la ubicación, los límites de población y los campos del ciclo de vida.
product: dochi-spawn-control
category: Normas
section: rules
status: Proyecto
version: 0.1.4
audience: Operadores que equilibran los aparición naturales
tags:
  - conditions
  - caps
  - lifecycle
translationSource: en
translationMethod: assisted
---

Esta página describe **perfiles naturales**. Para los reproductores colocados, utilice el [Guía del editor Spawner](#dochi-spawn-control/dochi-spawn-control-spawner). Natural-spawn `Spawn Chance (0-1)` está separado de las posibilidades relativas en una lista de objetivos del generador.

## Identidad

| Campo | Significado |
| --- | --- |
| `Name` | Etiqueta de lista legible para humanos |
| `Profile ID` | Identificación única utilizada para el almacenamiento, diagnóstico, comandos y seguimiento de entidades |
| `Priority` | Organiza el orden de las reglas y las comprobaciones; no es un reemplazo para la oportunidad de aparición |
| `Enabled` | Los perfiles deshabilitados son omitidos por el planificador |

Los ID de perfil deben ser únicos dentro de un documento activo. El nombre de visualización es descriptivo; el ID estable es importante para las operaciones y el intercambio.

## Condiciones Mundiales

Todas las condiciones aplicables deben pasar por un puesto de candidato.

| Campo | Significado |
| --- | --- |
| `Dimensions` | Vacío permite cada dimensión; IDs seleccionados forman una lista de permisos |
| `Biomes` | Vacío permite cada bioma; IDs seleccionados forman una lista de permisos |
| `Minimum Y` / `Maximum Y` | Rango de altura del bloque candidato |
| `Minimum Light` / `Maximum Light` | Rango de brillo local de 0 a 15 |
| `Start Time` / `End Time` | Hora mundial de 0 a 23999; un rango invertido cruza la medianoche |
| `Minimum Distance` / `Maximum Distance` | Distancia del candidato al jugador vivo más cercano, no espectador |

Por ejemplo, `13000` a `23000` es un rango nocturno. `22000` a través de `2000` cruza la medianoche y permite el final de un día más el comienzo del siguiente.

Los candidatos se buscan solo en fragmentos ya cargados. Se rechaza una coordenada coincidente fuera de los trozos cargados o más allá de la frontera mundial.

![Dimensión, bioma, altura, luz y tiempo en Rule Inspector.](assets/media/guides/spawn-control-014-neo1211/spawn-rule.png "Spawn Control 0.1.4 / NeoForge 1.21.1. DNPC 0.1.2. Any for Dimensions y Biomes elimina esas restricciones. También verifique la distancia mínima 24 y el tiempo 0–23999. Una regla deshabilitada no se ejecuta incluso cuando las condiciones coinciden.")

## Tasa de spawn y grupo

| Campo | Significado |
| --- | --- |
| `Spawn Chance (0-1)` | Probabilidad de tirada en cada intervalo elegible; `0.25` significa 25% |
| `Interval Ticks` | Retraso antes del siguiente intento de este perfil; 20 ticks es aproximadamente un segundo |
| `Minimum Group` / `Maximum Group` | Número de entidades solicitadas por un intento exitoso |
| `Spawn Radius` | Radio de búsqueda de candidatos alrededor de un jugador activo seleccionado al azar |
| `Position Attempts` | Comprobaciones máximas de candidatos utilizadas para encontrar una ubicación cargada válida |
| `Placement` | Política de bloques y fluida para las posiciones candidatas |

| Colocación | Regla del candidato |
| --- | --- |
| `Surface` | El bloque candidato está vacío y el bloque de abajo tiene una superficie de colisión |
| `Cave` | El bloque candidato está vacío y no puede ver el cielo |
| `Air` | El bloque candidato y el bloque de abajo están vacíos |
| `Water` | El bloque candidato contiene fluido |

Una probabilidad alta o un intervalo corto no pueden evitar las condiciones mundiales o los límites de población. Los miembros del grupo adicionales buscan dentro de cinco bloques del primer candidato exitoso.

## Límites de población

Los caps cuentan las entidades marcadas y rastreadas como generadas por Dochi's Spawn Control. No cuentan automáticamente las entidades nativas comunes o las invocaciones de comando no administradas.

| Campo | Ámbito |
| --- | --- |
| `Profile Cap` | Entidades creadas por el mismo ID de perfil |
| `Target Cap` | Entidades con la misma clave de destino EntityType o clon |
| `Player Cap` | Entidades registradas bajo el mismo contexto de jugador |
| `Chunk Cap` | Entidades administradas en el bloque de candidatos |
| `Dimension Cap` | Entidades gestionadas en la dimensión candidata |
| `Server Cap` | Entidades administradas en todas las dimensiones |
| `Shared Group ID` / `Shared Group Cap` | Límite combinado compartido por perfiles con el mismo ID de grupo no vacío |

Cuando un objetivo tiene varios perfiles, Target Cap combina esos perfiles. Utilice un grupo compartido cuando diferentes objetivos deben compartir un límite de población más amplio.

## Ciclo de vida

| Campo | Significado |
| --- | --- |
| `Persistent` | Marca las criaturas generadas como persistentes y omite la limpieza de ningún jugador |
| `Maximum Lifetime Ticks` | `0` desactiva la limpieza de edad; se comprueba un máximo positivo incluso para perfiles persistentes |
| `Despawn Without Player` | Comienza la limpieza cuando ningún jugador permanece dentro de la distancia máxima |
| `No-player Delay Ticks` | Retraso entre la pérdida de jugadores cercanos y la eliminación |

La política de ciclo de vida se aplica solo a las entidades creadas y marcadas por este mod. No limpia los NPC colocados a mano, los NPC de misión o las invocaciones de administrador.

## Ejemplos de referencia

### Criatura de la tierra

- Colocación: `Surface`
- Distancia mínima: `24`
- Distancia máxima: `96`
- Radio de spawn: `64`
- Intentos de posición: `8`
- Intervalo: `200` ticks

### Criatura acuática

- Colocación: `Water`
- Comience con un amplio bioma y rangos Y
- Prueba cerca de un cuerpo de agua real
- Reduzca la probabilidad y los límites a los valores de producción solo después de que la colocación tenga éxito

:::tip Orden de equilibrio
Verifique primero las condiciones y la ubicación del mundo, luego ajuste el azar y el intervalo, y ajuste los límites al final. Esto mantiene los intentos fallidos más fáciles de diagnosticar.
:::

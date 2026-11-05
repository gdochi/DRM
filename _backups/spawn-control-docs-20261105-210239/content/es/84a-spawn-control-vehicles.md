---
title: aparición de vehículos
slug: spawn-control-vehicles
order: 842
description: aparición de vehículos
product: dochi-spawn-control
category: aparición de vehículos
section: operations
status: Guía
version: 0.1.4
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Ámbito

Spawn Control **0.1.4** crea vehículos modificados guardados y vehículos compatibles EntityTypes a partir de generadores colocados y perfiles de engendro natural. DRM y mods de vehículos son integraciones opcionales.

| Mod vehículo | Objetivos |
| --- | --- |
| Vehículos Inmersivos / MTS | Vehículo de paquete instalado / variantes de color o vehículos ensamblados guardados; Forge / NeoForge integración |
| Magnífica guerra | EntityTypes o plantillas guardadas del vehículo registrado; Forge / NeoForge integración |
| Aviones inmersivos | Entidad de aeronaveTipos o vehículos guardados; cobertura en tiempo de ejecución registrada Fabric |
| Automovilidad | Vehículos ensamblados guardados; cobertura de tiempo de ejecución registrada Fabric |

Utilice una versión real para la versión seleccionada Minecraft y el cargador. Create / Valkyrien Los artilugios de bloque de Skies están fuera de esta integración basada en entidades. El aparición no agrega IA de conducción de NPC ni tripulación automática.

## Ejemplo: abrir uno guardado M1A2

Este flujo fue guardado, aplicado y ejecutado con **Spawn Control 0.1.4 / Superb Warfare 0.8.9.1 / NeoForge 1.21.1 **. No establece las partes o el comportamiento de combustible de otros mods de vehículos.

### 1. Guardar el vehículo original

Prepare un M1A2 con su propio mod, retire a todos los pasajeros, párese cerca y corra:

```text
/spawncontrolvehicle save guide_tank @e[type=superbwarfare:m_1a_2,sort=nearest,limit=1,distance=..32]
```

La respuesta del éxito nombra **spawncontrol_vehicle:guide_tank**. El original permanece en el mundo y `config/dochi_rpg_maker/spawn_control/vehicles/guide_tank.json` es creado. Utilice `/spawncontrolvehicle list` para comprobar los ID guardados o `/spawncontrolvehicle reload` para volver a leer las plantillas editadas externamente.

Para otro mod, utilice su tipo de vehículo real después de `type=`. Guarde un vehículo ensamblado en lugar de seleccionar un MTS vacío `mts:builder_existing` o un vehículo base de Automovilidad sin ensamblar como objetivo de aparición.

### 2. Elija el ID guardado en Entidad

Abre **Spawner Editor → Spawn Target** y deja **Source** como **Entity**. Pulse la lupa (**Choose**), busque `guide_tank` y, a continuación, seleccione ** spawncontrol_vehicle:guide_tank → Seleccione**. Las plantillas de vehículos pertenecen aquí; no cambie a **NPC clone template**.

![spawncontrol_vehicle:guide_tank en el selector de entidades.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-picker.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Elija el ID guardado por el comando. Un EntityType de vehículo predeterminado y una plantilla de vehículo guardada son objetivos separados.")

### 3. Establezca el espacio y la cantidad, luego ahorre

Este ejemplo usa **Spawn Settings** con límite propio `1`, radio `12` y **Placement: Air**. El rango vertical se mantiene en `2`, las entidades por activación en `1` y el límite total en `0`. Usar **Save As → guide_tank_spawner.json → Confirm**.

![guide_tank_spawner.json apunta a la identificación guardada del vehículo.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-spawner-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. La fuente es la entidad. Esta pantalla muestra el destino; la ubicación y la cantidad se configuran por separado en Configuración de Spawn.")

**Why Ground failed here:** este M1A2 original salvó un cuadro de colisión que se extiende ligeramente por debajo de su punto de referencia, intersectando el piso en los candidatos de tierra. El aire permitió un candidato claro por encima del suelo y el aparición tuvo éxito. El aire no agrega la IA de vuelo; el mod del vehículo controla su física después de la inserción.

### 4. Aplicar a un reproductor colocado

Utilice **Get Spawner** y colóquelo en un área amplia y clara. Haga clic derecho con el **DRM Core**, luego ** guide_tank_spawner.json → Aplicar JSON**. Las condiciones predeterminadas excluyen a los jugadores creativos, así que cambia a Supervivencia y permanece cerca para la prueba. Sigue la misma [posición y aplica la ventana ](#dochi-spawn-control/spawn-control-npc-templates).

![El M1A2 recién engendrado con su original detrás de él.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-runtime.png "Spawn Control 0.1.4 / Magnífica guerra 0.8.9.1 / NeoForge 1.21.1. El servidor confirmó un nuevo tanque, un UUID diferente del original y cero pasajeros. Esto no es una tripulación o una demostración de conducción.")

Se puede seleccionar el mismo ID guardado en las reglas de engendro natural con límites de bioma, tiempo, distancia y cantidad. Guardar esas reglas y aplicar JSON a un generador colocado son operaciones separadas.

## Espacio y estado restaurado

El vehículo completo necesita trozos cargados, espacio de separación y colisión en la frontera mundial. El radio 0 en un anclaje de entidad usa su centro; un anclaje de bloque puede obstruir esa posición en sí. Haga coincidir la colocación de la superficie, el agua o el aire con el vehículo.

`maxOwned: 1`, `maxTotal: 0` permite el aparición repetido mientras se mantiene un vehículo de propiedad real. Manejar lejos no lo hace ausente.

Las piezas nativas NBT, el inventario, el combustible y la orientación guardada se restauran con un nuevo UUID. Los pasajeros no son clonados; el combustible y la munición no se reponen automáticamente. Distribuya mods de vehículos, paquetes de contenido y archivos `vehicles/` con el ajuste preestablecido.

## DNPC aparición

Instale DNPC y DRM y elija la plantilla de clon [NPC](#dochi-spawn-control/spawn-control-npc-templates) para generar un NPC terminado. La entrada NPC predeterminada no copia la apariencia o el equipo guardados.

---
title: Preajustes, compartir y operaciones
slug: dochi-spawn-control-presets-operations
order: 850
description: Guarde y cargue políticas, rutas de almacenamiento, conflictos de destino, uso compartido y solución de problemas.
product: dochi-spawn-control
category: Preajustes y operaciones
section: operations
status: Guía
version: 0.1.4
audience: Operadores de servidores y distribuidores de contenido
tags:
  - presets
  - troubleshooting
translationSource: en
translationMethod: assisted
---

## Guardar comportamiento

La siguiente tabla describe el editor **natural-spawn**. El ahorro y la aplicación de spawner colocado se explican por separado a continuación.

| Medidas adoptadas | Resultado |
| --- | --- |
| `Save` | Almacenar y aplicar inmediatamente el borrador como activo `spawn_control.json` |
| `Save As → Complete Set` | Guardar cada regla, política nativa y presupuesto del planificador global como un conjunto con nombre y activarlo |
| `Save As → Current Target Preset` | Guardar cada perfil para la entidad actual o clon, además de su política nativa recomendada |
| `Reset` | Volver a la línea de base recibida cuando el editor se abrió o se actualizó por última vez después de guardar |
| `Create New` | Iniciar un borrador de conjunto vacío sin cambiar la configuración activa del servidor hasta que se guarde |

Un ajuste preestablecido de destino excluye los presupuestos del planificador global. Esto permite que las reglas de una criatura se muevan entre servidores sin reemplazar el presupuesto operativo del servidor de destino.

## Mover solo las reglas de la vaca a otro servidor

Encuentre `minecraft:cow` en el catálogo de engendro natural y use **Add Rule**. Termine sus condiciones, luego presione **Save As** para elegir el alcance.

![El selector de alcance Save As ofrece un conjunto completo y un ajuste preestablecido de destino actual.](assets/media/guides/spawn-control-014-neo1211/spawn-preset-scope.png "Spawn Control 0.1.4 / NeoForge 1.21.1. El conjunto completo mueve la configuración del servidor; el preajuste de objetivo actual mueve solo las reglas para el objetivo de vaca seleccionado.")

Elija **Current Target Preset**, escriba **Display Name** `Meadow Cows` y **Stable ID** `meadow_cows`, luego presione **Save As**. La respuesta `Target preset saved. The active set was not changed.` confirma el ahorro. **Esta operación no cambia las reglas activas del servidor.** Volver al editor y usar la parte superior **Save** para activar el borrador aquí también.

![Guardar correctamente el preajuste de destino meadow_cows.](assets/media/guides/spawn-control-014-neo1211/spawn-target-preset-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Se comprobó el archivo targets/meadow_cows.json. Display Name etiqueta la lista; el ID estable identifica el archivo.")

Coloque el archivo en el servidor de destino `targets/`, luego selecciónelo en **Load → Target Presets**. Utilice la política de conflicto a continuación para reemplazar las reglas de vaca existentes o mantenerlas.

## Rutas de almacenamiento

Creación de documentos en vivo en el directorio compartido `config` en la carpeta de trabajo del juego o servidor. En un jugador, este es el directorio `minecraft` de la instancia, compartido por mundos en esa instancia. En el modo multijugador, usa la carpeta del servidor conectado. Los archivos copiados solo en el cliente no aparecen en la lista del servidor.

```text
config/dochi_rpg_maker/spawn_control/
├─ spawn_control.json
├─ spawn_control.json.bak
├─ sets/
│  └─ <set-id>.json
├─ targets/
│  └─ <target-preset-id>.json
└─ spawners/
   └─ examples/mixed.json
```

La configuración activa y los ajustes preestablecidos de Natural-spawn utilizan el reemplazo de archivos temporales y retienen el destino anterior como `.bak`. Spawner JSON también utiliza el reemplazo de archivos temporales, pero no crea un `.bak` automático; haga una copia de seguridad por separado.

## Guardar y aplicar el generador JSON

`Save` en `Spawner Editor` guarda solo el documento de autoría. Haga clic con el botón derecho en el generador colocado con DRM Core, seleccione el archivo guardado y haga clic en `Apply JSON` para cambiar ese generador. La edición de un archivo no actualiza automáticamente cada generador configurado previamente desde él.

Comparta JSON de `spawners/` junto con sus dependencias. No incrusta clones de servidor CNPC ni plantillas DW. También proporciona mods que suministran entidades, modelos, partículas y sonidos referenciados.

### La lista de archivos del generador está vacía

Compruebe la carpeta `config/dochi_rpg_maker/spawn_control/spawners/` del servidor y, a continuación, haga clic en `Refresh`. World serverconfig no es la ubicación de creación. Limpie los filtros de búsqueda y compruebe si hay errores en el JSON.

### Un reproductor colocado no se ejecuta

Un nuevo generador está inactivo hasta que se aplica JSON. Marque `Enabled`, las condiciones del jugador y del jugador creativo, el tiempo, el espacio de colocación y las tapas de reproducción. Un mod o clon faltante requerido por una entrada de probabilidad positiva puede suspender ese generador. Véase [Condiciones y efectos del spawner](#dochi-spawn-control/dochi-spawn-control-spawner-settings).

## Política de carga y conflicto

Cargar un conjunto completo reemplaza al conjunto activo y requiere confirmación. Un preajuste de destino se fusiona con el borrador no guardado actualmente abierto en el editor y requiere una política.

| Política | Comportamiento |
| --- | --- |
| `Replace Target` | Eliminar las reglas existentes para el mismo objetivo y, a continuación, añadir las reglas preestablecidas |
| `Merge by ID` | Reemplace los perfiles con el mismo destino e ID de perfil; retenga los demás |
| `Keep Both` | Conservar las reglas existentes y asignar un nuevo ID único cuando un ID importado entra en conflicto |

La directiva nativa recomendada del preajuste se puede aplicar a las entidades registradas a menos que se seleccione Mantener ambos. Siempre vuelva a comprobar `Native: ON/OFF` después de la importación.

## Compartir

Distribuir archivos JSON desde `sets/` o `targets/`. Preestablece los espacios de nombres de mod requeridos en `requiredMods`.

- Un ajuste preestablecido Modded EntityType requiere el mod que registra ese EntityTyPE.
- Un CustomNPCs preajuste de destino registra el requisito `customnpcs` pero no contiene datos de clon.
- Distribuya un clon de servidor con la misma pestaña y nombre por separado.
- Un objetivo que falta no elimina todo el archivo; solo el perfil afectado se aísla como desactivado con un error.

## Solución de problemas

### La regla de otra entidad aparece bajo la entidad seleccionada.

1. Confirme que la vista media es `Selected Target`; `All Configured` enumera intencionalmente cada objetivo.
2. Lea la etiqueta EntityType o clon bajo el inspector para identificar el objetivo real de la regla seleccionada.
3. Si la interfaz de usuario no tiene botones `Selected Target` y `All Configured` y aún muestra el diseño anterior `Target / + / All / P / Name`, se está ejecutando un JAR antiguo.
4. Elimine los JAR duplicados, instale la misma compilación actual en el cliente y el servidor y reinicie completamente ambos.

La compilación actual borra el perfil anterior y el inspector cuando un objetivo recién seleccionado no tiene ninguna regla. Los perfiles nunca heredan entre objetivos.

### Un perfil habilitado no aparece

Compruebe en este orden:

1. Ejecutar `Advanced Diagnostics → Check Here`.
2. Compruebe la dimensión, el tiempo, la Y, el bioma, la luz y la distancia del jugador.
3. Confirma la colocación de Superficie, Cueva, Aire o Agua para el objetivo.
4. Compruebe la probabilidad de spawn y las garrapatas de intervalo.
5. Compruebe las tapas de servidor, dimensión, fragmento, jugador, perfil, destino y grupo compartido.
6. Confirme que se cargan los fragmentos candidatos.
7. Inspeccione el registro del servidor para una denegación de generación Forge desde otro mod.

### Un perfil se desactiva a sí mismo

- `MISSING ENTITY`: el mod que registra que EntityType está ausente
- `MISSING CLONE`: la ficha/nombre guardada CustomNPCs no existe
- `CUSTOMNPCS NOT LOADED`: un perfil de clon está activo sin CustomNPCs
- `ADAPTER REQUIRED OR UNSUPPORTED`: `MISC`, un EntityType en blanco CustomNPCs o una ruta de creación especial
- `RUNTIME ERROR`: se produjo un fallo aislado del adaptador-objetivo

### Las criaturas nativas y manejadas aparecen con demasiada frecuencia

Comprueba si el aparición nativo y un perfil administrado están habilitados. Después de probar la regla administrada, guarde `Native: OFF` para esa entidad registrada, luego ajuste su perfil, destino y límites de servidor.

## Ámbito de copia de seguridad recomendado

- `config/dochi_rpg_maker/spawn_control/`
- El mundo completo Save
- Listas de versiones de mod de servidor y cliente
- coincidencia de datos de clon de servidor cuando se usan objetivos CustomNPCs

La copia de seguridad de JSON por sí sola no restaura entidades ya presentes en el mundo ni datos propiedad de otros mods.

## 0.1.4 Integración de PNJ y vehículo

DRM, CustomNPCs, DNPC y Guerra son integraciones opcionales. La inicialización predeterminada DNPC necesita la API NPC DRM compatible; no clona las plantillas guardadas DNPC. Véase [Ahorro y aparición de vehículos](#dochi-spawn-control/spawn-control-vehicles) para MTS, Superb Warfare, Aviones y Automovilidad.

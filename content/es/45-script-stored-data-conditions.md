---
title: CustomNPCs Integración de condición de datos almacenados
slug: script-stored-data-conditions
order: 128
description: Jugador de lectura, entidad de contexto y mundo CustomNPCs Datos almacenados de DRM condiciones, con la configuración completa y ejemplos de script.
product: core
category: API de scripts
section: script-api
status: Estable
version: 0.3.1
audience: CustomNPCs script y condición de los autores DRM
tags:
  - script
  - customnpcs
  - storeddata
  - condition
translationSource: en
translationMethod: assisted
---

## Usar una etapa de búsqueda guardada como condición de diálogo

Usa esto para grabar la misión del jugador en la etapa tres y permitir una opción solo para la etapa tres o superior. Decida primero la clave y el número, luego ingrese la misma clave en el editor de condiciones. Para una simple recompensa de una sola vez, el [Recompensa de diálogo basado en etiquetas](#core/dialogue-rewards) Es otro flujo de trabajo disponible.

![Usa una etapa de búsqueda guardada como resultado de la condición de diálogo.](assets/media/guides/drm-031-forge1201-apis/api-stored-condition.png "DRM 0.3.1 / Forge 1.20.1 con CustomNPCs. Datos almacenados reales del reproductor my_pack.quest.stage3 pases Número / ? 3. La apariencia zombie proviene del ejemplo del modelo anterior; esta condición lee el valor del jugador.")

## Lo que hace esta integración

La condición `cnpc_stored_data` permite DRM leer valores escritos a través de la API de scripts CustomNPCs `getStoreddata()`. Un script puede grabar una etapa de búsqueda, una fase de jefe o un capítulo del mundo, luego DRM puede usar ese valor para controlar el diálogo, los teletransportadores, la disponibilidad de la búsqueda y los mensajes remanentes.

Esta integración es de **solo lectura**. DRM lee y compara un valor pero nunca lo crea, lo cambia o lo elimina. Utilice CustomNPCs métodos de script como `put` y `remove` para cambiar los datos.

```text
CustomNPCs script writes a value
        ↓
Player / context entity / world Stored Data
        ↓
DRM cnpc_stored_data condition reads and compares it
        ↓
Dialogue route, choice, teleporter, or quest availability is decided
```

:::warning Mod Requerido
CustomNPCs debe cargarse en el servidor para que se evalúe esta condición. Si el mod o su API de script no está disponible, la condición falla y devuelve silenciosamente `false`.
:::

## Inicio rápido

### 1. Escribir un valor de un script CustomNPCs

Agregue esto al script `Interact` de un NPC. Al hacer clic en el NPC se almacena el número `3` en el reproductor.

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.stage", 3);
    event.player.message("Quest stage changed to 3.");
}
```

### 2. Añadir una condición DRM

Agregue `CustomNPCs Stored Data` en un DRM editor de condición e ingrese estos valores.

| Campo | Valor |
| --- | --- |
| Tipo | `CustomNPCs Stored Data` |
| Ámbito | `Player` |
| Clave | `my_pack.quest.stage` |
| Operador | `>=` |
| Tipo de valor | `Number` |
| Valor esperado | `3` |

La condición pasa ahora sólo cuando `my_pack.quest.stage` se puede leer como un número mayor o igual a `3`.

:::note Entradas del editor y JSON
Introduzca solo `3` en el valor esperado. No es necesario escribir comillas JSON o un fragmento como `"value": "3"`. Los ejemplos de JSON más adelante son referencias para la edición manual de archivos y el desarrollo de complementos.
:::

## Editores soportados y contexto

Seleccione `CustomNPCs Stored Data` en el editor de condiciones compartidas.

| Característica | Ubicación típica | `Player` | `Context Entity` | `World` |
| --- | --- | --- | --- | --- |
| Diálogo | Nodo, ruta de inicio y elección Condiciones | Sí | Sí; diálogo actual NPC | Sí |
| Teletransportador | Condiciones de interacción y destino Condiciones de acceso | Sí | Sí; teletransportador NPC | Sí |
| Búsqueda | Disponibilidad → Condiciones adicionales → Condiciones | Sí | Solo cuando esa ruta de evaluación tiene un contexto NPC | Sí |
| Remnant Message | Condiciones de Uso y Condiciones de Mensaje | Sí | No; las rutas actuales en tiempo de ejecución no pasan por una entidad de contexto | Sí |

Tenga cuidado con `Context Entity` en las misiones. Las comprobaciones de búsqueda impulsadas por NPC pueden proporcionar un NPC, mientras que las actualizaciones automáticas, los comandos y las comprobaciones de antecedentes pueden ejecutarse sin uno. Utilice `Player` o `World` cuando el resultado debe ser consistente en cada ruta de evaluación.

## Campos de condición

### Ámbito

`Scope` selecciona el objeto cuyos datos almacenados se leen.

| Valor del editor | Valor JSON | Propietario de los datos | Acceso a scripts coincidentes |
| --- | --- | --- | --- |
| Jugador | `player` | El jugador es evaluado | `event.player.getStoreddata()` |
| Entidad de contexto | `context_entity` | Entidad aprobada con la condición, normalmente el NPC actual | `event.npc.getStoreddata()` |
| Mundo | `world` | El mundo del servidor que ocupa actualmente el jugador evaluado | `event.player.getWorld().getStoreddata()` o `event.npc.getWorld().getStoreddata()` |

Los datos almacenados en el mundo tienen dimensiones específicas. No asuma que un valor escrito en el Overworld se refiere al mismo propietario de datos en el Nether. DRM lee la corriente del jugador evaluado `ServerLevel`.

### Clave

La clave debe coincidir exactamente con la cadena utilizada con `put`, incluyendo el caso de la letra.

```js
event.player.getStoreddata().put("my_pack.quest.stage", 3);
```

La clave que coincide DRM es:

```text
my_pack.quest.stage
```

Una llave en blanco siempre falla. Prefijo de teclas para evitar colisiones entre paquetes de scripts.

```text
my_pack.quest.stage
my_pack.boss.defeated
my_pack.dialogue.blacksmith_intro
```

### Operador

| Operador | Significado | Valor esperado requerido |
| --- | --- | --- |
| `exists` | Pasa cuando la clave existe | No |
| `not_exists` | Pasar cuando los datos almacenados se alcanzaron con éxito y la clave está ausente | No |
| `==` | Pasar cuando los valores reales y esperados son iguales | Sí |
| `!=` | Pasar cuando los valores reales y esperados difieren | Sí |
| `>` | El número real es mayor de lo esperado | Sí |
| `>=` | El número real es mayor o igual a lo esperado | Sí |
| `<` | El número real es menor de lo esperado | Sí |
| `<=` | El número real es menor o igual a lo esperado | Sí |

Al seleccionar `exists` o `not_exists` se oculta el tipo de valor y el valor esperado porque solo se marca la presencia de clave.

### Tipo de valor

| Tipo de valor | Artículo 5 | Uso recomendado |
| --- | --- | --- |
| Auto | Un real `Number` usa comparación numérica; una cadena real usa comparación de cadenas | Uso general cuando el tipo almacenado es confiable |
| Cuerda | Comparación exacta, sensible a mayúsculas y minúsculas; solo admite `==` y `!=` | Nombres de estado, ID, banderas |
| Número | Convierte un número o cadena numérica a un doble finito antes de comparar | Etapas, puntuaciones, contadores, temporizadores |

La comparación de cadenas es sensible a los casos: `READY` y `ready` son diferentes. El orden de la cadena con `>`, `>=`, `<` o `<=` no pasa.

El modo de número acepta un valor numérico o texto numérico como `"3.5"`. El texto en blanco, `abc`, `NaN` y el infinito son inválidos y fallan.

:::warning Booleanos y objetos complejos
El comparador actualmente soporta `Number` y valores de cadena. Booleano, matriz, mapa y otros objetos complejos se pueden comprobar con `exists`, pero las comparaciones de valores fallan. Almacenar las banderas como `1`/`0` o `"yes"`/`"no"` cuando es necesario compararlas.
:::

## Recetas de guiones

### Almacenar una etapa de búsqueda del jugador

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.stage", 3);
}
```

DRM condición:

```text
Scope: Player
Key: my_pack.quest.stage
Operator: >=
Value Type: Number
Expected Value: 3
```

### Almacenar un estado de cadena

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.state", "ready");
}
```

DRM condición:

```text
Scope: Player
Key: my_pack.quest.state
Operator: ==
Value Type: String
Expected Value: ready
```

### Comprueba solo si existe un valor

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.intro.seen", 1);
}
```

Utilice `not_exists` para los jugadores que no han visto la introducción y `exists` para los jugadores que tienen. No introduzca un valor esperado para ninguno de los operadores.

### Almacenar una fase de jefe NPC

```js
function init(event) {
    event.npc.getStoreddata().put("my_pack.boss.phase", 1);
}

function damaged(event) {
    if (event.npc.getHealth() <= event.npc.getMaxHealth() * 0.5) {
        event.npc.getStoreddata().put("my_pack.boss.phase", 2);
    }
}
```

Utilice esta condición en el diálogo o un teletransportador adjunto a ese PNJ:

```text
Scope: Context Entity
Key: my_pack.boss.phase
Operator: >=
Value Type: Number
Expected Value: 2
```

Este ejemplo no pasa en la evaluación de búsqueda automática o rutas Remnant Message que no tienen entidad de contexto.

### Almacenar un capítulo de mundo compartido

```js
function interact(event) {
    event.npc.getWorld().getStoreddata().put("my_pack.world.chapter", "chapter_2");
}
```

DRM condición:

```text
Scope: World
Key: my_pack.world.chapter
Operator: ==
Value Type: String
Expected Value: chapter_2
```

Todos los jugadores en ese mismo mundo comparten este valor.

### Incrementar un valor numérico de forma segura

```js
function interact(event) {
    var data = event.player.getStoreddata();
    var current = data.has("my_pack.kill.count")
        ? Number(data.get("my_pack.kill.count"))
        : 0;

    if (!isFinite(current)) {
        current = 0;
    }

    data.put("my_pack.kill.count", current + 1);
}
```

Utilice `Value Type: Number`, `Operator: >=` y `Expected Value: 10` para comprobar si hay diez o más recuentos.

### Eliminar o restablecer una clave

```js
function interact(event) {
    event.player.getStoreddata().remove("my_pack.quest.stage");
}
```

Después de la eliminación, `not_exists` pasa mientras `exists` y todas las comparaciones de valores fallan. Establecer un valor en `0` no es lo mismo que quitar su clave.

### Mostrar un valor para la depuración

```js
function interact(event) {
    var data = event.player.getStoreddata();
    var key = "my_pack.quest.stage";
    var value = data.has(key) ? String(data.get(key)) : "<missing>";
    event.player.message(key + " = " + value);
}
```

## Ejemplo completo: Desbloquear una opción de diálogo

El objetivo es mostrar una opción de diálogo de guardián solo después de que el jugador reciba permiso de otro NPC.

### Permiso de script NPC

```js
function interact(event) {
    var data = event.player.getStoreddata();
    data.put("my_pack.gate.permission", "granted");
    event.player.message("You received permission to pass the gate.");
}
```

### Condición de elección de diálogo Gatekeeper

```text
Type: CustomNPCs Stored Data
Scope: Player
Key: my_pack.gate.permission
Operator: ==
Value Type: String
Expected Value: granted
```

Conecte esta condición a una opción `Ask to open the gate`. Sólo los jugadores pueden verlo. Adjunte la misma condición a las Condiciones de Acceso de un destino de Teletransportador cuando el movimiento real también deba estar protegido.

## Combinación de condiciones

Los modos de grupo de condición funcionan de la siguiente manera.

| Modo | Resultado |
| --- | --- |
| AND | Cada condición debe ser `true` |
| O | Al menos una condición debe ser `true` |

Para requerir la etapa de búsqueda 3 y un gancho de cable de activación utilizado como clave, coloque una condición de datos almacenados y una condición de elemento en un grupo AND.

```text
AND
├─ CustomNPCs Stored Data: my_pack.quest.stage >= 3
└─ Item: minecraft:tripwire_hook >= 1
```

No se aplica un grupo de condición deshabilitado. Quest guarda el estado habilitado y el modo AND/OR en `Availability → Additional Conditions`, así que verifique que el grupo no se haya dejado deshabilitado.

## Referencia de campo JSON

Los usuarios normales del editor no necesitan escribir este JSON. Utilícelo para el desarrollo de complementos, la inspección de archivos o la recuperación manual.

```json
{
  "type": "cnpc_stored_data",
  "scope": "player",
  "key": "my_pack.quest.stage",
  "op": ">=",
  "valueType": "number",
  "value": "3"
}
```

| Campo | Requerido | Valores permitidos / Significado |
| --- | --- | --- |
| `type` | Sí | Debe ser `cnpc_stored_data` |
| `scope` | Sí | `player`, `context_entity` o `world` |
| `key` | Sí | Clave de datos almacenada no en blanco |
| `op` | Sí | `exists`, `not_exists`, `==`, `!=`, `>`, `>=`, `<`, `<=` |
| `valueType` | Para comparación de valor | `auto`, `string` o `number` |
| `value` | Para comparación de valor | Valor esperado del editor |

### Condicion de dialogo

```json
{
  "conditionMode": "and",
  "conditions": [
    {
      "type": "cnpc_stored_data",
      "scope": "player",
      "key": "my_pack.quest.stage",
      "op": ">=",
      "valueType": "number",
      "value": "3"
    }
  ]
}
```

### Grupo de condición del teletransportador

```json
{
  "interactionConditions": {
    "enabled": true,
    "conditionMode": "and",
    "conditions": [
      {
        "type": "cnpc_stored_data",
        "scope": "player",
        "key": "my_pack.gate.permission",
        "op": "==",
        "valueType": "string",
        "value": "granted"
      }
    ]
  }
}
```

Las condiciones específicas del destino usan la misma estructura de grupo en ese destino `accessConditions`.

### Condiciones previas de la búsqueda

```json
{
  "prerequisites": {
    "conditionsEnabled": true,
    "conditionMode": "and",
    "conditions": [
      {
        "type": "cnpc_stored_data",
        "scope": "player",
        "key": "my_pack.quest.stage",
        "op": ">=",
        "valueType": "number",
        "value": "3"
      }
    ]
  }
}
```

## Migrar el legado `stored` Tipo

Se ha eliminado la condición anterior DRM `stored`. La lista de condiciones y el nuevo JSON solo usan `cnpc_stored_data`.

Si un diálogo existente, búsqueda, teletransportador, o Remnant Message JSON todavía contiene `"type": "stored"`, DRM lo lee como un alias heredado de `cnpc_stored_data`. Guardar ese archivo a través del editor de condiciones canonicaliza `type` a `cnpc_stored_data`. DRM ya no lee un almacén de valor de tiempo de ejecución heredado separado.

El JSON más antiguo puede no contener Alcance o Tipo de Valor. En ese caso, los valores predeterminados son `scope: "player"` y `valueType: "auto"`; los `key`, `op` y `value` existentes permanecen en uso. Seleccione `CustomNPCs Stored Data` para cada nueva condición.

## Reglas cerradas por error

La condición es server-autoritative. La configuración no válida y los errores de mod opcional no otorgan acceso accidentalmente.

| Situación | Resultado |
| --- | --- |
| La clave existe después de un acceso exitoso | `exists` es `true`; `not_exists` es `false` |
| Los datos almacenados son accesibles pero la clave está ausente | Sólo `not_exists` es `true` |
| CustomNPCs Falta | Todos los operadores devuelven `false` |
| CustomNPCs API de script no está disponible | Todos los operadores devuelven `false` |
| `Context Entity` se selecciona pero no se suministra ninguna entidad | Todos los operadores devuelven `false` |
| Alcance, operador o tipo de valor desconocidos | `false` |
| Clave en blanco | `false` |
| Falla la conversión numérica | `false` |
| El valor real es booleano o un objeto complejo. | Devolución de comparaciones de valores `false` |

Una API CustomNPCs no disponible es intencionadamente diferente de una Clave faltante. Por lo tanto, `not_exists` no pasa accidentalmente durante un fallo de integración.

## Solución de problemas

### La condición siempre falla

Compruebe lo siguiente en orden.

1. Confirme que CustomNPCs está cargado en el servidor.
2. Confirme que Type es `CustomNPCs Stored Data`. Vuelva a guardar el viejo `stored` JSON para canonicalizar el tipo.
3. Haga coincidir el alcance con el objeto utilizado por el script.
4. Marque Key case, puntuación, guiones bajos y espacios en blanco.
5. Para la comparación numérica, use Number y verifique que el valor almacenado sea numérico.
6. Para Entidad de contexto, verifique que la característica actual y la ruta de ejecución suministran un contexto NPC.
7. Imprima el valor real de un script de depuración CustomNPCs.

### Archivo de registro

Al resolver o leer la API de integración CustomNPCs arroja una excepción, DRM registra cada firma de error única una vez para evitar el spam de registro.

```text
config/dochi_rpg_maker/debug.log
```

Buscar por:

```text
CustomNPCs Stored Data access failed
```

Una clave que normalmente falta o una comparación ordinaria `false` no se registra como un error.

### Errores comunes

| Error | Arreglar |
| --- | --- |
| Script escribe los datos del reproductor, pero Scope es World | Cambiar el alcance al jugador |
| Script escribe numérico `3` y la condición compara String `03` | Comparar número `3` o estandarizar el formato almacenado |
| Script escribe `ready` pero la condición espera `READY` | Caso de la carta del partido |
| Remnant Message utiliza la Entidad de Contexto | Usar el jugador o el mundo |
| La clave se establece en `0` y `not_exists` se espera | Llamar `remove(key)` para borrar la clave |
| Booleano `true` se compara con `==` | Almacenar un número o cadena como `1` o `"true"` |

## Convenciones recomendadas

- Prefijo teclas como `pack_id.system.field` para evitar colisiones.
- Almacenar etapas y contadores como números; almacenar nombres de estado e ID como cadenas.
- Mantenga un tipo de valor para cada clave en cada script que la escriba.
- Prefiera Jugador o Mundo cuando una condición debe funcionar en cada ruta de evaluación.
- Recuerde que un valor mundial es compartido por todos los jugadores en esa dimensión.
- Prefiere el editor de condiciones DRM sobre la edición manual JSON.

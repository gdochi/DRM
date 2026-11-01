---
title: API de scripts de consulta de efecto de poción
slug: script-effect-api
order: 130
description: Usa drmEffect en scripts CustomNPCs para inspeccionar los efectos activos, el tiempo restante, el amplificador y el nivel de visualización en NPCs y reproductores.
product: core
category: API de scripts
section: script-api
status: Estable
version: 0.3.1
audience: CustomNPCs los autores de guiones de combate y estatales
tags:
  - script
  - customnpcs
  - potion
  - effect
translationSource: en
translationMethod: assisted
---

## Nivel de velocidad de lectura II y tiempo restante

Utilice esto para bifurcar el diálogo o el comportamiento basado en un efecto de poción. Check tiene primero, luego usa el nivel para un número de nivel de jugador. Esta API solo lee efectos; prepare el efecto por separado.

![Velocidad de lectura real ii nivel y resultado de tiempo restante.](assets/media/guides/drm-031-forge1201-apis/api-effect-speed.png "DRM 0.3.1 / Forge 1.20.1. Un efecto de jugador de Speed II real devuelve: true, level.2 Amplificador -1. La consulta reporta 1200 ticks; el tiempo pasa antes de la captura, por lo que el inventario muestra 00:57.")

## Sinopsis

`drmEffect` es un objeto de escritura global CustomNPCs para leer efectos de criaturas activas, comúnmente llamados efectos de poción, de entidades vivientes. Informa si un NPC o reproductor tiene un efecto, cuántos ticks o segundos quedan, y tanto el amplificador interno como el nivel orientado al usuario.

```js
function interact(event) {
    if (drmEffect.has(event.player, "minecraft:speed")) {
        var seconds = drmEffect.remainingSeconds(event.player, "minecraft:speed");
        var level = drmEffect.level(event.player, "minecraft:speed");
        event.player.message("Speed " + level + " / " + seconds + " seconds left");
    }
}
```

`drmEffect` es de solo lectura. No añade, elimina ni cambia los efectos. Un ID de destino o efecto no válido devuelve los valores predeterminados seguros en lugar de interrumpir el script.

:::note Entidades Aceptadas
El primer argumento puede ser una envoltura de entidad CustomNPCs o una entidad viviente Minecraft. Las entradas comunes son `event.npc`, `event.player` y `event.npc.getAttackTarget()`. Cualquier cosa que no pueda resolverse ante una entidad viviente se considera que no tiene efecto.
:::

## Tabla de Método Completo

| Método | Cuando presente | Cuando Ausente o Inválido |
| --- | --- | --- |
| `has(entity, effectId)` | `true` | `false` |
| `remainingTicks(entity, effectId)` | garrapatas restantes | `0` |
| `ticks(entity, effectId)` | Igual que `remainingTicks` | `0` |
| `remainingSeconds(entity, effectId)` | garrapatas restantes ÷ 20 | `0.0` |
| `seconds(entity, effectId)` | Igual que `remainingSeconds` | `0.0` |
| `amplifier(entity, effectId)` | Amplificador interno basado en cero | `-1` |
| `level(entity, effectId)` | Nivel de usuario único | `0` |

### Presencia

```js
if (drmEffect.has(event.npc, "minecraft:strength")) {
    event.npc.say("Strength is active");
}
```

`has` es `true` solo cuando se adjunta una instancia de efecto. Un ID vacío, un ID mal formado o un efecto no registrado es `false`.

### Tiempo restante

```js
var ticksLeft = drmEffect.remainingTicks(event.player, "regeneration");
var secondsLeft = drmEffect.remainingSeconds(event.player, "regeneration");

// Short aliases return the same values.
var sameTicks = drmEffect.ticks(event.player, "regeneration");
var sameSeconds = drmEffect.seconds(event.player, "regeneration");
```

Minecraft normalmente ejecuta 20 garrapatas por segundo. `remainingSeconds` es un `double`, por lo que puede devolver un valor fraccionario como `2.5`.

Un efecto infinito devuelve `-1` para los ticks y segundos restantes. No trate cada duración negativa o no positiva como ausencia. Compruebe `has` primero.

```js
var present = drmEffect.has(event.npc, "minecraft:resistance");
var left = drmEffect.remainingTicks(event.npc, "minecraft:resistance");

if (present && left < 0) {
    event.npc.say("Resistance is infinite");
}
```

### Amplificador versus nivel de visualización

Minecraft almacena amplificadores desde cero, mientras que la interfaz de usuario muestra los niveles de efecto desde uno.

| Texto de UI | `amplifier` | `level` |
| --- | ---: | ---: |
| Velocidad I | 0 | 1 |
| Velocidad II | 1 | 2 |
| Velocidad III | 2 | 3 |
| Ausente | -1 | 0 |

Usa `level` en el diálogo y las reglas de juego ordinarias. Utilice `amplifier` solo cuando coincida con las fórmulas internas basadas en cero de Minecraft.

```js
var shownLevel = drmEffect.level(event.player, "speed");
var internalAmplifier = drmEffect.amplifier(event.player, "speed");
```

## Reglas de ID de efecto

La forma completa es `namespace:path`.

```text
minecraft:speed
minecraft:regeneration
irons_spellbooks:instant_mana
example_mod:custom_effect
```

Un ID sin un espacio de nombres por defecto es `minecraft:`.

```js
drmEffect.has(event.player, "speed");
drmEffect.has(event.player, "minecraft:speed");
// These query the same effect.
```

DRM recorta el ID, lo convierte en minúsculas y lo busca en el registro de efectos de la criatura Forge. El texto en blanco, un ResourceLocation no válido o un efecto de un mod que no está instalado se trata como ausente.

:::warning No uses nombres para mostrar
Utilice el ID del registro, no texto localizado como `Speed II` o un nombre de sugerencia de herramientas. Obtenga el ID exacto de un efecto modificado de la documentación de ese mod o de una herramienta de inspección del registro.
:::

## Ramificación en un efecto de jugador

Requiere visión nocturna con más de diez segundos restantes.

```js
function interact(event) {
    var player = event.player;
    var effect = "minecraft:night_vision";

    if (!drmEffect.has(player, effect)) {
        player.message("Night Vision is required.");
        return;
    }

    var seconds = drmEffect.remainingSeconds(player, effect);
    if (seconds >= 0 && seconds <= 10) {
        player.message("The effect expires too soon: " + seconds + " seconds");
        return;
    }

    player.message("Requirement passed");
}
```

`seconds < 0` representa un efecto infinito, por lo que supera el requisito de duración en este ejemplo.

## Comprobación del propio efecto del PNJ

Mantén activa una fase de defensa solo mientras el PNJ tenga Resistencia II o superior.

```js
var DEFENSE_ACTIVE = false;

function tick(event) {
    var npc = event.npc;
    var active = drmEffect.level(npc, "minecraft:resistance") >= 2;

    if (active == DEFENSE_ACTIVE) return;
    DEFENSE_ACTIVE = active;

    if (active) {
        drmCombat.setAttacks(npc, false, false);
        npc.say("Defense phase started");
    } else {
        drmCombat.setAttacks(npc, true, true);
        npc.say("Defense phase ended");
    }
}
```

El seguimiento del estado anterior evita que el mensaje y la actualización de combate repitan cada marca.

## Comprobar un objetivo antes de lanzar una habilidad

Lanzar un proyectil Cataclysm sólo mientras el objetivo no está envenenado.

```js
var NEXT_CAST_TICK = 0;

function tick(event) {
    var npc = event.npc;
    var target = npc.getAttackTarget();
    if (target == null) return;

    var now = Number(npc.getWorld().getTotalTime());
    if (now < NEXT_CAST_TICK) return;

    if (drmEffect.has(target, "minecraft:poison")) {
        NEXT_CAST_TICK = now + 20;
        return;
    }

    var options = drmSkill.options()
        .set("speed", 0.8)
        .set("warmupTicks", 0);

    var ok = drmSkill.use(
        npc,
        "cataclysm:ender_guardian_bullet",
        target,
        5,
        options
    );

    NEXT_CAST_TICK = now + (ok
        ? Math.max(20, drmSkill.lastCooldownTicks())
        : 20);
}
```

`drmEffect` solo lee el estado. Este ejemplo no implica que la habilidad seleccionada aplique Poison; el comportamiento real de la habilidad pertenece al mod del proveedor.

## Copiar el estado de efecto en los datos almacenados

Almacene una instantánea para otro script CustomNPCs o una condición DRM `cnpc_stored_data`.

```js
function tick(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();

    if (!drmEffect.has(npc, "speed")) {
        data.remove("boss.speed.seconds");
        data.remove("boss.speed.level");
        return;
    }

    data.put("boss.speed.seconds",
        String(drmEffect.remainingSeconds(npc, "speed")));
    data.put("boss.speed.level",
        String(drmEffect.level(npc, "speed")));
}
```

Si una instantánea por marca no es necesaria, actualícela cada 20 marca con un contador. Cuando las condiciones DRM leen estos valores, siga las reglas de comparación de alcance y número en **CustomNPCs Stored Data Condition Integration**.

## Instantánea segura reutilizable

Este ayudante mantiene los efectos ausentes e infinitos distintos.

```js
function effectSnapshot(entity, effectId) {
    if (!drmEffect.has(entity, effectId)) {
        return {
            present: false,
            ticks: 0,
            seconds: 0,
            amplifier: -1,
            level: 0,
            infinite: false
        };
    }

    var ticks = Number(drmEffect.remainingTicks(entity, effectId));
    return {
        present: true,
        ticks: ticks,
        seconds: Number(drmEffect.remainingSeconds(entity, effectId)),
        amplifier: Number(drmEffect.amplifier(entity, effectId)),
        level: Number(drmEffect.level(entity, effectId)),
        infinite: ticks < 0
    };
}
```

Uso:

```js
var state = effectSnapshot(event.player, "minecraft:strength");
if (state.present && state.level >= 2) {
    event.player.message("Strength II or higher");
}
```

## Fallo Predeterminados

| Situación de entrada | `has` | Hora | `amplifier` | `level` |
| --- | ---: | ---: | ---: | ---: |
| Efecto ausente | falso | 0 | -1 | 0 |
| `entity` es `null` | falso | 0 | -1 | 0 |
| El objeto no es una entidad viviente | falso | 0 | -1 | 0 |
| ID de efecto en blanco | falso | 0 | -1 | 0 |
| Sintaxis de ID no válida | falso | 0 | -1 | 0 |
| Mod opcional que falta, por lo que el efecto no está registrado | falso | 0 | -1 | 0 |
| Efecto infinito | verdadero | -1 | Valor real | Nivel real |

Utilice este orden cuando la ausencia y el nivel cero no deben confundirse:

```js
if (drmEffect.has(entity, id)) {
    var level = drmEffect.level(entity, id);
    var ticks = drmEffect.remainingTicks(entity, id);
}
```

## Errores comunes

1. No interprete `amplifier >= 2` como nivel UI II o superior. El nivel II tiene amplificador 1.
2. No uses solo `remainingTicks <= 0` para la ausencia; eso también rechaza la duración infinita `-1`. Llama `has` primero.
3. No anteponga un efecto modificado con `minecraft:`. Utilice su espacio de nombres de mod real.
4. Use un ID de registro en lugar de un nombre de visualización o una clave de traducción.
5. En un script Tick, null-check `getAttackTarget()` cada vez porque el objetivo puede cambiar.

## Scripts globales relacionados

| Objeto | Finalidad |
| --- | --- |
| `drmSkill` | Descubre, selecciona objetivos, selecciona direcciones, se enfría y cancela las habilidades de cross-mod |
| `drmAnimation` | Reproducción de animación directa y mapeos de comportamiento |
| `drmHitbox` | Control de caja de golpe, altura de ojo y caja de ataque NPC |
| `drmCombat` | Permitir o bloquear CustomNPCs ataques cuerpo a cuerpo y a distancia predeterminados |
| `drmEffect` | Consultar estado de poción-efecto actual |

Cada objeto tiene una referencia completa y ejemplos prácticos en la sección Script API.

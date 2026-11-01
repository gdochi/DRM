---
title: API de scripts de habilidad Cross-Mod
slug: script-skill-api
order: 129
description: Lanza hechizos de hierro, criaturas de Mowzie y habilidades de cataclismo desde CustomNPCs guiones hasta drmSkill.
product: core
category: API de scripts
section: script-api
status: Estable
version: 0.3.1
audience: CustomNPCs los autores de guiones de combate y jefe
tags:
  - script
  - customnpcs
  - skill
  - forge
translationSource: en
translationMethod: assisted
---

## Dejar que un NPC lance un hechizo instalado

Esta API conecta el hechizo de un proveedor instalado a un lanzador CustomNPCs. Compruebe que el proveedor está presente y que el hechizo está disponible antes de lanzar. La pantalla muestra una llamada de bola de fuego de hechizos de hierro de nivel uno. Para configurar el tiempo, el rango y las fases a través de un editor, use [BattleWorks habilidades y efectos](#mob-editor/battleworks-skills-effects).

![Real deja que un npc emita un resultado de hechizo instalado.](assets/media/guides/drm-031-forge1201-apis/api-skill-fireball.png "DRM 0.3.1 / Forge 1.20.1 con CustomNPCs y Hechizos de Hierro 3.4.0.9. La llamada devuelve el éxito y produce el efecto de hechizo real; la salud del servidor de la vaca preparada cambia de 100 a 90. Este único caso no es un valor de daño universal para otros niveles o defensas.")

## Sinopsis

`drmSkill` es un global CustomNPCs objeto de script que permite un CustomNPCs NPC lanza hechizos públicos, efectos y proyectiles suministrados por otros Forge Mods. DRM 0.1.4 incluye a estos proveedores:

| ID del proveedor | Mod | Modelo de exposición |
| --- | --- | --- |
| `irons_spellbooks` | Hechizos de Hierro 'n Spellbooks | Expone dinámicamente el registro de hechizos habilitado para la versión instalada |
| `mowziesmobs` | Criaturas de Mowzie | Expone seis habilidades de efecto DRM probadas |
| `cataclysm` | L_Ender El cataclismo | Expone cinco habilidades de efecto o proyectil DRM probadas |

Las integraciones de Mowzie y Cataclysm no copian la IA del jefe privado. Crean entidades de efecto público o proyectiles propiedad del NPC. Un mod opcional faltante o incompatible devuelve `false` en lugar de bloquear el script.

:::warning Requisitos de tiempo de ejecución
`drmSkill` se registra cuando Forge 1.20.1 DRM y CustomNPCs se cargan juntos. El lanzador debe ser un NPC en vivo del lado del servidor CustomNPCs. Un jugador, criatura ordinaria, entidad muerta o entidad del lado del cliente es rechazado como el lanzador.
:::

## El ejemplo más pequeño

Lanza una bola de fuego de hechizos de hierro de nivel 5 al jugador que interactúa.

```js
function interact(event) {
    var success = drmSkill.use(
        event.npc,
        "irons_spellbooks:fireball",
        event.player,
        5
    );

    if (!success) {
        event.npc.say("Cast failed: " + drmSkill.lastCode());
    }
}
```

`use` devuelve `true` cuando el elenco es aceptado y `false` cuando es rechazado o cancelado. Un nivel solicitado fuera de la definición de habilidad se fija a su mínimo o máximo.

## Referencia de API

### Revelación

| Llamar | Devolución | Finalidad |
| --- | --- | --- |
| `drmSkill.providers()` | Matriz de cadenas | Identificadores de proveedores disponibles |
| `drmSkill.skills()` | Matriz de cadenas | Cada ID de habilidad disponible, ordenado |
| `drmSkill.skills(provider)` | Matriz de cadenas | ID de habilidades de un proveedor |
| `drmSkill.available(skillId)` | Booleano | Si la habilidad es utilizable actualmente |
| `drmSkill.describe(skillId)` | Cadena JSON | Requerimientos de nivel, tiempo de reutilización, rango y destino |

```js
function init(event) {
    var providers = drmSkill.providers();
    var skills = drmSkill.skills("mowziesmobs");

    event.npc.getStoreddata().put("drm.provider.count", providers.length);
    event.npc.getStoreddata().put("drm.mowzie.skill.count", skills.length);
}
```

`describe` devuelve una cadena JSON con estos campos:

```js
var text = drmSkill.describe("mowziesmobs:solar_beam");
// {"id":"mowziesmobs:solar_beam","label":"Solar Beam",
//  "minLevel":1,"maxLevel":10,"cooldownTicks":120,
//  "maxRange":64.0,"requiresTarget":false,"supportsDirection":true}
```

Devuelve `{}` para una habilidad desconocida. Utilice `JSON.parse(text)` cuando el motor de script CustomNPCs necesite un objeto.

### Lanzamientos de objetivos

```js
drmSkill.use(npc, skillId);
drmSkill.use(npc, skillId, target);
drmSkill.use(npc, skillId, target, level);
drmSkill.use(npc, skillId, target, level, options);
drmSkill.use(npc, skillId, target, level, affectNpcs);
drmSkill.use(npc, skillId, target, level, affectNpcs, options);
```

`cast(...)` es un alias para `use(...)`; `use` se recomienda porque tiene el conjunto de sobrecarga completa más clara. `target` puede ser una envoltura CustomNPCs o una entidad viviente Minecraft. Pase `null` solo para una habilidad que no requiere un objetivo.

### Dirección Casts

```js
drmSkill.useDirection(npc, skillId, x, y, z);
drmSkill.useDirection(npc, skillId, x, y, z, level);
drmSkill.useDirection(npc, skillId, x, y, z, level, options);
drmSkill.useDirection(npc, skillId, x, y, z, level, affectNpcs);
drmSkill.useDirection(npc, skillId, x, y, z, level, affectNpcs, options);
```

`castDirection(...)` es el alias. DRM normaliza el vector, por lo que su longitud no tiene que ser 1. Los tres valores deben ser finitos y el vector no debe ser `(0, 0, 0)`.

```js
// Cast along the NPC's look direction.
var rotation = event.npc.getRotation();
var yaw = Number(rotation[0]) * Math.PI / 180.0;
var pitch = Number(rotation[1]) * Math.PI / 180.0;
var x = -Math.sin(yaw) * Math.cos(pitch);
var y = -Math.sin(pitch);
var z =  Math.cos(yaw) * Math.cos(pitch);

drmSkill.useDirection(
    event.npc,
    "cataclysm:ignis_fireball",
    x, y, z,
    4
);
```

Si una definición requiere estrictamente un objetivo, un reparto de dirección se cancela silenciosamente. Devuelve `false`, `lastCode()` es `cancelled`, no se consume ningún tiempo de reutilización, y no se escribe ningún diagnóstico de error.

## Control de daños a NPCs

`affectNpcs` por defecto en `true`. Pasar `false` hace que este lanzamiento inflija cero daño específicamente a CustomNPCs NPCs.

```js
var success = drmSkill.use(
    event.npc,
    "mowziesmobs:solar_beam",
    event.npc.getAttackTarget(),
    4,
    false,
    drmSkill.options().set("durationTicks", 50)
);
```

| Valor | CustomNPCs Daños de PNJ | Daño del jugador | Daño de criatura No PersonalizadoNPC |
| --- | --- | --- | --- |
| `true` | Permitido | Permitido | Permitido |
| `false` | Bloqueado | Permitido | Permitido |

Esto no es una prueba de facción, equipo o fuego amigo. Filtra solo si la entidad dañada es un NPC CustomNPCs. Los rayos, las respiraciones y los proyectiles rastreados retienen la política, mientras que DRM puede asociarlos con el lanzador.

El constructor de opciones puede llevar la misma configuración:

```js
var options = drmSkill.options()
    .affectNpcs(false)
    .set("durationTicks", 50);

drmSkill.use(event.npc, "mowziesmobs:solar_beam", target, 4, options);
```

Una sobrecarga booleana explícita tiene prioridad cuando ambas ubicaciones proporcionan la configuración.

## Opciones sin citas escapadas

El constructor es la forma de entrada más legible.

```js
var options = drmSkill.options()
    .set("damage", 14)
    .set("speed", 1.1)
    .set("warmupTicks", 8)
    .set("soul", true);
```

`set` devuelve el mismo constructor para encadenar. `set(key, null)` elimina una clave, `clear()` elimina todas las entradas y `size()` devuelve el recuento actual.

También se aceptan los siguientes formularios:

```js
// JavaScript object
drmSkill.use(npc, skillId, target, 4, {
    durationTicks: 50,
    damage: 14
});

// Relaxed object text: keys and numbers need no quotes
drmSkill.use(npc, skillId, target, 4, "{durationTicks:50, damage:14}");

// key=value text
drmSkill.use(npc, skillId, target, 4, "durationTicks=50, damage=14");

// Existing valid JSON text remains compatible
drmSkill.use(npc, skillId, target, 4, '{"durationTicks":50}');
```

:::note Límites de entrada
Una llamada acepta hasta 32 opciones primitivas. La entrada de texto está limitada a 2,048 caracteres. Las teclas aceptan 1–48 letras minúsculas, dígitos, puntos, guiones bajos o guiones; los valores están limitados a 256 caracteres. No anidar arrays u objetos como valores. La entrada no válida devuelve `false` con `rejected`.
:::

Las teclas de opción se normalizan a minúsculas internamente. La documentación usa nombres legibles como `durationTicks`, `warmupTicks` y `affectNpcs`; la búsqueda del proveedor no distingue entre mayúsculas y minúsculas después de la normalización.

## Habilidades y opciones del proveedor

### Hechizos de Hierro 'n Spellbooks

DRM lee dinámicamente hasta 512 hechizos habilitados desde la versión instalada. Descubre la lista exacta del servidor en lugar de asumir que existe un hechizo.

```js
var ids = drmSkill.skills("irons_spellbooks");
for (var i = 0; i < ids.length; i++) {
    event.npc.say(String(ids[i]));
}
```

El ID de habilidad es el ID de registro de hechizos, como `irons_spellbooks:fireball`. Las descripciones utilizan un rango de bloques 64, y actualmente no hay opciones específicas del proveedor DRM. El hechizo aún puede rechazar un yeso a través de sus propias condiciones previas o reglas estatales.

```js
if (drmSkill.available("irons_spellbooks:fireball")) {
    drmSkill.use(event.npc, "irons_spellbooks:fireball", event.player, 5);
}
```

### Criaturas de Mowzie

| ID de habilidad | Enfriamiento | Rango máximo | Opciones y límites |
| --- | ---: | ---: | --- |
| `mowziesmobs:sunstrike` | 40 garrapatas | 64 | Ninguno |
| `mowziesmobs:solar_beam` | 120 garrapatas | 64 | `durationTicks`: 10–100 |
| `mowziesmobs:ice_breath` | 100 garrapatas | 32 | Ninguno |
| `mowziesmobs:boulder_projectile` | 60 garrapatas | 64 | `damage`: 1–100, `speed`: 0.2–2.0 |
| `mowziesmobs:axe_attack` | 40 garrapatas | 16 | `vertical`: por defecto `false` |
| `mowziesmobs:axe_attack_vertical` | 60 garrapatas | 16 | `vertical`: por defecto `true` |

Todas las definiciones de Mowzie usan niveles 1–10 y soportan objetivos o direcciones. El haz solar tiene por defecto `30 + level × 5` ticks. El daño de Boulder se establece por defecto en `3 + level × 2`, la velocidad en `0.9 + level × 0.04` y su nivel de tamaño aumenta con el nivel.

```js
var boulder = drmSkill.options()
    .set("damage", 18)
    .set("speed", 1.2);

drmSkill.use(
    event.npc,
    "mowziesmobs:boulder_projectile",
    event.npc.getAttackTarget(),
    5,
    boulder
);
```

### L_Ender El cataclismo

| ID de habilidad | Enfriamiento | Rango máximo | Opciones y límites |
| --- | ---: | ---: | --- |
| `cataclysm:void_rune` | 60 garrapatas | 64 | `damage`: 0–200, `warmupTicks`: 0–100 |
| `cataclysm:ignis_fireball` | 30 garrapatas | 64 | `speed`: 0.1–1.0, `warmupTicks`: 0–100, `soul`: Booleano |
| `cataclysm:ignis_soul_fireball` | 50 garrapatas | 64 | `speed`: 0.1–1.0, `warmupTicks`: 0–100, `soul`: Booleano |
| `cataclysm:ignis_abyss_fireball` | 80 garrapatas | 64 | `speed`: 0.1–0.8, `warmupTicks`: 0–100 |
| `cataclysm:ender_guardian_bullet` | 20 garrapatas | 80 | `speed`: 0.1–2.0, `warmupTicks`: 0–100 |

Todas las definiciones de Cataclysm usan niveles 1–10 y apoyan el objetivo o la dirección. Las opciones omitidas usan valores predeterminados basados en niveles.

```js
var rune = drmSkill.options()
    .set("damage", 14)
    .set("warmupTicks", 8);

drmSkill.use(event.npc, "cataclysm:void_rune", target, 4, rune);
```

## Resultados y Enfriamientos

El resultado más reciente `use` o `useDirection` se mantiene para el hilo de script actual.

```js
var success = drmSkill.use(event.npc, skillId, target, level);
var code = String(drmSkill.lastCode());
var message = String(drmSkill.lastMessage());
var cooldown = Number(drmSkill.lastCooldownTicks());
```

| Código | Significado | Respuesta típica |
| --- | --- | --- |
| `success` | Reparto aceptado | Reintentar después de `lastCooldownTicks()` |
| `invalid_caster` | No es un servidor CustomNPCs NPC | Compruebe el lanzador y el lado lógico |
| `invalid_skill` | ID de habilidad desconocida | Utilice `available` o `skills` |
| `provider_unavailable` | Proveedor mod o API no disponible | Compruebe la versión mod y la instalación del servidor |
| `invalid_target` | Objetivo faltante o no válido | Esperar un nuevo objetivo |
| `out_of_range` | El objetivo excede el rango máximo | Vuelva a intentarlo cuando esté más cerca |
| `cooldown` | DRM El tiempo de reutilización está activo | Espera las garrapatas restantes devueltas |
| `cancelled` | Cancelación tranquila normal | Final sin manejo de errores |
| `rejected` | Validación de proveedor u opción rechazada | Leer `lastMessage` |
| `error` | Excepción de ejecución del proveedor | Inspeccionar DRM registros |

Consulta o tiempos de reutilización claros directamente cuando sea necesario:

```js
var ticks = drmSkill.cooldownRemaining(event.npc, skillId);
var cleared = drmSkill.clearCooldown(event.npc, skillId);
```

Un elenco exitoso almacena un tiempo de reutilización por PNJ y habilidad. Los fallos y las cancelaciones silenciosas no consumen un nuevo tiempo de reutilización.

## Guión completo de tick

Este script arroja una roca de nivel 5 mientras existe un objetivo de ataque y programa reintentos según el resultado.

```js
var NEXT_CAST_TICK = 0;
var SKILL_ID = "mowziesmobs:boulder_projectile";

function tick(event) {
    var npc = event.npc;
    var now = Number(npc.getWorld().getTotalTime());
    if (now < NEXT_CAST_TICK) return;

    var target = npc.getAttackTarget();
    if (target == null) {
        NEXT_CAST_TICK = now + 10;
        return;
    }

    if (!drmSkill.available(SKILL_ID)) {
        NEXT_CAST_TICK = now + 100;
        return;
    }

    var options = drmSkill.options()
        .set("damage", 14)
        .set("speed", 1.1);

    if (drmSkill.use(npc, SKILL_ID, target, 5, false, options)) {
        NEXT_CAST_TICK = now + Math.max(10, drmSkill.lastCooldownTicks());
        return;
    }

    var code = String(drmSkill.lastCode());
    if (code == "cooldown") {
        NEXT_CAST_TICK = now + Math.max(1, drmSkill.lastCooldownTicks());
    } else if (code == "invalid_target" || code == "out_of_range") {
        NEXT_CAST_TICK = now + 10;
    } else {
        NEXT_CAST_TICK = now + 20;
    }
}

function died(event) {
    drmSkill.cancel(event.npc);
}
```

`cancel(npc)` elimina los rayos rastreados, las respiraciones, los proyectiles y las entidades de efecto creadas por ese PNJ y devuelve el número eliminado. Llámalo en caso de muerte de NPC, una transición de fase de jefe o una interrupción explícita de la habilidad.

## Combinación de DRM API de scripts

```js
function castBossSkill(npc, target) {
    drmCombat.setAttacks(npc, false, false);
    drmAnimation.playEntityAnimation(npc, "attack_animation", 1.0, 40);

    var ok = drmSkill.use(npc, "cataclysm:void_rune", target, 5,
        drmSkill.options().set("damage", 18));

    if (!ok && String(drmSkill.lastCode()) != "cancelled") {
        npc.say("skill: " + drmSkill.lastCode());
    }
    return ok;
}
```

Las páginas `drmAnimation`, `drmHitbox` y `drmCombat` documentan sus métodos completos y restricciones. Usa `drmEffect` de **Potion Effect Query Script API** para bloquear un lanzamiento mediante un efecto activo.

### Anunciando una habilidad exitosa con un popup

Una definición guardada por Popup Maker se puede reproducir desde el mismo script a través de `drmPopup`. Este ejemplo muestra `area_title.json` al jugador después de un lanzamiento exitoso y anula solo el texto de su cuerpo.

```js
function interact(event) {
    var ok = drmSkill.use(
        event.npc,
        "irons_spellbooks:fireball",
        event.player,
        5
    );

    if (ok) {
        drmPopup.text(
            event.player,
            "area_title.json",
            "Fireball cast\nCooldown: " + drmSkill.lastCooldownTicks() + " ticks"
        );
    }
}
```

`drmPopup.text` devuelve el número de jugadores que recibieron la presentación. Consulte **Popup Maker Script API** para ver todos los métodos, saltos de línea, matrices de destino y límites de directiva.

## Solución de problemas y registros

Cada llamada de habilidad no cancelada escribe un diagnóstico en ambas ubicaciones:

```text
config/dochi_rpg_maker/debug.log
logs/latest.log
```

Buscar por:

```text
NPC skill script call:
```

La línea contiene `skill`, solicitado `level`, `success`, `code`, `cooldownTicks` y `message`.

1. Si `drmSkill` no está definido, compruebe las versiones DRM y CustomNPCs y la línea de registro de la API de script al iniciar el servidor.
2. Para `provider_unavailable`, verifique el mod del proveedor y su versión de servidor compatible.
3. Para `invalid_skill`, inspeccione `skills(provider)` en lugar de adivinar una identificación.
4. Para `invalid_target` o `out_of_range`, inspeccione el objetivo de ataque actual y el alcance `describe`.
5. Para `rejected`, lea `lastMessage()` y los límites de opción de proveedor anteriores.
6. Si persisten los efectos persistentes, llame a `cancel(npc)` desde rutas de muerte y fin de fase.

## Proveedores de Addon

Otro Forge addon puede implementar DRM `NpcSkillProvider` y registrarlo a través de `NpcSkillRegistry.register(provider)`. El proveedor proporciona un ID de proveedor único, definiciones de habilidades y un lado del servidor `NpcSkillResult`. Los scripts usan los mismos métodos `providers`, `skills`, `describe` y `use` sin necesidad de otro objeto global.

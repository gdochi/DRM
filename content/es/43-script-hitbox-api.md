---
title: Hitbox Script API
slug: script-hitbox-api
order: 126
description: Utilice drmHitbox en CustomNPCs scripts para crear volúmenes de ataque de un solo disparo autorizados por el servidor.
product: core
category: API de scripts
section: script-api
status: Estable
version: 0.3.1
audience: CustomNPCs Descubrimiento de la Tierra
tags:
  - script
  - customnpcs
  - hitbox
  - combat
translationSource: en
translationMethod: assisted
---

## Vea dónde golpea un ataque de un solo disparo

Compruebe las partículas de forma por separado del daño real. Este ejemplo da una sola vaca a una esfera centrada en el jugador, radio seis, y aplica seis daños una vez. Incluso con la misma vaca listada dos veces, el conteo de aciertos es uno y la salud cambia de 20 a 14. Para la creación de patrones basada en pantalla, comience con [BattleWorks primer ataque](#mob-editor/battleworks-first-attack).

![Real ver donde un ataque de un solo tiro golpea resultado.](assets/media/guides/drm-031-forge1201-apis/api-hitbox-one-shot.png "DRM 0.3.1 / Forge 1.20.1. Compare las partículas de depuración blancas, emparejadas 1 / dañadas 1 en el chat y la salud de la vaca 20 → 14. Esta es una prueba de servidor de una sola vez contra una vaca preparada.")

## Primeros pasos

`drmHitbox` es una API de volumen de ataque autorizada por el servidor que se evalúa una vez cuando se llama. Pase a un atacante y objetivos candidatos; los objetivos cuyos límites de entidad intersectan la forma solicitada reciben daño.

```js
function slash(attacker, targets) {
    return drmHitbox.arc(
        attacker,
        targets,
        0.0, 1.0, 1.5,
        3.5, 100.0, 2.0,
        8.0,
        false
    );
}
```

El valor de retorno es el número de entidades dañadas con éxito, no simplemente el número que intersectó el volumen.

## Atacante y objetivos

- `attacker` puede ser una envoltura de entidad de script CustomNPCs o una entidad viviente Minecraft.
- `targets` puede ser una entidad viviente, una matriz, una colección iterable o los valores de un mapa.
- Las entidades duplicadas son evaluadas una vez por UUID.
- Una llamada evalúa como máximo 256 candidatos únicos.
- Se ignoran el atacante, los objetivos muertos y los objetivos en otro nivel.

`drmHitbox` no te busca en el mundo circundante. Recoger los candidatos en el script y pasar sólo los objetivos deseados. Esto permite seleccionar jugadores, facciones o cualquier grupo filtrado por separado antes de aplicar el volumen.

## Coordenadas y formas

`offsetX`, `offsetY` y `offsetZ` son coordenadas locales basadas en la posición de los pies del atacante. Los desplazamientos horizontales y la orientación de la forma giran con la guiñada actual del atacante. Un positivo `offsetZ` coloca el volumen delante del atacante.

| Método | Tamaño argumentos | Volumen |
| --- | --- | --- |
| `box` | `width`, `height`, `depth` | Una caja rotada con el atacante |
| `rectangle` | `width`, `height`, `depth` | Alias de `box` |
| `sphere` | `radius` | Esfera |
| `circle` | `radius`, `height` | Cilindro horizontal |
| `cylinder` | `radius`, `height` | El mismo cilindro que `circle` |
| `arc` | `range`, `angleDegrees`, `height` | Sector horizontal orientado hacia delante |

Un volumen con altura se extiende la mitad por encima y la otra mitad por debajo del centro seleccionado por `offsetY`.

```js
// 3 x 2 x 2 box in front of the attacker
drmHitbox.box(attacker, targets, 0, 1, 2, 3, 2, 2, 6, false);

// Sphere with radius 2.5
drmHitbox.sphere(attacker, targets, 0, 1, 0, 2.5, 4, false);

// 120-degree forward sector
drmHitbox.arc(attacker, targets, 0, 1, 0, 4, 120, 2, 8, false);
```

El daño utiliza una fuente de ataque de jugador o de ataque de criatura atribuida al atacante.

## Partículas de depuración

El argumento final de cada método es `debug`. Cuando `true`, DRM dibuja el volumen y los marcadores del objetivo dañado con partículas. Un atacante jugador recibe el resumen directamente; para otro atacante vivo como un NPC, los jugadores dentro de los bloques 64 lo reciben. El registro del servidor registra el mismo resumen y los objetivos dañados.

```js
drmHitbox.arc(
    attacker, targets,
    0, 1, 1,
    4, 90, 2,
    8,
    "minecraft:crit",
    true
);
```

Omitir el ID de partícula utiliza `minecraft:end_rod`. Un ID de partícula no válido, o un tipo de partícula que requiere datos adicionales, vuelve a `minecraft:end_rod` e informa de la reserva en la salida de depuración.

No hay un renderizador de depuración de línea directa separado. `line` no es un valor especial y se maneja como una ID de partícula no soportada.

:::warning Servidores de producción
El modo de depuración emite partículas de forma, marcadores de golpe, mensajes y líneas de registro. Habilitarlo mientras se comprueba un volumen y dejarlo `false` en los scripts de combate normales.
:::

## Rangos aceptados

| Valor | Rango aceptado |
| --- | --- |
| Cada desplazamiento | `-64.0` a través de `64.0` |
| Ancho, alto, profundidad, radio, alcance | Mayor que `0`, hasta `64.0` |
| Ángulo de arco | Mayor que `0`, hasta `360.0` |
| Daños | Mayor que `0`, hasta `2048.0` |

Los números no finitos o fuera de rango y los nombres de formas desconocidas devuelven `0` sin aplicar daño. Cuando la depuración está habilitada y el atacante es un jugador, DRM también muestra un mensaje de rechazo de argumento no válido.

## Referencia de firma completa

Cada forma tiene una sobrecarga de partículas por defecto y una sobrecarga con `debugParticle`. Los corchetes a continuación describen la posición opcional; no escriba los corchetes en un guion.

```js
drmHitbox.hit(attacker, targets, shape,
    offsetX, offsetY, offsetZ,
    sizeA, sizeB, sizeC,
    damage, [debugParticle], debug);

drmHitbox.box(attacker, targets,
    offsetX, offsetY, offsetZ,
    width, height, depth,
    damage, [debugParticle], debug);

drmHitbox.rectangle(attacker, targets,
    offsetX, offsetY, offsetZ,
    width, height, depth,
    damage, [debugParticle], debug);

drmHitbox.sphere(attacker, targets,
    offsetX, offsetY, offsetZ,
    radius, damage, [debugParticle], debug);

drmHitbox.circle(attacker, targets,
    offsetX, offsetY, offsetZ,
    radius, height, damage, [debugParticle], debug);

drmHitbox.cylinder(attacker, targets,
    offsetX, offsetY, offsetZ,
    radius, height, damage, [debugParticle], debug);

drmHitbox.arc(attacker, targets,
    offsetX, offsetY, offsetZ,
    range, angleDegrees, height,
    damage, [debugParticle], debug);
```

Para los genéricos `hit`, `sizeA`, `sizeB` y `sizeC` siguen el mismo orden que los argumentos de tamaño de la forma seleccionada. Una esfera usa solo `sizeA`; un cilindro usa `sizeA` y `sizeB`.

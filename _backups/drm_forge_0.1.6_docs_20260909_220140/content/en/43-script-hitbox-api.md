---
title: Hitbox Script API
slug: script-hitbox-api
order: 126
description: Use drmHitbox in CustomNPCs scripts to create server-authoritative one-shot attack volumes.
product: core
category: Script API
section: script-api
status: Stable
version: 0.1.4
audience: CustomNPCs combat script authors
tags:
  - script
  - customnpcs
  - hitbox
  - combat
---

## Getting Started

`drmHitbox` is a server-authoritative attack-volume API that evaluates once when called. Pass an attacker and candidate targets; targets whose entity bounds intersect the requested shape receive damage.

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

The return value is the number of entities successfully damaged, not merely the number that intersected the volume.

## Attacker and Targets

- `attacker` may be a CustomNPCs script entity wrapper or a Minecraft living entity.
- `targets` may be one living entity, an array, an iterable collection, or the values of a map.
- Duplicate entities are evaluated once by UUID.
- One call evaluates at most 256 unique candidates.
- The attacker, dead targets, and targets in another level are ignored.

`drmHitbox` does not search the surrounding world for you. Collect the candidates in the script and pass only the desired targets. This makes it possible to select players, factions, or any separately filtered group before applying the volume.

## Coordinates and Shapes

`offsetX`, `offsetY`, and `offsetZ` are local coordinates based on the attacker's feet position. Horizontal offsets and shape orientation rotate with the attacker's current yaw. A positive `offsetZ` places the volume in front of the attacker.

| Method | Size arguments | Volume |
| --- | --- | --- |
| `box` | `width`, `height`, `depth` | A box rotated with the attacker |
| `rectangle` | `width`, `height`, `depth` | Alias of `box` |
| `sphere` | `radius` | Sphere |
| `circle` | `radius`, `height` | Horizontal cylinder |
| `cylinder` | `radius`, `height` | Same cylinder as `circle` |
| `arc` | `range`, `angleDegrees`, `height` | Forward-facing horizontal sector |

A volume with height extends half above and half below the center selected by `offsetY`.

```js
// 3 x 2 x 2 box in front of the attacker
drmHitbox.box(attacker, targets, 0, 1, 2, 3, 2, 2, 6, false);

// Sphere with radius 2.5
drmHitbox.sphere(attacker, targets, 0, 1, 0, 2.5, 4, false);

// 120-degree forward sector
drmHitbox.arc(attacker, targets, 0, 1, 0, 4, 120, 2, 8, false);
```

Damage uses a player-attack or mob-attack source attributed to the attacker.

## Debug Particles

The final argument of every method is `debug`. When `true`, DRM draws the volume and damaged-target markers with particles. A player attacker receives the summary directly; for another living attacker such as an NPC, players within 64 blocks receive it. The server log records the same summary and damaged targets.

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

Omitting the particle ID uses `minecraft:end_rod`. An invalid particle ID, or a particle type that requires extra data, falls back to `minecraft:end_rod` and reports the fallback in debug output.

There is no separate direct-line debug renderer. `line` is not a special value and is handled as an unsupported particle ID.

:::warning Production Servers
Debug mode emits shape particles, hit markers, messages, and log lines. Enable it while checking a volume and leave it `false` in normal combat scripts.
:::

## Accepted Ranges

| Value | Accepted range |
| --- | --- |
| Each offset | `-64.0` through `64.0` |
| Width, height, depth, radius, range | Greater than `0`, up to `64.0` |
| Arc angle | Greater than `0`, up to `360.0` |
| Damage | Greater than `0`, up to `2048.0` |

Non-finite or out-of-range numbers and unknown shape names return `0` without applying damage. When debug is enabled and the attacker is a player, DRM also displays an invalid-argument rejection message.

## Complete Signature Reference

Each shape has a default-particle overload and an overload with `debugParticle`. Brackets below describe the optional position; do not type the brackets in a script.

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

For generic `hit`, `sizeA`, `sizeB`, and `sizeC` follow the same order as the selected shape's size arguments. A sphere uses only `sizeA`; a cylinder uses `sizeA` and `sizeB`.

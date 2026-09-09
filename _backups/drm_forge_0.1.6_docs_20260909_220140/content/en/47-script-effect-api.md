---
title: Potion Effect Query Script API
slug: script-effect-api
order: 130
description: Use drmEffect in CustomNPCs scripts to inspect active effects, remaining time, amplifier, and display level on NPCs and players.
product: core
category: Script API
section: script-api
status: Stable
version: 0.1.4
audience: CustomNPCs combat and state script authors
tags:
  - script
  - customnpcs
  - potion
  - effect
---

## Overview

`drmEffect` is a global CustomNPCs script object for reading active Mob Effects, commonly called potion effects, from living entities. It reports whether an NPC or player has an effect, how many ticks or seconds remain, and both the internal amplifier and user-facing level.

```js
function interact(event) {
    if (drmEffect.has(event.player, "minecraft:speed")) {
        var seconds = drmEffect.remainingSeconds(event.player, "minecraft:speed");
        var level = drmEffect.level(event.player, "minecraft:speed");
        event.player.message("Speed " + level + " / " + seconds + " seconds left");
    }
}
```

`drmEffect` is read-only. It does not add, remove, or change effects. An invalid target or effect ID returns safe defaults instead of interrupting the script.

:::note Accepted Entities
The first argument may be a CustomNPCs entity wrapper or a Minecraft LivingEntity. Common inputs are `event.npc`, `event.player`, and `event.npc.getAttackTarget()`. Anything that cannot resolve to a living entity is treated as having no effect.
:::

## Complete Method Table

| Method | When Present | When Absent or Invalid |
| --- | --- | --- |
| `has(entity, effectId)` | `true` | `false` |
| `remainingTicks(entity, effectId)` | Remaining ticks | `0` |
| `ticks(entity, effectId)` | Same as `remainingTicks` | `0` |
| `remainingSeconds(entity, effectId)` | Remaining ticks ÷ 20 | `0.0` |
| `seconds(entity, effectId)` | Same as `remainingSeconds` | `0.0` |
| `amplifier(entity, effectId)` | Internal zero-based amplifier | `-1` |
| `level(entity, effectId)` | User-facing one-based level | `0` |

### Presence

```js
if (drmEffect.has(event.npc, "minecraft:strength")) {
    event.npc.say("Strength is active");
}
```

`has` is `true` only when an effect instance is actually attached. An empty ID, malformed ID, or unregistered effect is `false`.

### Remaining Time

```js
var ticksLeft = drmEffect.remainingTicks(event.player, "regeneration");
var secondsLeft = drmEffect.remainingSeconds(event.player, "regeneration");

// Short aliases return the same values.
var sameTicks = drmEffect.ticks(event.player, "regeneration");
var sameSeconds = drmEffect.seconds(event.player, "regeneration");
```

Minecraft normally runs 20 ticks per second. `remainingSeconds` is a `double`, so it may return a fractional value such as `2.5`.

An infinite effect returns `-1` for both remaining ticks and seconds. Do not treat every negative or non-positive duration as absence. Check `has` first.

```js
var present = drmEffect.has(event.npc, "minecraft:resistance");
var left = drmEffect.remainingTicks(event.npc, "minecraft:resistance");

if (present && left < 0) {
    event.npc.say("Resistance is infinite");
}
```

### Amplifier Versus Display Level

Minecraft stores amplifiers from zero, while the UI displays effect levels from one.

| UI Text | `amplifier` | `level` |
| --- | ---: | ---: |
| Speed I | 0 | 1 |
| Speed II | 1 | 2 |
| Speed III | 2 | 3 |
| Absent | -1 | 0 |

Use `level` in dialogue and ordinary gameplay rules. Use `amplifier` only when matching Minecraft's internal zero-based formulas.

```js
var shownLevel = drmEffect.level(event.player, "speed");
var internalAmplifier = drmEffect.amplifier(event.player, "speed");
```

## Effect ID Rules

The full form is `namespace:path`.

```text
minecraft:speed
minecraft:regeneration
irons_spellbooks:instant_mana
example_mod:custom_effect
```

An ID without a namespace defaults to `minecraft:`.

```js
drmEffect.has(event.player, "speed");
drmEffect.has(event.player, "minecraft:speed");
// These query the same effect.
```

DRM trims the ID, converts it to lowercase, and looks it up in the Forge Mob Effect registry. Blank text, an invalid ResourceLocation, or an effect from a mod that is not installed is treated as absent.

:::warning Do Not Use Display Names
Use the registry ID, not localized text such as `Speed II` or a tooltip name. Obtain a modded effect's exact ID from that mod's documentation or a registry inspection tool.
:::

## Branching on a Player Effect

Require Night Vision with more than ten seconds remaining.

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

`seconds < 0` represents an infinite effect, so it passes the duration requirement in this example.

## Checking the NPC's Own Effect

Keep a defense phase active only while the NPC has Resistance II or higher.

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

Tracking the previous state prevents the message and combat update from repeating every tick.

## Checking a Target Before Casting a Skill

Cast a Cataclysm projectile only while the target is not poisoned.

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

`drmEffect` only reads state. This example does not imply that the selected skill applies Poison; actual skill behavior belongs to the provider mod.

## Copying Effect State into Stored Data

Store a snapshot for another CustomNPCs script or a DRM `cnpc_stored_data` condition.

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

If a per-tick snapshot is unnecessary, update it every 20 ticks with a counter. When DRM conditions read these values, follow the Scope and Number comparison rules in **CustomNPCs Stored Data Condition Integration**.

## Reusable Safe Snapshot

This helper keeps absent and infinite effects distinct.

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

Usage:

```js
var state = effectSnapshot(event.player, "minecraft:strength");
if (state.present && state.level >= 2) {
    event.player.message("Strength II or higher");
}
```

## Failure Defaults

| Input Situation | `has` | Time | `amplifier` | `level` |
| --- | ---: | ---: | ---: | ---: |
| Effect absent | false | 0 | -1 | 0 |
| `entity` is `null` | false | 0 | -1 | 0 |
| Object is not a LivingEntity | false | 0 | -1 | 0 |
| Blank effect ID | false | 0 | -1 | 0 |
| Invalid ID syntax | false | 0 | -1 | 0 |
| Optional mod missing, so effect is unregistered | false | 0 | -1 | 0 |
| Infinite effect | true | -1 | Actual value | Actual level |

Use this order when absence and level zero must not be confused:

```js
if (drmEffect.has(entity, id)) {
    var level = drmEffect.level(entity, id);
    var ticks = drmEffect.remainingTicks(entity, id);
}
```

## Common Mistakes

1. Do not interpret `amplifier >= 2` as UI level II or higher. Level II has amplifier 1.
2. Do not use only `remainingTicks <= 0` for absence; that also rejects infinite duration `-1`. Call `has` first.
3. Do not prefix a modded effect with `minecraft:`. Use its actual mod namespace.
4. Use a registry ID instead of a display name or translation key.
5. In a Tick script, null-check `getAttackTarget()` every time because the target may change.

## Related Script Globals

| Object | Purpose |
| --- | --- |
| `drmSkill` | Discover, target-cast, direction-cast, cooldown, and cancel cross-mod skills |
| `drmAnimation` | Direct animation playback and behavior mappings |
| `drmHitbox` | NPC hitbox, eye height, and attack-box control |
| `drmCombat` | Allow or block CustomNPCs default melee and ranged attacks |
| `drmEffect` | Query current potion-effect state |

Each object has a complete reference and practical examples in the Script API section.

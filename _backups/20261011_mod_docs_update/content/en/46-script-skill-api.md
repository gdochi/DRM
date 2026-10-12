---
title: Cross-Mod Skill Script API
slug: script-skill-api
order: 129
description: Cast Iron's Spells, Mowzie's Mobs, and Cataclysm skills from CustomNPCs scripts through drmSkill.
product: core
category: Script API
section: script-api
status: Stable
version: 0.1.6
audience: CustomNPCs combat and boss script authors
tags:
  - script
  - customnpcs
  - skill
  - forge
---

## Overview

`drmSkill` is a global CustomNPCs script object that lets a CustomNPCs NPC cast public spells, effects, and projectiles supplied by other Forge mods. DRM 0.1.4 includes these providers:

| Provider ID | Mod | Exposure Model |
| --- | --- | --- |
| `irons_spellbooks` | Iron's Spells 'n Spellbooks | Dynamically exposes the enabled spell registry for the installed version |
| `mowziesmobs` | Mowzie's Mobs | Exposes six DRM-tested effect skills |
| `cataclysm` | L_Ender's Cataclysm | Exposes five DRM-tested effect or projectile skills |

The Mowzie and Cataclysm integrations do not copy private boss AI. They create public effect or projectile entities owned by the NPC. A missing or incompatible optional mod returns `false` instead of crashing the script.

:::warning Runtime Requirements
`drmSkill` is registered when Forge 1.20.1 DRM and CustomNPCs are loaded together. The caster must be a live, server-side CustomNPCs NPC. A player, ordinary mob, dead entity, or client-side entity is rejected as the caster.
:::

## Smallest Example

Cast a level 5 Iron's Spells fireball at the interacting player.

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

`use` returns `true` when the cast is accepted and `false` when it is rejected or cancelled. A requested level outside the skill definition is clamped to its minimum or maximum.

## API Reference

### Discovery

| Call | Return | Purpose |
| --- | --- | --- |
| `drmSkill.providers()` | String array | Available provider IDs |
| `drmSkill.skills()` | String array | Every available skill ID, sorted |
| `drmSkill.skills(provider)` | String array | Skill IDs from one provider |
| `drmSkill.available(skillId)` | Boolean | Whether the skill is currently usable |
| `drmSkill.describe(skillId)` | JSON string | Level, cooldown, range, and target requirements |

```js
function init(event) {
    var providers = drmSkill.providers();
    var skills = drmSkill.skills("mowziesmobs");

    event.npc.getStoreddata().put("drm.provider.count", providers.length);
    event.npc.getStoreddata().put("drm.mowzie.skill.count", skills.length);
}
```

`describe` returns a JSON string with these fields:

```js
var text = drmSkill.describe("mowziesmobs:solar_beam");
// {"id":"mowziesmobs:solar_beam","label":"Solar Beam",
//  "minLevel":1,"maxLevel":10,"cooldownTicks":120,
//  "maxRange":64.0,"requiresTarget":false,"supportsDirection":true}
```

It returns `{}` for an unknown skill. Use `JSON.parse(text)` when the CustomNPCs script engine needs an object.

### Target Casts

```js
drmSkill.use(npc, skillId);
drmSkill.use(npc, skillId, target);
drmSkill.use(npc, skillId, target, level);
drmSkill.use(npc, skillId, target, level, options);
drmSkill.use(npc, skillId, target, level, affectNpcs);
drmSkill.use(npc, skillId, target, level, affectNpcs, options);
```

`cast(...)` is an alias for `use(...)`; `use` is recommended because it has the clearest complete overload set. `target` may be a CustomNPCs wrapper or a Minecraft living entity. Pass `null` only for a skill that does not require a target.

### Direction Casts

```js
drmSkill.useDirection(npc, skillId, x, y, z);
drmSkill.useDirection(npc, skillId, x, y, z, level);
drmSkill.useDirection(npc, skillId, x, y, z, level, options);
drmSkill.useDirection(npc, skillId, x, y, z, level, affectNpcs);
drmSkill.useDirection(npc, skillId, x, y, z, level, affectNpcs, options);
```

`castDirection(...)` is the alias. DRM normalizes the vector, so its length does not have to be 1. All three values must be finite and the vector must not be `(0, 0, 0)`.

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

If a definition strictly requires a target, a direction cast is quietly cancelled. It returns `false`, `lastCode()` is `cancelled`, no cooldown is consumed, and no error diagnostic is written.

## Controlling Damage to NPCs

`affectNpcs` defaults to `true`. Passing `false` makes this cast deal zero damage specifically to CustomNPCs NPCs.

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

| Value | CustomNPCs NPC Damage | Player Damage | Non-CustomNPC Mob Damage |
| --- | --- | --- | --- |
| `true` | Allowed | Allowed | Allowed |
| `false` | Blocked | Allowed | Allowed |

This is not a faction, team, or friendly-fire test. It filters only by whether the damaged entity is a CustomNPCs NPC. Tracked beams, breaths, and projectiles retain the policy while DRM can associate them with the caster.

The options builder can carry the same setting:

```js
var options = drmSkill.options()
    .affectNpcs(false)
    .set("durationTicks", 50);

drmSkill.use(event.npc, "mowziesmobs:solar_beam", target, 4, options);
```

An explicit Boolean overload takes precedence when both locations provide the setting.

## Options Without Escaped Quotes

The builder is the most readable input form.

```js
var options = drmSkill.options()
    .set("damage", 14)
    .set("speed", 1.1)
    .set("warmupTicks", 8)
    .set("soul", true);
```

`set` returns the same builder for chaining. `set(key, null)` removes one key, `clear()` removes all entries, and `size()` returns the current count.

The following forms are also accepted:

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

:::note Input Bounds
A call accepts up to 32 primitive options. Text input is limited to 2,048 characters. Keys accept 1–48 lowercase letters, digits, dots, underscores, or hyphens; values are limited to 256 characters. Do not nest arrays or objects as values. Invalid input returns `false` with `rejected`.
:::

Option keys are normalized to lowercase internally. Documentation uses readable names such as `durationTicks`, `warmupTicks`, and `affectNpcs`; provider lookup is case-insensitive after normalization.

## Provider Skills and Options

### Iron's Spells 'n Spellbooks

DRM dynamically reads up to 512 enabled spells from the installed version. Discover the exact server list instead of assuming a spell exists.

```js
var ids = drmSkill.skills("irons_spellbooks");
for (var i = 0; i < ids.length; i++) {
    event.npc.say(String(ids[i]));
}
```

The skill ID is the spell registry ID, such as `irons_spellbooks:fireball`. Descriptions use a 64-block range, and there are currently no DRM provider-specific options. The spell may still reject a cast through its own pre-cast conditions or state rules.

```js
if (drmSkill.available("irons_spellbooks:fireball")) {
    drmSkill.use(event.npc, "irons_spellbooks:fireball", event.player, 5);
}
```

### Mowzie's Mobs

| Skill ID | Cooldown | Max Range | Options and Bounds |
| --- | ---: | ---: | --- |
| `mowziesmobs:sunstrike` | 40 ticks | 64 | None |
| `mowziesmobs:solar_beam` | 120 ticks | 64 | `durationTicks`: 10–100 |
| `mowziesmobs:ice_breath` | 100 ticks | 32 | None |
| `mowziesmobs:boulder_projectile` | 60 ticks | 64 | `damage`: 1–100, `speed`: 0.2–2.0 |
| `mowziesmobs:axe_attack` | 40 ticks | 16 | `vertical`: default `false` |
| `mowziesmobs:axe_attack_vertical` | 60 ticks | 16 | `vertical`: default `true` |

All Mowzie definitions use levels 1–10 and support target or direction aiming. Solar Beam defaults to `30 + level × 5` ticks. Boulder damage defaults to `3 + level × 2`, speed to `0.9 + level × 0.04`, and its size tier rises with level.

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

### L_Ender's Cataclysm

| Skill ID | Cooldown | Max Range | Options and Bounds |
| --- | ---: | ---: | --- |
| `cataclysm:void_rune` | 60 ticks | 64 | `damage`: 0–200, `warmupTicks`: 0–100 |
| `cataclysm:ignis_fireball` | 30 ticks | 64 | `speed`: 0.1–1.0, `warmupTicks`: 0–100, `soul`: Boolean |
| `cataclysm:ignis_soul_fireball` | 50 ticks | 64 | `speed`: 0.1–1.0, `warmupTicks`: 0–100, `soul`: Boolean |
| `cataclysm:ignis_abyss_fireball` | 80 ticks | 64 | `speed`: 0.1–0.8, `warmupTicks`: 0–100 |
| `cataclysm:ender_guardian_bullet` | 20 ticks | 80 | `speed`: 0.1–2.0, `warmupTicks`: 0–100 |

All Cataclysm definitions use levels 1–10 and support target or direction aiming. Omitted options use level-based defaults.

```js
var rune = drmSkill.options()
    .set("damage", 14)
    .set("warmupTicks", 8);

drmSkill.use(event.npc, "cataclysm:void_rune", target, 4, rune);
```

## Results and Cooldowns

The most recent `use` or `useDirection` result is held for the current script thread.

```js
var success = drmSkill.use(event.npc, skillId, target, level);
var code = String(drmSkill.lastCode());
var message = String(drmSkill.lastMessage());
var cooldown = Number(drmSkill.lastCooldownTicks());
```

| Code | Meaning | Typical Response |
| --- | --- | --- |
| `success` | Cast accepted | Retry after `lastCooldownTicks()` |
| `invalid_caster` | Not a server CustomNPCs NPC | Check caster and logical side |
| `invalid_skill` | Unknown skill ID | Use `available` or `skills` |
| `provider_unavailable` | Provider mod or API unavailable | Check mod version and server install |
| `invalid_target` | Missing or invalid target | Wait for a new target |
| `out_of_range` | Target exceeds max range | Retry when closer |
| `cooldown` | DRM cooldown is active | Wait the returned remaining ticks |
| `cancelled` | Normal quiet cancellation | End without error handling |
| `rejected` | Provider or option validation rejected | Read `lastMessage` |
| `error` | Provider execution exception | Inspect DRM logs |

Query or clear cooldowns directly when needed:

```js
var ticks = drmSkill.cooldownRemaining(event.npc, skillId);
var cleared = drmSkill.clearCooldown(event.npc, skillId);
```

A successful cast stores a cooldown per NPC and skill. Failures and quiet cancellations do not consume a new cooldown.

## Complete Tick Script

This script casts a level 5 boulder while an attack target exists and schedules retries according to the result.

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

`cancel(npc)` removes tracked beams, breaths, projectiles, and effect entities created by that NPC and returns the number removed. Call it on NPC death, a boss phase transition, or an explicit skill interruption.

## Combining DRM Script APIs

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

The `drmAnimation`, `drmHitbox`, and `drmCombat` pages document their complete methods and constraints. Use `drmEffect` from **Potion Effect Query Script API** to gate a cast by an active effect.

### Announcing a Successful Skill with a Popup

A definition saved by Popup Maker can be played from the same script through `drmPopup`. This example shows `area_title.json` to the player after a successful cast and overrides only its body text.

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

`drmPopup.text` returns the number of players that received the presentation. See **Popup Maker Script API** for all methods, line breaks, target arrays, and policy limits.

## Troubleshooting and Logs

Every non-cancelled skill call writes a diagnostic to both locations:

```text
config/dochi_rpg_maker/debug.log
logs/latest.log
```

Search for:

```text
NPC skill script call:
```

The line contains `skill`, requested `level`, `success`, `code`, `cooldownTicks`, and `message`.

1. If `drmSkill` is undefined, check DRM and CustomNPCs versions and the script API registration line at server startup.
2. For `provider_unavailable`, verify the provider mod and its supported server version.
3. For `invalid_skill`, inspect `skills(provider)` instead of guessing an ID.
4. For `invalid_target` or `out_of_range`, inspect the current attack target and `describe` range.
5. For `rejected`, read `lastMessage()` and the provider option bounds above.
6. If persistent effects remain, call `cancel(npc)` from death and phase-end paths.

## Addon Providers

Another Forge addon may implement DRM's `NpcSkillProvider` and register it through `NpcSkillRegistry.register(provider)`. The provider supplies a unique provider ID, skill definitions, and a server-side `NpcSkillResult`. Scripts then use the same `providers`, `skills`, `describe`, and `use` methods without needing another global object.

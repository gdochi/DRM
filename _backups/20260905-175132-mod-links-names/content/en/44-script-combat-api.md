---
title: Built-in Attack Script API
slug: script-combat-api
order: 127
description: Use drmCombat in CustomNPCs scripts to enable or disable an NPC's built-in melee and ranged attacks.
product: core
category: Script API
section: script-api
status: Stable
version: 0.1.4
audience: CustomNPCs combat script authors
tags:
  - script
  - customnpcs
  - combat
  - ai
---

## Getting Started

`drmCombat` is a server-authoritative script API for independently enabling or disabling a CustomNPCs NPC's built-in melee and ranged attacks.

Disable both built-in attacks for an NPC that uses only spells or custom scripted attacks.

```js
function init(event) {
    drmCombat.setAttacks(event.npc, false, false);
}
```

Allow only ranged attacks as follows.

```js
function init(event) {
    drmCombat.setAttacks(event.npc, false, true);
}
```

:::note Target
State-changing methods accept only a server-side CustomNPCs NPC. Another entity or a client-side target returns `false`.
:::

## Individual Attack Switches

```js
drmCombat.setMeleeAttack(event.npc, false);
drmCombat.setRangedAttack(event.npc, true);
```

| Method | Effect when `enabled` is `false` |
| --- | --- |
| `setMeleeAttack` | Stops melee AI start, continuation, and direct melee execution. |
| `setRangedAttack` | Stops ranged AI start and direct ranged execution. |

Use `setAttacks(npc, meleeEnabled, rangedEnabled)` to change both switches in one call.

## Reading Current State

```js
var meleeEnabled = drmCombat.isMeleeAttackEnabled(event.npc);
var rangedEnabled = drmCombat.isRangedAttackEnabled(event.npc);
```

Both queries return `true` when no lock has been saved. Existing NPCs therefore keep the legacy default in which melee and ranged attacks are allowed.

The query methods also treat an invalid target as the legacy `true` default. Do not use them to validate a target; check the return value of a state-changing method instead.

## Persistence and AI Behavior

The switches are stored server-side in the NPC's PersistentData. They survive NPC and world reloads. Re-enabling an attack removes its lock key.

```js
function enableNormalCombat(npc) {
    return drmCombat.setAttacks(npc, true, true);
}
```

Ranged `enabled` means permitted, not ready. The CustomNPCs NPC must also have a non-empty projectile item in its projectile slot before ranged AI can run. When ranged attacks are disabled or no usable projectile exists, an NPC with melee enabled is treated as projectile-free so its melee AI can run.

## Return Values and Usage Pattern

State-changing methods return `true` after applying values to a server-side CustomNPCs NPC and `false` when they cannot apply the change.

```js
function makeMagicOnly(npc) {
    if (!drmCombat.setAttacks(npc, false, false)) {
        // Verify that this is a server-side CustomNPCs NPC.
        return false;
    }

    // Configure separate spell or scripted attacks here.
    return true;
}
```

Disabling built-in attacks does not block separate scripted damage such as a `drmHitbox` call. These switches control only the built-in CustomNPCs melee and ranged attack paths.

## Complete Signature Reference

```js
drmCombat.setMeleeAttack(npc, enabled);
drmCombat.setRangedAttack(npc, enabled);
drmCombat.setAttacks(npc, meleeEnabled, rangedEnabled);
drmCombat.isMeleeAttackEnabled(npc);
drmCombat.isRangedAttackEnabled(npc);
```

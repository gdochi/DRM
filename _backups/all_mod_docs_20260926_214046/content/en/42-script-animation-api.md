---
title: Animation Script API
slug: script-animation-api
order: 125
description: Use drmAnimation in CustomNPCs scripts to play animations and change behavior mappings or the NPC model.
product: core
category: Script API
section: script-api
status: Stable
version: 0.1.6
audience: CustomNPCs script authors
tags:
  - script
  - customnpcs
  - animation
---

## Getting Started

Dochi's RPG Maker Forge 0.1.4 registers the CustomNPCs script global `drmAnimation`. The first argument of every method is a CustomNPCs script entity wrapper or a Minecraft entity. In most event scripts, pass `event.npc` directly.

```js
function interact(event) {
    drmAnimation.playPlayerAnimator(
        event.npc,
        "mypack:wave",
        1.0,
        80
    );
}
```

This plays `mypack:wave` for 80 ticks. Twenty ticks is normally about one second.

:::note Requirements
`drmAnimation` is registered only when CustomNPCs is present. The selected provider mod and animation resources must also be available on the server and connecting clients.
:::

## Direct Playback

The shortest overload omits the playback policy and uses `once`.

```js
drmAnimation.play(event.npc, "entity", "attack_animation", 1.0, 40);
drmAnimation.playPlayerAnimator(event.npc, "mypack:wave", 1.0, 80);
drmAnimation.playBetterCombat(event.npc, "bettercombat:one_handed_slash", 1.0, 40);
drmAnimation.playEntityAnimation(event.npc, "attack_animation", 1.2, 60);
```

| Provider | Purpose |
| --- | --- |
| `entity` | Native animation from the selected modded entity model |
| `geckolib` | Animation from a DRM-managed GeckoLib JSON model |
| `player_animator` | Player Animator resource animation |
| `better_combat` | The specified Better Combat animation |

`player_animator` and `better_combat` are rejected when the target uses a GeckoLib or modded-entity renderer. For `entity`, first assign a modded-entity model to the NPC and use an animation ID actually exposed by that model.

## Playback Policies

Numeric modes provide compact script arguments.

| playbackMode | Name | Behavior |
| --- | --- | --- |
| `0` | `loop` | Repeat for the requested duration |
| `1` | `once` | Play once |
| `2` | `hold_last` | Play once and hold the last frame |

Place a numeric mode at the end of the call.

```js
drmAnimation.playEntityAnimation(event.npc, "idle_animation", 1.0, 100, 0);
drmAnimation.playEntityAnimation(event.npc, "death_animation", 1.0, 100, 2);
```

Place a named policy immediately after `animation`.

```js
drmAnimation.playEntityAnimation(event.npc, "attack_animation", "once", 1.0, 40);
drmAnimation.play(event.npc, "entity", "idle_animation", "loop", 1.0, 100);
```

Numbers and names outside `loop`, `once`, and `hold_last` are rejected instead of being silently converted.

## Saving Behavior Animations

`setBehavior` stores an animation mapping in the NPC model settings. The standard behavior IDs are `idle`, `walk`, `sprint`, `attack`, `hurt`, and `death`.

```js
function init(event) {
    var npc = event.npc;

    drmAnimation.useModdedEntityModel(npc, "cataclysm:amethyst_crab");
    drmAnimation.setBehavior(npc, "idle", "entity", "idle_animation", 1.0, 0);
    drmAnimation.setBehavior(npc, "attack", "entity", "attack_animation", 1.0, 1);
    drmAnimation.setBehavior(npc, "death", "entity", "death_animation", 1.0, 2);
}
```

Play or remove a saved mapping as follows.

```js
drmAnimation.playBehavior(event.npc, "attack", 60);
drmAnimation.clearBehavior(event.npc, "attack");
```

`useModdedEntityModel` applies a valid entity type ID to a CustomNPCs NPC. Restore the regular CustomNPCs renderer with `useCustomNpcModel`.

```js
drmAnimation.useCustomNpcModel(event.npc);
```

## Arguments and Return Values

- `speed` accepts `0.0` through `32.0`.
- `durationTicks` accepts 1 through 600 ticks.
- Direct playback methods include `durationTicks`; there is no separate `playForTicks` method.
- Use the exact animation ID exposed by the provider.
- Methods return `true` when the request is accepted and `false` for an invalid target, argument, or renderer combination.

## Complete Signature Reference

This section is reference-only.

```js
drmAnimation.play(target, provider, animation, speed, durationTicks);
drmAnimation.play(target, provider, animation, speed, durationTicks, playbackMode);
drmAnimation.play(target, provider, animation, playback, speed, durationTicks);

drmAnimation.playPlayerAnimator(target, animation, speed, durationTicks);
drmAnimation.playPlayerAnimator(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playPlayerAnimator(target, animation, playback, speed, durationTicks);

drmAnimation.playBetterCombat(target, animation, speed, durationTicks);
drmAnimation.playBetterCombat(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playBetterCombat(target, animation, playback, speed, durationTicks);

drmAnimation.playEntityAnimation(target, animation, speed, durationTicks);
drmAnimation.playEntityAnimation(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playEntityAnimation(target, animation, playback, speed, durationTicks);

drmAnimation.playBehavior(target, behavior, durationTicks);
drmAnimation.setBehavior(target, behavior, provider, animation, speed, playbackMode);
drmAnimation.clearBehavior(target, behavior);
drmAnimation.useModdedEntityModel(target, entityTypeId);
drmAnimation.useCustomNpcModel(target);
```

## Troubleshooting

- When a call returns `false`, check the target, provider, animation ID, speed, and duration first.
- Verify that Player Animator or Better Combat is not being used with a modded-entity or GeckoLib renderer.
- Animation engines and internal IDs vary by entity mod. Use an ID shown by the NPC Basic selection list for the selected model.
- The server sends playback requests, but clients render them. Connecting clients need the required DRM build, provider mod, and resources.

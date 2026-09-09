---
title: Popup Maker Script API
slug: script-popup-api
order: 131
description: Use drmPopup in CustomNPCs scripts to play Popup Maker definitions and override presentation text or timeline timing.
product: core
category: Script API
section: script-api
status: Stable
version: 0.1.4
audience: CustomNPCs dialogue, quest, and combat presentation authors
tags:
  - script
  - customnpcs
  - popup
  - forge
---

## Overview

`drmPopup` is a global CustomNPCs script object that plays definitions saved by Popup Maker for server players. It exposes presentation actions only. Definition editing, listing, and reload operations stay in the Popup Maker GUI.

```js
function interact(event) {
    drmPopup.show(event.player, "area_title.json");
}
```

The first argument resolves the receiving players. The second is a Popup Maker definition file; the `.json` suffix is optional.

:::warning Runtime Requirement
`drmPopup` is registered when Forge 1.20.1 DRM and CustomNPCs are loaded together. Call it on the server. A target that resolves no server players returns `0`.
:::

## Setup

1. Open **Popup Maker** from the built-in DRM editor list.
2. Set title, subtitle, body, fade-in, hold, fade-out, channel, and conflict behavior.
3. Select a GUI JSON and use **Edit Layout** when component positions or textures need changes.
4. Save the definition and pass that file name to `drmPopup`.

Definitions are managed under the server's `dochi_rpg_maker/popups/definitions` data and load their selected GUI JSON from the shared GUI store. The script API does not accept raw definition JSON.

## Complete Method Table

| Method | Returns | Behavior |
| --- | ---: | --- |
| `show(targets, definition)` | Players sent | Play the saved definition unchanged |
| `text(targets, definition, text)` | Players sent | Override only body `text` |
| `timed(targets, definition, fadeIn, hold, fadeOut)` | Players sent | Override the three timeline segments |
| `timed(targets, definition, fadeIn, hold, fadeOut, text)` | Players sent | Override timing and a non-empty body |
| `stop(targets, instanceKey)` | Players sent | Stop the matching popup instance key |
| `clear(targets)` | Players sent | Remove all active and queued popups |
| `lastError()` | String | Most recent failure reason, empty after success |

Timing arguments are Minecraft ticks; 20 ticks are normally about one second.

:::note What `timed` Means
`timed` does not create a separate countdown UI. It changes the popup's fade-in, hold, and fade-out presentation duration for that call.
:::

## Targets

`targets` may be one server player, a CustomNPCs player wrapper, an array, or an iterable collection. Duplicate players are sent once.

```js
drmPopup.show(event.player, "area_title");

drmPopup.text(
    [event.player, anotherPlayer],
    "quest_notice.json",
    "Quest updated"
);
```

Resolution is bounded to 1,024 distinct players and four nesting levels. NPCs and ordinary mobs cannot receive a popup.

## Body Text, Line Breaks, and Placeholders

Use `\n` in a JavaScript string for an explicit body line break.

```js
drmPopup.text(
    event.player,
    "area_title.json",
    "Northern Frontier\nA new region has been discovered."
);
```

Saved title, subtitle, body, and overridden body text support per-player placeholders.

| Forms | Value |
| --- | --- |
| `@player`, `{player}`, `${player}`, `%player%` | Receiving player name |
| `{uuid}`, `${uuid}`, `%uuid%` | Receiving player UUID |
| `@npc`, `{npc}`, `${npc}`, `%npc%` | NPC name supplied by a DRM presentation context |

`@npc` resolves automatically only when a DRM path, such as a dialogue action, opens an NPC presentation context. A direct `drmPopup` script call has no NPC argument, so compose that text explicitly when needed.

```js
var body = String(event.npc.getName()) + "\nhas discovered a new area.";
drmPopup.text(event.player, "area_title.json", body);
```

## Timing Overrides

This popup fades in for 10 ticks, holds for 60, and fades out for 20.

```js
drmPopup.timed(event.player, "area_title.json", 10, 60, 20);
```

Add a final argument to override the body too.

```js
drmPopup.timed(
    event.player,
    "quest_notice.json",
    5,
    100,
    15,
    "Objective complete\nReturn to @npc"
);
```

An empty final body preserves the saved body. Use `text(targets, definition, "")` when the body must be cleared.

## Conflict Behavior and Stopping

The definition's `conflict` value controls overlaps within the same channel.

| Value | Behavior |
| --- | --- |
| `replace` | Replace the active channel popup and its queue |
| `refresh` | Replace the active popup with a fresh instance |
| `queue` | Play after the current popup ends |
| `stack` | Play simultaneously with vertical spacing |
| `ignore` | Ignore a request while the channel is active |

`show`, `text`, and `timed` return counts instead of generated runtime UUIDs. Use the `instanceKey` saved in the definition when stopping from a script.

```js
drmPopup.stop(event.player, "area_title");
drmPopup.clear(event.player);
```

## Policy Limits and Errors

The Popup Policy GUI applies these values to scripts:

- `allowTextOverride` for `text` and text-bearing `timed` calls
- `allowTimingOverride` for `timed`
- `maxTextLength` for title, subtitle, and body
- `maxDurationTicks` for the complete timeline
- `maxActivePerPlayer` and `maxQueuedPerPlayer` for runtime limits

A missing definition or GUI, or a blocked override, returns `0` and stores the reason in `lastError()`.

```js
var sent = drmPopup.text(event.player, "quest_notice.json", "Quest updated");
if (sent == 0) {
    event.npc.say("popup failed: " + drmPopup.lastError());
}
```

## Combining Cross-Mod Skills

```js
function interact(event) {
    var ok = drmSkill.use(
        event.npc,
        "cataclysm:void_rune",
        event.player,
        4,
        drmSkill.options().set("damage", 14)
    );

    if (ok) {
        drmPopup.text(
            event.player,
            "skill_notice.json",
            "Void Rune\nCooldown: " + drmSkill.lastCooldownTicks() + " ticks"
        );
    }
}
```

See **Cross-Mod Skill Script API** for provider discovery, skill IDs, target and direction casts, options, result codes, and cooldowns.

## Troubleshooting

1. If `drmPopup` is undefined, verify that Forge DRM and CustomNPCs loaded together.
2. `Unable to load popup definition` means the Popup Maker file name is wrong or missing.
3. A GUI load error means the definition's selected GUI JSON is absent from the shared GUI store.
4. If only `text` or `timed` fails, inspect the Popup Policy override switches.
5. For an invisible popup, inspect definition and component `enabled`, channel conflict behavior, and active/queue limits.


---
title: What's New In 0.1.4
slug: release-0-1-4
order: 10
description: The verified feature, behavior, dependency, and migration changes from Forge 0.1.3 to 0.1.4.
product: core
category: Getting Started
section: getting-started
status: Stable
version: 0.1.4
audience: Creators / Operators
tags:
  - release
  - migration
---

This is a historical release record. See [DRM 0.3.1](#core/release-notes-0-3-1) for current guidance.

## Find quest authoring

Create a Category and Quest, then set the title and start/completion behavior under Info. Objectives contains the task; Rewards contains the payout. Follow the current quest guide for accepting and completing it. Continue with the [current guide](#core/quest-system) for saving and applying it.

![Find quest authoring.](assets/media/guides/drm-031-forge1201/quest-info.png "DRM 0.3.1 / Forge 1.20.1. This is the related feature in the current production build, not a capture of the historical UI described below.")

## Release Scope

0.1.4 added tools for quests, player stats, custom items, teleporters and popups. Conversations and shops could be connected to quest rewards and travel destinations.

## New Authoring Systems

| System | What 0.1.4 Adds |
| --- | --- |
| Quest | Quest packs, chapters/categories, objectives, rewards, prerequisites, repeat/completion rules, `After Complete`, and the `U` journal. |
| Stat Builder | Custom stat sets, point costs, attribute effects, active-set selection, `Y` allocation UI, and `Go Stat Builder`. |
| Item Editor | DRM database items, categories, rarities, tooltips, requirements, bonuses, attributes, and scaling. |
| Faction | CustomNPCs faction presentation, ordering, state styles, and a player overview. |
| Teleporter | Categories, destinations, conditions, commands, fades, sounds, and NPC binding. |
| Popup | Reusable popup definitions, conflict/timing policy, GUI layout, command/script invocation. |
| Admin | Player-scoped DRM/FTB quest, advancement, faction, tag, and stored-data tools. |

## Important Behavior Changes

- CustomNPCs is now a required client-and-server dependency.
- Item stat requirements no longer reject equipment. When unmet, `Unmet penalty %` removes that percentage of the item's configured stat/attribute/scaling contribution.
- Quest event actions are intentionally limited to `After Complete`. They run once after rewards succeed and the quest becomes completed.
- The texture picker uses explicit selection plus `Apply`; paging or filtering does not write to the target.
- Valid companion `texture.png.mcmeta` animation metadata is transferred with custom PNG assets.
- Shared editor shortcuts use `Ctrl+S`, `Ctrl+Z`, and `Ctrl+Y`/`Ctrl+Shift+Z` where the editor supports undo history.

## Upgrade Checklist

1. Back up `config/dochi_rpg_maker`.
2. Install 0.1.4 and matching CustomNPCs on the server and every client.
3. Start once and review the new default GUI, quest, stat, item, teleporter, and popup templates.
4. Keep production content under custom IDs; start from protected defaults with `Save As`.
5. Review HUD overlap if Iron's Spells, Combat Roll, or CustomNPCs data gauges are enabled.
6. Test quest reward delivery and `After Complete` actions on a staging player before production use.

:::warning Default Data
Bundled defaults are reference templates and may be refreshed by the installed version. Do not treat a `default_*` or sample file as the only copy of production work.
:::

---
title: DNPC template spawning
slug: spawn-control-npc-templates
order: 838
description: Default entities versus exact clones, natural rules and placed sources.
product: dochi-spawn-control
category: DNPC template spawning
section: editor
status: Guide
version: 0.1.4
audience: Creators / server operators
---

## Default NPC versus saved NPC

Selecting Entity `dochi_npc:npc` creates a default NPC. To reuse authored appearance, equipment and behavior, first create a [DNPC v3 clone template](#dochi-npc-core/npc-core-templates).

DRM and DNPC remain optional to Spawn Control. This integration needs the public template API and its provider; ordinary spawning works without them.

## Natural rules — 1.20.1 / 1.21.1

1. Save edits to the DNPC, then **save as clone template**.
2. Search the Spawn Control catalog for **NPC clone: name** or `dochi_npc:actor/filename`.
3. Check the model/equipment preview and choose **Add Rule**.
4. Set biome, time, placement and population limits, then save.
5. Check actual appearance, equipment and the per-template population cap.

Default EntityTypes and templates have separate accounting. The EntityType-wide native-spawn toggle does not apply to a template. This natural-template path was checked on the COMMON three targets; it does not establish equivalent 26.3 coverage.

## Placed spawners — older targets and 26.3

1. Add a source in `Spawner Editor`.
2. Choose **NPC clone template**.
3. Select a file from the server list.
4. Set its weight and spawning conditions, then save the JSON.
5. Apply that JSON to the placed spawner and check spawning and replacement after death.

Saving a document does not bind a world spawner. See [placed spawner setup](#dochi-spawn-control/dochi-spawn-control-spawner).

## Creation and troubleshooting

Clones receive a new UUID without rerolling copied equipment. Before insertion, Spawn Control disables DNPC's own respawn and sets home to the accepted spawn position.

- Missing v2 template: load it onto an NPC and save a new v3 clone template.
- Missing template: check server files, provider and API readiness; preserve filename case.
- Failed source: no blank NPC fallback occurs; other ordinary rules keep working.
- Old equipment after editing a file: use the consuming editor/server's reload and reapply workflow to rebuild prepared state.

Reference identifiers are `NPC_TEMPLATE` / `npcTemplateId` for natural rules and `npc_template` / `source.npcTemplateId` for placed spawners. An example source ID is `dochi_npc:actor/guard`. CustomNPCs clone sources are excluded on 26.3.

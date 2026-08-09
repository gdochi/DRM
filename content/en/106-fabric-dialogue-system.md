---
title: Dialogue System
slug: dialogue-system
order: 70
description: DialogueDocument structure, dialogue set storage, and NPC runtime behavior.
product: core-fabric
category: Core Systems
section: dialogue-editor
status: Stable
version: 0.1.6
audience: Dialogue creators
tags:
  - dialogue
  - npc
---

## DialogueDocument Structure

Dialogue is read as one `DialogueDocument`. When saved to files, a dialogue set folder contains both `dialogue_set.json` and per-node JSON files.

| Field | Meaning |
| --- | --- |
| `version` | Current default is `1`. |
| `dialogueScript` | Marks the file as a DRM dialogue document. |
| `globals` | Compatibility flags such as FTB, GeckoLib, and shopScript. |
| `dialogueDefaultGui` | GUI reference used by dialogue runtime. |
| `setRegistry` | Dialogue set names. Default is `default_set`. |
| `nodes` | Object keyed by node name. |
| `current` | Current or starting node. |
| `selectedSetScope` | Editor-side selected set scope. |

## Nodes And Choices

| Unit | Field | Description |
| --- | --- | --- |
| Start node | `type: "start"` | Evaluates conditional routes when the player opens the NPC. |
| General node | `type: "general"` | Holds NPC text, choices, and node conditions. |
| Route | `routes` | From start nodes, chooses next node, shop, or close. |
| Choice | `choice` | Player-visible choice. Conditions are applied before display. |
| Condition | `conditions` | Decides whether nodes, routes, or choices are available. |
| Action | `actions` | Runs movement, shop open, command execution, or state changes. |

The current runtime uses the `choice` array. Older `choices` arrays are not the active field.

## Runtime Flow

```text
NPC right-click
  -> DialogueStorage.load(npc)
  -> Evaluate start-node routes
  -> Filter current-node choices
  -> Open DialogueRuntimeScreen
  -> Player clicks choice
  -> Execute actions in order
```

`goto`, `go_shop`, and `close` determine navigation. `command`, `tag`, `item`, `faction_score`, `advancement`, `ftb_task`, and `ftb_complete` are server side effects.

## Storage

Saving a `dialogue_set` server JSON produces a folder like this:

```text
config/dochi_rpg_maker/dialogue_sets/my_set/
  dialogue_set.json
  start.json
  dialogue_1.json
  action_examples.json
```

Loading prefers `dialogue_set.json` when present, then composes node files when available. The bundled `default_set` is protected; use `Save As` to create your own set.

## NPC-Stored Values

When dialogue is applied to an NPC, PersistentData stores keys in this family.

| Key Family | Description |
| --- | --- |
| `dochi_rpg_maker.dialogue.json` | Embedded dialogue JSON. |
| `dochi_rpg_maker.dialogue.source.kind` | Server JSON kind, usually `dialogue_set`. |
| `dochi_rpg_maker.dialogue.source.path` | Server JSON path. |
| `dochi_rpg_maker.dialogue.enabled` | Whether dialogue is enabled. |

Runtime loads the server JSON reference first when present. If that fails, it falls back to the embedded NPC JSON.

## 0.1.6 Authoring Workflow

- `Shift+Click` or drag across node rows to select multiple nodes.
- Use `Copy` / `Paste` or `Ctrl+C` / `Ctrl+V` to copy nodes within a set or into a selected `Dialogue Sets` target.
- Paste generates collision-free names, remaps links inside the copied group, keeps external links, and carries Blueprint positions. The start node is normalized so the target set keeps one entry node.
- Drag node, route, choice, condition, and action rows to reorder them.
- `Duplicate` copies the entire dialogue set and Blueprint positions to a new set ID. Wait for the server save acknowledgement before using it at runtime.
- Drag the `Dialogue Sets` sidebar edge to resize it; the width is remembered.

Runtime keeps translated choice labels inside stable configured rows and scrolls only for a genuinely overflowing choice list. Long dialogue bodies paginate every wrapped line. Navigation uses `dialogPageNavX`, `dialogPageNavY`, `dialogPageBtnW`, `dialogPageBtnH`, and `dialogPageBtnGap`, or an explicit `pager` component. The first click during typing reveals the current page; later input changes pages. Default `Dialogue`, `Choice`, and `Close` labels follow client localization.

:::tip Default Sample
The bundled `default_set` starts at node 1, routes to greeting node 2, then branches through nodes 3-5. Clone it when testing new features.
:::

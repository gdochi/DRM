---
title: Data Flow
slug: data-flow
order: 105
description: How GUI, dialogue, shops, conditions, and actions are connected.
product: core
category: Reference & Operations
status: Stable
version: 0.1.x
audience: Creators / operators
tags:
  - data-flow
  - architecture
  - json
---

## Why data flow matters

DRM content rarely ends with one file. Screens, dialogue, shops, conditions, and actions are connected through IDs and paths. When something breaks, first ask **which connection failed**, not only which file exists.

```text
Player / NPC Event
  -> Dialogue or GUI Open
      -> Choice / Button / Product
          -> Condition Check
          -> Action Run
              -> StoredData / Command / Reward
```

## Connection units

| Link | Check | Common issue |
| --- | --- | --- |
| NPC → Dialogue | start dialogue ID | NPC exists but start node is missing |
| Dialogue → GUI | GUI file path | GUI JSON points to another world path |
| Choice → Condition | condition ID and parameter | condition is always false |
| Choice → Action | execution order | GUI closes before reward action runs |
| Shop → GUI | shop screen type | dialogue GUI is reused for shop |

## Operation tips

- Separate `test_` and `dev_` files before deployment.
- Avoid renaming published IDs casually.
- Keep backups per content unit for incident response.

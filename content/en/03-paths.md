---
title: Paths and Folders
slug: paths
order: 40
description: Where DRM data lives and how paths are usually organized.
product: core
category: Getting Started
status: Stable
version: 0.1.x
audience: Creators / operators
tags:
  - paths
  - files
---

## Common paths

| Data | Path |
| --- | --- |
| Scripts | `minecraft/customnpcs/scripts/ecmascript` |
| GUI JSON | `minecraft/customnpcs/dc_data/dc_gui` |
| Dialogue JSON | `minecraft/customnpcs/dc_data/dc_dialogues` |
| Shop JSON | `minecraft/customnpcs/dc_data/dc_shops` |
| HTML GUI | `minecraft/saves/<world>/customnpcs/scripts/ecmascript/html` |

Keep file names stable after deployment because other JSON files may reference them.

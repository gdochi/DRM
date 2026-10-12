---
title: Server AI and Combat Support
slug: warfare-server-ai-missions
order: 385
description: Separate NPC and vehicle AI policies and use DWE support timelines.
product: dochi-warfare
category: World Tools
section: tools
status: Draft
version: Forge 0.3.0 / NeoForge 0.2.9
audience: Server operators and map makers
tags:
  - server
  - ai
  - missions
---

## Server-wide AI controls

Version 0.2.9 separates optional server AI systems from each NPC's saved configuration. Operators can allow or disable DW idle movement, custom targeting, advanced rules, hearing, awareness, combat memory, tactical movement, cover, suppression fire, grenades, faction assistance, and booby traps. Vehicle AI and mercenary AI have independent global switches.

The server owns the settings and synchronizes them to clients. Editing requires operator permission level 2. A disabled feature remains saved on the NPC but does not run until the server allows it again. Disabling mercenary AI does not pause or erase contract time.

Settings are stored at:

```text
config/dochi_warfare/server-ai.json
```

## Vehicle policy and combat support

On Forge 0.3.0, DWE owns global vehicle AI at `config/dochi_warfare/vehicle_ai/server-ai.json`. It suspends vehicle behavior separately from NPC policy while preserving per-vehicle settings.

Author bombing, gun support, vehicle reinforcements, and NPC movement in the [DWE timeline](#dochi-warfare-expanded/expanded-support-timeline), then invoke `/dw callgimmicks <name> [x y z]`. The previously documented Mission Core Planner and `/dw planner` could not be found in current sources and are excluded from current authoring instructions.

---
title: Server AI Controls and Mission Planner
slug: warfare-server-ai-missions
order: 385
description: Configure 0.2.7 server-wide AI feature gates and redstone-controlled vehicle missions.
product: dochi-warfare
category: World Tools
section: tools
status: Draft
version: 0.2.7
audience: Server operators and map makers
tags:
  - server
  - ai
  - missions
---

## Server-wide AI controls

Version 0.2.7 separates optional server AI systems from each NPC's saved configuration. Operators can allow or disable DW idle movement, custom targeting, advanced rules, hearing, awareness, combat memory, tactical movement, cover, suppression fire, grenades, faction assistance, and booby traps. Vehicle AI and mercenary AI have independent global switches.

The server owns the settings and synchronizes them to clients. Editing requires operator permission level 2. A disabled feature remains saved on the NPC but does not run until the server allows it again. Disabling mercenary AI does not pause or erase contract time.

Settings are stored at:

```text
config/dochi_warfare/server-ai.json
```

## Mission Core Planner

`Mission Core Planner` is a redstone-controlled block for vehicle missions. Configure its radius, automatic vehicle classification, CustomNPCs faction, Mission ID, target position, controller UUID, health, and controlled vehicle list.

When powered, the planner selects matching loaded vehicles in range and issues an Area Mission. When power is removed, its settings change, or the block is destroyed, it cancels only missions owned by that planner. The controller UUID is stored with vehicle mission state so cancellation remains valid after reloads.

## Commands

Version 0.2.7 uses the `/dw` command root:

```text
/dw planner configure
/dw planner status
/dw planner cancel
/dw planner damage
/dw planner repair
```

Vehicle AI and other operator commands also live below `/dw`. Permission level 2 is required.

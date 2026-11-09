---
title: Server AI and Combat Support
slug: warfare-server-ai-missions
order: 385
description: Separate NPC and vehicle AI policies and use DWE support timelines.
product: dochi-warfare
category: World Tools
section: tools
status: Draft
version: 0.3.1
audience: Server operators and map makers
tags:
  - server
  - ai
  - missions
---

## If an NPC's enabled AI still does nothing

A server policy can block a feature enabled on an individual NPC. Open **Minecraft Mods → Dochi’s Warfare → Config → DW Server AI** to check the server-wide permission. This is separate from the Senses or Cover page opened by right-clicking an NPC. Saving changes requires server permission level two.

![Server AI policy in DW's own Config screen.](assets/media/guides/warfare-031-neo1211/dw-server-ai-policy.png "Actual server policy in DW 0.3.1 / NeoForge 1.21.1. Read the feature’s ON/OFF button, Available status and explanation of OFF together. This instance initially allowed every feature.")

1. Find the blocked feature, such as **Cover AI** or **Hearing / investigation**.
2. Set it ON to allow it on the server.
3. Press **Save** below to submit the policy.
4. Return to the NPC's individual Cover, Senses or other settings and configure its conditions.

**Basic combat preset** restricts the extended AI features together. **Allow all features** removes those global locks. These buttons do not overwrite every NPC's detailed behavior with identical values. Check the current policy before selecting a preset.

## Features that depend on each other

| Server policy | Related behavior |
| --- | --- |
| Combat target memory | Turning it off also prevents Suppression fire, which depends on combat memory. |
| Tactical movement / Cover AI | Global permission still needs per-NPC settings and reachable terrain. |
| Mercenary AI | Contract expiry, ownership protection and hold-fire orders remain. This does not pause contract time. |
| NPC grenade AI / Booby traps | Thrown grenades and placed traps have separate permissions. |

Disabling a feature retains NPC values for reuse when allowed again. The server policy file is `config/dochi_warfare/server-ai.json`.

## Vehicles and support sequences

**DWE 0.3.1** manages vehicle AI's global policy separately. Changing NPC policy does not apply every change to vehicle behavior. Vehicle policy is stored in `config/dochi_warfare/vehicle_ai/server-ai.json`.

Build bombing, strafing, vehicle reinforcements and NPC movement in the [DWE support timeline](#dochi-warfare-expanded/expanded-support-timeline).

![DWE support timeline editor.](assets/media/guides/warfare-expanded-031-neo1211/dwe-gimmick.png "Actual DWE 0.3.1 / NeoForge 1.21.1 editor. Server policy grants permission; the timeline defines the sequence when called. This screenshot alone does not verify an executed bombing run.")

Call a saved support name with `/dw callgimmicks <name> [x y z]`. Follow the linked timeline guide from authoring through world execution.

---
title: 0.2.9 update
slug: release-notes-0-2-9
order: 4
description: Optional NPC integration, clone templates and current fixes.
product: core-fabric
category: 0.2.9 update
section: getting-started
status: Guide
version: 0.2.9
audience: Creators / server operators
---

## Current version

DRM **0.2.9** targets Forge 1.20.1 / Java 17 and Fabric / NeoForge 1.21.1 / Java 21. Separate Fabric / NeoForge 26.3 builds use Java 25. See the [26.3 guide](#core-fabric/minecraft-26-3) for exclusions and verification limits.

CustomNPCs and DNPC are optional integrations. Basic authoring tools do not require either NPC mod; provider-specific features need their provider. CustomNPCs is permanently excluded from 26.3 onward. That target uses the optional DNPC actor/provider API.

## Changes you can use

- **DNPC clone templates:** Core exposes a public template provider API. Save a v3 NPC clone template in DNPC, then choose it in Spawn Control. See [creating templates](#dochi-npc-core/npc-core-templates).
- **Models without CustomNPCs:** the older three targets fix CustomNPCs class loading when DNPC or generic entities have active animation/model profiles. If you already use 0.2.9, replace it with a build containing this correction and restart Minecraft.
- **Creative tools:** on 1.20.1 / 1.21.1, DRM registers its own public tools in the installed NPC providers' tabs, without duplicating them when both providers are installed.
- **Trainer history deletion:** compatible Cobblemon Editor builds on Fabric / NeoForge 1.21.1 expose full battle-record deletion in Admin. This differs from a count reset and removes pending rewards and reward markers. Read the [Admin guide](#core-fabric/drm-administration).

Older cores without the template capability retain their other features. Ecosystem mods do not need matching version numbers.

## Update

1. Back up server configuration and the world together.
2. Install matching Minecraft/loader builds on the server and every client, replacing the old file.
3. Check each addon's declared Core requirements.
4. Open existing dialogue, shop and quest files; check saving and NPC Apply separately. Customize default templates with `Save As`.

Some fixes retain the same version number. A filename alone does not establish that a fix is present. Versions here identify **local production builds checked on 2026-10-28**, not public upload availability. Historical [0.2.8 notes](#core/release-notes-0-2-8) remain available.

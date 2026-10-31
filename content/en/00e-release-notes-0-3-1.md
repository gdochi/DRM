---
title: 0.3.1 Update
slug: release-notes-0-3-1
order: 3
description: Independent dialogue text boxes, DNPC movement integration and current installation.
product: core
category: Updates
section: getting-started
status: Guide
version: 0.3.1
audience: Creators / server operators
---

## Current installation

DRM **0.3.1** has Forge 1.20.1 / Java 17, Fabric and NeoForge 1.21.1 / Java 21, and separate Fabric and NeoForge 26.3 / Java 25 builds. Match Minecraft, loader and the actual patch on server and clients. This guide follows **local sources and production JARs checked on 2026-10-31**.

DRM and DNPC remain optional to one another. Check each addon's own requirements; ecosystem version numbers do not have to match. CustomNPCs is permanently excluded from 26.3. See the [26.3 scope](#core-fabric/minecraft-26-3).

## Independent dialogue text boxes

The feature introduced in 0.3.0 is included. In the creator-facing GUI Maker, a **dialogue GUI** can contain several text boxes independently of the main dialogue and speaker components.

1. Open a dialogue layout and add **Text**.
2. Set **Content** to **Direct input** or **NPC name**.
3. Edit position, size, fill and border. Switching to NPC name preserves the manually entered text.
4. Use **Save As** for a custom copy of a protected default layout.
5. Link that GUI from the dialogue document and test the player-facing dialogue screen.

NPC names come from the current dialogue target and refresh when it is renamed. A missing target produces an empty runtime name; the editor sample is preview content. Existing dialogue and speaker components remain available.

JSON reference: a normal `text` element stores `textSource: literal` or `textSource: npc_name`. Missing or unknown values use literal text.

## DNPC and addon integration

- **Trainer movement:** the existing 1.20.1 / 1.21.1 actor-control API can temporarily permit movement. Compatible DNPC and Cobblemon Editor patches let trainers dash and return while position locking is enabled. Ordinary external control does not automatically unlock the NPC.
- **Dialogue outcomes and validation:** Fabric and NeoForge 1.21.1 expose completion, cancellation, ESC and no-choice closure to addons and validate addon settings before saving. This supports Cobblemon's [Sequential actions](#drm-cobblemon-editor/cobblemon-trainer-editor).
- **Existing features:** optional NPC models, [v3 templates](#dochi-npc-core/npc-core-templates) and Admin trainer-record deletion continue from the [0.2.9 notes](#core/release-notes-0-2-9).

For the current combined trainer workflow, replace DRM, DNPC and Cobblemon Editor with the corresponding loader's current patches. This describes the checked feature combination, not a new assertion that every older Core is incompatible.

## Update and verify

Back up configuration and the world, replace the previous JAR, then check dialogue, shops, quests and the addons you use. Saving a file and applying it to an NPC remain separate actions. Match the actual patch files even when their version numbers are identical.

The 0.3.1 version update preserved 0.3.0 runtime classes and resources. Earlier text-box runtime checks and later integration checks have distinct scopes; a version change alone does not establish complete gameplay retesting. Existing 26.3 migration and full-port verification limits still apply.

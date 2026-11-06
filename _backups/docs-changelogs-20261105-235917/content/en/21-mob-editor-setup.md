---
title: Installation and NPC preparation
slug: mob-editor-setup
order: 220
description: Prepare matching mods, a test NPC, and the correct save/apply workflow.
product: mob-editor
section: start
category: BattleWorks
status: Guide
version: 0.1.6
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## 1. Prepare the practice installation

This is the combination used for the captured screens and first-attack test. Install **BattleWorks, DRM and an NPC mod**. For other Minecraft/loader files, see [installation choices](#mob-editor/battleworks-update-0-1-6).

| Component | This exercise |
| --- | --- |
| Minecraft / loader | 1.21.1 / NeoForge |
| Java | 21 |
| BattleWorks | 0.1.6 |
| DRM | 0.3.1 |
| NPC | DNPC 0.1.3 |

Install their matching dependencies in the same instance. This table records a tested combination; check the selected files' Minecraft, loader and requirements before replacing an existing compatible installation. Match server and client installations too.

Supported CustomNPCs actors are also available on Forge 1.20.1 and Fabric/NeoForge 1.21.1. **Use the DNPC workflow on 26.3 and later**; CustomNPCs is excluded there.

## 2. Create a practice DNPC

1. Follow [creating a DNPC](#dochi-npc-core/npc-core-setup) in Creative to place one NPC.
2. Give it a recognizable name and start with a normal player model.
3. Prepare flat ground without other NPCs or mobs nearby.
4. This exercise uses BattleWorks **Scan Without Target** to find the player. Avoid assigning work or another combat controller to the same NPC during the exercise.
5. Author in Creative and test attacks in Survival.

![Preparing the actor in DNPC's Identity screen.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "DNPC 0.1.3 / NeoForge 1.21.1. The BattleWorks file will be attached to this actor. Appearance and equipment are separate from BattleWorks damage and hitboxes.")

A held sword helps communicate the attack. The exercise sets damage in the BattleWorks Hitbox rather than relying on the item's attack damage. Raising NPC health can wait until the boss exercise.

## 3. Open BattleWorks for the NPC

Select the practice NPC with the DRM Core and open its BattleWorks editor. Load an existing combat file or choose **Create New**, then continue with [your first melee attack](#mob-editor/battleworks-first-attack).

The NPC's file-application category is **Battlework JSON**. If you started authoring without an NPC, save the file, select it in that NPC's catalog and press **Apply Battlework**. For another model, configure DNPC appearance and its [animation connection](#mob-editor/battleworks-animation) first.

## 4. Add integrations when the feature needs them

| Goal | Additional preparation |
| --- | --- |
| Basic arm swing and hitbox | Start with the tested installation above |
| Better Combat motion | Compatible Better Combat, the motion and a supported weapon |
| Gecko clips | Model, texture and animation assets plus their provider |
| Player Animator clips | Compatible provider and actual clips |
| Other mods' spells/skills | The mod, dependencies and registered skill |
| Custom sounds/textures | A mod or resource pack providing their IDs |

Verify the basic attack first, then add motions or skills so file-application failures remain easy to distinguish from missing external assets.

## 5. Understand Save, Save As, Load, and Apply

| Operation | Result | Next step |
| --- | --- | --- |
| Load | Opens a server file in the editor | Edit, save, or apply it |
| Save As | Writes JSON at the chosen path | Bind the NPC to the new path |
| Save with an NPC selected | Saves the document and binds that NPC | Test combat |
| Save without an NPC, loaded file | Updates that file | Check the intended NPC's binding |
| Save without an NPC, new document | Opens the filename prompt | Save, then apply to an NPC |
| NPC catalog Apply | Binds the selected server file path | Test combat |

Enter `training/first_sword.json` in Save As. The resulting path is:

```text
config/dochi_rpg_maker/mobs/patterns/training/first_sword.json
```

Do not enter the full config path or a Windows drive path into the relative-path field.

Bundled defaults are protected templates. Use **Save As** for a working copy. If the editor has an NPC attached, pressing **Save after Save As** binds that NPC to the new file.

## 6. Verify the saved result

1. Resolve any validation or server save error.
2. Refresh Load and reopen the working file.
3. Apply it through the NPC catalog, or Save with that NPC attached.
4. Test as a Survival player.

When connected to a remote server, files are saved in the **server's config directory**. A copy in your separate single-player directory will not appear on that server.

NPCs now reference files instead of storing full JSON copies. Use separate Save As paths when different NPCs need different encounters. Continue with [your first attack](#mob-editor/battleworks-first-attack).

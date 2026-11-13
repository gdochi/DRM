---
title: Installation and NPC preparation
slug: mob-editor-setup
order: 220
description: Prepare matching mods, a test NPC, and the correct save/apply workflow.
product: mob-editor
section: start
category: BattleWorks
status: Guide
version: 0.1.7
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## 1. Prepare matching files

Use BattleWorks **0.1.7** for your exact Minecraft version and loader. Keep client and server installations compatible and install each selected file's declared dependencies.

| Minecraft | BattleWorks loader | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric or NeoForge | 21 |
| 26.3 | Fabric or NeoForge | 25 |

**DRM is optional**, including for standalone editor access. DNPC supplies the NPC actor for this exercise. Only add DRM, external animation libraries, spell mods or model providers when your encounter uses their features; their resources are separate from the combat JSON.

CustomNPCs is an optional actor integration on Forge 1.20.1 and Fabric / NeoForge 1.21.1. It is excluded on 26.3 and later; use DNPC there. Existing 0.1.6 screenshots and videos below retain their original capture labels.

## 2. Create a practice DNPC

1. Follow [creating a DNPC](#dochi-npc-core/npc-core-setup) in Creative to place one NPC.
2. Give it a recognizable name and start with a normal player model.
3. Prepare flat ground without other NPCs or mobs nearby.
4. This exercise uses BattleWorks **Scan Without Target** to find the player. Avoid assigning work or another combat controller to the same NPC during the exercise.
5. Author in Creative and test attacks in Survival.

![Preparing the actor in DNPC's Identity screen.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "DNPC 0.1.3 / NeoForge 1.21.1. The BattleWorks file will be attached to this actor. Appearance and equipment are separate from BattleWorks damage and hitboxes.")

A held sword helps communicate the attack. The exercise sets damage in the BattleWorks Hitbox rather than relying on the item's attack damage. Raising NPC health can wait until the boss exercise.

## 3. Open BattleWorks for the NPC

1. In Creative, find the **BattleWorks Wand** in BattleWorks' standalone Creative Tab. It also appears in DNPC's tab when that tab is available.
2. Use the wand on your supported NPC to open its editor selector. Use it in the air to author without an attached NPC. The editor command is `/battleworks editor`; server permissions still apply.
3. Choose BattleWorks, then **Load Existing**, **Use Default**, or **Create New**. Defaults are templates; save a working copy.
4. Start with [Simple edit and recipes](#mob-editor/battleworks-authoring), or continue with [your first melee attack](#mob-editor/battleworks-first-attack).

With DRM installed, its Core remains another entry point. The NPC application category is **Battlework JSON**. For a file created without an NPC, select that file in the actor's catalog and press **Apply Battlework**. Prepare a different model through its own appearance settings and [animation connection](#mob-editor/battleworks-animation).

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

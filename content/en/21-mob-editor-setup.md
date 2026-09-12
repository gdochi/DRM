---
title: Installation and NPC preparation
slug: mob-editor-setup
order: 220
description: Prepare matching mods, a test NPC, and the correct save/apply workflow.
product: mob-editor
section: start
category: BattleWorks
status: Guide
version: 0.1.3
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## 1. Prepare a matching installation

| Component | This guide |
| --- | --- |
| Minecraft | Java Edition 1.20.1 |
| Loader | Forge 47 series for Minecraft 1.20.1 |
| Java | 17 |
| BattleWorks | 0.1.3 |
| Dochi RPG Maker / DRM | Forge 1.20.1, 0.1.7 or newer; required |
| CustomNPCs | Compatible Forge 1.20.1 build; required |

1. Put the required mods and their dependencies in the selected instance's mods folder.
2. Check that an older BattleWorks or Mob Editor JAR is not installed alongside the new one. The current mod ID is `dochi_battleworks`.
3. Launch and verify that the mods loaded.
4. On multiplayer servers, match BattleWorks and DRM on server and clients. Install the providers and resources needed by the encounter too.

This guide targets the Forge source. Do not infer the requirements of a separate NeoForge build from this table.

## 2. Add optional integrations when needed

| Feature | Additional preparation |
| --- | --- |
| Basic humanoid swing and physical hitbox | Start with the required installation above. |
| Better Combat weapon motion | Compatible Better Combat, dependencies, and supported weapon |
| Gecko model clips | DRM NPC Basic model, texture, animation file, and provider |
| Player Animator motion | Compatible provider and real clips |
| Iron's Spellbooks, Cataclysm, Mowzie skills | Provider mod, dependencies, and a skill exposed in the installed catalog |
| Custom sounds and textures | The mod or resource pack supplying the real IDs |

The [first attack](#mob-editor/battleworks-first-attack) uses no optional magic or animation provider.

## 3. Prepare a practice NPC

1. In Creative mode, create a normal humanoid CustomNPC.
2. Give it a recognizable name and approximately 100 maximum health for testing.
3. Equip a sword. BattleWorks hitbox damage will be configured separately.
4. Configure CustomNPCs factions and targeting so a Survival player is hostile.
5. Use a flat practice area without other NPCs or villagers.

Completion check: you can find the NPC and confirm its stats, equipment, and hostile-target settings.

## 4. Open the editor with that NPC selected

1. Find DRM's **Dochi RPG Maker Core** item in the Creative inventory.
2. Right-click the practice NPC with Core.
3. Select **BattleWorks** and confirm the intended target.
4. If changing the model, configure it in **NPC Basic** before choosing combat clips.

Using Core in the air also allows file authoring without an NPC. Saving from that detached editor does not automatically select a world NPC. Particle Maker can be used independently too.

Author in Creative mode. Close the editor and use Survival mode for combat: Creative and Spectator players are excluded as combat targets.

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

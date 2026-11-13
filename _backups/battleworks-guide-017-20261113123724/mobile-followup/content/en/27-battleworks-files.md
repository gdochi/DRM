---
title: Files, backups, samples, and upgrades
slug: battleworks-files
order: 280
description: Use server paths correctly and package every referenced resource.
product: mob-editor
section: reference
category: BattleWorks
status: Guide
version: 0.1.7
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## 1. Find the correct directory

Paths are relative to the active Minecraft instance or dedicated server.

| Path | Contents |
| --- | --- |
| `config/dochi_rpg_maker/mobs/patterns/` | Combat JSON |
| `config/dochi_rpg_maker/mobs/animations/` | DRM model animation assets |
| `config/dochi_rpg_maker/mobs/geometry/` | DRM geometry assets |
| `config/dochi_rpg_maker/particles/` | Separate Particle Maker files |
| `config/dochi_rpg_maker/settings/battleworks_client.json` | Local editor/presentation preferences |
| `config/dochi_rpg_maker/settings/battleworks_global_rules.json` | Shared combat flags |

Use **mobs/patterns**, not the older mobs/*.json location. Geometry and animation JSON are not combat documents.

## 2. Organize working files

```text
config/dochi_rpg_maker/
  mobs/
    patterns/
      training/
        first_sword.json
      bosses/
        training_captain.json
    animations/
    geometry/
  particles/
    training_ring.json
```

Enter paths such as bosses/training_captain.json relative to patterns. Avoid absolute paths, drive prefixes, parent traversal, and empty segments.

Use letters, digits, underscores, hyphens, and subfolders for particle filenames. Omit .json only in the particle command, not stored references.

## 3. NPCs reference shared files

NPC NBT stores a combat path and small flags instead of a full JSON copy.

1. Applying one file to several NPCs shares the design.
2. Use Save As for NPCs that need different designs.
3. Move referenced JSON alongside a transferred world or clone.
4. Include particle, model, sound, popup, and provider dependencies.

Load opens the file. Apply binds it. See [save/apply behavior](#mob-editor/mob-editor-setup).

![The combat file saved on the server and bound to a DNPC.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. The title abbreviates the path; the verified file is config/dochi_rpg_maker/mobs/patterns/training/first_sword.json. Transfer this file with the NPC to another server.")

## 4. Refresh external edits

1. Back up the JSON.
2. Edit and save externally.
3. Check strict JSON syntax.
4. Refresh the editor catalog and reopen the file.
5. **Reapply to the NPC or restart the server**.
6. Verify the changed behavior.

Combat reads cached data instead of polling disk every tick. Catalog Refresh alone does not prove the live NPC refreshed. Particle files have a separate cache and save path.

## 5. Practice files included with these docs

| File | Folder | Preparation |
| --- | --- | --- |
| [first_sword.json](./assets/media/battleworks/first_sword.json) | `mobs/patterns/training/` | Saved, applied and damage-tested with BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1 |
| [training_swordsman.json](./assets/media/battleworks/training_swordsman.json) | mobs/patterns/training/ | Normal humanoid DNPC or supported legacy actor; fallback scanning enabled |
| [training_ring.json](./assets/media/battleworks/training_ring.json) | particles/ | Particle Maker or the particle command |

If the browser opens JSON, save it as a file. Check that it did not become .json.txt. The combat sample uses a basic swing and vanilla sound without a saved model settings. The particle sample uses a vanilla particle.

## 6. Separate training packs and Jar Fist

The 30-file training pack is maintained under source examples/training-pack/mobs/patterns. It is **not bundled or automatically installed at startup**. Copy it only if you actually obtained the pack.

Names such as 1_sword.json, 1_tutorial.json, and 2_tutorial_irons.json describe difficulty/integration. Read each file's authoring.requiredMods and authoring.steps. Even a physical training sample can require Better Combat clips.

| Jar Fist sample | Purpose |
| --- | --- |
| battleworks_sample_jar_fist_preview.json | Combat disabled, zero-damage preview |
| battleworks_sample_jar_fist_combat.json | Pursuit, attacks, and retreat testing |

Where supplied in the JAR's samples resources, copy these to patterns before loading. Jar Fist model, textures, and animation assets are separate. The intended clips include ready_to_fight, sword_attack, sword_attack2, and roll; other models need compatible replacements.

Bundled starter templates and separately distributed bosses, music, and popups are different packages. Updating the mod does not install all external encounter materials.

## 7. Upgrade carefully

1. Back up the world and config before replacing JARs.
2. Install BattleWorks 0.1.7 for the correct Minecraft/loader; remove duplicate old BattleWorks or Mob Editor JARs.
3. DRM is optional. When using its features, check the actual DRM and provider dependencies for that environment.
4. Reopen the combat file and check NPC binding, models, skills and audio.
5. Reapply and test actual combat, cleanup and restart persistence.

Recognized old combat files may migrate from mobs into patterns, with original bytes backed up under config/dochi_rpg_maker/backups/battleworks-mobs-patterns-v1. Conflicts and unknown/model JSON are preserved. Reapply explicitly after reorganizing; ambiguous filenames cannot be recovered reliably.

The mod ID remains dochi_battleworks. Old model conversion does not supply an absent model provider. CustomNPCs-dependent actors and assets belong only to supported older targets and cannot be used as a native 26.3 integration.

## 8. Package an encounter

Include combat JSON, particle JSON, models, sounds, popup/GUI files, clones, and required mod versions. Test Load and Apply on a fresh NPC in the destination environment.

Continue with [JSON reference](#mob-editor/battleworks-json-reference) or [troubleshooting](#mob-editor/battleworks-troubleshooting).

## Personal technique library

**Save technique** stores a reusable bundle for your player on the current server. Its server-side directory is `config/dochi_rpg_maker/battleworks/pattern_library/<UUID>/`. The limit is 128 valid entries per player. This path remains under dochi_rpg_maker even without DRM.

Use **My techniques → Load technique** to import into another combat document. Imports use new IDs for patterns and linked resources. Referenced server particle files can be embedded; external models, sounds, skills and their mods are separate dependencies. Copying only the NPC's combat JSON does not transfer the personal library. See [recipe and copy workflow](#mob-editor/battleworks-authoring).

Undo restores the document, not an already saved library entry. Keep backups of both server combat files and the library when moving servers.

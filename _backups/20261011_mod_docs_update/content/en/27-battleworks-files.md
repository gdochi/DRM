---
title: Files, backups, samples, and upgrades
slug: battleworks-files
order: 280
description: Use server paths correctly and package every referenced resource.
product: mob-editor
section: reference
category: BattleWorks
status: Guide
version: 0.1.3
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
| [training_swordsman.json](./assets/media/battleworks/training_swordsman.json) | mobs/patterns/training/ | Normal humanoid NPC with a hostile CustomNPCs target |
| [training_ring.json](./assets/media/battleworks/training_ring.json) | particles/ | Particle Maker or the particle command |

If the browser opens JSON, save it as a file. Check that it did not become .json.txt. The combat sample uses a basic swing and vanilla sound without a model snapshot. The particle sample uses a vanilla particle.

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

1. Stop game/server and back up config and world.
2. Replace old JARs without leaving duplicate BattleWorks/Mob Editor versions.
3. Ensure DRM 0.1.7 or newer for BattleWorks 0.1.3.
4. Check catalogs and NPC bindings.
5. Recheck models, skills, audio, and combat.

Recognized old combat files may migrate from mobs into patterns, with original bytes backed up under config/dochi_rpg_maker/backups/battleworks-mobs-patterns-v1. Conflicts and unknown/model JSON are preserved.

Moved-reference recovery can repair uniquely identifiable files; do not rely on it to choose among ambiguous names. Reapply explicitly after reorganizing.

The current mod ID is dochi_battleworks, not drm_addon_mob_editor. Legacy CNPC-Gecko model-NBT conversion does not replace the original addon's entity types or resources; worlds depending on them may still require that addon.

## 8. Package an encounter

Include combat JSON, particle JSON, models, sounds, popup/GUI files, clones, and required mod versions. Test Load and Apply on a fresh NPC in the destination environment.

Continue with [JSON reference](#mob-editor/battleworks-json-reference) or [troubleshooting](#mob-editor/battleworks-troubleshooting).

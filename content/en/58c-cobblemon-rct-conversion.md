---
title: Convert RCT Trainers to DNPC
slug: cobblemon-rct-conversion
order: 582
product: drm-cobblemon-editor
section: trainer
category: Trainer Conversion
status: Usage guide
version: Fabric / NeoForge 0.2.9
description: Choose original RCT or DRM AI and distinguish creation, replacement and profile export.
---

## What does conversion do?
Cobblemon Editor 0.2.9 reads the server's active **Radical Cobblemon Trainers** data and converts it to DNPC trainers or editable profiles. RCT is optional for ordinary trainer creation. Keeping its original battle AI requires a compatible RCT API; creating or replacing DNPC entities also requires DNPC.

## Open the conversion screen
1. Open DRM **Add-on → Cobblemon Editor**.
2. Press **Port Radical Trainers** to open **Radical Trainer Porting**.
3. Search by name or ID and check the trainers to convert. The list uses active server datapacks and supports paging.
4. Choose **Battle AI** and **Conversion target** before converting. Start with one trainer so the result is easy to compare.

## Choose battle AI
| Choice | Result |
| --- | --- |
| **Keep original RCT AI** | Keeps the original RCT AI, item bag and battle rules. This is the default. |
| **Convert to DRM AI** | Uses the imported party and items with DRM AI decisions and policies. |

Preserved RCT behavior is separate from DRM Strategy's item and gimmick policies. See [battle AI and items](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items).

## Choose creation, replacement or files
| **Conversion target** | Use |
| --- | --- |
| **Create DNPC trainers** | Creates nearby DNPC trainers with default DNPC skins, up to 64 per operation. |
| **Replace matching RCT NPCs within 64 blocks** | Replaces RCT NPCs within 64 blocks whose trainer IDs match the selection. Skips NPCs in battle and other ineligible actors. |
| **Save trainer profiles only** | Saves profile JSON without creating or replacing entities. |

Profiles are saved under **config/dochi_rpg_maker/cobblemon/trainers/radical_ported/**. Before replacing an existing NPC, its original entity type, dimension and NBT are saved under **config/dochi_rpg_maker/cobblemon/rct_conversion_backups/**. This is an original-state record, not an automatic undo UI.

## Check the result
Check successful and failed counts, then inspect the new NPC's name, party, held items and AI mode. Set its skin and appearance in the [NPC editor](#dochi-npc-core/npc-core-editor). For profile-only export, continue with NPC Apply in [first trainer setup](#drm-cobblemon-editor/cobblemon-editor-setup).

If a trainer is missing, check active server datapacks. If keeping RCT AI is rejected, install a compatible RCT API or choose DRM conversion. These steps are source-checked; the recording environment had no RCT, so this page does not include a completed RCT conversion video.

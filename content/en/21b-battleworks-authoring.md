---
title: Simple editing, recipes, and reusable techniques
slug: battleworks-authoring
order: 227
description: Build a ready-to-edit attack, tune it, and reuse an independent technique.
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

## 1. Start with a recipe

Open BattleWorks with the [wand or editor command](#mob-editor/mob-editor-setup). In **Pattern Workbench**, choose **Attack recipes**, then select a starting attack.

| Recipe | Starting behavior |
| --- | --- |
| Wide sweep | A melee sweep with a linked ground warning and native swing |
| Charge and slash | Approach during preparation, stop, then slash |
| Delayed ground strike | Save the target's position, warn there, then hit that saved position |
| Retreat and counter | Step back during preparation and counter with a forward hitbox |

Recipes add editable patterns and resources. They do not install external spells or models. A model-incompatible animation is omitted; choose a compatible clip for your actor. The delayed ground strike intentionally attacks the saved position, so a moving player can escape it.

## 2. Tune the attack in Simple edit

Select the new pattern and **Simple edit**. Set its name, Enabled, Min/Max Range, Windup, Action, Recovery and Cooldown. Timing fields also show seconds: at normal server speed, 20 ticks are one second.

Choose a linked hitbox to adjust damage and its common size controls. If the attack deals damage through another action, use **Detailed edit** for that action. Switching views preserves existing conditions, events, movement and animation; the simple view does not replace the document with a simpler file.

Check **Shared by … patterns** before editing damage or dimensions. Use **Make this hitbox independent** when only this pattern should change. Then inspect the full geometry and contact tick in [Hitbox Library](#mob-editor/battleworks-hitboxes).

## 3. Save a technique for another document

1. Select the attack and choose **Save technique**.
2. Open another combat document on the same server with the same player.
3. Choose **My techniques**, select an entry, then **Load technique**.
4. Inspect the imported pattern, combo destinations, hitboxes and particles before saving.

The library belongs to your player on that server. Import creates independent resource IDs and reconnects the bundled references. Referenced particle files can be bundled; external mods, models, sounds and skill providers still need to exist in the destination installation. A rejected incompatible import leaves the document unchanged.

## 4. Choose how a duplicate shares resources

| Copy technique choice | Result |
| --- | --- |
| Independent copy | Copies the attack, linked combo patterns, hitboxes and particle effects with new IDs |
| Share existing resources | Copies only the selected pattern; linked resources remain shared |

Use an independent copy when one variant needs different hitbox damage or particles. Sharing is useful when several moves should keep one common definition. Changing shared resources affects every pattern that references them; changing a name alone does not detach them.

## 5. Undo edits, then save and apply

**Undo / Redo** restores document edits and file-loading state. The Back/Forward arrows navigate editor history. Undo does not delete an entry already saved in your server technique library.

Use **Save As** for a new working path. With the intended NPC attached, press **Save** afterward to bind it, or apply the file through that NPC's catalog. See [files and library storage](#mob-editor/battleworks-files).

Use Simulation to inspect the motion and hitbox, then test a real fight in Survival. A visual warning does not deal damage by itself. Configure [linked ground warnings](#mob-editor/battleworks-hitboxes) and [arena reset rules](#mob-editor/battleworks-encounters) before testing the full boss.

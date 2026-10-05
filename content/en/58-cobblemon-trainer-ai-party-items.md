---
title: Trainer AI, parties, and items
slug: cobblemon-trainer-ai-party-items
order: 580
description: AI engines, random parties, and the distinction between general inventory and round battle items.
product: drm-cobblemon-editor
category: Getting Started
section: trainer
status: Stable
version: Fabric 0.2.2 / NeoForge 0.2.1
audience: Creators / Operators
---

## Choosing the AI engine

| Engine | Use |
| --- | --- |
| `DRM Strategy` | DRM tuning, strategy plans, Trainer Items, and trainer gimmick decisions. |
| `RCT` | Optional RCT provider. Requires a compatible RCT API installation. |
| `Cobblemon Strong` | Cobblemon's built-in strong AI. |

DRM Strategy works without RCT. RCT absence or call errors are handled at the addon boundary; they do not make RCT a required dependency. DRM's round item bag and gimmick plan apply to DRM Strategy.

Start with a preset, then change one AI value or strategy at a time and compare using the same party and battle rules. Move selection, switching, and item timing also depend on the current battle state.

## Random Party

Configure party size, level, generations, types, evolution stage, legendary/mythical eligibility, duplicate species, Shiny chance, IV/EV settings, and automatic nature/ability/move choices. Candidates come from the installed Cobblemon registry. Relax filters if there are too few candidates.

A fixed seed is reproducible within the same mod/datapack/registry setup. Changing available species can change the result.

## Trainer Items

The round's virtual battle bag holds up to 16 item types, each with quantity 1–99. It is recreated for each battle and uses DRM Strategy; it does not remove items from the NPC's physical inventory.

Use recovery, status cure, revival, PP recovery, or stat-boost items. Item-use frequency, healing HP threshold, early boost turns, and permitted recovery categories control when the AI considers them. Supplying an item does not guarantee use on the first turn.

## Trainer gimmicks

Configure the round's Mega, Dynamax, Z-Move, Tera, or Omni equipment and policy. Put the appropriate key item in General Inventory and prepare Pokémon held items, Tera type, Dynamax level, or Gigantamax factor where required. These integrations need a compatible Mega Showdown installation.

Equipment and battle-rule permissions are separate. A forbidden gimmick stays forbidden even when its key item is present. See [Battle Rules](#drm-cobblemon-editor/cobblemon-battle-rules).

## Adding custom items to General Inventory

Open `General > General Item Inv` for the inventory shared by the whole Trainer.

1. Search `Items` for a registered default stack, or select a real player stack from `My Inventory`.
2. Choose `Add selected`. `My Inventory` copies the stack without consuming the player's item.
3. Set `Quantity` to 1–99 and save the trainer. The inventory holds up to 64 entries.
4. Stacks with the same item ID but different names, enchantments, or custom components can remain separate entries.

Quantity edits preserve NBT and components. For an entry with stored data, choose another item from the list instead of editing its Item ID. Invalid or oversized data is rejected rather than silently replaced with a plain item.

This inventory checks gimmick-key possession without consuming the keys. It is separate from `Trainer Items`, the round AI's healing/battle bag.

JSON reference: the Trainer schema remains `23`. General entries store `componentsSnbt` and still read older `components` data. Do not change `schemaVersion` by hand to enable the feature.

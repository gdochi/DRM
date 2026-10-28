---
title: Icon Editing and Priority
slug: mapicon-editor-rules
order: 1410
description: Type defaults, JSON exceptions, per-NPC overrides and save/apply behavior.
product: dochi-mapicon-integration
category: Icon Authoring
section: editor
status: Usage guide
version: 0.1.2
audience: NPC creators
---

## Defaults by JSON type

Select a JSON type on the left, edit its icon in the center, and check the preview on the right. The list uses actual DRM Apply targets: dialogue, NPC Shop and teleporter by default. Cobblemon Editor adds targets such as Trainer, Pokemon Itself, PokéMart, Nurse Joy and Starter Selector.

**Type Default Icons** gives NPCs an icon based on applied JSON even without an exception rule. NPC defaults and individual type defaults are saved independently. Presentation and scheduler files are not NPC Apply targets and do not appear in this list.

## Image, color and display

| Setting | Options |
| --- | --- |
| Image | Bundled-icon search, external-image search or direct resource ID |
| Size | 8–64 |
| Tint | Spectrum, saturation/brightness, HEX and RGB with a live preview |
| Map | Independent minimap and world-map display |
| Name | Show or hide the NPC's name on the map |

**Choose Icon** opens a searchable list with PNG previews and names. The bundled library contains 1,476 Nikoichu CC0 1-bit Pixel Icons and an RPG filter. Tint changes map rendering, leaving the source PNG intact.

## Exceptions and visibility priority

Rules match JSON type and file path. An empty path matches every file of that type. The highest-priority matching rule wins; ties use the first matching rule in list order.

1. Global OFF or per-NPC Hide suppresses the icon.
2. A disabled matching rule hides it. Per-NPC Show can override this rule's OFF, but cannot override global OFF.
3. Image selection uses per-NPC style → matching rule → type default → NPC default.
4. DRM NPC visibility conditions also apply: an NPC hidden from a player stays hidden on that player's map.

Add, duplicate, delete and search rules, and select actual JSON files in the file picker. **Apply Type Icon** replaces an existing rule's image with the type icon.

## Override one NPC

Inside NPC Basic's **Map Icon** category, choose Follow JSON Rules, Show or Hide and an optional custom image. Save with the existing Basic toolbar. Category changes preserve the draft and participate in the unsaved-changes check. Saving this NPC does not change the global profile.

NPC Basic Display's **Edit Conditions** belongs to Core's NPC rendering visibility system. It also affects map visibility; it is not a separate map-addon condition editor.

## Save and apply

Load opens a profile for editing without switching server policy. **Save & Apply**, Save and Save As save the profile and activate it. The bottom **Active** filename reports the server-confirmed profile. Mods Config toggles update the display immediately; press **Apply** to save them on the server.

See [files and troubleshooting](#dochi-mapicon-integration/mapicon-files-operations) for texture paths and display limits.

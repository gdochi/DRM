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

Select **Type defaults** on the left, then choose **NPC**, **Dialogue JSON**, **NPC Shop JSON** or another category in the middle. Edit the image, size, tint and map visibility in **Icon settings** on the right. Check its appearance in **Icon preview** below the middle list.

![MapIcon's Type defaults with NPC selected in the middle and image, Size, Tint, Minimap and World map settings on the right.](assets/media/guides/mapicon-012-neo1211/type-defaults.png "MapIcon 0.1.2 on NeoForge 1.21.1. To change shop icons, select NPC Shop JSON in the middle, then edit its settings on the right.")

**NPC** is the basic NPC icon. The dialogue, shop and teleporter categories below it choose icons for the functions applied to NPCs. Cobblemon Editor adds targets such as Trainer, Pokemon Itself, PokéMart, Nurse Joy and Starter Selector.

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

![A new NPC Shop rule in JSON Rules.](assets/media/guides/mapicon-012-neo1211/mapicon-rule-added.png "MapIcon 0.1.2 / NeoForge 1.21.1. After Add rule, choose NPC Shop JSON as DRM source kind. An empty JSON file matches every file of that kind. For one shop, choose its file with the magnifying glass, set Priority and save.")

## Override one NPC

Open **Addons → Map icon** in the DNPC editor. The individual screen has only **Selected NPC**. Use **Icon** to show or hide it, choose its own image, size, tint and map switches, then **Save**. Wait for **Settings saved** at the bottom.

![The individual editor after saving an NPC icon.](assets/media/guides/mapicon-012-neo1211/mapicon-npc-saved.png "MapIcon 0.1.2 / DNPC 0.1.3 / NeoForge 1.21.1. This NPC-only screen has no Type defaults or JSON Rules. Its save is separate from the full editor's server-profile save.")

An icon switch does not bypass Core NPC visibility conditions for that player. Compare the result using the [actual minimap example](#dochi-mapicon-integration/mapicon-setup).

## Save and apply

Load opens a profile for editing without switching server policy. **Save & Apply**, Save and Save As save the profile and activate it. The bottom **Active** filename reports the server-confirmed profile. Mods Config toggles update the display immediately; press **Apply** to save them on the server.

See [files and troubleshooting](#dochi-mapicon-integration/mapicon-files-operations) for texture paths and display limits.

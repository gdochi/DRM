---
title: Find Your Way Around Dialogue Editor
slug: dialogue-editor-screen
order: 61
description: Find dialogue text, choices, connections and saving controls.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guide
version: 0.3.1
audience: Dialogue creators
---

## Edit the line a player will read

Select a general node on the left and open **Text** to write the NPC’s line. Open **Choices** for player replies. **Blueprint** shows which scene each reply opens. Follow [the first dialogue exercise](#core/dialogue-system) for a complete saved and applied example.

![Node list on the left and NPC text on the right.](assets/media/guides/drm-031-forge1201/dialogue-text.png "DRM 0.3.1 / Forge 1.20.1. Text edits the selected general node’s NPC line; Choices edits the player’s replies.")

| Area | What to do there |
| --- | --- |
| Node list | Select or add scenes such as `dialogue_1`; keep one `start` entry |
| Info / Text | Set node identity, type, GUI and NPC text |
| Choices | Write replies and choose what each reply does |
| Conditions / actions | Restrict availability or set an outcome |
| Blueprint | Inspect connections between scenes |

## Toolbar controls

| Control | Result |
| --- | --- |
| Editors | Return to editor selection |
| Create New | Start a dialogue-set draft |
| Load | Search saved dialogue sets |
| Save | Save the current set at its existing path |
| Save As | Save the whole set under another name |
| Reset | Restore the draft’s default state |
| Duplicate | Copy the whole set and its Blueprint layout |
| Close | Close the editor |

Use **Save As** when customizing a bundled example. To reuse the dialogue on several NPCs, save one set and select it in each NPC’s **Dialogue JSON** apply list.

## One dialogue set is a folder

Save As `blacksmith` creates a set under:

```text
config/dochi_rpg_maker/dialogue_sets/blacksmith/
  dialogue_set.json
  start.json
  greeting.json
  quest_done.json
```

`dialogue_set.json` contains the set, `start` selects the opening scene, and general nodes contain visible scenes. **Load / Save / Save As** operate on the set, not just the selected line.

## Copy related scenes together

Select nodes with **Shift+Click** or a drag selection, then **Copy / Ctrl+C**. When pasting into another set, click its **Dialogue Sets** panel first, then **Paste / Ctrl+V**. Duplicate names receive suffixes; links between copied nodes and their Blueprint positions follow the new names. Links to outside nodes remain unchanged.

Drag supported node, route, choice, condition and action rows to reorder them. A blue selected row is the item being edited; row checkboxes mark items for bulk operations. **Delete** removes checked items, including checked rows outside the visible area.

Create products in [NPC Shop](#core/shop-system), money types in [Currency Editor](#core/currency-editor), and the dialogue window’s layout in [GUI Maker](#core/gui-system).

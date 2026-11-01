---
title: Make Saved Changes Show Up
slug: data-flow
order: 105
description: Know when to save, apply to an NPC and reload edited files.
product: core
category: Reference / Operations
section: operations
status: Stable
version: 0.3.1
audience: Creators / Operators
tags:
  - data-flow
  - architecture
  - json
---

## A new conversation or shop

Use this order: **edit → Save As → Apply to an NPC → interact with empty hands**.

Saving creates the file. Apply chooses the NPC that uses it. If you only saved, right-click the NPC with the Core and select the file to apply.

## Change something already applied

Open the same file, use **Save**, then interact with the NPC again. If you saved under a new name, apply that new file to the NPC.

Also check linked files, such as the dialogue's GUI or the shop's currency, when replacing them.

## After editing a file directly

| Edited content | Reload |
| --- | --- |
| Dialogue, shops and other ordinary settings | `/drm reload` |
| Currency settings | `/drm currency reload` |
| Work saved in an editor | Close and reopen the relevant screen |

Multiplayer uses the server's files. Editing only the local copy does not change the server's conversation.

## Move work to another server

Files are under `config/dochi_rpg_maker/`. Move a whole conversation-set folder, and include linked shop/GUI files.

NPC placement, remaining shop stock and employment contracts also live in the world. **Keep configuration and the world together** when moving or restoring a whole server.



See [folders](#core/paths) for exact locations.

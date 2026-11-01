# Beginner documentation rewrite — 2026-11-01

The requested DNPC CurseForge link is now present in `_links/mod-links.json`, the synchronized NPC Core card and both setup guides:

[Dochi’s NPC Core on CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-npc-core)

## Reader-facing changes

Revised **193 Korean/English content files** across every documented mod, with **88 pages rewritten around concrete tasks**. Home cards and section introductions now explain what a player or creator can make. DRM opens with the first-conversation guide before release notes and file references.

- DRM: get the Core, make a conversation, create a shop, customize screens, and understand Save/Apply through actual tasks. Removed Java class diagrams and storage internals from ordinary guides.
- DNPC: download, place and customize an NPC, assign work/rest hours, cook, ride vehicles, hire workers and reuse saved NPCs.
- Warfare/DWE: install requirements, configure the first shot, find weapon/AI settings, assign crews and select compatible vehicles.
- BattleWorks: choose the correct build and begin an attack; retain existing practical combat tutorials and clearly label advanced JSON reference.
- Cobblemon: make the first trainer battle, arrange parties/rounds, connect dialogue/rewards, and create Pokémon sales/trade NPCs. Pokémon shops and ordinary DRM item shops are explicitly distinguished.
- Spawn Control: choose natural rules or placed spawners, add a first rule and spawn a saved DNPC. Removed stale 0.1.2 installation examples.
- Real Armor: equip armor, open settings and choose whole-body/body-part protection and durability.
- Minigames/MWENT: place/configure tables, distinguish craftable game-specific tables from the Creative table, and explain entry fees and rewards. Existing card catalogs and gameplay rules remain available.
- MapIcon: display a shop icon, choose map visibility and change an individual NPC's icon.

Ordinary guides no longer lead with implementation reports, packaged metadata, API ownership or blanket verification statements. Exact UI labels, commands, file paths, useful limits and compatibility restrictions remain where they help a user complete the task. Scripting and JSON references are marked as advanced material.

## Validation

- `npm run build`: 351 documents generated.
- `npm run verify`: all 351 documents, 12 mod cards, logos, routes, sections and distribution mappings passed.
- Confirmed the built DNPC download URL and first-document order for both DRM products in both languages.
- Every existing document kept its slug, product and section; no route was removed.
- 38 dedicated historical release pages and 14 scripting reference pages remain unchanged.
- `git diff --check`: passed.

Local preview: <http://localhost:4183>, running as a hidden local Node process (PID 53808), with HTTP 200 confirmed. Browser inspection could not start because the computer-use connector interprets the workspace's square brackets as a filesystem glob. No visual inspection is claimed; source/build/link checks completed.

## Recovery and completion records

Backup: `_backups/docs-refresh-beginner-20261101-002112/`. It contains the original content, site configuration, link mappings and pre-edit completion logs.

Version-specific logs were updated under `Desktop/[LOG] Change Log/`: DRM 0.3.1, DNPC 0.1.2, DW 0.3.1, DWE 0.3.1, BattleWorks 0.1.6, Cobblemon Editor 0.2.9, Minigames 0.1.5, Spawn Control 0.1.4, Real Armor 0.1.4 and MapIcon 0.1.2. Entries describe documentation changes; existing user edits and other version files were preserved.

Mod source, mod versions, installed games and worlds were not changed. The existing `_backups/legacy` changes are unrelated. One-time rewrite scripts were removed from `build/task/docs-beginner-20261101/`; the backup and built preview remain.

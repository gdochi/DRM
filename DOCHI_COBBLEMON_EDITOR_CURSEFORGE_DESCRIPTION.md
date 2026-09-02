# Dochi Cobblemon Editor

Build complete Cobblemon NPC experiences from in-game editors: trainer battles, wild-style Pokémon encounters, cinematic battle intros, Pokémon markets, healing NPCs, starter selection, reusable clones, and more.

Dochi Cobblemon Editor is a Fabric 1.21.1 addon for DRM Core. It connects CustomNPCs to real Cobblemon parties and battles while keeping authoring in the same `Load`, `Save As`, and `Apply` workflow used by DRM.

## What you can create

### Trainers and Pokémon encounters

- Trainer battles with up to six Pokémon per round
- Singles, Doubles, and Triples
- Up to 16 rounds with conditions and result-based After Actions
- Interaction, vision, or radius encounters with optional chase and positioning
- Keep, fixed, or player-party-average level rules
- Pokemon Itself NPCs that use one fully configured Pokémon and matching NPC appearance

### Trainer AI, parties, and battle items

- DRM Strategy with six independent 0–100 tuning values
- Beginner, Standard, Expert, and Boss presets with a readable AI assessment
- RCT and Cobblemon Strong engine options
- Searchable strategy plans and a configurable random-party generator
- Trainer battle bags with healing, status, revive, PP, and boost-item policies
- Mega, Dynamax, Z-Move, Tera, and Omni support when Mega Showdown is installed

### Battle Presentation Maker

Create a full-screen intro before the real battle begins:

- Labels, textures, color layers, player and opponent actors
- Timeline movement, fades, easing, crop, scale, rotation, and Z order
- Stage backgrounds, poses, intro audio, and battle music
- Searchable, paged image browser with lazy-loaded thumbnails

### PokéMart

- Sell configured Pokémon with per-NPC stock and restocking
- Build permanent Pokémon trades with eligibility rules
- Run auction houses with listings, bids, buyouts, escrow, tax, and claim storage
- Use DRM Currency, item currency, or optional CobbleDollars
- Server-side search and paging for large catalogs, PC storage, auctions, and claims
- Customize player-facing layouts with DRM GUI Maker

### More NPC tools

- Nurse Joy healing dialogue and healing-machine linkage
- Starter Selector cards with conditions, sounds, and success actions
- Open Starter Selector from a normal DRM Dialogue branch
- Clone Library for reusable Trainer and Pokemon NPC sources
- Compatibility with DRM Core NPC Spawner
- Dedicated Cobblemon appearance editor for CustomNPCs NPCs

## Designed for creators

Most content is authored through in-game screens instead of hand-writing JSON. Saved documents stay under `config/dochi_rpg_maker/`, can be reused across NPCs, and can track their source file so later saves are reflected in new interactions.

Version 0.1.4 also brings the Cobblemon tools into the shared DRM visual style, adds search and paging to large lists, improves performance on NPC-heavy maps, and substantially expands Korean localization.

## Requirements

- Minecraft Java Edition 1.21.1
- Fabric Loader 0.17.2 or newer
- Fabric API 0.116.6+1.21.1 or newer
- Java 21 or newer
- DRM Core 0.1.7 or newer
- Cobblemon 1.7.3 or newer, below 1.8.0
- CustomNPCs Fabric 1.0.0

## Optional integrations

- CobbleDollars for PokéMart currency
- Radical Cobblemon Trainers API 0.15.1-beta or newer for RCT AI and trainer imports
- FTB Quests for quest and task conditions or completion actions
- Mega Showdown for battle gimmicks

## Compatibility note

The release JAR is named `dochi_cobblemon_editor-0.1.4-fabric-1.21.1.jar`. The internal mod ID and resource namespace remain `cobble_npc` so existing worlds, JSON documents, and resource IDs continue to work.

---
title: Trainer Battle Sounds
slug: cobblemon-battle-sounds
order: 525
description: Common and per-round 0.1.6 sound rules triggered by the trainer's remaining Pokémon count.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Stable
version: 0.1.6
audience: Creators authoring trainer battle audio
tags:
  - battle-sounds
  - rounds
  - audio
---

## What this feature is

`Battle Sounds` are runtime rules that play while a Trainer battle is active, based on the trainer's remaining Pokémon count.

- They are separate from Battle Presentation Maker timeline audio.
- They run during the real Cobblemon battle, not during the pre-battle presentation.
- They work independently of DRM Strategy, RCT, or Cobblemon Strong AI.
- They apply to Trainer battles, not Pokemon Itself encounters.

## Authoring workflow

1. Open a Trainer document in `Cobblemon Editor`.
2. Choose `Battle Sounds` at the top of a Trainer section. `Battle Strategy` can also open the same editor while preserving the current round.
3. Select `Global (all rounds)` or a specific round on the left.
4. Select a trigger count from 1 through 6.
5. Enable `Play at this count`, then choose a sound ID, volume, and pitch.
6. Use `Play` and `Stop` to preview the sound on the client.
7. Choose `Apply`, then save the Trainer document from the parent editor with `Save` or `Save As`.

`Close` does not apply the editor's draft. If values changed or invalid numbers remain, a confirmation asks whether to discard them.

## Global and per-round modes

| Target | Mode | Behavior |
| --- | --- | --- |
| All rounds | Global | Baseline for every inheriting round |
| One round | `Use global` | Resolve the current global rules at runtime |
| One round | `Custom` | Use an independent set of count rules |
| One round | `Off` | Play none of these sounds even when global rules exist |

The first time a round changes to `Custom`, it uses the current global rules as its starting draft. Later edits affect only that round.

## Trigger behavior

- The count includes every living active and benched trainer Pokémon.
- The first observed count after battle startup can trigger. A six-Pokémon trainer can therefore play the `6` rule at the start.
- A faint event marks the count for another server-side check.
- Each count plays at most once in one battle.
- Zero means the battle has ended, so there is no zero-count rule.
- A rematch creates a new battle session with fresh one-shot trigger state.

## Sound settings

| Setting | Range or behavior |
| --- | --- |
| Sound ID | A namespaced sound available through the active client resource packs |
| Volume | 0–4; zero is not playable |
| Pitch | 0.05–4 |
| `Stop sounds first` | Stop current battle music and sounds started by these rules before playing the new sound |

The picker searches translated names and registry IDs. If preview fails, first confirm that the sound exists in the active resource packs. Browsing or selecting a sound does not automatically enable `Play at this count`.

The preview `Stop` button stops only the sound played by this editor. It does not change the runtime `Stop sounds first` policy.

## Runtime cleanup

When the battle ends or its session is cleaned up, the server tells the client to stop audio associated with this trainer battle. This does not act as a global stop for unrelated game sounds.

## JSON reference

This is reference information for external tools and version control. In Trainer schema 22, global rules are stored in `trainerOptions.battleSound.rules[]`; per-round settings use `rounds[].battleSoundOverride`. Each rule contains `remainingPokemon`, `enabled`, `sound`, `volume`, `pitch`, and `stopBeforePlay`. Authoring through the editor is recommended.

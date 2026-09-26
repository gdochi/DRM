---
title: Battle Rules
slug: cobblemon-battle-rules
order: 524
description: Common and per-round formats, levels, items, Legendary Pokémon, mechanics, and lead rules in 0.1.6.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Stable
version: 0.1.6
audience: Creators configuring trainer battle rules
tags:
  - battle-rules
  - rounds
  - items
  - gimmicks
---

## Open the editor

Open a Trainer or Pokemon Itself document in `Cobblemon Editor`, then choose `Battle Rules` from `Rounds`. This is a child authoring screen, not a standalone JSON editor. Choose `Done`, return to the parent editor, and use `Save` or `Save As` there to write the Trainer/Pokemon Itself document.

The shared DRM Back and Forward arrows always remain visible; they become disabled when no history is available. Invalid numbers or item IDs block navigation and completion so the current draft is not silently lost.

## Common and per-round rules

Select `Common Rules` or an explicit round from 1–16.

- Common rules affect only rounds that still inherit them.
- A round override stores that round's complete battle configuration independently.
- `Use Common Rules` removes only the selected round's override.
- Editing one round does not overwrite other independent rounds.

## Battle setup

### Formats

| Format | Behavior |
| --- | --- |
| `Inherit` | Use the format authored in `Rounds` |
| `Singles` | One active Pokémon per side |
| `Doubles` | Two active Pokémon per side |
| `Triples` | Three active Pokémon per side |
| `Lead Duel` | Singles using only the selected lead on each side |

Doubles and Triples require enough battle-ready Pokémon on both sides. Lead Duel limits only the temporary battle parties; it does not delete the authored parties. Pokemon Itself uses Singles and hides the meaningless trainer-lead controls.

### Levels

| Mode | Behavior |
| --- | --- |
| `Keep` | Use the levels authored in the document |
| `Player party average` | Target the current player-party average plus an offset from -99 to 99 |
| `Fixed` | Set temporary battle Pokémon to a level from 1 to 100 |

Fixed mode can affect the trainer only or both battle sides. These transformations apply to temporary battle copies and do not change the player's original Pokémon levels.

### Battle mechanics

Mega, Tera, and Dynamax permission is a server rule for both sides. Permission does not install or guarantee a mechanic. Actual activation still needs a compatible addon, the round's NPC equipment and key item, and any required Pokémon held item or property.

`Trainer Gimmick` configures the NPC's equipment; Battle Rules control permission for both sides. If a rule blocks the mechanic, the NPC will not choose it even when equipped.

## Items

| Setting | Runtime effect |
| --- | --- |
| Allow items | When off, block all covered battle-item actions |
| Banned items | Block individual registry IDs chosen through name/ID search |
| Use limit | Per actor and per battle, 0–999 uses or unlimited |
| Minimum turn | Allow use only on or after this turn |
| Target HP cap | Allow use only when the target's current HP percentage is at or below the value |
| Allow held items | When off, refuse battle startup if a participating Pokémon holds an item |

The banned list accepts up to 128 unique IDs. Clicking a catalog row immediately bans it; click again or remove it from the center list to allow it. IDs from a currently missing mod stay visible without an icon instead of being silently deleted.

The server rechecks battle bag items, revives, and capture items before consumption. An allowed capture throw counts toward the limit. When several opponents are active, every target must satisfy the HP rule. Creative players also follow use limits.

## Legendary Pokémon

When Legendary Pokémon are disabled, the server checks both participating parties before startup and refuses the battle if one is present. This follows Cobblemon's `isLegendary()` classification; it is not a separate rule that automatically includes every Mythical Pokémon.

## Leads

Configure player and trainer leads independently:

- `Selected`: keep the original lead selection
- `Random`: choose from the player's healthy party or the generated trainer party
- `Slot`: use slot 1–6

A missing slot, fainted selected player lead, or insufficient party size for the chosen format refuses startup instead of silently changing the rule.

## Pokemon Itself encounter rules

Pokemon Itself also exposes natural-drop and capture permission on this screen. Disabling capture blocks capture for that encounter independently of the item rules. Disabling natural drops prevents the addon's encounter from allowing normal drops.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| A rule did not change | Choose `Done`, save in the parent editor, and check whether the round inherits Common Rules |
| Startup is refused | Party size, explicit leads, held-item restriction, and Legendary restriction |
| A mechanic does not activate | Compatible addon, NPC equipment, general-inventory key item, Pokémon requirements, and Battle Rules |
| An item is refused | Overall permission, banned ID, use count, turn, and target HP must all allow it |

## JSON reference

This is reference information for external tools and version control, not the recommended authoring path. Trainer schema 22 stores common settings in `trainerOptions.battleConfig` and a round override in `rounds[].battleConfigOverride`. A round without the override uses the common configuration.

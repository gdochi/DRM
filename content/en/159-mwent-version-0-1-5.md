---
title: 0.1.5 — synergy and siege additions
slug: version-0-1-5
order: 1590
description: 72 new workspace cards, added mechanics and specifications.
product: mwent
category: Factions and cards
section: releases
status: Specification reference
version: 0.1.5
audience: Players / creators
---

## Current workspace baseline

Based on the independent Minecraft 26.3 Fabric / NeoForge sources and production 0.1.5 JAR on October 30, 2026. This is separate from the [CurseForge upload history](#mwent/releases).

Built-in definitions increase **263 → 335**, optional definitions remain **89**, and the total increases **352 → 424**. Regular and animated prints total 848. Existing power, provisions, frames, rarities and legacy Deploy, Order and keyword definitions remain intact. Added IDs are 1700–1759 and 1800–1811.

## Added mechanics

- Scenarios advance chapters through qualifying plays, locations offer persistent Orders, and traps provide hidden reactions. They occupy sockets without adding unit points.
- Veil, Immunity, Rupture, Infusion, Resilience, counters, timers and round evolution are supported.
- Added operations include choosing created cards, playing from deck/graveyard, recall/replay, hand/deck boosts, base-power changes, Duel/Clash and retriggering Deathwish/Deploy.
- Conditions cover starting decks, hand size, highest power, top-three power and Supply spending, alongside optional costs and four opening bonuses.
- The custom-card editor exposes these abilities, conditions, targets, operations and costs. Saving does not grant owned cards.

## Sixty new faction cards

Ten cards are added per faction. These tables summarize actual stored power, provisions and abilities.

On mobile, scroll inside the table horizontally to read the ability column.

### Volkar Empire

| Card and first version | Power / provisions | Frame and rarity | Ability summary |
| --- | --- | --- | --- |
| Volkar Founding Chronicle (card_1700) · 0.1.5 | — / 10 | Gold · Legendary | Scenario; Progress: Ally Played Construct; Doomed; Deploy · Self Unit Board All · Target: Summon one token with power 2 #0 · per turn 1; Chapter 1: Ally Unit Board All · Target: Armor 2 · per turn 1; Chapter 2: Ally Unit Board All · Target: Rearm 2 · per turn 1 |
| Volkar Field Workshop (card_1701) · 0.1.5 | — / 7 | Gold · Epic | Location; Resilience; Deploy · Ally Unit Board All · Target: Armor 1 · per turn 1; Order · Self Unit Board All · Target: Generate in hand #0 · per turn 1 |
| Volkar Hidden Snare (card_1702) · 0.1.5 | — / 4 | Bronze · Rare | Trap; Reveal: Enemy unit played; Trap reaction · Enemy Unit Board Highest power · Target: Damage 3 · per turn 1 |
| Volkar Signal Keeper (card_1703) · 0.1.5 | 4 / 5 | Bronze · Rare | Counter 2; Timer 2; Turn End · Self Unit Board All · Target: Reduce counter 1 · per turn 1; Counter reaches zero · Self Unit Board All · Target: Shield 1 · per turn 1; Timer expires · Self Unit Board All · Target: Boost 2 · per turn 1 |
| Volkar Unexpected Ally (card_1704) · 0.1.5 | 4 / 5 | Bronze · Rare | Ally Played · if the triggering card has category Construct · Self Unit Board All · Target: Armor 1 · per turn 1 |
| Volkar Sworn Vanguard (card_1705) · 0.1.5 | 4 / 5 | Bronze · Rare | Deploy · if the starting deck contains no neutrals · Self Unit Board All · Target: Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Target: Boost 1 · per turn 1 |
| Volkar Challenge Bearer (card_1706) · 0.1.5 | 4 / 5 | Bronze · Rare | Deploy · Enemy Unit Board Choose · Target: Clash · per turn 1; Deathblow · Self Unit Board All · Target: Boost 2 · per turn 1 |
| Volkar Unwritten Possibilities (card_1707) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Self Unit Board All · Target: Create and play one of up to three choices costing at most 5 · per turn 1 |
| Volkar Shared Instinct (card_1708) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Ally Unit Board Choose · Target: Infuse abilities and categories #1704 · per turn 1 |
| Volkar Relic Breaker (card_1709) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Enemy Artifact Board Choose · Target: Destroy artifact · per turn 1 |

### Avalin

| Card and first version | Power / provisions | Frame and rarity | Ability summary |
| --- | --- | --- | --- |
| Avalin Founding Chronicle (card_1710) · 0.1.5 | — / 10 | Gold · Legendary | Scenario; Progress: Ally Played Beast; Doomed; Deploy · Self Unit Board All · Target: Summon one token with power 2 #8 · per turn 1; Chapter 1: Ally Unit Board All · Target: Heal 2 · per turn 1; Chapter 2: Self Unit Board All · Target: Summon one token with power 4 #8 · per turn 1 |
| Avalin Field Workshop (card_1711) · 0.1.5 | — / 7 | Gold · Epic | Location; Resilience; Deploy · Ally Unit Board All · Target: Armor 1 · per turn 1; Order · Self Unit Board All · Target: Generate in hand #8 · per turn 1 |
| Avalin Hidden Snare (card_1712) · 0.1.5 | — / 4 | Bronze · Rare | Trap; Reveal: Enemy special played; Trap reaction · Ally Unit Board Lowest power · Target: Boost 3 · per turn 1 |
| Avalin Signal Keeper (card_1713) · 0.1.5 | 4 / 5 | Bronze · Rare | Counter 2; Timer 2; Turn End · Self Unit Board All · Target: Reduce counter 1 · per turn 1; Counter reaches zero · Self Unit Board All · Target: Shield 1 · per turn 1; Timer expires · Self Unit Board All · Target: Boost 2 · per turn 1 |
| Avalin Unexpected Ally (card_1714) · 0.1.5 | 4 / 5 | Bronze · Rare | Special Played · if the triggering card has category Nature · Self Unit Board All · Target: Boost 1 · per turn 1 |
| Avalin Sworn Vanguard (card_1715) · 0.1.5 | 4 / 5 | Bronze · Rare | Deploy · if the starting deck contains no neutrals · Self Unit Board All · Target: Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Target: Boost 1 · per turn 1 |
| Avalin Challenge Bearer (card_1716) · 0.1.5 | 4 / 5 | Bronze · Rare | Deploy · Enemy Unit Board Choose · Target: Clash · per turn 1; Deathblow · Self Unit Board All · Target: Boost 2 · per turn 1 |
| Avalin Unwritten Possibilities (card_1717) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Self Unit Board All · Target: Create and play one of up to three choices costing at most 5 · per turn 1 |
| Avalin Shared Instinct (card_1718) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Ally Unit Board Choose · Target: Infuse abilities and categories #1714 · per turn 1 |
| Avalin Relic Breaker (card_1719) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Enemy Artifact Board Choose · Target: Destroy artifact · per turn 1 |

### Roden League

| Card and first version | Power / provisions | Frame and rarity | Ability summary |
| --- | --- | --- | --- |
| Roden Founding Chronicle (card_1720) · 0.1.5 | — / 10 | Gold · Legendary | Scenario; Progress: Ally Played Merchant; Doomed; Deploy · Self Unit Board All · Target: Summon one token with power 2 #16 · per turn 1; Chapter 1: Self Unit Board All · Target: Supply delivery 3 · per turn 1; Chapter 2: Enemy Unit Board Highest power · Target: Mark and strike 4 · per turn 1 |
| Roden Field Workshop (card_1721) · 0.1.5 | — / 7 | Gold · Epic | Location; Resilience; Deploy · Ally Unit Board All · Target: Armor 1 · per turn 1; Order · Self Unit Board All · Target: Generate in hand #16 · per turn 1 |
| Roden Hidden Snare (card_1722) · 0.1.5 | — / 4 | Bronze · Rare | Trap; Reveal: Enemy unit played; Trap reaction · Enemy Unit Board Highest power · Target: Mark and strike 1 · per turn 1 |
| Roden Signal Keeper (card_1723) · 0.1.5 | 4 / 5 | Bronze · Rare | Counter 2; Timer 2; Turn End · Self Unit Board All · Target: Reduce counter 1 · per turn 1; Counter reaches zero · Self Unit Board All · Target: Shield 1 · per turn 1; Timer expires · Self Unit Board All · Target: Boost 2 · per turn 1 |
| Roden Unexpected Ally (card_1724) · 0.1.5 | 4 / 5 | Bronze · Rare | Supplies spent · Self Unit Board All · Target: Boost 1 · per turn 1 |
| Roden Sworn Vanguard (card_1725) · 0.1.5 | 4 / 5 | Bronze · Rare | Deploy · if the starting deck contains no neutrals · Self Unit Board All · Target: Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Target: Boost 1 · per turn 1 |
| Roden Challenge Bearer (card_1726) · 0.1.5 | 4 / 5 | Bronze · Rare | Deploy · Enemy Unit Board Choose · Target: Clash · per turn 1; Deathblow · Self Unit Board All · Target: Boost 2 · per turn 1 |
| Roden Unwritten Possibilities (card_1727) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Self Unit Board All · Target: Create and play one of up to three choices costing at most 5 · per turn 1 |
| Roden Shared Instinct (card_1728) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Ally Unit Board Choose · Target: Infuse abilities and categories #1724 · per turn 1 |
| Roden Relic Breaker (card_1729) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Enemy Artifact Board Choose · Target: Destroy artifact · per turn 1 |

### Nevra

| Card and first version | Power / provisions | Frame and rarity | Ability summary |
| --- | --- | --- | --- |
| Nevra Founding Chronicle (card_1730) · 0.1.5 | — / 10 | Gold · Legendary | Scenario; Progress: Ally Played Agent; Doomed; Deploy · Self Unit Board All · Target: Summon one token with power 2 #24 · per turn 1; Chapter 1: Enemy Unit Board Highest power · Target: Infiltrate 1 · per turn 1; Chapter 2: Target Spying ≥ 1 · Enemy Unit Board Highest power · Target: Lock 1, Target: Damage 3 · per turn 1 |
| Nevra Field Workshop (card_1731) · 0.1.5 | — / 7 | Gold · Epic | Location; Resilience; Deploy · Ally Unit Board All · Target: Armor 1 · per turn 1; Order · Self Unit Board All · Target: Generate in hand #24 · per turn 1 |
| Nevra Hidden Snare (card_1732) · 0.1.5 | — / 4 | Bronze · Rare | Trap; Reveal: Enemy special played; Trap reaction · Enemy Unit Board Highest power · Target: Lock 1 · per turn 1 |
| Nevra Signal Keeper (card_1733) · 0.1.5 | 4 / 5 | Bronze · Rare | Counter 2; Timer 2; Turn End · Self Unit Board All · Target: Reduce counter 1 · per turn 1; Counter reaches zero · Self Unit Board All · Target: Shield 1 · per turn 1; Timer expires · Self Unit Board All · Target: Boost 2 · per turn 1 |
| Nevra Unexpected Ally (card_1734) · 0.1.5 | 4 / 5 | Bronze · Rare | Ally Played · Event Generated outside starting deck ≥ 1 · Self Unit Board All · Target: Boost 1 · per turn 1 |
| Nevra Sworn Vanguard (card_1735) · 0.1.5 | 4 / 5 | Bronze · Rare | Deploy · if the starting deck contains no neutrals · Self Unit Board All · Target: Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Target: Boost 1 · per turn 1 |
| Nevra Challenge Bearer (card_1736) · 0.1.5 | 4 / 5 | Bronze · Rare | Deploy · Enemy Unit Board Choose · Target: Clash · per turn 1; Deathblow · Self Unit Board All · Target: Boost 2 · per turn 1 |
| Nevra Unwritten Possibilities (card_1737) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Self Unit Board All · Target: Create and play one of up to three choices costing at most 5 · per turn 1 |
| Nevra Shared Instinct (card_1738) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Ally Unit Board Choose · Target: Infuse abilities and categories #1734 · per turn 1 |
| Nevra Relic Breaker (card_1739) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Enemy Artifact Board Choose · Target: Destroy artifact · per turn 1 |

### Mistwake Clans

| Card and first version | Power / provisions | Frame and rarity | Ability summary |
| --- | --- | --- | --- |
| Haemu Founding Chronicle (card_1740) · 0.1.5 | — / 10 | Gold · Legendary | Scenario; Progress: Ally Played Raider; Doomed; Deploy · Self Unit Board All · Target: Summon one token with power 2 #1300 · per turn 1; Chapter 1: Ally Unit Board All · Target: Heal 2 · per turn 1; Chapter 2: Ally Unit Board Lowest power · Target: Blood rite 5 · per turn 1 |
| Haemu Field Workshop (card_1741) · 0.1.5 | — / 7 | Gold · Epic | Location; Resilience; Deploy · Ally Unit Board All · Target: Armor 1 · per turn 1; Order · Self Unit Board All · Target: Generate in hand #1300 · per turn 1 |
| Haemu Hidden Snare (card_1742) · 0.1.5 | — / 4 | Bronze · Rare | Trap; Reveal: Enemy unit played; Trap reaction · Enemy Unit Board Highest power · Target: Bleeding 3 · per turn 1 |
| Haemu Signal Keeper (card_1743) · 0.1.5 | 4 / 5 | Bronze · Rare | Counter 2; Timer 2; Turn End · Self Unit Board All · Target: Reduce counter 1 · per turn 1; Counter reaches zero · Self Unit Board All · Target: Shield 1 · per turn 1; Timer expires · Self Unit Board All · Target: Boost 2 · per turn 1 |
| Haemu Unexpected Ally (card_1744) · 0.1.5 | 4 / 5 | Bronze · Rare | Ally damaged · Self Unit Board All · Target: Boost 1 · per turn 1 |
| Haemu Sworn Vanguard (card_1745) · 0.1.5 | 4 / 5 | Bronze · Rare | Deploy · if the starting deck contains no neutrals · Self Unit Board All · Target: Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Target: Boost 1 · per turn 1 |
| Haemu Challenge Bearer (card_1746) · 0.1.5 | 4 / 5 | Bronze · Rare | Deploy · Enemy Unit Board Choose · Target: Clash · per turn 1; Deathblow · Self Unit Board All · Target: Boost 2 · per turn 1 |
| Haemu Unwritten Possibilities (card_1747) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Self Unit Board All · Target: Create and play one of up to three choices costing at most 5 · per turn 1 |
| Haemu Shared Instinct (card_1748) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Ally Unit Board Choose · Target: Infuse abilities and categories #1744 · per turn 1 |
| Haemu Relic Breaker (card_1749) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Enemy Artifact Board Choose · Target: Destroy artifact · per turn 1 |

### Morga Brood

| Card and first version | Power / provisions | Frame and rarity | Ability summary |
| --- | --- | --- | --- |
| Morga Founding Chronicle (card_1750) · 0.1.5 | — / 10 | Gold · Legendary | Scenario; Progress: Ally Played Swarm; Doomed; Deploy · Self Unit Board All · Target: Summon one token with power 2 #1400 · per turn 1; Chapter 1: Ally Unit Board All · Target: Seed a Husk 1 · per turn 1; Chapter 2: Self Unit Board All · Target: Summon one token with power 4 #1400 · per turn 1 |
| Morga Field Workshop (card_1751) · 0.1.5 | — / 7 | Gold · Epic | Location; Resilience; Deploy · Ally Unit Board All · Target: Armor 1 · per turn 1; Order · Self Unit Board All · Target: Generate in hand #1400 · per turn 1 |
| Morga Hidden Snare (card_1752) · 0.1.5 | — / 4 | Bronze · Rare | Trap; Reveal: Enemy unit played; Trap reaction · Enemy Unit Board Highest power · Target: Poison 1 · per turn 1 |
| Morga Signal Keeper (card_1753) · 0.1.5 | 4 / 5 | Bronze · Rare | Counter 2; Timer 2; Turn End · Self Unit Board All · Target: Reduce counter 1 · per turn 1; Counter reaches zero · Self Unit Board All · Target: Shield 1 · per turn 1; Timer expires · Self Unit Board All · Target: Boost 2 · per turn 1 |
| Morga Unexpected Ally (card_1754) · 0.1.5 | 4 / 5 | Bronze · Rare | Ally Destroyed · Self Unit Board All · Target: Boost 1 · per turn 1 |
| Morga Sworn Vanguard (card_1755) · 0.1.5 | 4 / 5 | Bronze · Rare | Deploy · if the starting deck contains no neutrals · Self Unit Board All · Target: Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Target: Boost 1 · per turn 1 |
| Morga Challenge Bearer (card_1756) · 0.1.5 | 4 / 5 | Bronze · Rare | Deploy · Enemy Unit Board Choose · Target: Clash · per turn 1; Deathblow · Self Unit Board All · Target: Boost 2 · per turn 1 |
| Morga Unwritten Possibilities (card_1757) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Self Unit Board All · Target: Create and play one of up to three choices costing at most 5 · per turn 1 |
| Morga Shared Instinct (card_1758) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Ally Unit Board Choose · Target: Infuse abilities and categories #1754 · per turn 1 |
| Morga Relic Breaker (card_1759) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Enemy Artifact Board Choose · Target: Destroy artifact · per turn 1 |

## Twelve siege cards

Seven original machine models with moving components are shared by cards, fields and previews. Cards, abilities and basic models work without Create or Big Cannons. Optional palettes use compatible installed assets.

Added siege-engine categories, ally/enemy Order and Cooldown-reduction events, Cooldown reduction, Order charging and summons preserving abilities. Such summons do not retrigger Deploy and gain Doomed.

| Card and first version | Power / provisions | Frame and rarity | Ability summary |
| --- | --- | --- | --- |
| Volkar Timber Ballista (card_1800) · 0.1.5 | 4 / 5 | Bronze · Rare | Armor 1; Order: Damage 2; Cooldown 2; Resupply 1; Crew 1; Machine Wooden Ballista |
| Volkar Counterweight Catapult (card_1801) · 0.1.5 | 5 / 7 | Bronze · Rare | Armor 1; Order: Socket burst 2; Cooldown 3; Resupply 1; Patience 1; Machine Counterweight Catapult |
| Volkar Armored Cannon (card_1802) · 0.1.5 | 5 / 8 | Gold · Epic | Armor 2; Order: Armor piercing 3; Cooldown 3; Resupply 1; Expense 1; Machine Armored Cannon |
| Volkar Automatic Loader (card_1803) · 0.1.5 | 4 / 6 | Bronze · Rare | Armor 1; Turn End · Ally Unit Adjacent All Siege engine · Target: Reduce cooldown only 1 · per turn 1; Machine Automatic Loader |
| Volkar Steam Ballista (card_1804) · 0.1.5 | 5 / 7 | Bronze · Rare | Armor 3; Order: Armor discharge 2; Cooldown 2; Resupply 1; Crew 1; Machine Steam Ballista |
| Volkar Repeating Cannon (card_1805) · 0.1.5 | 4 / 10 | Gold · Epic | Armor 1; Order: Damage 1; Cooldown 2; Resupply 1; An allied cooldown decreases · if the triggering card has category Siege engine · Enemy Unit Board Random · Target: Damage 1 · per turn 3; Machine Repeating Cannon |
| Volkar Armored Crew (card_1806) · 0.1.5 | 4 / 5 | Bronze · Rare | Armor 2; Defender 1; Deploy · Ally Unit Adjacent All · Target: Armor 1 · per turn 1 |
| Volkar Field Engineer (card_1807) · 0.1.5 | 4 / 5 | Bronze · Rare | Armor 1; Deploy · Ally Unit Board Choose Siege engine · Target: Rearm 2 · per turn 1 |
| Volkar Ammunition Cart (card_1808) · 0.1.5 | 5 / 5 | Bronze · Rare | Armor 1; Trade 1; Turn End · Self Unit Board All · Target: Supply delivery 1 · per turn 1; Machine Ammunition Cart |
| Volkar Field Maintenance (card_1809) · 0.1.5 | — / 5 | Bronze · Rare | Deploy · Ally Unit Board Choose Siege engine · Target: Rearm 2 · per turn 1 |
| Volkar Bombardment Order (card_1810) · 0.1.5 | — / 4 | Bronze · Rare | Deploy · Enemy Unit Row All · Target: Damage 1 · per turn 1 |
| Volkar Siege Encampment (card_1811) · 0.1.5 | — / 12 | Gold · Legendary | Scenario; Progress: Ally Played Siege engine; Doomed; Deploy · Self Unit Board All · Target: Summon 1 unit with abilities and Doomed; no Deploy #1800 · per turn 1; Chapter 1: Self Unit Board All · Target: Summon 1 unit with abilities and Doomed; no Deploy #1801 · per turn 1; Chapter 2: Ally Unit Board All Siege engine · Target: Rearm 2 · per turn 1 |

See [table and card authoring](#mwent/authoring) and the [complete specification catalog](#mwent/card-catalog).

---
title: Mercenary Contracts and Command HUD
slug: tacz-mercenary
order: 355
description: Configure hire terms with CTF Mercenary Core, then manage active contracts through the player command HUD.
product: cnpc-tacz-fire
category: Mercenaries
section: mercenary
status: Draft
version: 0.2.3
audience: Creators and players
tags:
  - mercenary
  - contract
  - hud
---

## Two different screen types

The mercenary workflow deliberately separates creator tools from player runtime screens.

| Screen or item | Who uses it | Purpose |
| --- | --- | --- |
| `CTF Mercenary Core` and `Mercenary Contract Settings` | Creator in Creative mode | Edit one managed TACZ Fire NPC's server-authoritative hire terms. |
| `Mercenary Contract` confirmation | Player | Review cost, duration, roster usage, and owner-attack terms before paying. |
| `Mercenary Status` command HUD | Player with active contracts | Inspect, select, command, summon, recall, or release hired mercenaries. |

`CTF Mercenary Core` is not part of the `CTF Npc Core` firearm editor. It opens a separate editor and accepts only managed TACZ Fire CustomNPCs.

## Creator setup

1. Configure and test the NPC's firearm combat with `CTF Npc Core`.
2. In Creative mode, hold `CTF Mercenary Core`.
3. Right-click the managed TACZ Fire NPC.
4. Configure the contract and press `Save`.

| Contract field | Meaning |
| --- | --- |
| `Hire available` | Allows normal player interaction to request a contract offer. |
| `Cost item ID` | Registry ID of the hiring item. |
| `Cost item count` | Number removed when the player confirms. Creative/operator authoring access can waive the cost. |
| `Hire duration (seconds)` | Total active contract time. |
| `Summon windup (seconds)` | Delay from 0 to 60 seconds before a stored mercenary deploys. |
| `Recall windup (seconds)` | Delay from 0 to 60 seconds before a deployed mercenary is stored. |
| `Faction hostility / hits` | Number of damaging owner hits before nearby same-faction NPCs treat the owner as hostile. The contract itself remains active. |
| `Automatic contract break / hits` | Independent hit threshold that ends the contract and owner protection. |
| `Hit reset window (seconds)` | Consecutive owner-hit window from 1 to 10 seconds. The count resets after this much time without another damaging hit. |

Faction hostility and automatic contract break are independent. Enabling one does not silently enable the other.

## Hiring as a player

Interact normally with a hireable NPC. Do not hold `CTF Npc Core`, `CTF Mercenary Core`, or a CustomNPCs editor item; those items keep their own editing behavior.

The non-pausing confirmation screen shows the NPC, price, contract duration, roster slots, and owner-attack rules. The server rechecks the offer, distance, item cost, current terms, ownership, and roster limit when the player confirms.

Each player may hold up to five active contracts. Payment is charged only after server confirmation. Manually released contracts are not refunded.

## Contract states and timer

| State | Timer behavior |
| --- | --- |
| Deployed or following/formation/holding/combat | Active contract time continues. |
| Recalling | Active contract time continues during the windup. |
| Stored | Timer is paused. |
| Summoning | Timer remains paused until deployment completes. |
| Area unloaded | The contract remains deployed and is shown as unloaded. |

Recall saves the current NPC state before storage. Summon restores the stored NPC near the owner only when a safe space is found. If required stored data cannot be restored safely, the command is rejected instead of inventing a replacement NPC.

## Open and use the runtime HUD

Hold the default `J` key to show the mercenary command HUD. Hold `Left Alt` while it is open to release camera control and interact with HUD buttons. Release `Left Alt` to return camera control; release `J` to close the HUD.

The HUD shows up to the five owned contracts, including:

* Contract state and remaining time
* Movement mode and formation slot
* Fire mode and combat posture
* Deployment, summon, and recall state
* Current owner-hit count, faction-hostility threshold, contract-break threshold, and reset time

Mercenaries can be checked individually. Commands can target the selection or all eligible mercenaries, and the result reports how many accepted or skipped the order.

Version 0.2.3 consolidates opposite orders into state-aware buttons. For example, an all-Follow selection offers Hold; otherwise the button offers Follow. Formation, Defensive/Aggressive posture, and Fire At Will/Hold Fire work the same way. If any selected mercenary is stored, deployment offers Summon first; when all selected mercenaries are deployed, it changes to Recall. Mixed selections can be normalized to Follow, Rear Form, Defensive, or Fire At Will.

While the server processes an order, the button keeps its normal visual state but ignores additional clicks. It becomes interactive again after the result arrives, preventing accidental duplicate orders.

## Movement and combat commands

| Command | Behavior |
| --- | --- |
| `Follow` | Follow the owner without a fixed formation slot. |
| `Rear Form` | Use a rear formation slot behind the owner. |
| `Front Form` | Use a front formation slot. |
| `Hold` | Save the current position as the hold anchor. |
| `Regroup` | Clear the current movement task and return to Follow. |
| `Hold Fire` | Stop firearm output and target acquisition until released. |
| `Fire At Will` | Allow firing and target acquisition again. |
| `Defensive Posture` | React to actual combat and valid threats. |
| `Aggressive Posture` | Proactively engage enemies recognized through the owner's valid threat relationships and the NPC's target rules. |
| `Summon` | Deploy a stored mercenary after its configured windup. |
| `Recall` | Store a deployed mercenary after its configured windup. |

Aggressive posture is not a permission to attack every nearby entity. Explicit target selectors, CustomNPCs faction hostility, friendly-player protection, tags, and server-authorized reactive rules still filter candidates.

## Owner attacks and contract break

Owner damage is counted only when it is a real damaging hit. Same-tick multi-hit damage counts once, and the counter resets after the configured quiet window.

* `Faction hostility / hits` starts a faction response. Nearby same-faction NPCs can treat the owner as hostile, but the mercenary contract remains active.
* `Automatic contract break / hits` ends the contract and owner protection. No refund is issued.
* If both thresholds are crossed together, both outcomes are reported.

The live HUD shows the current count and both thresholds so the player can see the risk before another hit.

## Release and expiration

Releasing a contract requires confirmation and gives no refund. A stored NPC is restored before release; if restoration fails, release is canceled to avoid losing the NPC.

When active contract time reaches zero, the contract expires automatically. If a contracted NPC is removed, the contract also ends and the owner is notified.

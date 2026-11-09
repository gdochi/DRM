---
title: Make a Starter Selection NPC
slug: cobblemon-starter-selector
order: 551
description: Choose starter cards and granted Pokémon, then add a one-time selection condition.
product: drm-cobblemon-editor
category: Service NPCs
section: services
status: Draft
version: Fabric / NeoForge 0.2.9
audience: NPC creators and server operators
tags:
  - starter-selector
  - pokemon-give
  - runtime-gui
---

## Let players choose one of three starters

Create candidates in **Starter Selector Editor**, then apply the profile to an NPC. Players select a card and confirm their Pokémon. Use a DNPC or CustomNPCs NPC on **Minecraft 1.21.1, Fabric or NeoForge**.

![Three starter candidates, card wording in the middle and Pokémon settings on the right.](assets/media/guides/cobble-029-neo1211/cobble-starter.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, English UI. Select a candidate on the left, edit card text in the middle and the granted Pokémon on the right.")

1. Open **Starter Selector Editor → Use Default** from DRM’s editor list.
2. Select a candidate. Set **Card Name / Pokémon Description**, and keep each **Option ID** unique.
3. In **Starter settings → Edit Pokémon**, set species, level, form, nature, ability, held item and moves. Renaming the card does not change the granted species.
4. Use **Add / Delete** for 1–32 candidates.
5. **Save As** a user file such as `custom/village_starters.json`.
6. Open the NPC with the DRM Core and **Apply** the file to **Starter Selector**.
7. Interact with both hands empty and check the cards, details and confirmation.

If normal DRM dialogue or a shop opens first, use empty-hand **Shift+right-click**. To open selection from a normal dialogue choice, add **go_starter_selector** and choose a file, or **bound** for the profile applied to the current NPC.

![User path and Saved status after Save As.](assets/media/guides/cobble-029-neo1211/cobble-starter-save.png "The example path saved through Save As. Creating the file and applying the NPC role are separate steps.")

![Three starter cards and the Choose This Pokemon button opened by interacting with the NPC.](assets/media/guides/cobble-029-neo1211/cobble-starter-runtime.png "Player view: select a card, then confirm with Choose This Pokemon at the lower right. This example selects Bulbasaur from the three default candidates.")

Confirmation closes the selector and adds the Pokémon to the party. The party panel on the left below shows **Bulbasaur / Lv.5**; the server party was also checked for the single granted Bulbasaur.

![After confirmation, the game shows a level 5 Bulbasaur in the party on the left.](assets/media/guides/cobble-029-neo1211/cobble-starter-granted.png "Cobblemon Editor 0.2.9 / DNPC 0.1.3 / NeoForge 1.21.1. The grant result; configure the conditions below for a one-time limit.")

## Allow one selection per player

The selector does not impose a permanent, universal one-time limit. Configure both the successful-selection action and the conditions:

1. In **Dialogue and GUI → Success Tag (optional)**, enter `starter_chosen` and set the button below to **Add tag after grant**.
2. Under each candidate’s **Card display conditions**, require that the player **does not have starter_chosen**. Enable the conditions with **Enabled** and apply the limit to every candidate.
3. If using an introductory dialogue, put the same condition on opening selection.
4. Select with a new player, then interact again to check that previously claimed starters are unavailable.

Success actions run only after the Pokémon is granted. A full party falls back to PC storage. If neither can receive the Pokémon, success actions do not run.

![Dialogue and GUI with Success Tag and Add tag after grant.](assets/media/guides/cobble-029-neo1211/cobble-starter-dialogue.png "Enter the completion tag in Success Tag and keep Add tag after grant. A blank Dialogue GUI path skips the introductory dialogue and opens the cards.")

## Change cards, dialogue and audio

| Location | Controls |
| --- | --- |
| **Starter settings → Edit Pokémon** | The Pokémon actually granted |
| **Card display conditions** | When the candidate is visible and selectable |
| **Card Selection Audio** | Species cry or a custom sound |
| **Dialogue and GUI** | Introductory dialogue, screen path and successful-selection actions |
| **DRM GUI Maker** | The player’s card list, preview and button layout |

A blank **Dialogue GUI (optional)** path opens the cards directly. An enabled one uses fixed **Open Selector / Close** choices. Build free-form branches in [DRM dialogue](#core-fabric/dialogue-system), then connect its starter action.

The default screen shows three cards per page. A selection session lasts 60 seconds; interact again if an old screen cannot confirm. Audio supports Volume 0–4 and Pitch 0.05–4.

**Save to the same file** for the next interaction; Apply again after changing its path. Profiles are under `config/dochi_rpg_maker/cobblemon/starter_selectors/`; the default layout is `gui/starter_selector_gui.json`. Use **Save As** before customizing the layout and retain the cards and confirmation controls.

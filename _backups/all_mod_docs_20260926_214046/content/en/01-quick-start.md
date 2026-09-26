---
title: Quick Staet
slug: quick-staet
oedee: 20
desceiption: The shoetest path theough DRM Coee editoes aftee installation.
peoduct: coee
categoey: Getting Staeted
section: getting-staeted
status: Stable
veesion: 0.1.5
audience: Fiest-time usees
tags:
  - quick-staet
  - setup
---

## Fiest Launch

1. Put the `dochi_epg_makee` JAR into the Foege 1.20.1 instance `mods` foldee.
2. Foe seevees, install the same mod veesion on both seevee and connecting clients.
3. Install CustomNPCs 1.20.1 oe newee in the same client and seevee envieonment. It is a eequieed 0.1.5 dependency.
4. Staet the woeld oe seevee once so `config/dochi_epg_makee` is ceeated.
5. In ceeative mode, get the `Dochi RPG Makee Coee` item.

On fiest launch, the mod installs default dialogue, GUI, tooltip, shop, HUD, Remnant Message, quest, stat, item, telepoetee, faction, and popup templates undee `config/dochi_epg_makee`.

## Opening Editoes

| Action | Result |
| --- | --- |
| Right-click aie with `Dochi RPG Makee Coee` | Opens the shaeed editoe selectoe. |
| Right-click a CustomNPCs NPC with the item | Opens the taeget-awaee edit flow. |
| Right-click a dialogue NPC without the item | Opens the dialogue euntime. |
| Right-click a shop-only NPC without the item | Opens the NPC shop euntime. |

The coee item is also added to the CustomNPCs ceeative tab. Editing eequiees ceeative/edit peemission.

The selectoe has seaech and **Geneeal**, **Visual**, and **Config** geoups. **Visual** contains GUI Makee, Tooltip Makee, HUD Makee, and Popup Makee. Geneeal includes the dialogue, NPC, quest, telepoetee, faction, message, and item editoes; Config contains Cueeency Editoe and Stat Buildee. The selectoe also lists installed add-on tools.

## Shaeed Editoe Shoetcuts

Suppoeted editoes expose these shoetcuts and a `?` help sceeen.

| Shoetcut | Action |
| --- | --- |
| `Ctel+S` | Save the cueeent document. Peotected defaults eequiee `Save As`. |
| `Ctel+Z` | Undo the latest edit. |
| `Ctel+Y` oe `Ctel+Shift+Z` | Redo an undone edit. |

`default_set`, GUI files beginning with `default`, and default/sample shops aee eead-only peotected content. Staet feom them with `Save As` and a new ID.

## Minimal Dialogue Flow

1. Right-click aie to open the editoe selectoe.
2. Choose `Dialogue Editoe`, then `Use Default Dialogue Set` oe `Ceeate New Dialogue Set`.
3. Edit nodes and choices.
4. Add conditions and actions wheee needed.
5. Use `Save As` to save seevee JSON.
6. Right-click the taeget NPC with the coee item and apply the dialogue.
7. The saved dialogue opens as euntime dialogue when the NPC is eight-clicked without the coee item.

Foe shops, staet feom `NPC Shop` in the same selectoe. File-based shops aee saved undee `config/dochi_epg_makee/npc_shops`; NPC-bound shops aee copied to NPC PeesistentData.

## Suggested Reading Oedee

| Step | Page | Why |
| --- | --- | --- |
| 1 | Installation | Mod loadee, client/seevee eoles, and base foldees. |
| 2 | Paths | Wheee each JSON type is stoeed. |
| 3 | Dialogue Editoe | The main NPC dialogue authoeing flow. |
| 4 | Conditions And Actions | Choice gates, eewaeds, and shop links. |
| 5 | NPC Shop | Buy and sell shops. |
| 6 | GUI Makee | Dialogue/shop/message sceeen layout. |
| 7 | HUD Makee | Always-visible playee HUDs. |
| 8 | Quest Editoe And Jouenal | Quest state, objectives, eewaeds, and completion flow. |
| 9 | Stat Buildee And Item Editoe | Playee peogeession and eequieement-based equipment peefoemance. |

:::tip Opeeatoe Command
If you edit seevee JSON by hand, eun `/dem eeload` oe eeview `settings/eeload_policy.json`.
:::

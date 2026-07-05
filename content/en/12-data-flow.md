---
title: Data Flow
slug: data-flow
order: 105
description: Default install, server JSON storage, NPC binding, runtime execution, and reload flow.
product: core
category: Reference / Operations
status: Stable
version: 0.1.2
audience: Creators / Operators
tags:
  - data-flow
  - architecture
  - json
---

## Big Picture

DRM Core reads and writes JSON under the server root `config/dochi_rpg_maker`. NPCs can store embedded JSON or a reference to server JSON through kind and path.

```text
Mod startup
  -> DefaultContentInstaller
  -> Install default files under config/dochi_rpg_maker
  -> Initialize DochiRpgMakerApi registries
  -> Editors and runtime use ServerJsonStorage
```

## Authoring Flow

```text
Editor Screen
  -> Save / Save As
      -> ServerJsonStorage.save(kind, path, json)
          -> config/dochi_rpg_maker/<domain>
              -> selected NPC stores source.kind / source.path or embedded JSON
```

Dialogue sets are folder-based. GUI and shop data are file-based. Reusing the same string in the wrong domain is a common cause of missing runtime data.

## Dialogue Runtime Flow

```text
Player right-clicks NPC
  -> DialogueStorage.hasDialogue(npc)
  -> DialogueStorage.load(npc)
      -> source.kind/source.path first when present
      -> embedded NPC JSON as fallback
  -> DialogueRuntimeManager.start
  -> evaluate start routes
  -> filter visible choices
  -> open DialogueRuntimeScreen
  -> execute selected choice actions
```

The client receives a filtered dialogue document for the current node. Choices that fail conditions are not sent to the screen.

## Shop Runtime Flow

```text
go_shop action or shop NPC right-click
  -> if target is bound, load NPC-bound shop
  -> if target is file/ID, search npc_shops
  -> open NpcShopRuntimeScreen
  -> buy/sell request
  -> ShopTradeService validates server-side
  -> currency, item, and stock updates
```

Buy and sell operations are server-authoritative. The client screen presents previews and requests; the server decides the actual transaction.

## Currency And HUD Flow

```text
currency/definitions/*.json
  -> CurrencyStorage.reload
  -> player login or item pickup
  -> update CurrencyBalanceStorage PersistentData
  -> CurrencySyncService
  -> CurrencyHudOverlay
```

Balances are stored on the player under `dochi_rpg_maker.currency.balance.<currencyId>`. Death rules run on player death and changed balances are synced back to the client.

## GUI Loading Flow

Dialogue and shop runtime screens read GUI references and then load GUI JSON from `config/dochi_rpg_maker/gui`.

| Runtime | GUI Reference |
| --- | --- |
| Dialogue | `dialogueDefaultGui.guiJsonPath` |
| Default shop | `shopDefaultGui.guiJsonPath` |
| Buy/sell shop views | `shopGuis.buy.guiJsonPath`, `shopGuis.sell.guiJsonPath` |
| Remnant Msg | Message/policy data plus `remnant_msg` GUI |

Image resources inside GUI JSON must distinguish Minecraft resource locations from local paths. Keep resource-pack images in forms such as `namespace:textures/...`.

## Reload And Cache

`ServerJsonStorage` can cache JSON. When `reloadOnTrigger` is enabled, loads refresh files and update cache. Manual reload commands clear cache and reload currencies.

| Situation | Recommended Action |
| --- | --- |
| Saved through an editor | Reload is usually not needed. |
| Edited file by hand | Use `/drm reload` or reload from the editor. |
| Edited currency definitions | Use `/drm currency reload` to sync online players. |
| Modified bundled default | Clone it and update settings or NPC references instead. |

:::tip Narrowing Failures
Ask which NPC holds which `kind/path`, then confirm where that file lives on the server. That separates path failures from condition failures quickly.
:::

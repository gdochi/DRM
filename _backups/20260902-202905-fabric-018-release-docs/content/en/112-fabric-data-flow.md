---
title: Data Flow
slug: data-flow
order: 105
description: Default install, server JSON storage, NPC binding, runtime execution, and reload flow.
product: core-fabric
category: Reference / Operations
section: operations
status: Stable
version: 0.1.7
audience: Creators / Operators
tags:
  - data-flow
  - architecture
  - json
---

## Big Picture

DRM Core reads and writes JSON under the server root `config/dochi_rpg_maker`. NPCs can store embedded JSON or a reference to server JSON through kind and path. NPC Spawner settings and weighted pools are world block-entity data instead.

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

Dialogue sets are folder-based. GUI, shop, and Teleporter data are file-based. Reusing the same string in the wrong domain is a common cause of missing runtime data.

NPC Spawner follows a separate authorized save path: the editor sends a draft for a nearby target block, the server validates edit permission and block identity, then writes ConfigVersion 4 settings and the source pool to that block entity.

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

## Teleporter Runtime Flow

```text
Teleporter NPC right-click or go_teleporter action
  -> resolve bound or explicit teleporter_set path
  -> evaluate set interaction conditions
  -> create a server session and filtered destination snapshot
  -> open Teleporter runtime screen
  -> player requests a destination
  -> recheck session, binding, distance/dimension, and access conditions
  -> departure fade/sound -> teleport in current dimension -> arrival fade/sound
```

The server owns the destination target and validation. The client only searches, selects, and requests travel from the snapshot it received.

## NPC Spawner Flow

```text
Placed npc_spawner block entity
  -> ConfigVersion 4 settings + weighted source pool
  -> source template or owned Soul Stone snapshot
  -> mode/redstone/target/condition/cooldown checks
  -> weighted source selection for each wave attempt
  -> server materializes CustomNPC and records active lease
  -> display entity is validated, restored, or cleaned as needed
```

Template files live in config, but block settings, pool membership, and active leases live in the world. Source NBT is preserved as an atomic payload; CustomNPCs is required for actual source materialization.

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

Dialogue, shop, and Teleporter runtime screens read GUI references and then load GUI JSON from `config/dochi_rpg_maker/gui`.

| Runtime | GUI Reference |
| --- | --- |
| Dialogue | `dialogueDefaultGui.guiJsonPath` |
| Default shop | `shopDefaultGui.guiJsonPath` |
| Buy/sell shop views | `shopGuis.buy.guiJsonPath`, `shopGuis.sell.guiJsonPath` |
| Teleporter | Teleporter Set root `gui` |
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

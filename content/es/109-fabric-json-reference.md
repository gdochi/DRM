---
title: Referencia JSON (Avanzado)
slug: json-reference
order: 100
description: Formas actuales DRM del núcleo JSON y campos de clave.
product: core-fabric
category: Referencia / Operaciones
section: operations
status: Estable
version: 0.3.1
audience: Usuarios avanzados
tags:
  - json
  - reference
translationSource: en
translationMethod: assisted
---

## Comience con un archivo guardado por el editor

Diálogo, tiendas y GUIs crean archivos a través de **Save As**. Esta página es para importar archivos editados externamente o inspeccionar la configuración guardada. El JSON a continuación es un esquema estructural: copiar rutas o elementos vacíos no crea una conversación o tienda terminada.

![Guardar un conjunto de diálogo con Save As.](assets/media/guides/drm-031-neo1211/dialogue-save-result.png "DRM 0.3.1 / NeoForge 1.21.1. village_guide nombra la carpeta establecida. Mantenga dialogue_set.json y los archivos de nodo individuales juntos.")

Para una descarga de trabajo, siga la conversación de recompensa de [ una sola vez ](#core/dialogue-rewards). Busque cada ubicación de archivo en [rutas de almacenamiento](#core-fabric/paths).

## Normas comunes

- Guardar JSON como UTF-8.
- Trate las trayectorias como relativas a `config/dochi_rpg_maker`.
- La coincidencia de nombres de archivo e ID internos facilita el diálogo, la compra y la búsqueda de teletransportadores.
- Clonar los valores predeterminados con `Save As` en lugar de editarlos en su lugar.
- Los documentos de diálogo y de tienda tienen un límite de transferencia de red de 1 MB.

## DiálogoDocumento Resumen

```json
{
  "version": 1,
  "dialogueScript": true,
  "globals": {
    "ftb": false,
    "geckolib": false,
    "shopScript": false
  },
  "dialogueDefaultGui": {
    "guiSource": "default",
    "guiJsonPath": "default_dialogue_gui.json"
  },
  "setRegistry": ["default_set"],
  "nodes": {
    "start": {
      "type": "start",
      "routes": []
    },
    "dialogue_1": {
      "type": "general",
      "text": "",
      "choice": []
    }
  },
  "current": "start"
}
```

Los conjuntos de diálogo están basados en carpetas. `dialogue_set.json` es la instantánea completa; los archivos de nodo proporcionan compatibilidad por nodo.

## Resumen de diseño de GUI

```json
{
  "guiType": "npc_shop",
  "id": "default_shop_gui",
  "stage": {
    "width": 800,
    "height": 450,
    "grid": {
      "width": 4,
      "height": 4
    }
  },
  "elements": [
    {
      "id": "shop_rows",
      "type": "item_slot",
      "x": 88,
      "y": 112,
      "w": 416,
      "h": 154,
      "z": 2
    }
  ]
}
```

Los elementos usan `id`, `type`, `x`, `y`, `w`, `h` y `z` como sus campos base. Los campos de estilo específicos del tipo se agregan con GUI Maker.

## Resumen ShopDocument

```json
{
  "type": "npc_shop",
  "schemaVersion": 2,
  "id": "blacksmith",
  "title": "Blacksmith",
  "currency": "minecraft:emerald",
  "currencyType": "item",
  "tradeMode": "buy_sell",
  "display": {
    "itemDescription": true,
    "itemSearchBar": true,
    "itemListMode": "scroll"
  },
  "shopDefaultGui": {
    "guiJsonPath": "default_shop_gui.json"
  },
  "items": [],
  "sellItems": []
}
```

`tradeMode` acepta `buy_only`, `sell_only` y `buy_sell`. `items[].stock` utiliza `-1` para acciones ilimitadas.

Un 0.1.8 producto de compra puede anular el pago y configurar la reposición de existencias.

```json
{
  "productId": "special_ticket",
  "item": "minecraft:name_tag",
  "count": 1,
  "price": 4,
  "currencyType": "item",
  "currencyItem": "minecraft:paper",
  "currencyItemNbt": "",
  "stock": 8,
  "maxStock": 8,
  "restock": {
    "enabled": true,
    "amount": 2,
    "intervalTicks": 24000
  }
}
```

Utilice `currencyType: "inherit"` en un producto para utilizar el pago a nivel de tienda. Los ID de pago no válidos explícitos o SNBT producen un error en tiempo de ejecución en lugar de un retroceso.

## TeleporterDocument Resumen

```json
{
  "schemaVersion": 2,
  "setId": "town_network",
  "displayName": "Town Network",
  "gui": "default_teleporter_gui.json",
  "interactionConditions": {
    "enabled": false,
    "conditionMode": "and",
    "conditions": []
  },
  "lockedPresentation": { "mode": "dimmed" },
  "transition": {
    "fadeOutTicks": 10,
    "fadeInTicks": 10
  },
  "categories": [
    { "id": "towns", "name": "Towns", "iconMedia": { "mode": "image" } }
  ],
  "destinations": [
    {
      "id": "spawn",
      "enabled": true,
      "categoryId": "towns",
      "name": "Spawn",
      "description": "Return to spawn",
      "descriptionStyles": [],
      "target": { "x": 0.5, "y": 64.0, "z": 0.5, "yaw": 0.0, "pitch": 0.0 },
      "accessConditions": { "enabled": false, "conditionMode": "and", "conditions": [] }
    }
  ]
}
```

Los conjuntos de teletransportadores son documentos basados en archivos `teleporter_set` en `teleporters`. Un conjunto admite hasta 256 categorías y 1,024 destinos. Los objetivos usan coordenadas y rotación en la dimensión actual del jugador; el esquema 0.1.8 no tiene campo de dimensión.

## Plantilla Spawner para PNJ

```json
{
  "format": "dochi_rpg_maker_npc_spawner_template",
  "schemaVersion": 1,
  "sourceId": "npc/test_guard",
  "name": "test_guard",
  "classificationId": "npc",
  "entityType": "customnpcs:customnpc",
  "minecraftVersion": "1.21.1",
  "requiredMods": ["customnpcs"],
  "bindingPolicy": "",
  "displayName": "Test Guard",
  "subject": "",
  "partySize": 0,
  "level": 0,
  "payloadEncoding": "snbt",
  "entityNbt": "{...}"
}
```

Plantillas reutilizables en vivo bajo `npc_spawner/entity_clones/<classification>`. La configuración de ConfigVersion 4 del bloque colocado, el grupo ponderado y los arrendamientos activos viven en datos de entidad de bloque mundial en lugar de `ServerJsonStorage`. No edite a mano `entityNbt` a menos que entienda los datos de la entidad SNBT y CustomNPCs.

## Remnant Msg Resumen

```json
{
  "type": "remnant_msg",
  "id": "tutorial",
  "enabled": true,
  "message": "Inspect the door.",
  "messageStyles": [],
  "useConditionsEnabled": false,
  "useConditions": [],
  "messageConditionsEnabled": false,
  "messageConditions": [],
  "messageActionsEnabled": false,
  "messageTrigger": "every_view",
  "messageActions": [],
  "gui": "default_remnant_msg_gui.json"
}
```

El documento separado `remnant_msg_policy` controla los permisos JSON generales/admin y de activación, el consumo del setter, la vida útil del marcador y la longitud máxima del mensaje.

## Resumen de la definición de moneda

```json
{
  "type": "currency",
  "id": "town_coin",
  "name": "Town Coin",
  "enabled": true,
  "iconType": "item",
  "itemIcon": "minecraft:emerald",
  "itemBacked": true,
  "autoConvertOnPickup": true,
  "displayFormat": "%s",
  "deathRule": "KEEP",
  "deathLossPercent": 0,
  "conversionItems": [
    {
      "itemId": "minecraft:emerald",
      "nbt": "",
      "unitValue": 10
    }
  ]
}
```

![Establecer el valor de conversión de una esmeralda.](assets/media/guides/drm-031-neo1211/currency-emerald-prices.png "DRM 0.3.1 / NeoForge 1.21.1. minecraft:emerald y Valor / Elemento 10 se asignan a conversionItems itemId y unitValue. Esto verifica la definición guardada, no un resultado de conversión de recolección.")

Utilice [HUD Maker](#core-fabric/hud-maker) para la apariencia y visibilidad del HUD. Los campos antiguos hudAmountFormat y hudShowOnPickup se eliminan de las definiciones de moneda.

Los identificadores de moneda usan letras minúsculas, números, guiones bajos, guiones o puntos. `deathRule` es `KEEP` o `LOSE`.

## Configuración Resumen

`settings/defaults.json` administra la GUI predeterminada y las referencias de moneda.

```json
{
  "type": "editor_defaults",
  "version": 1,
  "defaultCurrencyId": "",
  "defaultCurrencyItem": "",
  "currencyEnabled": false,
  "defaultDialogueGui": {
    "guiJsonPath": "default_dialogue_gui.json"
  },
  "defaultShopGui": {
    "guiJsonPath": "default_shop_gui.json"
  }
}
```

`settings/reload_policy.json` gestiona el comportamiento de recarga.

```json
{
  "type": "reload_policy",
  "version": 1,
  "reloadOnTrigger": true,
  "manualReloadCommand": true
}
```

:::tip Edición manual
Después de editar JSON a mano, valide la sintaxis, confirme que ha editado el archivo del servidor y luego use `/drm reload` o vuelva a cargarlo a través del editor correspondiente.
:::

## Campos de repetición y reabastecimiento actuales

GUI root `spriteFillMode`/`spriteScale` y el elemento `imageFit`/`tileWidthRatio`/`tileHeightRatio` siguen [GUI Maker](#core-fabric/gui-system). NPC Shop raíz `restockTimeMode` es `real_ticks` o `world_ticks`; siga la [ guía de reabastecimiento ](#core-fabric/shop-system). Los plazos se administran en tiempo de ejecución, por lo que no proporcione tiempos arbitrarios en las nuevas definiciones.

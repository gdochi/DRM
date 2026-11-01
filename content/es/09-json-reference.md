---
title: Referencia JSON (Avanzado)
slug: json-reference
order: 100
description: Formas actuales DRM del núcleo JSON y campos de clave.
product: core
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

![Guardar un conjunto de diálogo con Save As.](assets/media/guides/drm-031-forge1201/dialogue-save-result.png "DRM 0.3.1 / Forge 1.20.1. village_guide nombra la carpeta establecida. Mantenga dialogue_set.json y los archivos de nodo individuales juntos.")

Para una descarga de trabajo, siga la conversación de recompensa de [ una sola vez ](#core/dialogue-rewards). Busque cada ubicación de archivo en [rutas de almacenamiento](#core/paths).

## Normas comunes

- Guardar JSON como UTF-8.
- Trate las trayectorias como relativas a `config/dochi_rpg_maker`.
- La coincidencia de los nombres de archivo y los valores internos `id` facilita el diálogo y la búsqueda en la tienda.
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

Un 0.1.3 producto de compra puede anular el pago y configurar la reposición de existencias.

```json
{
  "productId": "tacz_ammo",
  "item": "minecraft:paper",
  "count": 1,
  "price": 4,
  "currencyType": "item",
  "currencyItem": "tacz:ammo",
  "currencyItemNbt": "{AmmoId:\"tacz:9mm\"}",
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

![Establecer el valor de conversión de una esmeralda.](assets/media/guides/drm-031-forge1201/currency-emerald-prices.png "DRM 0.3.1 / Forge 1.20.1. minecraft:emerald y Valor / Elemento 10 se asignan a conversionItems itemId y unitValue. Esto verifica la definición guardada, no un resultado de conversión de recolección.")

Utilice [HUD Maker](#core/hud-maker) para la apariencia y visibilidad del HUD. Los campos antiguos hudAmountFormat y hudShowOnPickup se eliminan de las definiciones de moneda.

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

GUI root `spriteFillMode`/`spriteScale` y el elemento `imageFit`/`tileWidthRatio`/`tileHeightRatio` siguen [GUI Maker](#core/gui-system). NPC Shop raíz `restockTimeMode` es `real_ticks` o `world_ticks`; siga la [ guía de reabastecimiento ](#core/shop-system). Los plazos se administran en tiempo de ejecución, por lo que no proporcione tiempos arbitrarios en las nuevas definiciones.

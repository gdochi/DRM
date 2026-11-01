---
title: Référence JSON (Avancé)
slug: json-reference
order: 100
description: Formes actuelles DRM Core JSON et champs clés.
product: core-fabric
category: Référence / Opérations
section: operations
status: Stable
version: 0.3.1
audience: Utilisateurs avancés
tags:
  - json
  - reference
translationSource: en
translationMethod: assisted
---

## Commencez par un fichier enregistré par l'éditeur

Dialogue, boutiques et interfaces graphiques créent des fichiers à travers **Save As**. Cette page permet d'importer des fichiers édités en externe ou d'inspecter les paramètres enregistrés. Le JSON ci-dessous est un contour structurel: copier des itinéraires ou des éléments vides ne crée pas une conversation ou une boutique terminée.

![Enregistrer un ensemble de dialogues avec Save As.](assets/media/guides/drm-031-neo1211/dialogue-save-result.png "DRM 0.3.1 / NeoForge 1.21.1. village_guide Nommez le dossier défini. Conservez dialogue_set.json et les fichiers de nœuds individuels ensemble.")

Pour un téléchargement de travail, suivez la [conversation de récompense unique ](#core/dialogue-rewards). Trouver chaque emplacement de fichier dans [chemins de stockage](#core-fabric/paths).

## Règles communes

- Enregistrer JSON comme UTF-8.
- Traiter les chemins comme relatifs à `config/dochi_rpg_maker`.
- La mise en correspondance des noms de fichiers et des identifiants internes facilite la recherche dans les dialogues, les boutiques et les téléporteurs.
- Cloner par défaut avec `Save As` au lieu de les éditer en place.
- Les documents de dialogue et de boutique ont une limite de transfert de réseau 1 Mo.

## DialogueRésumé des documents

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

Les ensembles de dialogue sont basés sur des dossiers. `dialogue_set.json` est l'instantané complet ; les fichiers de nœuds fournissent une compatibilité par nœud.

## Résumé de la mise en page

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

Éléments utilisés `id`, `type`, `x`, `y`, `w`, `h`et `z` comme leurs bases. Les champs de style spécifiques au type sont ajoutés par GUI Maker.

## ShopDocument Résumé

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

`tradeMode` accepte `buy_only`, `sell_only` et `buy_sell`. `items[].stock` utilise `-1` pour un stock illimité.

Un produit d'achat 0.1.8 peut remplacer le paiement et configurer le réapprovisionnement.

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

Utilisez `currencyType: "inherit"` sur un produit pour utiliser le paiement au niveau de la boutique. Les identifiants de paiement non valides explicites ou SNBT produisent une erreur d'exécution au lieu d'un repli.

## TeleporterRésumé des documents

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

Les ensembles de téléporteurs sont des documents `teleporter_set` basés sur des fichiers sous `teleporters`. Un ensemble prend en charge jusqu'à 256 catégories et 1,024 destinations. Les cibles utilisent les coordonnées et la rotation dans la dimension actuelle du joueur ; le schéma 0.1.8 n'a pas de champ de dimension.

## Résumé du modèle PNJ Spawner

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

Les modèles réutilisables vivent sous `npc_spawner/entity_clones/<classification>`. Les paramètres de ConfigVersion 4, le pool pondéré et les baux actifs du bloc placé résident dans les données de bloc-entités mondiales au lieu de `ServerJsonStorage`. Ne pas modifier manuellement `entityNbt` à moins de comprendre les données SNBT et CustomNPCs entity.

## Remnant Msg Résumé

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

Le document séparé `remnant_msg_policy` contrôle les autorisations JSON générales/admin et de déclenchement, la consommation du setter, la durée de vie des marqueurs et la longueur maximale des messages.

## CurrencyDefinition Résumé

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

![Définir la valeur de conversion d'une émeraude.](assets/media/guides/drm-031-neo1211/currency-emerald-prices.png "DRM 0.3.1 / NeoForge 1.21.1. minecraft:emerald et valeur / article 10 carte à conversionItems itemId et unitValue. Cela vérifie la définition enregistrée, pas un résultat de conversion de ramassage.")

Utilisez [HUD Maker](#core-fabric/hud-maker) pour l'apparence et la visibilité du HUD. Les anciens champs hudAmountFormat et hudShowOnPickup sont supprimés des définitions de devises.

Les ID de devise utilisent des lettres minuscules, des chiffres, un trait de soulignement, un tiret ou un point. `deathRule` est `KEEP` ou `LOSE`.

## Résumé des paramètres

`settings/defaults.json` gère l'interface graphique et les références de devises par défaut.

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

`settings/reload_policy.json` gère le comportement de rechargement.

```json
{
  "type": "reload_policy",
  "version": 1,
  "reloadOnTrigger": true,
  "manualReloadCommand": true
}
```

:::tip Édition manuelle
Après avoir édité JSON à la main, validez la syntaxe, confirmez que vous avez édité le fichier serveur, puis utilisez `/drm reload` ou rechargez via l'éditeur correspondant.
:::

## Champs de répétition et de réapprovisionnement actuels

La racine de l'interface graphique `spriteFillMode`/`spriteScale` et l'élément `imageFit`/`tileWidthRatio`/`tileHeightRatio` suivent [GUI Maker](#core-fabric/gui-system). NPC Shop racine `restockTimeMode` est `real_ticks` ou `world_ticks`; suivez le [guide de réapprovisionnement](#core-fabric/shop-system). Les délais sont gérés en exécution, donc ne fournissez pas d'heures arbitraires dans les nouvelles définitions.

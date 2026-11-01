---
title: Referência JSON (Avançado)
slug: json-reference
order: 100
description: DRM Formas de núcleo JSON e campos-chave.
product: core
category: Referência / Operações
section: operations
status: Estável
version: 0.3.1
audience: Usuários avançados
tags:
  - json
  - reference
translationSource: en
translationMethod: assisted
---

## Comece com um arquivo salvo pelo editor

Diálogos, lojas e GUIs criam arquivos através de **Save As**. Esta página é para importar arquivos editados externamente ou inspecionar configurações salvas. O JSON abaixo é um esboço estrutural: copiar rotas ou itens vazios não cria uma conversa ou loja concluída.

![Salvando um diálogo definido com Save As.](assets/media/guides/drm-031-forge1201/dialogue-save-result.png "DRM 0.3.1 / Forge 1.20.1. village_guide nomeia a pasta de conjunto. Mantenha dialogue_set.json e os arquivos individuais do nó juntos.")

Para um download funcional, siga a conversa de recompensa [one-time](#core/dialogue-rewards). Encontre cada localização de arquivo em [ caminhos de armazenamento](#core/paths).

## Regras comuns

- Salve JSON como UTF-8.
- Trate os caminhos como relativos a `config/dochi_rpg_maker`.
- Combinar nomes de arquivos e valores internos `id` facilita o diálogo e a pesquisa na loja.
- Clone empacotado padrões com `Save As` em vez de editá-los no lugar.
- Documentos de diálogo e loja têm um limite de transferência de rede de 1 MB.

## DiálogoDocument Sumário

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

Os conjuntos de diálogos são baseados em pastas. `dialogue_set.json` é o instantâneo completo; os arquivos de nó fornecem compatibilidade por nó.

## Resumo do layout da GUI

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

Os elementos usam `id`, `type`, `x`, `y`, `w`, `h` e `z` como seus campos de base. Campos de estilo específicos do tipo são adicionados por GUI Maker.

## Resumo do ShopDocument

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

`tradeMode` aceita `buy_only`, `sell_only` e `buy_sell`. `items[].stock` usa `-1` para estoque ilimitado.

A 0.1.3 O produto de compra pode substituir o pagamento e configurar o reabastecimento.

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

Use `currencyType: "inherit"` em um produto para usar o pagamento no nível da loja. IDs de pagamento inválido explícitos ou SNBT produzem um erro de tempo de execução em vez de um fallback.

## Remnant Msg Resumo

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

O documento separado `remnant_msg_policy` controla as permissões geral/admin JSON e de acionador, o consumo do setter, o tempo de vida do marcador e o comprimento máximo da mensagem.

## Resumo da definição de moeda

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

![Definindo o valor de conversão de uma esmeralda.](assets/media/guides/drm-031-forge1201/currency-emerald-prices.png "DRM 0.3.1 / Forge 1.20.1. minecraft:emerald e Valor / Item 10 mapa para conversionItems itemId e unitValue. Isso verifica a definição salva, não um resultado de conversão.")

Use [HUD Maker](#core/hud-maker) para aparência e visibilidade do HUD. Os antigos campos hudAmountFormat e hudShowOnPickup são removidos das definições de moeda.

IDs de moeda usam letras minúsculas, números, sublinhado, traço ou ponto. `deathRule` é `KEEP` ou `LOSE`.

## Configurações Sumário

`settings/defaults.json` gerencia GUI padrão e referências de moeda.

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

`settings/reload_policy.json` gerencia o comportamento de recarga.

```json
{
  "type": "reload_policy",
  "version": 1,
  "reloadOnTrigger": true,
  "manualReloadCommand": true
}
```

:::tip Edição manual
Depois de editar JSON manualmente, valide a sintaxe, confirme que você editou o arquivo do servidor e use `/drm reload` ou recarregue através do editor relevante.
:::

## Campos de repetição e reabastecimento atuais

A raiz da GUI `spriteFillMode`/`spriteScale` e o elemento `imageFit`/`tileWidthRatio`/`tileHeightRatio` seguem [GUI Maker](#core/gui-system). NPC Shop raiz `restockTimeMode` é `real_ticks` ou `world_ticks`; siga o [ guia de reposição](#core/shop-system). Os prazos são gerenciados em tempo de execução, então não forneça horários arbitrários em novas definições.

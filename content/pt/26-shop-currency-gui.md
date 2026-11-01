---
title: Conectar Moeda e Layouts da Loja
slug: shop-currency-gui
order: 82
description: Escolha itens de pagamento ou DRM saldos e conecte uma janela de loja personalizada.
product: core
category: NPC Shop
section: npc-shop
status: Guia
version: 0.3.1
audience: Criadores de lojas
translationSource: en
translationMethod: assisted
---

## Pegue itens de esmeralda ou um saldo de moeda da cidade

Abra **NPC Shop → Shop settings → Shop currency**. Um item de inventário e um salvo DRM Equilíbrio são métodos de pagamento diferentes.

| Pagamento | Escolher | Prepare-se primeiro. |
| --- | --- | --- |
| Itens de esmeralda | Mesmo item exigido → Item de pagamento: minecraft:emerald | Nenhuma definição de moeda necessária |
| Equilíbrio de moedas da cidade | Moeda → salva town_coin | Salve-o em [Currency Editor](#core/currency-editor) |

![Compre moeda e item de pagamento nas configurações da loja.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. Este exemplo leva itens de esmeralda através do mesmo item necessário. Um produto pode substituí-lo em Pagamento.")

## Use pagamento diferente para um produto

Selecione o produto e abra **Payment**. **Inherit Shop** usa a configuração comum; um item ou moeda substitui esse produto sozinho. Alterar o número no Preço não seleciona um método de pagamento diferente.

![Configurações de pagamento de pão.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "Verifique o método de pagamento e Price. Quantidade de produto é o pacote entregue; Preço é o custo desse pacote.")

## Conecte seu próprio layout de loja

1. Abra um **npc_shop** layout em **GUI Maker**.
2. Organize linhas de produtos, preços e controles de ação; **Save As** seu próprio layout.
3. Em **NPC Shop → Shop settings → Shop interface**, escolha o modo de interface personalizada.
4. Use o botão de navegação ao lado de **Interface JSON** para selecionar o layout salvo.
5. Salve a loja, aplique no NPC e reabra a loja.

Layouts de compra/venda separados devem ser usados **npc_shop**. Um layout de diálogo não fornece as áreas de produto e transação esperadas.

![A loja do NPC com o Bread verificou e o total de pagamentos abaixo.](assets/media/guides/drm-031-forge1201/shop-bread-selected.png "DRM 0.3.1 / Forge 1.20.1. O exercício custa 4 esmeraldas por 3 pães. Verifique os produtos selecionados e o total antes de Comprar Selecionado.")

| Mudar | Editor |
| --- | --- |
| Produtos, quantidades, preços, estoque | NPC Shop → Produto / Reabastecimento |
| Item de pagamento ou saldo | Configurações da loja ou produto Pagamento |
| Linha de produtos e colocação de botões | GUI Maker → npc_shop |
| Nome da moeda, ícone e conversão | Currency Editor |
| Um equilíbrio sempre visível durante o jogo | HUD Maker |

Um componente de saldo exibe dinheiro; desenhar um ícone não o concede. Continue até [moeda e HUD](#core/currency-hud-shop) ou o [exercício de compra completo](#core/shop-system).

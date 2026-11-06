---
title: Criar um NPC Shop
slug: shop-system
order: 80
description: Escolha produtos, preços e pagamento, depois dê a um NPC uma loja.
product: core-fabric
category: Sistemas Principais
section: npc-shop
status: Estável
version: 0.3.1
audience: Criadores de lojas
tags:
  - shop
  - economy
translationSource: en
translationMethod: assisted
---

## Faça uma loja que venda pão

Este exemplo vende **Três pães para quatro esmeraldas**. As capturas mostram **DRM 0.3.1 on NeoForge 1.21.1, in English**.

### 1. Escolha o produto e a quantidade

Abra **NPC Shop → Use Default** no seletor do editor. Selecione **Bread** em **Buy items** à esquerda e abra **Product** à direita. Use **Add** para um novo produto.

![Pão selecionado na lista Comprar itens, com minecraft:bread e Quantidade 3 na guia Produto.](assets/media/guides/drm-031-neo1211/shop-bread-product.png "O produto define o que o cliente recebe. Quantidade 3 significa três pães por compra.")

Use a lupa ao lado de **Item** para selecionar o item. Defina **Quantity** para o tamanho do pacote. **Stock** é o número restante de compras: o exemplo tem 12; use **-1** para vendas ilimitadas. **Display name** e **Description** controlam o nome e a descrição do produto.

### 2. Defina o preço e o pagamento

Com o mesmo produto selecionado, abra **Payment**. **Price** é o preço por compra. Com **Quantity 3 + Price 4**, cada compra troca quatro esmeraldas por três pães.

![A aba Pagamento do Pão mostrando Inherit Shop, Preço 4 e pagamento de item de esmeralda.](assets/media/guides/drm-031-neo1211/shop-bread-payment.png "A Inherit Shop usa o pagamento padrão da loja. item:minecraft:Emerald abaixo confirma o item de pagamento.")

Defina esse padrão em **Shop settings**: escolha **Shop currency → Item** e esmeraldas como **Payment item**, por exemplo. Para usar DRM dinheiro, crie-o em [Currency Editor](#core-fabric/currency-editor) Primeiro.

![Configurações de loja com o nome da loja, o arquivo de interface e as configurações de pagamento padrão.](assets/media/guides/drm-031-neo1211/shop-settings.png "As configurações da loja se aplicam a toda a loja. O pagamento se aplica ao produto selecionado; altere o método de pagamento para uma substituição específica do produto.")

### 3. Visualizar e salvar

Clique em **Preview** no topo para inspecionar o layout da loja do jogador. Verifique as quantidades, preços e descrições. Retorne com **Close**, escolha **Save As**, digite `village_shop` e confirme com **Save As** no flyout.

![A loja voltada para o jogador abriu com o botão de visualização do editor, mostrando produtos, preços, uma descrição e um resumo da compra.](assets/media/guides/drm-031-neo1211/shop-player-preview.png "Esta é a pré-visualização do editor. Teste uma compra real depois de aplicar a loja salva a um NPC e trazer o item de pagamento.")

Clique com o botão direito do mouse no NPC com o Core e escolha **NPC Shop JSON → village_shop → Apply NPC Shop**. Esvazie as duas mãos e fale com ele. Para abri-lo de uma conversa, siga **Open a shop from dialogue** abaixo.

### 4. Faça uma compra real

Traga dez esmeraldas e marque apenas a caixa ao lado de **Bread**. Confirme que o resumo mostra três pães para quatro esmeraldas e pressione **Buy Selected**.

![Pão verificado na loja real aplicado ao NPC.](assets/media/guides/drm-031-neo1211/shop-bread-selected.png "Emerald 10 no canto superior esquerdo é o inventário de pagamento disponível. O 3 no ícone do pão é o tamanho do pacote; o 1 no meio é o número de pacotes para comprar.")

![Após a compra, a Esmeralda é 6 e o estoque de pão é 11 / 12.](assets/media/guides/drm-031-neo1211/shop-bread-purchased.png "O inventário de servidores recebeu três pães e esmeraldas caiu de dez para seis. O estoque de pão caiu de 12 / 12 para 11 / 12 e seu temporizador de reabastecimento começou. O resumo inferior segue a seleção atual; não é um recibo para a compra anterior.")

![Selecionar Bread e comprar um conjunto; o pagamento e o stock são atualizados.](assets/media/guides/extra-videos-20261106/shop-purchase.mp4 "DRM 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1, interface em inglês. Três pães recebidos, esmeraldas 10→6, stock 12→11.")

## Vendendo e comprando de volta

| Objetivo | Configuração |
| --- | --- |
| NPC vende para o jogador | Adicionar produtos à lista de compras |
| NPC compra itens do jogador | Adicione-os à lista de venda/compra |
| Ambos. | Use o modo de compra e venda |

O NPC só compra itens listados de volta. Você pode listar o mesmo item várias vezes com quantidades ou preços diferentes.

## Estoque e reabastecimento

Stock **0** significa esgotado; **-1** significa ilimitado. Para vendas limitadas, use um estoque positivo. Configure **Restock** para recarregá-lo automaticamente.

![A aba Restock do exemplo da lanterna, com Enable restock, Timer base, Restock intervalo e Restock quantidade.](assets/media/guides/drm-031-neo1211/shop-restock.png "Definir estoque e estoque máximo no produto primeiro. O estoque controla se, quando e quantas compras serão recarregadas. Esta captura usa o exemplo da lanterna.")

**Maximum stock is in Product**; **Restock quantity and interval are in Restock**. Um máximo de oito com um valor de recarga de dois adiciona duas compras de cada vez, até oito.

**Timer basis** aplica-se a toda a loja.

| Configurando | Tempo contado |
| --- | --- |
| **Real ticks** | Tempo realmente jogado; saltos feitos por dormir são excluídos |
| **World ticks** | Hora do mundo, incluindo o tempo ignorado pelo sono |

Em velocidade normal, 20 Os carrapatos são um segundo e 24,000 carrapatos é sobre 20 minutos. Os ticks reais não contam o tempo enquanto o servidor está desligado. Entradas ilimitadas e de recompra não são reabastecidas.

Diferentes NPCs têm estoque separado mesmo quando usam o mesmo arquivo de produto. Jogadores que visitam o mesmo NPC compartilham suas ações.

## Pagamento diferente para um produto

**Inherit Shop** usa o dinheiro da loja. **Override: Item** escolhe um item de pagamento separado. **Override: Currency** escolhe separado DRM moeda.

Selecione um item personalizado do inventário quando o nome exato, encantamentos ou variantes forem importantes.

## Abra uma loja do diálogo

Adicione uma ação **open shop / go_shop** a uma opção de diálogo e escolha a loja salva. Use **bound** para a loja já aplicada a esse NPC.

Use [GUI Maker](#core-fabric/gui-system) para o layout e as imagens da janela. Produtos e preços ainda são editados em NPC Shop.

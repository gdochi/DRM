---
title: Fazer uma Pokémon Loja ou Negociação NPC
slug: cobblemon-pokemart
order: 540
description: Crie NPCs que vendem, negociam ou leiloam Pokémon.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Pokémon criadores de lojas e operadores de servidores
tags:
  - pokemart
  - editor
  - runtime
translationSource: en
translationMethod: assisted
---

## Escolha uma função

**PokéMart Editor** faz Pokémon- negociando NPCs. Use DRM's **NPC Shop** para lojas de itens comuns.

| Papel | Atividade do jogador |
| --- | --- |
| **Sales** | Comprar Pokémon a preços fixos |
| **Trade** | Trocar uma propriedade correspondente Pokémon |
| **Auction** | Liste, lance e colecione assentamentos |

Um NPC usa um papel. Use NPCs separados para uma loja e um serviço de negociação.

![PokéMart Função geral e configurações de pagamento.](assets/media/guides/cobble-029-neo1211/cobble-pokemart.png "Escolha NPC Papel e Moeda à direita. O provedor padrão é CobbleDollars; alterá-lo para um provedor de pagamento disponível se esse mod estiver ausente. Versão 0.2.9 / NeoForge 1.21.1.")

## Faça a primeira loja

1. Abra **Add-on → PokéMart Editor** da lista de editores do DRM.
2. Carregue um padrão e escolha **General → NPC Role → Sales**.
3. Defina o nome e o pagamento em **General**.
4. Use **Pokémon Catalog → Add**, então **Edit Detailed Pokémon Data** no canto inferior direito para escolher espécies, nível, forma e outros detalhes.
5. Defina seu preço e **NPC Stock → Initial**. **-1** é ilimitado.
6. **Save As** seu próprio arquivo.
7. Abra um DNPC ou CustomNPCs NPC com o DRM Core e aplique **PokéMart**.
8. Interaja com as mãos vazias. Os compradores precisam de uma vaga de equipe gratuita.

![Pokémon Catálogo editando um nível 5 Bulbasaur produto, preço e estoque.](assets/media/guides/cobble-029-neo1211/cobble-catalog.png "Selecione um produto à esquerda para editá-lo à direita. Este exemplo custa 5000, começa/caps em 3 e reabastece 1 a cada 72000 carrapatos: uma hora em 20 carrapatos por segundo.")

## Escolha o pagamento

**Currency Provider / ID** seleciona DRM moeda, itens ou CobbleDollars. Criar DRM dinheiro em Currency Editor primeiro; CobbleDollars precisa de seu mod instalado.

O comércio usa uma correspondência Pokémon em vez de dinheiro. Veja [ vendas e comércios](#drm-cobblemon-editor/pokemart-sales-trade-behavior).

## Alterar a tela

Selecione o layout voltado para o jogador em **Runtime GUI**. Os campos de entrada do editor e a tela da loja do jogador são layouts separados.

Veja. [Registro de leilão, lances e cobrança](#drm-cobblemon-editor/pokemart-auction-gui-runtime) para leilões.

## Atualizar a loja

**Save** produto/preço muda para o mesmo arquivo para a próxima interação. **Apply** novamente depois de mudar o nome do arquivo ou função.

Ações, leilões e dados de coleta permanecem no mundo. Mova a configuração e o mundo juntos. Remover o link da loja do NPC não exclui leilões em andamento.

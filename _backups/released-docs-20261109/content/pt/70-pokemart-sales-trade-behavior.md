---
title: Venda e comércio Pokémon
slug: pokemart-sales-trade-behavior
order: 541
description: Crie Pokémon produtos e ofertas comerciais, depois gerencie preços e ações.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Criadores construindo lojas de vendas e centros comerciais
tags:
  - sales
  - trade
  - stock
translationSource: en
translationMethod: assisted
---

## Faça um produto Pokémon

Escolha **Sales** e um método de pagamento em [PokéMart setup](#drm-cobblemon-editor/cobblemon-pokemart), depois abra **Pokémon Catalog → Add**. Selecione o produto e use **Edit Detailed Pokémon Data** para espécies, níveis e movimentos. Defina seu preço e estoque, **Save As** seu próprio arquivo, em seguida, aplicá-lo à loja NPC.

![Produto Bulbasaur com preços e estoques.](assets/media/guides/cobble-029-neo1211/cobble-catalog.png "Tela do criador em Cobblemon Editor 0.2.9 / NeoForge 1.21.1. Preço 5000, Inicial 3, Máximo 3, Reabastecimento 1 e Intervalo 72000 reabastecem um Pokémon por hora até três. Este é um exemplo de edição, não uma compra concluída.")

**Os compradores precisam de um slot de equipe ativa gratuito.** As compras não são enviadas automaticamente para o PC. Verifique o método de pagamento e entregue Pokémon Antes de expandir o catálogo.

![Loja real de NPC após uma compra, com saldo 60 e estoque 2.](assets/media/guides/cobble-029-neo1211-player/cobble-sales-purchased.png "Na mesma versão, o produto salvo e aplicado custa quatro esmeraldas. Compre · 4 mudou esmeraldas 64→60 e estoque 3→2, e adicionou um nível 5 Bulbassaur para a equipe do servidor.")

### Referência de preço e estoque

Um documento de vendas suporta até 256 produtos. Adicione, duplique ou remova linhas e use o editor Pokémon detalhado para a entrega Pokémon.

| Campo | Comportamento |
| --- | --- |
| ID do produto | Inventário chave e compra de pesquisa; mantê-lo único dentro do documento |
| Pokémon | Espécie completa, forma, aspectos, brilho, nível, natureza, habilidade, bola, item mantido, e até quatro movimentos |
| Descrição | Texto de detalhes do tempo de execução, até 512 caracteres |
| Preço | Inteiro não negativo na moeda selecionada |
| Estoque inicial | Contagem inicial do servidor; `-1` significa ilimitado |
| Estoque máximo | Tampa de reposição; normalizada para pelo menos estoque inicial |
| Reabastecimento | Unidades restauradas por intervalo; zero desabilita o reabastecimento |
| Reabastecimento Intervalo | 20 passa por 30 dias; normalizado para zero quando a quantidade de reabastecimento é zero |

Se os IDs forem duplicados, a pesquisa do servidor usará a primeira correspondência. O editor pode não apresentar isso como um erro de validação difícil, então os criadores devem manter os IDs exclusivos.

## Identidade de estoque

O estoque finito é marcado por `NPC UUID + Product ID`. Dois NPCs usando o mesmo documento têm estoque separado. Renomeando o ID do produto no mesmo NPC cria uma nova chave de estoque começando no estoque inicial.

O reabastecimento usa o tempo do mundo do servidor. O tempo off-line do relógio de parede não reabastece o inventário. Quando o mundo avança e o estoque é consultado novamente, intervalos perdidos são aplicados juntos até o estoque máximo.

## Se uma compra falhar

A entrega ou pagamento falhado restaura o estoque e o pagamento. Relatar erros persistentes e detalhes da transação a um administrador.

As compras vão para a equipe ativa. **Mantenha um espaço de equipe gratuito antes de comprar.** As vendas não enviam compras automaticamente para o PC.

## Ofertas comerciais

Escolha **General → Trade**, então **Pokémon Trades → Add**. O modelo do meio é o Pokémon dado pelo NPC; **Requests** abaixo ele identifica o que o jogador deve dar.

![Bulbasaur ← Rattata oferta com níveis solicitados, estoque e ambos Pokémon editor botões.](assets/media/guides/cobble-029-neo1211-flow/cobble-mart-trades.png "Um resultado real de Adicionar em 0.2.9 / NeoForge 1.21.1: o jogador dá Rattata e recebe Bulbasaur. Oferecidos e solicitados são editados separadamente. Isso não mostra uma troca completa.")

1. Use **Edit NPC Offered Pokémon** para escolher a recompensa Pokémon.
2. Use **Edit Requested Pokémon** para escolher a espécie, forma e aspectos necessários.
3. Coloque **Minimum / Maximum level**, **Shiny rule** e **NPC Stock** à direita.
4. **Save As** e aplicar o arquivo para o comércio NPC. Os jogadores selecionam uma oferta e uma propriedade elegível Pokémon, então confirme a troca.

Um documento de comércio suporta até 128 ofertas. As seguintes regras correspondem ao **do jogador Pokémon**.

| Campo de solicitação | Regra de correspondência |
| --- | --- |
| Espécie | Deve corresponder. |
| Formulário | Blank permite todas as formas; caso contrário, a correspondência exata |
| Aspectos | O do jogador. Pokémon deve conter todos os aspectos solicitados separados por vírgulas |
| Brilhante `Any` | Qualquer estado. |
| Brilhante `Required` | Apenas brilhante. |
| Brilhante `Forbidden` | Só não brilhante. |
| Nível Min / Max | Inclusivo 1–100 range |

Natureza, habilidade, movimentos, bola e item mantido afetam os Pokémon oferecidos, mas não são campos de correspondência de pedidos.

## Completar uma troca

1. O jogador seleciona uma oferta.
2. Escolha um Pokémon elegível da equipe ativa ou PC.
3. Verifique a oferta. Pokémon e confirmar a troca permanente.

![Rattata, de propriedade do jogador, selecionada para a troca.](assets/media/guides/cobble-029-neo1211-player/cobble-trade-player.png "Escolha o seu Pokémon abre a lista de propriedade elegível. Verifique a mensagem de exigência individual e verde e pressione Confirmar comércio.")

![O comércio terminou com a oferta de estoque zero e a mensagem de sucesso.](assets/media/guides/cobble-029-neo1211-player/cobble-trade-completed.png "Após o Confirmar Trade real, Rattata foi removido da equipe do servidor, um nível 5 Bulbassaur foi adicionado e oferece ações alteradas 1 → 0. Essa troca não usava moeda.")

Se a entrega falhar, o servidor tenta restaurar o original e restaura o estoque da oferta. Se a restauração imediata falhar, o Pokémon é mantido em [ Pokémon Reivindicações](#drm-cobblemon-editor/pokemart-auction-gui-runtime).

O oferecido Pokémon vai para o **Equipe ativa**. Dar uma equipe Pokémon libera sua vaga, mas trocar um PC Pokémon com uma equipe completa pode falhar a entrega. Mantenha a equipe livre.

As ações comerciais usam `NPC UUID + Trade ID` e as mesmas regras Iniciais/Máximas/Reabastecimento. As identificações comerciais também devem ser únicas.

## Casos de teste

O addon busca produtos de vendas, ofertas de comércio e correspondência de propriedade Pokémon por pesquisa e página. Catálogos grandes e armazenamento de PC não precisam mais ser enviados como uma lista.

- Dois jogadores clicando na última fileira de ações finitas devem produzir um sucesso.
- Teste a compra e a recuperação comercial com capacidade limitada de equipe ou PC.
- Confirmar que a moeda do item rejeita o NBT incompatível.
- Formulário de teste e Aspect pedidos contra ambos comum e variante Pokémon.
- Trate as IDs de produtos e comércio publicadas como identificadores de ações persistentes.

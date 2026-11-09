---
title: Leilões, Reivindicações e Layouts de Lojas
slug: pokemart-auction-gui-runtime
order: 542
description: Configure um NPC de leilão, colete compras e proventos e personalize a tela do jogador.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Criadores operando casas de leilões e telas personalizadas do PokéMart
tags:
  - auction
  - escrow
  - gui-maker
translationSource: en
translationMethod: assisted
---

## Fazer um leilão NPC

Em [PokéMart Editor](#drm-cobblemon-editor/cobblemon-pokemart), escolha **General → NPC Role → Auction** e um método de pagamento. Abra **Auction** à esquerda para definir **Auction House ID**, listando taxas e impostos. **Save As** seu próprio arquivo e aplicá-lo ao leilão NPC.

![ID da casa de leilões, limites de listagem, taxas e impostos no editor.](assets/media/guides/cobble-029-neo1211-flow/cobble-mart-auction.png "Tela do criador em Cobblemon Editor 0.2.9 / NeoForge 1.21.1. O exemplo usa padrão de casa, cinco listagens por jogador, um limite de 1440 minuto, taxa 500, imposto 5% e aumento mínimo de lance 100. Não mostra uma lista completa ou venda.")

Use o ** mesmo ID da casa e as configurações de moeda compatíveis** para compartilhar listagens entre aldeias. IDs diferentes criam casas de leilão separadas mesmo quando suas moedas coincidem.

## Liste, lance e colecione

1. Em **Auction Listing**, escolha uma Pokémon e comece a oferta. A tela padrão atual usa a duração configurada da casa. Faça uma compra opcional se a casa permitir. A listagem cobra a taxa e detém o Pokémon para leilão.
2. Outros jogadores selecionam uma listagem em **Auction** e oferecem ou compram. Vendedores não podem licitar em suas próprias listagens.
3. Após o acordo, abra **Settlement Inbox → Claim All**. Os compradores coletam Pokémon; os vendedores coletam os lucros após impostos. Jogadores de outbids também coletam suas ofertas anteriores aqui.

**Mantenha um espaço livre para a equipe ativa antes de coletar Pokémon.** O espaço para PC sozinho não garante a entrega. Entradas que não podem ser entregues ficam em Reclamações; consertem a capacidade ou o acesso à moeda e tentem novamente.

![Rattata e preços selecionados na Listagem de Leilões.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-player.png "Tela real do jogador em 0.2.9 / NeoForge 1.21.1. Este exercício usa esmeraldas, lance inicial 10, compra 20 e taxa 2. Lista Pokémon · Taxa 2 apresenta a listagem.")

![Os Rattata listados e equilíbrio 62 depois da taxa de listagem.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-listed.png "Listagem mudou as esmeraldas 64→62, removeu Rattata da equipe e criou uma lista ativa. Bid e Buyout estão desativados para o vendedor; Cancelar Listagem permanece disponível.")

![Um unbid expirou Pokémon esperando em Settlement Inbox.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-inbox.png "O relógio de jogo do mundo isolado foi avançado para verificar a expiração. Pokémon esperando: 1 foi seguido pela ação real Claim All.")

![Zero Pokémon esperando e Leilão reivindicações entregues após a coleta.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-claimed.png "Rattata voltou para a equipe do servidor e a contagem de espera mudou 1→0. O equilíbrio permaneceu. 62 depois da taxa de listagem paga. Este exercício não incluiu a oferta de outro jogador, uma venda completa ou liquidação de impostos.")

## Referência das configurações do leilão

| Configurando | Alcance | Comportamento de tempo de execução |
| --- | ---: | --- |
| ID da casa | Até 64 caracteres simbólicos | Leilão de NPCs com as mesmas listagens de compartilhamento de ID e escopo de liquidação |
| Listagens máximas | 1–64 | Listagens ativas por jogador naquela casa |
| Duração máxima | 5–10,080 minutos | Limite de duração; a tela de listagem padrão atual usa esse valor |
| Taxa de Listagem | Número inteiro não negativo | Debitado antes do depósito; reembolsado quando a transferência de depósito falhar |
| Imposto de Venda | 0–100% | Deduzida das receitas de venda concluídas |
| Incremento mínimo de lance | Pelo menos 1 | Aumento de oferta seguinte exigido |
| Permitir a compra | Ligar/Desligar | Permite o preço e a ação de compra instantânea |
| Permita brilhante / Lendário | Ligar/Desligar | Elegibilidade de listagem |

Listagens existentes mantêm suas configurações de moeda e impostos originais. A edição do documento do leilão não converte todas as listagens ativas para a nova política.

## Listagem e custódia

O servidor requer um lance inicial positivo, uma compra de zero ou pelo menos o lance inicial, capacidade de listagem disponível, propriedade e negociável Pokémon, elegibilidade da política e uma taxa de listagem a pagar.

Registrar cobra a taxa e detém o Pokémon para leilão. O registro falhado devolve a taxa e não cria nenhuma listagem.

## Licitações e compras

Se outro jogador fizer lances enquanto a tela estiver aberta, alterne as guias ou reabra a tela NPC e verifique o novo preço antes de licitar novamente. Licitações ordinárias devem atender ao preço atual mais **Minimum Bid Increment**.

- Um novo licitante garante a oferta completa.
- O atual maior lance paga apenas a diferença ao aumentar sua própria oferta.
- A quantia anterior de um jogador se move para Reivindicação de Dinheiro.
- Uma oferta em ou acima do buyout é liquidada no valor de compra configurado.
- A liquidação dá ao comprador um Pokémon Reivindicação e ao vendedor uma reivindicação de dinheiro pós-imposto.

Reivindicações não entregues permanecem armazenadas enquanto um jogador está offline, sua equipe está cheia ou o provedor de moeda não está disponível.

## Cancelamento e expiração

Só o vendedor pode cancelar, e só antes de um lance mais alto existir. O cancelamento só será concluído se o Pokémon puder retornar imediatamente à equipe ou ao PC; caso contrário, a listagem permanecerá ativa.

O servidor resolve listagens expiradas aproximadamente a cada 20 carrapatos.

- Sem licitante: devolva o Pokémon através da reivindicação do vendedor.
- Maior oferta: criar comprador Pokémon Reivindicação e vendedor Reivindicação de dinheiro.
- O vendedor continua: `winning amount - (winning amount × tax ÷ 100)`.

`Claim All` remove apenas as entradas entregues com sucesso. A moeda falhada ou a entrega Pokémon deixam a reivindicação para uma tentativa posterior.

## Componentes da GUI de tempo de execução

Verifique o comportamento da loja primeiro, depois edite um layout **PokéMart** em [GUI Maker](#core/gui-system). Use **Save As** para seu próprio layout e conecte-o em **General → Runtime GUI** em PokéMart Editor. O formulário de produto do criador e a tela de transação do jogador são telas separadas.

PokéMart GUI Maker usa um 800×450 Estágio lógico.

| Componente | Tempo de execução data/action | Exemplos de inspetores |
| --- | --- | --- |
| Cabeçalho e equilíbrio | Exibir nome, equilíbrio, aviso do provedor | Título, equilíbrio, cores de aviso |
| Barra de ferramentas | Fechar | Cores do botão |
| Guias de Modo | Interruptor de separador específico da função | Gap e cores ativas/inativas |
| Pesquisar | Filtra a lista atual | Chave de tradução do espaço reservado |
| Catálogo | Produtos, ofertas ou listagens scrolláveis | Altura da linha/gap, cores, barra de rolagem |
| Pokémon Visualização | Modelo 3D selecionado | Escala do modelo, nível/exibição brilhante |
| Pokémon Detalhes | Espécie, descrição, preço, estoque ou dados de lance | Cores de texto |
| Área de Ação | Compra, troca, oferta, lista, cancelamento, reivindicação | Controlar a diferença e as cores dos botões |

Esses componentes funcionais são singletons. A remoção de um componente crítico deixa o tempo de execução sem lugar para processar seus dados ou controles.

As pesquisas de addon e listagens de páginas, elegíveis Pokémon, opções de venda e reivindicações no servidor. Os layouts padrão do PokéMart e do Starter Selector usam a folha de sprite compartilhada do DRM. Somente padrões legados intocados são atualizados automaticamente; arquivos GUI personalizados são preservados e os padrões substituídos são copiados em `cobblemon/_migration_backups/`.

| Papel | Guias visíveis no jogo |
| --- | --- |
| Vendas | Pokémon Loja |
| Trocar | Pokémon Comércio |
| Leilão | Leilão, Listagem de Leilões, Caixa de Assentamento |

Se GUI JSON está faltando, tem o errado `guiType`, ou não tem uma estrutura de elementos válida, o tempo de execução cai de volta para o padrão addon para essa função. Se apenas uma área estiver faltando, inspecione a presença e a geometria desse componente primeiro.

## Teste de operações

1. Jogador A lista um Pokémon; verificar taxa e remoção.
2. O jogador B faz lances; verifique se A não pode cancelar.
3. Jogador C supera; verifique se B recebe uma reivindicação de reembolso.
4. Compre e reivindique o comprador Pokémon e os lucros líquidos do vendedor.
5. Expiração do teste com e sem licitante.
6. Reinicie o servidor e verifique listagens, depósito, lances e reclamações.
7. Desabilite temporariamente um provedor de moeda e verifique se as reivindicações fracassadas permanecem armazenadas.

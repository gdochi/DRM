---
title: Coleções e construção de convés
slug: cards-decks
order: 1530
description: Depósitos de cofre, estampas regulares e animadas, raridades e requisitos do convés.
product: mwent
category: Facções e cartas
section: cards
status: Guia
version: 0.1.6
audience: Jogadores
translationSource: en
translationMethod: assisted
---

## Adquirir e armazenar cartões

Colete cartões físicos e pacotes distribuídos pelo servidor. A aquisição do comerciante e do peito depende das configurações do servidor; os operadores podem usar o [Guia de aquisição](#mwent/acquisition). Receber um cartão é separado de depositar no cofre.

Com um cursor vazio, clique com o botão direito do mouse em uma pilha de cartão em seu inventário ou um peito para depositar sua quantidade. Abra o cofre com a chave padrão **V**, que pode ser rebote. Retirar cartões para obter itens físicos novamente.

O prédio do convés adiciona quantidades próprias no cofre e no inventário do jogador. Baús e cartas de outros jogadores estão excluídos. Adicionar cartas a um baralho ou usá-las em uma partida não as consome. Cartas reservadas durante a preparação ou jogo não podem ser retiradas do cofre.

## Impressões regulares e animadas

Impressões regulares e animadas são itens físicos separados e contagens próprias, mas compartilham o mesmo limite de cópia do baralho. A animação não melhora as estatísticas de combate.

**Rarity** tem quatro valores: Comum, Raro, Épico e Lendário. O **Bronze / Gold frame** determina o limite duplicado. Não deduza esse limite só da raridade.

## Criar um deck

![O navegador do deck de preparação, com filtros predefinidos à esquerda e cartões Companion Chorus, contagens e provisões à direita.](assets/media/guides/minigames-015-neo1211/minigames-mwent-play.png "Jogo de teste em Minigames 0.1.5 / NeoForge 1.21.1. Use este deck abre a preparação com o deck selecionado. Meus decks encontram seus decks salvos.")

1. Abra **My Decks → New Deck** do cofre, enciclopédia ou preparação de batalha.
2. Escolha uma facção e verifique o líder e o limite de provisão.
3. Adicione cartas de facção ou neutras, nomeie o baralho e salve-o.
4. Selecione o baralho salvo antes de uma partida. Corrigir requisitos incompletos ou faltar cópias de propriedade primeiro.

Em 0.1.6 preparação, também escolher um dos [Cinco táticas de abertura](#mwent/version-0-1-6). É separado de cartas de mão e é colocado para o jogador que ganha o primeiro lance de moeda.

| Exigência | Deck completo |
| --- | --- |
| Cartões | 25–40 |
| Unidades | Pelo menos 13 |
| Provisões | No máximo 150 mais o bônus do líder selecionado |
| O mesmo cartão de ouro | No máximo um. |
| O mesmo cartão de bronze. | No máximo dois. |
| Propriedade | No máximo, a quantidade combinada de cofre e inventário |
| Facção | Facção escolhida e neutra |

Economize até 16 decks. Os rascunhos incompletos podem ser salvos, mas não podem entrar automaticamente em uma correspondência. A mudança de facção limpa a composição e requer um novo líder; mudando apenas o líder preserva os cartões e verifica novamente o novo limite.

![Preparação do convés com facção, líder e provisões à esquerda, mais/menos controles de cartas à direita e começar a partida acima.](assets/media/guides/minigames-015-neo1211/minigames-mwent-mulligan.png "Ajustar contagens com +/$, verificar o total de cartões, unidades e Provisões e, em seguida, começar a correspondência. Esta é a preparação do convés, antes da mão aberta redesenhar.")

## Enciclopédia e inspeção

A enciclopédia não concede ou consome cartas. Escolha cartas para ler nomes, facções, raridade, poder, provisões e habilidades. Clique com o botão direito na batalha para mais detalhes. Distinguir valores base dos valores atuais afetados por danos ou aumentos.

Cartões não usados ainda podem ser inspecionados. Um cartão opcional que aparece na lista não significa que pode ser jogado sem seu provedor. O catálogo atual contém 335 definições incorporadas e 89 definições de mods opcionais; a disponibilidade real depende de mods e ativos instalados. Slots de cartão personalizado não usados são excluídos dessas contagens.

Use o [catálogo de especificações](#mwent/card-catalog) para valores de cartas e habilidades e o [Liberar histórico](#mwent/releases) para adições e mudanças.

## Se um modelo de cartão DNPC estiver faltando

Desde 0.1.5, DNPC as configurações do modelo Gecko são lidas e as visualizações temporárias criadas durante o carregamento de ativos são atualizadas. O modelo, os ativos e as bibliotecas de renderização opcionais devem estar disponíveis; uma entrada de catálogo não instala a integração.

---
title: MWENT introdução e configuração
slug: start
order: 1500
description: Instale MWENT através de Minigames, aprenda as regras e inicie partidas de AI ou jogador.
product: mwent
category: Começando
section: play
status: Guia
version: 0.1.6
audience: Jogadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## O que é MWENT?

**MWENT** é um jogo de cartas tático usando Minecraft criaturas e exércitos. Implantar cartas em soquetes fixos de frente e verso, combinar vizinhos, ordens e habilidades de líder, e gerenciar sua mão restante para ganhar duas rodadas. Suas estratégias de facção se inspiram no standalone online. **GWENT: The Witcher Card Game**, com cartões originais e interações construídas ao redor Minecraft Campos de batalha e soquetes fixos.

MWENT está **incluído em Dochi`s Minigames**. Esta documentação dedicada não representa um download de mod separado. Seu primeiro lançamento público de Minigames foi **0.1.1**. Escolha o arquivo correto Minecraft e loader usando o guia de configuração do [Minigames](#dochi-minigames/minigames-setup).

![MWENT batalha com dez cartas de mão, frente / costas linhas, pontuação e o controle de passagem.](assets/media/guides/minigames-015-neo1211/mwent-battle.png "Minigames 0.1.5 / NeoForge 1.21.1, interface inglesa. Pontuações e marcadores redondos são deixados, sua mão está embaixo, e decks, cemitérios e passes redondos estão certos. Cada lado tem duas fileiras de nove tomadas.")

## Linha de base de instalação e documentação

Instale as compilações correspondentes do Minigames no servidor e no cliente. Batalhas básicas, mesas e aulas funcionam sem DRM. Instale os requisitos da plataforma, como a API Fabric separadamente. DRM adiciona NPC, diálogo e integrações de moeda. Cartões opcionais exigem seu provedor e ativos reais. Minecraft 26.3 usa Java 25 e exclui CustomNPCs.

Este guia explica a jogabilidade 0.1.6. Veja o [Liberar histórico](#mwent/releases) para mudanças de cartão anteriores.

## Aprenda jogando

1. Clique com o botão direito do mouse em uma tabela MWENT e selecione **AI Battle → Learn by Playing**, ou use Learn by Playing na tela inicial MWENT.
2. Identifique o campo de batalha, mão, pontuação e marcadores redondos. Clique com o botão direito em um cartão para inspecioná-lo.
3. Colocação prática, finalização de turnos, ordens, líderes, adjacência e passar por ações reais.
4. Pratique uma transição redonda e mulligan, então jogue uma partida completa.

Lições não exigem cartões próprios e não têm taxas de entrada, recompensas ou limite de tempo. Selecione as lições livremente. Continue aprendendo abre a primeira lição inacabada; aulas interrompidas reiniciam seu estado de prática. Anterior / Próximo revisita explicações sem rebobinar cartões ou pontuações.

## Prática de inteligência artificial e partidas de jogadores

| Modo | Iniciar |
| --- | --- |
| Prática de IA | Escolha um oponente embutido em uma mesa e prepare seu deck. A lista atual tem dois oponentes por facção, doze no total. |
| Jogo do jogador | Dois jogadores se juntam à mesma mesa, escolhem decks e ambos pressionam Pronto. O servidor verifica os baralhos de cartas. |
| Espectando | Junte-se a uma mesa completa ou a uma partida de corrida para ver o campo público e marcar. Mãos escondidas e ordem do convés não são reveladas. |

Crie um **MWENT table** de dois livros, uma lã verde e cinco tábuas: livro / lã verde / livro; três tábuas; prancha / vazio / prancha. Começar uma partida não consome a mesa ou as cartas usadas no baralho.

Continue com [como jogar ](#mwent/how-to-play), [seis facções](#mwent/factions) e [coleções e baralhos](#mwent/cards-decks).

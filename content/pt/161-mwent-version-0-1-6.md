---
title: 0.1.6 — novas cartas, especificações e táticas de abertura
slug: version-0-1-6
order: 1610
description: Especificações de 60 cartas de facção e 12 de cerco, além de cinco táticas de abertura.
product: mwent
category: Lançar histórico
section: card-history
status: Guia
version: 0.1.6
audience: Jogadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Cartas adicionadas e especificações da versão 0.1.6

A versão 0.1.6 adiciona **60 cartas de facção e 12 cartas de cerco: 72 no total**. Os novos IDs são **1700–1759 e 1800–1811**. As definições incluídas passam de **263 → 335**, as opcionais continuam em **89**, e o total passa de **352 → 424**. As edições normal e animada representam a mesma carta de combate; as cinco táticas de abertura não entram nessa contagem.

O poder, as provisões, as molduras, as raridades e as definições anteriores de Deploy, Order e palavras-chave das cartas existentes são mantidos. As tabelas abaixo mostram poder / provisões, moldura, raridade e habilidades de cada nova carta. Primeiro vêm as instruções das táticas; depois, as especificações das cartas de facção e de cerco.

## Escolha antes da partida

Uma tática de abertura é uma **ferramenta de uso único para o jogador indo primeiro na primeira rodada**. Abra sua lista abaixo do líder do construtor de convés. De uma predefinição, siga **Use this deck → choose a tactic → Begin match**. Salvar seu baralho preserva sua escolha tática para carregar mais tarde.

![Cinco táticas de abertura no construtor do convés.](assets/media/guides/minigames-016-neo1211/mwent016-tactic-options.png "Minigames 0.1.6 / NeoForge 1.21.1, interface inglesa. Escolha abaixo do líder. A opção final, núcleo do selo Golem, se transforma em seu próprio soquete em vez de impulsionar um aliado.")

| Táctica | Resultado | Antes de usá-lo |
| --- | --- | --- |
| Altar de maçã dourada | Dê um aliado +5 poder | Tenha um aliado no conselho primeiro. |
| Escudo da guarda | Dê um aliado +2 poder e escudo | Preparem pontos e proteção contra um evento de dano. |
| Cache de ferro | Dê um aliado +4 Armadura | Armadura em si não adiciona pontuação. |
| Abastecimento de campo peito | Ganhar 4 Abastecimento | Emparelhe-o com habilidades que gastam Supply. |
| Núcleo do selo Golem | Transforme-se em um 4-Poder Ferro Golem token no mesmo soquete | Nenhuma seleção separada de soquete vazia é necessária. |

## Use-o na primeira rodada.

Se o lance de moeda faz de você o primeiro jogador, a tática ocupa **um dos seus nove soquetes reais da linha de corpo a corpo**. Ele não adiciona nenhuma pontuação, mas leva espaço, deixando oito tomadas para outras cartas enquanto não utilizadas. O segundo jogador não recebe tática.

![Um núcleo de selo Golem ocupando o centro da fileira corpo a corpo do primeiro jogador.](assets/media/guides/minigames-016-neo1211/mwent016-golem-installed.png "Antes da transformação no mesmo 0.1.6 Corra. Sua pontuação é zero e o dispositivo de vedação ocupa o soquete central. O atalho roxo na parte inferior esquerda mostra um uso disponível.")

Na sua vez, clique em ** a tática no tabuleiro ou seu atalho na parte inferior esquerda**. Impulso, escudo e armadura táticas, em seguida, pedir um alvo aliado. Suprimento e Golem resolvem sem outro alvo. Isso é separado de jogar uma carta de mão, mas conta como uma ação: você não pode passar imediatamente no mesmo turno depois de usá-lo.

![O mesmo soquete agora contém um 4-Poder Golem Ferro.](assets/media/guides/minigames-016-neo1211/mwent016-golem-transformed.png "Depois de clicar no atalho de tática real. O soquete central na mesma linha torna-se um 4Golem, sua pontuação se torna quatro, e o indicador de tática de uso único desaparece. A mão permanece intacta.")

O altar, escudo, cache e baú de suprimentos desaparecem quando usados, liberando seu soquete. Golem ** reutiliza o soquete ocupado da tática **, para que possa se transformar mesmo em uma fileira completa. O Golem transformado participa de pontuação, dano e consumo como uma unidade comum, mas não tem implantação ou ordem. É um símbolo Doomed e não deixa nem um cartão de cemitério nem Morga permanece.

Táticas não usadas desaparecem durante a limpeza da primeira rodada. Eles não são desenhados, criados ou armazenados como cartões colecionáveis, então eles são excluídos do [424- catálogo de definição](#mwent/card-catalog).


## Alterações relacionadas

Versão publicada no CurseForge em 3–4 de novembro de 2026. [CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9432406) · [Histórico de alterações](#mwent/releases) · [MWENT](#mwent/how-to-play) · [Cards](#mwent/cards-decks)

## Adicionado mecânica

![Editor de habilidades de cartão personalizado com condições, alvos e operações.](assets/media/guides/minigames-015-neo1211/minigames-card-abilities.png "Minigames reais 0.1.5 / NeoForge 1.21.1 tela de habilidade. A mecânica abaixo se relaciona com esses controles de autoria. Salvar uma definição é separado da concessão de propriedade.")

Para criar uma carta, consulte a [criação de cartas personalizadas](#mwent/authoring). A captura do editor abaixo foi feita no espaço de trabalho 0.1.5 e ilustra controles de habilidades também disponíveis nesta versão.

- Cenários avançam capítulos através de jogos de qualificação, locais oferecem ordens persistentes, e armadilhas fornecem reações ocultas. Eles ocupam soquetes sem adicionar pontos unitários.
- Véu, Imunidade, Ruptura, Infusão, Resiliência, Contadores, temporizadores e evolução redonda são suportados.
- Operações adicionais incluem a escolha de cartas criadas, jogando no convés / cemitério, recall / replay, aumentos de mão / convés, mudanças de poder base, Duel / Clash e retriggering Deathwish / Deploy.
- As condições abrangem o baralho inicial, o tamanho da mão, o maior poder, a soma das três cartas mais fortes e o gasto de Suprimento, além de custos opcionais. As cinco táticas de abertura atuais são explicadas acima.
- O editor de cartões personalizados expõe essas habilidades, condições, alvos, operações e custos. A poupança não concede cartões próprios.

## Sessenta novas cartas de facção

Dez cartas são adicionadas por facção. Essas tabelas resumem o poder armazenado real, provisões e habilidades.

No celular, role dentro da tabela horizontalmente para ler a coluna de habilidade.

### Império Volkar

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Volkar Founding Chronicle (card_1700) · 0.1.6 | — / 10 | Ouro · Lendário | Cenário; Progresso: Ally Jogado Construção; Condenado; Implantar · Auto-unidade Board Tudo · Invoque um token com poder 2 #0 · por turno 1; Capítulo 1Ally Unit Board Todos · Alvo: armadura 2 · por turno 1; Capítulo 2Ally Unit Board Todos · Alvo: Rearm 2 · por turno 1 |
| Volkar Field Workshop (card_1701) · 0.1.6 | — / 7 | Ouro · Épico | Localização; Resiliência; Implantação · Ally Unit Board All · Alvo: Armadura 1 · por turno 1; Ordem · Self Unit Board All · Alvo: Gerar na mão # 0 · por turno 1 |
| Volkar Hidden Snare (card_1702) · 0.1.6 | — / 4 | Bronze · Raro | Armadilha; Revelar: Unidade Inimiga jogada; Reação Armadilha · Unidade Inimiga Placa Maior poder · Alvo: Dano 3 · por turno 1 |
| Volkar Signal Keeper (card_1703) · 0.1.6 | 4 / 5 | Bronze · Raro | Counter 2; Timer 2; Turn End · Self Unit Board All · Alvo: Reduzir o contador 1 · por turno 1; Counter atinge zero · Self Unit Board All · Alvo: Shield 1 · por turno 1; Timer expira · Self Unit Board All · Alvo: Boost 2 · por turno 1 |
| Volkar Unexpected Ally (card_1704) · 0.1.6 | 4 / 5 | Bronze · Raro | Ally jogou · se o cartão de gatilho tem categoria Construir · Auto Unidade Board Todos · Alvo: Armadura 1 · por turno 1 |
| Volkar Sworn Vanguard (card_1705) · 0.1.6 | 4 / 5 | Bronze · Raro | Implantar · se o deck inicial não contiver neutros · Self Unit Board All · Alvo: Impulsionar unidades no deck 1 · por turno 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Alvo: Impulsionar 1 · por turno 1 |
| Volkar Challenge Bearer (card_1706) · 0.1.6 | 4 / 5 | Bronze · Raro | Implantar · Enemy Unit Board Escolha · Alvo: Clash · por turno 1; Deathblow · Self Unit Board Todos · Alvo: Boost 2 · por turno 1 |
| Volkar Unwritten Possibilities (card_1707) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Self Unit Board All · Alvo: Criar e jogar uma de até três escolhas custando no máximo 5 · por turno 1 |
| Volkar Shared Instinct (card_1708) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Ally Unit Board Escolha · Alvo: Infundir habilidades e categorias # 1704 · por turno 1 |
| Volkar Relic Breaker (card_1709) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Enemy Artifact Board Escolha · Alvo: Destruir artefato · por turno 1 |

### Avalin.

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Avalin Founding Chronicle (card_1710) · 0.1.6 | — / 10 | Ouro · Lendário | Cenário; Progresso: Ally Played Beast; Condenado; Implantar · Auto-unidade Board Tudo · Invoque um token com poder 2 #8 · por turno 1; Capítulo 1Ally Unit Board Todos · Alvo: Curar 2 · por turno 1; Capítulo 2: Self Unit Board Tudo · Invoque um token com poder 4 #8 · por turno 1 |
| Avalin Field Workshop (card_1711) · 0.1.6 | — / 7 | Ouro · Épico | Localização; Resiliência; Implantação · Ally Unit Board All · Alvo: Armadura 1 · por turno 1; Ordem · Self Unit Board All · Alvo: Gerar na mão # 8 · por turno 1 |
| Avalin Hidden Snare (card_1712) · 0.1.6 | — / 4 | Bronze · Raro | Armadilha; Revelar: Enemy especial jogado; Reação Armadilha · Ally Unit Board Potência mais baixa · Alvo: Impulso 3 · por turno 1 |
| Avalin Signal Keeper (card_1713) · 0.1.6 | 4 / 5 | Bronze · Raro | Counter 2; Timer 2; Turn End · Self Unit Board All · Alvo: Reduzir o contador 1 · por turno 1; Counter atinge zero · Self Unit Board All · Alvo: Shield 1 · por turno 1; Timer expira · Self Unit Board All · Alvo: Boost 2 · por turno 1 |
| Avalin Unexpected Ally (card_1714) · 0.1.6 | 4 / 5 | Bronze · Raro | Especial Jogado · se o cartão de gatilho tem categoria Natureza · Self Unit Board All · Alvo: Boost 1 · por turno 1 |
| Avalin Sworn Vanguard (card_1715) · 0.1.6 | 4 / 5 | Bronze · Raro | Implantar · se o deck inicial não contiver neutros · Self Unit Board All · Alvo: Impulsionar unidades no deck 1 · por turno 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Alvo: Impulsionar 1 · por turno 1 |
| Avalin Challenge Bearer (card_1716) · 0.1.6 | 4 / 5 | Bronze · Raro | Implantar · Enemy Unit Board Escolha · Alvo: Clash · por turno 1; Deathblow · Self Unit Board Todos · Alvo: Boost 2 · por turno 1 |
| Avalin Unwritten Possibilities (card_1717) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Self Unit Board All · Alvo: Criar e jogar uma de até três escolhas custando no máximo 5 · por turno 1 |
| Avalin Shared Instinct (card_1718) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Ally Unit Board Escolha · Alvo: Infundir habilidades e categorias # 1714 · por turno 1 |
| Avalin Relic Breaker (card_1719) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Enemy Artifact Board Escolha · Alvo: Destruir artefato · por turno 1 |

### Roden League

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Roden Founding Chronicle (card_1720) · 0.1.6 | — / 10 | Ouro · Lendário | Cenário; Progresso: Ally Played Merchant; Doomed; Implantar · Self Unit Board All · Alvo: Invoque um token com poder 2 #16 · por turno 1; Capítulo 1: Self Unit Board All · Alvo: Entrega de suprimentos 3 · por turno 1; Capítulo 2: Enemy Unit Board Highest · Alvo: Marca e ataque 4 · por turno 1 |
| Roden Field Workshop (card_1721) · 0.1.6 | — / 7 | Ouro · Épico | Localização; Resiliência; Implantação · Ally Unit Board All · Alvo: Armadura 1 · por turno 1; Ordem · Self Unit Board All · Alvo: Gerar na mão # 16 · por turno 1 |
| Roden Hidden Snare (card_1722) · 0.1.6 | — / 4 | Bronze · Raro | Armadilha; Revelar: Unidade Inimiga jogada; Reação Armadilha · Unidade Inimiga Placa Maior poder · Alvo: Marcar e atacar 1 · por turno 1 |
| Roden Signal Keeper (card_1723) · 0.1.6 | 4 / 5 | Bronze · Raro | Counter 2; Timer 2; Turn End · Self Unit Board All · Alvo: Reduzir o contador 1 · por turno 1; Counter atinge zero · Self Unit Board All · Alvo: Shield 1 · por turno 1; Timer expira · Self Unit Board All · Alvo: Boost 2 · por turno 1 |
| Roden Unexpected Ally (card_1724) · 0.1.6 | 4 / 5 | Bronze · Raro | Suprimentos gastos · Self Unit Board Todos · Alvo: Impulso 1 · por turno 1 |
| Roden Sworn Vanguard (card_1725) · 0.1.6 | 4 / 5 | Bronze · Raro | Implantar · se o deck inicial não contiver neutros · Self Unit Board All · Alvo: Impulsionar unidades no deck 1 · por turno 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Alvo: Impulsionar 1 · por turno 1 |
| Roden Challenge Bearer (card_1726) · 0.1.6 | 4 / 5 | Bronze · Raro | Implantar · Enemy Unit Board Escolha · Alvo: Clash · por turno 1; Deathblow · Self Unit Board Todos · Alvo: Boost 2 · por turno 1 |
| Roden Unwritten Possibilities (card_1727) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Self Unit Board All · Alvo: Criar e jogar uma de até três escolhas custando no máximo 5 · por turno 1 |
| Roden Shared Instinct (card_1728) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Ally Unit Board Escolha · Alvo: Infundir habilidades e categorias # 1724 · por turno 1 |
| Roden Relic Breaker (card_1729) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Enemy Artifact Board Escolha · Alvo: Destruir artefato · por turno 1 |

### Nevra

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Nevra Founding Chronicle (card_1730) · 0.1.6 | — / 10 | Ouro · Lendário | Cenário; Progresso: Agente Ally Jogado; Condenado; Implantar · Auto-unidade Board Tudo · Invoque um token com poder 2 #24 · por turno 1; Capítulo 1: Enemy Unit Board Maior poder · Alvo: Infiltrado 1 · por turno 1; Capítulo 2Alvo Espionagem ≥ 1 · Enemy Unit Board Maior poder · Alvo: Bloqueio 1, alvo: Danos 3 · por turno 1 |
| Nevra Field Workshop (card_1731) · 0.1.6 | — / 7 | Ouro · Épico | Localização; Resiliência; Implantação · Ally Unit Board All · Alvo: Armadura 1 · por turno 1; Ordem · Self Unit Board All · Alvo: Gerar na mão # 24 · por turno 1 |
| Nevra Hidden Snare (card_1732) · 0.1.6 | — / 4 | Bronze · Raro | Armadilha; Revelar: Enemy especial jogado; Reação Armadilha · Enemy Unit Board Maior poder · Alvo: Bloqueio 1 · por turno 1 |
| Nevra Signal Keeper (card_1733) · 0.1.6 | 4 / 5 | Bronze · Raro | Counter 2; Timer 2; Turn End · Self Unit Board All · Alvo: Reduzir o contador 1 · por turno 1; Counter atinge zero · Self Unit Board All · Alvo: Shield 1 · por turno 1; Timer expira · Self Unit Board All · Alvo: Boost 2 · por turno 1 |
| Nevra Unexpected Ally (card_1734) · 0.1.6 | 4 / 5 | Bronze · Raro | Ally jogou · Evento Gerado fora do convés de partida ≥ 1 · Self Unit Board All · Alvo: Boost 1 · por turno 1 |
| Nevra Sworn Vanguard (card_1735) · 0.1.6 | 4 / 5 | Bronze · Raro | Implantar · se o deck inicial não contiver neutros · Self Unit Board All · Alvo: Impulsionar unidades no deck 1 · por turno 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Alvo: Impulsionar 1 · por turno 1 |
| Nevra Challenge Bearer (card_1736) · 0.1.6 | 4 / 5 | Bronze · Raro | Implantar · Enemy Unit Board Escolha · Alvo: Clash · por turno 1; Deathblow · Self Unit Board Todos · Alvo: Boost 2 · por turno 1 |
| Nevra Unwritten Possibilities (card_1737) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Self Unit Board All · Alvo: Criar e jogar uma de até três escolhas custando no máximo 5 · por turno 1 |
| Nevra Shared Instinct (card_1738) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Ally Unit Board Escolha · Alvo: Infundir habilidades e categorias # 1734 · por turno 1 |
| Nevra Relic Breaker (card_1739) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Enemy Artifact Board Escolha · Alvo: Destruir artefato · por turno 1 |

### Clãs despertos

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Haemu Founding Chronicle (card_1740) · 0.1.6 | — / 10 | Ouro · Lendário | Cenário; Progresso: Ally jogou Raider; Condenado; Implantar · Auto-unidade Board Tudo · Invoque um token com poder 2 #1300 · por turno 1; Capítulo 1Ally Unit Board Todos · Alvo: Curar 2 · por turno 1; Capítulo 2: Ally Unit Board Potência mais baixa · Rito de sangue. 5 · por turno 1 |
| Haemu Field Workshop (card_1741) · 0.1.6 | — / 7 | Ouro · Épico | Localização; Resiliência; Implantação · Ally Unit Board All · Alvo: Armadura 1 · por turno 1; Ordem · Self Unit Board All · Alvo: Gerar na mão # 1300 · por turno 1 |
| Haemu Hidden Snare (card_1742) · 0.1.6 | — / 4 | Bronze · Raro | Armadilha; Revelar: Unidade Inimiga jogada; Reação Armadilha · Unidade Inimiga Placa Poder máximo · Alvo: Sangramento 3 · por turno 1 |
| Haemu Signal Keeper (card_1743) · 0.1.6 | 4 / 5 | Bronze · Raro | Counter 2; Timer 2; Turn End · Self Unit Board All · Alvo: Reduzir o contador 1 · por turno 1; Counter atinge zero · Self Unit Board All · Alvo: Shield 1 · por turno 1; Timer expira · Self Unit Board All · Alvo: Boost 2 · por turno 1 |
| Haemu Unexpected Ally (card_1744) · 0.1.6 | 4 / 5 | Bronze · Raro | Ally danificou · Self Unit Board Todos · Alvo: Impulso 1 · por turno 1 |
| Haemu Sworn Vanguard (card_1745) · 0.1.6 | 4 / 5 | Bronze · Raro | Implantar · se o deck inicial não contiver neutros · Self Unit Board All · Alvo: Impulsionar unidades no deck 1 · por turno 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Alvo: Impulsionar 1 · por turno 1 |
| Haemu Challenge Bearer (card_1746) · 0.1.6 | 4 / 5 | Bronze · Raro | Implantar · Enemy Unit Board Escolha · Alvo: Clash · por turno 1; Deathblow · Self Unit Board Todos · Alvo: Boost 2 · por turno 1 |
| Haemu Unwritten Possibilities (card_1747) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Self Unit Board All · Alvo: Criar e jogar uma de até três escolhas custando no máximo 5 · por turno 1 |
| Haemu Shared Instinct (card_1748) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Ally Unit Board Escolha · Alvo: Infundir habilidades e categorias # 1744 · por turno 1 |
| Haemu Relic Breaker (card_1749) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Enemy Artifact Board Escolha · Alvo: Destruir artefato · por turno 1 |

### Morga Brood

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Morga Founding Chronicle (card_1750) · 0.1.6 | — / 10 | Ouro · Lendário | Cenário; Progresso: Ally jogou Swarm; Doomed; Implantar · Auto-unidade Board Tudo · Invoque um token com poder 2 #1400 · por turno 1; Capítulo 1Ally Unit Board Todos · Alvo: Semente uma casca 1 · por turno 1; Capítulo 2: Self Unit Board Tudo · Invoque um token com poder 4 #1400 · por turno 1 |
| Morga Field Workshop (card_1751) · 0.1.6 | — / 7 | Ouro · Épico | Localização; Resiliência; Implantação · Ally Unit Board All · Alvo: Armadura 1 · por turno 1; Ordem · Self Unit Board All · Alvo: Gerar na mão # 1400 · por turno 1 |
| Morga Hidden Snare (card_1752) · 0.1.6 | — / 4 | Bronze · Raro | Armadilha; Revelar: Unidade Inimiga jogada; Reação Armadilha · Unidade Inimiga Placa Maior poder · Alvo: Veneno 1 · por turno 1 |
| Morga Signal Keeper (card_1753) · 0.1.6 | 4 / 5 | Bronze · Raro | Counter 2; Timer 2; Turn End · Self Unit Board All · Alvo: Reduzir o contador 1 · por turno 1; Counter atinge zero · Self Unit Board All · Alvo: Shield 1 · por turno 1; Timer expira · Self Unit Board All · Alvo: Boost 2 · por turno 1 |
| Morga Unexpected Ally (card_1754) · 0.1.6 | 4 / 5 | Bronze · Raro | Ally Destroyed · Self Unit Board Tudo · Alvo: Impulso 1 · por turno 1 |
| Morga Sworn Vanguard (card_1755) · 0.1.6 | 4 / 5 | Bronze · Raro | Implantar · se o deck inicial não contiver neutros · Self Unit Board All · Alvo: Impulsionar unidades no deck 1 · por turno 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Alvo: Impulsionar 1 · por turno 1 |
| Morga Challenge Bearer (card_1756) · 0.1.6 | 4 / 5 | Bronze · Raro | Implantar · Enemy Unit Board Escolha · Alvo: Clash · por turno 1; Deathblow · Self Unit Board Todos · Alvo: Boost 2 · por turno 1 |
| Morga Unwritten Possibilities (card_1757) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Self Unit Board All · Alvo: Criar e jogar uma de até três escolhas custando no máximo 5 · por turno 1 |
| Morga Shared Instinct (card_1758) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Ally Unit Board Escolha · Alvo: Infundir habilidades e categorias # 1754 · por turno 1 |
| Morga Relic Breaker (card_1759) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Enemy Artifact Board Escolha · Alvo: Destruir artefato · por turno 1 |

## Doze cartas de cerco.

Sete modelos de máquinas originais com componentes móveis são compartilhados por cartões, campos e visualizações. Cartas, habilidades e modelos básicos funcionam sem Criar ou Grandes Canhões. As paletas opcionais usam recursos instalados compatíveis.

Adicionamos categorias de motores de cerco, aliados/inimigos, eventos de redução de recarga, redução de recarga, carregamento de pedidos e invocação de habilidades de preservação. Tais intimações não retrigger Implantar e ganhar Doomed.

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Volkar Timber Ballista (card_1800) · 0.1.6 | 4 / 5 | Bronze · Raro | Armadura 1; Ordem: Dano 2; Recarga 2; Abastecimento 1; Tripulação 1; Balista de madeira da máquina |
| Volkar Counterweight Catapult (card_1801) · 0.1.6 | 5 / 7 | Bronze · Raro | Armadura 1; Ordem: Socket burst 2; Cooldown 3; Reabastecimento 1; Paciência 1; Catapulta de contrapeso de máquina |
| Volkar Armored Cannon (card_1802) · 0.1.6 | 5 / 8 | Ouro · Épico | Armadura 2; Ordem: Armadura piercing 3; Recarga 3; Abastecimento 1; Despesas 1; Canhão blindado de máquina |
| Volkar Automatic Loader (card_1803) · 0.1.6 | 4 / 6 | Bronze · Raro | Armadura 1; Fim da curva · Unidade Aliada Adjacente Todo o mecanismo de cerco · Alvo: Reduza a recarga apenas 1 · por turno 1; Carregador Automático de Máquina |
| Volkar Steam Ballista (card_1804) · 0.1.6 | 5 / 7 | Bronze · Raro | Armadura 3; Ordem: Liberação da Armadura 2; Recarga 2; Reabastecimento 1; Tripulação 1; Balista a Vapor de Máquina |
| Volkar Repeating Cannon (card_1805) · 0.1.6 | 4 / 10 | Ouro · Épico | Armadura 1; Ordem: Dano 1; Recarga 2; Reabastecimento 1; Uma recarga aliada diminui · se o cartão de disparo tiver a categoria Motor de cerco · Enemy Unit Board Random · Alvo: Dano 1 · por turno 3; Canhão de repetição de máquina |
| Volkar Armored Crew (card_1806) · 0.1.6 | 4 / 5 | Bronze · Raro | Armadura 2; Defender 1; Implantar · Unidade Aliada Adjacente Todos · Alvo: Armadura 1 · por turno 1 |
| Volkar Field Engineer (card_1807) · 0.1.6 | 4 / 5 | Bronze · Raro | Armadura 1; Implantar · Ally Unit Board Escolha o motor de cerco · Alvo: Rearm 2 · por turno 1 |
| Volkar Ammunition Cart (card_1808) · 0.1.6 | 5 / 5 | Bronze · Raro | Armadura 1; Comércio 1; Turn End · Self Unit Board Todos · Alvo: Entrega de suprimentos 1 · por turno 1; Carro de munição de máquina |
| Volkar Field Maintenance (card_1809) · 0.1.6 | — / 5 | Bronze · Raro | Implantar · Ally Unit Board Escolha o motor de cerco · Alvo: Rearm 2 · por turno 1 |
| Volkar Bombardment Order (card_1810) · 0.1.6 | — / 4 | Bronze · Raro | Implantar · Unidade Inimiga Linha Todos · Alvo: Dano 1 · por turno 1 |
| Volkar Siege Encampment (card_1811) · 0.1.6 | — / 12 | Ouro · Lendário | Cenário; Progresso: Ally Jogou o Motor de Cerco; Condenado; Implantar · Auto-unidade Board Tudo · Alvo: Invoque 1 Unidade com habilidades e Doomed; sem Implantação1800 · por turno 1; Capítulo 1: Self Unit Board Tudo · Alvo: Invoque 1 Unidade com habilidades e Doomed; sem Implantação1801 · por turno 1; Capítulo 2Ally Unit Board Todo o motor de cerco · Alvo: Rearm 2 · por turno 1 |

Veja [Table and Card Authoring](#mwent/authoring) e o catálogo de especificações [complete](#mwent/card-catalog).

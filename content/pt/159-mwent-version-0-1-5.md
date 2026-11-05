---
title: 0.1.5 — Adições de sinergia e cerco
slug: version-0-1-5
order: 1590
description: 72 novas placas de espaço de trabalho, mecânicas e especificações adicionadas.
product: mwent
category: Facções e cartas
section: releases
status: Referência da especificação
version: 0.1.5
audience: Jogadores/criadores
translationSource: en
translationMethod: assisted
---

> Esta página preserva o estado do espaço de trabalho local 0.1.5. A documentação de lançamento das novas cartas e especificações está reunida em [cartas e táticas da versão 0.1.6](#mwent/version-0-1-6). As 72 cartas abaixo são as mesmas adições, não um segundo conjunto.

## Histórico 0.1.5 linha de base do workspace

Baseado no independente Minecraft 26.3 Fabric / NeoForge fontes e produção 0.1.5 JAR em outubro 30, 2026. Isto é separado do [Histórico de uploads do CurseForge](#mwent/releases).

As definições incorporadas aumentam ** 263 → 335 **, as definições opcionais permanecem ** 89 **, e o total aumenta ** 352 → 424 **. Impressões regulares e animadas totais 848. O poder existente, provisões, quadros, raridades e definições de palavras-chave, ordem e legado permanecem intactas. Os IDs adicionados são 1700–1759 e 1800–1811.

## Adicionado mecânica

![Editor de habilidades de cartão personalizado com condições, alvos e operações.](assets/media/guides/minigames-015-neo1211/minigames-card-abilities.png "Minigames reais 0.1.5 / NeoForge 1.21.1 tela de habilidade. A mecânica abaixo se relaciona com esses controles de autoria. Salvar uma definição é separado da concessão de propriedade.")

Para construir um cartão, comece com [autoria de cartão personalizado](#mwent/authoring). Para o atual comportamento de abertura-táctica continuar a [0.1.6](#mwent/version-0-1-6).

- Cenários avançam capítulos através de jogos de qualificação, locais oferecem ordens persistentes, e armadilhas fornecem reações ocultas. Eles ocupam soquetes sem adicionar pontos unitários.
- Véu, Imunidade, Ruptura, Infusão, Resiliência, Contadores, temporizadores e evolução redonda são suportados.
- Operações adicionais incluem a escolha de cartas criadas, jogando no convés / cemitério, recall / replay, aumentos de mão / convés, mudanças de poder base, Duel / Clash e retriggering Deathwish / Deploy.
- As condições cobrem os decks iniciais, o tamanho da mão, a maior potência, os três principais gastos com energia e fornecimento, além de custos opcionais e quatro bônus de abertura.
- O editor de cartões personalizados expõe essas habilidades, condições, alvos, operações e custos. A poupança não concede cartões próprios.

## Sessenta novas cartas de facção

Dez cartas são adicionadas por facção. Essas tabelas resumem o poder armazenado real, provisões e habilidades.

No celular, role dentro da tabela horizontalmente para ler a coluna de habilidade.

### Império Volkar

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Volkar Founding Chronicle (card_1700) · 0.1.5 | — / 10 | Ouro · Lendário | Cenário; Progresso: Ally Jogado Construção; Condenado; Implantar · Auto-unidade Board Tudo · Invoque um token com poder 2 #0 · por turno 1; Capítulo 1Ally Unit Board Todos · Alvo: armadura 2 · por turno 1; Capítulo 2Ally Unit Board Todos · Alvo: Rearm 2 · por turno 1 |
| Volkar Field Workshop (card_1701) · 0.1.5 | — / 7 | Ouro · Épico | Localização; Resiliência; Implantação · Ally Unit Board All · Alvo: Armadura 1 · por turno 1; Ordem · Self Unit Board All · Alvo: Gerar na mão # 0 · por turno 1 |
| Volkar Hidden Snare (card_1702) · 0.1.5 | — / 4 | Bronze · Raro | Armadilha; Revelar: Unidade Inimiga jogada; Reação Armadilha · Unidade Inimiga Placa Maior poder · Alvo: Dano 3 · por turno 1 |
| Volkar Signal Keeper (card_1703) · 0.1.5 | 4 / 5 | Bronze · Raro | Counter 2; Timer 2; Turn End · Self Unit Board All · Alvo: Reduzir o contador 1 · por turno 1; Counter atinge zero · Self Unit Board All · Alvo: Shield 1 · por turno 1; Timer expira · Self Unit Board All · Alvo: Boost 2 · por turno 1 |
| Volkar Unexpected Ally (card_1704) · 0.1.5 | 4 / 5 | Bronze · Raro | Ally jogou · se o cartão de gatilho tem categoria Construir · Auto Unidade Board Todos · Alvo: Armadura 1 · por turno 1 |
| Volkar Sworn Vanguard (card_1705) · 0.1.5 | 4 / 5 | Bronze · Raro | Implantar · se o deck inicial não contiver neutros · Self Unit Board All · Alvo: Impulsionar unidades no deck 1 · por turno 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Alvo: Impulsionar 1 · por turno 1 |
| Volkar Challenge Bearer (card_1706) · 0.1.5 | 4 / 5 | Bronze · Raro | Implantar · Enemy Unit Board Escolha · Alvo: Clash · por turno 1; Deathblow · Self Unit Board Todos · Alvo: Boost 2 · por turno 1 |
| Volkar Unwritten Possibilities (card_1707) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Self Unit Board All · Alvo: Criar e jogar uma de até três escolhas custando no máximo 5 · por turno 1 |
| Volkar Shared Instinct (card_1708) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Ally Unit Board Escolha · Alvo: Infundir habilidades e categorias # 1704 · por turno 1 |
| Volkar Relic Breaker (card_1709) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Enemy Artifact Board Escolha · Alvo: Destruir artefato · por turno 1 |

### Avalin.

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Avalin Founding Chronicle (card_1710) · 0.1.5 | — / 10 | Ouro · Lendário | Cenário; Progresso: Ally Played Beast; Condenado; Implantar · Auto-unidade Board Tudo · Invoque um token com poder 2 #8 · por turno 1; Capítulo 1Ally Unit Board Todos · Alvo: Curar 2 · por turno 1; Capítulo 2: Self Unit Board Tudo · Invoque um token com poder 4 #8 · por turno 1 |
| Avalin Field Workshop (card_1711) · 0.1.5 | — / 7 | Ouro · Épico | Localização; Resiliência; Implantação · Ally Unit Board All · Alvo: Armadura 1 · por turno 1; Ordem · Self Unit Board All · Alvo: Gerar na mão # 8 · por turno 1 |
| Avalin Hidden Snare (card_1712) · 0.1.5 | — / 4 | Bronze · Raro | Armadilha; Revelar: Enemy especial jogado; Reação Armadilha · Ally Unit Board Potência mais baixa · Alvo: Impulso 3 · por turno 1 |
| Avalin Signal Keeper (card_1713) · 0.1.5 | 4 / 5 | Bronze · Raro | Counter 2; Timer 2; Turn End · Self Unit Board All · Alvo: Reduzir o contador 1 · por turno 1; Counter atinge zero · Self Unit Board All · Alvo: Shield 1 · por turno 1; Timer expira · Self Unit Board All · Alvo: Boost 2 · por turno 1 |
| Avalin Unexpected Ally (card_1714) · 0.1.5 | 4 / 5 | Bronze · Raro | Especial Jogado · se o cartão de gatilho tem categoria Natureza · Self Unit Board All · Alvo: Boost 1 · por turno 1 |
| Avalin Sworn Vanguard (card_1715) · 0.1.5 | 4 / 5 | Bronze · Raro | Implantar · se o deck inicial não contiver neutros · Self Unit Board All · Alvo: Impulsionar unidades no deck 1 · por turno 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Alvo: Impulsionar 1 · por turno 1 |
| Avalin Challenge Bearer (card_1716) · 0.1.5 | 4 / 5 | Bronze · Raro | Implantar · Enemy Unit Board Escolha · Alvo: Clash · por turno 1; Deathblow · Self Unit Board Todos · Alvo: Boost 2 · por turno 1 |
| Avalin Unwritten Possibilities (card_1717) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Self Unit Board All · Alvo: Criar e jogar uma de até três escolhas custando no máximo 5 · por turno 1 |
| Avalin Shared Instinct (card_1718) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Ally Unit Board Escolha · Alvo: Infundir habilidades e categorias # 1714 · por turno 1 |
| Avalin Relic Breaker (card_1719) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Enemy Artifact Board Escolha · Alvo: Destruir artefato · por turno 1 |

### Roden League

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Roden Founding Chronicle (card_1720) · 0.1.5 | — / 10 | Ouro · Lendário | Cenário; Progresso: Ally Played Merchant; Doomed; Implantar · Self Unit Board All · Alvo: Invoque um token com poder 2 #16 · por turno 1; Capítulo 1: Self Unit Board All · Alvo: Entrega de suprimentos 3 · por turno 1; Capítulo 2: Enemy Unit Board Highest · Alvo: Marca e ataque 4 · por turno 1 |
| Roden Field Workshop (card_1721) · 0.1.5 | — / 7 | Ouro · Épico | Localização; Resiliência; Implantação · Ally Unit Board All · Alvo: Armadura 1 · por turno 1; Ordem · Self Unit Board All · Alvo: Gerar na mão # 16 · por turno 1 |
| Roden Hidden Snare (card_1722) · 0.1.5 | — / 4 | Bronze · Raro | Armadilha; Revelar: Unidade Inimiga jogada; Reação Armadilha · Unidade Inimiga Placa Maior poder · Alvo: Marcar e atacar 1 · por turno 1 |
| Roden Signal Keeper (card_1723) · 0.1.5 | 4 / 5 | Bronze · Raro | Counter 2; Timer 2; Turn End · Self Unit Board All · Alvo: Reduzir o contador 1 · por turno 1; Counter atinge zero · Self Unit Board All · Alvo: Shield 1 · por turno 1; Timer expira · Self Unit Board All · Alvo: Boost 2 · por turno 1 |
| Roden Unexpected Ally (card_1724) · 0.1.5 | 4 / 5 | Bronze · Raro | Suprimentos gastos · Self Unit Board Todos · Alvo: Impulso 1 · por turno 1 |
| Roden Sworn Vanguard (card_1725) · 0.1.5 | 4 / 5 | Bronze · Raro | Implantar · se o deck inicial não contiver neutros · Self Unit Board All · Alvo: Impulsionar unidades no deck 1 · por turno 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Alvo: Impulsionar 1 · por turno 1 |
| Roden Challenge Bearer (card_1726) · 0.1.5 | 4 / 5 | Bronze · Raro | Implantar · Enemy Unit Board Escolha · Alvo: Clash · por turno 1; Deathblow · Self Unit Board Todos · Alvo: Boost 2 · por turno 1 |
| Roden Unwritten Possibilities (card_1727) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Self Unit Board All · Alvo: Criar e jogar uma de até três escolhas custando no máximo 5 · por turno 1 |
| Roden Shared Instinct (card_1728) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Ally Unit Board Escolha · Alvo: Infundir habilidades e categorias # 1724 · por turno 1 |
| Roden Relic Breaker (card_1729) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Enemy Artifact Board Escolha · Alvo: Destruir artefato · por turno 1 |

### Nevra

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Nevra Founding Chronicle (card_1730) · 0.1.5 | — / 10 | Ouro · Lendário | Cenário; Progresso: Agente Ally Jogado; Condenado; Implantar · Auto-unidade Board Tudo · Invoque um token com poder 2 #24 · por turno 1; Capítulo 1: Enemy Unit Board Maior poder · Alvo: Infiltrado 1 · por turno 1; Capítulo 2Alvo Espionagem ≥ 1 · Enemy Unit Board Maior poder · Alvo: Bloqueio 1, alvo: Danos 3 · por turno 1 |
| Nevra Field Workshop (card_1731) · 0.1.5 | — / 7 | Ouro · Épico | Localização; Resiliência; Implantação · Ally Unit Board All · Alvo: Armadura 1 · por turno 1; Ordem · Self Unit Board All · Alvo: Gerar na mão # 24 · por turno 1 |
| Nevra Hidden Snare (card_1732) · 0.1.5 | — / 4 | Bronze · Raro | Armadilha; Revelar: Enemy especial jogado; Reação Armadilha · Enemy Unit Board Maior poder · Alvo: Bloqueio 1 · por turno 1 |
| Nevra Signal Keeper (card_1733) · 0.1.5 | 4 / 5 | Bronze · Raro | Counter 2; Timer 2; Turn End · Self Unit Board All · Alvo: Reduzir o contador 1 · por turno 1; Counter atinge zero · Self Unit Board All · Alvo: Shield 1 · por turno 1; Timer expira · Self Unit Board All · Alvo: Boost 2 · por turno 1 |
| Nevra Unexpected Ally (card_1734) · 0.1.5 | 4 / 5 | Bronze · Raro | Ally jogou · Evento Gerado fora do convés de partida ≥ 1 · Self Unit Board All · Alvo: Boost 1 · por turno 1 |
| Nevra Sworn Vanguard (card_1735) · 0.1.5 | 4 / 5 | Bronze · Raro | Implantar · se o deck inicial não contiver neutros · Self Unit Board All · Alvo: Impulsionar unidades no deck 1 · por turno 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Alvo: Impulsionar 1 · por turno 1 |
| Nevra Challenge Bearer (card_1736) · 0.1.5 | 4 / 5 | Bronze · Raro | Implantar · Enemy Unit Board Escolha · Alvo: Clash · por turno 1; Deathblow · Self Unit Board Todos · Alvo: Boost 2 · por turno 1 |
| Nevra Unwritten Possibilities (card_1737) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Self Unit Board All · Alvo: Criar e jogar uma de até três escolhas custando no máximo 5 · por turno 1 |
| Nevra Shared Instinct (card_1738) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Ally Unit Board Escolha · Alvo: Infundir habilidades e categorias # 1734 · por turno 1 |
| Nevra Relic Breaker (card_1739) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Enemy Artifact Board Escolha · Alvo: Destruir artefato · por turno 1 |

### Clãs despertos

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Haemu Founding Chronicle (card_1740) · 0.1.5 | — / 10 | Ouro · Lendário | Cenário; Progresso: Ally jogou Raider; Condenado; Implantar · Auto-unidade Board Tudo · Invoque um token com poder 2 #1300 · por turno 1; Capítulo 1Ally Unit Board Todos · Alvo: Curar 2 · por turno 1; Capítulo 2: Ally Unit Board Potência mais baixa · Rito de sangue. 5 · por turno 1 |
| Haemu Field Workshop (card_1741) · 0.1.5 | — / 7 | Ouro · Épico | Localização; Resiliência; Implantação · Ally Unit Board All · Alvo: Armadura 1 · por turno 1; Ordem · Self Unit Board All · Alvo: Gerar na mão # 1300 · por turno 1 |
| Haemu Hidden Snare (card_1742) · 0.1.5 | — / 4 | Bronze · Raro | Armadilha; Revelar: Unidade Inimiga jogada; Reação Armadilha · Unidade Inimiga Placa Poder máximo · Alvo: Sangramento 3 · por turno 1 |
| Haemu Signal Keeper (card_1743) · 0.1.5 | 4 / 5 | Bronze · Raro | Counter 2; Timer 2; Turn End · Self Unit Board All · Alvo: Reduzir o contador 1 · por turno 1; Counter atinge zero · Self Unit Board All · Alvo: Shield 1 · por turno 1; Timer expira · Self Unit Board All · Alvo: Boost 2 · por turno 1 |
| Haemu Unexpected Ally (card_1744) · 0.1.5 | 4 / 5 | Bronze · Raro | Ally danificou · Self Unit Board Todos · Alvo: Impulso 1 · por turno 1 |
| Haemu Sworn Vanguard (card_1745) · 0.1.5 | 4 / 5 | Bronze · Raro | Implantar · se o deck inicial não contiver neutros · Self Unit Board All · Alvo: Impulsionar unidades no deck 1 · por turno 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Alvo: Impulsionar 1 · por turno 1 |
| Haemu Challenge Bearer (card_1746) · 0.1.5 | 4 / 5 | Bronze · Raro | Implantar · Enemy Unit Board Escolha · Alvo: Clash · por turno 1; Deathblow · Self Unit Board Todos · Alvo: Boost 2 · por turno 1 |
| Haemu Unwritten Possibilities (card_1747) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Self Unit Board All · Alvo: Criar e jogar uma de até três escolhas custando no máximo 5 · por turno 1 |
| Haemu Shared Instinct (card_1748) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Ally Unit Board Escolha · Alvo: Infundir habilidades e categorias # 1744 · por turno 1 |
| Haemu Relic Breaker (card_1749) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Enemy Artifact Board Escolha · Alvo: Destruir artefato · por turno 1 |

### Morga Brood

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Morga Founding Chronicle (card_1750) · 0.1.5 | — / 10 | Ouro · Lendário | Cenário; Progresso: Ally jogou Swarm; Doomed; Implantar · Auto-unidade Board Tudo · Invoque um token com poder 2 #1400 · por turno 1; Capítulo 1Ally Unit Board Todos · Alvo: Semente uma casca 1 · por turno 1; Capítulo 2: Self Unit Board Tudo · Invoque um token com poder 4 #1400 · por turno 1 |
| Morga Field Workshop (card_1751) · 0.1.5 | — / 7 | Ouro · Épico | Localização; Resiliência; Implantação · Ally Unit Board All · Alvo: Armadura 1 · por turno 1; Ordem · Self Unit Board All · Alvo: Gerar na mão # 1400 · por turno 1 |
| Morga Hidden Snare (card_1752) · 0.1.5 | — / 4 | Bronze · Raro | Armadilha; Revelar: Unidade Inimiga jogada; Reação Armadilha · Unidade Inimiga Placa Maior poder · Alvo: Veneno 1 · por turno 1 |
| Morga Signal Keeper (card_1753) · 0.1.5 | 4 / 5 | Bronze · Raro | Counter 2; Timer 2; Turn End · Self Unit Board All · Alvo: Reduzir o contador 1 · por turno 1; Counter atinge zero · Self Unit Board All · Alvo: Shield 1 · por turno 1; Timer expira · Self Unit Board All · Alvo: Boost 2 · por turno 1 |
| Morga Unexpected Ally (card_1754) · 0.1.5 | 4 / 5 | Bronze · Raro | Ally Destroyed · Self Unit Board Tudo · Alvo: Impulso 1 · por turno 1 |
| Morga Sworn Vanguard (card_1755) · 0.1.5 | 4 / 5 | Bronze · Raro | Implantar · se o deck inicial não contiver neutros · Self Unit Board All · Alvo: Impulsionar unidades no deck 1 · por turno 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Alvo: Impulsionar 1 · por turno 1 |
| Morga Challenge Bearer (card_1756) · 0.1.5 | 4 / 5 | Bronze · Raro | Implantar · Enemy Unit Board Escolha · Alvo: Clash · por turno 1; Deathblow · Self Unit Board Todos · Alvo: Boost 2 · por turno 1 |
| Morga Unwritten Possibilities (card_1757) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Self Unit Board All · Alvo: Criar e jogar uma de até três escolhas custando no máximo 5 · por turno 1 |
| Morga Shared Instinct (card_1758) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Ally Unit Board Escolha · Alvo: Infundir habilidades e categorias # 1754 · por turno 1 |
| Morga Relic Breaker (card_1759) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Enemy Artifact Board Escolha · Alvo: Destruir artefato · por turno 1 |

## Doze cartas de cerco.

Sete modelos de máquinas originais com componentes móveis são compartilhados por cartões, campos e visualizações. Cartas, habilidades e modelos básicos funcionam sem Criar ou Grandes Canhões. As paletas opcionais usam recursos instalados compatíveis.

Adicionamos categorias de motores de cerco, aliados/inimigos, eventos de redução de recarga, redução de recarga, carregamento de pedidos e invocação de habilidades de preservação. Tais intimações não retrigger Implantar e ganhar Doomed.

| Cartão e primeira versão | Poder / provisões | Frame e raridade | Resumo da habilidade |
| --- | --- | --- | --- |
| Volkar Timber Ballista (card_1800) · 0.1.5 | 4 / 5 | Bronze · Raro | Armadura 1; Ordem: Dano 2; Recarga 2; Abastecimento 1; Tripulação 1; Balista de madeira da máquina |
| Volkar Counterweight Catapult (card_1801) · 0.1.5 | 5 / 7 | Bronze · Raro | Armadura 1; Ordem: Socket burst 2; Cooldown 3; Reabastecimento 1; Paciência 1; Catapulta de contrapeso de máquina |
| Volkar Armored Cannon (card_1802) · 0.1.5 | 5 / 8 | Ouro · Épico | Armadura 2; Ordem: Armadura piercing 3; Recarga 3; Abastecimento 1; Despesas 1; Canhão blindado de máquina |
| Volkar Automatic Loader (card_1803) · 0.1.5 | 4 / 6 | Bronze · Raro | Armadura 1; Fim da curva · Unidade Aliada Adjacente Todo o mecanismo de cerco · Alvo: Reduza a recarga apenas 1 · por turno 1; Carregador Automático de Máquina |
| Volkar Steam Ballista (card_1804) · 0.1.5 | 5 / 7 | Bronze · Raro | Armadura 3; Ordem: Liberação da Armadura 2; Recarga 2; Reabastecimento 1; Tripulação 1; Balista a Vapor de Máquina |
| Volkar Repeating Cannon (card_1805) · 0.1.5 | 4 / 10 | Ouro · Épico | Armadura 1; Ordem: Dano 1; Recarga 2; Reabastecimento 1; Uma recarga aliada diminui · se o cartão de disparo tiver a categoria Motor de cerco · Enemy Unit Board Random · Alvo: Dano 1 · por turno 3; Canhão de repetição de máquina |
| Volkar Armored Crew (card_1806) · 0.1.5 | 4 / 5 | Bronze · Raro | Armadura 2; Defender 1; Implantar · Unidade Aliada Adjacente Todos · Alvo: Armadura 1 · por turno 1 |
| Volkar Field Engineer (card_1807) · 0.1.5 | 4 / 5 | Bronze · Raro | Armadura 1; Implantar · Ally Unit Board Escolha o motor de cerco · Alvo: Rearm 2 · por turno 1 |
| Volkar Ammunition Cart (card_1808) · 0.1.5 | 5 / 5 | Bronze · Raro | Armadura 1; Comércio 1; Turn End · Self Unit Board Todos · Alvo: Entrega de suprimentos 1 · por turno 1; Carro de munição de máquina |
| Volkar Field Maintenance (card_1809) · 0.1.5 | — / 5 | Bronze · Raro | Implantar · Ally Unit Board Escolha o motor de cerco · Alvo: Rearm 2 · por turno 1 |
| Volkar Bombardment Order (card_1810) · 0.1.5 | — / 4 | Bronze · Raro | Implantar · Unidade Inimiga Linha Todos · Alvo: Dano 1 · por turno 1 |
| Volkar Siege Encampment (card_1811) · 0.1.5 | — / 12 | Ouro · Lendário | Cenário; Progresso: Ally Jogou o Motor de Cerco; Condenado; Implantar · Auto-unidade Board Tudo · Alvo: Invoque 1 Unidade com habilidades e Doomed; sem Implantação1800 · por turno 1; Capítulo 1: Self Unit Board Tudo · Alvo: Invoque 1 Unidade com habilidades e Doomed; sem Implantação1801 · por turno 1; Capítulo 2Ally Unit Board Todo o motor de cerco · Alvo: Rearm 2 · por turno 1 |

Veja [Table and Card Authoring](#mwent/authoring) e o catálogo de especificações [complete](#mwent/card-catalog).

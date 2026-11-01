---
title: Como jogar MWENT
slug: how-to-play
order: 1510
description: Mulligans, colocação, Ordens, passagem, pontuação e transições redondas.
product: mwent
category: Jogando
section: play
status: Guia
version: 0.1.6
audience: Jogadores
translationSource: en
translationMethod: assisted
---

## Vitória e o campo de batalha

Vencer **duas rodadas** em uma partida com duração de até três rodadas. Cada jogador tem linhas dianteiras e traseiras com nove soquetes fixos por linha. Sua pontuação é o poder atual das unidades restantes em seu conselho. Armadura, Escudo e Abastecimento não adicionam pontos diretamente. Os cenários, locais e armadilhas introduzidos em 0.1.5 ocupar soquetes sem adicionar unidade de energia.

Quando ambos os jogadores passarem, compare as pontuações. A pontuação mais alta ganha uma rodada; uma rodada empatada dá a ambos os jogadores uma vitória. A partida inteira pode terminar como um empate.

![MWENT batalha com dez cartas de mão, frente / costas linhas, pontuação e o controle de passagem.](assets/media/guides/minigames-015-neo1211/mwent-battle.png "Minigames 0.1.5 / NeoForge 1.21.1, interface inglesa. Pontuações e marcadores redondos são deixados, sua mão está embaixo, e decks, cemitérios e passes redondos estão certos. Cada lado tem duas fileiras de nove tomadas.")

## 1. Selecione um deck e mulligan

Verifique sua facção, convés e líder. Desenhe dez cartas no início. Um lance de moeda escolhe o jogador inicial. O primeiro jogador pode substituir até três cartas no mulligan de abertura; o segundo pode substituir até dois. As substituições são opcionais. Continue a batalha.

Mais tarde, as rodadas desenham até três cartas enquanto o baralho ainda tem cartas. O limite de mão é dez. Desenhos bloqueados por uma mão cheia aumentam as duas oportunidades de mulligan da rodada. O vencedor da rodada anterior começa a próxima rodada.

## 2. Jogue uma carta no seu turno.

O primeiro jogador pode usar o **tática de abertura** escolhido durante a preparação uma vez. É separado de jogar uma carta de mão, e 0.1.6 oferece cinco opções. Veja. [seleção e uso real](#mwent/version-0-1-6) para o núcleo do selo Golem se transformar em um Golem de quatro potências no mesmo soquete.

1. Selecione um cartão de mão. Clique com o botão direito primeiro para inspecionar suas habilidades e status atual.
2. Coloque unidades em um soquete vazio legal. Linhas e vizinhos imediatos podem afetar habilidades.
3. Resolva suas habilidades escolhendo um alvo legal destacado.
4. Use ordens disponíveis e habilidades de líder, então pressione **End Turn**.

Um turno normal joga uma carta da mão. Convocatórias e peças adicionais criadas por habilidades seguem essas habilidades. **Playing** um cartão gasta um cartão de mão real; ** invocando** coloca uma unidade no campo através de um efeito. As invocações normalmente não retrigger Implante ou habilidades que exigem uma carta para ser jogado.

## 3. Ordens e líderes

**Deploy** dispara quando uma carta é jogada. **Order** é ativado manualmente em uma carta já em jogo. Verifique as cobranças, recarga, custos de fornecimento e bloqueio. Sem Zeal, uma unidade não pode usar imediatamente sua Ordem no turno em que entra. As habilidades de líder têm contagens de uso separadas e não contam como cartões de mão.

Por exemplo, Tripulação precisa de aliados blindados em ambos os soquetes imediatamente adjacentes da mesma fileira. Pode recarregar uma ordem esgotada ou reduzir a recarga restante na sua vez. Dois aliados blindados em outro lugar são insuficientes.

## 4. Decidir quando passar

**Pass** desiste de suas voltas restantes para a rodada atual. Seu oponente pode continuar jogando, você não pode voltar mais tarde nessa rodada. Escolha-o antes de jogar uma carta ou tomar outra ação no seu turno.

| Situação | Considere. |
| --- | --- |
| Opositor passou | Ganhe apenas os pontos necessários para liderar e preservar cartas. Efeitos turn-end ainda podem mudar a pontuação. |
| Pegar custa muitos cartões. | Compare ceder a rodada com gastar recursos necessários na próxima. |
| Ordens ou motores de crescimento estão prontos | Pesar os pontos de outra vez contra as opções de remoção do oponente. |

As transições redondas normalmente limpam o tabuleiro e preservam a mão restante. Cartões com Resiliência e outras exceções seguem seu próprio texto. A limpeza redonda é distinta da destruição e não aciona o Deathwish automaticamente.

## Status comum

| Status | Efeito |
| --- | --- |
| Armadura / Escudo | Armadura normalmente absorve dano primeiro; Escudo bloqueia um evento de dano. |
| Veneno. | Duas aplicações de veneno destroem a unidade. |
| Sangramento / Vitalidade | No final do turno do proprietário da unidade, cause um dano / adicione um poder e reduza a duração. Sangramento ignora Armadura. |
| Bloquear / Purificar | Bloqueio desabilita ordens e habilidades passivas. Purify remove status removível ao invés de Armadura. |
| Condenado. | A unidade não fica no cemitério quando sai do tabuleiro. Verifique a ressurreição e as restrições simbólicas. |

## Temporizado e indo embora

Correspondências normais usam turnos de 60 segundos, mulligans de 20 segundos e transições de 5 segundos. No tempo limite, o servidor resolve alvos pendentes e descarta um cartão de mão se nenhum foi jogado, então termina a vez. As aulas não têm temporizador.

Esc fecha um cartão aberto primeiro. Confirmar a partida de uma partida perde. PvP também perde a desconexão, a morte, a mudança de dimensão ou mover mais de 64 blocos da mesa. Fechar uma tela ou ler a orientação não pausa o temporizador normal do servidor.

Rotação, zoom e preferências 3D / card-display compartilham as mesmas regras do servidor. Continue com [facções](#mwent/factions) e [edifício de convés](#mwent/cards-decks).

## Música de batalha

A música padrão segue a facção do baralho do jogador da moeda e do mulligan. Uma escolha explícita de música de perfil de jogo tem precedência. Play/Stop e controles de volume são deixados no Livro de Regras. Silencio 0% mantém a posição de reprodução; reproduzir depois de Parar reinicia a faixa. As preferências são locais e não editam o JSON do jogo do servidor ou o volume global Minecraft.

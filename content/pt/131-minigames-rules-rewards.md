---
title: Regras e Recompensas do Jogo
slug: minigames-rules-rewards
order: 1310
description: Configurações do jogo, confirmação de entrada, limites de pontuação e item ou Pokémon recompensas.
product: dochi-minigames
category: Autoria
section: rules
status: Guia de uso
version: 0.1.6
audience: Criadores de jogos
translationSource: en
translationMethod: assisted
---

## Regras por jogo

| Jogo | Fluxo do jogador | Verificações de autoria |
| --- | --- | --- |
| Monty Hall | Escolha uma porta → portas perdidas reveladas → fique ou troque | Usar 3–8 portas e preparar símbolos e ganhar recompensas. |
| Fendas | Confirmação de entrada → alavanca → parar três bobinas | Defina paradas automáticas/manuais, símbolos, intervalos de rotação e tempos de parada. |
| Memória | Revelar inicial → selecionar duas cartas → combinar cada par | Use 2–10 linhas/colunas e uma contagem uniforme de cartas, com um símbolo distinto para cada par. |

O limite de tempo é 5–3600 segundos. As predefinições de memória são fáceis, normais e difíceis, usam placas 2×2, 6×6 e 10×10. A 10×10 O conselho precisa 50 símbolos distintos. Use **Find** ao lado de um ID de símbolo para procurar o catálogo de itens do DRM.

Os tempos de parada automática devem aumentar do primeiro carretel para o terceiro, com a última parada dentro do limite de tempo. Na velocidade normal do jogo, 20 carrapatos igual a um segundo.

### Slot Stop Times

Abra **Slots → Rules**. Esta é a **Minigames 0.1.5 / NeoForge 1.21.1** editor. Com **Auto stop** habilitado, **Reel 1 tick / Reel 2 tick / Reel 3 tick** controla quando cada movimento cambaleante pára. A foto `20 / 40 / 60` significa um, dois e três segundos a uma velocidade normal. **Spin interval** é o atraso entre as mudanças de símbolo enquanto gira.

![Regras de slots com parada automática ativada e tempos de parada do carretel de 20, 40 e 60 carrapatos.](assets/media/guides/minigames-015-neo1211/minigames-slots.png "Aumente os tempos de parada do primeiro carretel para o terceiro. A imagem do slot no meio é uma visualização de design.")

### Tamanho da placa de memória

Sob **Memory → Rules**, **Rows / Columns** define o tamanho da placa. A foto. `4 × 4` O tabuleiro precisa de dezesseis cartas e oito símbolos distintos. **Reveal ticks** define a revelação inicial; **Mismatch ticks** define quanto tempo um par incorreto permanece visível antes de se esconder novamente.

![Regras de memória com um quadro de quatro por quatro, sinais de revelação e erros de correspondência, com oito pares visíveis na pré-visualização do projeto.](assets/media/guides/minigames-015-neo1211/minigames-memory.png "Verifique os símbolos depois de ampliar o quadro. O tamanho do cartão é ajustado através das configurações do quadro em Abrir GUI Maker abaixo de Regras.")

## Roleta usa uma lista de prêmios separada

[Item Roulette ](#dochi-minigames/minigames-roulette) escolhe um prêmio usando itens de slots de prêmio, quantidades e pesos. Os limites de pontuação e as regras de perda abaixo descrevem os jogos de pontuação existentes. Roleta mantém um sorteio pago já iniciado após o fechamento; Jogar de novo começa outro sorteio imediatamente.

## Taxa de entrada

Defina o provedor, a identificação e o valor em Geral.

| Provedor | Configuração |
| --- | --- |
| `item` | ID do item a consumir |
| `drm` | ID da moeda registrada em DRM Currency Editor |
| `cobbledollars` | Configuração usando o provedor CobbleDollars instalado |

Uma quantidade de `0` é gratuita. Clicar em um NPC ou Replay não cobra uma taxa: o jogador deve confirmar Iniciar. O cancelamento é gratuito; o equilíbrio insuficiente impede o início. A confirmação expira após 60 segundos. Fechar um jogo pago e iniciado o abandona.

## Limiares e política de recompensa

Defina a pontuação e a quantidade exigidas de cada recompensa e escolha como as recompensas elegíveis são selecionadas.

| Política | Resultado |
| --- | --- |
| `highest` | Todas as recompensas no limite mais alto alcançado |
| `cumulative` | Todas as recompensas em cada limite atingido |
| `random` | Uma entrada de recompensa elegível selecionada aleatoriamente |

Recompensas de item concedem o item configurado. Recompensas de símbolos usam o símbolo de resultado selecionado do jogo, como o símbolo de slot correspondente. Com Cobblemon instalado, **Pokémon Settings** fornece espécies, nível, brilhante, gênero, forma, natureza, habilidade, bola, item de posse e propriedades extras. Os níveis são 1–100; uma equipe completa envia o Pokémon para o PC.

Itens referenciados, símbolos e Pokémon recompensas são verificadas antes do pagamento. O servidor possui pontuações, respostas ocultas, pagamento e subsídios. Cada sessão se estabelece uma vez. Recompensas de itens que não se encaixam no inventário são descartadas; inspecione notificações e logs do servidor para obter erros de concessão. Subsídios falhados não são automaticamente tentados.

Depois de salvar, verifique o teste gratuito do editor e o fluxo real de confirmação de entrada. [ NPC e vinculações de diálogo](#dochi-minigames/minigames-setup) estão cobertos na página inicial.

## Jogos adicionais

| Jogo | Brincar e criar |
| --- | --- |
| Whack-a-criatura | Atingir alvos emergentes, evitar armadilhas; configurar modelos e tempo. |
| Tempo | Pare dentro da zona de sucesso; configure rodadas, velocidade e janelas encolhendo. |
| Alto-baixo | Preveja o próximo cartão ou descontar uma série. Laços tentar novamente; palpites errados / tempo limite perdem a pontuação acumulada. |
| Galeria de Tiros | Mire em alvos de tamanhos diferentes e evite armadilhas explosivas; configure modelos de armas, munição, recarga, intervalo de fogo e pontuações. |
| MWENT | Facções, líderes, baralhos e estratégia redonda; veja [MWENT](#mwent/start). |

Sem DRM, use livre ou item entrada e item recompensas. DRM moedas / condições e outras recompensas integradas exigem seus fornecedores.

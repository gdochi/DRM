---
title: Comportamento de encontro, perseguição e revanche
slug: cobblemon-encounters-rematches
order: 521
description: Siga Interação, Visão, Raio, perseguição, posicionamento, recarga e progressão redonda na ordem de execução do servidor.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Criadores construindo encontros automáticos e treinadores de revanche
tags:
  - encounter
  - chase
  - rematch
translationSource: en
translationMethod: assisted
---

## Encontrar gatilhos e revanches

Escolha o gatilho de batalha em **Battle Config → Encounter**. O exemplo **Trigger: Interaction** começa quando o jogador interage. Para detecção automática, mude o gatilho e revise a visão, a distância e a perseguição juntos.

![Encontro gatilho, visão, perseguição e posicionamento de batalha.](assets/media/guides/cobble-029-neo1211/cobble-encounter.png "0.2.9 / NeoForge 1.21.1. A distância inicial da batalha e a distância da visão são configurações diferentes. Configurar rematches em Rounds → Rematch Policy.")

## Avaliação do gatilho

| Gatilho | Verificação do servidor | Uso típico |
| --- | --- | --- |
| `Interaction` | Clique com o botão direito da mão vazia | Testes básicos e desafios iniciados pelo jogador |
| `Vision` | Distância, meio-ângulo voltado para NPC e linha de visão opcional | Treinadores que notam e se aproximam de um jogador visível |
| `Radius` | Distância em torno do NPC | Aquisição independente de direção; ângulo de visão e linha de visão não são usados |

Visão e Raio rejeitam jogadores criativos ou espectadores, jogadores mortos ou removidos, jogadores já em batalha, jogadores reservados ou perseguidos por outro encontro, e jogadores bloqueados pelo progresso, recarga ou condições atuais. Se vários jogadores válidos se qualificarem, o mais próximo será selecionado.

## Intervalos e custo de varredura

| Configurando | Alcance | Significado |
| --- | ---: | --- |
| Intervalo de detecção | 5–200 carrapatos | Intervalo de varredura de novo alvo. Valores mais baixos reagem mais rápido, mas custam mais com muitos treinadores. |
| Distância da visão | 1–64 blocos | Alcance máximo de visão |
| Visão meio-ângulo | 5–180 graus | Permitido ângulo em cada lado da direção da NPC para a frente |
| Raio de detecção | 1–64 blocos | Alcance do gatilho de raio |
| Linha de visão | Ligar/Desligar | Requer que o NPC realmente veja o jogador no modo Visão |

Depois de adquirir um alvo, o NPC atrasa outra tentativa de aquisição por pelo menos 40 carrapatos ou o intervalo de varredura configurado, o que for mais longo.

## Feedback de detecção

O feedback de detecção é executado uma vez para Visão ou Raio, nunca para Interação.

| Campo | Alcance ou comportamento |
| --- | --- |
| Texto do marcador | Até 32 caracteres; quebras de linha removidas |
| Ticks de reação | 1 – 200 carrapatos antes da perseguição ou inicialização de batalha imediata |
| Marcador Cor | `#RRGGBB` ou `#AARRGGBB` |
| Escala | 0.25–4.0 |
| Y Offset | 0–3 blocos |
| Distância de exibição | 4–256 blocos |
| Segure Ticks. | 0–600 marca após a liberação do alvo |
| Volume de som / passo | 0–4 / 0.05–4 |

O NPC espera por Ticks de Reação. Ele então começa imediatamente se Chase está fora, ou transições para perseguir quando habilitado.

## Terminação de perseguição

| Configurando | Alcance | Comportamento |
| --- | ---: | --- |
| Velocidade de Caminhada | 0–100 | CustomNPCs escala de velocidade de caminhada; multiplicador de navegação é `Walking Speed ÷ 5` |
| Parar Distância | 0.5–8 blocos | Iniciação de batalha é tentada dentro desta distância alvo |
| Distância máxima | Pelo menos pare a distância, até 96 | Distância máxima permitida entre as posições atuais do NPC e do jogador-alvo, recalculado cada tick do servidor |
| Duração | 10–1200 carrapatos | Tempo máximo de perseguição |
| Voltar para casa | Ligar/Desligar | Navega de volta ao ponto de origem capturado após falha ou cancelamento |

Saída, morte, outra batalha, mudanças de reserva, tempo limite, e a distância atual do jogador do NPC excedendo a distância máxima, tudo acaba com a perseguição. A navegação de retorno termina na chegada ou um interno 1200- Marque o tempo limite de segurança.

O ponto de origem capturado é usado apenas para voltar para casa e posicionamento de batalha. Não é usado para a verificação de distância máxima.

## Posicionamento e bloqueio NPC

`Battle Positioning` captura o ponto inicial do NPC e coloca o jogador 1 –16 blocos de distância antes da reprodução da apresentação.

1. Capture a posição e orientação do NPC.
2. Alinhe o NPC e o jogador.
3. Envie a apresentação para o cliente.
4. Verifique novamente as condições após a apresentação e o atraso no início da rodada.
5. Ocultar e reservar o NPC enquanto Cobblemon é dono da batalha.
6. Restaurar posição, visibilidade e estado de bloqueio na vitória, perda, fuga ou falha de inicialização.

Uma apresentação que joga sem uma batalha seguinte pode, portanto, indicar estado-alvo inválido, reverificação de condição falhada ou falha na criação de equipe.

## Regras de nível de batalha

| Modo | Comportamento |
| --- | --- |
| `Keep` | Usa níveis de autoria. |
| `Fixed` | Define o lado do treinador, ou ambos os lados da batalha, para um nível de 1–100. |
| `Match player party average` | Alveja a média da equipe atual do jogador mais uma compensação de -99 para 99, preservando as lacunas de nível da equipe de treinamento sempre que possível. |

Níveis fixos e combinados afetam apenas cópias de batalha. Eles não mudam permanentemente o jogador. Pokémon. Configurações fixas mais antigas carregam com ambos os lados selecionados para preservar seu comportamento anterior.

## Rematches e seleção redonda

O primeiro desafio sempre usa rodada 1. `Start Round` e `Round Mode` aplicam-se somente após a primeira vitória.

| Configurando | Comportamento |
| --- | --- |
| Rematch Off | Um jogador que ganhou uma vez não pode desafiar novamente; perda e fuga não aumentam a contagem clara |
| Max Rematches `0` | Sem revanche. |
| Max Rematches `3` | Até três clears adicionais após a primeira vitória |
| Max Rematches `-1` | Ilimitado |
| `Fixed` | Cada revanche usa Start Round |
| `Continue` | Avanços de Start Round e fica na rodada final |
| `Loop` | Ciclos desde Start Round até a rodada final |

Com quatro rodadas e Start Round 2, o primeiro desafio é redondo 1. `Continue` então usa 2→3→4→4; `Loop` usa 2→3→4→2.

## Arrefecer.

Cooldown aceita 0 carrapatos através de um dia (1,728,000 carrapatos).

- `Player` armazena uma recarga separada de NPC/jogador, para que outros jogadores possam desafiar imediatamente.
- `NPC` compartilha a recarga de todos usando o NPC.

Contagem clara, recarga e estado de rodada recompensada persistem no lado do servidor. Testes repetidos em uma conta podem reutilizar o estado antigo mesmo após as alterações do documento.

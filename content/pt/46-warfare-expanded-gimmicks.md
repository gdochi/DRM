---
title: Reações do veículo
slug: expanded-vehicle-gimmicks
order: 320
description: Configure pistas de disparo, reações a danos, fumaça, desmontagens e bombardeios.
product: dochi-warfare-expanded
category: Veículos
section: vehicles
status: Rascunho
version: 0.3.3
audience: Criadores de combate
translationSource: en
translationMethod: assisted
---

## Habilitar uma reação

Habilite uma entrada na lista de truques do editor de veículos, defina suas condições e salve. Todas as entradas padrão são desativadas. O servidor verifica o motor, as armas, o sistema de fumaça e os assentos. `Show all` também expõe configurações salvas não suportadas, com a edição desativada.

| Gimmick | Comportamento e condições |
| --- | --- |
| Atirando cue | Joga quando a espera de disparo de uma arma começa; preserva o alvo, munição e regras de atraso. |
| Recuar. | Recupera-se pouco depois da perda real de HP desde a última atualização da IA; veículos de roda/faixa. |
| Fumaça de emergência | Solicita fumaça nativa em danos, baixa HP ou início de retirada; exclui explosões de aeronaves. |
| Baixa saúde estouro | Muda o comprimento/pausa da explosão seguinte quando o fogo da explosão de base está ativado; preserva a taxa de incêndio nativa. |
| NPC combate desmontar | Descarrega passageiros de transporte selecionados com um alvo válido próximo depois de 10 carrapatos estáveis de baixa velocidade. |
| Escapada de baixa saúde. | Resumidamente se afasta do alvo durante um episódio de baixa saúde. |
| Recarregar retiro | Retiros enquanto todos habilitados, recarregam armas elegíveis para a tripulação; termina quando uma arma utilizável termina ou o alvo é perdido. |
| Aperte o passo de lado | Move-se perpendicularmente à direção do alvo após dano suficiente. |
| Bombardeio | Usa `LEVEL`, `DIVE` ou `CARPET` em aeronaves de asa fixa validadas com armas de queda livre. |

1. Abra o veículo com **DW Npc Core** e selecione **Gimmicks** à esquerda.
2. Selecione um nome de reação, configure suas condições e tempo à direita e ative o botão **OFF**.
3. Configure pistas de disparo por arma em **Weapons → chosen weapon → Fire wait / Preparation cue**. Uma espera zero não dá sinal.
4. Verifique **AI enabled** e o modo de movimento, então **Save**. A captura de tela abaixo é o estado inicial com IA e reações ainda desligadas.

![A lista de M1A2 Gimmicks e instruções de preparação do tiro.](assets/media/guides/warfare-expanded-031-neo1211/dwe-reactions.png "DWE 0.3.1 / base SuperbWarfare M1A2 / NeoForge 1.21.1. Mostrar: apenas filtros de reações para este veículo. OFF é o estado não configurado, não um efeito em execução.")

## Saúde e tempo

Para 500 HP máximo, ** 2% de perda de saúde** significa pelo menos 10 HP real perdido desde a atualização anterior da IA. ** 25% de saúde restante ** significa 125 HP ou menos. Reações de baixa saúde requerem recuperação acima do limite em 5 pontos percentuais antes da rearmagem.

20 carrapatos igual a um segundo em 20 TPS. Munição de fumaça nativa e regras de recarga se aplicam além do resfriamento da reação. DWE não recarrega fumaça ou adiciona invulnerabilidade ou efeitos de bloqueio de alvo.

## Movimento e passageiros

A prioridade de movimento simultâneo é bater retiro → bater passo a lado → fuga de baixa saúde → recarregar retiro. Reações usam limites de casa existentes e navegação sem teletransporte. Desabilite o movimento em `STATIONARY` ou `HOLD` para bloquear reações nesses modos. Disparar durante uma reação ainda respeita regras normais de stop-before-fire, mira e segurança.

Desmontagens de combate afetam os passageiros de transporte existentes DNPC ou CustomNPCs em veículos de roda / pista. Motoristas, artilheiros, assentos de armas e jogadores são excluídos. Saídas inseguras impedem a desmontagem. Ele não cria NPCs nem entra automaticamente neles novamente; registros de conclusão por assento / NPC persistem.

## Bombardeio contra chamadas de apoio

Um truque de bombardeio de veículos controla uma aeronave de IA existente: `LEVEL` para ataques de precisão de nível, `DIVE` para ataques de mergulho e `CARPET` para quedas de área repetidas. Armas nativas, munição, RPM e física de voo ainda se aplicam.

Para chamar aeronaves temporárias ou reforços em horários programados, use o separado [Linha do tempo de suporte](#dochi-warfare-expanded/expanded-support-timeline).

## Evacuação do motor e desembarque de combate

**NPC combat dismount** é a reação dos passageiros de transporte descrita acima. A evacuação por falha do motor da 0.3.3 é separada e inclui motoristas e atiradores. Veja [danos aos componentes](#dochi-warfare/warfare-vehicle-ai) para as condições de parada, saída e recuperação.

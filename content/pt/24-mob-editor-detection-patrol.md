---
title: Obtenção, perseguição e enfrentamento de alvos
slug: mob-editor-detection-patrol
order: 250
description: Alvo hostil separado, perseguição entre padrões e movimento de palco.
product: mob-editor
section: combat
category: BattleWorks
status: Guia
version: 0.1.7
audience: Iniciantes e criadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Escolha quem adquire o alvo

| Método | Configurando | Usar |
| --- | --- | --- |
| Use o alvo existente do mod NPC | Digitalizar sem alvo desligado | Use DNPC alvos de IA de combate ou CustomNPCs alvos em versões mais antigas Minecraft |
| BattleWorks varredura de fallback | Digitalizar sem alvo | Procure entidades vivas próximas quando não houver um alvo válido |

Escaneamento Fallback não é o mesmo que DNPC relação ou CustomNPCs Filtragem de facções. Teste cuidadosamente em torno de aldeões ou outros NPCs. Jogadores criativos e espectadores são excluídos.

## 2. Teste a varredura do fallback isoladamente

Em **Combat Rules → Combat**, comece com:

| Configurando | Valor | Significado |
| --- | --- | --- |
| Digitalizar sem alvo | Ligado. | Pesquisar quando não existe um alvo válido |
| Alcance de varredura do alvo | 16 | Distância de pesquisa |
| Awareness FOV | 360 | Procure em todas as direções horizontais |
| Exigir linha de visão | Ligado. | Excluir entidades obscurecidas durante a digitalização |

1. Abordagem em Survival pela frente e atrás.
2. Reduza o FOV para 160 e compare a detecção traseira.
3. Teste com uma parede entre jogador e NPC.
4. Desativar a digitalização novamente se estiver usando CustomNPCs Facções.

A configuração de linha de visão da varredura afeta a aquisição. A exigência de linha de visão do Pattern Core afeta o início desse movimento.

![Escaneamento de alvo, linha de visão e perseguição em Regras de Combate → Combate.](assets/media/guides/battleworks-016-neo1211/battleworks-combat.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Scan Without Target e Target Scan Range encontram um alvo. Perseguir alvo e abordagem de controle de distância após adquiri-lo.")

## 3. Configurar a busca entre padrões

| Configurando | Papel | Melee valor de partida |
| --- | --- | --- |
| Suprimir ataques nativos | Reduzir o conflito com ataques nativos e combater a IA | Ligado. |
| Perseguição Alvo | Navegue em direção ao alvo entre padrões | Ligado. |
| Rosto entre padrões | Enfrentar durante o noivado e reutilizar esperas | Ligado. |
| Multiplicador de Velocidade de Perseguição | Multiplicador de velocidade de navegação | 1.0 |
| Distância de aproximação | Espaçamento desejado | 2.0 |

O espaçamento desejado pode ser fixado no alcance de um ataque não-mobilidade disponível para a fase atual. Ainda alinham a caixa, o padrão e o terreno.

Desativar a supressão pode permitir que a IA de ataque do ator ou outro controlador compita com BattleWorks. Evite controladores concorrentes ao diagnosticar movimento.

## 4. Configurações de palco assumir durante um padrão

Face Target segue o alvo durante esse estágio. Parar Horizontal pára o movimento horizontal, mantendo a física vertical. Hold é movimento estacionário; Toward, Away e Orbit são movimentos de combate de autoria.

Uma sessão de movimento de linha do tempo dedicada pode manter o controle sobre a parada e a perseguição de palcos comuns. Veja [ ações de movimento](#mob-editor/battleworks-movement).

Se o NPC enfrentar corretamente enquanto espera, mas desviar o olhar durante um ataque, inspecione o alvo de face do estágio ativo. Um ataque intencionalmente de direção fixa deve manter seu comportamento pretendido.

## 5. Envolvimento e redefinição de tempo

| Configurando | Significado | Exemplo |
| --- | --- | --- |
| Envolva o Delay Min / Max | Espere depois de adquirir um alvo antes do primeiro padrão | 10–18 carrapatos |
| Repetir Atraso | Espere antes de tentar novamente sem nenhum movimento elegível. | 10 carrapatos |
| Combat Reset Atraso | Intervalo sem alvo antes do estado de combate ser reiniciado | 100 carrapatos, cerca de 5 segundos |

Um reset limpa o estado de combate, como história, cooldowns, fases e estado passivo. Não é cura completa automática ou teletransporte para uma posição em casa.

## 6. Se a perseguição funciona, mas os ataques não.

1. Confirme o alvo pretendido.
2. Verifique o padrão Habilitado e o intervalo de fase.
3. Verifique o alcance horizontal Min/Max.
4. Verifique Max Vertical e linha de visão.
5. Compare a Distância de Abordagem com o hitbox real.
6. Inspecione as recargas e repita as penalidades.
7. Verifique a velocidade de movimento do NPC, IA desabilitada e caminhos bloqueados.

Configure espera e patrulha no editor do próprio ator, como DNPC. Orbit é movimento de etapa ao redor do alvo; não edita rotas de patrulha do mundo.

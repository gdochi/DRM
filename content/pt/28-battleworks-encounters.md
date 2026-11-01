---
title: Construa um chefe de espada em duas fases
slug: battleworks-encounters
order: 272
description: Combine corte, empurrão, retiro e uma transição de meia-saúde em um encontro.
product: mob-editor
section: combat
category: BattleWorks
status: Guia
version: 0.1.6
audience: Iniciantes e criadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## O que você vai construir

Um chefe de espada usa slash, empuxo e recuo, então adiciona um ataque aprimorado abaixo. 50% saúde. Nenhum mod de feitiço opcional é necessário. Os valores estão ensinando pontos de partida, não uma garantia de dificuldade equilibrada.

Comece com o trabalho [Primeiro ataque](#mob-editor/battleworks-first-attack).

## 1. Faça um arquivo de trabalho separado

1. Carregue o primeiro ataque.
2. Save As `bosses/training_captain.json`.
3. Defina a saúde máxima para **100** em DNPC **Combat AI → Max health**. Para um ator legado CustomNPCs suportado, use sua própria tela de estatísticas.
4. Verifique se os antigos scripts de combate não estão competindo.
5. Mantenha o equipamento e a saúde do jogador consistentes entre os testes.

Mantenha first_sword como uma comparação de trabalho conhecida.

## 2. Planeje os movimentos

| Padrão | Intervalo de início | Windup / Ação / Recuperação | Papel |
| --- | --- | --- | --- |
| Slash | 0–2.7 | 24 / 16 / 24 | Ataque básico |
| Impulso | 0–3.2 | 28 / 16 / 24 | Ataque avançado mais longo |
| Retiro curto. | 0–2.0 | 6 / 12 / 12 | Abra espaço. |
| Corte aprimorado | 0–2.7 | 18 / 16 / 20 | Fase 2 adição |
| Enfurecedor começo | Ampla faixa adequada | 0 / 30 / 10 | Anúncio de fase |

Fora do alcance de ataque, Chase Target deve aproximar o NPC. Um chefe corpo a corpo precisa de uma abordagem navegável.

## 3. Estabilize a barra e empurre

1. Mantenha a barra de trabalho.
2. Crie o [ Thrust Box](#mob-editor/battleworks-hitboxes) e ligue-o a outro padrão.
3. Comece os dois em Dano 4.
4. Coloque o empuxo em Action tick 3 e ajuste-se ao contato real.
5. Dê prioridade 10 e pontuação base 10.
6. Confirme que ambos aparecem em repetidas lutas de perto.

Resolva problemas de seleção e intervalo antes de adicionar fases.

## 4. Adicionar retiro

1. Siga o [Fora do exercício de movimento](#mob-editor/battleworks-movement).
2. Marque o padrão Mobilidade e use um papel de movimento distinto.
3. Inicialmente deixe-o livre de danos.
4. Start Base Score em torno de 6 por isso é menos proeminente do que ataques.
5. Verifique se a perseguição recomeça após o retiro.

Se o movimento dominar, verifique se os ataques estão falhando em suas condições de alcance antes de mudar as pontuações.

## 5. Adicionar fase 2

1. Abra **Combat Rules → Boss Phases**. Se P1 e P2 já existem, selecione P2 e defina seu limite para **50**; Adicione somente se ele estiver ausente. Mantenha P1 em 100%.
2. Crie uma barra aprimorada separada e defina a Fase Min 2.
3. Mantenha ataques comuns disponíveis em ambas as fases.
4. Antes de aumentar os danos, encurte o Windup aumentado de 24 para 18.
5. Se for muito abrupto, afinar entre 20 e 24.

Troque o tempo, os danos ou a contagem de batidas um de cada vez.

![O limite de saúde P2 existente economizou em 50.](assets/media/guides/battleworks-016-neo1211/battleworks-boss-phases-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Selecione P2 · Enfurecido à esquerda e salve o limite 50 à direita. Esse artefato prefixa essa legenda com erro de formatação; salvando relatórios Avisos 0, e controla a saúde do servidor 100/ 100 → 49/ 100 confirma a fase 1 → 2.")

O [first slash plus two-phase starter file](assets/media/battleworks/first_two_phases.json) é a interface de usuário nativa exata mostrada acima. Ele contém **uma barra básica e duas fases de saúde**. Adicione o ataque aprimorado e a sequência de raiva nas etapas a seguir. Coloque-o abaixo de `config/dochi_rpg_maker/mobs/patterns/`, carregue-o e salve-o no NPC.

## 6. Conecte a transição

1. Dê ao Enrage Start um título e som em ação 0.
2. Mantenha o gatilho no Manager e permita a fase 2.
3. Para uso somente em transição, defina a Pontuação Base e todos os bônus aditivos para zero.
4. Selecione-o como padrão de transição da fase 2.
5. Reduza a saúde abaixo da metade e verifique uma transição.
6. Curar e confirmar que a fase permanece fechada.

Veja [ detalhes da fase ](#mob-editor/mob-editor-phases) para condições de transição forçada e saltou limiares.

## 7. Opcionalmente, adicione um passivo

Use [Retirada de Dano Danificado](#mob-editor/battleworks-passives) para uma resposta às setas. Se você também quer um retiro comum, mantenha padrões separados: mudar um padrão para passivo o remove da seleção do gerente.

Reações básicas na fila esperam por uma abertura. Cancelamento imediato de danos usa um gatilho avançado diferente.

## 8. Opcionalmente, adicione um aviso de terra

Crie um anel no [Particle Maker](#mob-editor/battleworks-particles) e anexe-o ao Windup. Combine seu tamanho e duração com o Hitbox real.

Por um ataque ao jogador **posição anterior**, use [Salvar posição → aviso → Atingido atrasado](#mob-editor/battleworks-advanced-actions).

## 9. Testar uma matriz de situação

| Situação | Verificar |
| --- | --- |
| Cerca de 1 bloco | Riscar e retirar a elegibilidade |
| Cerca de 2.5 blocos | Contato e danos reais |
| Cerca de 3 blocos | Impulso ou abordagem renovada |
| Cerca de 6–8 blocos | Perseguição levando a um ataque |
| Paredes e escadas | Navegação, altura e condições de visão |
| Atravessando 50% de saúde | Transição e movimento aprimorado |
| Cura em combate | A fase continua presa. |
| Perda de alvo e outra luta | Reinicialização do estado pretendido |
| Morte | Apresentação, BGM terminando, chamar limpeza |

## 10. Prepare o pacote

Reabra o arquivo salvo e verifique os valores. Inclua todas as dependências de combate, partícula, modelo, som, popup, clone e provedor.

Use [arquivos e orientação de backup](#mob-editor/battleworks-files) e [dissolução de problemas](#mob-editor/battleworks-troubleshooting) antes de compartilhar.

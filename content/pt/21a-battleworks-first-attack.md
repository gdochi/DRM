---
title: Seu primeiro ataque corpo a corpo
slug: battleworks-first-attack
order: 225
description: Crie um ataque com configurações exatas, salve-o, aplique-o e verifique o resultado.
product: mob-editor
section: start
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

BattleWorks 0.1.7 também oferece [Simple edit e receitas](#mob-editor/battleworks-authoring). Esta página mantém o exercício Build Assist para ensinar cada valor. Abra pela varinha ou pelo DRM Core opcional e use Detailed edit para as configurações de etapa abaixo. As capturas de 0.1.6 mantêm suas versões originais.

## O que você vai construir

Um DNPC usando um modelo de jogador normal se aproxima de um jogador, se prepara para cerca de 1.2 segundos, varre na frente e se recupera. Complete [instalação e preparação de NPC](#mob-editor/mob-editor-setup) primeiro e abra BattleWorks com a prática NPC selecionada.

As novas capturas foram verificadas com BattleWorks 0.1.6, DRM 0.3.1 e DNPC 0.1.3 em NeoForge 1.21.1. Esses valores estão ensinando pontos de partida. Gecko e modelos modded-entity precisam de sua própria compatibilidade. [configuração de animação](#mob-editor/battleworks-animation).

## 1. Criar o documento

1. Selecione **Create New**.
2. Dê ao documento um nome reconhecível e ative-o.
3. Desativar padrões não relacionados ao fazer este exercício.
4. Abra **Pattern Build Assist**.

Se estiver trabalhando em um chefe existente, primeiro crie uma cópia de prática separada com Save As.

## 2. Responda às perguntas da build-assist

| Pergunta | Escolha |
| --- | --- |
| Nível de detalhe | Iniciante |
| Forma de Ataque | Varredura larga |
| Ataque Tempo | Medido |

Escolha **Beginner → Wide Sweep → Measured**. Cada resposta avança para a próxima pergunta automaticamente. Inspecione **Review Choices**, revisite uma pergunta, se necessário, então pressione **Create Pattern**.

Verificação de conclusão: um padrão e um hitbox reutilizável aparecem. O assistente os adiciona sem substituir os padrões existentes.

![Escolhas de ataque em Pattern Build Assist.](assets/media/guides/battleworks-016-neo1211/battleworks-assist.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Comece com Beginner, depois escolha Wide Sweep e Measured. Volte a uma pergunta para mudar uma resposta anterior.")

## 3. Leia o timing gerado

| Configurando | Valor | Significado |
| --- | --- | --- |
| Windup Ticks | 24 | Cerca de 1.2 segundos de preparação |
| Ticks de ação | 16 | Cerca de 0.8 segundos de ação |
| Hitbox Evento Tick | 3 | Contato 3 ticks em Ação |
| Ticks de recuperação | 24 | Sobre 1.2 segundos de recuperação |
| Hitbox Dano | 4 | Dano configurado antes das defesas |
| Padrão Cooldown | 40 | Reutilizar o atraso após este padrão terminar |
| Animação de ação | Balanço de mão principal | Balanço básico normal-humanoide |

Os três estágios totalizam ** 64 carrapatos**, cerca de 3.2 segundos. O marcador de contato está no carrapato geral `24 + 3 = 27`. Reutilização e atrasos pós-padrão também afetam o tempo entre os ataques.

![Gerou um padrão de varredura ampla com uma linha do tempo 24/16/24-tick.](assets/media/guides/battleworks-016-neo1211/battleworks-assist-built.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Compare Windup, Ação, Recuperação e o marcador Hitbox no tick 27. Isso mostra a criação de padrões, não demonstra um sucesso em combate.")

## 4. Limite o alcance após o primeiro teste

O gerador começa com Max Range. `3.5` e Max Vertical `32`. Você pode salvar, aplicar e testar esses valores primeiro. Use os seguintes ajustes depois para restringir o ataque.

1. Selecione as configurações **Core** do novo padrão.
2. Definir o alcance mínimo `0`, Max Range `2.7`E Max Vertical `2.5`.
3. Em Pontuação, use Distância Ideal `2.0`.
4. Selecione sua ação Hitbox e escolha **Edit this hitbox**.
5. Confirme Alcance `2.4`, Espessura `0.5` e Dano `4`.
6. Ativar **Locked Target Only** para a luta de treino.

Max Range determina quando o padrão pode começar. Sweep Reach determina o alcance do hitbox. Aumentando Max Range para 10 não faz a arma chegar 10 Blocos.

## 5. Pare e enfrente o jogador durante o ataque

1. Selecione Windup, Action e Recovery.
2. Habilitar **Face Target** em cada um.
3. Ativar **Stop Horizontal** e usar **Hold** movimento.
4. Mantenha o balanço da mão principal gerado em Action.
5. Use **Simulation** ou Hitbox Library Play para inspecionar a direção e o contato.

Verifique avisos de visualização ou uma janela de visualização que não abre separadamente do combate real. Um modelo visível por si só não verifica seu movimento ou contato. Confirme os danos reais no teste de sobrevivência abaixo.

## 6. Configurar o comportamento de combate

Abra **Combat Rules → Combat**.

| Configurando | Valor |
| --- | --- |
| Suprimir ataques nativos | Ligado. |
| Perseguição Alvo | Ligado. |
| Rosto entre padrões | Ligado. |
| Multiplicador de Velocidade de Perseguição | 1.0 |
| Distância de aproximação | 2.0 |
| Digitalizar sem alvo | Vamos lá por isso. DNPC Exercício |

Use Scan Range 16 e FOV 360 em uma arena isolada. A varredura pode selecionar outras entidades vivas, manter NPCs amigáveis e outras criaturas fora deste teste. Suportado mais velho CustomNPCs Em vez disso, as instalações podem fornecer um alvo de facção com a varredura de fallback.

Em **Manager**, conjunto **Same Pattern Penalty to 1.0**. Com apenas um padrão, um valor de 0 pode remover o único candidato após seu primeiro uso.

## 7. Salvar e aplicar

1. Escolha **Save As**, digite `training/first_sword.json` e confirme com **Save** no flyout.
2. Com o NPC ligado, pressione **Save** para vinculá-lo a esse caminho.
3. Se criou sem um NPC, selecione o NPC de prática com a varinha ou DRM Core opcional e aplique o arquivo pelo catálogo.
4. Feche o editor.

Você também pode baixar o [ UI-salvo first_sword.json](./assets/media/battleworks/first_sword.json) em `config/dochi_rpg_maker/mobs/patterns/training/` e carregá-lo. Este arquivo foi testado em combate com o Scan Range 16, FOV 360 e a Mesma Pena Padrão 1.0. Ele mantém os valores de ataque gerados antes dos ajustes opcionais na seção 4.

## 8. Teste no mundo

1. Mude para Survival e fique a cerca de seis quarteirões de distância.
2. Confirme que o Scan Without Target está ligado e nenhuma outra entidade viva está por perto.
3. Confirme aproximação, preparação, contato e recuperação.
4. Mova-se para os lados durante outro ataque e observe a frente.
5. Afaste-se e confirme os currículos de perseguição.

| Fracasso | Primeiros cheques |
| --- | --- |
| Sem reação. | Modo de sobrevivência, alvo hostil, Ativado, arquivo aplicado correto |
| Aproxima-se, mas nunca ataca | Intervalo, padrão Habilitado, recarga, pontuação de repetição |
| Balanços sem danos | Link da caixa de entrada, hora do evento, altura, geometria, dano |
| Ataques extras fora do tempo | Supressão de ataques nativos e scripts de combate legados |
| O dano difere de 4 | Armadura, molduras de invulnerabilidade, efeitos, outros mods |

![Configurações de combate depois de salvar o arquivo e ligá-lo ao NPC.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Cheque Salvo. Avisos: 0, Scan Without Target, Scan Range 16 e FOV 360. O arquivo do servidor é criaturas/padrões/treinamento/first_sword.json.")

![O jogador de sobrevivência enfrenta o DNPC depois de receber dano de varredura larga.](assets/media/guides/battleworks-016-neo1211/battleworks-first-fight.png "BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1. A saúde do servidor de jogadores desarmados caiu de 20 para 12. A geração natural e a regeneração foram excluídas no mundo de captura de propriedade, e o alvo NPC foi verificado como este jogador. Este total não é o dano de um ataque.")

![Testar Wide Sweep num jogador em Sobrevivência e observar a alteração da vida.](assets/media/guides/short-videos-20261106/battleworks-first-attack.mp4 "BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1. A vida no servidor passou de 20 para 16.")

## 9. Alterar um valor de cada vez

Primeira mudança Windup de 24 para 40, salvar/aplicar, e observar o extra 0.8 segundos. Restaurar, em seguida, alterar Dano de 4 para 2. Finalmente, mova Event Tick de 3 para 8 e compare o tempo de contato.

Mantenha o original de trabalho. Continue com [ espaço de trabalho e cronograma](#mob-editor/mob-editor-patterns).

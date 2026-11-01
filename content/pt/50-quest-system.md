---
title: Quest Editor E Diário
slug: quest-system
order: 100
description: Pacotes de missões, objetivos, recompensas, conclusão, ações completas e o diário do jogador.
product: core
category: Sistema Quest
section: quest-editor
status: Estável
version: 0.3.1
audience: Criadores de missões
tags:
  - quest
  - journal
translationSource: en
translationMethod: assisted
---

## Faça a primeira missão do NPC

Abra **Quest Editor → Create New** da lista de editores do núcleo. Use **+ Categoria** para um capítulo, então **+ Quest** para uma busca dentro dele. São **DRM 0.3.1 / Forge 1.20.1** screenshots.

![Forge Quest Editor Página de informações com identidade de missão, fontes de aceitação e modo de conclusão.](assets/media/guides/drm-031-forge1201/quest-info.png "Title é mostrado aos jogadores. Interação NPC / Diálogo está ligado; Player Quest Journal está desligado. Forge Este exemplo usa o Modo de Conclusão: Entre.")

1. Preencha **Info → Quest ID / Title / Description** com seu nome de referência, título do jogador e tarefa.
2. Com **Start Policy → Manual Accept**, habilite a fonte de aceitação: **NPC Interaction / Dialogue** para o diálogo ou **Player Quest Journal** para o botão Aceitar.
3. Adicione um gol com **Objectives → + Add** e escolha o tipo e a contagem necessária. Um novo objetivo pode inicialmente ser **Dialogue Signal**, como abaixo; verifique o tipo.
4. Adicione recompensas com **Rewards → + Add**.
5. Para **Completion Mode → Turn in**, forneça uma etapa de submissão depois de atingir os objetivos. **Automatic** completa depois que os objetivos são atingidos. Isso difere do guia NeoForge.
6. **Save As** o pacote e conectar **quest_start** no diálogo NPC. Para ligar, conecte **quest_turn_in** no diálogo de conclusão também.

![Um novo objetivo de Dialogue Signal com campos Signal e Necessário.](assets/media/guides/drm-031-forge1201/quest-objective-detail.png "Este objetivo não conta itens mantidos. Ele progride quando recebe o sinal correspondente; combine Signal com a ação de diálogo quest_signal.")

Abra o diário com **U** para testar aceitação, progresso, conclusão e entrega de recompensa real. O pacote de amostras empacotado está desativado; habilite e salve seu próprio pacote.

As embalagens são salvas em `config/dochi_rpg_maker/quests/<pack>/`. Copie a pasta do pacote inteiro, incluindo `pack.json` e `quests/`, ao movê-la.

## Quest Estrutura

| Área | Valores Suportados |
| --- | --- |
| Política de início | `manual_accept`, `auto_when_available`, `first_progress`; legado-compatível `dialogue` e `journal_accept` também são aceitos |
| Aceitar fonte | NPC/diálogo através de `quest_start`, jogador Jornal botão aceitar |
| Conclusão | `turn_in`, `automatic` |
| Repetir | `never`, `always`, `daily`, `cooldown` |
| Pré-requisitos | `all`, `any`, `required_count` |
| Grupos objetivos | `all`, `any`, `sequence`, `required_count` |

Objetivo deixa localização de apoio, item, matar, sinal de diálogo, e CustomNPCs pontuação de facção. Os objetivos do item podem representar posse, aquisição ou entrega. Itens de suporte de recompensas, pontos/níveis de EXP, moeda DRM e comandos.

## Integração de diálogo

As ações de diálogo fornecem `quest_start`, `quest_turn_in`, `quest_signal`, `quest_fail`, `quest_abandon` e `quest_pin`. Use isso quando um NPC controlar o fluxo de missões. Uma missão aceita pelo jornal deve ter sua fonte aceita ativada.

## Depois de concluído

A página Ações expõe apenas `After Complete`. O servidor segue esta ordem:

1. Confirme que a missão está pronta e que os itens de entrega podem ser consumidos.
2. Conceda todas as recompensas pendentes.
3. Defina o estado da missão como `Completed` e marque a ação de conclusão como executada.
4. Despache as ações configuradas `After Complete` uma vez.

Se uma recompensa falhar, a busca permanece pronta para a entrega e `After Complete` não corre. Reiniciar o progresso da missão não recupera recompensas já concedidas.

## Player Journal

A chave padrão é `U`. A revista suporta filtros de categoria/estado, busca, detalhes, listas de objetivos/recompensa, rastreamento, aceitação, abandono, atualização e componentes próximos. Edite `gui/default_quest_journal_gui.json` até GUI Maker e salve uma variante de produção com `Save As`.

## 0.2.8 ações e resultados de relações

Item, tag, pontuação de facção e ações de avanço expõem campos específicos da operação. Selecionadores JSON registrados selecionam arquivos de servidor do tipo correto; os selecionadores de missões suportados incluem outros pacotes e missões não salvas atuais.

Score actions select CustomNPCs Facções ou DNPC Grupos de relacionamento. DNPC suportes de reputação adicionar, subtrair e definir. Use a corrente DRM e uma compilação DNPC com a API de relação juntos; um provedor ausente DNPC não volta para CustomNPCs.

O selecionador de novas ações exclui `go_stat_builder`, `cobble_npc:go_battle` e `dochi_minigames:play`. As ações salvas existentes e os registros de diálogo permanecem suportados.

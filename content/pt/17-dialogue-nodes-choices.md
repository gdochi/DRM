---
title: Conectar cenas de diálogo e respostas
slug: dialogue-nodes-choices
order: 62
description: Conecte a rota de abertura, as linhas NPC e as respostas do jogador.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guia
version: 0.3.1
audience: Criadores de diálogos
translationSource: en
translationMethod: assisted
---

## Conecte uma saudação a uma resposta

Faça um nó geral para a saudação e outro para a resposta. Ponto **start → Rotas** para a saudação. Na saudação **Choices**, escreva uma resposta e dê-lhe um **Goto** ação apontando para a resposta. Adicione uma resposta separada **Close** para sair da conversa.

![Começo da ligação, a saudação e a resposta.](assets/media/guides/drm-031-forge1201/dialogue-blueprint.png "DRM 0.3.1 / Forge 1.20.1. início é a entrada; nós gerais são cenas visíveis. As linhas de conexão mostram onde as rotas e as respostas levam.")

O completo [Primeiro exercício de diálogo](#core/dialogue-system) Capas Save As, NPC Apply e real resposta de navegação. No artefato verificado Forge 0.3.1, algumas seleções de tipo de ação não alteram o tipo; use o caminho de carregamento de exemplo testado em [condições e ações](#core/conditions-actions).

## Escolha a cena de abertura

Cada conjunto tem ** um nó de partida**. Suas rotas são verificadas de cima para baixo, e uma rota elegível escolhe a primeira cena ou outra ação de abertura. Coloque uma saudação condicional específica acima de um recuo geral.

| Parte | Propósito |
| --- | --- |
| começar a rota | Escolha onde a interação começa |
| nó geral | Mostrar uma linha NPC e respostas do jogador |
| condição de escolha | Decida se uma resposta é visível |
| ação de escolha | Decida o que acontece quando é clicado |

Condições controlam a disponibilidade; eles não executam a ação da resposta meramente exibindo-a.

## Escolha o que uma resposta faz

| Resultado desejado | Ações de escolha |
| --- | --- |
| Mostrar outra cena | Goto. |
| Abra uma loja | Vai às compras. |
| Termine de falar. | Fechar |
| Dê uma recompensa, então continue. | Ação de recompensa seguida por Goto |
| Ofereça uma resposta antes que uma recompensa seja reivindicada | Uma condição de tag mais o [Fluxo de recompensa único](#core/dialogue-rewards) |

Use um resultado claro de navegação por resposta. Múltiplas ações de navegação concorrentes podem fazer uma ação anterior decidir o fluxo.

## Referência de arquivo salvo

Você pode escrever isso no editor sem escrever esses campos sozinho.

| Objeto | Campos úteis |
| --- | --- |
| começar a rota | `goto`, `conditions`, `mode`, `actionType`, `linkMode` |
| nó geral | `name`, `type`, `text`, `textTranslationKey`, `conditions`, `choice`, `textFx` |
| escolha | `label`, `labelTranslationKey`, `conditionMode`, `conditions`, `actions`, `fx` |

O nome atual do array é **`choice`**, singular. `mode` escolhe **e/ou** para condições. Interruptores de chave de tradução interpretam o texto como uma chave ao invés de prosa literal.

Para tamanho, respostas longas e **Pulse highlight**, veja [texto de escolha e ênfase](#core/dialogue-choice-style). Essas configurações alteram a apresentação; escreva a resposta real em **Choices → Label**.

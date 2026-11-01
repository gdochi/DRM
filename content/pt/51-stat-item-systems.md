---
title: Stat Builder e editor de itens
slug: stat-item-systems
order: 110
description: Conjuntos de estatísticas personalizados, custos de alocação, itens de banco de dados, requisitos, bônus, atributos e escalabilidade.
product: core
category: Estatísticas e itens
section: stat-item
status: Estável
version: 0.3.1
audience: Criadores de sistemas de RPG
tags:
  - stats
  - items
translationSource: en
translationMethod: assisted
---

## Stat Builder

Crie estatísticas nas quais os jogadores possam investir. Comece com **Add**, nomeie uma estatística e defina seu valor mínimo, máximo e padrão. Escolha o custo de investimento **Provider** à direita: níveis de EXP, uma moeda DRM ou um item.

Conecte **Attribute** e **Base effect / Per point** para mudar a saúde real, ataque ou outro atributo. Salve, use **Set Active** e abra **Y** para verificar o custo e o resultado da alocação.

Os provedores de investimento são Minecraft níveis de EXP, uma moeda DRM, ou um item. A progressão de custos usa configurações de base, passo e multiplicador.

A tela de alocação do jogador abre com `Y` por padrão. `Allow Y key allocation UI` controla se o conjunto ativo pode ser aberto a partir do chaveiro. A ação de diálogo `Go Stat Builder` abre a mesma tela no jogo, independentemente da configuração de somente chave.

O pacote `default_stat_gui.json` usa uma ampla lista de rolagem à esquerda e valor, custo, descrição e controles de aumento separados à direita. Modifique uma cópia em GUI Maker.

![Stat Builder com força, custos pontuais e efeitos de atributo.](assets/media/guides/drm-031-forge1201/registry-stat_builder.png "DRM 0.3.1 / Forge 1.20.1. Escolha a estatística à esquerda, seus limites no meio e os custos/efeitos à direita. Atributo: Não selecionado significa que nenhum efeito de atributo está conectado ainda.")

## Editor de Itens

Escolha a base **Item template** primeiro. Defina seu nome e descrição, use **Stat Rules** para requisitos e bônus equipados, e **Vanilla Attribute** para efeitos de atributo. **Save As** seu arquivo, então use **Give Test Item** para inspecionar o resultado.

Uma definição de item pode configurar:

- transportadora/categoria, modelo de item, nome, raridade, folha, tamanho da pilha, durabilidade e tradição;
- stats alocados necessários;
- bônus de status equipados;
- modificadores de atributos de baunilha/modificados e slots de equipamentos;
- dimensionamento por ponto;
- ordem e visibilidade da seção da dica de ferramenta.

![Definição de item com linhas de dica de ferramenta, regras de estatísticas e guias de atributos de baunilha.](assets/media/guides/drm-031-forge1201/registry-item_editor.png "DRM 0.3.1 / Forge 1.20.1. O modelo de item não está selecionado no momento. Escolha o item base, configure seu nome, efeitos e requisitos, salve e, em seguida, use Give Test Item.")

## Requisito Penalidade

Os requisitos usam apenas valores alocados, então o bônus de um item não pode satisfazer sua exigência. Um jogador ainda pode segurar, equipar e atacar com um item enquanto estiver sob a exigência.

`Unmet penalty %` é a porcentagem removida da contribuição do item:

| Penalidade. | Contribuição mantida enquanto não atendida |
| --- | --- |
| `0` | 100% |
| `25` | 75% |
| `100` | 0% |

O multiplicador afeta bônus de status equipados, modificadores de atributos configurados e modificadores de escala de status. Ele não exclui ou substitui o comportamento base do item de modelo, a menos que esse comportamento seja representado por um modificador configurado.

:::tip Testando
Salve a definição antes de usar `Give Test Item`. Passe o mouse na visualização ou no item de teste para verificar a dica de ferramenta gerada e, em seguida, teste um jogador qualificado e não qualificado.
:::

## Telas de estatísticas do NPC e dicas de ferramentas de itens em 0.1.5

Na tela de aplicação do NPC, conecte um arquivo **Stat Builder** ao NPC. Interagindo com esse NPC, em seguida, abre a tela de atribuição de estatísticas do jogador usando o conjunto conectado.

Use **Visual → Tooltip Maker** para projetar como as informações do item são apresentadas. Veja o guia **Tooltip Maker** para pré-visualizações de itens, visualizações de equipamentos e rolagem de ponta de ferramenta longa. Removendo equipamento que só reduza a saúde máxima já não desempenha o efeito ferido.

## Conjuntos de equipamentos e links de ponta de ferramenta

Forge Item Editor permite que um item selecione um `setId` e um modelo de dica de ferramenta. Os conjuntos de equipamentos vivem em `items/sets/` e definem as contagens necessárias de peças equipadas, bônus de estatísticas e modificadores de atributos por nível. Modelos de dicas de ferramentas reutilizáveis vivem em `items/tooltip_templates/`.

Mantenha o item individual, o conjunto de equipamentos compartilhados e o modelo de apresentação como documentos separados. Verifique suas referências e bônus de teste / dicas de ferramentas enquanto muda peças equipadas. Esse recurso Forge não é uma reivindicação de implementação idêntica em outras carregadores de mods.

## Mover arquivos salvos

| Conteúdo | Localização |
| --- | --- |
| Conjuntos de estatísticas / conjunto ativo | `config/dochi_rpg_maker/stats/sets/` / `stats/active_set.json` |
| Definições do item | `config/dochi_rpg_maker/items/definitions/` |
| Categorias compartilhadas, raridades e configurações de dicas de ferramentas | `config/dochi_rpg_maker/items/editor_settings.json` |

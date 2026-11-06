---
title: 0.2.8 atualização
slug: release-notes-0-2-8
order: 5
description: 0.2.8 atualização
product: core
category: 0.2.8 atualização
section: getting-started
status: Guia
version: 0.2.8
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

Esta página registra uma versão ** mais antiga**. Use [DRM0.3.1](#core/release-notes-0-3-1) para instalação e uso atuais. As ilustrações da versão atual abaixo são separadas do histórico de lançamento.


## Selecção e caixas de verificação

A linha Blue Choices é a escolha sendo editada à direita. As caixas de seleção de linha marcam grupos para operações em lote. Choice actions tem sua própria seleção para a ação que está sendo editada. Continue com o guia [ atual](#core/dialogue-system) para salvá-lo e aplicá-lo.

![Seleção e caixas de seleção.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-actions.png "DRM 0.3.1 / Forge 1.20.1. Esta é a característica relacionada na produção atual, não uma captura da interface histórica descrita abaixo.")

## Instalação

DRM ** 0.2.8** alvos Forge 1.20.1 / Java 17 e Fabric / NeoForge 1.21.1 / Java 21. Combine o carregador e construa no servidor e em todos os clientes. Filtre [Arquivos Modrinth](https://modrinth.com/mod/drm/versions) tanto pela versão Minecraft quanto pelo carregador.

**CustomNPCs é opcional.** Instale-o para fluxos de trabalho que anexam diálogos, lojas ou modelos a CustomNPCs NPCs. DNPC é um provedor NPC opcional separado; o suporte a um provedor não implica que todos os recursos adicionais o suportem.

## Editar e salvar

- As listas suportadas agora oferecem verificações de linha independentes, Selecionar tudo, exclusão em massa e copiar/colar. A linha de detalhes ativos e os alvos de exclusão verificados são separados.
- Nós de diálogo, escolhas, condições e ações têm seções mais claras e rolagem. Forge multilinha-entrada e nó-arraste falhas foram corrigidos.
- NPC Apply suporta vários filtros de categoria. Corresponder a qualquer categoria selecionada inclui um arquivo; Todos limpam o filtro. A seleção é salva localmente.
- Os botões Back/Forward compartilhados navegam no histórico da tela. Salvar ou Save As ainda confirma seu documento.

## Missões e administração

As ações de busca expõem campos para o seu item, tag, pontuação, avanço, animação ou operação JSON. O selecionador de novas ações exclui `go_stat_builder`, `cobble_npc:go_battle` e `dochi_minigames:play`. As ações salvas existentes e o registro de ações de diálogo global permanecem com suporte.

Ações de faction-score podem atingir CustomNPCs Facções ou **DNPC relations**. DNPC As relações são a reputação do jogador em relação a um grupo de relações, com operações adicionais, subtraídas e definidas. Instale DRM atual e uma compilação DNPC com a API de relação em conjunto. Um provedor indisponível DNPC nunca volta a mudar CustomNPCs pontuações.

F7 Admin pode inspecionar o progresso do treinador e redefinir a vitória conta com Fabric / NeoForge com um editor compatível Cobblemon. Operações em lote agora mostram progresso.

## Remanescentes Mensagens e desempenho

Marcadores escondidos e gatilhos persistentes uma vez por jogador estão disponíveis. Pesquisa, NPC-preview e Admin-list cache e preparação GUI foram melhorados. As condições do lado do servidor, recompensas e verificações de permissão ainda governam as operações reais.

## Actualização

1. Recuem `config/dochi_rpg_maker` e o mundo juntos.
2. Instalar correspondência 0.2.8 constrói no servidor e clientes.
3. Atualização Cobblemon Editor com seu núcleo: a versão 0.2.6 requer DRM 0.2.8 ou posterior.
4. Reabrir diálogos personalizados, lojas, missões e conteúdo remanescente e verificar interações reais. Personalize modelos empacotados através de Save As.

Minecraft 26.3 portas são uma corrente de trabalho separada. Esta página descreve as versões 1.20.1 e 1.21.1.

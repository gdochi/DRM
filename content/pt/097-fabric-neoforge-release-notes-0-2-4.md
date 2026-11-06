---
title: Fabric e NeoForge 0.2.4 atualização
slug: release-notes-0-2-4
order: 7
description: Fluxo de trabalho de criação compartilhada, relógios de reabastecimento e configurações de tiling GUI.
product: core-fabric
category: Primeiros passos
section: getting-started
status: Estável
version: 0.2.4
audience: Criadores / Operadores
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Este é um registro histórico de lançamento. Veja [DRM0.3.1](#core-fabric/release-notes-0-3-1) para orientação atual.

:::note Registro de lançamento histórico
Esta página registra a versão anterior. A linha de base de instalação atual do Core é 0.2.5.
:::

## Encontre opções de reabastecimento

Abra NPC Shop Reabastecer para ativar o reabastecimento e o Timer. Defina estoque finito e máximo em Product primeiro. A imagem 24000 carrapatos é um exemplo, então escolha um período adequado para o seu servidor. Continue com o guia [ atual](#core-fabric/shop-system) para salvá-lo e aplicá-lo.

![Encontre opções de reabastecimento.](assets/media/guides/drm-031-neo1211/shop-restock.png "DRM 0.3.1 / NeoForge 1.21.1. Esta é a característica relacionada na produção atual, não uma captura da interface histórica descrita abaixo.")

## Documentação e instalação compartilhadas

**Fabric and NeoForge DRM 0.2.4 for Minecraft 1.21.1** Compartilhe esta documentação. Ferramentas de criação e fluxos de trabalho normais são os mesmos; escolha o JAR do carregador e as dependências em [Instalação](#core-fabric/installation).

## NPC Shop

Escolha `Real ticks` ou `World ticks` nos detalhes do produto em `RESTOCK > Timer basis`. A configuração se aplica em toda a loja. Os carrapatos reais contam os carrapatos reais do jogo. Os carrapatos do mundo incluem o tempo do mundo ignorado pelo sono.

Mudar o relógio ou mover o tempo para trás rebaseia a recarga restante. O estado de estoque/reabastecimento de tempo de execução baseado em arquivos mantém a persistência JSON existente. Veja [NPC Shop](#core-fabric/shop-system).

## GUI Maker

- Telha/Força e direto `Sprite Scale %` entrada, 50–400%.
- Por-componente `Tile W %` e `H %` quando `Fit` é `Tile`, cada 10–800%.
- Configurações consistentes do Tile entre visualização e diálogo ao vivo, com renderização aprimorada de repetição de imagem.

Veja [GUI Maker](#core-fabric/gui-system). Largura/altura do bloco são configurações de componentes, não padrões de interface de usuário global.

## Missões e addons

Ambos os Editores de Buscas atuais escrevem missões automáticas. Adicione a combinação Dochi Cobblemon Editor para objetivos de treinador-vitória. Veja [ Quests](#core-fabric/quest-system) e [Trainer Victory Quests](#drm-cobblemon-editor/cobblemon-trainer-quests).

Faça backup de `config/dochi_rpg_maker` e do mundo, depois instale o carregador de correspondência 0.2.4 no servidor e em todos os clientes. Use `Save As` para versões personalizadas de padrões protegidos.

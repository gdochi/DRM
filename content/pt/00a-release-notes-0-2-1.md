---
title: Forge 0.2.1 atualização
slug: release-0-2-1
order: 7
description: Per-NPC estoque da loja, relógios de reabastecimento, e controles GUI tiling.
product: core
category: Primeiros passos
section: getting-started
status: Estável
version: 0.2.1
audience: Criadores / Operadores
translationSource: en
translationMethod: assisted
---

:::note Registro de lançamento histórico
Esta página registra a versão anterior. Use o guia de instalação atual 0.3.1.
:::

## Encontre o relógio de reabastecimento

Selecione um produto em NPC Shop e abra Restock. Os carrapatos reais ignoram o tempo ignorado pelo sono; os carrapatos do mundo seguem o tempo do mundo. Defina estoque finito e máximo em Product primeiro. Continue com o guia [ atual](#core/shop-system) para salvá-lo e aplicá-lo.

![Encontre o relógio de reabastecimento.](assets/media/guides/drm-031-forge1201/shop-restock.png "DRM 0.3.1 / Forge 1.20.1. Esta é a característica relacionada na produção atual, não uma captura da interface histórica descrita abaixo.")

## Meio ambiente neste lançamento

Minecraft 1.20.1 · Forge · DRM **0.2.1**. Atualize o servidor e todos os clientes juntos e faça backup de `config/dochi_rpg_maker` e do mundo.

## NPC Shop

- Ações de tempo de execução e prazos persistem por NPC em NBT. Diferentes NPCs usando o mesmo JSON têm ações separadas.
- JSON mantém o estoque inicial, os produtos e a configuração do reabastecimento; a definição salva/exporta omite prazos de execução.
- Escolha `Real ticks` ou `World ticks` nos detalhes do produto em `RESTOCK > Timer basis`. A escolha se aplica em toda a loja e controla se o sono não conta.

Veja [NPC Shop](#core/shop-system) para configuração e migração de estoque legado.

## GUI Maker

- Tile/Stretch e entrada direta `Sprite Scale %` em `Default UI Settings`, com escala 50–400%.
- Largura/altura da telha por componente 10–800% quando imagem `Fit` é `Tile`.
- O tempo de execução do diálogo lê as configurações do Tile, com renderização e visibilidade aprimoradas de repetição de imagem.

Veja [GUI Maker](#core/gui-system) para autoria e referência JSON. Use `Save As` para cópias personalizadas de modelos empacotados.

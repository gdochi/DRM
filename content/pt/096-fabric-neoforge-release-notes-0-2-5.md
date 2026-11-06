---
title: Fabric e NeoForge 0.2.5 Atualização
slug: release-notes-0-2-5
order: 6
description: Editor favoritos, texturas externas de NPC e novas conexões adicionais.
product: core-fabric
category: Iniciar
section: getting-started
status: Guia de uso
version: 0.2.5
audience: Criadores/operadores
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Este é um registro histórico de lançamento. Veja [DRM0.3.1](#core-fabric/release-notes-0-3-1) para orientação atual.

## Retornar através de Favoritos

Clique na estrela ao lado de um editor e encontre-a em Favoritos. Favoritos ajuda você a reabrir ferramentas; aplicar uma conversa ou loja a um NPC é um passo separado. Continue com o guia [ atual](#core-fabric/quick-start) para salvá-lo e aplicá-lo.

![Retorne através dos Favoritos.](assets/media/guides/drm-031-neo1211/editor-selector.png "DRM 0.3.1 / NeoForge 1.21.1. Esta é a característica relacionada na produção atual, não uma captura da interface histórica descrita abaixo.")

## Instalação neste lançamento

DRM Núcleo para Minecraft 1.21.1 / Java 21 foi **0.2.5** em Fabric e NeoForge. Ambos usam a documentação compartilhada; escolha JARs e dependências do carregador correspondente. Veja [instalação](#core-fabric/installation).

## Favoritos e texturas

- Use ☆/★ para gerenciar os favoritos do editor e abri-los nos Favoritos. `config/dochi_rpg_maker/editor_favorites.json` é local para o jogo instância.
- PNGs de ativos de servidor e texturas de pacotes de recursos são resolvidos separadamente, com o carregamento de fallbacks. A pré-visualização do Gecko e as texturas externas do NPC foram melhoradas.
- Fabric O fluxo de trabalho de seleção e visualização de textura externa do NPC Basic agora segue a linha de base Forge. Armazene imagens em `assets/textures/` e conecte seus DRM IDs de recursos.

## Complementos relacionados

| Addon | Guia atual |
| --- | --- |
| Cobblemon Editor 0.2.4 | [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler), estágios de bloco/FX, treinadores e NPCs de serviço |
| Minijogos 0.1.0 | [Monty Hall, slots e memória ](#dochi-minigames/minigames-setup), taxas de entrada/recompensas e NPC/ligações de diálogo |
| MapIcon Integração 0.1.0 | [Xaero map icons](#dochi-mapicon-integration/mapicon-setup), regras JSON e configurações por NPC |

Instale cada addon separadamente e satisfaça a dependência necessária do Core CustomNPCs. O mais cedo [0.2.4 gravar](#core-fabric/release-notes-0-2-4) permanece disponível para restock-relógio e GUI-tiling mudanças.

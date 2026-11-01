---
title: Escolha Fabric ou NeoForge Arquivos
slug: installation
order: 2
description: Instale o arquivo DRM correspondente e os requisitos para 1.21.1.
product: core-fabric
category: Primeiros passos
section: getting-started
status: Estável
version: 0.3.1
audience: Criadores / Operadores
translationSource: en
translationMethod: assisted
---

## Combine o carregador

| Item | Fabric | NeoForge |
| --- | --- | --- |
| Minecraft | 1.21.1 | 1.21.1 |
| Java | 21 | 21 |
| Carregador | Fabric Carregador 0.18.0+ | NeoForge 21.1+ |
| Fabric API | 0.116.11+1.21.1+ | Não usado |
| DRM arquivo | 0.3.1 Fabric 1.21.1 | 0.3.1 NeoForge 1.21.1 |

**26.3 precisa de arquivos diferentes.** Veja [26.3 instalação](#core-fabric/minecraft-26-3) para Java 25 e suas compilações. Forge 1.20.1 usa o guia [Forge](#core/installation).

Coloque os arquivos em **mods**. Correspondência Minecraft, loader e mod arquivos no servidor e clientes.

## Adicione os recursos desejados

| Característica | Mod extra |
| --- | --- |
| Criar NPCs | DNPC ou carregador de correspondência CustomNPCs |
| Modelos Gecko | Correspondência GeckoLib |
| Conexões de missões FTB | FTB Missões |
| Pokémon Formadores, lojas e cura | Cobblemon Editor e Cobblemon |
| Botão Configurações na lista de mods de Fabric | Mod Menu |

DRM sozinho abre suas ferramentas de edição. Veja [DNPC começando](#dochi-npc-core/npc-core-setup) para criar um personagem.

## Começar no jogo

1. Coloque **Dochi RPG Maker Core** em Criativo, ou digite `/give @s dochi_rpg_maker:dialogue_editor`.
2. Clique com o botão direito do ar.
3. Abrir **Dialogue Editor** e fazer [Sua primeira conversa](#core-fabric/quick-start).

Exemplos e pastas de configuração são criados na primeira execução. Fabric exclui Item Editor e Stat Builder.

![O seletor do editor abriu com o Core após a instalação.](assets/media/guides/drm-031-neo1211/editor-selector.png "DRM 0.3.1 / NeoForge 1.21.1. Selecionando Dialogue Editor expõe Carga, Use Default e Create New. Comece com Use Default, então Save As seu próprio trabalho. Os addons instalados alteram a lista disponível.")

## Mover um servidor

Mantenha `config/dochi_rpg_maker/` e o mundo juntos. Configuração por si só não inclui NPCs colocados, progresso de busca ou estado de geração.

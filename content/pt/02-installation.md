---
title: Escolha Forge Arquivos de instalação
slug: installation
order: 2
description: Instale DRM e seu mod NPC escolhido em Forge 1.20.1.
product: core
category: Primeiros passos
section: getting-started
status: Estável
version: 0.3.1
audience: Operadores de servidor
tags:
  - install
  - forge
translationSource: en
translationMethod: assisted
---

## Ficheiros necessários

| Item | Escolher |
| --- | --- |
| Minecraft | Edição Java 1.20.1 |
| Java | 17 |
| Carregador | Forge 47+ |
| DRM | Forge 1.20.1 versão 0.3.1 |

Coloque o arquivo mod em **mods**. Em um servidor, instale arquivos correspondentes no servidor e em todos os clientes.

Use o [guia separado](#core-fabric/installation) Para Fabric/NeoForge.

## Quer NPCs também?

Instale [DNPC](#dochi-npc-core/npc-core-setup) ou compatível CustomNPCs. DRM em si não requer um mod NPC, mas você precisa de um para criar os personagens recebendo conversas ou lojas.

Adicione mods opcionais para os recursos que você usa, como GeckoLib para modelos Gecko ou FTB Quests para conexões de missão FTB.

## Abra após a instalação

1. Entre em um mundo no modo criativo.
2. Pegue **Dochi RPG Maker Core**, ou use `/give @s dochi_rpg_maker:dialogue_editor`.
3. Clique com o botão direito do ar.
4. Uma vez aberta a lista de editores, siga [ sua primeira conversa](#core/quick-start).

Exemplos agrupados são preparados na primeira corrida; nenhum JSON escrito à mão é necessário para começar.

![O seletor do editor abriu com o Core após a instalação.](assets/media/guides/drm-031-forge1201/editor-selector.png "DRM 0.3.1 / Forge 1.20.1. Selecionando Dialogue Editor expõe Carga, Use Default e Create New. Comece com Use Default, então Save As seu próprio trabalho. Os addons instalados alteram a lista disponível.")

## Atualizações e servidores em movimento

Substitua arquivos mod antigos em vez de manter as duas versões. Mantenha `config/dochi_rpg_maker/` junto com o mundo, que também armazena NPCs colocados e progresso do jogador.

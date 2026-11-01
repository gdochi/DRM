---
title: Pastas e Caminhos
slug: paths
order: 40
description: Pastas e caminhos para Forge DRM 0.2.1.
product: core
category: Primeiros passos
section: getting-started
status: Estável
version: 0.3.1
audience: Criadores e operadores de servidor
translationSource: en
translationMethod: assisted
---

## Onde está a conversa que salvei?

Em singleplayer, abra a pasta **game para a instância do lançador atual**. No modo multijogador, use a pasta do servidor **conectado**. Os arquivos de autoria vivem sob `config/dochi_rpg_maker/` lá.

Para **Dialogue Editor → Save As → village_guide**, olhe em `config/dochi_rpg_maker/dialogue_sets/village_guide/`. Um conjunto de conversas é uma pasta: copie a pasta **whole** ao movê-la para outro servidor.

![Dialogue Editor mostra o caminho da pasta da conversa salva.](assets/media/guides/drm-031-forge1201/dialogue-save-result.png "DRM 0.3.1 / Forge 1.20.1. Depois de Save As, SET FOLDER / FERRAMENTAS mostra a pasta de conjunto atual. Use esse caminho para identificar a instância correta.")

## Arquivos para cada tarefa

Todos os caminhos abaixo estão dentro `config/dochi_rpg_maker/`. Encontre o nome que você salvou no editor.

| O que você fez | Localização | Tragam-me. |
| --- | --- | --- |
| Diálogo NPC | `dialogue_sets/village_guide/` | Pasta inteira e GUI vinculada, loja ou missões |
| Loja NPC | `npc_shops/village_shop.json` | Moeda, GUI e mods de item que ele usa |
| Layout de diálogo/loja | `gui/` | Imagens e texturas referenciadas |
| Tipo de moeda | `currency/definitions/town_coin.json` | Lojas e HUD usando essa moeda |
| HUD | `hud/sets/guide_hud/` | Todo hud_set.json e componentes/. Seleção ativa: hud/active_set.json |
| Missões | `quests/<pack-name>/` | pack.json e missões individuais sob missões |
| Estatísticas | `stats/sets/` | Seleção ativa stats/active_set.json |
| Itens de banco de dados | `items/definitions/` | Regras de autoria items/editor_settings.json |
| Destinos de viagem | `teleporters/` | Conjunto de destino e GUI vinculada |
| Popups | `popups/definitions/` | Exibir políticas em popups/políticas/ se usado |
| Mensagens do mundo | `remnant_msg/messages/` | remnant_msg / policies/ e GUI ligada |
| Criador PNGs | `assets/textures/` | Combinando .png.mcmeta para texturas animadas |
| Exibição de Facção | `factions/` | Configurações e predefinições necessárias |
| Configurações padrão/compartilhadas | `settings/` | Revise as configurações que você mudou antes de movê-las |

Os próprios modelos NPC do DNPC usam uma pasta separada ****, `config/dochi_npc_core/templates/`. Veja [ salvando NPCs](#dochi-npc-core/npc-core-templates). Verifique o guia de armazenamento de cada addon para BattleWorks, Spawn Control e outros arquivos addon.

## O arquivo foi movido, mas o NPC não mudou.

Os arquivos de autoria e os NPCs do mundo estão separados. No servidor de destino, verifique o arquivo e, em seguida, ** clique com o botão direito do mouse no NPC com DRM Core →, selecione o arquivo → Apply**. Traga fotos e lojas referenciadas também.

Veja [saving e aplicação NPC](#core/core-concepts) para os botões. Faça backup de **config e o mundo salva em conjunto** ao mover ou restaurar um servidor inteiro; a criação de arquivos por si só não restaura a colocação de NPC, os reprodutores e o progresso.

## Um arquivo salvo está faltando na lista

1. Verifique a pasta de jogo real do servidor. Uma cópia somente cliente não aparece na lista de servidores.
2. Use a pasta correta para uma conversa, loja ou arquivo GUI.
3. Abra **Load / Refresh** e limpe os filtros de busca.
4. Use **Save As** com seu próprio nome ao personalizar um exemplo empacotado.

Digite nomes como `village_shop.json` nos campos de nome de arquivo do editor; o editor já seleciona sua própria pasta de armazenamento. Para edições de arquivos externos, veja [recarregando o trabalho salvo](#core/core-concepts).

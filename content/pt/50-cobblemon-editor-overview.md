---
title: Criar Pokémon NPCs
slug: cobblemon-editor-overview
order: 500
description: Escolha os treinadores. Pokémon Lojas, curandeiros ou NPCs iniciais.
product: drm-cobblemon-editor
category: Visão geral
section: overview
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Criadores construindo Cobblemon NPCs e lojas
tags:
  - cobblemon
  - customnpcs
  - overview
translationSource: en
translationMethod: assisted
---

## Novidades da 0.2.9: acompanhe os vídeos
| Objetivo | Guia |
| --- | --- |
| Criar e conceder insígnias ou troféus | [Insígnias e condições de posse](#drm-cobblemon-editor/cobblemon-badges) |
| Personalizar efeitos de aquisição e seleção | [Apresentações e GUI](#drm-cobblemon-editor/cobblemon-badge-presentations) |
| Converter treinadores RCT para DNPC | [Conversão RCT](#drm-cobblemon-editor/cobblemon-rct-conversion) |
| Configurar Pokémon Alpha e atributos | [Vídeo da equipe](#drm-cobblemon-editor/cobblemon-trainer-editor) |

![Renomeie uma cópia do conjunto de exemplo e salve no servidor.](assets/media/guides/cobble-release-20261109/badge-create.mp4 "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, inglês. O guia explica ativação, cópia e vínculo com recompensas.")

## O que você gostaria de fazer?

| Objetivo | Ferramenta |
| --- | --- |
| Um treinador com um Pokémon equipe | **Cobblemon Editor → Trainer** |
| Um Pokémon que luta diretamente | **Cobblemon Editor → Pokemon Itself** |
| Pokémon vendas, comércios e leilões | **PokéMart Editor** |
| Equipe de cura | **Nurse Joy Editor** |
| Escolhendo um primeiro Pokémon | **Starter Selector Editor** |
| Uma entrada antes de uma batalha | **Battle Presentation Maker** |

Clique com o botão direito do mouse em ar com o DRM Core e escolha uma ferramenta em **Add-on**. Crie NPCs com DNPC ou CustomNPCs.

![Editor real para o treinador Pokémon Equipe.](assets/media/guides/cobble-029-neo1211/cobble-party.png "Escolha espécie e nível, configure a batalha e aplique-a a um NPC. Versão 0.2.9 / NeoForge 1.21.1, UI em inglês.")

## Comece com um treinador.

Seguir [instalação e a primeira batalha](#drm-cobblemon-editor/cobblemon-editor-setup). Dê ao treinador um Pokémon, salve, aplique a um NPC e fale com as duas mãos vazias.

Em seguida, escolha [ equipes e rodadas ](#drm-cobblemon-editor/cobblemon-trainer-editor), [ AI e mecânica](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items) e [ regras de batalha](#drm-cobblemon-editor/cobblemon-battle-rules).

## Adicionar diálogo e recompensas

Adicione uma saudação pré-batalha ou dê recompensas após o diálogo pós-batalha. Veja [condições e pós-ações](#drm-cobblemon-editor/cobblemon-conditions-rewards-pokemon).

Defina disponibilidade de revanche e períodos de espera em [encontros e revanches](#drm-cobblemon-editor/cobblemon-encounters-rematches).

## Vários papéis em um NPC

A interação com a mão vazia pode abrir um diálogo ou uma loja primeiro. Use uma **go_battle** ação em diálogo para iniciar sua batalha. **Shift+right-click** acessa funções dedicadas quando outra função aplicada toma a interação normal.

Usar NPCs separados para seus primeiros papéis torna a interação mais fácil de seguir.

## Plataformas

Por **Minecraft 1.21.1, Fabric or NeoForge**. DRM e Cobblemon são necessários; use DNPC ou CustomNPCs para funções NPC. Veja o [tabela de instalação](#drm-cobblemon-editor/cobblemon-editor-setup).

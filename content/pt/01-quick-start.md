---
title: Primeiros passos
slug: quick-start
order: 1
description: Pegue a ferramenta DRM e crie o primeiro diálogo de um NPC.
product: core
category: Primeiros passos
section: getting-started
status: Estável
version: 0.3.1
audience: Criadores e operadores de servidor
translationSource: en
translationMethod: assisted
---

## Criar o primeiro diálogo de um NPC

Com DRM, você pode criar diálogos, lojas e missões para NPCs. Comece com um NPC e uma saudação curta.

1. No modo Criativo, pegue **Dochi RPG Maker Core** ou digite `/give @s dochi_rpg_maker:dialogue_editor`.
2. Segure o Core e **clique com o botão direito no ar**.
3. Selecione **Dialogue Editor** e escolha **Use Default** à direita.
4. Selecione um nó de diálogo normal e altere a fala e o texto das opções.
5. Use **Save As** para salvar seu próprio diálogo.
6. Com o Core na mão, clique com o botão direito em um NPC do DNPC ou CustomNPCs e aplique o diálogo salvo.
7. Deixe as duas mãos vazias e clique com o botão direito no NPC para conversar.

Ainda precisa criar um NPC? Siga [Criar um NPC](#dochi-npc-core/npc-core-setup). Use DNPC em Minecraft 26.3.

![Seletor de editores do DRM, com Dialogue Editor selecionado e Use Default à direita.](assets/media/guides/drm-031-forge1201/editor-selector.png "DRM 0.3.1 em Forge 1.20.1, em inglês. Crie os diálogos no Dialogue Editor e configure os produtos da loja no NPC Shop.")

Para criar os primeiros nós e opções, siga [o guia ilustrado de diálogo](#core/dialogue-system). O guia mostra como escrever a fala, conectar a resposta, usar Save As e testar o diálogo no NPC.

## Escolha o que você quer fazer

| Objetivo | Ferramenta | Guia |
| --- | --- | --- |
| Diálogo e escolhas | Dialogue Editor | [Conversas](#core/dialogue-system) |
| Um NPC que compra ou vende itens | NPC Shop | [Lojas](#core/shop-system) |
| Um diálogo personalizado / aparência de loja | GUI Maker | [Layouts de tela](#core/gui-system) |
| Nomes de dinheiro, ícones e saldos | Currency Editor | [ Moeda](#core/currency-editor) |
| Informações que permanecem na tela | HUD Maker | [HUDs](#core/hud-maker) |

Missões, destinos de viagem e pop-ups também abrem a partir do editor seletor. Os complementos instalados adicionam suas próprias ferramentas.

## Quando salvar e aplicar

**Save / Save As** salva seu trabalho em um arquivo. **Apply** define qual NPC usa esse arquivo. Salve o novo diálogo ou a nova loja e depois aplique o arquivo ao NPC.

Use **Save As** para salvar uma cópia do exemplo com um nome escolhido por você. Use **Save** nas próximas alterações do seu arquivo.

## Antes de instalar

Este guia é para Forge 1.20.1. Veja [instalação](#core/installation), ou use o guia [Fabric/NeoForge](#core-fabric/quick-start) para esses carregadores.

Para mover o trabalho salvo para outro servidor, consulte [pastas](#core/paths).

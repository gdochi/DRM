---
title: Facções e Popups
slug: factions-popups
order: 120
description: CustomNPCs Apresentação de facção e pop-ups reutilizáveis na tela.
product: core-fabric
category: Ferramentas do mundo e NPC
section: world-tools
status: Estável
version: 0.3.1
audience: Criadores de mundo e NPC
tags:
  - faction
  - popup
translationSource: en
translationMethod: assisted
---

## Mude os nomes e cores dos estados das facções

**Faction Editor** controla como suportado CustomNPCs facções aparecem em DRM. CustomNPCs possui os IDs da facção e as pontuações dos jogadores. Configure DNPC grupos de relacionamento separadamente no editor [DNPC](#dochi-npc-core/npc-core-editor). Essas capturas mostram **DRM 0.3.1 / NeoForge 1.21.1**.

![Status e pontos de amostra em Faction Editor.](assets/media/guides/drm-031-neo1211/faction-editor.png "Selecione Inamigável, Neutro ou Amigável e edite seu nome, cor e descrição do relacionamento. Os pontos de amostra 850 testam a exibição; não concede reputação a um jogador.")

1. Selecione uma relação em **Statuses**.
2. Coloque **Display name / Color / Relationship description** à direita.
3. Mude **Sample points** para inspecionar o resultado em pontuações diferentes.
4. Verifique se as facções originais estão disponíveis em **Manage Factions**.
5. Use **Presentation** para ordem, categorias e ícones; use **Runtime Screen** para a interface do player.
6. Salve e inspecione a lista de jogadores com a tecla **J** padrão.

A apresentação está armazenada em `config/dochi_rpg_maker/factions/settings.json`. Para pontuações incorretas, verifique a facção original e o comportamento de concessão antes de editar a apresentação. Esse fluxo de trabalho CustomNPCs não se aplica a [ Minecraft 26.3 e posterior ](#core-fabric/minecraft-26-3).

## Salvar um pop-up e exibi-lo no mundo

Este exemplo mostra brevemente **Village Gate**. A detecção de região precisa de um gatilho separado; este exercício exibe o pop-up salvo com um comando.

![Popup Maker salvo como village_entry com o título de Village Gate.](assets/media/guides/drm-031-neo1211/popup-village-save.png "Verifique o ID à esquerda e salvo: village_entry.json na parte inferior. O painel do meio inferior é a visualização do editor. Fade In 10 / Hold 80 / Fade Out 20 carrapatos dá um total de 5.5 segundos em velocidade normal.")

1. Abra **Popup Maker** a partir do Núcleo e definir **ID** para `village_entry`.
2. Digite `Village Gate` em **Title** e sua descrição em **Text**. Adicione um **Subtitle** se necessário.
3. Ajustar **Fade In / Hold / Fade Out**. Em velocidade normal, 20 carrapatos é um segundo.
4. Escolha **Channel** e **Conflict** para avisos sobrepostos. O exemplo `replace` substitui o aviso anterior nesse canal.
5. Opcionalmente, selecione **Opening Sound** e ouça com o botão de reprodução.
6. Escolha **Save As → village_entry → Save As** para salvar sua própria cópia.
7. Feche o editor e execute este comando como um jogador com permissão de gerenciamento:

```mcfunction
/drm popup show @s village_entry
```

![O pop-up do Village Gate salvo exibido no jogo real.](assets/media/guides/drm-031-neo1211/popup-village-runtime.png "Mostrado com /drm popup show s village_entry usando a definição salva acima. Isso não liga automaticamente a uma região ou NPC.")

Alterar texto, tempo e canal em **Popup Maker**. Alterar posição, fundo e arte em [GUI Maker](#core-fabric/gui-system)A GUI Popup. Atribua um layout copiado no campo **GUI JSON** do popup.

| Arquivo para transferir | Localização |
| --- | --- |
| Texto, tempo e canal | `config/dochi_rpg_maker/popups/definitions/village_entry.json` |
| Layout de tela | A GUI atribuída sob `config/dochi_rpg_maker/gui/` |
| Limites de exibição e duração operacionais | `config/dochi_rpg_maker/popups/policies/` |

Se nada aparecer, verifique o ID salvo, Habilitado e arquivo GUI. Se avisos fila ou substituir um ao outro, inspecione Conflito para o mesmo Canal e os limites ativos / fila da política.

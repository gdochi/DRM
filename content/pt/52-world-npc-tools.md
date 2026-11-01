---
title: Facções, Teleportadores e Popups
slug: world-npc-tools
order: 120
description: Configure a apresentação de facções, fluxos de destino e pop-ups de tempo de execução reutilizáveis.
product: core
category: Ferramentas do mundo e NPC
section: world-tools
status: Estável
version: 0.3.1
audience: Criadores de mundo e NPC
tags:
  - faction
  - teleporter
  - popup
translationSource: en
translationMethod: assisted
---

## Mostrar relações de facção para os jogadores

**Faction Editor** controla como CustomNPCs facções aparecem em DRM. CustomNPCs possui os IDs da facção e os pontos reais do jogador. Crie DNPC grupos de relacionamento separadamente no editor [DNPC](#dochi-npc-core/npc-core-editor).

![Faction Editor nomes de relacionamento, cores, descrições e visualização de pontos de amostra.](assets/media/guides/drm-031-forge1201/registry-faction.png "DRM 0.3.1 / Forge 1.20.1. Os status definem os rótulos dos relacionamentos. Exemplo de pontos pré-visualiza um valor; não muda a reputação real de um jogador.")

1. Em **Statuses**, coloque os nomes, cores e descrições de Inamistoso, Neutro e Amigável.
2. Em **Manage Factions**, verifique se CustomNPCs está instalado e seu catálogo de facções está disponível.
3. Defina ordem, categorias, nomes, ícones e banners em **Presentation** e o layout do jogador em **Runtime Screen**.
4. Salve e abra **J** para verificar a lista de jogadores e pontos.

A apresentação é salva em `config/dochi_rpg_maker/factions/settings.json`. Verifique se este editor tem etiquetas ou cores incorretas; verifique a facção original e as condições/ações de concessão de pontos para obter uma pontuação incorreta.

## Dê a um NPC uma lista de destino

Use **Teleporter Editor** para criar destinos e aplicar o conjunto a um NPC. Estadias de viagem **na dimensão atual**.

![Editora de teleportadores destino Spawn com coordenadas de chegada.](assets/media/guides/drm-031-forge1201/teleporter-destinations.png "DRM 0.3.1 / Forge 1.20.1. Configurações de destino → Informações contém X/Y/Z. Substitua a amostra 0.5 / 64 / 0.5 por uma posição segura em seu mundo.")

1. Crie o nome da lista e as categorias em **Category Settings**.
2. Use **Destination Settings → Add**, depois defina nome, descrição, X/Y/Z e Yaw/Pitch.
3. Adicione regras de acesso no **Conditions** do destino e comandos antes/depois da chegada **Commands**. Forge também expõe destino **Effects**.
4. Defina as durações de desbotamento e os sons de partida/chegada em **Travel Presentation**.
5. **Save As** um novo nome como `town_network`. Abra o NPC com o núcleo e escolha **Teleporter JSON → your file → Apply Teleporter**.
6. Interaja com ambas as mãos vazias, selecione o destino e clique em **Travel**. Verifique a posição de chegada e de frente.

Conjuntos são salvos em `config/dochi_rpg_maker/teleporters/`. **bound** na ação de diálogo `Go Teleporter` abre o conjunto aplicado a este NPC. Para personalizar o layout, copie-o em GUI Maker e conecte-o através do conjunto **GUI JSON**.

## Exibir um título de área ou notificação de missão

Defina texto temporário e tempo em **Popup Maker**. Colocação de design e obras de arte no layout Popup de [GUI Maker](#core/gui-system).

![Conteúdo do Criador de Popups, tempos de fade/hold, canal e som de abertura.](assets/media/guides/drm-031-forge1201/popup-maker.png "DRM 0.3.1 / Forge 1.20.1. O painel do meio inferior é uma prévia. Desaparecer em 10 / Esperar 80 / Desaparecer 20 totaliza 5.5 segundos em velocidade normal.")

1. Escreva **Title / Subtitle / Text**.
2. Defina **Fade In / Hold / Fade Out** durações em ticks; 20 ticks igual a um segundo.
3. Escolha como as notificações sobrepostas se comportam no mesmo **Channel** e defina **Priority** quando necessário.
4. Escolha **Opening Sound** e faça o teste com o Play.
5. **Save As** seu pop-up e teste a exibição real através de um `/drm popup` comando ou ação de diálogo.

Definições são salvas em `popups/definitions/`, políticas em `popups/policies/`. Copie arquivos padrão com Save As. Se os avisos se acumularem, verifique os conflitos do canal junto com os limites de exibição e fila simultâneos na política.


## Exibir o pop-up salvo com um comando

Defina **ID** para `village_entry` e **Title** para `Village Gate`, então escolha **Save As → village_entry → Save As**. Feche o editor e execute isso como um jogador com permissão de gerenciamento:

```mcfunction
/drm popup show @s village_entry
```

![Popup Maker salvo como village_entry com o título de Village Gate.](assets/media/guides/drm-031-forge1201/popup-village-save.png "DRM 0.3.1 / Forge 1.20.1. Cheque Salvo: village_entry.json e o título. O painel do meio inferior é a visualização do editor.")

![O pop-up salvo exibido no jogo real.](assets/media/guides/drm-031-forge1201/popup-village-runtime.png "DRM 0.3.1 / Forge 1.20.1. Este é o arquivo exibido com o comando acima. Entrar em uma aldeia não aciona automaticamente até que a detecção de região seja conectada separadamente.")

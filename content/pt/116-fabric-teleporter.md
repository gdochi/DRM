---
title: Teletransporte
slug: teleporter
order: 82
description: Crie conjuntos de destino, ligue-os a NPCs e configure o tempo de execução do Teleporter.
product: core-fabric
category: Sistemas Principais
section: teleporter
status: Estável
version: 0.3.1
audience: Criadores / Operadores
tags:
  - teleporter
  - npc
  - gui
translationSource: en
translationMethod: assisted
---

## Faça um destino de volta para a cidade

Deixe os jogadores interagirem com um NPC, escolherem um destino e viajarem. Termine um destino antes de adicionar condições de acesso ou apresentação. Estas são imagens em inglês de **DRM 0.3.1 / NeoForge 1.21.1**.

1. Fique no destino e observe seu **F3** Coordenadas. Verifique o chão e o headroom.
2. Clique com o botão direito no ar com o núcleo e abra **Teleporter Editor → Create New**.
3. Em **Category Settings**, renomeie **Towns** ou use **Add** para uma nova categoria. **Display name** nomeia toda a lista de destinos.

![Configurações de categoria para o nome de exibição da lista e a categoria Cidades.](assets/media/guides/drm-031-neo1211/teleporter-editor.png "O meio contém configurações de lista e categorias; o direito edita o nome da categoria selecionada e o ícone. Defina as coordenadas de destino em Configurações de destino a seguir.")

### Nome e posição de chegada

Abra **Destination Settings**. Use **Add** ou selecione a amostra **Spawn**, depois configure **Info** à direita.

| Controle | O que entrar |
| --- | --- |
| **Name / Description** | Um nome de localização e direções que os jogadores podem reconhecer |
| **Enabled** | Se este destino está disponível |
| **Category** | A categoria preparada acima |
| **Position → X / Y / Z** | Coordenadas de chegada; Y é a altura dos pés do jogador |
| **Yaw / Pitch** | Virado para a direção e ângulo de visão vertical após a chegada |

![A página Spawn Info com seu nome, descrição, categoria, posição e rotação.](assets/media/guides/drm-031-neo1211/teleporter-destinations.png "Substitua a amostra 0.5 / 64 / 0.5 por uma posição segura em seu mundo. Renomar o destino não muda suas coordenadas.")

Estadias de viagem **na dimensão atual**. Inserir as coordenadas de Nether sozinho não move o jogador para o Nether.

### Escolha quem pode usá-lo

Deixe as condições vazias para o primeiro teste. Depois que a viagem funcionar, configure-as separadamente:

- **Interaction Conditions:** quem pode abrir a lista inteira.
- **Destination Settings → destination → Conditions:** quem pode usar esse destino.

Por exemplo, todos podem abrir a lista enquanto apenas jogadores que terminaram uma missão podem visitar as ruínas. **Category Settings → Locked destination presentation** controla se as entradas bloqueadas parecem escurecidas, ocultas ou de outra forma. Não dá acesso.

![Condições de Interação com Habilitado, Modo E e Adicionar.](assets/media/guides/drm-031-neo1211/teleporter-conditions.png "Use Adicionar para configurar uma condição e marque Habilitado. Esta captura de tela é o estado inicial sem condições.")

### Transições de tela e sons

Em **Travel Presentation**, **Fade out / Fade in** coloque as durações de escurecimento e retorno em carrapatos. Em velocidade normal, 20 carrapatos igual a um segundo; o valor mostrado de 10 é de cerca de meio segundo cada. Escolha **Departure sound / Arrival sound** com os botões de busca e teste-os com o Play.

![Apresentação de viagem com duração de desvanecimento e sons separados de partida e chegada.](assets/media/guides/drm-031-neo1211/teleporter-presentation.png "Escolha cada som separadamente. Se um destino também executar comandos, configure seu timing na guia Comandos.")

## Salvar e conectar o NPC

1. **Save As** um novo nome como `guide_travel`. O editor adiciona a extensão e salva `guide_travel.json`.
2. Clique com o botão direito do mouse em um **DNPC or CustomNPCs NPC** com o núcleo.
3. Em **NPC Apply**, escolha **Teleporter JSON** à esquerda e seu arquivo no meio. Use **Refresh** se necessário.
4. Clique em **Apply Teleporter** e verifique a lista aplicada à direita.
5. Interaja com as duas mãos vazias, selecione um destino e viaje. Verifique abrindo a lista, as coordenadas de chegada e enfrentando separadamente.

![O teletransporte do jogador mostra o portão da vila depois de aplicar o conjunto ao NPC.](assets/media/guides/drm-031-neo1211/teleporter-npc-player.png "Selecione um destino no meio e pressione Viajar no canto inferior direito. Este exemplo deixa a região de imagem grande vazia.")

![Depois de viajar, o jogador chega na entrada de carvalho pré-colocado.](assets/media/guides/drm-031-neo1211/teleporter-arrived.png "O servidor confirmou a chegada ao X 20.5 / Y - 60 / Z 0.5 salvo. Os postes de chão e carvalho foram preparados no mundo da captura para identificar o ponto de chegada. Use suas próprias coordenadas de destino.")

Use **Remove Teleporter** nesse NPC para remover a conexão. Aplicar novamente ao mudar para um arquivo salvo sob outro nome.

Para abri-lo a partir de uma escolha de diálogo regular, adicione **go_teleporter** em [Choice actions](#core-fabric/dialogue-system). Escolha **bound** para a lista aplicada deste NPC ou selecione um arquivo salvo para outra lista.

## Layout e arquivos salvos

Edite destinos e condições aqui; edite o posicionamento da lista, obras de arte e botões em [GUI Maker](#core-fabric/gui-system). A conexão é **Category Settings → GUI JSON / Open GUI Maker**. Mantenha uma lista de destino, botão de viagem e botão fechar no layout personalizado.

Conjuntos são salvos em `config/dochi_rpg_maker/teleporters/`. `default_teleporter_set.json` e `gui/default_teleporter_gui.json` estão começando modelos. Mantenha seu trabalho separado com **Save As**.

Para um destino em falta, marque Habilitado, categoria, texto de pesquisa e condições. Se a lista abrir, mas a viagem for rejeitada, verifique a distância para o NPC e mude as condições, então interaja novamente para reabri-la.

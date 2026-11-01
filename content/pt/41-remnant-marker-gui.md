---
title: Colocar um marcador de mensagem
slug: remnant-marker-gui
order: 117
description: Coloque um marcador, escreva sua mensagem, leia-a e altere a GUI de exibição.
product: core
category: Remnant Msg
section: remnant-msg
status: Estável
version: 0.3.1
audience: Criadores/operadores
tags:
  - remnant
  - gui
  - marker
translationSource: en
translationMethod: assisted
---

## Deixe uma pequena nota em um lugar

Para uma nota usada em um local, você não precisa criar um arquivo primeiro. Segure **Remnant Msg Setter** e clique com o botão direito do mouse em uma face de bloco para colocar um marcador e abrir suas configurações. Com permissão de edição, escreva em Mensagem e pressione **Save**.

![Mensagem digitada depois de colocar um marcador com o setter.](assets/media/guides/drm-031-neo1211/remnant-message-ready.png "DRM 0.3.1 / NeoForge 1.21.1, IU Inglês. O texto é 'Siga as lanternas para chegar à aldeia.' Mensagem JSON seleciona um documento existente; Marcador modelo controla o marcador do mundo; Salvar armazena sua mensagem.")

1. Pegue o setter com `/give @s dochi_rpg_maker:remnant_msg_setter`.
2. Clique com o botão direito do mouse na face do bloco onde o marcador deve ser anexado.
3. Digite o texto em **Message**.
4. Mantenha **Marker model: Default icon** e Escala 1 para a primeira tentativa, em seguida, Salvar.
5. Coloque o setter e clique com o botão direito do mouse no marcador para lê-lo. Um criador autorizado segurando o setter abre a edição em vez disso.

![O marcador salvo abriu através do uso de mãos vazias.](assets/media/guides/drm-031-neo1211/remnant-placed-setter.png "A mensagem salva real resulta no mesmo artefato DRM 0.3.1 / NeoForge 1.21.1. Essa GUI padrão exibe texto e Fechar. Siga as etapas da GUI abaixo para alterar sua posição de fundo ou texto.")

Salvar neste fluxo de trabalho cria o arquivo de mensagem do servidor e o vincula ao marcador do mundo. Salvar um documento e colocar um marcador são operações separadas.

## Mude o marcador do mundo

Abra **Marker model** e escolha o ícone Padrão, Item, Bloco ou Escondido. Para Item ou Bloco, procure uma entrada, selecione-a e Aplicar. De volta ao setter, pressione Salvar para atualizar o marcador.

![O verdadeiro selecionador de modelos.](assets/media/guides/drm-031-neo1211/remnant-marker-picker.png "DRM 0.3.1 / NeoForge 1.21.1. As quatro abas controlam a aparência do marcador do mundo, não o fundo da tela de leitura. Esta captura mantém o ícone Padrão.")

**Scale** controla o tamanho do marcador, **Billboard** como ele enfrenta a câmera, e X/Y/Z seu modelo compensa. Alterar o tamanho e a posição do texto da tela de leitura em GUI Maker.

## Encontre um marcador colocado novamente

Com o setter, ** clique com o botão direito no ar** ou ** clique com o botão direito no bloco** para abrir a lista mundial. Use as setas da mensagem para selecionar um marcador, verificar sua localização e texto e, em seguida, Editar. Antes de Excluir, verifique se o marcador pretendido está selecionado.

![Uma mensagem salva na lista mundial.](assets/media/guides/drm-031-neo1211/remnant-populated-world-list.png "Real DRM 0.3.1 / NeoForge 1.21.1 salvar o resultado. A lista mostra dimensão, coordenadas, marcador ligado_...json e texto. Anterior/Próxima página muda páginas; a central ? / > altera a mensagem selecionada.")

## Reutilizar uma mensagem e conectar uma GUI

Para o mesmo texto em vários lugares, salve um documento em [Remnant Msg Editor](#core/remnant-msg), em seguida, escolha-o com **Message JSON** em cada setter. **Policy** seleciona regras como quem pode colocar ou editar marcadores. Os usuários gerais podem acessar apenas o que a política do servidor permite.

Para personalizar a tela de leitura:

1. Crie uma GUI **remnant_msg** em [GUI Maker](#core/gui-system).
2. Coloque um elemento `dialog` para a mensagem real; adicione `panel` ou `image` elementos para um plano de fundo, se desejado.
3. Save As um novo nome GUI.
4. Selecione essa GUI no documento de mensagem Remanescente e salve.
5. Leia um marcador ligado ao documento novamente.

Os tipos `dialogue` e remnant_msg GUI servem telas diferentes. Para opções de NPC e ramificação, use [Dialogue Editor](#core/dialogue-system).

---
title: Criar uma conversa NPC
slug: dialogue-system
order: 70
description: Escreva uma saudação, adicione opções e conecte a conversa a um NPC.
product: core
category: Sistemas Principais
section: dialogue-editor
status: Estável
version: 0.3.1
audience: Criadores de diálogos
tags:
  - dialogue
  - npc
translationSource: en
translationMethod: assisted
---

## Faça uma saudação e uma resposta

Construir um guia da aldeia: falar abre uma saudação, "Conte-me sobre a aldeia" abre uma resposta, e "Adeus" fecha a conversa.

As imagens estáticas mostram **DRM 0.3.1 on Forge 1.20.1, in English**. O editor captura usar um exemplo preparado contendo a saudação e resposta.

### 1. Abra o editor de conversas

Clique com o botão direito no ar com o Núcleo. Selecione **Dialogue Editor** no meio, depois **Use Default** à direita. O exemplo padrão tem outros nós; comece selecionando **dialogue_1** para sua saudação.

![DRM editor seletor com Dialogue Editor selecionado e Carregar, Use Default e Create New botões à direita.](assets/media/guides/drm-031-forge1201/editor-selector.png "Selecione a ferramenta no meio e, em seguida, escolha como começar à direita. Use Default abre o exemplo fornecido.")

### 2. Escreva o que o NPC diz

Selecione ** dialogue_1 / General ** à esquerda e abra **Text**. Digite uma saudação em **Dialogue Text**, como "Bem-vindo a Oakridge. O que você gostaria de saber?"

![A aba Texto para dialogue_1, com a saudação da aldeia em Dialogue Text.](assets/media/guides/drm-031-forge1201/dialogue-text.png "O texto edita a linha NPC para o nó selecionado. Verifique seu nome à esquerda, então você está editando a saudação em vez de começar.")

Use **+ Geral** para adicionar a cena de resposta. Em **Info → Node name**, digite `dialogue_reply_1` e clique em **Rename**. Abra **Text** e escreva a resposta, como "A pousada está ao lado da fonte."

### 3. Conectar uma escolha de jogador à resposta

Volte para **dialogue_1** e abra **Choices**. Adicione uma escolha com ** + Escolha ** se necessário. Selecione sua linha à esquerda e, em seguida, digite o botão de texto em **Label** à direita.

![A guia Escolhas com duas opções à esquerda, um campo Label à direita e Choice actions abaixo.](assets/media/guides/drm-031-forge1201/dialogue-choices.png "Rótulo é o botão do jogador. Defina o que esse botão faz Choice actions abaixo dele.")

Para "Conte-me sobre a aldeia", abra **Choice actions**, adicione uma ação **Goto** e selecione **dialogue_reply_1** como seu destino. Dê adeus a **Close** ação. Adicione uma opção de fechamento ao nó de resposta também.

![Choice actions com uma ação Goto visando dialogue_reply_1.](assets/media/guides/drm-031-forge1201/dialogue-choice-actions.png "Adicione a operação com + Ação e, em seguida, escolha seu Tipo e destino. Isso conecta a primeira escolha ao nó de resposta.")

Ao reutilizar uma opção padrão, verifique suas ações existentes. Alterar o rótulo sozinho pode deixar um exemplo de abertura de loja ou ação de navegação anexada.

### 4. Escolha a primeira cena

Selecione **start** e abra **Routes**. Defina a rota de saudação **Action** para **Goto** e seu destino **Goto** para **dialogue_1**. Comece com uma rota e sem condições.

![A guia Rotas para começar, com uma rota Goto apontando para dialogue_1.](assets/media/guides/drm-031-forge1201/dialogue-start-routes.png "O começo escolhe a cena de abertura. Este exemplo entra no começo, então dialogue_1.")

### 5. Salvar e anexar a conversa

Clique em **Save As** no topo. Mude **Save As ID** para um novo nome como `village_guide`, depois salve. Substitua o nome de exemplo protegido `default_set`.

![A pasta e definir o nome depois de salvar village_guide com Save As.](assets/media/guides/drm-031-forge1201/dialogue-save-result.png "DRM 0.3.1 / Forge 1.20.1. Depois de salvar, a pasta na parte superior e definir o nome à esquerda ambos terminam em village_guide.")

Se você precisar de um NPC primeiro, siga [DNPC setup](#dochi-npc-core/npc-core-setup). Clique com o botão direito do mouse no Core e use **NPC Apply**:

1. Selecione **Dialogue JSON** à esquerda.
2. Selecione **village_guide** no meio. Use **Refresh** se estiver faltando.
3. Pressione **Apply Dialogue** no fundo.
4. Verifique se **APPLIED JSON → Dialogue** à direita agora mostra ** village_guide **.

![NPC Apply depois de aplicar village_guide, mostrando a função, arquivos salvos, nome aplicado e botão Apply Dialogue.](assets/media/guides/drm-031-forge1201/npc-apply-result.png "Selecionar um arquivo por si só não o aplica. Pressione Apply Dialogue e verifique o nome no painel direito.")

Esvazie as duas mãos, fale com o NPC, depois verifique a saudação, responda e escolha de fechamento em ordem.

![A conversa do jogador foi aberta interagindo com um DNPC Guia Oakridge, mostrando a saudação e duas escolhas.](assets/media/guides/drm-031-forge1201/dialogue-npc-player.png "O resultado do jogador: Dialogue Text torna-se a linha NPC, e cada etiqueta torna-se uma escolha abaixo dela.")

![Escolher a pergunta sobre a vila e acompanhar a conversa até à resposta.](assets/media/guides/short-videos-20261106/dialogue-branch.mp4 "DRM 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1, interface em inglês. Uma conversa preparada demonstra a ligação Goto.")

A primeira escolha abre a resposta abaixo. Verifique esta conexão, bem como a saudação inicial.


## O que é um nó?

A **geral nó é uma cena de conversa**: uma linha NPC e as escolhas do jogador. Conectar uma escolha a outro nó abre a próxima cena.

**start** escolhe a primeira cena. Ele aponta para um nó geral em vez de mostrar sua própria saudação. Cada conversa tem um nó inicial.

## Fazer escolhas fazer algo

| Escolha | Ação |
| --- | --- |
| Ouça a próxima parte | Vá para outro nó |
| Termine a conversa. | Fechar |
| Compre algo. | Abra uma loja: `go_shop` |
| Recolher uma recompensa | Dê um item ou moeda |
| Lembre-se do progresso | Adicionar/remover uma etiqueta |

Uma condição pode mostrar uma escolha apenas para certos jogadores, como oferecer uma recompensa depois que uma missão estiver completa. Veja [condições e ações](#core/conditions-actions).

## Expandir e reutilizar uma conversa

Arraste linhas de nó/escolha para mudar a ordem. Selecione vários nós com Shift+clique ou arraste e use **Copy / Paste**. Use **Duplicate** para copiar um conjunto inteiro.

Para uma escolha de loja, crie o [loja](#core/shop-system) primeiro e selecione-o na ação.

## Alterar a janela

Escreva o conteúdo aqui e crie a janela em [GUI Maker](#core/gui-system). Você pode terminar a conversa com o layout padrão e personalizá-lo mais tarde.

Conjuntos guardados estão em `config/dochi_rpg_maker/dialogue_sets/<set name>/`. Copie a pasta de conjunto inteira ao movê-la para outro servidor.

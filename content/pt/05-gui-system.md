---
title: Personalizar diálogos e telas de loja
slug: gui-system
order: 60
description: Copie um layout padrão e organize texto, fotos e botões em GUI Maker.
product: core
category: Sistemas Principais
section: gui-maker
status: Estável
version: 0.3.1
audience: Criadores de GUI
tags:
  - gui
  - layout
translationSource: en
translationMethod: assisted
---

## Faça uma tela padrão sua

1. Clique com o botão direito no ar com o Núcleo e abra **GUI Maker**.
2. Escolha o tipo de tela e carregue um padrão: **diálogo** para conversas ou **npc_shop** para lojas.
3. Selecione elementos na tela e altere a posição, o tamanho e as cores.
4. Use **Save As** para salvar seu layout.
5. Selecione esse arquivo nas configurações de GUI do diálogo ou da loja.
6. Interaja com o NPC para ver a tela voltada para o jogador.

Pré-visualize o texto e os produtos para ajudá-lo a organizar o layout. Escreva diálogos reais em Dialogue Editor e defina produtos/preços em NPC Shop.

![GUI Maker com Ferramentas à esquerda, Canvas no meio e a posição e o tamanho do elemento selecionado no Inspetor à direita.](assets/media/guides/drm-031-forge1201/gui-maker.png "DRM 0.3.1 em Forge 1.20.1. Adicione elementos à esquerda, selecione-os na tela e edite-os no Inspetor.")

O layout padrão da conversa já contém áreas de diálogo e escolha. Mantenha-os enquanto inicia, e selecione o elemento que você quer mudar. **X / Y** define a posição, **W / H** define a largura e a altura, e **Layer #** define a ordem de desenho. Use **Preview** no topo para inspecionar o resultado.

## Escolha um elemento

| O que você quer | Elemento |
| --- | --- |
| Diálogo NPC | **Dialog** |
| Escolhas de jogador | **Choice** |
| Seu próprio texto ou o nome do NPC | **Text** |
| Um fundo ou seção | **Panel** |
| Um logotipo ou imagem | **Image** |
| A aparência do NPC | **Entity** |
| Loja de produtos | **Item Slot** |
| Comprar/vender botões | **Shop Action Button** |
| Exibição de dinheiro | **Currency Display** |

Use elementos funcionais, como produtos para a loja e botões de transação, com o tipo de tela correspondente.

## Adicionar nomes e rótulos

Adicione **Text** a um layout de diálogo e escolha **Content**.

![Uma caixa de texto adicionada com + Texto, com Configurações de Conteúdo, Entrada Direta, Chave de Texto e Tradução no Inspetor.](assets/media/guides/drm-031-forge1201/gui-text.png "Use + Texto para uma etiqueta separada. O conteúdo escolhe entre um rótulo fixo e o nome do NPC atual.")

- **Direct input:** digite uma etiqueta fixa, como "Blacksmith".
- **NPC name:** Mostre o nome do atual parceiro de conversa.

Para sua própria redação, insira-a em **Text** e mude **Translation Key** para **Literal Text**, se necessário. Use a chave de tradução para um nome registrado em um arquivo de idioma.

Adicione várias caixas de texto para rótulos separados. Cada um tem sua própria posição, tamanho, preenchimento e fronteira.

## Repetir ou redimensionar uma imagem

Selecione uma imagem e escolha **Fit**. **Stretch** preenche sua área, **Contain** mantém as proporções da imagem, e **Tile** repete.

Para o Tile, **Tile W % / H %** controla o tamanho de cada imagem repetida: default 100%, range 10–800%, separadamente para largura e altura. A largura/altura do elemento controla toda a área que cobre.

**Default UI Settings → Sprite Scale %** muda o tamanho padrão do painel/botão: default 100%, range 50–400%. Não redimensiona as ferramentas do editor.

## O layout salvo não está sendo exibido

Verifique se seu diálogo ou loja seleciona a GUI salva. Salvar um layout sozinho não substitui uma tela existente.

Layouts são armazenados em `config/dochi_rpg_maker/gui/`. Use a referência [JSON](#core/json-reference) ao editar arquivos diretamente.
